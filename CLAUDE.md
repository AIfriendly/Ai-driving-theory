# AI Driving Theory — Project Notes

**Read `docs/PROGRESS.md` at session start** — persistent state, what is done,
what is next, and gotchas that have already cost time once. Update it before
every push.

`web/` — bilingual (Kurdish Sorani · English) driving theory app: `index.html`
plus `web/models/*.glb` and `web/tex/*.jpg` for the driving sim, no build step,
no dependencies. The app is offline-capable; only the sim's models and ground
texture are fetched, each with a fallback. `scripts/simaudit/` drives all 745
situations headlessly — run it after touching a scenario template or a judging
kernel. See `web/README.md` and `docs/PROGRESS.md`.
