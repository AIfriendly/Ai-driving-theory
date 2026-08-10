# Iraq / Kurdistan Driving Theory Test — فێربوونی تیۆری شۆفێری

A bilingual (Kurdish Sorani · English, with partial Arabic) driving theory
practice app for the Kurdistan Region of Iraq. Built as a **single
self-contained HTML file** — no build step, no dependencies, no network calls.

Open `index.html` in any browser, or use the published site (see
[Deployment](#deployment)).

**Current content: 736 questions · 110 hand-drawn sign icons · 83 scene/concept illustrations · 14 achievements. Every question now carries a visual.**

| Category | Questions |
|---|---:|
| Traffic signs (`signs`) | 155 |
| Rules & safety (`rules`) | 434 |
| First aid (`firstaid`) | 57 |
| Mechanics (`mech`) | 90 |
| **Total** | **736** |

---

## Design constraints

These are hard requirements, not preferences — everything in the file follows
from them:

1. **Kurdistan-primary.** Kurdish (Sorani) is the default language and the
   layout is RTL by default. English is the secondary language; Arabic is
   present for UI strings and older questions.
2. **Single self-contained file.** The app is published as a Claude Artifact,
   which enforces a strict CSP blocking *every* external host — no CDN
   scripts, no web fonts, no remote images, no `fetch`. All CSS, JS and
   artwork is inline. **Every sign icon is hand-written inline SVG**; there
   is not a single image file in the project.
3. **Offline-capable.** Once loaded the app never touches the network.
   Progress lives in `localStorage`.
4. **Jurisdiction-honest.** Content is sourced from Kurdish study material.
   Where source screenshots carried figures from another country's law
   (alcohol limits, vehicle dimensions, national speed limits), those items
   were **deliberately excluded** rather than presented as local law. See
   [Known gaps](#known-gaps).

---

## Features

### Practice & testing
- **Question sets** — the bank split into fixed-size sets.
- **Category practice** — signs / rules / first aid / mechanics.
- **Mock exam** — timed, randomised, pass/fail scored, with history.
- **Smart Review (spaced repetition)** — a 5-box Leitner scheduler. Each
  question carries `{box, wrong, right, lastSeen}`; intervals are
  `[0, 0, 1, 3, 7, 16]` days. The home screen surfaces how many are **due**,
  **unseen** and **mastered**.
- **Mistake bank** — every wrong answer is retained for targeted redrilling.
- **Flashcards** and a **reverse sign quiz** (given the meaning, pick the sign).
- **Official Textbook sets** — the 353 questions taken from the official
  textbook, pulled out into 22 themed sets of their own, grouped by source.
  Part 1 (pages 1-163) gives six: vehicles & trailers · licences & law ·
  pedestrians & passengers · signs, lights & police signals · roads, junctions
  & manoeuvres · vehicle checks & technique. Part 2 (pages 164-224) gives five:
  weather, seasons & road hazards · driver health, alcohol & drugs ·
  environment & eco-driving · hazard awareness, loads & animals · crashes,
  first aid & breakdowns. The **master copy** — the complete official handbook,
  all 234 pages — gives eleven that follow the book's own chapters: licences,
  law & definitions · pedestrians, passengers & children · signals, signs &
  road markings · the car & its systems · cockpit drill & observation ·
  junctions, overtaking & parking · speed, distance & weather · hazard
  perception & loads · driver health, alcohol & drugs · eco-driving &
  pollution · first aid & emergencies. Each shows a mastery bar, plus an "all
  textbook questions" run. Membership is resolved at runtime. Because later
  audit passes appended their findings to the end of the bank rather than into
  the middle, the textbook block is a run of *segments*, each belonging to one
  source; `BOOKSEG` lists them and every boundary is found by anchoring on
  question *text*, never on an index, so inserting a question anywhere cannot
  silently move a segment. Each source is routed only against its own set
  definitions — so an over-broad keyword in one source's sets can never capture
  another's question. A future audit pass adds one row to `BOOKSEG`. Anything
  unmatched falls into "Other textbook topics", so a question can never be
  silently dropped from the section.
- **Sign gallery** — all 93 icons grouped into 7 families, with live search
  (matches the Kurdish, English and Arabic name *and* the meaning text) and
  family filter chips. Every card carries a one-line meaning pulled from the
  question that teaches it.
- **Search & bookmarks** across the whole bank.

### Guidance
- **Exam-Readiness Coach** — combines coverage, accuracy and mastery into a
  single not-ready / nearly / ready verdict.
- **Study Guide** — a browsable reference rather than a quiz: signs grouped
  into 7 families (warning triangles, priority, prohibition, mandatory /
  direction, information / motorway, road markings, other) plus 7 rule topics,
  first aid and mechanics. Each entry shows the icon and a one-line meaning
  extracted from its question.
- **Achievements** — 14 badges (first answers, exam passes, perfect scores,
  mastery milestones, streaks, a clean-run badge, and a readiness badge) with
  a progress ring. Badges persist once earned.

### Accessibility & i18n
- Language switcher (ku / en / ar) with correct RTL/LTR flipping; layout uses
  CSS logical properties so mirroring is automatic.
- Text-size toggle, persisted separately.
- Kurdish-Arabic digit localisation.
- **Keyboard-operable throughout.** 47 of the 50 interactive controls were
  already real `<button>`s; the three that cannot be (the logo, the flashcard
  and a search-result row) carry `role="button"`, `tabindex` and an Enter/Space
  handler via `kbAct()`. A test asserts that no element with an `onclick` is
  unreachable by keyboard.
- **Answers are announced.** A visually-hidden `role="status" aria-live="polite"`
  region lives in the shell — *not* in the rendered view, because a live region
  has to exist before its text changes for screen readers to announce it
  reliably. `pick()` writes the verdict, the correct answer and the explanation
  into it.
- **Sign-quiz options are labelled by position** (`Option A/B/C`), never by
  sign name: naming them would read the answer straight out. The correct name
  is announced only after the answer is given.
- Icon-only controls (the ★ bookmark) carry `aria-label` and `aria-pressed`.
- Focus rings are 3 px and apply to `[role="button"]` as well as real buttons;
  `prefers-contrast: more` thickens option and explanation borders.

---

## How the content is structured

```js
// A question. Kurdish is passed last so older 2-language entries still work.
Q(cat, sign, q_en, q_ar, opts, answerIndex, ex_en, ex_ar, q_ku, ex_ku)

// An option, in up to three languages.
O(en, ar, ku)

// Sign icons: viewBox 0 0 100 100, inline SVG, shared palette.
var R='#c8202a', B='#0a5aa8', Y='#f4c400', D='#1a1a1a', W='#ffffff';
SIGNS = { key: { en, ar, svg: svg('<…inline svg…>') }, … }
KU_SIGNS = { key: 'کوردی', … }   // Kurdish sign labels
```

Question IDs are **content-hashed**, not positional — so inserting a question
in the middle does not invalidate anyone's saved spaced-repetition progress.

### Storage keys
| Key | Contents |
|---|---|
| `tareeq_v1` | `{mistakes, best, cat, exams, daily, srs, bookmarks, achv}` |
| `tareeq_big` | text-size preference |

---

## Retired questions

Four questions are held in `ARCHIVED_Q` and excluded from the active bank.
They are kept in the file rather than deleted so the decision stays reviewable;
each carries the reason it was retired. All four came from the pre-textbook
seed bank, and three of them stated speed limits the official textbook
contradicts:

| Retired | Why |
|---|---|
| Built-up limit "about 50-60 km/h" | The 2011 circular sets **60** on main streets and **20** in alleys; the alley rule was missing entirely |
| Motorway limit "usually 120 km/h" | **Nothing** official supports 120 — the circular gives 100 between cities, the border panel 110 |
| Town sign means "about 50 km/h" | The built-up limit is **60** |
| "Legal blood-alcohol limit is zero" | Duplicated a better-worded question, and asserted a number the textbook never states |

Notably these sat under a source comment reading *"Kurdistan Region rules
(verified)"* — they were not verified against any Kurdish source. The
surrounding questions in that block (open-road 100 km/h, police 104, seat
belts, phone use, driving on the right) **are** confirmed by the textbook and
stay.

The rest of the seed bank is universal road safety — stopping distances, fog,
first aid, tyre condition — which applies in Kurdistan as anywhere, so it was
kept.

## Editorial rules used when adding questions

Source material is screenshots of a Kurdish driving-test app (question cards
where the correct answer is highlighted green, sign-gallery cards, and official
reference pages). Each candidate is added **only** if it is:

- confirmed correct (green answer visible, or an official reference page),
- not already in the bank (checked by search before every insert),
- not photo-dependent or otherwise ambiguous without the original image,
- not specific to another country's law.

Rejected categories, for the record: duplicates, generic "be aware of the
road's course" filler, and foreign-jurisdiction legal numbers.

**Near-duplicate icons are also declined.** The source app draws several
directions both as a blue *circle* (mandatory) and a blue *square*
(direction-of-travel board). Only one form is kept per meaning, because two
gallery cards with the same correct answer would make the reverse sign quiz
unanswerable.

### Icon drawing notes
Learned the hard way, and worth keeping:
- Overlapping dark silhouettes **merge into an unreadable blob** at gallery
  size (78 px). Fix: draw the shape twice — once stroked white, then filled
  dark — so each object keeps an outline.
- Multi-part animal heads read as forked blobs. Fix: draw neck + head + muzzle
  as **one continuous path**.
- Every new icon is rendered headlessly at **both** full size and 78 px and
  eyeballed before it is committed.

---

## Deployment

### GitHub Pages
`.github/workflows/pages.yml` publishes the `web/` directory on every push to
the development branch. The app is served at the site root:

```
https://aifriendly.github.io/Ai-driving-theory/
```

> **One-time setup:** in the repository's **Settings → Pages**, set
> **Source** to **GitHub Actions**. Until that is switched on the workflow
> will build but not deploy.

### Claude Artifact
The app is also published as a private Claude Artifact. Republishing the same
file path keeps the same URL, so the link previously shared keeps working and
updates in place.

---

## Verification

`index.html` is checked headlessly (Playwright + Chromium) before every
publish. The checks are:

- the file parses and the page raises **no `pageerror`**,
- total question count and per-category counts,
- **zero** missing Kurdish strings across questions, options and explanations,
- every `q.sign` key resolves to a real entry in `SIGNS`,
- newly added icons render, and the signs gallery card count matches
  `Object.keys(SIGNS).length`.

---

## Known gaps

- **Arabic coverage is partial.** UI strings and older questions are
  translated; newer questions are Kurdish + English only.
- **Not built yet:** a test-date study plan (countdown + daily target) and a
  dedicated accessibility polish pass (larger tap targets, screen-reader
  labels, keyboard navigation, stronger high-contrast mode).

---

## Changelog

### Part 1 image sweep — dangerous-goods placards

Reviewing part 1 (the vehicle-categories and rules lecture) source page by page:
its prohibition signs (no pedestrians, no handcart, no animal-cart, no tractor,
no turns, no U-turn) and vehicle categories were already covered by the 110-icon
sign set, but the **dangerous-goods placards were missing** — those questions
fell back to a generic truck/sign icon. Added the ADR-style diamond placards as
proper labelled images: class 1 explosive (orange), 7 radioactive (yellow/white),
2.2 non-flammable gas (green), 8 corrosive (black/white), 3 flammable (red),
6 toxic (skull), plus a class-D fire extinguisher, and wired them to the
hazard-goods questions. 90 scene/concept illustrations total.

### Every question now carries a visual — a concept-icon library + keyword fallback

Final step of the illustration push: instead of drawing one bespoke image per
remaining question (hundreds), a library of ~23 reusable **symbolic concept
icons** was added — fine (banknote), imprisonment (bars), licence card, speed
gauge, calendar (validity), emergency phone (115/104), documents, inspection,
first-aid box, police officer, rain, snow, tunnel, tyre, brake disc, oil can,
horn, indicator, motorcycle, load, a generic road, and a generic "?" sign.

`assignScenes` now runs a keyword→icon fallback after the specific scene map,
then a per-category default, so **every one of the 736 questions resolves to a
sign or an animated visual** — 0 text-only. The icons are decorative
(`aria-hidden`); the answer always stays in the text. Distribution is
keyword-driven (speed questions → gauge, licence → card, tyre → tyre, …) with
generic road / inspection / first-aid / sign defaults catching the remainder.
83 scene/concept illustrations in total.

### Illustrating the concept questions — 9 more animated diagrams

Second illustration pass, this time for the purely conceptual questions the
source leaves as text — the point being to give the learner a mental picture
even where no photo existed: drink-driving (wheel + bottle), the drowsy-driver
face, an overheating temperature gauge with the needle swung into the red and
steam rising, a front-tyre blow-out, aquaplaning through standing water, a herd
of sheep on a mountain road, dipped headlights on an overcast day, the oil
dipstick with its MIN/MAX band, and the alternator belt that charges the
battery. 574 → 564 text-only. 60 scene illustrations total.

### Illustrating the text-only questions — 15 new animated scene diagrams

The source PDFs carry an illustration on almost every question, but the app was
image-light: 590 of 736 questions were text-only. This is the first pass at
closing that gap. Fifteen new inline-SVG scene diagrams were drawn and attached
to previously text-only questions (they illustrate the scenario the text already
describes, so they are decorative `aria-hidden` — the answer is still in words):

- **Instructional diagrams:** hands at 9-and-3 on the wheel, door-mirror
  adjustment (a strip of your own car at the inner edge), a two-second following
  gap, and the railway countdown posts (3-2-1 stripes).
- **Roundabout manoeuvres:** first exit (signal right, right lane), second exit
  (straight ahead), and using a roundabout to turn around — each with a routing
  arrow whose dashes flow along the path.
- **Parking / stopping:** parked before a hill crest (wheels to the kerb), under
  a bridge (prohibited), and stopping on a bend (prohibited).
- **Occupant safety:** children ride in the back in a child seat, a fastened seat
  belt, don't leave a child alone in the car, and leave an injured motorcyclist's
  helmet on.

Motion was added to the scene layer to match the animated signs: routing arrows
march (`sgn-march`), prohibition rings throb (`sgn-throb`), wheels turn
(`sgn-rot`). All of it sits behind the existing `prefers-reduced-motion` guard,
and scene animation never runs inside answer options. 590 → 574 text-only
questions; more passes to follow across the exam picture section, the master
book, and parts 1–2.

### 736 questions — the exam's picture section read in full; engine-bay and multi-car roundabout formats added

Re-reading the exam paper end to end (all 50 pages, not sampled) confirmed its
real shape: **281 text questions** followed by a **150-question picture section**
(the هێماکان block, its own numbering). Cross-checking that picture section
against the bank surfaced two question *formats* the app was missing, both now
built as animated inline SVG:

- **Engine-bay "identify the part"** (exam picture Q135–141). A schematic engine
  bay is drawn once; a pulsing red pointer marks one component — battery, air
  filter, oil dipstick, washer reservoir, brake-fluid reservoir or
  power-steering reservoir — and you name it. The facts already lived in `mech`
  text questions; this adds the visual-recognition format the exam actually uses.
  Six questions, six pointer positions on the same bay.
- **Multi-car lettered roundabout priority** (exam picture Q118–119). The
  existing `jxRound` was a two-car case; this adds a three-car (A/B/C) roundabout
  where traffic already circulating holds priority over everyone waiting to enter.

Both use the `_plan`/`_eng` "the picture IS the question" convention: real
`aria-label`s describe the pointer's position and shape so a screen-reader user
can still answer, and the red pointer pulses via `.sgn-pulse`, which the existing
`prefers-reduced-motion` and pick-the-answer guards already silence where needed.
The 188 = traffic-emergency / 115 = civil-defence split was re-confirmed in
context (exam text Q280 and Q96). +7 questions (rules 433→434, mech 84→90).

### A fourth source: the actual exam paper

Sources 1-3 were the KRG study manual. This one is different in kind — the
**Erbil Traffic Directorate's own exam question bank**, 281 questions with the
answer key printed on the page (correct option ticked, wrong ones crossed). It
is the paper the test is drawn from, so it gets its own group of tiles rather
than being folded into the manual's.

It settles two things outright:

- **The pass mark is 80%** (exam Q24). The app's exam mode already used 80%; that
  was an assumption, and it is now confirmed by the examining authority.
- **The fire brigade number is 115** (exam Q96), with 188 printed as a distractor.
  An earlier misreading of a blurry scan had produced a "188 vs 440" phantom
  contradiction; this is independent confirmation that 115 is right.

83 questions added from all 281 exam questions, covering material the manual
never tests: the night limit being half the daytime limit on two-way roads, the 110/80
split on expressways, tyre blowouts front and rear, brake fade on mountain
descents, the 60-day registration transfer, and a series of absolute bans
(overtaking at level crossings and in tunnels, double parking, stopping on an
expressway).

**Exam Q94 is not being followed.** Its marked answer for a burns casualty is
"remove the burnt clothing quickly", which contradicts both the manual (book
p220: cool with water for 10-15 minutes) and standard first aid, where clothing
stuck to a burn is left alone. The app follows the manual. The discrepancy is
recorded in
[`docs/textbook-audit/exam-bank-source4.md`](../docs/textbook-audit/exam-bank-source4.md)
rather than silently reconciled.

**All 281 text questions are now read.** 160 facts were recorded that the manual
does not test; 83 became questions.

Two further findings from the full pass:

- **The PDF has two sections.** Pages 2-32 are the 281 text questions. Pages
  33-50 are a separate picture test: sign images, and junction diagrams asking
  which of two lettered cars goes first. The sign half is already covered by the
  app's 110 icons and its two sign-quiz modes. The **junction-priority diagram is
  a question type the app does not have**, and it needs new artwork rather than
  text, so it is recorded as outstanding.
- **The exam bank contradicts itself on reversing distance** — Q111 says no more
  than 10 m, Q264 says no more than 5 m, both marked correct. The app's question
  was rewritten to test the principle (short, slow, way behind checked) rather
  than assert either figure.

### Two languages, honestly

The app shipped a three-language data model but a two-language switcher. Arabic
was unreachable — `setLang('ar')` is not wired to any control — while 89% of
questions (556 of 624) had no Arabic anyway. The dead weight is gone: the
`UI.ar` block and the 173 named `ar:` labels on signs and categories are
deleted, and `Q()`/`O()` no longer carry `ar` into the runtime objects, so
nothing can surface a language the switcher cannot select. 854 KB -> 843 KB.

Two latent crashes came out with it. `t()` was `UI[S.lang][k]` with no fallback,
and `setLang()` read `UI[l].brand` directly — either would throw outright on an
unrecognised language. Both now fall back to Kurdish instead.

The Arabic *source strings* in the positional `Q()`/`O()` arguments are left in
place, unread. Stripping them means re-parsing 2,500-odd nested call sites for
about 10 KB, which is a poor trade — and leaving them keeps the real translation
work recoverable if Arabic is ever picked up properly.

### 110 sign icons — the missing vehicle-class prohibitions, drawn and animated

The eight vehicle-class prohibitory signs from book pages 70-71 had no icon, so
they were not testable at all. They are drawn now, along with nine more the book
carries and the app lacked: the plain red ring, no motor vehicles, the tram
warning, the blue horse and cycle route signs, the shared and segregated
pedestrian/cycle routes, end-of-minimum-speed, and the timed parking disc.
Seventeen new icons, 93 -> 110, with 14 questions to go with them.

They move where movement is real: wheels turn, heavy vehicles roll, the parking
disc's hand sweeps. Two guards keep that from doing harm — motion is switched
off inside `.signopt`, because in a "pick the sign" question a single moving
option would point straight at the answer, and the whole set is switched off
under `prefers-reduced-motion`.

**Question ids are now unique.** The id is the spaced-repetition key and was
hashed from the English stem alone, so the ~60 sign questions sharing the stem
"What does this sign mean?" collapsed onto a handful of ids and shared one
Leitner box and one bookmark between them. The sign key is now part of the hash.
This resets saved progress for sign questions once — that progress was being
written to the wrong record anyway. Progress on the other 480 questions is
untouched.

### The full exam read, junction diagrams, and an About screen

Every page of the exam PDF — all 50, both the 281 text questions and the 150
picture questions — has now been read end to end. This surfaced three things.

**The 188 correction.** The exam authority treats 188 (traffic emergency) and
115 (fire / civil defence) as two different lines and tests both. An earlier
pass had concluded "there is no 188" from the study manual, which prints only
115 — an overcorrection. The app now teaches both, and every emergency-number
list in the bank was fixed.

**Junction-priority diagrams** are now a real question type: six plan-view SVG
diagrams (uncontrolled crossroads, turning across oncoming traffic, roundabout,
main road vs side turning, turning across pedestrians, a lane merge). They carry
an aria-label, unlike the decorative scenes, because here the picture is the
question. Plus stopping-distance rules the manual omits: 20 m / 10 m clearance
at bus stops and crossings, the 1 m gap between parked cars, the 50 m / 130 m
warning-triangle distances.

**An "About & sources" screen** (footer link, both languages) states the app's
copyright position: facts and law are not copyrightable, every question, icon
and diagram is original, nothing was copied from either official document, both
documents reserve reprint rights and this app reproduces neither, and publishing
publicly is the owner's decision.

### 729 questions — second full pass over all three sources

Every page of the master copy was read again, this time checked against a
mechanically extracted index of all question texts, so "the topic is in there
somewhere" could not pass for coverage. Parts 1 and 2 were established first as
*incomplete* photo scans of the same edition — 120 images spanning 142 book
pages, 53 spanning 66 — which is why the pass runs on the master copy.

Twelve gaps became questions, including three the app had no business missing:
give way to the right at an uncontrolled crossroads, the driver's own arm
signals, and a white cane with a red band meaning deaf-blind rather than blind.
Details in [`docs/textbook-audit/reverify-2026-08.md`](../docs/textbook-audit/reverify-2026-08.md).

Still outstanding: the eight vehicle-class prohibitory signs on book pages
70-71 need new SVG icons, so they are not yet testable.

### 607 questions — the whole master copy read page by page, with its own tiles

Every one of the master copy's 234 pages was opened and recorded, not just the
pages that parts 1 and 2 had covered. The audit is in
[`docs/textbook-audit/part3-master-copy-all-234-pages.md`](../docs/textbook-audit/part3-master-copy-all-234-pages.md).

**111 new questions**, in a new group of eleven tiles (`BOOKSETS3`) that follow
the book's own twelve chapters rather than the ad-hoc themes used for the two
scanned halves. `bookSets()` now routes three pools instead of two; `BOOKSEG`
gained one row.

Three content pages had slipped past the earlier batch headers and were read
separately — they turned out to carry real material: the **level-crossing
countdown posts** (three red stripes at 300 m, two at 200 m, one at 100 m),
**yellow-backed signs meaning *temporary***, **Zone signs applying to a whole
area**, and the **combined continuous-plus-broken line rule** (obey the line on
your own side).

Other things the app had never covered: **Instruction No. 11 of 2024** and the
full licence table, the **owner who lends a car to an unlicensed driver facing
the same fine**, **helping the injured reducing your sentence while refusing
increases it**, the **1.5 m minimum when passing a cyclist**, the **1001-1002
counting method** for the two-second gap, **never opening a smoking bonnet**
(the oxygen feeds the fire), the **A/B/C/D/K extinguisher classes** and the
**PASS technique**, **staying at the scene or facing a heavy penalty**, and the
handbook's **six human factors** behind most crashes.

Four questions written during this pass duplicated ones already in the bank and
were removed; a pre-existing question about yellow-backed signs that had always
fallen into the generic bucket is now routed. Zero duplicates, zero unrouted.

### 496 questions — verified against the official master copy

A third PDF turned out not to be a new book. It is the **complete, clean,
official master copy of the same textbook** the first two were phone-scanned
halves of: *ڕێبەری هاتووچۆ*, category B-BE, Kurdistan Regional Government,
Ministry of Interior, General Directorate of Traffic, edition v1.0, 2025.
234 pages; PDF page = printed page − 1.

**Coverage confirmed.** Parts 1+2 spanned book pages 22–229. The pages they
never saw — PDF 1–20 and 229–234 — are front matter (cover, credits, foreword,
index, chapter cards, dividers) and blank `NOTES` pages. No test content in
either. The 173/173 audit really was complete.

**A safety-critical error found and fixed.** The app had been marking **911 as
a wrong answer**, explaining that "911 is used in North America, not the
Kurdistan Region." The handbook's emergency panel on book page 56 opens with
*"in any sudden emergency contact the emergency units, **number 911**, or:"* —
911 is the number the official curriculum tells drivers to call first. Fixed.

**The 188-vs-440 "contradiction" was ours, not the book's.** Read at 300 dpi,
book page 56 lists 115 fire, **440** traffic police, 104 emergency police, 122
ambulance. There is no 188 anywhere on it — the earlier reading was `115`
misread off the blurry scan. Both hedging explanations were removed and the app
now teaches 440 plainly.

**The page-167 stopping-distance defect is real.** Confirmed on the clean copy:
80 km/h is printed as "38 m ≈ 13 car lengths" while the table's other three rows
all work out at ~4 m per length. It is the book's own typo. Still not tested.

Full detail, including the chapter index and the book's rights notice, in
[`docs/textbook-audit/master-copy-verification.md`](../docs/textbook-audit/master-copy-verification.md).

### 496 questions — both parts fully re-audited
Part 2 has now had the same page-by-page treatment as part 1: all 53 pages
re-rendered under fresh filenames, re-read, and the findings written to disk
after each batch. **19 further gaps** were closed.

The most useful of them is regional: **what to do in a dust storm** — slow,
hazards on, stop somewhere safe, shut the doors and windows, and wait for real
visibility rather than driving on. Late summer and autumn dust storms are a
routine hazard in Iraq and the app had nothing on them. Also new: summer heat
softening the asphalt, clearing the **left-hand** lane for an ambulance (not
the right, as a UK- or US-trained driver might assume), using your own car as
a barrier when a casualty is lying on the carriageway, what to say when you
call the emergency services and in what order, raising a bleeding limb,
never washing an injured eye, raising the legs for internal bleeding, bleeding
from the ear or mouth as a sign of internal injury, marking the spread of
swelling after a snake bite, killing the power before touching an electrical
burn, and the textbook's own warning about **staged crash scenes used for
theft**. First aid grew from 27 questions to 36.

Both audits are recorded page by page in
[`docs/textbook-audit/`](../docs/textbook-audit/), which is the coverage
evidence: 120/120 pages for part 1 and 53/53 for part 2, with the candidate
gaps and what the app already covered.

**One source problem is recorded rather than papered over.** The
stopping-distance table on book page 167 gives 80 km/h as "38 m ≈ 13 car
lengths", which is internally inconsistent — the table's other three rows all
work out at about 4 m per car length, so 13 lengths is roughly 52 m. Verified
against the clean master copy, so it is the book's own typo. That row was
deliberately never turned into a question.

A second apparent problem — the traffic police number appearing as both 188 and
440 — turned out to be **our** error, not the book's, and is now fixed. See
[`master-copy-verification.md`](../docs/textbook-audit/master-copy-verification.md).

### 477 questions — part 1 re-audit complete (all 120 pages)
Applying the part-2 lesson to part 1. Every page is being re-rendered under a
fresh filename and re-read, with findings written to disk after each batch
rather than held in context — the exact failure that caused the part-2 gap.

**All 120 pages (book pages 22-163) have now been re-read.** The reassuring
result: the great majority of the material was already covered. Trailer
dimensions, the 70 m lorry gap, the five-minute definition of "stopping",
freeway-vs-highway, dead ends, white-cane priority, the direction-sign colour
scheme, the signal-distance rule, hands at 9 and 3, the 5 cm steering free
play, ABS on loose surfaces, the seating geometry and the mirror routine were
all already in the bank — as was the uphill/downhill wheel-turning pair, which
book page 153 confirms outright.

**Twenty-one real gaps** were found and closed. From the first half: the
16/18/20 licence ages, yellow box junctions, red-always-on-top, audible
crossings, deaf pedestrians, passengers signalling for the driver, the A-H
sign families, crossing behind a bus you have just left, and the long-dash
warning line. From the second half: roundabout direction and priority, the
left-turn lane choice, the stop-line hierarchy, the right-left-right look at a
STOP sign, the twenty forbidden parking places, the 30 cm kerb distance, the
illegal-overtaking list, straight-line reversing technique, reversing with a
trailer, why speed limits differ between countries, tyre age, and loosening
wheel nuts before jacking.

These sit after the part 2 block in the file but are part-1 topics, so
`part1ExtraStart()` routes them back into the part-1 sets rather than letting
them land among the weather and first-aid questions.

**Method note, since this is the second audit:** every page was re-rendered
under a fresh filename before reading, and findings were appended to a notes
file on disk after each batch of eight. Holding them in context is what caused
the part 2 gap.

**Source inconsistencies found, recorded rather than papered over:** book page
56 appeared to print both 188 and 440 for the traffic police *within the same
section*. **(Later corrected — this was a misreading of `115` off the blurry
scan. The book is consistent at 440. See the master-copy entry below.)**

### 456 questions — part 2 re-audited, coverage gap closed
A re-read of part 2 found that pdf pages 7-19 (book pages 170-187) had been
opened but never actually fed into the questions: the working notes for that
stretch were lost mid-session and a re-read silently returned nothing, so the
gap went unnoticed. Re-rendering those pages under fresh filenames made them
readable again, and they held a great deal that had been missed — **18 more
questions**: the winter kit for a mountain journey, why hot water cracks a
frozen windscreen, ice on bridges, crosswind and high-sided vehicles, standing
water and lost grip, hazard perception, parked cars and children, wild animals
dazzled at night, crowds outside mosques and places of mourning, human factors
as the leading cause of crashes, blind spots beside lorries, potholed roads,
responsibility for a load, dangerous goods, carrying animals, the 7-9 hour
sleep requirement and the fatigue checklist.

This material needed a fifth part-2 set, **Hazard awareness, loads & animals**.
Set order matters: it sits *before* the crashes set, because several of its
explanations contain the word "crash" and the broader set was capturing them.

Book pages 228-229 are a Kurdish-English glossary of driving terms. It is
reference material rather than testable content, so no questions were drawn
from it; it remains available if a glossary screen is ever wanted.

### 438 questions — official textbook, part 2 (pages 164-224)
A second PDF (53 pages, book pages 164-224, topics 120-160) covered ground
part 1 never touched, and **42 questions** were added from it. It is the
first source to give the app a real first-aid section: that category grew
from 14 questions to 27.

Because this material does not fit the part-1 sets, it gets its own four:
**Weather, seasons & road hazards** (10), **Driver health, alcohol & drugs**
(10), **Environment & eco-driving** (5), **Crashes, first aid & breakdowns**
(17). Routing is by *position*, not keyword — `part2Start()` anchors on
question text the same way `bookStart()` does, so a part-1 question can never
be pulled into a part-2 set by an over-broad regex.

**A source conflict worth knowing about:** page 208 and page 220 both list the
emergency numbers and give the traffic police as **440**, while part 1 appeared
to give **188**. Rather than teach a number that may be wrong, the question that
tested it was rewritten to test the ambulance number (122, uncontested).
**(Later corrected — part 1 says 440 too; the 188 was a misread. The app now
teaches 440 plainly.)**

### Retired four wrong speed-limit questions; closed a roundabout gap
An audit of the pre-textbook seed bank against the official textbook found
three questions stating Kurdistan speed limits that the textbook contradicts,
plus one duplicate. They are now archived rather than deleted — see
[Retired questions](#retired-questions). A coverage re-check of the PDF also
found roundabout signalling and positioning (page 163) only partly captured,
and the minimum-versus-maximum lane-board distinction missing; both added.

### 397 questions — all 120 textbook pages
The earlier pass read only 48 of the 120 pages — pages 1-18 in full, then
samples. The remaining 72 have now been read, and they held a great deal that
the sample had missed. Textbook-sourced questions went from 51 to **139**.

Notable additions and corrections:

* **The authoritative Kurdistan speed limits.** Page 156 cites Traffic
  Directorate circular No. 2 of 10/5/2011: **100 km/h** between cities and
  towns, **60** on main streets inside built-up areas, **20** in alleys. This
  is more precise than the 60/80/110 border panel added earlier, which the
  same page shows as the sign posted for arriving drivers.
* **Emergency numbers** — 115 fire, 122 ambulance, 104 emergency police,
  **440 traffic police** *(recorded as 188 at the time; corrected against the
  master copy)*, and **911 for any sudden emergency**, which the handbook lists
  first.
* **Kerb colour means nothing officially.** A widely believed myth: parking
  restrictions come from signs and the law, not from the paint on the kerb.
* **Licence weights** — B covers up to 3500 kg with a 750 kg trailer; C1 is
  3500-7500 kg. **Penalties** for unlicensed driving, drink-driving, and
  insulting or obstructing an officer.
* **Signalling, marking and lighting detail** — level-crossing countdown posts
  (300/200/100 m), yellow = temporary warning signs, arrow traffic lights,
  alternating flashing red, yellow box junctions.
* **Overtaking** — the 1.5 m minimum past a cyclist, no horn near horses, no
  overtaking a car already at the limit, and passing a queue one vehicle at a
  time.
* **Two corrections to existing content.** The app taught "mirror - signal -
  blind spot"; the textbook orders it **mirrors, blind spot, signal, move**,
  and that is now what the app teaches. A slope-parking question was also
  ambiguous — uphill the wheels turn away from the kerb, downhill into it — so
  it is now explicitly the downhill case, with the uphill case added separately.
* A hedged placeholder question ("verify answer on the portal") was resolved:
  the law's order of priority is now stated outright.

### Official Textbook sets
The 51 textbook questions were spread across the general categories, so there
was no way to study them as a body. They now have their own home section with
six themed sets and a mastery bar each.

Sets resolve at runtime from a matcher fragment rather than a stored index or a
tag written into each question, which keeps the grouping correct if questions
are reordered. A headless check asserts all 51 are matched, none appears in two
sets, and no matcher is dead — it caught three matchers whose escaped quotes
never matched anything, and one that wrongly pulled in a licence question from
a different source.

### 309 questions · 93 signs — full pass through the official textbook
Worked through all 120 pages of the Kurdistan driving theory textbook. The
scan has no text layer (121 images, 0 fonts), so each page was read as an
image; the largest image per page was extracted and downscaled for legibility.

**The long-standing speed-limit gap is now closed.** The general speed panel
appears on page 76. Cropping that page at full resolution made the pictogram
beside each figure readable, which is what settles the meaning:
**60** inside a built-up area, **80** outside it (town symbol struck through),
**110** on a motorway. Added as a drawn sign plus a question. Every previous
attempt was refused because the only photo was too small — the rule was never
to guess at a legal limit, and it held until the source could actually be read.

Also new:

* **Traffic-police hand signals** — three drawn signals (stop · one side held ·
  front and behind held). Article 17 makes an officer's signal override every
  sign and light, which the app had stated but never illustrated.
* **Law and penalties** — Traffic Law No. 86 of 2004 as the governing statute,
  sentences for causing death, and licence withdrawal including the three-year
  bar on someone who holds no licence.
* **Licence categories** — A / B-BE / C / D / T, the D1 limits (16 passengers,
  8 m), category T speeds (40 and 60 km/h), and taxi conversion.
* **Trailers, child seats, taxi conduct, pedestrians** — the 750 kg B/BE line,
  the 80 km/h towing cap, rear-facing seats vs active airbags, walking facing
  traffic, the white cane, and pushing a bicycle counting as being a pedestrian.
* **Vehicle and technique** — gear-change speeds, hands at 9 and 3, 5 cm of
  steering free play, DOT date codes and tyre speed ratings, the roadworthiness
  checklist, signalling distances, parking (5 minutes / 30 cm), roundabout
  direction, and controlled vs uncontrolled junctions.

### 264 questions — trailers, towing and taxi conduct
First batch from the official Kurdistan driving theory textbook (a 120-page
phone-scanned PDF, so every page is an image with no text layer). Pages 22-26
yielded six questions on topics the bank had no coverage of at all:

* **Trailers and towing** — the 750 kg B/BE licence boundary, the 80 km/h
  towing speed cap, the outright ban on carrying anyone inside a trailer, and
  the rule that a trailer may be no longer and no wider than the car.
* **Taxi conduct** — the driver's right to ask for the fare in advance where
  payment is doubtful, and the limits on what a passenger may ask for (route
  and sole occupancy yes; speeding or breaking a traffic rule no).

### 258 questions · 89 signs — searchable, grouped sign gallery
The gallery was a flat, unsorted, unsearchable grid of 89 icons. It now groups
them into 7 families (warning · priority · prohibition · end-of-restriction ·
mandatory & direction · information & motorway · road markings), with filter
chips, a live search box and a one-line meaning under every card.

Two things surfaced while building it:

* `ped` — a **blue information board** — was filed with the warning triangles.
  Moved to Information.
* **`slippery`, `signals` and `oneway` had no question at all.** They appeared
  in the gallery and flashcards but were never tested. Three questions added,
  so every sign in the app is now taught by at least one question — which the
  gallery enforces visibly, since a card with no question has no meaning line.

`sgFamilies()` keeps an **"Other signs"** bucket for any key missing from the
family table, so a future sign can never silently vanish from the gallery.

### 255 questions · 89 signs — licence classes
Added the Kurdistan **driving licence classes and minimum ages** from an
official reference page: motorcycle at 16, private/special car at 18, general
(public) licence for taxi/bus/lorry-for-hire at 20, plus the military,
agricultural and construction classes. The bank previously covered licence
*withdrawal* and *requirements* but had no age or class rules at all.

### 252 questions · 89 signs — lane discipline
Added **keep left**, **keep right** and the **compulsory lane route** board
(the blue lane-diagram sign, a new sign *type* for the app — teaches that a
speed roundel drawn inside a lane applies to that lane only).

Also **corrected the `give_way_oncoming` icon**: its two arrows were the wrong
way round. On the real sign the *red* arrow points up — it marks your own
direction, the one that must yield — with the black oncoming arrow pointing
down. As drawn it had been a mirror of the blue priority-over-oncoming sign.

### 249 questions · 86 signs — end-of-restriction family
Added **end of no-overtaking**, **end of speed limit**, **stop for inspection /
control** (the checkpoint sign) and **merging traffic**. The two "end of" signs
introduced the standard grey-symbol + black-diagonal-bar treatment.

### 245 questions · 82 signs — dimension limits complete
Added **length limit**, completing the height / width / weight / length family.

### Earlier in the same effort
- Grew the icon set from 41 to 82 hand-drawn signs.
- Built the **Study Guide** reference section.
- Built the **Achievements** system (14 badges, progress ring, new-badge banner
  on the results screen).
- Added the Kurdistan **warning-triangle distances** (50 m in town / 100 m open
  road / 150 m in mountains) once an official reference page supplied local
  figures — these had previously been skipped for carrying foreign numbers.
