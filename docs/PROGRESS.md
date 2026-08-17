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
- [x] **Exam swept completely and machine-verified** — 50/50 pages, and it is
      **431 questions in two sections**, not 281 (see gotchas)
- [x] Fixed `#510`: the newer annual registration adds the **emissions
      (environment) date**, not the owner's *blood group* (book p29)
- [x] Reworded `#57` so it no longer collides with `#289` — it now asks
      "between cities and towns" (the circular's own words) instead of
      "outside built-up areas", which is the border panel's 80 (book p156)

## Next

**Unblocked — the PDFs were re-supplied and all four verified intact**
(120 / 53 / 50 / 234 pages = 457, matching the counts below).

- [ ] Book: printed pp 33–155 and 160–230 still unswept
- [ ] Part 1 (120 pp): sweep, and confirm the book-is-master-copy claim
- [ ] Part 2 (53 pp): sweep *(lowest priority — the book duplicates it)*

**Gaps found in the exam sweep, not yet written as questions**

- [ ] Night speed = **half** the posted limit (exam S1 Q46). The bank has 45
      km/h questions and none teaches this. Biggest single hole found.
- [ ] The **instructor**, not the learner, carries liability for a violation
      during a lesson (exam S2 Q93)
- [ ] **Coolant reservoir** identification — completes the #735–740 engine-bay
      series, which covers the other six parts the exam points at (S2 Q141)
- [ ] Steering-wheel **hand position** (10:10, both hands) (exam S2 Q113)

**Carried candidates — verify against the book's sign chapter first**

- [ ] Escape-lane / arrester-bed sign (S2 Q53) — confirm the sign's meaning in
      ch.4 before writing anything; do not guess from the pictogram
- [ ] Double-cab pickup on a private B licence: allowed **provided it is not
      used commercially** — a *use* restriction; the bank only covers B by
      weight (S2 Q52)
- [ ] Posted two-figure sign 100 (car) / 80 (lorry) (S2 Q51) — distinct from
      the 110/80 expressway default already at #641

---

## Coverage, stated honestly

The four documents are **not independent** — the book is the master copy and
contains Part 1 + Part 2 verbatim.

| Source | Pages | Opened |
|---|---|---|
| Exam | 50 | **50 — complete**, all 431 questions + full answer key |
| Part 1 | 120 | ~50 |
| Part 2 | 53 | ~15 |
| Book | 234 | ~26 (front matter, ch.1, ch.8 pp154–159) |

The exam is now genuinely exhaustive — every question and every marked answer
was extracted and checked. The other three are not; roughly 145 of 457 page
images have been viewed. Do not restate this as a full page-by-page pass.

**Two factual errors have now been found in total:** the freeway/highway
colours (fixed earlier) and the `#510` blood-group error (fixed this session).
Against that, **ten** apparent gaps were investigated during the exam sweep and
**eight were already correctly covered** — grep the whole bank before believing
in a gap.

---

## Decisions & gotchas

Each of these cost real time to re-derive or was gotten wrong once.

**Sources — read this before opening a PDF again**

- **The exam PDF has a text layer; the other three do not.** `pdftotext -layout`
  yields ~180k chars. Arabic-script shaping is lossy (letters drop) so wording
  still needs a visual read, but structure and the key extract exactly:
  **U+F058 = the correct answer, U+F057 = a wrong one.** Census: 431 checked,
  862 empty = 431×2. Parser output is regenerable; see the recipe below.
- **The exam is 431 questions in TWO sections, not 281.** Q1–281 (rules, PDF
  pp1–33), then the numbering **restarts** at 1 and runs to 150 (signs, PDF
  pp34–50). Anything citing only "Q111"/"Q264" has looked at section 1 alone.
- **Book page offset: printed page = PDF page + 1.** So printed 156 is PDF 155.
  Deriving this cost time; do not re-derive it.
- `poppler-utils` is **not** installed in a fresh container and the Read tool
  needs it for PDFs — `apt-get install -y poppler-utils` first.
- **The exam contradicts itself a second time.** S2 Q145 and S2 Q150 are the
  same question with the same three options and **opposite** marked answers
  (poor visibility in heavy rain/fog: "stop completely" vs "keep driving").
  Same handling as the reversing-distance case — teach the principle, say the
  paper prints both. Do not "fix" one to match the other.

**Content**

- **Speed: there are two instruments and the book prints both on p156 without
  reconciling them.** Circular No.2 of 10/5/2011 gives 100 between cities and
  towns / 60 main urban streets / 20 alleys. The KURDISTAN border panel (table
  G14) gives 60 built-up / 80 outside / 110 motorway. Both are correct and both
  are in the bank (#385/#567/#386 and #289). **Do not collapse them into one
  scheme.** The metre figures painted on streets (150m, 120m, …) are road
  **width**, not speed — the book says so explicitly, and #567 already says it.
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
- **`KU_FILL` is positional, not keyed.** It walks `QUESTIONS` in order and pops
  the next entry for each question missing Kurdish. There are exactly 55 such
  questions and exactly 55 entries, so **adding or reordering any question that
  lacks inline Kurdish silently shifts every later fill onto the wrong question.**
  Currently aligned — verified by option-count and True/False structure, 0
  misaligned. If you add a question, give it inline Kurdish rather than relying
  on the table.
- The two Arabic parameters of `Q()` and the middle one of `O()` are
  **discarded** at runtime — only `ku` is stored. Per the user's instruction the
  vestigial Arabic strings are left alone; **do not "clean them up".**
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

---

## Recipe: regenerate the exam answer key

The exam PDF is the only one with a text layer, and its answer key is machine
extractable. To rebuild it in a fresh container:

```sh
apt-get install -y poppler-utils
pdftotext -layout exam.pdf exam.txt
```

Then parse: question numbers match `‪\s*-\s*(\d{1,3})\b`; a line is an option if
it contains U+F057 (wrong) or U+F058 (**correct**); start a new question when the
number is `prev+1`, and start **section 2** when the number resets to 1 after a
number ≥100. Expect 431 questions, every one with exactly 3 options and exactly
1 correct. Correct-answer positions are front-loaded (214 / 118 / 99), so the
paper is not shuffled — do not use position as a sanity check on content.

Write the private-use characters as `` / `` escapes. Pasting the raw
glyphs through a shell heredoc silently strips them, and `'' in line` then
matches every line — which looks like "every option is correct".
