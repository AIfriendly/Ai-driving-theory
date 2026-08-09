# Full re-verification pass (all three sources)

Goal: re-read every page of part 1, part 2 and the 234-page master copy and
list anything the app still does not test.

## Source relationship — established first, and it changes the method

| Source | Images | Book pages spanned | Complete? |
|---|---|---|---|
| part 1 scan (`pdf1/a001..a120`) | 120 | 22–163 (142 pages) | **no — 22 pages absent** |
| part 2 scan (`pdf2/p001..p053`) | 53 | 164–229 (66 pages) | **no — 13 pages absent** |
| master copy (`pdf3/c-001..c-234`) | 234 | 1–235 | **yes** |

Verified by matching pages across sources: `pdf1/a120`, `pdf2/p053` and
`pdf3/c-162` / `pdf3/c-228` show the same printed pages (163 and 229) with the
same layout, so all three are the same edition and **master PDF page N = book
page N + 1**.

Both phone scans are therefore strict *subsets* of the master copy. A
page-by-page pass over the master copy covers 100% of what parts 1 and 2
contain, plus the 35 pages neither scan ever captured. That is where the
review effort goes.

## Findings

(appended per batch)

### Method

For each master-copy page the testable content was listed, then checked against
a mechanically extracted index of all 607 question texts (`qbank.txt`, built by
parsing the `Q(...)` calls out of `QUESTIONS`) and the 93 sign keys. A page
counts as covered only when a specific question tests it — not when the topic
is merely "in the app somewhere".

### Pages 21-121: what the pass confirmed

Coverage is much better than a spot check would suggest. Facts that turned out
to be already tested, and which are easy to assume are missing:

- priority order (officer → moving over stopped → main over minor → …)
- red+amber together, green arrow, two alternately flashing reds, flashing amber
- the "70 m between lorries" sign, the no-horn sign, town-entry/exit signs
- supplementary plates: "200 m", two snowflakes, ZONE, brown = tourist
- striped barrier boards and which way to pass
- child under 13 seating, rear-facing seat vs airbag, rear-door child lock
- blind pedestrian's white cane, deaf pedestrian, wheelchair user
- driving barefoot / in flip-flops, backrest and knee position
- 1.6 mm tread, tyre DOT date code, load and speed codes, PRND, gasket,
  crankshaft, piston rings, the three power-steering types

## Pages 122-228: chapters 6-12

Same picture. Everything substantial was already tested: the 32-manoeuvre
sequence, hill parking both ways, the 30 cm kerb distance, mirrors and blind
spots, the pregnant-passenger belt position, tyre codes, jump-starting, towing
at 30 km/h, skidding, fog, floods, potholes, pets and loads, sleep and
anaesthetic limits, the three aims of first aid, internal bleeding, burns,
nosebleeds, extinguisher classes, and why you must stay at the scene.

Two source defects re-confirmed on the clean copy and still deliberately
excluded from the app:

- **book p167** — the wet stopping table prints 38 m for 80 km/h against 13 car
  lengths; the other three rows work out at ~4 m per length, so ~52 m is meant.
- **book p217** — the nosebleed entry says pinch for 10-15 minutes, then refers
  to bleeding lasting "more than 2 minutes". Internally inconsistent.

## Gaps found, and what was done

Twelve genuine gaps became questions (bank 607 -> 619):

| Book page | Gap |
|---|---|
| 49 | the three legal conditions for a category B licence |
| 55 | court driving ban lasts one to three years |
| 53 | penalty for causing **injury** by careless driving (death was covered, injury was not) |
| 30 | what the emergency lane / hard shoulder is for |
| 36 | pedestrians at night: light or reflective clothing, single file |
| 41 | a white cane with a **red band** means deaf-blind, not just blind |
| 61 | the digital countdown timer beside the traffic light |
| 89 | driver **arm** signals (the app only tested passenger signalling) |
| 158 | uncontrolled crossroads: give way to the vehicle on your **right** |
| 171 | aquaplaning — the steering going light in standing water |
| 201 | ~45% of fuel use is down to driver behaviour; good technique saves up to 30% |
| 127 | the convex mirror on a pole at a blind junction |

### Still outstanding: prohibitory signs for vehicle classes (book p70-71)

The app has no icon for **no bicycles, no motorcycles, no lorries, no vehicles
with a trailer, no dangerous-goods lorries, no animal-drawn cart, no handcart,
no agricultural machinery** — eight signs from one spread. Two more warning
signs are also absent: **opening/lifting bridge** (p66) and **tram line ahead**
(p68).

These need new inline SVG icons rather than text questions, so they are left as
a separate piece of work rather than bolted on here.

### Judged not worth a question

Child-seat weight bands, OBD codes P0100-P0300, steering free play of 5 cm,
chevron bend markers, the road-type taxonomy, two further police arm signals,
and the timed parking-disc sign.

## Follow-up: the missing sign icons, drawn

The seventeen signs listed above as "needs an icon" now have one, so they are
testable. Drawn from the master copy artwork:

| Book page | Signs added |
|---|---|
| 70 | plain red ring (no vehicles either direction), no motor vehicles, no motorcycles, no bicycles, no lorries, no lorry+trailer, no car+trailer |
| 71 | no dangerous goods, no animal-drawn cart, no handcart |
| 68 | tram line ahead |
| 74 | horse route, cycle route, shared ped/cycle route, segregated ped/cycle route, end of minimum speed |
| 147 | parking with a time disc |

93 icons -> 110, with 14 questions covering them. Each was rendered and looked at
rather than assumed correct; four (the motorcycle, the car-and-motorcycle pair,
the segregated route and the horse) were redrawn after the first render showed
them unreadable or clipping the sign face.

### Two guards on the animation

Wheels turn, heavy vehicles roll, the parking disc's hand sweeps. That motion is
switched off in two places:

- `.signopt svg *` — in a "pick the sign" question, one moving option out of
  three would point straight at the answer.
- `prefers-reduced-motion` — the existing rule only killed transitions, so
  `animation` was added to it.

Both are asserted by a browser test, not just written down.

### A pre-existing bug this uncovered

Question ids are the spaced-repetition key and were hashed from the English stem
alone. About sixty sign questions share a generic stem — "What does this sign
mean?", "This sign means:", "What does this warning sign mean?" — so they
collapsed onto a handful of ids and shared one Leitner box and one bookmark
between them. Answering one moved the others.

The sign key is now mixed into the hash. All 633 questions have distinct ids,
asserted by a test. Sign-question progress resets once as a result; it was being
written to the wrong record before, and progress on the other 480 is untouched.
