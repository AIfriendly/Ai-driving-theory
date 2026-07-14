"""The risk harness must reject bad orders BEFORE anything reaches Bybit."""
from __future__ import annotations

import asyncio
import json
from datetime import datetime, timezone

import pytest

from bybit_mcp import risk, server

from conftest import MockBybit, configure_server

MANUAL_TOOLS = {
    "get_tickers",
    "get_klines",
    "get_orderbook",
    "place_order",
    "get_wallet_balance",
    "get_positions",
}


def order_create_body(mock: MockBybit) -> dict:
    creates = [r for r in mock.requests if r.url.path == "/v5/order/create"]
    assert len(creates) == 1
    return json.loads(creates[0].content)


def test_all_tools_from_the_operating_manual_exist():
    tools = asyncio.run(server.mcp.list_tools())
    names = {tool.name for tool in tools}
    assert MANUAL_TOOLS <= names
    assert {"get_instruments_info", "set_leverage", "cancel_order", "get_trading_status"} <= names


# -- gate 1: trading disabled by default ------------------------------------


def test_place_order_rejected_when_trading_disabled(mock_bybit: MockBybit):
    configure_server(mock_bybit, trading_enabled=False)
    with pytest.raises(ValueError, match="read-only"):
        server.place_order("BTCUSDT", "Buy", qty=0.01, stop_loss=49000)
    assert mock_bybit.requests == []


def test_set_leverage_and_cancel_rejected_when_trading_disabled(mock_bybit: MockBybit):
    configure_server(mock_bybit, trading_enabled=False)
    with pytest.raises(ValueError, match="fail-closed"):
        server.set_leverage("BTCUSDT", 3)
    with pytest.raises(ValueError, match="fail-closed"):
        server.cancel_order("BTCUSDT", order_id="abc")
    assert mock_bybit.requests == []


# -- gate 2: mandatory stop-loss ---------------------------------------------


def test_place_order_requires_stop_loss(mock_bybit: MockBybit):
    configure_server(mock_bybit)
    with pytest.raises(ValueError, match="stop_loss is mandatory"):
        server.place_order("BTCUSDT", "Buy", qty=0.01)
    assert "/v5/order/create" not in mock_bybit.paths()


def test_reduce_only_close_does_not_require_stop_loss(mock_bybit: MockBybit):
    configure_server(mock_bybit)
    result = server.place_order("BTCUSDT", "Sell", qty=0.5, reduce_only=True)
    assert result["status"] == "submitted"
    body = order_create_body(mock_bybit)
    assert body["reduceOnly"] is True
    assert "stopLoss" not in body


def test_stop_loss_must_be_below_entry_for_long(mock_bybit: MockBybit):
    configure_server(mock_bybit)  # mocked last price: 50000
    with pytest.raises(ValueError, match="BELOW"):
        server.place_order("BTCUSDT", "Buy", qty=0.01, stop_loss=51000)
    assert "/v5/order/create" not in mock_bybit.paths()


def test_stop_loss_must_be_above_entry_for_short_limit(mock_bybit: MockBybit):
    configure_server(mock_bybit)
    with pytest.raises(ValueError, match="ABOVE"):
        server.place_order(
            "BTCUSDT", "Sell", qty=0.01, order_type="Limit", price=50000, stop_loss=49000
        )
    assert mock_bybit.requests == []  # limit price known: no ticker call needed


def test_take_profit_side_is_validated(mock_bybit: MockBybit):
    configure_server(mock_bybit)
    with pytest.raises(ValueError, match="take_profit"):
        server.place_order(
            "BTCUSDT", "Buy", qty=0.01, stop_loss=49000, take_profit=48000
        )


def test_limit_order_requires_price(mock_bybit: MockBybit):
    configure_server(mock_bybit)
    with pytest.raises(ValueError, match="requires a price"):
        server.place_order("BTCUSDT", "Buy", qty=0.01, order_type="Limit", stop_loss=49000)


# -- gate 3: notional cap ----------------------------------------------------


def test_notional_cap_blocks_oversized_market_order(mock_bybit: MockBybit):
    configure_server(mock_bybit, max_order_value=1000)
    with pytest.raises(ValueError, match="exceeds"):
        server.place_order("BTCUSDT", "Buy", qty=0.1, stop_loss=49000)  # 0.1 * 50000 = 5000
    assert "/v5/order/create" not in mock_bybit.paths()


# -- gate 4: leverage cap ----------------------------------------------------


def test_leverage_above_cap_is_rejected(mock_bybit: MockBybit):
    configure_server(mock_bybit)  # default cap 5
    with pytest.raises(ValueError, match="exceeds the hard"):
        server.set_leverage("BTCUSDT", 10)
    assert mock_bybit.requests == []


