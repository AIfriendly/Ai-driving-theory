# Official exam question bank (source 4)

**What it is:** "پرسیارەکانی تاقیکردنەوەی مۆڵەتی شوفێری / أسئلة اختبار رخصة القيادة"
— General Directorate of Traffic, **Erbil** (بەڕێوەبەرایەتی هاتووچۆی هەولێر),
for all vehicle categories. 50 pages, PDF generated 22 Mar 2021.

**This is not the textbook.** Sources 1-3 were the KRG *study manual*. This is the
*question bank the exam is drawn from* — a different and more directly useful
artefact.

- **281 questions**, numbered 1-281 with no gaps (verified by parsing the text layer).
- Each question has 3 options.
- **The answer key is embedded**: the correct option carries a red ✓, the wrong
  ones a red ✗. No guessing required.
- Text layer exists but drops characters (Skia/PDF font encoding), so the pages
  are read as images at 130 dpi rather than trusted from `pdftotext`.

**Rights notice on the cover:**
> مافی پارێزراوە لە چاپکردن، هەر کەسێک چاپی بکات بەرپرسیار دەبێت بەرامبەر بە یاسا
> "Printing rights reserved; anyone who prints it is legally responsible."

This matters more here than for the textbook, and the distinction is worth being
precise about. Traffic law and road facts are not copyrightable, which is why
covering the manual's *content* in original wording was defensible. Reproducing
281 exam questions **verbatim** is a different act: the expression, not just the
facts, would be copied. Flagged for the repo owner; not assumed either way.

## Coverage findings

(appended per batch)

### Pages 2-6 (exam Q1-44)

The bank confirms one thing outright: **the theory exam pass mark is 80%** (Q24),
which is exactly what the app's exam mode already uses. That was previously an
assumption; it is now verified against the examining authority's own paper.

Sixteen facts in the first 44 questions are not tested anywhere in our 633.
Recorded in `exam-new.txt`.

### Q96 settles the emergency-number question for good

The exam asks for the fire brigade number and offers **188, 104, 115**. The
marked answer is **115**, with 188 present only as a distractor. Two sessions ago
I misread "115" as "188" off a blurry scan and built hedged explanations on it;
those were removed after checking the master copy. The examining authority's own
paper now confirms it independently. The app says 115.

### Q94 conflicts with the app, and the app is not being changed to match

The exam's marked answer for treating a burns casualty is **"remove the burnt
clothing quickly"**. The app teaches cooling with water for 10-15 minutes and
covering with a clean cloth, per the textbook (book p220), and standard practice
is *not* to pull away clothing that is stuck to a burn — doing so tears skin.

Two official KRG sources disagree with each other here. The app follows the
textbook and standard first aid. Flagged rather than silently reconciled: a
learner could meet this question in the real exam, so the repo owner may want to
note the discrepancy rather than have the app quietly contradict the examiner.

### Progress: exam Q1-197 read (pages 1-23 of 50)

95 facts recorded in `exam-bank-new-facts.txt` that the manual never tests.
58 of them are now questions in the app.

Notable material the manual does not cover at all:

- **Licence ages by class** — 16 motorcycle, 18 private car, 20 public licence
  and construction machinery. The manual gives only part of this.
- **The night rule** — on a two-way road the limit is half the daytime figure.
- **Assaulting a traffic officer** — up to 3 years, up to 5 if injury results.
- **Annual inspection failures**, itemised: fuel leak, brake-fluid leak,
  handbrake that will not hold, broken or missing mirrors, dead wipers,
  excessively noisy exhaust.
- **Tyre blowouts**, front and rear, treated as separate techniques.
- **A worn spare** is illegal to fit, exactly as a worn tyre is.
- **Eco figures** — 60-70 km/h is the efficient band; warm up for one minute,
  not five; switch off past three minutes of waiting.
- **Engine knock** traced to low-octane fuel; **overheating** to coolant,
  thermostat or fan belt.

Exam Q198-281 (pages 24-50) are not yet read.
