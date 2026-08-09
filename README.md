# automated-trading

A Claude-powered trading agent for **Bybit V5**, built on the
[Model Context Protocol](https://modelcontextprotocol.io). The repo contains:

* **`src/bybit_mcp/`** — a fail-closed MCP server exposing Bybit market-data
  and trading tools (`get_tickers`, `get_klines`, `get_orderbook`,
  `get_wallet_balance`, `get_positions`, `place_order`, …).
* **`CLAUDE.md`** — the agent's operating manual. Claude Code loads it
  automatically; it defines the analysis workflow, the 1%-risk sizing rule,
  the proposal-card format, and the human-confirmation requirement.
* **`.mcp.json`** — project-scoped MCP config so any Claude Code session in
  this repo gets the Bybit tools.

```
┌────────────┐   propose / CONFIRM   ┌─────────────┐   MCP (stdio)   ┌──────────────┐   HTTPS   ┌───────┐
│  Operator  │ ◄───────────────────► │ Claude Code │ ◄─────────────► │  bybit-mcp   │ ◄───────► │ Bybit │
│  (human)   │                       │  (CLAUDE.md)│                 │ (this repo)  │           │  V5   │
└────────────┘                       └─────────────┘                 └──────────────┘           └───────┘
```

## Safety model (defense in depth)

The operating manual instructs the agent to propose trades and wait for a
human `CONFIRM`. Prompts alone are not a safety boundary, so the same rules
are **enforced in server code** — a misbehaving or confused agent gets a hard
rejection, not a warning:

| Rule | Prompt level (CLAUDE.md) | Code level (server) |
|---|---|---|
| Human confirmation before any order | ✅ propose → `CONFIRM` → execute (attended mode) | — (conversation-level by design) |
| Mandatory stop-loss on entries | ✅ | ✅ `place_order` rejects entries without `stop_loss`, and rejects SL/TP on the wrong side of entry |
| Leverage cap (default 5x) | ✅ | ✅ `set_leverage` rejects > `BYBIT_MAX_LEVERAGE` |
| Read-only by default | — | ✅ trading tools rejected unless `BYBIT_TRADING_ENABLED=true` |
| Testnet by default | — | ✅ mainnet requires explicit `BYBIT_ENV=mainnet` |
| Per-order notional cap | — | ✅ optional `BYBIT_MAX_ORDER_VALUE` (opening orders; exits exempt) |
| Autonomous caps are mandatory | ✅ §6.5 | ✅ in autonomous mode, opening is refused until loss-limit/orders-per-day/whitelist/notional are set |
| Daily-loss kill-switch | — | ✅ `BYBIT_DAILY_LOSS_LIMIT` halts new entries on drawdown; exits always allowed |
| No lookahead bias | ✅ closed candles only | ✅ `get_klines` drops the still-forming candle by default |
| No fabricated data | ✅ halt on error | ✅ every non-zero `retCode` raises with Bybit's own message |

> **Geo note:** Bybit blocks by **source IP** (US, Mainland China, and many
> datacenter ranges → 403). The server must run from a permitted-region host;
> `BYBIT_BASE_URL` selects a regional endpoint for compliance but does **not**
> bypass the block. See [`docs/DEPLOY.md`](docs/DEPLOY.md).

## Setup

Requires Python ≥ 3.10 and [uv](https://docs.astral.sh/uv/) (or plain pip).

```bash
git clone <this repo> && cd automated-trading
uv sync                      # creates .venv and installs the server + dev deps
cp .env.example .env         # then fill in your keys
uv run pytest                # verify the harness: all tests must pass
```

API keys: create them at Bybit → API Management with **Read** and **Trade**
permissions only — never enable Withdraw — and IP-restrict the key. Start on
**testnet** (`https://testnet.bybit.com`) with `BYBIT_ENV=testnet` (the
default) until you trust the whole loop.

### Environment variables (`.env`)

| Variable | Default | Meaning |
|---|---|---|
| `BYBIT_ENV` | `testnet` | `testnet` or `mainnet`; anything else refuses to start |
| `BYBIT_BASE_URL` | empty | Optional regional endpoint (e.g. `https://api.bybit.ae`); compliance routing only, not a geo-block bypass |
| `BYBIT_API_KEY` / `BYBIT_API_SECRET` | empty | Only needed for wallet/positions/trading; market data works without |
| `BYBIT_TRADING_ENABLED` | `false` | Master switch for `place_order` / `cancel_order` / `set_leverage` |
| `BYBIT_MAX_LEVERAGE` | `5` | Hard server-side leverage cap |
| `BYBIT_MAX_ORDER_VALUE` | `0` (off) | Per-order notional cap in quote currency; recommended on mainnet |
| `BYBIT_RECV_WINDOW` | `5000` | Bybit auth receive window (ms) |
| `BYBIT_AUTONOMOUS` | `false` | Unattended mode: place orders without a human CONFIRM, within the caps below |
| `BYBIT_DAILY_LOSS_LIMIT` | `0` | Daily drawdown (quote ccy) after which opening new positions halts |
| `BYBIT_MAX_ORDERS_PER_DAY` | `0` | Cap on opening orders per UTC day |
| `BYBIT_MAX_OPEN_POSITIONS` | `0` (∞) | Max concurrent open positions |
| `BYBIT_ORDER_COOLDOWN_SEC` | `0` | Minimum seconds between opening orders |
| `BYBIT_SYMBOL_WHITELIST` | empty | Comma-separated symbols the agent may open (exits unrestricted) |
| `BYBIT_STATE_PATH` | `~/.bybit/risk_state.json` | Where daily risk counters persist |

In **autonomous mode** the human CONFIRM gate is replaced by the risk engine,
and `BYBIT_MAX_ORDER_VALUE` / `BYBIT_DAILY_LOSS_LIMIT` / `BYBIT_MAX_ORDERS_PER_DAY`
/ `BYBIT_SYMBOL_WHITELIST` become **mandatory** — the server refuses to open a
position until all four are set. Running unattended? See
[`docs/DEPLOY.md`](docs/DEPLOY.md).

### Using it with Claude Code

Open a Claude Code session in this directory — `.mcp.json` starts the server
automatically (`uv run --project . bybit-mcp`) and `CLAUDE.md` gives the agent
its operating manual. Then, for example:

> Scan the market for BTCUSDT

The agent pulls 15m/1h klines, states a thesis, sizes at 1% wallet risk, and
prints a proposal card. Nothing is sent to the exchange until you type
`CONFIRM` — and even then only if `BYBIT_TRADING_ENABLED=true`.

To run the server standalone (e.g. for another MCP client):

```bash
uv run bybit-mcp
```

## Development

```bash
uv run pytest -q       # unit tests: signing, guards, tool behavior (no network)
```

Tests run entirely against a mocked Bybit backend; they verify that the
HMAC signature binds the exact bytes sent, and that every guard rejects
**before** any request reaches the exchange.

## Also in this repo: `web/`

Unrelated to the trading agent, `web/` holds static sites published to GitHub
Pages by `.github/workflows/pages.yml`.

* **`web/index.html`** — a bilingual (Kurdish Sorani · English) driving
  theory practice app for the Kurdistan Region of Iraq: 662 questions, 110
  hand-drawn inline-SVG sign icons, mock exams, Leitner spaced repetition,
  flashcards, a study guide and achievements. It is a **single self-contained
  HTML file** with no build step, no dependencies and no network calls, so it
  works fully offline. Served at the Pages site root. See
  [`web/README.md`](web/README.md) for the content structure, the editorial
  rules used when adding questions, and the changelog.

To serve the Pages site, set **Settings → Pages → Source** to **GitHub
Actions** once; the workflow handles the rest.

## Notes & limitations

* Assumes **one-way position mode** on derivatives (the Bybit default). In
  hedge mode, `place_order` will fail with a positionIdx error.
* Bybit geo-blocks some jurisdictions (including the US) at the CDN level;
  the server must run somewhere Bybit's terms of service permit. Remote
  sandboxes are often blocked — run it on your own machine.
* `stopLoss`/`takeProfit` are attached as full-position TP/SL orders.

## Disclaimer

This is experimental software for personal use. Cryptocurrency derivatives
trading carries a substantial risk of loss; leverage amplifies it. Nothing in
this repository is financial advice, and an LLM's market analysis can be
confidently wrong. Test on testnet, keep `BYBIT_MAX_ORDER_VALUE` set on
mainnet, and never trade money you cannot afford to lose.