def test_leverage_at_cap_is_allowed(mock_bybit: MockBybit):
    configure_server(mock_bybit)
    assert server.set_leverage("BTCUSDT", 5)["status"] == "ok"


def test_leverage_not_modified_is_reported_as_unchanged(mock_bybit: MockBybit):
    mock_bybit.routes["/v5/position/set-leverage"] = {
        "retCode": 110043,
        "retMsg": "leverage not modified",
        "result": {},
    }
    configure_server(mock_bybit)
    assert server.set_leverage("BTCUSDT", 3)["status"] == "unchanged"


# -- happy path --------------------------------------------------------------


def test_valid_market_order_sends_stop_loss_to_exchange(mock_bybit: MockBybit):
    configure_server(mock_bybit)
    result = server.place_order(
        "BTCUSDT", "Buy", qty=0.01, stop_loss=49000, take_profit=52000
    )
    assert result["status"] == "submitted"
    assert result["environment"] == "testnet"
    assert result["orderId"] == "order-1"
    body = order_create_body(mock_bybit)
    assert body["stopLoss"] == "49000"
    assert body["takeProfit"] == "52000"
    assert body["qty"] == "0.01"
    assert body["orderType"] == "Market"
    assert "timeInForce" not in body  # exchange default (IOC) for market orders


def test_qty_passed_as_string_is_preserved_exactly(mock_bybit: MockBybit):
    configure_server(mock_bybit)
    server.place_order(
        "BTCUSDT", "Buy", qty="0.010", order_type="Limit", price="50000",
        stop_loss="49000", time_in_force="PostOnly",
    )
    body = order_create_body(mock_bybit)
    assert body["qty"] == "0.010"
    assert body["price"] == "50000"
    assert body["timeInForce"] == "PostOnly"


def test_cancel_order_requires_an_id(mock_bybit: MockBybit):
    configure_server(mock_bybit)
    with pytest.raises(ValueError, match="order_id or order_link_id"):
        server.cancel_order("BTCUSDT")


# -- market data -------------------------------------------------------------


def kline_rows(request):
    now_ms = int(datetime.now(tz=timezone.utc).timestamp() * 1000)
    closed_start = now_ms - 2 * 900_000
    forming_start = now_ms - 450_000  # 15m candle started 7.5 minutes ago
    return {
        "category": "linear",
        "symbol": "BTCUSDT",
        "list": [  # Bybit returns newest first
            [str(forming_start), "50100", "50200", "50000", "50150", "10", "5e5"],
            [str(closed_start), "50000", "50120", "49900", "50100", "12", "6e5"],
        ],
    }


def test_get_klines_drops_the_forming_candle_by_default(mock_bybit: MockBybit):
    mock_bybit.routes["/v5/market/kline"] = kline_rows
    configure_server(mock_bybit)
    result = server.get_klines("BTCUSDT", interval="15", limit=5)
    assert result["dropped_unclosed_candle"] is True
    assert result["count"] == 1
    assert result["candles"][-1]["close"] == 50100.0  # the closed candle

    kept = server.get_klines("BTCUSDT", interval="15", limit=5, include_unclosed=True)
    assert kept["count"] == 2


def test_get_klines_rejects_unknown_interval(mock_bybit: MockBybit):
    configure_server(mock_bybit)
    with pytest.raises(ValueError, match="interval"):
        server.get_klines("BTCUSDT", interval="7")


def test_get_orderbook_computes_spread_and_depth(mock_bybit: MockBybit):
    configure_server(mock_bybit)
    book = server.get_orderbook("BTCUSDT")
    assert book["best_bid"] == 49999.5
    assert book["best_ask"] == 50000.5
    assert book["spread"] == 1.0
    assert book["spread_bps"] == 0.2
    assert book["bid_depth"] == 3.5
    assert book["ask_depth"] == 4.5


def test_get_wallet_balance_omits_zero_coins(mock_bybit: MockBybit):
    configure_server(mock_bybit)
    wallet = server.get_wallet_balance()
    assert wallet["totalEquity"] == 10000.5
    assert [coin["coin"] for coin in wallet["coins"]] == ["USDT"]


def test_get_positions_hides_flat_positions_unless_symbol_given(mock_bybit: MockBybit):
    configure_server(mock_bybit)
    positions = server.get_positions()
    assert positions["count"] == 1
    assert positions["positions"][0]["symbol"] == "BTCUSDT"
    assert positions["positions"][0]["stopLoss"] == 47000.0

    # With an explicit symbol, flat positions are kept so the agent can confirm
    # it is flat. The mock echoes both rows back regardless of the symbol param.
    scoped = server.get_positions(symbol="ETHUSDT")
    assert scoped["count"] == 2


