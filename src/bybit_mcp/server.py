"""Fail-closed Bybit V5 MCP server.

Exposes the market-data and trading tools the agent operating manual
(CLAUDE.md) is written against. The risk harness is enforced HERE, in code,
not only in the prompt:

* Trading tools are rejected unless BYBIT_TRADING_ENABLED=true (read-only
  by default).
* place_order refuses any position-opening order without a stop-loss, and
  rejects stop-losses on the wrong side of the entry price.
* set_leverage refuses anything above BYBIT_MAX_LEVERAGE (default 5x).
* An optional per-order notional cap (BYBIT_MAX_ORDER_VALUE) is enforced.
* Testnet is the default endpoint; mainnet requires BYBIT_ENV=mainnet.

Every Bybit error (non-zero retCode) is raised as a tool error with the
exchange's own message — the server never fabricates or repairs data.
"""
from __future__ import annotations

import sys
import time
from datetime import datetime, timezone
from typing import Any, Literal

import httpx
from mcp.server.fastmcp import FastMCP

from . import risk
from .api import BybitAPIError, BybitClient
from .config import Settings, load_settings

mcp = FastMCP(
    "bybit",
    instructions=(
        "Bybit V5 market-data and trading tools with a fail-closed risk harness. "
        "Call get_trading_status first to learn the environment (testnet/mainnet), "
        "whether trading is enabled, and the leverage cap. Market data tools are "
        "always available; trading tools require BYBIT_TRADING_ENABLED=true and "
        "every position-opening order must carry a stop_loss or it is rejected."
    ),
)

_settings: Settings | None = None
_client: BybitClient | None = None


def configure(settings: Settings, http: httpx.Client | None = None) -> None:
    """Install settings and (optionally) an injected HTTP client. Used by main() and tests."""
    global _settings, _client
    _settings = settings
    _client = BybitClient(settings, http)


def _get_settings() -> Settings:
    if _settings is None:
        configure(load_settings())
    assert _settings is not None
    return _settings


def _get_client() -> BybitClient:
    if _client is None:
        configure(load_settings())
    assert _client is not None
    return _client


# --------------------------------------------------------------------------
# Helpers
# --------------------------------------------------------------------------

_INTERVAL_MS: dict[str, int] = {
    "1": 60_000,
    "3": 180_000,
    "5": 300_000,
    "15": 900_000,
    "30": 1_800_000,
    "60": 3_600_000,
    "120": 7_200_000,
    "240": 14_400_000,
    "360": 21_600_000,
    "720": 43_200_000,
    "D": 86_400_000,
    "W": 604_800_000,
    "M": 2_419_200_000,  # 28 days: conservative lower bound for a monthly candle
}

MarketCategory = Literal["linear", "inverse", "spot", "option"]
DerivativeCategory = Literal["linear", "inverse"]


def _num(value: float | str, name: str) -> str:
    """Normalize a positive numeric argument to the string form Bybit expects."""
    if isinstance(value, str):
        text = value.strip()
        try:
            parsed = float(text)
        except ValueError:
            raise ValueError(f"{name} must be numeric, got {value!r}") from None
    else:
        parsed = float(value)
        text = f"{parsed:.12f}".rstrip("0").rstrip(".")
    if parsed <= 0:
        raise ValueError(f"{name} must be positive, got {value!r}")
    return text


def _f(value: Any) -> float:
    """Bybit returns numbers as strings and omissions as ''. Coerce safely."""
    if value in (None, ""):
        return 0.0
    return float(value)


def _iso(ms: int) -> str:
    return datetime.fromtimestamp(ms / 1000, tz=timezone.utc).strftime(
        "%Y-%m-%dT%H:%M:%SZ"
    )


def _require_trading_enabled(action: str) -> Settings:
    settings = _get_settings()
    if not settings.trading_enabled:
        raise ValueError(
            f"REJECTED (fail-closed): {action} is disabled because "
            "BYBIT_TRADING_ENABLED is not 'true'. The server is running in "
            "read-only mode. Enable it explicitly in the environment/.env "
            "if live order flow is intended."
        )
    return settings


