"""Environment-driven settings with fail-closed defaults.

Every default errs on the side of doing nothing dangerous: testnet,
trading disabled, 5x leverage cap. Live trading requires three explicit
opt-ins (BYBIT_ENV=mainnet, BYBIT_TRADING_ENABLED=true, API keys).
"""
from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path

VALID_ENVS = ("testnet", "mainnet")

_TRUE_VALUES = ("1", "true", "yes", "on")


@dataclass(frozen=True)
class Settings:
    api_key: str = ""
    api_secret: str = ""
    env: str = "testnet"
    trading_enabled: bool = False
    max_leverage: float = 5.0
    # Per-order notional cap in quote currency (e.g. USDT). 0 disables the cap.
    max_order_value: float = 0.0
    recv_window: int = 5000
    # Explicit REST base-URL override, e.g. https://api.bybit.ae for a UAE
    # account. Empty => testnet/mainnet chosen from `env`.
    base_url: str = ""

    # --- Autonomous (unattended) mode ---------------------------------------
    # When true, place_order may run without the human CONFIRM gate, BUT the
    # risk caps below become MANDATORY: with no human in the loop they are the
    # only backstop, so the server refuses to open positions until they are set.
    autonomous: bool = False
    # Daily loss kill-switch (quote ccy). If equity falls this far below the
    # day's starting equity, opening new positions is halted (exits still allowed).
    daily_loss_limit: float = 0.0
    max_orders_per_day: int = 0        # 0 => unlimited (disallowed in autonomous mode)
    max_open_positions: int = 0        # 0 => unlimited
    order_cooldown_sec: int = 0        # min seconds between opening orders
    symbol_whitelist: tuple[str, ...] = ()  # only these symbols may be opened
    # Where the risk engine persists day/order state. Empty => ~/.bybit/risk_state.json
    state_path: str = ""

    def __post_init__(self) -> None:
        if self.env not in VALID_ENVS:
            raise ValueError(
                f"BYBIT_ENV must be one of {VALID_ENVS}, got {self.env!r}. "
                "Refusing to guess an endpoint (fail-closed)."
            )
        if self.base_url and not self.base_url.startswith("https://"):
            raise ValueError("BYBIT_BASE_URL must be an https:// URL")
        if self.max_leverage <= 0:
            raise ValueError("BYBIT_MAX_LEVERAGE must be positive")
        if self.max_order_value < 0:
            raise ValueError("BYBIT_MAX_ORDER_VALUE must be >= 0 (0 disables the cap)")
        if self.daily_loss_limit < 0:
            raise ValueError("BYBIT_DAILY_LOSS_LIMIT must be >= 0")
        if self.max_orders_per_day < 0:
            raise ValueError("BYBIT_MAX_ORDERS_PER_DAY must be >= 0")
        if self.max_open_positions < 0:
            raise ValueError("BYBIT_MAX_OPEN_POSITIONS must be >= 0")
        if self.order_cooldown_sec < 0:
            raise ValueError("BYBIT_ORDER_COOLDOWN_SEC must be >= 0")
        if self.recv_window <= 0:
            raise ValueError("BYBIT_RECV_WINDOW must be positive")

    def autonomous_gaps(self) -> list[str]:
        """Env vars that MUST be set before unattended trading is allowed.

        With no human confirming each trade, these caps are the only backstop,
        so autonomous mode is fail-closed until every one of them is configured.
        """
        gaps: list[str] = []
        if self.max_order_value <= 0:
            gaps.append("BYBIT_MAX_ORDER_VALUE")
        if self.daily_loss_limit <= 0:
            gaps.append("BYBIT_DAILY_LOSS_LIMIT")
        if self.max_orders_per_day <= 0:
            gaps.append("BYBIT_MAX_ORDERS_PER_DAY")
        if not self.symbol_whitelist:
            gaps.append("BYBIT_SYMBOL_WHITELIST")
        return gaps


def _load_dotenv(path: Path) -> None:
    """Populate os.environ from a .env file without overriding real env vars."""
    if not path.is_file():
        return
    for line in path.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, value = line.partition("=")
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        if key:
            os.environ.setdefault(key, value)


def _flag(name: str, default: str = "false") -> bool:
    return os.environ.get(name, default).strip().lower() in _TRUE_VALUES


def _symbols(name: str) -> tuple[str, ...]:
    raw = os.environ.get(name, "")
    return tuple(s.strip().upper() for s in raw.split(",") if s.strip())


def load_settings(dotenv: Path | None = None) -> Settings:
    _load_dotenv(dotenv if dotenv is not None else Path.cwd() / ".env")
    return Settings(
        api_key=os.environ.get("BYBIT_API_KEY", "").strip(),
        api_secret=os.environ.get("BYBIT_API_SECRET", "").strip(),
        env=os.environ.get("BYBIT_ENV", "testnet").strip().lower(),
        trading_enabled=_flag("BYBIT_TRADING_ENABLED"),
        max_leverage=float(os.environ.get("BYBIT_MAX_LEVERAGE", "5")),
        max_order_value=float(os.environ.get("BYBIT_MAX_ORDER_VALUE", "0")),
        recv_window=int(os.environ.get("BYBIT_RECV_WINDOW", "5000")),
        base_url=os.environ.get("BYBIT_BASE_URL", "").strip().rstrip("/"),
        autonomous=_flag("BYBIT_AUTONOMOUS"),
        daily_loss_limit=float(os.environ.get("BYBIT_DAILY_LOSS_LIMIT", "0")),
        max_orders_per_day=int(os.environ.get("BYBIT_MAX_ORDERS_PER_DAY", "0")),
        max_open_positions=int(os.environ.get("BYBIT_MAX_OPEN_POSITIONS", "0")),
        order_cooldown_sec=int(os.environ.get("BYBIT_ORDER_COOLDOWN_SEC", "0")),
        symbol_whitelist=_symbols("BYBIT_SYMBOL_WHITELIST"),
        state_path=os.environ.get("BYBIT_STATE_PATH", "").strip(),
    )
