# Master-copy verification

## What the third PDF turned out to be

Not a new book. It is the **complete, clean, official master copy of the same
textbook** that parts 1 and 2 were phone-scanned halves of:

> **ڕێبەری هاتووچۆ — Traffic Guide, category B-BE**
> Kurdistan Regional Government · Ministry of Interior ·
> General Directorate of Traffic
> Author/preparer: Nejat Nejm · Edition v1.0 · Kurdistan 2025
> Ministry deposit no. 16 · print run 1280

234 PDF pages. **PDF page = printed book page − 1.**

## Page coverage: parts 1 + 2 were complete

| Source | Book pages |
|---|---|
| part 1 scan | 22–163 |
| part 2 scan | 164–229 |
| **master copy** | **1–235** |

The pages parts 1+2 never saw are PDF 1–20 and PDF 229–234. Both were checked
directly against the master copy:

- **PDF 1–20** = cover, credits, ministerial foreword, index, the twelve
  chapter summary cards, and the chapter-1 divider spread. **No test content.**
- **PDF 229–234** = blank `NOTES` pages. **No test content.**

So the 173/173 audit did cover every content-bearing page of the book.

## Chapter index (from the master copy, book page 11)

| # | Chapter | Book pages |
|---|---|---|
| 1 | Definitions | 20–33 |
| 2 | General principles | 34–45 |
| 3 | Traffic law | 46–57 |
| 4 | Traffic signs and equipment | 58–93 |
| 5 | Parts of the car | 94–117 |
| 6 | Preparing to drive | 118–127 |
| 7 | Manoeuvring | 128–153 |
| 8 | Road conditions | 154–173 |
| 9 | Hazard perception | 174–183 |
| 10 | Driver health | 184–195 |
| 11 | Eco driving | 196–205 |
| 12 | First aid | 206–224 |
| — | Traffic glossary (KU↔EN) | 228–229 |

## Defect 1 — RESOLVED, and it was our error

Book page 56 carries the emergency-numbers panel. Read at 300 dpi off the
master copy it is unambiguous:

> **لە کاتی هەبوونی هەر بارودۆخێکی کتوپڕدا پەیوەندی بکە بە یەکەکانی فریاکەوتن، ژمارە 911 یاخود:**
> "In any sudden emergency contact the emergency units, **number 911**, or:"
>
> | | |
> |---|---|
> | **115** | ئاگرکوژێنەوە — fire brigade |
> | **440** | پۆلیسی هاتوچۆ — traffic police |
> | **104** | پۆلیسی فریاکەوتن — emergency police |
> | **122** | فریاگوزاری (ئەمبولانس) — ambulance |

**There is no 188 on this page.** The earlier "the book prints both 188 and
440" note was a misreading of **115** off the blurry part-1 scan. The book is
internally consistent — book page 208 in the first-aid chapter prints the same
list, and the part-2 notes recorded it correctly as 440.

Two app errors followed from this and are now fixed:

1. A question marked **911 as a *wrong* answer**, with the explanation "911 is
   used in North America, not the Kurdistan Region." The government's own
   handbook puts 911 **first**. This was the most consequential factual error
   found in the app to date — it told learners not to call the number the
   official curriculum tells them to call.
2. Two explanations hedged that "the textbook is not consistent about the
   traffic police line." Removed; the app now states **440** plainly.

## Defect 2 — CONFIRMED as a genuine typo in the book

Book page 167, stopping distances in the wet:

| Speed | Distance printed | Car lengths printed | m per length |
|---|---|---|---|
| 48 km/h | 23 m | 6 | 3.8 ✓ |
| 64 km/h | 36 m | 9 | 4.0 ✓ |
| **80 km/h** | **38 m** | **13** | **2.9 ✗** |
| 96 km/h | 73 m | 18 | 4.1 ✓ |

Verified on the clean master copy at full resolution, so this is **the book's
own typo, not a scan artifact**. The other three rows are consistent at ~4 m
per car length; 13 lengths implies ~52 m, and 52 fits the 23 → 36 → ? → 73
progression. The "38" is wrong.

Deliberately never turned into a question.

## Other facts confirmed against the master copy

- **CPR** (book 209): 30 compressions to 2 breaths, ~5 cm deep, 100–120 per
  minute. The app's values match exactly.
- **Sign families A–H** and the international-convention basis: confirmed.
- **Glossary** (book 228–229): ~200 Kurdish↔English driving terms, two pages.

## Rights notice — read this before publishing further

Book page 5 carries an explicit notice. Read at 300 dpi, it says (translated):

> © All rights to this work are reserved to the author, the preparer and the
> Ministry of Interior, per the agreement between them. It is **not permitted
> to reprint or copy** these works, or to **publish them on websites and social
> networks**, or to put them into audio form and **turn them into an
> application**, slides, PowerPoint and the like. They are used **only through
> driving-instruction offices**, as a programme.

It names websites, social networks and applications specifically, and
restricts use to licensed driving schools.

**How this repo has treated it.** Traffic law and emergency phone numbers are
public facts and are not protected by copyright — a publisher's notice cannot
make the legal speed limit or the ambulance number proprietary. Everything in
this app is original wording in English and Kurdish conveying those rules; no
text, illustration, photograph, layout or question wording has been copied from
the book, and the glossary table has not been reproduced.

That is a defensible line, but it is not the rights-holder's stated position,
and the decision about publishing the app publicly belongs to the repo owner,
not to the tooling. Flagged rather than assumed.