def _fetch_equity_and_open_positions(client: BybitClient) -> tuple[float, int]:
    """Live account snapshot the risk engine needs: total equity and the count
    of currently open linear positions."""
    wallet = client.get(
        "/v5/account/wallet-balance", {"accountType": "UNIFIED"}, auth=True
    )
    accounts = wallet.get("list", [])
    if not accounts:
        raise ValueError("Cannot enforce risk limits: wallet balance unavailable")
    equity = _f(accounts[0].get("totalEquity"))

    pos = client.get(
        "/v5/position/list", {"category": "linear", "settleCoin": "USDT"}, auth=True
    )
    open_positions = sum(1 for p in pos.get("list", []) if _f(p.get("size")) > 0)
    return equity, open_positions


def _enforce_autonomous_guards(
    settings: Settings, client: BybitClient, symbol: str, notional: float
) -> None:
    """Gate a position-OPENING order through the risk engine when running
    unattended. Raises ValueError (surfaced as a tool error) on any breach and
    persists the day/counter state. Never called for reduce_only exits."""
    equity, open_positions = _fetch_equity_and_open_positions(client)
    state_path = risk.default_state_path(settings)
    state = risk.load_state(state_path)
    decision = risk.evaluate(
        settings,
        state,
        symbol=symbol,
        notional=notional,
        equity=equity,
        open_positions=open_positions,
        now=time.time(),
    )
    risk.save_state(state_path, decision.state)
    if not decision.allowed:
        raise ValueError(f"REJECTED (autonomous risk guard): {decision.reason}")


# --------------------------------------------------------------------------
# Market data tools (public, always available)
# --------------------------------------------------------------------------


@mcp.tool()
def get_trading_status() -> dict[str, Any]:
    """Report the server's risk-harness configuration: environment (testnet or
    mainnet), endpoint, whether trading tools are enabled, the leverage cap, the
    per-order notional cap, whether API credentials are present, and — when
    autonomous mode is on — whether the mandatory unattended-trading caps are
    fully configured. Call this first in a session and include the environment
    in any proposal."""
    settings = _get_settings()
    client = _get_client()
    gaps = settings.autonomous_gaps()
    return {
        "environment": settings.env,
        "endpoint": client.base_url,
        "trading_enabled": settings.trading_enabled,
        "max_leverage": settings.max_leverage,
        "max_order_value": settings.max_order_value or "disabled",
        "api_key_configured": bool(settings.api_key and settings.api_secret),
        "recv_window_ms": settings.recv_window,
        "autonomous": settings.autonomous,
        "autonomous_ready": settings.autonomous and not gaps,
        "autonomous_missing_caps": gaps if settings.autonomous else [],
        "daily_loss_limit": settings.daily_loss_limit or "unset",
        "max_orders_per_day": settings.max_orders_per_day or "unset",
        "max_open_positions": settings.max_open_positions or "unlimited",
        "order_cooldown_sec": settings.order_cooldown_sec,
        "symbol_whitelist": list(settings.symbol_whitelist) or "unset",
    }


@mcp.tool()
def get_tickers(symbol: str, category: MarketCategory = "linear") -> dict[str, Any]:
    """Get the live ticker for a symbol (e.g. BTCUSDT): last price, best
    bid/ask, 24h volume/turnover, funding rate and open interest for
    derivatives. Fields are returned exactly as Bybit reports them."""
    result = _get_client().get(
        "/v5/market/tickers", {"category": category, "symbol": symbol}
    )
    tickers = result.get("list", [])
    if not tickers:
        raise ValueError(f"Bybit returned no ticker for {symbol!r} in category {category!r}")
    return {"category": category, "ticker": tickers[0]}


