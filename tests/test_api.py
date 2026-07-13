"""The signature must bind exactly the bytes sent on the wire."""
from __future__ import annotations

import hashlib
import hmac
import json

import httpx
import pytest

from bybit_mcp.api import MAINNET_URL, TESTNET_URL, BybitAPIError, BybitClient
from bybit_mcp.config import Settings

from conftest import MockBybit


def make_client(mock: MockBybit, **overrides) -> BybitClient:
    values = {"api_key": "test-key", "api_secret": "test-secret", "env": "testnet"}
    values.update(overrides)
    settings = Settings(**values)
    return BybitClient(settings, mock.client())


def recompute_signature(request: httpx.Request, secret: str, payload: str) -> str:
    message = (
        request.headers["X-BAPI-TIMESTAMP"]
        + request.headers["X-BAPI-API-KEY"]
        + request.headers["X-BAPI-RECV-WINDOW"]
        + payload
    )
    return hmac.new(secret.encode(), message.encode(), hashlib.sha256).hexdigest()


def test_base_url_follows_environment(mock_bybit: MockBybit):
    assert make_client(mock_bybit).base_url == TESTNET_URL
    assert make_client(mock_bybit, env="mainnet").base_url == MAINNET_URL


def test_public_get_sends_no_auth_headers(mock_bybit: MockBybit):
    make_client(mock_bybit).get(
        "/v5/market/tickers", {"category": "linear", "symbol": "BTCUSDT"}
    )
    request = mock_bybit.requests[0]
    assert "X-BAPI-SIGN" not in request.headers
    assert "X-BAPI-API-KEY" not in request.headers


def test_none_params_are_dropped(mock_bybit: MockBybit):
    make_client(mock_bybit).get(
        "/v5/market/tickers", {"category": "linear", "symbol": None}
    )
    assert b"symbol" not in mock_bybit.requests[0].url.query


def test_auth_get_signature_binds_query_string(mock_bybit: MockBybit):
    make_client(mock_bybit).get(
        "/v5/account/wallet-balance", {"accountType": "UNIFIED"}, auth=True
    )
    request = mock_bybit.requests[0]
    query = request.url.query.decode()
    assert query == "accountType=UNIFIED"
    assert request.headers["X-BAPI-SIGN-TYPE"] == "2"
    assert request.headers["X-BAPI-SIGN"] == recompute_signature(
        request, "test-secret", query
    )


def test_post_signature_binds_raw_body(mock_bybit: MockBybit):
    make_client(mock_bybit).post(
        "/v5/order/cancel",
        {"category": "linear", "symbol": "BTCUSDT", "orderId": "abc", "orderLinkId": None},
    )
    request = mock_bybit.requests[0]
    body = request.content.decode()
    assert json.loads(body) == {
        "category": "linear",
        "symbol": "BTCUSDT",
        "orderId": "abc",
    }  # None dropped, compact separators signed as sent
    assert request.headers["X-BAPI-SIGN"] == recompute_signature(
        request, "test-secret", body
    )


def test_non_zero_ret_code_raises(mock_bybit: MockBybit):
    mock_bybit.routes["/v5/order/cancel"] = {
        "retCode": 110001,
        "retMsg": "order not exists or too late to cancel",
        "result": {},
    }
    with pytest.raises(BybitAPIError) as excinfo:
        make_client(mock_bybit).post(
            "/v5/order/cancel", {"category": "linear", "symbol": "BTCUSDT", "orderId": "x"}
        )
    assert excinfo.value.ret_code == 110001
    assert "too late to cancel" in str(excinfo.value)


def test_auth_without_credentials_fails_before_any_request(mock_bybit: MockBybit):
    client = make_client(mock_bybit, api_key="", api_secret="")
    with pytest.raises(RuntimeError, match="BYBIT_API_KEY"):
        client.get("/v5/account/wallet-balance", {"accountType": "UNIFIED"}, auth=True)
    assert mock_bybit.requests == []
