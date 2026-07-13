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

    def __post_init__(self) -> None:
        if self.env not in VALID_ENVS:
            raise ValueError(
                f"BYBIT_ENV must be one of {VALID_ENVS}, got {self.env!r}. "
                "Refusing to guess an endpoint (fail-closed)."
            )
        if self.max_leverage <= 0:
            raise ValueError("BYBIT_MAX_LEVERAGE must be positive")
        if self.max_order_value < 0:
            raise ValueError("BYBIT_MAX_ORDER_VALUE must be >= 0 (0 disables the cap)")
        if self.recv_window <= 0:
            raise ValueError("BYBIT_RECV_WINDOW must be positive")


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
    )