@mcp.tool()
def get_klines(
    symbol: str,
    interval: str = "15",
    category: MarketCategory = "linear",
    limit: int = 200,
    include_unclosed: bool = False,
) -> dict[str, Any]:
    """Get OHLCV candlesticks, oldest first. Interval is minutes ("1", "3",
    "5", "15", "30", "60", "120", "240", "360", "720") or "D"/"W"/"M".
    By default the still-forming candle is EXCLUDED so analysis only sees
    closed candles (no lookahead); pass include_unclosed=true to keep it."""
    if interval not in _INTERVAL_MS:
        raise ValueError(
            f"interval must be one of {sorted(_INTERVAL_MS)}, got {interval!r}"
        )
    if not 1 <= limit <= 1000:
        raise ValueError("limit must be between 1 and 1000")

    # Fetch one extra row so dropping the forming candle still yields `limit`.
    request_limit = min(limit + 1, 1000)
    result = _get_client().get(
        "/v5/market/kline",
        {
            "category": category,
            "symbol": symbol,
            "interval": interval,
            "limit": request_limit,
        },
    )
    rows = result.get("list", [])  # Bybit returns newest first
    candles = [
        {
            "start": _iso(int(row[0])),
            "start_ms": int(row[0]),
            "open": _f(row[1]),
            "high": _f(row[2]),
            "low": _f(row[3]),
            "close": _f(row[4]),
            "volume": _f(row[5]),
            "turnover": _f(row[6]),
        }
        for row in reversed(rows)
    ]

    dropped_unclosed = False
    if candles and not include_unclosed:
        now_ms = int(datetime.now(tz=timezone.utc).timestamp() * 1000)
        if candles[-1]["start_ms"] + _INTERVAL_MS[interval] > now_ms:
            candles.pop()
            dropped_unclosed = True

    candles = candles[-limit:]
    return {
        "symbol": symbol,
        "category": category,
        "interval": interval,
        "count": len(candles),
        "dropped_unclosed_candle": dropped_unclosed,
        "candles": candles,
    }


@mcp.tool()
def get_orderbook(
    symbol: str, category: MarketCategory = "linear", limit: int = 25
) -> dict[str, Any]:
    """Get the order book with computed liquidity metrics: best bid/ask,
    absolute spread, spread in basis points, and summed depth on each side.
    Use this to check liquidity and spread before proposing market execution."""
    if not 1 <= limit <= 200:
        raise ValueError("limit must be between 1 and 200")
    result = _get_client().get(
        "/v5/market/orderbook",
        {"category": category, "symbol": symbol, "limit": limit},
    )
    bids = [[_f(price), _f(size)] for price, size in result.get("b", [])]
    asks = [[_f(price), _f(size)] for price, size in result.get("a", [])]
    if not bids or not asks:
        raise ValueError(f"Bybit returned an empty order book for {symbol!r}")
    best_bid, best_ask = bids[0][0], asks[0][0]
    mid = (best_bid + best_ask) / 2
    spread = best_ask - best_bid
    return {
        "symbol": symbol,
        "category": category,
        "timestamp": _iso(int(result.get("ts", 0))) if result.get("ts") else None,
        "best_bid": best_bid,
        "best_ask": best_ask,
        "spread": spread,
        "spread_bps": round(spread / mid * 10_000, 3) if mid else None,
        "bid_depth": sum(size for _, size in bids),
        "ask_depth": sum(size for _, size in asks),
        "bids": bids,
        "asks": asks,
    }


@mcp.tool()
def get_instruments_info(
    symbol: str, category: MarketCategory = "linear"
) -> dict[str, Any]:
    """Get contract specifications for a symbol: lot size filter (qtyStep,
    minOrderQty, minNotionalValue), price filter (tickSize) and leverage
    filter. REQUIRED before sizing: round quantities DOWN to qtyStep and
    prices to tickSize, and verify the minimums."""
    result = _get_client().get(
        "/v5/market/instruments-info", {"category": category, "symbol": symbol}
    )
    instruments = result.get("list", [])
    if not instruments:
        raise ValueError(
            f"Bybit returned no instrument info for {symbol!r} in category {category!r}"
        )
    return {"category": category, "instrument": instruments[0]}


# --------------------------------------------------------------------------
# Account tools (authenticated, read-only)
# --------------------------------------------------------------------------


