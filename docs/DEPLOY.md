# Deploying the autonomous agent on a VPS in a permitted region

This is the runbook for running the agent unattended on a small VPS/host in a
Bybit-permitted jurisdiction (e.g. the UAE). It exists because of one hard fact
we verified: **Bybit's CDN blocks by *source IP*.** The US Claude Cloud sandbox
egresses from a US IP, so it can't reach Bybit at all — not mainnet, not even
testnet. Running the agent from a host in your own permitted region fixes this
at the root, with no proxy and no evasion: the trades originate from where you
are actually allowed to trade.

> Your Claude subscription being a US account does **not** matter here. The
> account is identity/billing; the Bybit HTTPS calls egress from wherever the
> `bybit-mcp` process runs — i.e. this VPS.

---

## 1. Pick and verify the host

Choose a VPS whose region matches your account's jurisdiction and where you are
permitted to trade. **Before anything else, verify the host is not geo-blocked**
— datacenter IP ranges are sometimes blocked even in permitted countries:

```bash
curl -s -o /dev/null -w '%{http_code}\n' https://api.bybit.com/v5/market/time
# 200  -> good, this host can reach Bybit
# 403  -> "blocked from your country" / flagged IP range: pick another host/region
```

If you use a regional endpoint, test that one too (`https://api.bybit.ae/...`).
Only proceed from a host that returns `200`.

## 2. Install prerequisites

```bash
# Python 3.10+ and uv (for the MCP server)
curl -LsSf https://astral.sh/uv/install.sh | sh
# Node.js 18+ and the Claude Code CLI (the agent runtime)
#   install Node via your distro or nvm, then:
npm install -g @anthropic-ai/claude-code
git --version || sudo apt-get install -y git
```

## 3. Get the code and install the server

```bash
git clone <your-fork-url> automated-trading && cd automated-trading
uv sync
uv run pytest -q         # sanity: the risk harness tests must pass
```

## 4. Configure `.env`

```bash
cp .env.example .env && chmod 600 .env
```

Create the API key at Bybit → API Management with **Read + Trade only — never
Withdraw** — and IP-restrict it to this VPS's IP. Then edit `.env`:

```dotenv
BYBIT_ENV=mainnet
BYBIT_BASE_URL=https://api.bybit.ae      # optional: your regional endpoint
BYBIT_API_KEY=...
BYBIT_API_SECRET=...
BYBIT_TRADING_ENABLED=true

# Autonomous mode + the MANDATORY caps (server refuses to open without them)
BYBIT_AUTONOMOUS=true
BYBIT_MAX_ORDER_VALUE=250        # max notional per opening order (USDT)
BYBIT_DAILY_LOSS_LIMIT=100       # halt new entries after this daily drawdown
BYBIT_MAX_ORDERS_PER_DAY=10
BYBIT_MAX_OPEN_POSITIONS=2
BYBIT_ORDER_COOLDOWN_SEC=300
BYBIT_SYMBOL_WHITELIST=BTCUSDT,ETHUSDT
BYBIT_MAX_LEVERAGE=5
```

Confirm the harness sees everything:

```bash
uv run python -c "from bybit_mcp.config import load_settings as L; s=L(); \
print('autonomous_ready:', s.autonomous and not s.autonomous_gaps(), '| gaps:', s.autonomous_gaps())"
# expect: autonomous_ready: True | gaps: []
```

## 5. Prove it on testnet FIRST

Do not point real funds at an unproven loop. Set `BYBIT_ENV=testnet` with a
[testnet key](https://testnet.bybit.com), run the agent for a while, and confirm
in `get_trading_status` / `get_positions` that orders carry stop-losses and the
caps trigger as expected. Only then switch back to `mainnet`.

## 6. Run the agent

The MCP server is launched automatically by the Claude Code CLI via `.mcp.json`;
you drive it by invoking the CLI with a trading prompt. For unattended runs,
pre-authorize the Bybit tools so it doesn't block on permission prompts (scope
this tightly — see `.claude/settings.json` and `--allowedTools`).

**Periodic scan (cron)** — one scan cycle every 15 minutes:

```cron
*/15 * * * * cd /home/you/automated-trading && \
  claude -p "Follow CLAUDE.md. Scan the whitelisted symbols and, per the autonomous-mode rules, open or manage positions as your analysis dictates." \
  --allowedTools "mcp__bybit__*" >> /home/you/agent.log 2>&1
```

**Always-on supervision (systemd)** — keep a long-running loop alive and
restart on crash; pair with the `/loop` skill or your own scheduler inside the
session. Example unit:

```ini
# /etc/systemd/system/bybit-agent.service
[Service]
WorkingDirectory=/home/you/automated-trading
ExecStart=/usr/bin/claude -p "Follow CLAUDE.md; run the autonomous trading loop over the whitelist." --allowedTools "mcp__bybit__*"
Restart=on-failure
RestartSec=30
[Install]
WantedBy=multi-user.target
```

## 7. Monitor

- Tail `agent.log`; watch for `REJECTED (autonomous risk guard: ...)` lines — a
  tripped kill-switch or cap is working as designed.
- The risk counters persist at `~/.bybit/risk_state.json` (`day_start_equity`,
  `orders_today`). Deleting it resets the daily counters.
- Check open positions/PnL independently in the Bybit app — never rely solely
  on the agent's own view.

## Safety checklist

- [ ] Host returns `200` from `api.bybit.com/v5/market/time` (permitted egress).
- [ ] API key is **Read + Trade only**, Withdraw disabled, IP-restricted to the VPS.
- [ ] `.env` is `chmod 600`; it is gitignored — never commit it.
- [ ] `autonomous_ready: True` before going live.
- [ ] Proven on **testnet** first.
- [ ] Caps set to amounts you can afford to lose entirely.
- [ ] You understand that an LLM trading unsupervised **can and will** have
      losing streaks; the caps bound the damage, they do not prevent losses.
