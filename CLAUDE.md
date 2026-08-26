# Trading Agent — Project Constraints

**Read `docs/PROGRESS.md` at session start** — persistent state, what is done,
what is next, and gotchas that have already cost time once. Update it before
every push.

Bybit V5 via MCP server in `src/bybit_mcp/` (configured in `.mcp.json`).
Call `get_trading_status` once at session start to read the active harness config.

## Hard constraints (non-negotiable)

- **Attended mode (default):** never call `place_order` without explicit user
  confirmation — the literal word `CONFIRM`, matching the proposed parameters.
  Applies whenever `BYBIT_AUTONOMOUS` is not `true`.
- **Autonomous mode (`BYBIT_AUTONOMOUS=true`):** the code risk engine replaces
  human confirmation. Server refuses to open positions unless
  `BYBIT_MAX_ORDER_VALUE`, `BYBIT_DAILY_LOSS_LIMIT`, `BYBIT_MAX_ORDERS_PER_DAY`
  and `BYBIT_SYMBOL_WHITELIST` are all set. Only whitelisted symbols.
- **Every position-opening order carries `stop_loss`** in the same `place_order`
  call. Never attach it afterwards.
- **Risk 1% of `totalEquity` per trade.** Size = risk budget ÷ |entry − stop|,
  rounded down to `lotSizeFilter.qtyStep`.
- **Max 5x leverage** on linear perpetuals unless explicitly authorised.
- **Exits are never blocked** — `reduce_only=true` bypasses all caps.
- Analyse only closed candles (`get_klines` excludes the forming candle by
  default; do not pass `include_unclosed=true`).
- On any tool/API error or missing MCP tools: halt and report verbatim. Never
  simulate market data. Do not retry order placement automatically.

## Code-level enforcement (rejections are deliberate — report, don't work around)

`place_order` rejects missing/wrong-side `stop_loss`; `set_leverage` rejects
above `BYBIT_MAX_LEVERAGE` (default 5); all trading tools rejected unless
`BYBIT_TRADING_ENABLED=true`; defaults to **testnet** unless `BYBIT_ENV=mainnet`;
notional capped by `BYBIT_MAX_ORDER_VALUE`. Autonomous adds daily-loss
kill-switch, orders/day counter, order cooldown, max open positions.

## Trade proposal format

Ticker · direction · current price · entry · stop loss · take profit · R:R ·
one-line rationale from the K-line data · final qty and dollar risk.

## Also in this repo

`web/` — bilingual (Kurdish Sorani · English) driving theory app: `index.html`
plus `web/models/*.glb` for the driving sim, no build step, no dependencies.
The app is offline-capable; only the sim's 3D models are fetched, each with a
fallback. See `web/README.md` and `docs/PROGRESS.md`.