@mcp.tool()
def get_wallet_balance(
    account_type: Literal["UNIFIED", "CONTRACT", "SPOT"] = "UNIFIED",
) -> dict[str, Any]:
    """Get wallet equity and available balance (authenticated). Returns total
    account equity in USD plus per-coin balances (zero balances omitted).
    Use totalEquity as the wallet balance for the 1%-risk position sizing."""
    result = _get_client().get(
        "/v5/account/wallet-balance", {"accountType": account_type}, auth=True
    )
    accounts = result.get("list", [])
    if not accounts:
        raise ValueError("Bybit returned no wallet data for this account type")
    account = accounts[0]
    coins = [
        {
            "coin": coin.get("coin"),
            "equity": _f(coin.get("equity")),
            "walletBalance": _f(coin.get("walletBalance")),
            "usdValue": _f(coin.get("usdValue")),
            "unrealisedPnl": _f(coin.get("unrealisedPnl")),
        }
        for coin in account.get("coin", [])
        if _f(coin.get("walletBalance")) != 0 or _f(coin.get("equity")) != 0
    ]
    return {
        "accountType": account.get("accountType"),
        "totalEquity": _f(account.get("totalEquity")),
        "totalAvailableBalance": _f(account.get("totalAvailableBalance")),
        "totalPerpUPL": _f(account.get("totalPerpUPL")),
        "coins": coins,
    }


@mcp.tool()
def get_positions(
    symbol: str | None = None,
    category: DerivativeCategory = "linear",
    settle_coin: str = "USDT",
) -> dict[str, Any]:
    """List derivative positions (authenticated). With a symbol, returns that
    symbol's position even if flat; without one, returns all open positions
    settling in settle_coin. Includes entry, mark and liquidation prices,
    leverage, unrealised PnL and the attached stop-loss/take-profit."""
    params: dict[str, Any] = {"category": category}
    if symbol:
        params["symbol"] = symbol
    else:
        params["settleCoin"] = settle_coin
    result = _get_client().get("/v5/position/list", params, auth=True)
    positions = [
        {
            "symbol": pos.get("symbol"),
            "side": pos.get("side"),
            "size": _f(pos.get("size")),
            "avgPrice": _f(pos.get("avgPrice")),
            "markPrice": _f(pos.get("markPrice")),
            "liqPrice": _f(pos.get("liqPrice")),
            "leverage": _f(pos.get("leverage")),
            "unrealisedPnl": _f(pos.get("unrealisedPnl")),
            "curRealisedPnl": _f(pos.get("curRealisedPnl")),
            "stopLoss": _f(pos.get("stopLoss")),
            "takeProfit": _f(pos.get("takeProfit")),
            "positionIdx": pos.get("positionIdx"),
            "updatedTime": _iso(int(pos["updatedTime"])) if pos.get("updatedTime") else None,
        }
        for pos in result.get("list", [])
        if symbol or _f(pos.get("size")) != 0
    ]
    return {"category": category, "count": len(positions), "positions": positions}


@mcp.tool()
def get_open_orders(
    symbol: str | None = None,
    category: DerivativeCategory = "linear",
    settle_coin: str = "USDT",
) -> dict[str, Any]:
    """List open/untriggered derivative orders (authenticated). With a symbol,
    scoped to that symbol; without one, all open orders settling in
    settle_coin."""
    params: dict[str, Any] = {"category": category}
    if symbol:
        params["symbol"] = symbol
    else:
        params["settleCoin"] = settle_coin
    result = _get_client().get("/v5/order/realtime", params, auth=True)
    orders = [
        {
            "orderId": order.get("orderId"),
            "orderLinkId": order.get("orderLinkId"),
            "symbol": order.get("symbol"),
            "side": order.get("side"),
            "orderType": order.get("orderType"),
            "orderStatus": order.get("orderStatus"),
            "price": _f(order.get("price")),
            "qty": _f(order.get("qty")),
            "timeInForce": order.get("timeInForce"),
            "reduceOnly": order.get("reduceOnly"),
            "stopLoss": _f(order.get("stopLoss")),
            "takeProfit": _f(order.get("takeProfit")),
            "triggerPrice": _f(order.get("triggerPrice")),
            "createdTime": _iso(int(order["createdTime"])) if order.get("createdTime") else None,
        }
        for order in result.get("list", [])
    ]
    return {"category": category, "count": len(orders), "orders": orders}


# --------------------------------------------------------------------------
# Trading tools (authenticated, gated by BYBIT_TRADING_ENABLED)
# --------------------------------------------------------------------------