def test_get_trading_status_reports_the_harness(mock_bybit: MockBybit):
    configure_server(mock_bybit, trading_enabled=False, max_order_value=0)
    status = server.get_trading_status()
    assert status["environment"] == "testnet"
    assert status["trading_enabled"] is False
    assert status["max_leverage"] == 5.0
    assert status["max_order_value"] == "disabled"
    assert status["api_key_configured"] is True
    assert status["autonomous"] is False


def test_base_url_override_is_reported(mock_bybit: MockBybit):
    configure_server(mock_bybit, base_url="https://api.bybit.ae")
    assert server.get_trading_status()["endpoint"] == "https://api.bybit.ae"


# -- autonomous (unattended) mode -------------------------------------------


def autonomous_kwargs(tmp_path, **over):
    kw = dict(
        autonomous=True,
        env="mainnet",
        max_order_value=1000.0,
        daily_loss_limit=100.0,
        max_orders_per_day=5,
        max_open_positions=3,
        order_cooldown_sec=0,
        symbol_whitelist=("BTCUSDT",),
        state_path=str(tmp_path / "risk_state.json"),
    )
    kw.update(over)
    return kw


def test_autonomous_status_flags_missing_caps(mock_bybit: MockBybit, tmp_path):
    configure_server(mock_bybit, **autonomous_kwargs(tmp_path, daily_loss_limit=0.0,
                                                     symbol_whitelist=()))
    status = server.get_trading_status()
    assert status["autonomous"] is True
    assert status["autonomous_ready"] is False
    assert set(status["autonomous_missing_caps"]) == {
        "BYBIT_DAILY_LOSS_LIMIT",
        "BYBIT_SYMBOL_WHITELIST",
    }


def test_autonomous_refuses_to_open_until_caps_set(mock_bybit: MockBybit, tmp_path):
    configure_server(mock_bybit, **autonomous_kwargs(tmp_path, daily_loss_limit=0.0))
    with pytest.raises(ValueError, match="autonomous mode requires"):
        server.place_order("BTCUSDT", "Buy", qty=0.01, stop_loss=49000)
    assert "/v5/order/create" not in mock_bybit.paths()


def test_autonomous_rejects_non_whitelisted_symbol(mock_bybit: MockBybit, tmp_path):
    # Route ETHUSDT ticker so price lookup succeeds before the whitelist check.
    mock_bybit.routes["/v5/market/tickers"] = {
        "list": [{"symbol": "ETHUSDT", "lastPrice": "3000"}]
    }
    configure_server(mock_bybit, **autonomous_kwargs(tmp_path))
    with pytest.raises(ValueError, match="not in BYBIT_SYMBOL_WHITELIST"):
        server.place_order("ETHUSDT", "Buy", qty=0.01, stop_loss=2900)
    assert "/v5/order/create" not in mock_bybit.paths()


def test_autonomous_happy_path_admits_and_persists_state(mock_bybit: MockBybit, tmp_path):
    configure_server(mock_bybit, **autonomous_kwargs(tmp_path))
    result = server.place_order("BTCUSDT", "Buy", qty=0.01, stop_loss=49000)
    assert result["status"] == "submitted"
    assert "/v5/order/create" in mock_bybit.paths()
    saved = risk.load_state(tmp_path / "risk_state.json")
    assert saved.orders_today == 1
    assert saved.day_start_equity == 10000.5  # from mocked wallet totalEquity


def test_autonomous_daily_loss_halts_new_entries(mock_bybit: MockBybit, tmp_path):
    # Wallet equity 10_000.5; pre-seed the day baseline high so we're in drawdown.
    state_file = tmp_path / "risk_state.json"
    risk.save_state(
        state_file,
        risk.RiskState(day=datetime.now(tz=timezone.utc).strftime("%Y-%m-%d"),
                       orders_today=1, day_start_equity=10_200.0),
    )
    configure_server(mock_bybit, **autonomous_kwargs(tmp_path))  # loss limit 100
    with pytest.raises(ValueError, match="daily loss limit"):
        server.place_order("BTCUSDT", "Buy", qty=0.01, stop_loss=49000)
    assert "/v5/order/create" not in mock_bybit.paths()


def test_autonomous_reduce_only_exit_is_never_blocked(mock_bybit: MockBybit, tmp_path):
    # Missing caps AND a non-whitelisted symbol, but a closing order must pass.
    configure_server(mock_bybit, **autonomous_kwargs(tmp_path, daily_loss_limit=0.0,
                                                     symbol_whitelist=()))
    result = server.place_order("XRPUSDT", "Sell", qty=10, reduce_only=True)
    assert result["status"] == "submitted"
    body = order_create_body(mock_bybit)
    assert body["reduceOnly"] is True
