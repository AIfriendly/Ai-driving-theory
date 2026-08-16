# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository overview

Two unrelated projects live in this repo:

- **`src/bybit_mcp/`** — a fail-closed MCP server that gives Claude Code live Bybit V5 market data and trading tools. This file doubles as its operating manual (see below).
- **`web/`** — `index.html`, a bilingual (Kurdish Sorani · English) driving-theory exam-prep app for the Kurdistan Region of Iraq. Single static file, no build step, no dependencies.

They share nothing at runtime; treat them as separate codebases that happen to sit in one git history.

**Read `docs/PROGRESS.md` at session start.** It's the persistent state file — what's done, what's next, and gotchas that already cost real time once (almost all of it currently concerns `web/`, since the trading agent side is stable). Update it before every push: move finished items from *Next* to *Done* with the commit SHA, and add anything you had to re-derive or got wrong to *Decisions & gotchas*.

---

## Trading agent (`src/bybit_mcp/`)

Bybit V5 via an MCP server, launched automatically by `.mcp.json` for any Claude Code session in this repo. Call `get_trading_status` once at session start to read the live harness config (environment, whether trading is enabled, leverage cap, and — in autonomous mode — which mandatory caps are still missing).

### Commands

```bash
uv sync                       # install deps, create .venv (Python >=3.10)
cp .env.example .env          # then fill in API keys; see .env.example for every var
uv run pytest -q              # full suite (60 tests) — mocked Bybit backend, no network
uv run pytest tests/test_risk.py -q                                          # one file
uv run pytest tests/test_risk.py::test_happy_path_admits_and_increments -q   # one test
uv run bybit-mcp              # run the MCP server standalone (stdio), e.g. for another client
./scripts/check-host.sh [base_url]   # geo/reachability check before deploying to a host
python3 scripts/simulate.py --balance 20 --leverage 50 --days 30   # offline leverage Monte-Carlo, unrelated to the test suite
```

No linter or formatter is configured — `pyproject.toml` declares only the `hatchling` build and `pytest`.

### Architecture

Four modules, each with one job:

- **`config.py`** — `Settings`, a frozen dataclass loaded from env (`.env` is read via `setdefault`, so a real environment variable always wins). All validation happens in `__post_init__`, so a bad config fails at startup, not mid-trade. `autonomous_gaps()` is the single source of truth for "is autonomous mode safe to run," and both `get_trading_status` and the risk engine call it.
- **`api.py`** — `BybitClient`: HMAC-SHA256 request signing and the `retCode` envelope. It has no opinion about trading rules; the signed payload must be byte-identical to what's on the wire (query string for GET, raw JSON for POST), so nothing reformats the body between signing and sending.
- **`risk.py`** — the autonomous-mode risk engine. `evaluate()` is a pure function `(Settings, RiskState, account snapshot) -> Decision`, with no network/clock/IO of its own, which is what makes it exhaustively unit-testable. State (UTC day, orders placed today, day-start equity, last-order timestamp) persists as JSON at `BYBIT_STATE_PATH` (default `~/.bybit/risk_state.json`).
- **`server.py`** — wires the above into MCP tools via `FastMCP`. This is where guards actually execute: `_require_trading_enabled`, the `place_order` stop-loss/side/notional checks, and `_enforce_autonomous_guards` (which calls into `risk.evaluate` only for position-*opening* orders — `reduce_only=true` skips it entirely).

**The governing pattern:** every rule below exists twice — once as an instruction to the agent (this file) and once as a check in `server.py` / `config.py` / `risk.py` that raises before a request reaches Bybit. `tests/` assert the code-level half directly. A tool rejecting a call is the system working as designed — report the rejection, don't try to route around it.

### Hard constraints (non-negotiable)

- **Attended mode (default):** never call `place_order` without explicit user confirmation — the literal word `CONFIRM`, matching the proposed parameters. Applies whenever `BYBIT_AUTONOMOUS` is not `true`.
- **Autonomous mode (`BYBIT_AUTONOMOUS=true`):** the code risk engine replaces human confirmation. Server refuses to open positions unless `BYBIT_MAX_ORDER_VALUE`, `BYBIT_DAILY_LOSS_LIMIT`, `BYBIT_MAX_ORDERS_PER_DAY` and `BYBIT_SYMBOL_WHITELIST` are all set. Only whitelisted symbols.
- **Every position-opening order carries `stop_loss`** in the same `place_order` call. Never attach it afterwards.
- **Risk 1% of `totalEquity` per trade.** Size = risk budget ÷ |entry − stop|, rounded down to `lotSizeFilter.qtyStep`.
- **Max 5x leverage** on linear perpetuals unless explicitly authorised.
- **Exits are never blocked** — `reduce_only=true` bypasses all caps.
- Analyse only closed candles (`get_klines` excludes the forming candle by default; do not pass `include_unclosed=true`).
- On any tool/API error or missing MCP tools: halt and report verbatim. Never simulate market data. Do not retry order placement automatically.

### Code-level enforcement (rejections are deliberate — report, don't work around)

`place_order` rejects missing/wrong-side `stop_loss`; `set_leverage` rejects above `BYBIT_MAX_LEVERAGE` (default 5); all trading tools rejected unless `BYBIT_TRADING_ENABLED=true`; defaults to **testnet** unless `BYBIT_ENV=mainnet`; notional capped by `BYBIT_MAX_ORDER_VALUE`. Autonomous mode adds a daily-loss kill-switch, an orders/day counter, an order cooldown, and a max-open-positions cap.