@mcp.tool()
def place_order(
    symbol: str,
    side: Literal["Buy", "Sell"],
    qty: float | str,
    order_type: Literal["Market", "Limit"] = "Market",
    price: float | str | None = None,
    stop_loss: float | str | None = None,
    take_profit: float | str | None = None,
    category: DerivativeCategory = "linear",
    time_in_force: Literal["GTC", "IOC", "FOK", "PostOnly"] | None = None,
    reduce_only: bool = False,
    order_link_id: str | None = None,
) -> dict[str, Any]:
    """Place an order (authenticated; requires BYBIT_TRADING_ENABLED=true).

    HARD RULES enforced by this server, not just by convention:
    - Any order that can open or extend a position (reduce_only=false) MUST
      include stop_loss, which is sent to the exchange with the order.
    - stop_loss/take_profit must be on the correct side of the entry price.
    - If BYBIT_MAX_ORDER_VALUE is set, an opening order's qty * entry price may
      not exceed it (reduce_only exits are exempt).

    In attended mode, only call this after the human operator has explicitly
    typed CONFIRM for the exact proposal. In autonomous mode (BYBIT_AUTONOMOUS=
    true) the CONFIRM gate is replaced by the risk engine: opening orders must
    additionally clear the symbol whitelist, daily-loss kill-switch, orders/day,
    cooldown and max-open-positions caps, and the server refuses to open at all
    until those caps are configured. qty must already be rounded to the
    instrument's qtyStep (see get_instruments_info). Assumes one-way position
    mode. reduce_only=true closes a position: it needs no stop_loss and bypasses
    the autonomous caps so exits are never blocked."""
    settings = _require_trading_enabled("place_order")
    client = _get_client()

    qty_str = _num(qty, "qty")
    price_str = _num(price, "price") if price is not None else None
    sl_str = _num(stop_loss, "stop_loss") if stop_loss is not None else None
    tp_str = _num(take_profit, "take_profit") if take_profit is not None else None

    if order_type == "Limit" and price_str is None:
        raise ValueError("REJECTED: a Limit order requires a price")

    if not reduce_only and sl_str is None:
        raise ValueError(
            "REJECTED (fail-closed): stop_loss is mandatory for any order that "
            "can open or extend a position. Never leave a position unhedged. "
            "Provide stop_loss, or set reduce_only=true if this closes a position."
        )

    # Reference entry price: the limit price, or last traded price for market orders.
    if price_str is not None:
        reference_price = float(price_str)
        reference_source = "limit price"
    else:
        ticker_result = client.get(
            "/v5/market/tickers", {"category": category, "symbol": symbol}
        )
        tickers = ticker_result.get("list", [])
        if not tickers:
            raise ValueError(f"Cannot validate order: no ticker for {symbol!r}")
        reference_price = _f(tickers[0].get("lastPrice"))
        reference_source = "last traded price"
        if reference_price <= 0:
            raise ValueError(f"Cannot validate order: bad last price for {symbol!r}")

    if not reduce_only:
        sl_value = float(sl_str)  # type: ignore[arg-type]  # guaranteed above
        if side == "Buy" and sl_value >= reference_price:
            raise ValueError(
                f"REJECTED: stop_loss {sl_value} must be BELOW the entry for a "
                f"long ({reference_source} {reference_price})"
            )
        if side == "Sell" and sl_value <= reference_price:
            raise ValueError(
                f"REJECTED: stop_loss {sl_value} must be ABOVE the entry for a "
                f"short ({reference_source} {reference_price})"
            )
        if tp_str is not None:
            tp_value = float(tp_str)
            if side == "Buy" and tp_value <= reference_price:
                raise ValueError(
                    f"REJECTED: take_profit {tp_value} must be above the entry "
                    f"for a long ({reference_source} {reference_price})"
                )
            if side == "Sell" and tp_value >= reference_price:
                raise ValueError(
                    f"REJECTED: take_profit {tp_value} must be below the entry "
                    f"for a short ({reference_source} {reference_price})"
                )

    notional = float(qty_str) * reference_price
    if not reduce_only and settings.max_order_value > 0 and notional > settings.max_order_value:
        raise ValueError(
            f"REJECTED (fail-closed): order notional {notional:.2f} exceeds "
            f"BYBIT_MAX_ORDER_VALUE {settings.max_order_value:.2f}"
        )

    # Autonomous (unattended) mode: an opening order must clear the risk engine
    # (whitelist, daily-loss kill-switch, orders/day, cooldown, max positions).
    # reduce_only exits are intentionally exempt so the agent can always close.
    if settings.autonomous and not reduce_only:
        _enforce_autonomous_guards(settings, client, symbol, notional)

    body: dict[str, Any] = {
        "category": category,
        "symbol": symbol,
        "side": side,
        "orderType": order_type,
        "qty": qty_str,
        "price": price_str,
        "timeInForce": time_in_force or ("GTC" if order_type == "Limit" else None),
        "stopLoss": sl_str,
        "takeProfit": tp_str,
        "reduceOnly": True if reduce_only else None,
        "orderLinkId": order_link_id,
    }
    result = client.post("/v5/order/create", body)
    return {
        "status": "submitted",
        "environment": settings.env,
        "orderId": result.get("orderId"),
        "orderLinkId": result.get("orderLinkId"),
        "request": {k: v for k, v in body.items() if v is not None},
    }


