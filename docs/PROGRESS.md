# Progress & Memory

Persistent state across sessions. Context gets cleared and containers get
reclaimed; this file does not. Read it at session start, update it before
every push.

**How to update:** move finished items from *Next* to *Done* with the commit
SHA. Add anything you had to re-derive, or got wrong, to *Decisions & gotchas*
— that section exists to stop the same mistake twice.

---

## Current state

`web/index.html` — bilingual (Kurdish Sorani · English) driving theory app,
single self-contained file, no build step, no network calls.

| | |
|---|---|
| Active questions | 736 (740 defined, 4 filtered out via `ARCHIVED_Q`) |
| Sign icons | 110 inline SVG |
| Scene / concept illustrations | 133 |
| Questions with no visual | 0 |

Branch: `claude/trading-agent-bybit-mcp-ao56dp`

---

## Done

- [x] Question bank built out to 736 active questions — `ab95e2f`
- [x] Every question carries a visual; concept-icon library + keyword
      fallback so nothing renders text-only — `ab95e2f`
- [x] Dangerous-goods hazard placards (Part 1 sweep) — `62f3299`
- [x] First-aid bucket split 57 → 15 distinct icons — `f6cb410`
- [x] Junction and parking buckets spread (21 → 11; 25 distributed) — `808297b`
- [x] Generic rules bucket split into 14 concept icons — `7f86b4b`
- [x] Motion layer: `sgnrot` / `sgnglide` / `sgnpulse` / `sgnmarch` /
      `sgnthrob`, all behind `prefers-reduced-motion` — `ab95e2f`
- [x] Exam paper (`dlexam.pdf`) read completely, 50/50 pages, answers
      compared against its printed key — `2f9a16d`
- [x] Book confirmed as the master copy: pp 22–229 == Part 1 + Part 2,
      boundary verified directly at `c-164`/`c-165` — `2f9a16d`
- [x] ~40 hard figures fact-checked against source (penalties, licence
      ages/weights, emergency numbers, speed panels, crossing posts, tread
      depth, seat geometry, gear/rpm bands, extinguisher classes) — `2f9a16d`
- [x] Coverage claim in `web/README.md` corrected — it had overstated a
      "full pass over 457 pages" — `e594a3e`
- [x] Freeway/highway sign colours fixed (the review's one real finding) —
      `e634afd`
- [x] `CLAUDE.md` trimmed 88 → 43 lines; effort lock written to shell
      profiles and settings — `a054bcf`

## Next

**Blocked — needs the user to re-upload the PDFs**

- [ ] Part 1 (`lecture1.pdf`): ~70 of 120 pages still unopened
- [ ] The book (`part3.pdf`): 228 of 234 pages still unopened
- [ ] Part 2 (`part2.pdf`): 38 of 53 pages unopened *(lower priority — the
      book is the master copy of this same material)*

Source PDFs were destroyed in a container reset and are unrecoverable; the
whole filesystem was searched. When they come back, do the page sweep in a
**fresh session** and append findings here as each batch completes.

**Unblocked**

- [ ] Nothing outstanding. The app is in a consistent, pushed state.

---

## Coverage, stated honestly

The four documents are **not independent** — the book is the master copy and
contains Part 1 + Part 2 verbatim.

| Source | Pages | Opened |
|---|---|---|
| Exam (`dlexam.pdf`) | 50 | **50 — complete**, incl. answer key |
| Part 1 (`lecture1.pdf`) | 120 | ~50 |
| Part 2 (`part2.pdf`) | 53 | ~15 |
| Book (`part3.pdf`) | 234 | 6 |

~120 of 457 page images viewed. What *was* exhaustive is the fact-checking:
every figure the app asserts was traced to its source. **No factual error was
found beyond the freeway/highway colours.** Do not restate this as a full
page-by-page pass.

---

## Decisions & gotchas

Each of these cost real time to re-derive or was gotten wrong once.

**Content**

- **Freeway = BLUE, Highway = GREEN.** Verified at book p75 (item ⑤ freeway
  blue, ⑥ highway green) and p83 (blue panels "Freeway", green "Higway").
  The colour logic is *consistent* across the guide panels — an earlier note
  claiming two sign families with opposite schemes was wrong and was removed.
- **The exam contradicts itself on maximum reversing distance:** 10 m in
  Q111, 5 m in Q264. Deliberately not "resolved" — the app teaches the
  principle and says outright that the paper prints two figures.
- **Before adding a question as a "gap", grep the full bank.** Two false
  gaps were caught this way: a duplicate blind-cane question (three
  equivalents already existed) and dashboard warning-light colours (Q363,
  Q547). Narrow greps — `grep -v EX:` piped to `head -4` — hid them.
- Emergency numbers include **122 for ambulance**; 188 *is* listed as
  traffic police (settled from source, not inferred).

**Code**

- `q.id=hashStr(q.sign?(q.sign+"|"+base):base)` **must stay on one line** —
  regression scripts inject a hook by string-replacing it.
- `assignScenes()` resolves in strict order: specific `MAP` regexes → 
  category-gated `FA` (first aid) → broad `KW` keywords → `DEF` per-category
  fallback. Order matters; a broad keyword placed early swallows specific
  matches.
- Scene regexes must match the **question stem**, not answer options.
  `pedBridge`, `plantMachine` and `blindCane` all mis-attached this way.
- `.signopt svg *{animation:none!important}` is load-bearing: without it,
  motion on a pick-the-sign option leaks the answer.
- Runtime introspection before the `ARCHIVED_Q` filter reports 740, not 736.
- Rendering/verification: `playwright-core` with
  `executablePath:'/opt/pw-browsers/chromium'`. Never run `playwright install`.
- Regression scripts (`verify16.js`, `chk.js`, `cnt.js`, `dist.js`, `dump.js`)
  live in the scratchpad and are **never committed**.

**Environment**

- The effort env var is **`CLAUDE_EFFORT`**, not `CLAUDE_CODE_EFFORT_LEVEL`.
  There is no `effort` key in `settings.json` — use an `env` block.
- Skill frontmatter supports `name`, `description`, `license` only. There is
  no `effort` field, and this repo has no custom skills.
- The container is ephemeral. Anything not committed and pushed is lost —
  this is not hypothetical, it already happened once.