### Trade proposal format

Ticker · direction · current price · entry · stop loss · take profit · R:R · one-line rationale from the K-line data · final qty and dollar risk.

### Deployment note

Bybit geo-blocks by **source IP** (US, mainland China, many datacenter ranges → 403); a standard cloud sandbox typically can't reach it at all. `BYBIT_BASE_URL` selects a regional endpoint for compliance/account routing but does **not** bypass the block — the server must actually run from a host in a permitted region. Full runbook, systemd/cron examples and the safety checklist: [`docs/DEPLOY.md`](docs/DEPLOY.md).

---

## Driving theory app (`web/`)

A bilingual (Kurdish Sorani primary · English, partial Arabic) practice app for Iraq's Kurdistan Region driving theory exam — 736 questions, 110 hand-drawn inline-SVG sign icons, ~130 scene/concept illustrations, mock exams, a Leitner spaced-repetition scheduler, flashcards and achievements. Full feature list, storage-key reference and the complete change history live in [`web/README.md`](web/README.md) — read it before adding content, since the editorial rules and past corrections live there in detail.

### Working on it

No build step, no `package.json`, no dependencies — `web/index.html` **is** the app; open it directly in a browser. There is also no committed test suite: verification is a headless Playwright/Chromium pass (page parses with no `pageerror`, question/category counts, zero missing Kurdish strings, every `q.sign` resolves in `SIGNS`) run ad hoc before publishing rather than stored in the repo. In this environment, launch Chromium with `executablePath: '/opt/pw-browsers/chromium'` — do not run `playwright install`. Any regression script you write for this belongs in the scratchpad, not the repo.

### Non-negotiable constraints

From `web/README.md`'s design constraints — the file is structured the way it is because of these:

1. **Single self-contained file.** The app is also published as a Claude Artifact, which enforces a CSP blocking every external host: no CDN scripts, no web fonts, no remote images, no `fetch`. Every sign icon is hand-written inline SVG. `.github/workflows/pages.yml` fails the deploy if it finds any `src=`/`href=` pointing at `http(s)://`, so this is a CI check, not just a convention.
2. **Kurdish (Sorani) is the default language**, RTL by default; English is secondary. Arabic is intentionally partial — UI strings and older questions only, wired to no language switch (`setLang('ar')` isn't reachable) — don't add new Arabic question text without also reopening that decision.
3. **Jurisdiction-honest.** Never add a figure (speed limit, fine, alcohol limit, vehicle dimension) sourced from another country's law. Four questions that violated this are kept in `ARCHIVED_Q` rather than deleted, each tagged with its reason — check there before reusing an old speed-limit-style question as a template.
4. **Offline-capable.** Once loaded, the app never touches the network again; progress lives in `localStorage` (`tareeq_v1` for content/progress state, `tareeq_big` for the text-size toggle).

### Data model

```js
Q(cat, sign, q_en, q_ar, opts, answerIndex, ex_en, ex_ar, q_ku, ex_ku)  // a question
O(en, ar, ku)                                                          // an option
SIGNS = { key: { en, ar, svg: svg('<…inline svg…>') }, … }             // sign icon library
KU_SIGNS = { key: 'کوردی', … }                                         // Kurdish sign labels — a separate parallel dict, not merged into SIGNS
SCENES = { … }                                                         // scene/concept illustrations for non-sign questions
```

Question IDs are content-hashed, not positional: `q.id=hashStr(q.sign?(q.sign+"|"+base):base)`. That's deliberate — inserting a question mid-file must not invalidate anyone's saved spaced-repetition box — and the line is also string-replaced by external tooling, so **keep it on one line**.

Illustration assignment (`assignScenes()`) resolves in strict order: specific per-question `MAP` regexes on the question stem → category-gated first-aid keywords → broad keyword fallback → per-category default. Order matters — an earlier broad keyword swallows later specific matches. Regexes match the **question stem only**; matching against answer options has mis-attached scenes before (they'd leak the answer).

Official-textbook questions are grouped into study sets (`BOOKSETS`/`BOOKSETS2`/`BOOKSETS3`/`BOOKSETS4`, resolved by `bookSets()`) by anchoring `BOOKSEG` on question **text**, never on array index, so a boundary can't silently move when a question is inserted nearby. Each source's matchers only run against that source's own questions, so an over-broad keyword in one source can never pull in another's question.

The UI is a single-page app inside the one file: a global `S` state object, screen dispatch through `Go('screen')` → `render()`, and one `renderX()` function per screen (`renderHome`, `renderQuiz`, `renderBook`, `renderGuide`, `renderSigns`, `renderStats`, …).

### Editorial rules for adding questions

Add a candidate only if it is confirmed correct against a real source (a green-highlighted answer in the source screenshots, or an official reference page), not already in the bank — **search the full bank first**; narrow greps (e.g. piping through `head -4`) have hidden real duplicates before — not photo-dependent or otherwise ambiguous without the original image, and not another country's law. Near-duplicate sign icons for the same meaning (e.g. drawn as both a circle and a square) are declined on sight: two gallery cards with the same correct answer breaks the reverse sign quiz.

### Deployment

`.github/workflows/pages.yml` publishes `web/` to GitHub Pages on every push touching `web/**` on `main`, `master`, or the active dev branch. One-time repo setting required: **Settings → Pages → Source → GitHub Actions**. The app is also republished as a private Claude Artifact by redeploying to the same file path, which keeps the same URL.
