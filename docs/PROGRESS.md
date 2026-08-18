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
| Active questions | 745 (749 defined, 4 filtered out via `ARCHIVED_Q`) |
| Sign icons | 110 inline SVG |
| Scene / concept illustrations | 134 |
| Questions with no visual | 0 |
| Study-guide tips with no picture | 0 (587 of 587) |

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
- [x] **All three carried sign candidates resolved and written** — see below
- [x] **Part 1 and Part 2 proven to be a subset of the book**, so the
      four-document sweep is finished — see the coverage section
- [x] **Study guide: every tip carries a picture**, 587 of 587 in both
      languages — `7707297`, scoped back to the guide in `4d158b1`
      - The guide's sections after Road signs were walls of text. Each bullet
        now shows the artwork of the question that teaches it: `q.sign` if it
        has one, otherwise `q.scene`. No new artwork was needed, because
        `assignScenes()` always assigns something.
      - `assignScenes()` matches the QUESTION text, but a guide bullet prints
        the EXPLANATION. `EX_FA` / `EX_ME` / `EX_RU` re-match the explanation
        and win over `q.scene`. Without them one picture served 51 tips; the
        largest cluster is now 23 and 95 distinct images are in use.
      - `iconBus` added — bus lanes, bus stops and large-vehicle blind spots
        are all over the handbook and had no picture.
- [x] **GitHub Pages deploy diagnosed** — every pages run has failed, so the
      public site has never served any of this work. **Still blocked on one
      manual click**, see *Next* and gotchas.

## Next

**The source sweep is DONE.** All four PDFs are accounted for: the exam read
completely (50/50, all 431 questions machine-verified against the printed key),
the book read completely (234/234), and Part 1 + Part 2 proven page-for-page to
be book pp 22–229 and therefore already covered.

Nothing in the question bank is currently known to be wrong or missing.

- [ ] **BLOCKED, needs a human with repo admin:** turn on GitHub Pages —
      Settings → Pages → Source: "GitHub Actions", at
      https://github.com/AIfriendly/Ai-driving-theory/settings/pages
      Nothing in this repo has ever reached the public site; the workflow
      fails at `configure-pages` on every run and the Actions token is not
      allowed to enable Pages itself. One click, then re-run the workflow.
- [ ] Nothing outstanding on sources. If new work is wanted, the honest options
      are: a rendering/QA pass over the app itself, or a second opinion on the
      two source defects the book carries (p167 stopping-distance table, p217
      nosebleed threshold) if a non-KRG reference ever becomes available.

The high-figure-density chapters were deliberately swept first, on the theory
that errors hide in numbers rather than prose. That held for errors *against*
the source. It missed the other kind entirely: the three self-contradictions
were only found by comparing questions to each other, which is a different
search and worth doing first next time.

**Carried candidates — all three resolved and written**

All three turned out to be **exam-only** content, absent from the book. They
were settled by reading exam PDF **page 39**, which carries S2 Q51, Q52 and Q53
together.

- [x] Red circle, car **100** / lorry **80** (S2 Q51) → `#748`. **Do not confuse
      this with `#745`.** They are different signs: S2 Q51 is a single
      *red-ringed circle* keyed to **vehicle type**; book p137 §93 sign ③ is a
      *blue lane board* keyed to **lane**. An earlier note in this file claimed
      `#745` closed S2 Q51 — it does not.
- [x] Double-cab pickup on a private B licence (S2 Q52) → `#747`. Permitted
      **provided it is not used commercially** — a restriction on the *use*.
      Nowhere in the book, so `#747` names the exam as its source.
- [x] Escape lane / arrester bed (S2 Q53) → `#749`. Blue sign, lorry climbing a
      loose-surfaced ramp; the paper's own marked answer is
      *شوێنی قەڵایانی ئۆتۆمبێلی گەورە*. This **reverses** an earlier decision in
      this file to close it as unverifiable: that was right on the evidence then
      (the book alone), and reading the exam page supplied what was missing.

---

## Coverage, stated honestly

The four documents are **not independent** — the book is the master copy and
contains Part 1 + Part 2 verbatim.

| Source | Pages | Opened |
|---|---|---|
| Exam | 50 | **50 — complete**, all 431 questions + full answer key |
| Book | 234 | **234 — complete**, every chapter plus glossary and end matter |
| Part 1 | 120 | contained in the book — see below |
| Part 2 | 53 | contained in the book — see below |

**Part 1 + Part 2 are a strict subset of the book, now verified rather than
assumed.** Four anchor points were read directly:

| Anchor | Book printed page |
|---|---|
| Part 1 p1 | 22 (§1 Vehicle) |
| Part 1 p120 (last) | 163 (§119 Roundabouts) |
| Part 2 p1 | 164 (§120 Roundabout dangers) |
| Part 2 p53 (last) | 229 (glossary, 2nd page) |

The seam is exact — §119 closes Part 1, §120 opens Part 2, no gap, no overlap.
So Part 1 + Part 2 = book printed pp 22–229, and since the book is swept
234/234 there is **no page in either Part that has not been read**. Sweeping
them page by page would be re-reading the book. Part 1 fits 142 printed pages
into 120 PDF pages because the Part scans drop the chapter dividers and photo
plates.

