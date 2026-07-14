"""Autonomous-mode risk engine.

When the human CONFIRM gate is removed (BYBIT_AUTONOMOUS=true), these caps are
the *only* thing between a bad analysis and a drained account. The design goals:

* Fail-closed: refuse to open positions until the mandatory caps are configured.
* Exits are sacred: these guards apply only to position-OPENING orders. A
  reduce_only close is never blocked, so the agent can always de-risk.
* Pure core: `evaluate()` is a pure function of (settings, state, snapshot) so
  it is exhaustively unit-testable without network or clocks.

The daily loss kill-switch is measured as equity drawdown from the day's
starting equity (captured on the first check of each UTC day), which naturally
accounts for realised AND unrealised PnL without trying to reconstruct fills.
"""
from __future__ import annotations

import json
from dataclasses import asdict, dataclass, replace
from datetime import datetime, timezone
from pathlib import Path

from .config import Settings


@dataclass(frozen=True)
class RiskState:
    day: str = ""                 # UTC date "YYYY-MM-DD" the counters belong to
    orders_today: int = 0         # opening orders admitted today
    day_start_equity: float = 0.0 # equity captured at the first check of `day`
    last_order_ts: float = 0.0    # epoch seconds of the last admitted opening order


@dataclass(frozen=True)
class Decision:
    allowed: bool
    reason: str
    state: RiskState  # state to persist (day/equity may roll even on rejection)


def _utc_day(now: float) -> str:
    return datetime.fromtimestamp(now, tz=timezone.utc).strftime("%Y-%m-%d")


def default_state_path(settings: Settings) -> Path:
    if settings.state_path:
        return Path(settings.state_path)
    return Path.home() / ".bybit" / "risk_state.json"


def load_state(path: Path) -> RiskState:
    try:
        data = json.loads(path.read_text())
    except (FileNotFoundError, ValueError):
        return RiskState()
    known = {f: data[f] for f in RiskState.__dataclass_fields__ if f in data}
    return RiskState(**known)


def save_state(path: Path, state: RiskState) -> None:
    path.parent.mkdir(parents=True, exist_ok=True, mode=0o700)
    path.write_text(json.dumps(asdict(state), indent=2))


def evaluate(
    settings: Settings,
    state: RiskState,
    *,
    symbol: str,
    notional: float,
    equity: float,
    open_positions: int,
    now: float,
) -> Decision:
    """Decide whether one position-OPENING order may proceed. Pure function.

    On a new UTC day the counters reset and the day's starting equity is
    (re)captured from the current equity snapshot. The returned Decision always
    carries the state to persist so day rollover survives even a rejection.
    """
    day = _utc_day(now)
    if state.day != day or state.day_start_equity <= 0:
        state = replace(state, day=day, orders_today=0, day_start_equity=equity)

    # 0) fail-closed: mandatory caps must be configured
    gaps = settings.autonomous_gaps()
    if gaps:
        return Decision(
            False,
            "autonomous mode requires these caps first: " + ", ".join(gaps),
            state,
        )

    # 1) symbol whitelist
    if symbol.upper() not in settings.symbol_whitelist:
        return Decision(
            False,
            f"{symbol} is not in BYBIT_SYMBOL_WHITELIST "
            f"({', '.join(settings.symbol_whitelist)})",
            state,
        )

    # 2) daily loss kill-switch (drawdown from day-start equity)
    drawdown = state.day_start_equity - equity
    if drawdown >= settings.daily_loss_limit:
        return Decision(
            False,
            f"daily loss limit hit: drawdown {drawdown:.2f} >= "
            f"{settings.daily_loss_limit:.2f} (day start {state.day_start_equity:.2f}, "
            f"now {equity:.2f}); opening new positions halted until UTC rollover",
            state,
        )

    # 3) orders-per-day cap
    if state.orders_today >= settings.max_orders_per_day:
        return Decision(
            False,
            f"max orders/day reached ({state.orders_today}/{settings.max_orders_per_day})",
            state,
        )

    # 4) concurrent open positions
    if settings.max_open_positions > 0 and open_positions >= settings.max_open_positions:
        return Decision(
            False,
            f"max open positions reached ({open_positions}/{settings.max_open_positions})",
            state,
        )

    # 5) cooldown between opening orders
    if settings.order_cooldown_sec > 0:
        elapsed = now - state.last_order_ts
        if elapsed < settings.order_cooldown_sec:
            return Decision(
                False,
                f"cooldown active: {settings.order_cooldown_sec - elapsed:.0f}s "
                "until the next opening order is allowed",
                state,
            )

    # 6) notional cap (defense in depth; also enforced in place_order)
    if settings.max_order_value > 0 and notional > settings.max_order_value:
        return Decision(
            False,
            f"order notional {notional:.2f} exceeds BYBIT_MAX_ORDER_VALUE "
            f"{settings.max_order_value:.2f}",
            state,
        )

    admitted = replace(state, orders_today=state.orders_today + 1, last_order_ts=now)
    return Decision(True, "ok", admitted)
