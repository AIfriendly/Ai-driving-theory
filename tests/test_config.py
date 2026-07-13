from pathlib import Path

import pytest

from bybit_mcp.config import Settings, load_settings


def test_defaults_are_fail_closed(tmp_path: Path):
    settings = load_settings(dotenv=tmp_path / "missing.env")
    assert settings.env == "testnet"
    assert settings.trading_enabled is False
    assert settings.max_leverage == 5.0
    assert settings.max_order_value == 0.0
    assert settings.api_key == ""


def test_dotenv_is_loaded_but_real_env_wins(tmp_path: Path, monkeypatch):
    env_file = tmp_path / ".env"
    env_file.write_text(
        "BYBIT_ENV=mainnet\n"
        "BYBIT_MAX_LEVERAGE=3\n"
        "# comment line\n"
        'BYBIT_API_KEY="quoted-key"\n'
    )
    monkeypatch.setenv("BYBIT_MAX_LEVERAGE", "4")
    settings = load_settings(dotenv=env_file)
    assert settings.env == "mainnet"  # from .env
    assert settings.max_leverage == 4.0  # real env overrides .env
    assert settings.api_key == "quoted-key"  # quotes stripped


def test_unknown_environment_is_rejected(monkeypatch, tmp_path: Path):
    monkeypatch.setenv("BYBIT_ENV", "prod")
    with pytest.raises(ValueError, match="BYBIT_ENV"):
        load_settings(dotenv=tmp_path / "missing.env")


@pytest.mark.parametrize(
    ("raw", "expected"),
    [("true", True), ("TRUE", True), ("1", True), ("false", False), ("0", False), ("", False)],
)
def test_trading_flag_parsing(monkeypatch, tmp_path: Path, raw: str, expected: bool):
    monkeypatch.setenv("BYBIT_TRADING_ENABLED", raw)
    assert load_settings(dotenv=tmp_path / "missing.env").trading_enabled is expected


def test_negative_limits_rejected():
    with pytest.raises(ValueError):
        Settings(max_leverage=0)
    with pytest.raises(ValueError):
        Settings(max_order_value=-1)
