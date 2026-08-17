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
| Active questions | 742 (746 defined, 4 filtered out via `ARCHIVED_Q`) |
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
- [x] Three gap questions written, all with inline Kurdish so `KU_FILL` is
      untouched: `#741` coolant expansion tank (completes the #735–740
      engine-bay series), `#742` night = half the legal speed, `#743` the
      instructor is liable during a lesson
- [x] `#296` now says outright that the two official sources disagree on the
      steering grip — book teaches 3-and-9, the exam paper marks 10-and-2
- [x] Book chapters swept with **zero discrepancies**: 1 definitions,
      3 traffic law, 6 preparing to drive, 7 parking, 9 hazards,
      10 driver's health, 12 first-aid core, plus parts of 4, 5 and 8
- [x] **Chapters 5, 8, 11 and the rest of 12 swept complete.** Two internal
      contradictions found and fixed, one gap closed:
      - `#684` said switch the engine off after **three** minutes of idling;
        book p204 §146 says **one**, and `#423` already said one. Fixed to one.
      - `#121` said cool a burn for "a few minutes"; book p220 and the bank's
        own `#434`/`#494` say **10–15 minutes**. Aligned.
      - `#744` added: the two kinds of brake are **disc and drum** (book §67),
        kept distinct from the two brake *systems* (service and parking)
- [x] `#296`'s steering-grip wording independently confirmed correct by book
      p104 — 9-and-3 taught, 10-and-2 for older/large wheels, 5 cm free play
- [x] **Chapters 4 (signs) and 7 (manoeuvres) swept complete.** One more
      self-contradiction fixed and two gaps closed:
      - `#116` had its correct answer worded "Signal, check your mirrors and
        blind spot…" — signal first. Book §88/§90 number it mirrors → blind
        spot → signal, and `#555` already printed "Signal, then mirrors" as a
        **wrong** option. `#116` reordered.
      - `#745` added: the third lane-board — vehicle pictograms with per-lane
        speeds (car 100 / car 80 / lorry 50), book p137 §93
      - `#746` added: merge priority goes to the vehicle **further ahead**;
        the zip rule applies only where both sides narrow (book §92)
- [x] **Both carried sign candidates resolved** — see below

## Next

**Unblocked — the PDFs were re-supplied and all four verified intact**
(120 / 53 / 50 / 234 pages = 457, matching the counts below).

- [ ] Book: only the **glossary (PDF 224–234)** is left. Every numbered
      chapter, 1 through 12, has now been swept end to end.
- [ ] Part 1 (120 pp): sweep, and confirm the book-is-master-copy claim
- [ ] Part 2 (53 pp): sweep *(lowest priority — the book duplicates it)*

The high-figure-density chapters were deliberately swept first, on the theory
that errors hide in numbers rather than prose. That theory held — the one
factual error found sat in a list of document fields.

**Carried candidates — resolved**

- [x] Posted two-figure sign 100 (car) / 80 (lorry) (S2 Q51) — **real**, and now
      `#745`. Book p137 §93 prints the lane-board family and it has **three**
      members: plain blue circles = per-lane *minimum*; red-ringed circles =
      per-lane *maximum*; vehicle pictograms + figures = **each lane assigned to
      a vehicle type**. The bank had the first two only. Tell them apart by the
      pictogram, not the number.
- [x] Escape-lane / arrester-bed sign (S2 Q53) — **closed as unverifiable.**
      The sign chapter has now been swept end to end (PDF 56–92, every table)
      and there is no escape lane or arrester bed anywhere in it. Per the
      standing rule, nothing was written from the pictogram alone.
- [ ] Double-cab pickup on a private B licence: allowed **provided it is not
      used commercially** — a *use* restriction; the bank only covers B by
      weight (S2 Q52). Not a sign — look for it in ch.2/ch.3 licence text or
      in Part 1.

---

## Coverage, stated honestly

The four documents are **not independent** — the book is the master copy and
contains Part 1 + Part 2 verbatim.

| Source | Pages | Opened |
|---|---|---|
| Exam | 50 | **50 — complete**, all 431 questions + full answer key |
| Part 1 | 120 | ~50 |
| Part 2 | 53 | ~15 |
| Book | 234 | **223 — every chapter 1–12 complete**; only the glossary (224–234) unread |

The exam and the book are now both exhaustive — every exam question and marked
answer was extracted and checked, and every numbered book chapter has been read
page by page. Roughly **338 of 457** page images have been viewed. Part 1 and
Part 2 remain, but they are copies of the book, so the *content* is fully swept
even though those page images are not.

**Nine problems have been found in total, all fixed:**

| # | Problem | Kind |
|---|---|---|
| 1 | Freeway/highway sign colours | vs source |
| 2 | `#510` blood group on the registration | vs source |
| 3 | `#57` stem collided with `#289` | ambiguous stem |
| 4 | `#684` idling threshold: three minutes → **one** | self-contradiction |
| 5 | `#121` burn cooling: "a few minutes" → **10–15** | self-contradiction |
| 6 | `#744` disc vs drum brakes | gap |
| 7 | `#116` signal-before-mirrors → **mirrors first** | self-contradiction |
| 8 | `#745` per-lane vehicle-type lane board | gap |
| 9 | `#746` merge priority to the vehicle ahead | gap |

Note the pattern. The first three were errors against the source; three of the
remaining six were the **bank contradicting itself** — two questions teaching
different answers to the same fact, which no amount of source-checking alone
would surface. What found them was grepping a figure across the whole bank and
comparing the hits to each other. Do that routinely.

Set against that, **35+** apparent gaps were investigated and the large majority
turned out to be already covered correctly — including one written into this
file as a confirmed gap (steering hand position, `#296`) before it was found.
**Grep the whole bank before believing in a gap, and grep for the wording rather
than the concept.** Two misses this sweep: `#296` writes "9 and 3 clock
positions" with no apostrophe in "o'clock", and the yellow box junction is
written "yellow criss-cross" (`#320`, `#462`), so a grep for "yellow box"
returned nothing.

Where the sweep has reached, the bank is markedly more accurate than the old
coverage table implied: chapters 3, 9, 10 and 12 came back with **zero**
discrepancies across every penalty band, licence weight, age, CPR figure and
tyre spec.

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
- **Grep the exam extract for NUMBERS, not Kurdish words.** Digits survive
  `pdftotext` intact; Kurdish words do not, because Arabic-script shaping drops
  letters. A zero-hit word search on `exam_parsed.json` proves nothing.
- **The book has two internal typos of its own. Do not import either.**
  (1) p167's stopping-distance table reads 48→23 m (6 car lengths), 64→36 m (9),
  80→**38** m (13), 96→73 m (18). Every row is ~4 m per car length except the
  80 km/h one, where 13 lengths should be ~52 m. (2) p217 says to pinch a
  nosebleed "for at least 10–15 minutes" and then to get help "if bleeding
  continues more than **2 minutes**" — you are still pinching at minute 2;
  almost certainly a dropped zero. Neither figure is in the bank, which is the
  right outcome. Teaching a typo is worse than leaving the gap.
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
