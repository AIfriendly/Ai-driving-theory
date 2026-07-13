"""Shared fixtures: a mocked Bybit HTTP backend and clean env/server state."""
from __future__ import annotations

import os
from typing import Any, Callable

import httpx
import pytest

from bybit_mcp import server
from bybit_mcp.api import TESTNET_URL
from bybit_mcp.config import Settings

RouteResult = dict[str, Any]
Route = RouteResult | Callable[[httpx.Request], RouteResult]

DEFAULT_ROUTES: dict[str, Route] = {
    "/v5/market/tickers": {
        "category": "linear",
        "list": [
            {
                "symbol": "BTCUSDT",
                "lastPrice": "50000",
                "bid1Price": "49999.5",
                "ask1Price": "50000.5",
                "volume24h": "12345",
            }
        ],
    },
    "/v5/market/orderbook": {
        "s": "BTCUSDT",
        "b": [["49999.5", "2.5"], ["49999", "1"]],
        "a": [["50000.5", "3"], ["50001", "1.5"]],
        "ts": 1700000000000,
        "u": 1,
    },
    "/v5/market/instruments-info": {
        "category": "linear",
        "list": [
            {
                "symbol": "BTCUSDT",
                "lotSizeFilter": {"qtyStep": "0.001", "minOrderQty": "0.001"},
                "priceFilter": {"tickSize": "0.1"},
            }
        ],
    },
    "/v5/account/wallet-balance": {
        "list": [
            {
                "accountType": "UNIFIED",
                "totalEquity": "10000.5",
                "totalAvailableBalance": "8000",
                "totalPerpUPL": "12.5",
                "coin": [
                    {
                        "coin": "USDT",
                        "equity": "10000.5",
                        "walletBalance": "10000.5",
                        "usdValue": "10000.5",
                        "unrealisedPnl": "0",
                    },
                    {
                        "coin": "BTC",
                        "equity": "0",
                        "walletBalance": "0",
                        "usdValue": "0",
                        "unrealisedPnl": "",
                    },
                ],
            }
        ]
    },
    "/v5/position/list": {
        "list": [
            {
                "symbol": "BTCUSDT",
                "side": "Buy",
                "size": "0.5",
                "avgPrice": "48000",
                "markPrice": "50000",
                "liqPrice": "40000",
                "leverage": "5",
                "unrealisedPnl": "1000",
                "curRealisedPnl": "-2",
                "stopLoss": "47000",
                "takeProfit": "55000",
                "positionIdx": 0,
                "updatedTime": "1700000000000",
            },
            {"symbol": "ETHUSDT", "side": "None", "size": "0", "avgPrice": "0"},
        ]
    },
    "/v5/order/realtime": {"list": []},
    "/v5/order/create": {"orderId": "order-1", "orderLinkId": "link-1"},
    "/v5/order/cancel": {"orderId": "order-1"},
    "/v5/position/set-leverage": {},
}


class MockBybit:
    """Routes requests by URL path and records everything that was sent."""

    def __init__(self, routes: dict[str, Route] | None = None):
        self.requests: list[httpx.Request] = []
        self.routes: dict[str, Route] = dict(DEFAULT_ROUTES)
        if routes:
            self.routes.update(routes)

    def handler(self, request: httpx.Request) -> httpx.Response:
        self.requests.append(request)
        route = self.routes.get(request.url.path)
        if route is None:
            return httpx.Response(
                200,
                json={
                    "retCode": 10001,
                    "retMsg": f"unmocked path {request.url.path}",
                    "result": {},
                },
            )
        result = route(request) if callable(route) else route
        if "retCode" in result:  # pre-built full envelope (for error simulation)
            return httpx.Response(200, json=result)
        return httpx.Response(
            200,
            json={"retCode": 0, "retMsg": "OK", "result": result, "time": 1700000000000},
        )

    def client(self) -> httpx.Client:
        return httpx.Client(
            transport=httpx.MockTransport(self.handler), base_url=TESTNET_URL
        )

    def paths(self) -> list[str]:
        return [request.url.path for request in self.requests]


@pytest.fixture(autouse=True)
def clean_state():
    """Isolate BYBIT_* env vars and the server's module-level state per test."""
    saved = os.environ.copy()
    for key in [k for k in os.environ if k.startswith("BYBIT_")]:
        del os.environ[key]
    server._settings = None
    server._client = None
    yield
    os.environ.clear()
    os.environ.update(saved)
    server._settings = None
    server._client = None


@pytest.fixture
def mock_bybit() -> MockBybit:
    return MockBybit()


def configure_server(mock: MockBybit, **overrides: Any) -> Settings:
    """Point the MCP server at the mocked backend with test credentials."""
    values: dict[str, Any] = {
        "api_key": "test-key",
        "api_secret": "test-secret",
        "env": "testnet",
        "trading_enabled": True,
    }
    values.update(overrides)
    settings = Settings(**values)
    server.configure(settings, mock.client())
    return settings
