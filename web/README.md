# Iraq / Kurdistan Driving Theory Test — فێربوونی تیۆری شۆفێری

A bilingual (Kurdish Sorani · English, with partial Arabic) driving theory
practice app for the Kurdistan Region of Iraq. Built as a **single
self-contained HTML file** — no build step, no dependencies, no network calls.

Open `index.html` in any browser, or use the published site (see
[Deployment](#deployment)).

**Current content: 309 questions · 93 hand-drawn sign icons · 14 achievements.**

| Category | Questions |
|---|---:|
| Traffic signs (`signs`) | 106 |
| Rules & safety (`rules`) | 163 |
| First aid (`firstaid`) | 13 |
| Mechanics (`mech`) | 27 |
| **Total** | **309** |

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
- **Sign gallery** — all 89 icons grouped into 7 families, with live search
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
