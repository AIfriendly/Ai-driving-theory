"""The risk engine is the only backstop in autonomous mode — test it hard."""
from __future__ import annotations

from datetime import datetime, timezone

import pytest

from bybit_mcp import risk
from bybit_mcp.config import Settings

DAY0 = datetime(2026, 7, 14, 12, 0, tzinfo=timezone.utc).timestamp()
NEXT_DAY = datetime(2026, 7, 15, 0, 30, tzinfo=timezone.utc).timestamp()


def settings(**over) -> Settings:
    base = dict(
        env="mainnet",
        trading_enabled=True,
        autonomous=True,
        max_order_value=1000.0,
        daily_loss_limit=100.0,
        max_orders_per_day=5,
        max_open_positions=3,
        order_cooldown_sec=60,
        symbol_whitelist=("BTCUSDT", "ETHUSDT"),
    )
    base.update(over)
    return Settings(**base)


def ok_kwargs(**over):
    kw = dict(symbol="BTCUSDT", notional=500.0, equity=10_000.0, open_positions=0, now=DAY0)
    kw.update(over)
    return kw


def test_happy_path_admits_and_increments():
    d = risk.evaluate(settings(), risk.RiskState(), **ok_kwargs())
    assert d.allowed
    assert d.state.orders_today == 1
    assert d.state.day_start_equity == 10_000.0
    assert d.state.last_order_ts == DAY0


def test_missing_caps_is_fail_closed():
    s = settings(daily_loss_limit=0.0, symbol_whitelist=())
    d = risk.evaluate(s, risk.RiskState(), **ok_kwargs())
    assert not d.allowed
    assert "BYBIT_DAILY_LOSS_LIMIT" in d.reason
    assert "BYBIT_SYMBOL_WHITELIST" in d.reason


def test_symbol_not_whitelisted_is_rejected():
    d = risk.evaluate(settings(), risk.RiskState(), **ok_kwargs(symbol="SOLUSDT"))
    assert not d.allowed
    assert "whitelist" in d.reason.lower()


def test_daily_loss_kill_switch_halts_new_entries():
    # Day starts at 10_000; equity now 9_900 => drawdown 100 >= limit 100.
    state = risk.RiskState(day="2026-07-14", orders_today=1, day_start_equity=10_000.0)
    d = risk.evaluate(settings(), state, **ok_kwargs(equity=9_900.0))
    assert not d.allowed
    assert "daily loss limit" in d.reason


def test_just_above_loss_limit_still_allowed():
    state = risk.RiskState(day="2026-07-14", orders_today=1, day_start_equity=10_000.0)
    d = risk.evaluate(settings(), state, **ok_kwargs(equity=9_901.0))  # drawdown 99 < 100
    assert d.allowed


def test_orders_per_day_cap():
    state = risk.RiskState(day="2026-07-14", orders_today=5, day_start_equity=10_000.0)
    d = risk.evaluate(settings(), state, **ok_kwargs())
    assert not d.allowed
    assert "max orders/day" in d.reason


def test_max_open_positions_cap():
    d = risk.evaluate(settings(), risk.RiskState(), **ok_kwargs(open_positions=3))
    assert not d.allowed
    assert "max open positions" in d.reason


def test_cooldown_blocks_then_clears():
    state = risk.RiskState(day="2026-07-14", orders_today=1, day_start_equity=10_000.0,
                           last_order_ts=DAY0)
    blocked = risk.evaluate(settings(), state, **ok_kwargs(now=DAY0 + 30))
    assert not blocked.allowed
    assert "cooldown" in blocked.reason
    cleared = risk.evaluate(settings(), state, **ok_kwargs(now=DAY0 + 61))
    assert cleared.allowed


def test_notional_cap_defense_in_depth():
    d = risk.evaluate(settings(), risk.RiskState(), **ok_kwargs(notional=1500.0))
    assert not d.allowed
    assert "notional" in d.reason


def test_new_utc_day_resets_counters_and_rebaselines_equity():
    # Yesterday: hit the per-day cap and a lower equity baseline.
    state = risk.RiskState(day="2026-07-14", orders_today=5, day_start_equity=10_000.0,
                           last_order_ts=DAY0)
    d = risk.evaluate(settings(), state, **ok_kwargs(equity=9_500.0, now=NEXT_DAY))
    assert d.allowed                       # fresh day, counter reset
    assert d.state.day == "2026-07-15"
    assert d.state.orders_today == 1
    assert d.state.day_start_equity == 9_500.0  # rebaselined to today's equity


def test_rejection_still_persists_day_rollover():
    # New day but immediately blocked (not whitelisted): the rolled day/equity
    # must still be returned so it gets persisted.
    state = risk.RiskState(day="2026-07-14", orders_today=5, day_start_equity=10_000.0)
    d = risk.evaluate(settings(), state, **ok_kwargs(symbol="XRPUSDT", now=NEXT_DAY))
    assert not d.allowed
    assert d.state.day == "2026-07-15"
    assert d.state.orders_today == 0


def test_state_roundtrip(tmp_path):
    path = tmp_path / "nested" / "risk_state.json"
    state = risk.RiskState(day="2026-07-14", orders_today=3, day_start_equity=12_345.6,
                           last_order_ts=DAY0)
    risk.save_state(path, state)
    assert risk.load_state(path) == state


def test_load_missing_state_returns_default(tmp_path):
    assert risk.load_state(tmp_path / "nope.json") == risk.RiskState()


def test_default_state_path_prefers_env():
    s = Settings(state_path="/custom/state.json")
    assert str(risk.default_state_path(s)) == "/custom/state.json"
