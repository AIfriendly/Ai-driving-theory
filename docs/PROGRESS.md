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
| Ad clips rendered | 10 voiced Kurdish (15-24s), delivered · earlier silent 8x2 batch at `292a68e` |

Branch: `claude/trading-agent-bybit-mcp-ao56dp` — this is also the repo's
**default branch**. There is no `main`/`master`.
Repo: `AIfriendly/Ai-driving-theory` (renamed from `automated-trading`; the
local `origin` still points at the old name and works through the redirect).

**Published where:**

| Target | State |
|---|---|
| **GitHub Pages** | **LIVE** — https://aifriendly.github.io/Ai-driving-theory/ · ad recorder at `/ad.html` · first successful deploy 2026-08-18, run `32174909525` |
| Claude artifact | current — https://claude.ai/code/artifact/c5c01665-6f71-4311-8309-246932861af4 · viewers on the share link see a *pinned earlier version*, so re-share from the page's share menu after publishing |

**Hard constraint on the owner's side: no TikTok app on the phone.** The owner
has ADHD and is deliberately avoiding the app for addiction reasons. This is
not a preference to optimise around — it rules out whole approaches. Anything
that ends "…then finish it in the app" is disqualified, including TikTok's
own draft/inbox upload flow. Web browser or API only. Asked about late in the
planning after two rounds of advice that assumed a phone app; ask about
constraints like this earlier.

**Repo layout:** `web/index.html` is the app, `web/ad.html` a screen-record
preview of the ad clips, `video/` the Remotion project that renders them
(node_modules and out/ gitignored — re-run `npm install` after a fresh clone).

**Picking this up cold.** Three things are finished and should not be redone:
the question bank (do not re-sweep the PDFs), the site (live), and the ad
creative (10 voiced clips delivered, gofile link in *Ad creative*).

What is actually left, in order:
1. The owner posts the 10 clips. Nothing else moves until traffic exists.
2. Buy a domain — the last Phase 0 item, and the only one with a deadline,
   since the github.io URL cannot be migrated once it is in a TikTok bio.
3. Phase 3, the paywall, **only if step 1 shows demand**. The split is decided
   and exact — see P2, and build the P6 manual gate, not the FIB API.

**Steps 2 and 3 are independent — do not treat the domain as a prerequisite
for payments.** The domain needs an international card; the FIB backend needs
an Iraqi company. FIB's callback URL can be any free host subdomain. See P7.

**Read *Distribution* before advising on posting, ads or automation.** That
ground was covered in detail and several intuitive answers are wrong for this
owner — most of all anything that assumes the TikTok app is on their phone.

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
- [x] **GitHub Pages: diagnosed, unblocked, LIVE** — `b10f197`, first green
      run `32174909525`, 2026-08-18.
      https://aifriendly.github.io/Ai-driving-theory/
      Every run before this failed at `configure-pages`, so nothing this repo
      had ever built reached a public URL. The owner enabled Pages by hand
      (`GITHUB_TOKEN` cannot — creating a Pages site needs repo-admin, and
      `enablement: true` was refused). Verified after deploy: HTTP 200,
      1.05 MB, deployed bytes execute — 10 home tiles, 587/587 guide tips
      illustrated, mock exam launches, zero page errors.
- [x] **Voiced batch of 10 built and delivered** — `d88b314`, gofile fix
      `183c3e0`. **https://gofile.io/d/4pkWXKOg** (10 MP4s + POSTING.md),
      re-uploaded 2026-08-19 and verified; the original `6C6fLr7d` was left
      unverified because **gofile expires inactive guest content** and its API
      now gates folder listing behind premium, so a 200 on the page proves
      nothing (the SPA returns 200 for deleted folders too). Treat any gofile
      link as a handoff, not storage — `npm run upload` in `video/` mints a
      fresh one in about a minute. The clips were also delivered to the owner
      directly as files, which is the durable copy.
      Ten fresh hooks, none reused: night speed, lesson liability, ambulance
      number, towing speed, seat belt in pregnancy, green arrow, priority
      order, following distance, yellow kerb line, unlicensed-driver penalty.
      - Kurdish voice from kurdishtts.com. 2,106 characters for all twenty
        files against a 20,000/month free tier.
      - **Clip length now follows the voice** (15-24s). The first sample
        exposed it: the voice reads ~10 chars/sec and a full script ran 24.6s
        against a hard-coded 15s clip. `timing.ts` derives every beat from the
        measured WAV durations.
      - **Two audio files per clip, not one.** `sayA` (hook + question) plays
        from the start; `sayB` (answer + reason + CTA) is in a `<Sequence>`
        starting at the reveal. One track would have the voice give the answer
        away seconds before the screen — breaking the design while everything
        still "worked".
      - Type scales to content weight, so a wordy hook drops a size instead of
        overflowing the safe zones. All 10 pass the check.
      - Verified per clip: video and audio track durations match and run ~1.4s
        past where the voice stops, so nothing is clipped. All valid MP4s,
        1,353-1,658 kbps.
- [x] **Ad creative built and verified** — `web/ad.html` (screen-record
      preview) `ca006c9`, `video/` Remotion project `292a68e`, audio slot and
      voiceover scripts `38face1`, safe-zone and bitrate fixes `6b84a35`,
      bitrate actually applied `8779eae`. See *Ad creative*.
      - 16 clips: 8 hooks × Kurdish/English, 1080×1920, 30fps, 15s.
      - Shipped once at 812 kbps with the CTA under TikTok's caption and
        Kurdish text under the share buttons, then fixed. **The first version
        looked fine and was unpostable** — the defects were only found by
        checking against published specs, not by looking at frames.
      - Final: mean 1,769 kbps (min 1,404, max 2,061), 16/16 clear of all
        four safe zones, all containers valid.