@mcp.tool()
def cancel_order(
    symbol: str,
    order_id: str | None = None,
    order_link_id: str | None = None,
    category: DerivativeCategory = "linear",
) -> dict[str, Any]:
    """Cancel an open order by order_id or order_link_id (authenticated;
    requires BYBIT_TRADING_ENABLED=true)."""
    _require_trading_enabled("cancel_order")
    if not order_id and not order_link_id:
        raise ValueError("Provide order_id or order_link_id")
    result = _get_client().post(
        "/v5/order/cancel",
        {
            "category": category,
            "symbol": symbol,
            "orderId": order_id,
            "orderLinkId": order_link_id,
        },
    )
    return {"status": "cancelled", "orderId": result.get("orderId")}


@mcp.tool()
def set_leverage(
    symbol: str,
    leverage: float | str,
    category: DerivativeCategory = "linear",
) -> dict[str, Any]:
    """Set the symbol's leverage, hard-capped at BYBIT_MAX_LEVERAGE (default
    5x) — higher values are rejected by this server before reaching Bybit
    (authenticated; requires BYBIT_TRADING_ENABLED=true)."""
    settings = _require_trading_enabled("set_leverage")
    leverage_str = _num(leverage, "leverage")
    if float(leverage_str) > settings.max_leverage:
        raise ValueError(
            f"REJECTED (fail-closed): leverage {leverage_str}x exceeds the hard "
            f"cap of {settings.max_leverage}x (BYBIT_MAX_LEVERAGE)"
        )
    try:
        _get_client().post(
            "/v5/position/set-leverage",
            {
                "category": category,
                "symbol": symbol,
                "buyLeverage": leverage_str,
                "sellLeverage": leverage_str,
            },
        )
    except BybitAPIError as error:
        if error.ret_code == 110043:  # "leverage not modified" — already set
            return {"status": "unchanged", "symbol": symbol, "leverage": leverage_str}
        raise
    return {"status": "ok", "symbol": symbol, "leverage": leverage_str}


def main() -> None:
    settings = load_settings()
    configure(settings)
    mode = "AUTONOMOUS" if settings.autonomous else "attended"
    print(
        f"bybit-mcp: env={settings.env} endpoint={_get_client().base_url} "
        f"trading_enabled={settings.trading_enabled} mode={mode} "
        f"max_leverage={settings.max_leverage}x "
        f"api_key={'set' if settings.api_key else 'MISSING'}",
        file=sys.stderr,
    )
    if settings.autonomous:
        gaps = settings.autonomous_gaps()
        if gaps:
            print(
                "bybit-mcp: WARNING autonomous mode is ON but these mandatory "
                f"caps are unset, so opening orders will be REFUSED: {', '.join(gaps)}",
                file=sys.stderr,
            )
        else:
            print(
                "bybit-mcp: autonomous caps OK — "
                f"loss_limit={settings.daily_loss_limit} "
                f"orders/day={settings.max_orders_per_day} "
                f"cooldown={settings.order_cooldown_sec}s "
                f"max_positions={settings.max_open_positions or 'inf'} "
                f"whitelist={','.join(settings.symbol_whitelist)}",
                file=sys.stderr,
            )
    mcp.run()


if __name__ == "__main__":
    main()
