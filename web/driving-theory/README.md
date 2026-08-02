# Iraq / Kurdistan Driving Theory Test — فێربوونی تیۆری شۆفێری

A bilingual (Kurdish Sorani · English, with partial Arabic) driving theory
practice app for the Kurdistan Region of Iraq. Built as a **single
self-contained HTML file** — no build step, no dependencies, no network calls.

Open `index.html` in any browser, or use the published site (see
[Deployment](#deployment)).

**Current content: 255 questions · 89 hand-drawn sign icons · 14 achievements.**

| Category | Questions |
|---|---:|
| Traffic signs (`signs`) | 97 |
| Rules & safety (`rules`) | 125 |
| First aid (`firstaid`) | 13 |
| Mechanics (`mech`) | 20 |
| **Total** | **255** |

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
the development branch. The site lands at:

```
https://<owner>.github.io/automated-trading/driving-theory/
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

- **Kurdistan national speed panel (50 / 80 / 110).** Visible in a wall-chart
  photo but too small and angled to read reliably. Deliberately left out —
  guessing at legal speed limits is worse than omitting them. Needs a
  straight-on photo.
- **Arabic coverage is partial.** UI strings and older questions are
  translated; newer questions are Kurdish + English only.
- **Not built yet:** a test-date study plan (countdown + daily target) and a
  dedicated accessibility polish pass (larger tap targets, screen-reader
  labels, keyboard navigation, stronger high-contrast mode).

---

## Changelog

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