## Next

**The source sweep is DONE.** All four PDFs are accounted for: the exam read
completely (50/50, all 431 questions machine-verified against the printed key),
the book read completely (234/234), and Part 1 + Part 2 proven page-for-page to
be book pp 22–229 and therefore already covered.

Nothing in the question bank is currently known to be wrong or missing.

The plan is ordered deliberately: **ship free, prove people want it, then
charge.** Building payments before step 2 is the expensive way to find out
nobody came. Do not reorder without a reason.

### Phase 0 — get it on the internet at all

- [x] **GitHub Pages is on and the site is LIVE.** Enabled by hand by the
      owner 2026-08-18; first green run `32174909525`.
      **https://aifriendly.github.io/Ai-driving-theory/** (`/ad.html` too)
      Verified after deploy: HTTP 200, and the deployed bytes execute —
      10 home tiles, 587/587 guide tips illustrated, mock exam launches,
      zero page errors.
      Two traps recorded in gotchas: enabling Pages does **not** deploy
      anything by itself (the switch was flipped ~12 min after the last run,
      so the site still showed nothing and looked broken — the workflow has to
      run again), and the page shipped with no viewport meta, so phones laid
      out at ~980px and scaled the app to half-width until `d659882`.
- [ ] Buy a domain and point it at Pages (Settings → Pages → Custom domain).
      `aifriendly.github.io/Ai-driving-theory/` converts badly from social,
      depends on the repo name (**this repo was already renamed once**), and
      cannot be moved when Phase 3 needs a host that runs code. ~$12/yr for a
      .com; `.krd` is $21-40 and open to anyone, but reads more official than
      an app deliberately labelled unofficial should.
      Free alternatives were researched and none solve portability — they are
      all someone else's namespace. Freenom, the old free-domain default,
      shut down in 2024 and 12.6M domains stopped resolving.

      **CORRECTION 2026-08-19: calling `pages.dev` a lateral move was wrong,
      and "stay on github.io" is no longer the best free option.** That verdict
      compared URL *strings*. It ignored the Phase 3 requirement this same file
      states two lines later — Pages cannot run code. **Cloudflare Pages
      Functions are on the free tier** (100,000 requests/day combined with
      Workers; static assets unlimited and free; account needs an email, no
      card). So moving is not lateral:
      - it **deletes** the forced Phase 3 host migration, because the FIB
        callback and entitlement check can live on the same host;
      - it drops both the `/Ai-driving-theory/` path **and** the dependency on
        the repo name, which has already changed once;
      - it is where a bought domain would attach anyway, in one click, with
        the `.pages.dev` URL still working afterwards. Doing it now is step one
        of the paid plan brought forward, not a stopgap to throw away.

      **Owner cannot pay for a domain right now (2026-08-19), so this is the
      live plan.** Keep GitHub Pages running in parallel as a fallback.
      **Do this before the link is in a TikTok bio and on eight videos** —
      that is when changing it starts costing real money.

      **Shortlist, checked against live RDAP 2026-08-19** (404 = free,
      200 = registered; `https://rdap.org/domain/<name>` follows redirects, so
      use `curl -sL`). **Recommended: `tareeqapp.com`** — keeps the decided app
      name, `.com` is the cheapest TLD Cloudflare sells and the one people type
      by reflex. Runner-up `tareeq.co` (~3x the price, exact name).
      `tareeq.com` is **registered but dead** — HTTP 445, parked — so there is
      no brand conflict, but it is not cheaply buyable either.

      | Free | Taken |
      |---|---|
      | tareeqapp · tareeqiq · gettareeq · mytareeq · tareeqku · tareeqdriving · hatucho · hatuchoo · drivekurdistan · kurdistandriving (all `.com`) | tareeq `.com .net .org .dev .app .site` |
      | tareeq `.co .me .xyz .info .online` | molet.com · seyare.com · teoriq.com |
      | molet `.app .co` · rega.co · shofer.co · hatucho.app | rega.app · shofer.app · wane.app · taqi.app · teori.app |

      `hatuchô` (هاتوچۆ) is the real Kurdish word for traffic and the strongest
      local signal on the list, but its Latin spelling is ambiguous
      (hatucho/hatuchoo/hatuchu) and it abandons the name already on the clips.

      **Free-host names, checked 2026-08-19.** `tareeq` is gone on *all* of
      pages.dev, netlify.app, vercel.app and as a GitHub username, so
      `tareeq.github.io` is not available either. **`tareeqapp` is free on all
      four** — that is the name to claim. `hatucho`, `tareeqiq`, `tareeqku`,
      `tareeqdriving` and `drivekurdistan` are also free on the three hosts.
      Only `tareeq-app.netlify.app` was taken among the variants.

      **Do the availability check by HTTP status, and use a control.** A bare
      `curl` of `<name>.pages.dev` returns **000 when free** (no DNS) and 200
      when taken; netlify and vercel return **404 when free**. Unauthenticated
      `api.github.com` and `github.com` both return **403 through this
      environment's proxy for every name**, existing or not, so curl cannot
      test GitHub names — use `mcp__github__search_users` with `user:<name>`
      instead, where a 422 "users do not exist" means the name is free.
      Always run a known-nonexistent control first; without one the proxy's
      blanket 403s read as "everything is taken".

      **Cloudflare Pages setup** (~5 min, no card): Workers &amp; Pages → Create →
      Pages → Connect to Git → `AIfriendly/Ai-driving-theory`; project name
      `tareeqapp`; **build command empty**; **build output directory `web`**;
      production branch `claude/trading-agent-bybit-mcp-ao56dp`.

      **No bill-shock risk, checked 2026-08-19 — and this is the deciding
      reason to prefer Cloudflare over Netlify or Vercel, not convenience.**
      The traffic plan is TikTok, which is inherently spiky, and a viral clip
      is exactly the event that triggers a surprise invoice or a paused site
      on the other two.
      - Cloudflare's pricing page states **"Unlimited bandwidth"** and
        **"Unlimited static requests"**. This app is one static file, so
        essentially all traffic sits in the free-forever bucket. Other Pages
        free limits are irrelevant here: 20,000 files (this repo ships 2),
        25 MiB per file (index.html is 1.1 MB), 500 builds/month.
      - Functions are 100,000 requests/day and on exceeding return
        **Error 1027 with no overage billing** (Cloudflare's own wording),
        fail-open or fail-closed by configuration. A purely static site never
        increments this counter.
      - **No payment method on the free plan means no charge is possible.**
      - **Netlify billed a free-tier user $104,500** — a 3 MB file, 60.7 TB
        over four days, on a site that had never passed 10 GB/month. Their
        policy is to bill overages and forgive after the fact, so the invoice
        arrives and then you argue. It was waived. It was **not** a DDoS but
        sustained downloading of one file, which is precisely the shape of
        risk a 1.1 MB `index.html` carries.
      - **Vercel Hobby pauses the project** instead of billing — no invoice,
        but the site goes dark exactly when a clip takes off.
      - At 1.1 MB per load, a 100 GB/month cap (Netlify free, Vercel Hobby) is
        about **90,000 page loads**. Cloudflare has no such wall.
      - GitHub Pages is also bill-safe: 100 GB/month soft limit enforced by
        email and throttling, never a charge. Fine to keep as the fallback.
      - **Later, deliberately:** if the Phase 3 FIB backend passes 100k
        requests/day, Workers Paid is $5/mo including 10M requests then
        $0.30/million. That tier is usage-based, but it is opt-in.

      **Cloudflare-specific traps, none of which announce themselves:**
      - **Buying needs an international card.** Try the FIB card; a declined
        card here predicts the same wall on TikTok ads, so this is a cheap test.
      - **Cloudflare does not sell premium-tiered domains.** An unregistered
        name showing "unavailable" in the dashboard means premium, not a bug.
        Take the next name on the list.
      - **Keep the DNS records grey-clouded (DNS-only) until GitHub has issued
        the certificate.** Proxying first blocks Let's Encrypt validation and
        Pages sits on "certificate provisioning" forever. If the proxy is
        switched on afterwards, SSL/TLS mode must be **Full** — Flexible puts
        Pages into an infinite redirect loop.
      - Cloudflare Registrar **requires its own nameservers**; DNS moves with
        the purchase. It also charges at cost with no first-year discount and
        no renewal spike, unlike Namecheap's $1-then-$15.

### Phase 1 — make it fit to launch — DONE

- [x] Strengthen the disclaimer to say plainly "not official, not endorsed" —
      the footer `disclaimer` string now opens with *Unofficial. Not endorsed
      by, affiliated with, or an official product of any government body.* and
      states the material is from 2026, in both languages. This is the string
      every screen shows; the About screen's `aboutRightsNote` already said it
      but is one tap away.
      - Left alone deliberately: `aboutRights3` ends "Whether to publish it
        publicly is the repository owner's decision" — an internal note that
        reads oddly to a user. Reword it if the About page is touched again.
- [x] Artifact republished at the current build — `phase-1-qa`.
      **Still needs a human:** re-share it from the page's share menu, or
      viewers on the existing link keep seeing a pinned older version. That is
      a UI action, not something a session can do.
- [x] **QA pass done, three defects found and fixed** — `41450e0`. Swept
      3 phone viewports × 2 languages × 11 screens (66 combinations), ran a
      mock exam end to end, and checked offline and reload persistence. The
      sweep now reports **zero findings**.
      - `renderFlash` **threw on entry.** Only `startFlash()` ever filled
        `S.flashKeys`, so reaching the flashcards screen any other way died on
        `SIGNS[undefined].svg`. It now deals its own deck and clamps the
        index. Not reachable by tapping today — but it took the whole screen
        with it, and any navigation change would have exposed it.
      - **Language was never remembered.** Text size persisted, language did
        not: `setLang("ku")` ran unconditionally at boot, resetting every
        English speaker on reload. The comment above `setLang` already
        anticipated "an old saved preference" and nothing had ever saved one.
        Kurdish stays the default; a saved choice wins.
      - **Header controls were 23px tall**, the language switch among them —
        the first thing an English speaker has to find. Those and the guide
        chips now clear 40px via `min-height`, so the pills stay visually
        compact while the hit area grows.
      - Verified clean: no horizontal overflow on any of the 66 combinations,
        exam reaches results with 20 review rows, guide renders with all
        network blocked, language survives reload.
      - The harness lived in the scratchpad and is gone with the container.
        It was worth having — it found all three defects, none of which were
        visible by looking at screens. Rebuild it rather than eyeballing.

### Phase 2 — find out whether anyone wants it

**NEXT SESSION — the batch of 10.** Agreed 2026-08-18, planned not executed.
Nothing below has been started.

1. **Owner supplies the kurdishtts.com API key** (free tier is enough — see
   *Ad creative*). Nothing can start without it.
2. **Build the TTS pipeline.** Read the scripts, call the API, write
   `video/public/audio/<id>-<lang>.mp3`. The audio slot and manifest are
   already wired for exactly this — see P6 and `public/audio/README.md`.
   **Generate one sample first and have the owner listen before batching.**
   Whether a Sorani synthetic voice sounds right is a native-speaker call and
   not one a session can make.
3. **Create 10 unique videos** with the voiceover baked in. Eight hooks exist
   in `video/src/data.ts`; **two more need writing** — pick from the bank on
   the same rule, the questions where the answer most people give is wrong.
   Re-run `npm run check` after: new copy changes content height and that is
   what pushes the column into the safe zones.
4. **Write the posting metadata for each:** title, tags, and description
   carrying the site URL. Kurdish caption and Kurdish hashtags — that is a
   distribution signal, not decoration.
5. **Upload everything to gofile.io** so the owner can copy it in one place.
   API reachable from this environment, verified 2026-08-18
   (`https://api.gofile.io/servers` returns ok).

**The creative is built and verified — 16 clips are ready to post.** See
*Ad creative* below. What is left here is the posting itself.

- [ ] Post to TikTok and watch what happens. This is the cheap experiment and
      the whole reason the free tier exists. Suggested order, strongest hook
      first: mirrors, alley, helmet, burn, green, then the three sign rounds.
- [ ] Add a trending sound in-app to each one. The clips ship silent on
      purpose — see the music note below.
- [ ] Use the comments to settle the KRG fee question (see *open questions*) —
      asking what people actually paid gets a real figure and engagement in the
      same move.
- [ ] Optional: record the voiceovers. Scripts are written and timed in
      `video/VOICEOVER.md`; drop the mp3s in and re-render.

**Do not post before Phase 0 is done.** Every clip ends on "link in bio" and
there is currently no link — Pages has never deployed.

### Phase 3 — monetize (only after Phase 2 says yes)

- [ ] **Build the mock-exam paywall.** Decided 2026-08-18, started, then
      reverted at the owner's request — the tree is clean and nothing landed.
      Shape is in *Product plan* P6: gate `startExam()` only, 2 free attempts,
      5,000 IQD one-time, manual FIB transfer with hand-issued phone-keyed
      unlock codes, no backend. Strings need English **and** Kurdish.
- [ ] Only if manual selling proves demand: FIB merchant onboarding and a real
      server-side entitlement check. Not before — see P1.

### Parked

- [ ] Ask the owner what the cut-off "I won't" sentence meant.
- [ ] Nothing outstanding on sources. If new work is wanted, the honest options
      are a second opinion on the two source defects the book carries (p167
      stopping-distance table, p217 nosebleed threshold), if a non-KRG
      reference ever becomes available.

---

### Notes from the sweep, kept for method

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

## Product plan

Discussed 2026-08-18. **Nothing here is built** — implementation was started
and then reverted at the owner's request; the working tree is clean. Recorded
so the reasoning is not re-derived from scratch, and so the architectural
blocker is hit before code is written rather than after.

Goal: publish free, distribute on TikTok, monetize. App name is **Tareeq**.

**Owner decisions, 2026-08-18** — these settle P2, P3 and P5 below:

- **Paywall the mock exams, nothing else.** Everything else stays free. This
  is P2 adopted and P3 rejected, which is the right way round.
- **FIB, not ZainCash.** The audience is the Kurdistan Region specifically and
  the owner's read is that FIB is the more popular there. No comparative
  user data was found either way — searching produced FIB's own coverage
  claims for Erbil and Sulaymaniyah and ZainCash's national transaction
  volume, nothing that compares them by region. Deferred to local knowledge.
  **P5 below is reversed: FIB first.**
- **Copyright handled by labelling the app unofficial.** See the R block at
  the end of this section for what that does and does not cover.
- One sentence in the owner's message — "I won't" — was cut off and its
  subject is unknown. **Do not guess at it; ask.**

**P1 — the app cannot paywall content as it stands.** `web/index.html` ships
every question, answer and explanation to the browser. Ctrl+U reveals the lot.
A client-side lock is decoration. Paywalling content requires a server holding
the paid material, accounts, an entitlement check per request, and a payment
webhook — which also ends the no-build / no-network / offline property that
makes the app good today. Decide deliberately, do not drift into it.

**P2 — DECIDED 2026-08-18: the 15 sets are free, everything else is paid.**
The owner's call, restated and confirmed after discussion. Supersedes the
earlier vaguer version of P2.

FREE:
- **Sets** — 15 sets x 50 = all 745 questions, with their answers and
  explanations. `SET_SIZE = 50`, so 15 sets really is the entire bank.

PAID (every other screen):
- Mock exam · Smart Review (SRS) · Practice by topic · Road signs gallery ·
  Flashcards · Official book sets · Study guide · Search & saved ·
  Progress and stats · Achievements

Two things were raised against this and the owner chose it anyway. Recorded so
they are not re-argued, and because both affect how it should be *worded* in
the app rather than whether to do it:

1. **The study guide contains no text a free user has not already seen.** It is
   built from `q.ex` — the same explanations printed when a question is
   answered. Behind the paywall it is a convenience (illustrated, organised by
   topic, 587 tips) rather than new content. Sell it as organisation, not as
   extra material, or someone who notices will feel misled.
2. **Nobody experiences needing the tools until they fail a mock exam.** With
   the exam paid from the start, the free tier has to do that job some other
   way — the sets do show a running score, so lean on that in the upgrade
   prompt.

The piracy reasoning behind the split is sound and unchanged: everything free
leaks the moment one person saves the page; everything paid is account-bound
state that cannot be copied.

**P3 — do not gate the whole app behind the door.** Two reasons. It kills the
TikTok funnel, which depends on a free layer being worth sharing. And it
*maximises* piracy exposure rather than reducing it: the artifact behind the
gate is one self-contained 1.1MB file that works offline, so the first buyer
can save a complete working copy and redistribute it. The owner floated this
option; the counter-argument above is the response. If it is chosen anyway,
give a real trial (3 days, not 3 questions) and price for volume.

**P4 — 5,000 IQD, one time, lifetime. No subscription.** Three independent
anchors converge: ~10–25% of the 30,000 IQD KRG test fee; ~0.2–0.5% of an
average monthly salary (~700k–1.05M IQD), matching what the UK comparable
costs its market; and purchasing-power adjustment of the UK one-off (£4.99,
Apple's #1 paid iPhone app eight years running — paid-upfront wins in this
category). 5,000 IQD is also a **single banknote**, which matters because
ZainCash cash-in runs through ~10k human agents. Next tier up, if ever, is
10,000 (also one note). Recurring billing through Iraqi wallets is painful and
distrusted.

**P5 — FIB first (owner's call, reversing the original advice).** The original
reasoning was ZainCash first: the 18–25 first-licence audience holds phone
wallets more often than bank accounts, and ZainCash's ~10k agents handle the
cash-to-digital step. The owner's counter is that this app targets the
Kurdistan Region and FIB leads there. That is plausible and unfalsified — FIB
is a fully digital mobile bank with a payment gateway and stated Erbil and
Sulaymaniyah coverage — so build FIB first and treat ZainCash as the fallback
if conversion is poor. Note Stripe, PayPal and Shopify Payments **do not
support Iraq at all**. Other live options: FastPay, Qi, AsiaPay, PayTabs Iraq.
Any of them needs server-side keys, which is another reason P1 must be settled
first.

**P6 — the launch shape that avoids a backend entirely.** Sketched and then
reverted, but worth keeping, because it lets the owner take money before
building anything:

- Gate only `startExam()`. Free attempts (2) consumed at start, not finish, so
  abandoning a paper does not hand out an extra one.
- Sell manually: buyer sends a FIB transfer, sends the screenshot plus their
  phone number, gets an unlock code back by hand.
- Codes are a hash of the **normalised phone number** plus a salt, so a code
  posted publicly does not unlock anyone else's install. `normId()` must fold
  `07XX`, `+9647XX` and `9647XX` together.
- Store the id and code, and re-derive the code on every check rather than
  trusting a `paid` flag, so hand-editing localStorage is not enough on its own.

This is **honour-system and must be labelled as such in the code**: one static
file means anyone reading the source can bypass it, and the salt is in the
client so a determined user can mint codes. It is survivable only because the
gate protects a *feature* while the question text stays free — a bypass costs
one sale, not the bank. Replace with a server check when revenue justifies it.

**P7 — the FIB API is documented and buildable; the blocker is corporate, not
technical.** Researched 2026-08-19. This resolves the FIB half of the open
question below.

*The domain is not a prerequisite and nobody should assume it is.* FIB requires
a **public HTTPS callback URL**, not a custom one — any free host subdomain
(`*.onrender.com`, `*.workers.dev`, `*.fly.dev`) satisfies it. Buying a domain
and building the payment backend are independent tracks with different
blockers: the domain needs an international card, the backend needs an Iraqi
company.

- **Flow is two approvals.** Register for the sandbox and test freely, then
  submit the *FIB Integration Request Form* for production credentials. Only
  the second is hard.
- **Production requires legal documents and a company registered in Iraq.**
  That is the wall. Onboarding portal: https://request-business.fib.iq/
  Fees are card scheme fees plus **1–5% FIB**, set in the commercial contract.
- **The API is ordinary.** OAuth2 `client_credentials`, REST/JSON, HTTPS
  enforced. `createPayment` takes amount, currency, callback URL, description
  and redirect URI; returns a payment id, a readable code, an app deeplink and
  an expiry. Status is polled by id or pushed to the callback.
- **Official SDKs exist** — Python, PHP, Laravel, Android, under
  https://github.com/First-Iraqi-Bank. The Python one reads config from
  `FIB_API_KEY`, `FIB_API_SECRET`, `FIB_BASE_URL`, `FIB_CALLBACK_URL`,
  `FIB_CURRENCY` (IQD), `FIB_REFUNDABLE_FOR` (P7D). Dev host is
  `fib.dev.fib.iq`.
- **`fib.iq` returns 403 to this environment's fetcher.** The GitHub repos
  fetch fine. Do not retry the site; read the SDKs instead.

**So the ordering stands: P6 before P7.** The manual gate takes money this week
with no company registration and no server. Build P7 when the hand-issued codes
become the bottleneck — that is a volume problem worth having, and it is not
one this project has yet.

**Open questions, none resolved**

- Real current KRG fees. The [KRG portal](https://services.gov.krd/en/service/moi-03-en)
  says 42,000 IQD to issue; a third-party guide breaks the process into
  20k form + 25k eye + 30k tests + 80k printing. The 42k-issue vs 80k-print
  pair looks like a genuine contradiction — one is stale, or one is federal
  Iraq rather than KRG. **Verify before putting a figure in marketing**, and
  separately check whether a *retest* costs the same as a first attempt, since
  that is the number the pitch actually leans on.
- ~~Whether **FIB** onboards individuals~~ — **resolved, see P7.** It does not:
  production credentials need a company registered in Iraq plus legal
  documents. Settlement terms are per-contract; the published fee is card
  fees + 1–5%. **ZainCash is still unchecked.**

**R — commercial redistribution of the source material is still unresolved.**
The bank derives from the KRG Ministry of Interior / Directorate General of
Traffic Police handbook, and 431 questions come from the official exam paper.
The explanations are original; the source material is not.

The owner's decision is to label the app unofficial and note the material is
from 2026. **That was accepted and the app already carries a disclaimer** —
see `disclaimer` and the About & sources screen, which name both sources.
Strengthening the wording to say plainly "not official, not endorsed" is
cheap and worth doing.

Two things it does *not* do, recorded so nobody assumes otherwise later:

- An unofficial label answers **endorsement** confusion — that readers might
  think the KRG published this. It does not answer **copyright**, which is
  about who may reproduce the questions. They are separate problems and the
  label only addresses the first.
- Stating the material is from 2026 makes the copyright position *weaker*, not
  stronger. Recent work is more clearly within its protection term; age is
  what eventually helps, not currency.

The risk is not that the label is wrong, it is that the label is not a defence.
It remains worth confirming redistribution rights before taking money — this
was raised, the owner has decided, and the decision stands. Recorded, not
re-litigated.

---

## Ad creative

Built 2026-08-18. Two paths to the same eight hooks.

`web/ad.html` — standalone page that plays a clip; screen-record it. Useful
for a phone-only workflow or a quick preview. Shares no code with
`index.html`, deliberately, so editing one cannot break the other.

`video/` — Remotion project, renders real MP4s. **This is the one to upload.**
1080×1920, 30fps, **10 voiced Kurdish clips, 15-24s**. Order is
`npm run voice` → `npm run check` → `npm run render:all` → `npm run upload`.
The earlier silent 8-hooks-×-2-languages batch is at `292a68e` if wanted.
`video/README.md` carries the full mechanics; read it before editing timing.

**The hooks are the eight questions where the answer most people give is the
wrong one** — that is what drives the comments that carry reach. Source of
truth is `video/src/data.ts`, copied verbatim from the bank. `bait` marks the
wrong option to light up red on the reveal.

**The timeline is the product, and it is now derived** — see
`video/src/timing.ts`. The reveal waits for the spoken question
(`max(7.6, 0.4 + sayA + 1.0)`) and the clip ends `sayB + 1.4s` after it. Two
points stay fixed because they are the design: question in frame one, answer
only after a countdown and a beat of silence. **Moving the reveal earlier costs
reach.**

**Audio is file-driven and opt-in.** Drop `video/public/audio/<id>-<lang>.mp3`
and the next render bakes it in; `music.mp3` becomes a bed at 14%. A manifest
is generated from what is on disk because Remotion errors on a missing
`<Audio>` source. Scripts for all eight, both languages, timed to the beats,
are in `video/VOICEOVER.md`.

**Do not bake music in for TikTok.** Add it in-app. A trending sound is the
cheapest distribution lever there is, a baked track forfeits it, can get the
video muted, and needs a re-render to change. The music slot is for YouTube
Shorts and Instagram, where the in-app libraries are weaker.

**Sorani TTS exists — earlier note here was wrong.** This file previously said
to record in a real voice because no usable Sorani TTS existed. ElevenLabs
genuinely does not do Sorani text-to-speech (it does speech-to-*text*), but
**kurdishtts.com does, and has a REST API.** Corrected by the owner after the
site was surfaced in a search and dismissed without checking the API.

- Free tier: **20,000 characters/month via API**, 4 voices, Sorani and
  Kurmanji, no card. `x-api-key` header auth. Paid tiers start $9.58/mo.
- All eight Kurdish voiceovers total **2,158 characters** — 9x inside the free
  tier. Both languages ~4,300, still 4x under. **The free tier covers the
  whole use case**; do not pay for this.
- Still unresolved and **not a call a session can make**: whether the voice
  sounds right to a native ear. Generate one sample — `alley-ku` is shortest
  at 249 chars — and have the owner listen before batching.
- The own-voice argument that survives: TTS cannot say "my cousin failed three
  times because of this sign" and have it land. Likely split — TTS for the
  baseline clips, owner's voice for content that carries the account.

---

## Distribution: organic vs ads, and how posting actually works

Researched 2026-08-18. Nothing executed.

**Organic first, ads later — and the reason is specific, not ideological.**
Ads amplify a funnel; they do not create one. The conversion rate is unknown
and the payment flow is manual (FIB transfer, screenshot, hand-issued code),
so ad spend would push cold traffic into a bottleneck. At 5,000 IQD (~$3.80) a
sale, CPA has to stay under about $2 for a margin to exist, and a manual
payment flow will not convert well enough to guarantee that. Organic has no
CAC, 745 questions is effectively infinite content that ads cannot use, and an
account keeps working after you stop paying. **Use organic to find which hook
converts, then put ad money behind the proven winner.**

**Iraq IS supported for TikTok self-serve ad accounts** — checked, against
expectation. TikTok lists Iraq for ad account creation in Business Center
alongside Kuwait, Oman, Qatar, Saudi and the UAE. The visible market of
agencies selling "TikTok ad accounts for Iraq" is opportunistic, not evidence
of a block. Payment methods vary by billing country and are not enumerated;
confirm inside the account.

**If the clips are ever run as paid ads, two things must change first:**
they end on "لینک لە بایۆ" (link in bio), which is an organic CTA and useless
in an ad that carries its own button; and "٩٠٪ ی شۆفێرەکان هەڵە دەکەن" is an
unsubstantiated statistic, which TikTok ad policy prohibits — soften to
"زۆربەی" (most) to keep the hook without the number.

**Automation and trending sounds are mutually exclusive.** Third-party
schedulers *and* TikTok's own Content Posting API can only carry audio already
embedded in the file; the trending sound library is reachable only from the
in-app editor, for licensing reasons. This resolves cleanly once voiceovers
are baked in — there is then no trending sound to lose.

**TikTok's native scheduler is desktop web only.** No schedule button in the
iOS app as of 2026. TikTok Studio on the web, Creator or Business accounts,
15 minutes to 10 days ahead, one at a time, free.

**The draft/inbox API flow is disqualified here.** `video.upload` has a lower
approval bar than `video.publish` and does preserve the in-app editor (so you
*could* add a trending sound) — but the draft lands in the app's inbox and the
creator must open the app to finish. That is precisely the constraint the
owner has. If full automation is ever wanted it has to be `video.publish`
(direct post): weeks of content audit, a server for OAuth with a stable HTTPS
redirect URI, and no trending sounds at all. Build it alongside the Phase 3
payment backend, not as a separate detour — same server.

**"Post via API as private, flip to public by hand" — asked 2026-08-19,
checked, and it does not pay off at this volume.** The idea is sound and it
does dodge the inbox problem above (`SELF_ONLY` is a real `privacy_level` on
Direct Post, and privacy is editable from the web). What kills it is a
different restriction:

- **An unaudited client cannot post to a public account at all.** The whole
  **account** must be private at the time of posting, not merely the video —
  the API's own error is `unaudited_client_can_only_post_to_private_accounts`.
  To publish afterwards TikTok requires flipping the *account* public first,
  then each *video* to "Everyone". So the manual step does not disappear, it
  relocates, and a growth account goes dark while posting.
- Unaudited clients are also capped at **5 users per 24h**, with a per-client
  active-creator cap set from the audit application.

Three tiers, and the middle one is the worst:

| | Build cost | Manual step | Notes |
|---|---|---|---|
| **T1 web upload + native scheduler** | none | ~4 min/video | ~40 min for all 10, once |
| T2 unaudited API | hours + OAuth server | still per-video | account must be private; 5 users/24h |
| T3 audited API | audit 5–10 business days, rejectable, + OAuth server | none | true automation |

**T1 is the answer for a batch of ten**, and it solves the spacing problem
too — ten clips should not go out at once, and the scheduler spreads them
15 min to 10 days ahead in one sitting. **T3 only becomes worth building at a
standing cadence**, and it gets cheaper then because Cloudflare Pages
Functions will already be serving as the stable HTTPS redirect URI the OAuth
flow needs — the same host as the FIB callback.

**Web upload requires no phone app**, which is the practical answer for now:
tiktok.com in a desktop browser uploads, captions, schedules and shows
analytics. Smaller sound library than the app; irrelevant once voice is baked
in.

**Distribution is set by IP, account region and content language — not by
upload method.** TikTok tests a new video on roughly 100-500 people in the
geography it associates with the account, then expands on response. Posting
from a Kurdistan IP is already the right setup. **What the owner is *shown* in
their feed is a consumption signal and says nothing about where their uploads
land** — an English For You page does not mean English distribution. Worth
confirming account region reads Iraq in settings; changing it is deliberately
hard (roughly 90 days, a few attempts a year). **Do not use a VPN** — most
sources recommending it are VPN vendors, it is a ban risk, and the account
already sits in the target market.

**Expect small numbers and do not read them as failure.** The content is
inherently local, so the addressable audience is small. 500 views from Kurdish
learner drivers is worth more than 50,000 global ones. Judge by comments and
link taps, not view count.

**Domain: free alternatives were researched and none solve the actual
problem.** Freenom, the old free-domain default, shut down in 2024 and 12.6M
domains stopped resolving — which is itself the argument. Every remaining free
option (`is-a.dev`, `js.org`, `eu.org`, `*.pages.dev`) is someone else's
namespace, so none gives portability, and Phase 3 forces a host change because
Pages cannot run code. `js.org` would reject this project outright (no
JavaScript connection). Best *free* choice is simply staying on github.io.
Registrars: Cloudflare Registrar sells at cost, Porkbun and Namecheap are
cheap, avoid GoDaddy. **Buying needs an international card** — try the FIB card
first, and note that if it is declined the same wall applies to TikTok ads, so
a $12 domain is a cheap way to find out.

---

## Decisions & gotchas

**`web/index.html` is an Artifact body AND a raw-served page, and those want
different things.** It was written for the Artifact publisher, which wraps the
file in `<!doctype html><html><head>…</head><body>`. GitHub Pages serves it
raw and supplies nothing, so for the first day it was live the page had no
doctype, no charset, no title and **no viewport meta** — a mobile browser
therefore assumed a ~980px desktop layout and scaled everything down, so the
`max-width:560px` column rendered at about half the screen with dead margins.
Fixed in `d659882`: both pages carry their own minimal shell, which stays
artifact-safe because a duplicate viewport tag with identical values is
harmless and a stray doctype is ignored in body position. The pages workflow
now fails the build if either file lacks a doctype or viewport tag.
`viewport-fit=cover` is also what makes the header's `env(safe-area-inset-top)`
padding do anything on a notched phone — it never could before.

**An emulated viewport cannot detect a missing viewport tag.** The Phase 1 QA
sweep passed 66 emulated combinations while the real page was half-width on a
real phone, because Playwright lays out at whatever viewport the test passes
and bypasses meta-viewport handling entirely. The owner's screenshot found it
in seconds. **Assert the tag exists; do not try to observe its effect in a
headless browser.** More generally: device emulation proves layout given a
viewport, never the viewport negotiation itself.

**Four things broke the video render, and three were silent.** Recorded
because none of them announce themselves.

*Remotion needs the OLD headless mode.* Pointing it at
`/opt/pw-browsers/chromium` dies with "Old Headless mode has been removed from
the Chrome binary". Use the `chrome-headless-shell` Playwright installs beside
it — the path is in `video/render-all.mjs`. This one at least fails loudly.

*There is no Arabic-script font on this machine.* `fc-list | grep -c arab`
returns **0**, and DejaVu covers none of it. Without bundling one, every
Kurdish glyph renders as a tofu box — which reviews perfectly clean in the
source and is worthless on screen. `Root.tsx` imports Noto Kufi Arabic from
`node_modules` so the render depends on neither network nor system fonts.
**Do not remove those imports.** Verify by rendering a still and looking at it,
never by reading the code.

*`remotion.config.mjs` is never read.* Remotion looks for
`remotion.config.ts`. A `.mjs` config sits there looking authoritative and does
nothing: `Config.setVideoBitrate("3M")` was declared, appeared correct in
review, and the sixteen clips still shipped at 812 kbps. Encoding settings now
live as CLI flags in `render-all.mjs`. **Measure the output; do not trust the
setting.**

*Composition ids allow `a-z A-Z 0-9 -` only.* `sign_priority` is rejected, so
`Root.tsx` slugifies underscores out.

**TikTok covers the edges of the video, and RTL makes it worse.** ~130px top,
~320px bottom (caption, username, sound row), ~120px right (like / comment /
share), ~60px left. The right edge is the trap: **Kurdish sets right-to-left,
so Kurdish text starts exactly where those buttons are** — a layout that looks
correct in English silently buries the Kurdish clips under the share column.
The first render also put the call to action at `bottom: 90`, i.e. underneath
the caption: the single most important element of an ad, invisible.

`npm run check` in `video/` renders the busiest frame of every composition and
asserts no non-background pixel lands in any of the four margins. **Padding is
not proof** — an absolutely positioned element ignores it, which is how the CTA
got buried. Re-run it after any copy or type change: the binding constraint is
content height, and a longer question pushes the column past the safe box,
overflowing into the top and bottom zones at once. That is what forced the
type down ~12% and forced `sign-narrow-ku`'s Kurdish question to be shortened.

**CRF is the wrong control for flat content.** These clips are one flat colour
and large static text, so they encode very cheaply: CRF 18 produced 812 kbps
and even `--crf=10` bottoms out near 1,090. TikTok recommends 2,000-2,500 for
1080p. A `--video-bitrate=6M` target lands at ~1,870 and raising it further
changes nothing, because the encoder has no more detail to spend bits on.
~1,870 is fine here: the recommendation exists so the source survives TikTok's
re-encode without banding, and banding needs gradients this background does
not have.

**The pages workflow failed silently for months. Fixed 2026-08-18 — the site
is live now — but the failure mode is worth keeping.** Every run errors at `actions/configure-pages` with *"Get Pages site
failed … verify that the repository has Pages enabled"*. `has_pages` is
`false` on the repo: Pages was never switched on, exactly as the workflow's
own header comment warned. The checkout and the self-contained check both
pass, so nothing looks broken from the commit side — **a green commit is not
a deployed site; check the pages run, not just the push.**

Adding `enablement: true` to `configure-pages` was tried and is **not enough**:
`GITHUB_TOKEN` cannot create the site (*"Create Pages site failed. Resource not
accessible by integration"*), because creating one needs repo-admin rights.
The flag is kept — it is a no-op now the site exists — but the block was a
human one: **Settings → Pages → Source: "GitHub Actions"**, done once by the
owner on 2026-08-18.

**Enabling Pages does not deploy anything by itself.** The switch was flipped
about twelve minutes *after* the last workflow run, so that run had already
failed against the old setting and the site still showed nothing — which looks
exactly like the switch not working. The workflow has to run *again*
afterwards. A push touching `.github/workflows/pages.yml` (it is in its own
paths filter) is the easiest retrigger; the Actions token cannot dispatch a
workflow run, so `workflow_dispatch` from a session returns 403.

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
  A fresh container has **no `node_modules` anywhere** — `npm install
  playwright-core` in the scratchpad first (the browser binary is already on
  the image, only the driver package is missing).
- **The default language is Kurdish**, so a `document.body.innerText` grep for
  English strings returns nothing on a fresh load and looks like the change did
  not land. Read the element, not the page text.
- **The GitHub MCP tools are scoped to the OLD repo name, `automated-trading`.**
  Passing `Ai-driving-theory` is refused outright ("not configured for this
  session") even though that is the repo's real name today; the old name works
  through the redirect and the responses come back with the new name in them.
- `actions_list` on this repo returns ~430k characters and blows the tool
  output cap. Fetch it, then parse the saved file with `json.loads` in python.
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