**The sweep is complete.** Every exam question and marked answer was extracted
and checked, and the book was read page by page, 234/234. Because Part 1 and
Part 2 are contained in the book (proven above), reading the exam's 50 pages and
the book's 234 covers **every distinct page of content across all four
documents**. The raw arithmetic of 457 counts the same pages three times.

**The book identifies itself on the back cover:** *Traffic Manual — For All Road
Users, B–BE, v1.0, 2025*, by Najat Najm, KRG Ministry of Interior, Directorate
General of Traffic Police. It is one of a **seven-volume series**, one per
licence class (A motorcycle, B–BE, C cargo, D passenger, agricultural,
construction plant, plus instructor editions). B–BE is the right volume for this
app. Lorry and bus material inside it is background, not those classes' syllabus.

**Twelve problems have been found in total, all fixed:**

| # | Problem | Kind |
|---|---|---|
| 1 | Freeway/highway sign colours | vs source |
| 2 | `#510` blood group on the registration | vs source |
| 3 | `#57` stem collided with `#289` | ambiguous stem |
| 4 | `#684` idling threshold: three minutes → **one** | self-contradiction |
| 5 | `#121` burn cooling: "a few minutes" → **10–15** | self-contradiction |
| 6 | `#116` signal-before-mirrors → **mirrors first** | self-contradiction |
| 7 | `#744` disc vs drum brakes | gap |
| 8 | `#745` blue lane board, pictogram per lane (book p137) | gap |
| 9 | `#746` merge priority to the vehicle ahead | gap |
| 10 | `#747` double-cab pickup on a B licence (exam S2 Q52) | gap |
| 11 | `#748` red circle, car 100 / lorry 80 (exam S2 Q51) | gap |
| 12 | `#749` escape lane for large vehicles (exam S2 Q53) | gap |

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

**The pages workflow has been failing since long before the sweep, and still
is.** Every run errors at `actions/configure-pages` with *"Get Pages site
failed … verify that the repository has Pages enabled"*. `has_pages` is
`false` on the repo: Pages was never switched on, exactly as the workflow's
own header comment warned. The checkout and the self-contained check both
pass, so nothing looks broken from the commit side — **a green commit is not
a deployed site; check the pages run, not just the push.**

Adding `enablement: true` to `configure-pages` was tried and is **not enough**:
`GITHUB_TOKEN` cannot create the site (*"Create Pages site failed. Resource not
accessible by integration"*), because creating one needs repo-admin rights.
The flag is kept — it is a no-op once the site exists — but the block is a
human one: **Settings → Pages → Source: "GitHub Actions"**, once, at
https://github.com/AIfriendly/Ai-driving-theory/settings/pages

Two things that will *not* be the problem afterwards: the repo is public, and
`claude/trading-agent-bybit-mcp-ao56dp` is the repo's **default branch**, so
the `github-pages` environment's default "deploy from the default branch only"
rule does not block it. There is no `main`/`master` in this repo at all.

**`.gbul` is not the study guide's alone.** The About page uses it for its
source list. Restyling `.gbul li` into a flex row for the guide's picture
bullets silently stripped the dots off the About page. The picture layout now
hangs off `li.pic`, which only `bullets()` emits. Same class of mistake as
`SCENES` sharing: **grep a class or an asset before restyling it.**

**`SCENES` entries are shared with the quiz.** Editing `iconPhone` to suit one
study-guide tip changed the artwork on the first-aid *questions* too. Reverted.
The guide may add to `SCENES` (`iconBus`) and re-map which entry it picks, but
it must not edit an entry the questions already use.


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
- **`p1.pdf` is 116 MB and the Read tool refuses anything over 100 MB.** Render
  the pages you need instead: `pdftoppm -png -r 100 -f N -l M pdfs/p1.pdf out/`
  then Read the PNGs. 100 dpi on A4 is plenty to read the text.
- **When a lossy extract is not enough, go and look at the exam page.** Three
  candidates sat unresolved for two sessions because the text layer mangled
  them. Locating the page and reading the image settled all three in one go —
  and one of them (the escape-lane sign) reversed a decision made without it.
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

**The section-2 reset needs its own branch, before the `prev+1` test.** Written
naively the `n == prev+1` check fails at the reset (1 is not 282) and the parse
silently stops at 281 — which is exactly how the "281 questions" error was born.
Handle it as: `if n==1 and prev>=100 and sec==1: sec=2; prev=1; continue`.

**To find which PDF page a question is on**, split the text on `\f` and track
the page index while parsing; `len(pages)` is 51 for a 50-page PDF (trailing
chunk). S2 Q51–Q53 are all on exam PDF page 39.

Write the private-use characters as `` / `` escapes. Pasting the raw
glyphs through a shell heredoc silently strips them, and `'' in line` then
matches every line — which looks like "every option is correct".

**The same stripping hits the bidi marks** (U+202A, U+200E, U+200F) in the
question-number regex, so the pattern matches nothing and the parse returns
zero rows. Either escape those too, or write the script with a **quoted**
heredoc (`<< 'PYEOF'`), which passes the bytes through untouched. This has now
cost time twice — and note it bit this very file: an Edit whose `old_string`
was copied from a rendered view of the line above silently lost the glyphs and
failed to match.
