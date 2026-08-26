# Progress & Memory

Persistent state across sessions. Context gets cleared and containers get
reclaimed; this file does not. Read it at session start, update it before
every push.

**How to update:** move finished items from *Next* to *Done* with the commit
SHA. Add anything you had to re-derive, or got wrong, to *Decisions & gotchas*
— that section exists to stop the same mistake twice.

---

## Current state

> **BLOCKER, found 2026-08-26 and NOT yet fixed by the owner: the TikTok bio
> link is a dead URL.** The bio reads `driving-theory.tareeq.workers.dev`.
> The site is `ai-driving-theory.tareeq.workers.dev`. The `ai-` prefix is
> missing, and the wrong host is not a redirect — it is a hard Cloudflare
> 404:
>
> ```
> driving-theory.tareeq.workers.dev      404  17 bytes  "error code: 1042"
> ai-driving-theory.tareeq.workers.dev   200  2,156,216 bytes
> ```
>
> Re-verified 2026-08-26. Ten clips were posted against that bio. Every
> viewer who followed the call to action landed on an error string.
> **Nothing else in the funnel matters until the bio text is corrected** —
> not hooks, not watch time, not batch two.


`web/index.html` — bilingual (Kurdish Sorani · English) driving theory app,
one HTML file, no build step. **The "no network calls" rule no longer holds**
and has not for a while: the driving sim fetches `web/models/corolla.glb`
(2.15 MB), `web/models/buildings.glb` (0.66 MB) and `web/tex/ground.jpg`
(53 KB), each with a graceful fallback if the fetch fails. Everything else — questions, artwork, the whole
quiz — is still inline and works offline.

| | |
|---|---|
| Active questions | 745 (749 defined, 4 filtered out via `ARCHIVED_Q`) |
| Sign icons | 110 inline SVG |
| Scene / concept illustrations | 134 |
| Driving-sim scenarios | 745 of 745 questions — 45 templates (44 reachable), 12 judging kernels · all 745 verified passable, see `scripts/simaudit/` |
| Sim scene cost | 613,740 tris/frame · 142 draw calls (≈112 of them the car model) · 4,585 instanced objects in 30 meshes |
| Questions with no visual | 0 |
| Study-guide tips with no picture | 0 (587 of 587) |
| Ad clips rendered | 10 voiced Kurdish (15-24s), delivered · **batch two: 10 more written, checked and ready — blocked on `KURDISH_TTS_KEY`, no audio and no MP4s yet** · earlier silent 8x2 batch at `292a68e` |

Branch: `claude/trading-agent-bybit-mcp-ao56dp` — this is also the repo's
**default branch**. There is no `main`/`master`.
Repo: `AIfriendly/Ai-driving-theory` (renamed from `automated-trading`; the
local `origin` still points at the old name and works through the redirect).

**Published where:**

| Target | State |
|---|---|
| **Cloudflare Worker — THE LINK TO PUBLISH** | **LIVE** — https://ai-driving-theory.tareeq.workers.dev/ · `/ad.html` too · assets-only, served at no charge · this is the URL in `video/POSTING.md` |
| GitHub Pages | LIVE, kept as fallback — https://aifriendly.github.io/Ai-driving-theory/ · first successful deploy 2026-08-18, run `32174909525` |
| Claude artifact | current — https://claude.ai/code/artifact/c5c01665-6f71-4311-8309-246932861af4 · viewers on the share link see a *pinned earlier version*, so re-share from the page's share menu after publishing |

**Both hosts serve the same file and both stay up.** Cloudflare is the one to
advertise: it runs code (so Phase 3's FIB callback lands on the same host, no
migration), it does not depend on the repo name, and a bought domain attaches
to it in one click. GitHub Pages costs nothing to leave running and covers a
broken Cloudflare deploy.

**The Worker URL is rented, not owned — and Cloudflare says so.** Their docs:
*"your workers.dev subdomain is treated as a Free website and is intended for
personal or hobby projects that aren't business-critical."* Phase 3 sells from
this URL, so that caveat is aimed directly at the plan.

What will *not* take the site down: traffic spikes (static is unlimited), this
container being reclaimed (the deploy is independent), repo changes (the
deployed Worker keeps serving; only future builds break), or inactivity —
there is **no documented auto-deletion**, so it does not rot the way a gofile
link does. What will: changing the subdomain or Worker name again (the old URL
died instantly, confirmed by probe), an account problem, or a Cloudflare
policy change — and against the last two there is no recourse.

**This is precisely what the domain buys, and it is not aesthetics.** Today,
if Cloudflare became a problem, the fix is to shrug and move. Once the URL is
in a bio and on ten posted videos, moving means every published link is dead
and unfixable — the videos are already out. With a bought domain pointed at
this same Worker, any failure above is a five-minute re-point and every link
ever published keeps working. **Sequencing stands: post first (waiting on $11
costs more than the risk does at zero traffic), buy the domain before money
changes hands, and certainly before Phase 3.**

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
creative (10 voiced clips delivered and posted; 10 more written and checked
but unvoiced — see the top Done entry).

What is actually left, in order:
1. **The owner fixes the bio link.** One line of text. Everything below is
   pointless until it is done, and it has already cost ~1,400 views. See the
   blocker at the top of this file.
2. Buy a domain — no longer "the last Phase 0 item" but **the second thing on
   the list**, because the account has no clickable bio field at all, so the
   link has to be short enough to retype from memory. `tareeq.krd` matches the
   `tareeqkrd` handle. The github.io URL still cannot be migrated once it is
   in a bio, which was the original reason and is still true.
3. Read the retention data before posting batch two. Ten clips are a finite
   asset and the first ten bought no information, because the destination was
   broken the whole time.
4. Phase 3, the paywall, **only if real traffic shows demand**. The split is
   decided and exact — see P2, and build the P6 manual gate, not the FIB API.

**The domain and the paywall are independent — do not treat the domain as a
prerequisite for payments.** The domain needs an international card; the FIB backend needs
an Iraqi company. FIB's callback URL can be any free host subdomain. See P7.

**Read *Distribution* before advising on posting, ads or automation.** That
ground was covered in detail and several intuitive answers are wrong for this
owner — most of all anything that assumes the TikTok app is on their phone.

---

## Done

- [x] **Diagnosed why ten posted clips produced no traffic: the bio link is
      dead.** Owner reported low views on ~12 posts averaging ~138 views, and
      sent profile screenshots. The views are unremarkable for a cold start;
      what was not is that the bio reads
      `driving-theory.tareeq.workers.dev`, missing the `ai-` prefix. Verified
      twice, 2026-08-26: that host returns **HTTP 404, 17 bytes, `error code:
      1042`**, with no redirect, while the real host returns 200 and 2.15 MB.
      **~1,400 views were sent to a Cloudflare error string.** Not fixed here
      — it is a text field on the owner's phone. See the blocker banner at the
      top and the gotcha in *Decisions & gotchas*.
      - **There is no Website field in the owner's Edit profile at all**, so
        even the correct URL is plain text a viewer must retype. That is what
        makes the short domain urgent rather than a Phase 3 nicety —
        `tareeq.krd` would match the `tareeqkrd` handle and the logo.
      - **The Business-account switch is not available in the owner's app**,
        and what they found instead was business *verification*, which was
        rejected because it wants real company registration documents.
        Advised against resubmitting an invented registration number: a
        knowingly false submission risks the one asset with an audience on it.
      - **Buffer's free tier is sufficient**, verified against
        buffer.com/pricing: 3 channels, 10 scheduled posts per channel
        ("refill anytime"), 30-day analytics history. Ten days of queue at one
        post a day. Relevant because the owner keeps no TikTok app on their
        phone, so any plan ending "finish it in the app" is disqualified.
      - Still unanswered by the owner: watch-time and retention curves,
        traffic sources, whether the clips play with audio on their phone,
        whether captions went out in Kurdish, whether there are comments.

- [x] **Second batch of ten TikTok clips, plus a countdown that reads as a
      timer.** Owner asked for ten more videos "with timer effect and stuff
      with voice". Twenty hooks now exist in `video/src/data.ts`; batch two is
      hangover, motorcyclist's helmet, child seat, embedded glass, fog lights,
      roundabout signalling, advisory-speed plate, alley limit, being dazzled,
      and the DOT date on a tyre. Picked from a different corner of the bank on
      purpose — first aid, the vehicle itself and the two rules people argue
      about — because ten more speed-limit questions would have competed with
      the ten already posted.
      - **The countdown was never legible.** It was one digit at 8% white
        behind the options, which reads as a rendering artefact, not a clock.
        Replaced with a thin r=300 ring through the centre of the frame that
        drains over the three seconds, the ghost digit washing behind it and
        popping on each tick, red on the last second.
      - **There is no free corner on this layout.** The first attempt was a
        132px badge at the top opposite the wordmark; it landed straight on the
        hook line, which in Kurdish starts at the right edge and runs the full
        width. Every margin is already spent on TikTok's own UI. A centred,
        symmetric outline is the only shape that cannot collide.
      - **`npm run check` now renders two frames per clip, not one.** The
        busiest frame catches a column grown too tall; a frame half a second
        into the countdown catches the timer, which is absolutely positioned
        and therefore ignores the padding entirely — the exact class of bug
        that once put the CTA under the caption. All 20 clips × 2 frames clear
        all four zones.
      - **The sign path in `Ad.tsx` was dead code.** It referenced a `SIGNS`
        map that did not exist anywhere in `video/`; `d.sign` was always
        undefined so the branch never ran and never failed. Wired it to a real
        `video/src/signs.ts` copied from the bank's SVG table, and the first
        sign clip immediately overflowed the top *and* bottom zones — the
        comment promising "sign clips run a size down" had nothing
        implementing it. The 250px card is now charged to the type weight and
        scales with it.
      - **The wordmark was being overprinted.** Pinned at y=142 while the
        vertically-centred column starts at y=150, so any clip tall enough to
        fill the box printed the yellow hook straight through TAREEQ. Moved
        into the flow, where it travels with the content.
      - `gen-voice` and `render-all` both take a subset now, and `gen-voice`
        skips a clip that already has both parts in the manifest *and* both
        `.wav` files on disk. Without that, adding one hook spent the other
        nineteen clips' quota rewriting files that were already correct.
        `render-all` reads its id list from `data.ts` instead of a hand-kept
        copy, and `bundle-posts` no longer hard-asserts exactly ten.
      - **NOT DONE: the voice, and therefore the MP4s.** `KURDISH_TTS_KEY` is
        not in this container and kurdishtts.com rejects an unauthenticated
        request outright (`Invalid API key`, HTTP 401 with no key at all), so
        batch two has no audio and no final render. Everything else is in
        place: `KURDISH_TTS_KEY=... npm run voice -- --only hangover,helmet,\
        childseat,glass,foglights,roundabout,advisory,alley,dazzle,tyredate`
        then `node render-all.mjs --ids ...` finishes it. Cost is ~2,700
        characters of the 20,000/month free tier. One silent preview of
        `advisory-ku` was rendered to prove the timer and the sign card work
        end to end.

- [x] **Driving-sim: regional trees, instanced buildings, and a sky that
      follows you.** Owner asked for more realistic, higher-poly buildings and
      trees. Measured the scene first, which changed what the right answer was:
      **5,348,102 triangles a frame, 123 draw calls** — and nearly all of those
      triangles were trees nobody could see.
      - **The tree scatter was the whole problem.** ~2,437 instances of a
        3,664-vertex conifer *clump* spread uniformly over 88,000 x 165,000
        units, while the fog closes at 6,200. About 3% could ever be on screen
        and an InstancedMesh submits every instance every frame regardless.
        Replaced with a fixed field held in a square of side `2*SIM_SCAT_R`
        (7,200) centred on the car, **wrapped** as you drive: each tree keeps a
        home offset and `simMoveScatter` shifts it by whole multiples of the
        square, so it reappears on the far side. Trees only ever jump beyond
        the fog, so the wrap is invisible, and every instance drawn counts.
      - **Trees are now generated, not downloaded** (`simMakeTreeGeo`): leaning
        tapered trunk, forking branches, overlapping canopy masses, dusty olive
        greens, three species. Bright green conifers on dry dirt was the single
        most jarring thing in the frame. The palette rides in vertex colours so
        a whole tree is one material and one instanced draw call.
      - **`detail` is the LOD dial and the reason higher poly is affordable.**
        The trees you drive past are built at detail 2; the ones filling the
        distance at detail 1. Higher detail where it is seen, less where it is
        not.
      - **Buildings instanced.** Each of ~188 placements was a `proto.clone()`
        in its own Group. Now bucketed by prototype into InstancedMesh: **30
        instanced meshes carrying 4,585 objects**, with a per-instance tint
        (`SIM_BLD_TINT`, sun-bleached concrete and plaster) so the same two
        dozen shapes stop reading as one repeated building.
      - **The sky dome sat at the world origin.** It is 8,000 units across and
        the road runs to 157,000, so a few situations in you had driven out of
        your own sky and everything above the fog went to clear-colour black —
        the band visible in every chase-camera shot to date. It rides with the
        car now.
      - **`startSim` never tore down a running drive.** `simRestart` did it by
        hand; every other route in leaked a WebGL context and a renderer.
        Mobile caps concurrent contexts low, and heavier scenes reach the cap
        faster. Guarded.
      **Measured after: 613,740 triangles a frame, down 8.7x.** Draw calls went
      123 -> 142 and that is not a regression to chase: instanced meshes span
      the map so they cannot be frustum-culled, whereas 188 small clones mostly
      were. `simTest.stats()` breaks it down — **the car model is 218 meshes and
      about 112 of those calls.** That is where the draw calls live, and always
      did; the scenery is now 30 calls for 4,585 objects.
      Software-renderer frame rate went **0.5 -> 1.3 fps**. That number is
      meaningless for a phone (swiftshader is CPU rasterisation) — the 2.6x
      *ratio* is the part worth keeping.
      `web/index.html` also lost **265 KB**: the inline conifer clump
      (`TREE_GLB_B64`) has no reader now trees are generated. 2,415,981 ->
      2,156,216 bytes.
      **Harness gotcha, cost a failed run:** `page.waitForFunction` polls on
      rAF by default. At ~1 fps under software rendering that starves and times
      out while the state it is waiting for is already correct. `simaudit` now
      polls on a timer. Do not read those timeouts as app failures.
      **Still not measured: frame rate on a real phone.** Unchanged caveat from
      the shadows work, and the reason the LOD dial and `SIM_SCAT_R` exist as
      named constants.
      **What was NOT done and why:** the owner asked for high-poly artist
      models. Poly Haven's trees are photogrammetry — 39-199 MB of geometry
      each, hopeless at 700+ instances and not decimatable without destroying
      the leaf cards. Quaternius ships FBX/OBJ through Google Drive, and
      poly.pizza returns 403 from this container. So the realism here comes
      from generated geometry and placement, not from a better tree asset. If
      the owner can drop a game-ready GLB tree (a few thousand triangles) into
      `web/models/`, `simBuildTrees` takes it with a one-line change.
      No new facade texture either: `buildings.glb` already carries baked
      facade/window maps and a Poly Haven concrete map would have fought them —
      the per-instance tint does the varying instead.

- [x] **Driving-sim: audited all 15 sets, then fixed what the audit found.**
      The claim was "every question has a scenario", which `simScenAudit()`
      already proved. The question nobody had asked was whether a learner can
      *beat* them. New harness in `scripts/simaudit/` drives all 745 situations
      headlessly — per-kernel autopilot for the right line, a deliberate wrong
      line for the fail card, both languages. First run: **four situations
      could not be passed by any line or speed the UI allows**, and eighteen
      more punished the correct line.
      - **`no_entry`'s barrier blocked your own lane — 18 situations.**
        `simMakeBarrier(w)` hangs its arm from local x 0..w so `simLiftBarrier`
        pivots it at the post like a real gate, which means the group origin is
        at *one end* of the arm. `simSolid` centred the box on that origin, so a
        420-wide barrier drawn over the side road (x 150→570) had its hit box at
        x −60→360 — over the through lane. Sweeping laterally, every position
        from x≈−50 rightwards failed "You hit something on the road"; the only
        way past was the oncoming lane. **The correct line failed and the
        wrong-side line passed.** `simSolid` now takes a `dx`; `no_entry` and
        `stgBlock`'s barrier branch pass half the arm width.
      - **Holding exactly the minimum speed failed as "too slow".**
        `SIM_KMH` was `180/SIM_MAXSPD` folded into a constant, so
        `simKmh(simUnits(20))` came back **19.999999999999996** — under a
        `vmin` of 20 while the HUD read 20. Same for 40 and 80; 60 and 100 were
        exact, which is why it hid for so long. `simKmh`/`simUnits` now divide
        last (exact for every button on the pad) *and* the zone kernel allows
        `SIM_ZONE_EPS` under the floor, because a driving test should not judge
        to fifteen decimal places.
      - **A speed band with no legal speed in it.** "On the slip road joining an
        expressway **at 50 km/h**…" — `simScenFor` lifts any `NN km/h` out of the
        question text into `p.vmax`, then `motorway_zone` set `vmin=60`. Band
        `[60, 52.5]`: 20/40 failed as too slow, 60/80/100 as too fast. A ceiling
        under the template's own floor is now taken as *not this road* and the
        default 100 is used instead.
      - **Keep-left put the oncoming car in the lane you must hold.**
        `lane_keep` with `lane:"left"` sets the corridor to x −125…−8 and
        `stgOncoming` defaults to x=−66 — dead centre of it, with a ±115 hit
        box. All eleven positions across the corridor collided. Oncoming traffic
        now runs down whichever lane you are *not* being asked to hold.
      - Also: the level-crossing boom only spanned x −150→10, leaving half the
        road open, and `overtake`'s lead car reported "too close to the vehicle
        in front" when the real error was pulling back in early. Both corrected.
      **Re-run after the fixes: 745/745 build, 0 page errors, 0 build failures,
      0 zone bands without a selectable speed, 745/745 bilingual in both the
      banner and the fail card, 0 situations with no working fail path.**
      **Two known false positives in the harness, documented rather than
      papered over:** the last situation of a set reports `fail` because passing
      it calls `simFinishTest()` → `SIM.paused`, and the verdict check reads
      `paused` before `idx`; and `audit.mjs`'s crude overtake line fails where
      14 of 20 real lines pass.
      **Still open, deliberately:** `overtake` has a dead spot at exactly
      60 km/h (you catch the 22 km/h lead but cannot clear it inside the 2400-unit
      zone) — passable at 20/40/80/100, and tuning the geometry blind risked
      breaking the lines that work. And **`school_bus` is a complete, bilingual
      template that 0 of 745 questions reach** — the words "school bus",
      "bus carrying children" and "children getting on/off" appear nowhere in
      the bank, so the school-bus rule is simply not in the syllabus coverage.
      Adding a question needs source material; deleting working content is
      worse than leaving it. Owner's call.

- [x] **Driving-sim: real ground and real shadows.** The two biggest realism
      gaps, both confirmed by reading the scene builder rather than guessing.
      - **The ground was one flat green Lambert colour** across a 600,000-unit
        plane — a billiard table. Now Poly Haven's **"Dry Ground Rocks"** (CC0,
        public domain, no attribution required — credited anyway, as the repo
        credits its other sources), 1K → 512px q75 → **53 KB**, served from
        `web/tex/ground.jpg` and network-loaded like the models, with the flat
        colour as the fallback. Semi-arid tan dirt with scattered stones, which
        is what a Kurdish roadside verge actually looks like — the temperate
        green was wrong for the audience, not just low-fidelity.
      - **Nothing cast a shadow.** Zero uses of `castShadow`, `receiveShadow` or
        `shadowMap` in the app's own code — the only hit in the file was inside
        the bundled three.js. The car, signs and pedestrians read as cut-outs
        floating over the road. Now: `PCFSoftShadowMap`, the sun casts at
        1024², the road and ground receive.
      **The trap here is the shadow camera.** A directional light's shadow is an
      orthographic slab, not the world — sized to cover a 140,000-unit road it
      would give the car about one texel. So the slab is `SHADOW_REACH` (1500)
      around the car and **`simMoveSun()` drags it along every frame**, holding
      the light at a fixed offset from its target so the sun angle — and every
      shadow's direction — stays constant. Shadows are sharp near you and simply
      stop past the fog at 6200, where nobody can tell.
      `simAdd` decides what casts from the object's own bounding-box height
      (>30 units), so lane lines and zebra bars — 3-unit-thick boxes — fall out
      on their own and no caller has to remember which it is.
      Verified with a before/after render from the chase camera: flat green with
      a car floating on it, versus textured dirt with a soft shadow under the car
      and the sign's pole shadow beside it.
      **Next on this thread, in order:** the pine trees are still bright green
      against arid dirt, which now reads worse than it did on the green plane;
      the road is a `MeshLambertMaterial` with a colour map only, so it has no
      normal or roughness map and sun angle does nothing to it; there is still
      no verge or kerb (`P.shoulderMesh` is `null`) so the asphalt ends abruptly;
      and there is a black band above the horizon in the chase view that
      predates all of this and has not been chased down.
      **Not measured: frame rate on a real phone.** Shadow maps are the one
      change here with a per-frame cost, and swiftshader in a headless container
      cannot tell you what an actual handset does. Check it on a phone before
      advertising this.

- [x] **Driving-sim: progress SAVE and a way to SKIP a situation.** The two gaps
      that made a 50-situation drive punishing: closing the app threw away 8-10
      minutes of work, and a situation you could not beat was a dead end
      (retry-or-quit).
      - **Save.** After every verdict — pass, fail or skip — the drive writes
        `{ids, passed, skipped, idx, p}` into the existing `tareeq_v1` store
        under `simSave[set]`. Questions are keyed by `q.id`, the content hash
        already used by the Leitner boxes, so a save survives a redeploy. If any
        saved id no longer resolves (an edited question), the save is **discarded
        rather than restored half-right**.
      - **Resume.** Reopening a part-finished set offers *Continue* / *Start
        over* before the drive begins; the set list carries a `▸ resume 16/50`
        badge so you can see it without tapping in. Continuing rebuilds the task
        list in the saved order and drops the car in behind the situation it left
        off at, stopped.
      - **Skip** appears on the fail card **from the second failure of the same
        situation** — a wall, not a lesson. It scores exactly as a wrong answer
        (`passed:false`), so it cannot be used to inflate a result, and the
        finish card reports `Skipped: N`.
      - `simExitConfirm` said "your progress won't be saved" in both languages.
        It is now true in neither, so both strings were rewritten.
      - **Card actions are now sticky** (`.simcardacts`). The overlay card is
        capped at ~218px on a 390px phone while a fail card with its explanation
        runs to ~377px — so *Try again* was already below the fold before any of
        this. The buttons now ride the bottom of the card and the explanation
        scrolls behind them.
      **Bug found in this change, worth remembering:** the resume offer is shown
      while `taskIdx` is still 0, so tapping ✕ instead of choosing ran
      `simSaveProgress()` → `taskIdx<=0` → **delete the very save being
      offered**. Guarded with `SIM.resumePending`. Any "save on exit" path needs
      to know whether the drive was ever actually picked up.
      Verified end to end: fresh start shows no offer; fail #1 has no Skip and
      fail #2 does; skip advances and persists; badge appears after reload;
      Continue restores idx/score/car position; Start over clears it; skipping
      the last situation finishes the drive and clears the save; backing out of
      the offer leaves the save intact. Regression clean: 745/45/0 missing,
      50 tasks, first 15 situations build, all controls present, 0 page errors.
      **Verify through `window.simTest`, not the `window.SIM` debug patch** —
      everything new here is reachable from it. One trap: `simTest.goto(i)`
      leaves `SIM.task` null (the next frame builds it), so reading `state().k`
      or `state().z` straight after a `goto` returns null and looks like a
      build failure. Call `simTest.step(0.001,1)` first.

- [x] **Driving-sim: REVERSE gear (a button to back up).** The shifter was P/N/D
      with no R, so the car could not move backwards at all — if you overshot a
      situation or drove off the road there was no way out but to restart.
      Added **R** to the shifter (now P·R·N·D, four columns, R highlights red).
      - Travel direction is a `rev` multiplier on the movement step, so R drives
        the car backwards along its heading.
      - **Steering inverts in reverse** — the same input swings the nose the
        other way, as it does backing a real car. Verified: holding LEFT gives
        heading +0.105 in D and −0.105 in R, opposite signs.
      - **Reverse is capped at ~20 km/h** (`SIM_REV_MAX`), like a real car,
        regardless of which speed number is selected.
      - `simSetSpeed` engages Drive from Park/Neutral as before but **never
        overrides a deliberate Reverse** — in R the numbers set how fast you back
        up. Verified: choosing 40 in R stays R; choosing 40 in P engages D.
      Regression clean: 745/45/0 missing, 50 tasks, first 15 situations build,
      all controls present, 0 page errors.
      **Gotcha (cost time twice):** headless rAF here runs only a handful of
      frames, so a value that stops changing between polls looks "settled" when
      really no frame ran — a reverse-cap test falsely reported converging at 69
      and then 34 km/h. **Count frames alongside the value**: the real trajectory
      was 91@f2 → 78@f4 → 69@f5 → … → 22@f10, i.e. dropping ~10 km/h per frame
      toward the 20 cap. Never conclude "converged" from wall-clock polling alone.

- [x] **Driving-sim: got the UI off the 3D view.** Owner: the look wheel and the
      instruction banner were both floating on top of the game picture and
      blocking the view of the road. Both moved out of `.simstage` into the page
      below it:
      - **Instruction banner** — was a dark panel absolutely positioned over the
        road (it covered the very situation it was describing). Now a `.simbanner`
        strip directly under the view, in the app's own surface/border style, with
        `min-height` so showing/hiding it never jumps the layout.
      - **Look wheel** — was absolutely positioned bottom-left over the canvas.
        Now `position:relative` and in-flow inside a new `.simdriverow` flex row,
        sitting to the left of the ◀ ▶ steering buttons; knob restyled to the
        brand colour for contrast against the now-light pad.
      Verified headless by geometry, not eyeball: canvas spans y 224–502, banner
      525–563, wheel 822–926 — **neither overlaps the canvas** — and a drag on the
      wheel in its new position still turns the view (yaw 0 → −0.114, stick
      engaged). Regression clean: 745/45/0 missing, 50 tasks, first 15 situations
      all build, all controls present, loading panel still works in both the slow
      and failed cases, 0 page errors.

- [x] **Driving-sim: loading indicator + car model 3.3 MB → 2.15 MB (−34%).**
      The model is a multi-megabyte download with **no loading UI at all**, so on
      a phone you either stared at a half-built world or silently dropped to the
      procedural car — which is exactly how the "cockpit is too dark" bug stayed
      invisible for so long. Both halves fixed:
      - **Loading panel** (`#simLoad`) centred over the 3D view: "Loading the
        car…" with a progress bar fed by GLTFLoader's `onProgress`. Fades out
        when the real car arrives. On failure it says so plainly — *"Using the
        simple car (model didn't load)"* — then fades, so a silent fallback can
        never again be mistaken for a broken or dark game. Bilingual.
        **The bar goes indeterminate (a sliding stripe) when the host reports no
        `Content-Length`** — a bar frozen at 0% reads as broken, which is the
        very problem the panel exists to solve. Reduced-motion respected.
      - **Model shrunk 3.43 → 2.26 MB on disk (3.27 → 2.15 MiB)** with
        `gltf-transform`: `resize 256` + `dedup` + `prune` + **`quantize`**.
        Quantize is the big win (3.09 → 2.26 MB); textures were NOT the bulk —
        the geometry was (253k vertices at f32). **`quantize` is safe here
        because the inlined GLTFLoader supports `KHR_mesh_quantization` natively
        — no external decoder**, unlike Draco/meshopt which would need extra
        runtime files. Verified: no visible artifacts in cockpit or chase, and
        the `corolla_e180_steering_wheel` node survives (still steers).
      Regression re-run against the CURRENT task system: 745 questions / 45
      templates / 0 missing, 50 tasks per set, first 15 situations all build with
      their kernels (crash_scene/hold, follow_gap/gap, give_way/yield,
      speed_zone/zone, red_light/signal, stop_sign/stop …), all controls present,
      0 page errors.
      **Gotchas:** (1) the scratchpad scripts `verify_branches.js` and
      `verify_speed3.js` are **stale** — they target the pre-`40c516e` fixed
      `stop/speedlimit/pedestrian/...` sequence that no longer exists, so their
      output is meaningless now; use `regress.js` instead. (2) A built task
      (`SIM.task`) has keys `{q,id,k,z,p,actors,solids,anims,s,active,instr,fail}`
      — `id` and `k` (kernel), **not** `.scen`; only the *definition* in
      `SIM.tasks[i]` carries `.scen`. Probing the wrong one silently reports
      `undefined` and looks like a build failure.

- [x] **Driving-sim: free-look WHEEL on the left of the 3D view.** Owner ask —
      a wheel on screen, left side, to look anywhere from inside the car, and
      also to look behind/sides from outside it. Added a circular joystick
      overlaid on the bottom-left of the sim stage (`#simLookPad` +
      `#simLookKnob`, 104px / 88px under 360px wide, translucent with an 👁
      knob). **Rate-based, not absolute**: how far you push the knob is how fast
      the view turns (`SIM_LOOK_RATE=2.4` rad/s yaw, `1.5` pitch), so there is
      no limit on how far round you can look — a full circle in ~2.6 s. Works in
      **both** camera modes: cockpit drives `lookYaw`/`lookPitch` (head turn),
      chase drives `orbitYaw`/`orbitPitch` (swings the camera round the car).
      Pitch clamped to the same limits the screen-drag uses. Releasing springs
      the knob back to centre and leaves the view where you put it. A wheel drag
      clears any Left/Ahead/Behind/Right button target so the two never fight;
      `.simoverlay` got `z-index:20` so the question card still covers the wheel.
      Verified headless: pad renders at the expected box, all four directions
      move the right value in cockpit AND chase, knob springs back on release,
      0 page errors; screenshots confirm the wheel over the cockpit view and the
      camera orbited round the car in chase.
      **Gotcha:** the joystick must `stopPropagation()` on its pointer events —
      the canvas underneath has its own drag-to-look handler, and without it a
      wheel drag drives the view twice.

- [x] **Driving-sim: the cockpit is actually visible now (second, real fix).**
      The owner reported the interior still too dark to see AFTER the earlier
      `cabinFill` fix — so that fix was insufficient, and the reason mattered:
      **the earlier fix only touched the MODELED Corolla cabin.** Rendering the
      procedural fallback cockpit (what you get when `models/corolla.glb` fails
      or is slow to fetch — very likely on a phone) showed a near-black wheel and
      dash: it was lit by a single `PointLight` at intensity **0.55**. Three
      changes, so both interiors are readable:
      1. **Cockpit-only AmbientLight** (`P.cockpitAmb`, 0.85 in cockpit, 0
         otherwise). This is the device-independent lift — it does not depend on
         the model loading or on where a lamp happens to sit, and switching to
         chase view drops it to 0 so the outside world is never washed out.
      2. **Stronger cabin lamps, both paths**: procedural 0.55 → 2.6 plus a
         second low lamp for the wheel/console/footwell; modeled 2.2 → 3.4 plus
         its own second low lamp.
      3. **Lightened the near-black interior materials** — dash `0x191b1f`→
         `0x4a4f57`, trim `0x2a2f36`→`0x59616b`, seat `0x3a2a22`→`0x6b5043`,
         wheel leather `0x14100e`→`0x413935`. A 0x14 wheel is essentially black;
         no amount of light rescues it, which is why lighting alone kept failing.
      Also added `simSetCabinLit()`, which makes the modeled cabin's materials
      mildly emissive while you are inside it (reverted on leaving, so exterior
      paint is untouched).
      Verified headless in BOTH paths (model loaded, and with the .glb request
      aborted to force the fallback): wheel, dash, gauges and hands all clearly
      readable; ambient confirmed 0.85 in cockpit / 0 in chase across toggles;
      0 page errors.
      **Gotchas:** (1) fixing "the cockpit" means fixing **two** interiors — the
      modeled one and the procedural fallback; test with the `.glb` blocked
      (`page.route('**/corolla.glb', r=>r.abort())`) or the broken path is
      invisible to you. (2) Playwright `elementHandle.screenshot()` on the sim
      canvas **times out** ("waiting for element to be stable") because it
      animates — take a full-page shot with a `clip` from the canvas's bounding
      box instead. (3) `drawImage`/`readPixels` off the WebGL canvas returns
      black without `preserveDrawingBuffer`, so measure brightness from a
      Playwright screenshot, not from in-page pixel readback.

- [x] **Driving-sim: look-around BUTTONS (no more dragging the screen).** Owner
      ask — glance around from the driver's seat with buttons instead of the
      drag-to-look gesture. Added a 4-button row under the camera toggle:
      **Left ↖ / Ahead ▲ / Behind ↻ / Right ↗** (bilingual). Tapping one eases
      the view to that direction (±1.3 rad for the mirror/blind-spot glance,
      π for over-the-shoulder); tapping the active direction again returns you
      to Ahead, so one thumb covers it. The view **eases** to the target rather
      than snapping (`SIM.lookYawTarget` + shortest-angle interpolation in
      `simDraw`), and works in chase view too via `SIM.orbitYawTarget`.
      Drag-to-look still works and **wins** — any drag clears the button target
      so the two input schemes never fight; switching camera mode resets the
      glance to Ahead. Verified headless: all four buttons render bilingually,
      set the right target, move the active highlight, toggle back to Ahead,
      and a drag clears the target; cockpit screenshot confirms the view really
      rotates (driver's window, door frame and side mirror come into view);
      0 page errors.
      **Gotcha:** headless rAF is throttled here, so an eased value won't reach
      its target within a short wall-clock wait — assert on `lookYawTarget`
      (and direction of travel), not on `lookYaw` having arrived.

- [x] **Driving-sim: EVERY question in the bank now drives its own scripted
      scenario** — not five situation types cycled ten times. The owner's ask
      was coverage: all **745** active questions, each staged as a real
      situation and judged on what the driver does.
      **How a question becomes a situation** (`simScenFor`, same shape as the
      illustration classifier that already covers the bank): its **sign key**
      first (107 keys → 114 questions), then **keywords in its own English
      text** (→ 535), then a per-category rotation for what is left (→ 96),
      picked by a stable hash of the question id so a question always drives
      the same situation. Numbers come out of the question itself — the limit
      it names becomes the zone's limit, the side it names becomes the side the
      turn goes. Audited from outside: `window.simScenAudit()` reports
      **745 questions, 0 missing, 44 of 45 templates used**, biggest bucket 72
      (9.7%).
      **45 templates over 12 kernels.** Kernels are what the driver must
      actually DO: `stop`, `hold` (stop *and* wait — barrier, officer, train,
      crash scene), `signal` (red / changing amber), `yield` (a conflict zone
      occupied until it clears), `zone` (speed band), `keep` (lane corridor —
      and with `cross`, a full overtake out and back), `gap` (following
      distance behind a braking lead), `pullover`, `turn`, `uturn`, `park`,
      `nostop` (the offence is stopping). Staging is data on top: level
      crossing with barrier and train, police checkpoint with booth and
      officer, crash scene with casualty and warning triangle, fog/night/rain
      (`scene.fog`), tunnel, roundabout island, cones, herds, trams, buses
      pulling out, a cyclist to pass wide, a yellow box junction.
      **The world shows the question's OWN sign** — the app's 110 inline SVG
      icons are painted into the sign board through a data: URI `<img>` onto
      the same canvas the material samples (alphaTest cutout, drawn fallback
      stays if the decode ever fails).
      **The drive is the set.** One situation per question in the set's 50, so
      driving all 15 sets covers the bank; `simSpreadQueue` round-robins the
      set across its templates (the bank is topic-ordered, so without it a set
      staged the same template ten times running) — one drive now stages **20
      distinct templates with 2 back-to-back repeats**. Failing shows the
      mistake, then that question's own correct answer and explanation;
      passing flashes the correct answer as the teachable half. Finishing
      writes to the **same store as the quizzes** — mistakes, Leitner boxes,
      per-category counts, `simBest` — so a clean drive counts as answering
      those questions right.
      **Verified headless:** 49 scripted pass/fail branch checks (both branches
      of every kernel) all pass; all 44 used templates stage with actors and an
      instruction and no build warnings; all 50 situations of a set build; quiz,
      exam and practice modes still work; 0 page errors. Dead quiz-on-wheels
      code (`simTriggerCheckpoint`/`simRenderCard`/`simAnswer`/`simContinue`)
      removed — it had been unreachable since the practical-test rework.
      **Gotchas logged:**
      - `hashStr` returns a **base-36 string**, not a number — `Math.abs(q.id)`
        is `NaN`. Fold the id back into an integer before using it to rotate.
      - Regexes over question text need **word boundaries**: "l*ice*nce" hit
        `/ice/` and sent every licence question into the icy-road scenario;
        "e*merg*ency" hits `/merg/`, "s*park* plug" hits `/park/`.
      - A car body here (176 wide) is **wider than a lane** (130), so a
        collision box of half-width 150 makes a legal pass in the next lane
        count as a crash. Adjacent-lane vehicles use 115–120.
      - A lead car that brakes to **zero** walls the road off and makes its own
        task impossible — brake to a floor speed instead.
      - Verification needs `window.simTest` (`state/put/step/load/goto/plan`):
        headless rAF is throttled, so stepping the world by hand is the only
        way to reach every branch. `simTest.load` also resets the car, or the
        next case starts wherever the last one left off and auto-passes.

- [x] **Driving-sim: number-button speed control + brighter modeled cockpit.**
      Two owner asks. (1) **Speed by numbers, not a pedal.** The owner changed
      their mind about the hold-to-accelerate gas pedal — replaced it (and the
      brake pedal) with a **cruise-control row: 0 / 20 / 40 / 60 / 80 / 100**
      km/h. Tap a number and the car eases to that speed (accelerates up to it,
      brakes down to it); tapping a non-zero speed auto-engages Drive, so the
      numbers alone drive the car; 0 brings it to a stop (for stop signs, red
      lights, crossings). `SIM.targetSpeed` (internal units) is set from km/h via
      `speed*MAXSPD/180` to match the HUD scale; the D-gear physics now eases
      `car.speed` toward it instead of the old gas/coast model. Steering is the
      remaining two-button row (◀ ▶). Number keys 0–5 also work (0=stop,
      1–5 = 20–100). (2) **Modeled cockpit was too dark.** The interior fill
      light was parented to the *procedural* interior group (`intr`), which is
      hidden in modeled-cockpit view — so the real Corolla cabin got no interior
      light and looked black. Added a dedicated `cabinFill` PointLight parented
      to the car group, toggled on only in the modeled cockpit (like the hands),
      lifting the dash/wheel/hands out of shadow. Verified headless: tapping 60
      engages D + highlights the button + eases speed up, tapping 0 stops the
      car; all 8 pass/fail branches and the speed-limit over/under/in-band checks
      still pass; cockpit screenshot now clearly shows the lit dashboard, Toyota
      wheel, both hands and the road (was black before); 0 page errors.
      **Gotcha:** the old `SIM.input.g`/`.b` (gas/brake pedals) are gone — any
      verification that pokes them is now a no-op; drive the car via
      `simSetSpeed(kmh)` / the `#simSpdNN` buttons instead.
- [x] **Driving-sim: throttle control + speed-limit situation.** Two owner asks.
      (1) **You now control the speed.** Selecting D no longer pins the car to
      the max — there's a **GAS pedal** (green ⛽, between brake and the
      right-steer button; also ArrowUp/W). Hold gas to accelerate, brake to
      slow, and off the gas the car **coasts down** (`SIM_COAST=430`), so the
      driver sets the speed. (2) **Speed-limit zones** woven into the sequence
      (now 10 situations, 2 of them speed zones): a red-circle limit sign (max
      **60**) opens a ~1700-unit measured zone. Go **over** the limit *or* crawl
      **below** the minimum (band 35–60 on the HUD's 0–180 scale) and you FAIL,
      each with its own reason ("over the limit" / "too slow — below the
      limit"); hold it in-band through the zone to pass. Verified headless:
      gas raises speed, release coasts down, brake slows; over/under both fail
      with the right Kurdish message, in-band passes; the four original task
      types still judge correctly at their new indices; 0 page errors; screenshot
      shows the "60" sign, the band banner, "Task 1/10", and the green gas pedal.
- [x] **Driving-sim → PRACTICAL DRIVING TEST (pass/fail), replacing the quiz-on-wheels.**
      The owner rejected both the random ambient cars ("remove the random cars
      on the street") and the multiple-choice card popping at each sign. What
      they wanted: the questions become *enforceable situations* — "if I don't
      stop at a stop sign I fail, like the real world." Chosen via AskUserQuestion:
      **only driving tasks** (no quiz card while driving; knowledge questions
      stay in the separate quiz modes) and **instant fail + retry**.
      Rebuilt the sim as a sequence of 8 enforceable situations down the main
      road, cycling four types, each with real roadside signage and pass/fail
      detection off the car's own position + speed:
      - **STOP sign** (red octagon + stop line): must reach ~0 speed in the box
        before the line, else FAIL "you did not stop".
      - **Pedestrian crossing** (blue sign + zebra + a person who walks across):
        must not enter the crossing while the pedestrian is on the road; they
        clear after ~4 s, then you may go.
      - **Give way** (inverted-triangle sign): a car crosses the junction ahead
        with priority; enter before it clears → FAIL "you failed to give way".
      - **Red light** (3-lamp signal + stop line): cross on red → FAIL; the light
        turns green once you've held a stop at the line for ~1 s, then go.
      Fail → a FAIL overlay naming what you did wrong **and the rule** (teachable),
      with **Try again** (resets you just before that situation). Pass → a brief
      "✓ passed" toast, advance to the next; the HUD reads **Task X / 8** and
      **✓ tasksPassed**. Finish → "passed N of 8" with Drive again / back. An
      instruction banner over the view names each upcoming situation. All copy is
      bilingual (inline `{en,ku}` via `L()`; the UI table is untouched). The old
      floating "?" sign, the ambient-traffic pool, and the in-sim quiz card are
      gone. Reused `simBuildTrafficCar`/`simBuildPerson` as actors. New module:
      `simInitTasks`/`simBuildTask`/`simUpdateTasks`/`simPassTask`/`simFailTask`/
      `simFinishTest`/`simRetryTask`/`simRestart` + sign-texture builders.
      Verified headless: 8 tasks in the right sequence, all four types build with
      0 page errors, and **all 8 pass/fail branches** judged correctly (each fail
      pauses + shows the ❌ overlay without advancing; each pass advances the task
      and increments the count). Screenshot confirms a clean road (no random
      cars), STOP sign + stop line ahead, Kurdish banner, "Task 1/8" HUD.
      **Gotcha:** headless rAF is heavily throttled here, so time-based "drive
      across the line" tests crawl (the car accelerates only a few simulated
      frames per real second). Verify pass/fail by pre-setting the gate flags and
      crossing at high speed (few frames needed), not by waiting for the car to
      accelerate in real time.
- [x] **Driving-sim: scripted traffic + per-question SCENARIOS (other cars).**
      **(SUPERSEDED by the practical-test rework above — the owner asked for the
      ambient cars removed and the quiz card replaced by enforceable pass/fail
      situations. Kept for history.)**
      The world now has other cars. (1) **Ambient traffic** — a pool of 8
      lightweight procedural cars (not the 3.4 MB Corolla clone — box body,
      glass cabin, 4 wheels, head/tail lights) cruise the main road both
      directions, wrapping around a moving window on the player so the road
      always looks alive at bounded cost. (2) **Per-question scenarios** —
      every question sign gets a themed "situation" chosen from the question's
      own English text by `simClassifyScenario` (6 templates: `lead` car that
      brakes, `oncoming` car sweeping past, `junction` car pulling out of a
      side road, `hazard` broken-down car with blinking amber lights,
      `pedestrian` crossing, `parked` row of cars). The situation is set up as
      you approach; reaching the sign starts its **climax** (the teachable
      moment — lead brakes hard, junction car pulls out, pedestrian steps into
      the road), and the question card opens once that has played out
      (~1.3 s), per the owner's "let it play out" choice. Full coverage: the
      classifier falls back via a stable text hash across 4 types so no
      question is left without a scenario, and variety is structural (sign 0
      classifies as `oncoming`, not a default `lead`). Wired into `simTick`
      (`simUpdateTraffic`) and torn down/rebuilt as the active question
      advances (`simBuildScenario`/`simDisposeScenario`, keyed to `S.i`).
      Verified headless: 8 ambient cars + scenario built, 0 page errors, and
      the **12-checkpoint loop still passes** — the play-out delay doesn't
      block the question from opening or completing.
- [x] **Driving-sim → OPEN WORLD free-roam, populated terrain, engine sound —
      ALL LIVE on both hosts.** Replaced the on-rails "car slides along a fixed
      road between questions" with real heading-based physics: steering rotates
      the car body (turn rate scales with speed so it can't pivot in place), so
      you can turn around and drive anywhere on a big open ground. One straight
      "main road" runs +z and carries all the question signs; questions trigger
      by proximity to the active sign (`SIM.signZ[S.i]`) instead of a fixed
      `car.z` checkpoint. `simTrack` now emits a straight (zero-curvature) path
      so scenery lines the road; the road is one static textured strip (no
      per-frame windowed rebuild) with `polygonOffset` so it doesn't z-fight the
      huge ground. **Terrain populated** beyond the road: a 620-instance random
      tree field (one draw call) + ~26 buildings scattered across the map
      (`simBuildOpenTrees`/`simBuildOpenBuildings`), both keeping a clear road
      corridor, so roaming has scenery + distant skylines everywhere.
      **Density pass:** added a `simBuildCityDistrict` (two grid "downtown"
      blocks you drive into, taller towers biased to the centre column),
      raised the open-building count 26→40, and a `simBuildGroundDetail` pass
      that scatters ~540 bushes + ~300 rocks as InstancedMesh fields (one draw
      call each) for cheap ground richness everywhere. Verified headless: 354
      meshes / 6 instanced fields, 0 real page errors, 12-checkpoint loop still
      clean, cockpit shows a city skyline out the windshield.
      - **Sign "?" hardened for mobile GPUs.** The question sign was a yellow
        board with the "?" as a SEPARATE blended-transparent overlay plane —
        which some mobile GPUs drop (z-sort/blend), so on the owner's iPhone it
        showed as blank yellow, "not a question sign". Rebuilt as ONE canvas
        texture (yellow diamond + dark border + upright "?") on a single plane
        using **alphaTest (hard cutout), not blended transparency**, which
        renders and depth-sorts reliably everywhere. Verified close-up render.
      - **iOS audio, third lever: HTMLMediaElement unlock.** Added
        `simUnlockMediaEl` — a near-silent looping `<audio>` (generated WAV
        blob) played inside the gesture. On iOS this switches Safari's audio
        session to "playback", after which the WebAudio engine tone routes
        through the MEDIA channel and is no longer killed by the ringer/silent
        switch (the silent WebAudio buffer only unlocks a suspended context; it
        does NOT change the channel). Best-effort, wrapped. **If it's STILL
        silent, it is the hardware silent switch** (orange toggle on the side of
        the iPhone) — flip it off — or the in-game 🔊 tapped to 🔇. No website
        can override the hardware switch beyond this media-session trick.
      **Steering fix:** `input.r` must map to a heading change that reads as
      screen-right in the chase cam — steer is `(l?1:0)-(r?1:0)`, verified
      visually (right turns right, and you can drive off onto the grass).
      Verified headless each step: 12-checkpoint sign-to-sign loop clean,
      cockpit + chase render, road visible.
      - **Engine sound, done in two passes (LIVE).** (1) The oscillator existed
        but was silent — `ctx.resume()` for iOS's suspended context, plus a
        sub-oscillator + lowpass and higher gains. (2) Owner still heard nothing
        on iPhone → added the **canonical iOS unlock: play a 1-sample silent
        buffer inside the gesture** (`simAudioKick`), on create and re-init, and
        wake audio from the first pointer/touch/key anywhere on the sim stage
        (not just specific buttons). **If still silent it's the device:** the
        iPhone physical silent switch mutes Safari WebAudio, or the in-game 🔊
        toggle is off. Next lever if needed: route through an HTMLMediaElement
        to bypass the ringer switch (heavier, not yet done).
      - **Gotchas logged:** a thin road only 2u above a 600k ground z-fights
        green over the asphalt at distance — fix with `polygonOffset`, not by
        nudging Y. On iOS, `resume()` alone does NOT unlock WebAudio; the silent
        buffer is what actually does.
- [x] **Driving-sim: steering wheel + gear-shifter animation, and real modeled
      buildings in the world.** Wheel: rotate the Corolla's `steering_wheel`
      node with the steering input (re-optimized the GLB with `--flatten false`
      so the node keeps its pivot). Gear: the model has no gear-stick node, so a
      small shifter on the console slides with P/N/D. World: pulled **"Low-poly
      City Buildings" by smooth998** (CC-BY) from Sketchfab (same token), 4.3 MB
      → **0.68 MB** (texture-only, hierarchy kept), network-loaded and scattered
      along the roadside (each placement clones a building mesh, recentres it,
      normalises height, drops it just past the shoulder) — replacing the flat
      boxes, with a fallback to the boxes if the fetch fails. **Gotcha logged:**
      the city model includes a flat ground slab with a non-English name; a
      name-based filter missed it and it scaled ~300,000× into a world-covering
      dark plane — fixed by filtering protos on geometry (skip near-flat meshes,
      `hy>0.18 && hy>foot*0.12`) not name. CC-BY credit extended to both models.
- [x] **Driving-sim: a REAL modeled car with a real interior (the big one).**
      The owner made a Sketchfab account and handed over an API token; searched
      Sketchfab's public API, shortlisted CC-BY (commercial-OK) car-with-interior
      models, and pulled **"2014 Toyota Corolla E180 (with interior)" by Armored
      Wave** (CC-BY) via the download API. 18.5 MB → **3.5 MB** with
      `gltf-transform` (texture resize to 512 + WebP, no Draco/no mesh-decimation
      so it loads with the GLTFLoader already inlined). Served as a **separate
      file** `web/models/corolla.glb` (single-file rule dropped for exactly this)
      and network-loaded with a **graceful fallback to the procedural truck** if
      the fetch 404s — verified the fallback renders and doesn't crash. Chase cam
      shows the modeled Corolla; **cockpit cam now sits inside the real modeled
      interior** — actual dashboard, gauges, Toyota wheel, centre console,
      mirrors, look-around out the windows. This is the realism leap the owner
      kept asking for. CC-BY **attribution** credit added under the sim canvas
      (links to the model + licence). Pages "self-contained" CI check refined to
      allow anchor links (it was blocking the attribution `href`s). Token was
      used only for the download and never stored; owner advised to regenerate.
- [x] **Driving-sim: image-based reflections** — `82fe45c`. Sky baked into a
      `PMREMGenerator` env map on `scene.environment`, so paint/glass/chrome/
      wheel-rim pick up real glossy reflections. A full sRGB+ACES tone-mapping
      pipeline was tried and reverted (washed the scene out — see the sim
      narrative's "Seventh pass" for the re-tune caveat). **Live on both hosts**
      (Cloudflare + Pages), Pages run #59 green, Cloudflare auto-deploy confirmed
      serving the commit.
- [x] **Driving-sim interior: real CC0 leather + dash detail** — `7551ea5`.
      ambientCG Leather034C (diamond-quilted, colour **and** normal map this
      time) on seats + door armrests; procedural dash vents/knobs added; dead
      `mat.stitch` removed. Searched Kenney/Quaternius/OpenGameArt/Sketchfab/
      CGTrader first — confirmed no free, redistributable, no-login car-interior
      *model* exists (the real blocker for matching native driving games).
- [x] **Driving-sim road/building textures + a real rendering bug fixed** —
      `b36b00f`. ambientCG Road007 asphalt+markings on the road, Facade001 on
      distant buildings. Found & fixed that the road/shoulder mesh had been
      invisible in chase/orbit view since the Three.js rewrite (quad winding was
      backwards → back-face culled every frame); fixed the triangle index order.
- [x] `.gitignore`: ignore stray top-level `node_modules/` from verification
      tooling — `536b404` (the web app has no deps / no build step).
- [x] **Driving-sim cockpit: real hands on the wheel + leather interior** —
      `0bf2be2`. The owner's repeated ask ("put my hand on the brake, the
      drive, the neutral grip… make it realistic") was unmet — the cockpit was
      a bare grey plastic torus with no driver. Now two modeled hands grip the
      rim at 9 and 3 (built from rounded forms: back-of-hand, palm heel, four
      fingers curling over the rim, a thumb, wrist + forearm receding to the
      lap), parented to the wheel group so they turn with the steering. Rim is
      photographic leather (the seats' CC0 map, tinted near-black, tiled
      tight); dished horn-pad hub; leather shift boot + chromed stalk + leather
      knob; dash picks up leather grain; a cabin fill light lifts it out of
      shadow. Verified headless in cockpit **and** chase views — 0 page errors,
      exterior model unaffected.
      - **How to verify the sim visually from this environment** (Chromium does
        not inherit the agent proxy — see the Cloudflare notes): `npm install
        --no-save playwright-core` (the browser binaries are pre-installed at
        `/opt/pw-browsers`, no download), serve `web/` from a throwaway
        `node:http` server on 127.0.0.1, launch with
        `executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'`
        and `--use-gl=angle --use-angle=swiftshader`. `SIM` is closure-scoped,
        not global — drive the sim through `window.startSim(n)` /
        `window.simSetGear` / canvas pointer drag, not by touching `SIM`.
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
      `183c3e0`. **https://gofile.io/d/oHtGSroZ** (paired bundle: 10 MP4s each beside
      its own `NN-name.txt` caption/tags/description, plus `00-START-HERE.txt`;
      built by `npm run bundle`, earlier flat upload `4pkWXKOg`),
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

**Driving-sim scenario coverage is DONE** — all 745 questions carry a scripted
scenario (45 templates, 12 judging kernels), shipped in `40c516e`. The design
notes that used to sit here are no longer decisions to make; the reasoning is
in the *Done* entry. `window.simScenAudit()` in the console re-checks coverage
at any time (currently 745 questions / 45 templates / 44 used / 0 missing).

**The source sweep is DONE.** All four PDFs are accounted for: the exam read
completely (50/50, all 431 questions machine-verified against the printed key),
the book read completely (234/234), and Part 1 + Part 2 proven page-for-page to
be book pp 22–229 and therefore already covered.

Nothing in the question bank is currently known to be wrong or missing.

**Driving-sim side-thread — the model blocker is RESOLVED and the sim is a real
feature now.** The old note here said the next step was the owner supplying a
car+interior `.glb`. They did (CC-BY Corolla, Sketchfab), the load pipeline was
built around it, and the sim has since become a **pass/fail practical driving
test**: 745 scripted scenarios, enforceable rules, number-button speed control,
P·R·N·D with reverse, a free-look wheel, and a loading indicator. See *Done*.

**It is still a side-thread, and that is the point to keep in view.** None of it
moves the plan below, which is blocked on two things only the owner can do —
posting the clips and buying the domain. Sim polish is not a substitute for
either. Remaining known sim gaps, in the order worth doing them, if asked:
1. ~~No progress save~~ and ~~no way to skip~~ — **both done**, see *Done* below.
2. **The sim does not teach.** Failing a task shows one line of rule text, while
   the actual exam question behind it (with its explanation and artwork) sits
   unused in the bank. Linking the two is the highest-value sim work left.
3. A weak-topic report at the end (which situations you fail most).

**Both owner checks came back CLEAR (2026-08-26):** the engine sound works on
their iPhone and the car model loads there. Treat the iOS audio and the .glb
fetch path as verified on real hardware, not just headlessly.
**Still unverified on a real phone: frame rate.** Shadows and the instanced
scenery landed after that check, and a software renderer cannot answer it.

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
- [x] **Cloudflare Worker is LIVE and browser-verified 2026-08-19.**
      Worker `ai-driving-theory`, config at `wrangler.jsonc` (`0661a62`).
      Serves 1,052,116 bytes — byte-identical to `web/index.html` — plus
      `/ad.html`. Executed the *deployed* bytes in Chromium at 390px:
      viewport meta present, **10 home tiles**, 15 interactive elements,
      `startExam` defined and launching, **0 page errors**, no horizontal
      overflow.

      **Final URL: https://ai-driving-theory.tareeq.workers.dev/**

      **RESOLVED — the first URL contained the owner's phone number.**
      Cloudflare derived the account subdomain automatically as
      `hama07705435002`, i.e. `0770 543 500x` in Iraqi mobile format, so the
      address read `ai-driving-theory.hama07705435002.workers.dev`. That was
      one step from a TikTok bio, which would have published the owner's
      personal number to their own city — and P6 keys unlock codes to buyers'
      phone numbers, so it is not a throwaway. Changed to `tareeq` at
      **Workers &amp; Pages → "Change" next to "Your subdomain"** (changeable,
      not one-time; the old `*.workers.dev` URL died immediately, confirmed by
      probe). **Nobody picks this subdomain, which is exactly why it gets
      missed — check it on any new Cloudflare account before publishing.**

      **Browser verification cannot reach the live URL from this
      environment.** Chromium does not inherit the agent proxy and dies with
      `ERR_CONNECTION_RESET`; do not fix that by disabling TLS. Working
      recipe: `curl` the deployed bytes to a file, serve that file from a
      throwaway `node:http` server on 127.0.0.1, and point playwright-core at
      localhost. That still verifies the real deployed bytes execute — curl
      already proves the network path — and it is how the numbers above were
      obtained.

      Three traps hit in the first twenty minutes, all recorded because none
      announced itself:

      1. **"Connect to Git" for a static site creates a *Worker*, not a Pages
         static build.** The dashboard set Deploy command `npx wrangler deploy`
         and Root directory `/`. There is **no build-output-directory field**
         on that path, so nothing pointed at `web/`.
      2. **With no wrangler config in the repo, that build goes green and
         serves nothing.** It reported success in 38s having deployed a
         placeholder. Identical in shape to the Pages runs that were green for
         months while the site was never deployed — *a green build is not a
         working site*, now proven on two different hosts. `wrangler.jsonc`
         fixes it: assets-only Worker, `assets.directory = ./web`, no `main`.
         **`name` must match the Worker in the dashboard** or wrangler deploys
         to a differently-named Worker while you test a stale URL.
      3. **New Workers ship with the `workers.dev` subdomain DISABLED.** The
         Overview shows `No URLs enabled` and nothing resolves — which looks
         exactly like a broken deploy. Enable at ··· → Settings → Domains &
         Routes. Not a mistake on the owner's side; it is the current default.

      **Confirmed free, from Cloudflare's own dashboard:** *"Metrics is
      unavailable for Workers with only static assets. Requests for this kind
      of Worker are served at no charge."* That is the cost analysis above
      verified in situ — an assets-only Worker never invokes a script, so
      nothing counts against the 100,000/day cap.

      **Naming decision still open.** The URL will be
      `ai-driving-theory.<account>.workers.dev` — not Tareeq, and tied to a
      repo name this project has already changed once. Free to fix now,
      expensive once it is in a bio. Ask before publishing anything.

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

**Superseded 2026-08-26 — the owner has already posted.** Ten voiced Kurdish
clips went out over roughly two weeks, averaging ~138 views each (~1,400
total, read off the owner's profile grid). The plan below was written before
any of that; what it got wrong is recorded under each item rather than
deleted, because the wrong parts are the useful parts.

**The single finding that explains the result: the bio link is dead.** See the
blocker at the top of this file. ~1,400 views were sent to a Cloudflare error
string. Do not spend another session tuning hooks, captions or watch time
until that one line of text is corrected — the funnel has never actually been
tested.

- [ ] **The account still has no clickable link, and switching to Business
      did not work.** The reasoning below still holds; the execution did not.
      Recorded 2026-08-26 from the owner's own screenshots.
      - **There is no Website field in Edit profile.** So the URL in the bio
        is plain text. A viewer has to *read it off the screen and type it*:
        36 characters, a hyphen, a subdomain and a `.dev` TLD most people will
        not guess. Even spelled correctly that converts terribly.
      - **There is no account-type toggle in Settings either** — the
        "switch to Business" control simply is not in the owner's app.
      - **What the owner found instead was business *verification*, which is
        a different thing** and was rejected ("Business registration — Not
        approved"). It wants real company registration documents. Do not
        resubmit an invented registration number; a knowingly false submission
        risks the account, which is the one asset with any audience on it.
      - **Therefore the short domain is not a Phase 3 nicety — it is the
        fix, and it is urgent.** The username is already `tareeqkrd`, so
        something like `tareeq.krd` matches the handle and the logo and is
        typeable in one go from memory. That is what makes a bio with no
        clickable field survivable.
      - The original reasoning, still correct: a personal account has no
        clickable bio link until 1,000 followers; Business gets one at zero.
        The usual objection (Business loses the trending-sound library) is
        void here because the voice is baked in. The only real loss is
        Creator Rewards, irrelevant when the product is the app.
      - Whatever route ends up working, the bio must read exactly
        **ai-driving-theory.tareeq.workers.dev** until a domain exists.

- [ ] **Re-render the end cards to put the URL on screen.** Every clip closes
      on *لینک لە بایۆ* — "link in bio" — which asks the viewer to do work in
      a bio that has no clickable field. Once a short domain exists, the CTA
      line in `video/src/data.ts` (`CTA.ku.b`) should show the domain itself
      instead. Twenty clips would need re-rendering, which is cheap: no new
      TTS characters are spent, because the CTA line is baked into `sayB`
      audio that does not change.

- [ ] **Scheduling: Buffer free tier is enough, verified 2026-08-26 against
      buffer.com/pricing.** 3 channels, **10 scheduled posts per channel**
      ("refill anytime"), 1 user, 30-day analytics history. At one post a day
      that is ten days of queue, which is more than the 2-3-then-stop cadence
      below wants anyway. This matters because the owner deliberately keeps no
      TikTok app on their phone (ADHD — see the constraint below), so any plan
      that ends "finish it in the app" is disqualified.

- [ ] Post to TikTok and watch what happens. This is the cheap experiment and
      the whole reason the free tier exists. Suggested order, strongest hook
      first: mirrors, alley, helmet, burn, green, then the three sign rounds.

      **Cadence, decided 2026-08-19: post 2–3, then STOP for 48 hours and read
      the result before posting the rest.** Then one per day, same time,
      evening in Kurdistan (roughly 19:00–22:00, UTC+3).

      Not all ten at once, for three reasons:
      1. **It confounds the experiment.** Each video gets tested on ~100–500
         people first (see *Distribution*); ten landing together compete for
         the same pool, so a weak result cannot be distinguished from
         crowding.
      2. **The ten clips are a finite asset** — re-rendering costs the TTS
         pipeline and real effort. Spending all ten before learning which hook
         lands throws away the only information the batch can buy.
      3. **Burst-then-silence is a worse pattern than a steady trickle** for a
         new account, and ten videos on day one from an account with no
         history reads as spam.

      **The stop-and-read step is the one people skip.** The video files are
      fixed, but captions and hashtags are not, and they carry much of the
      weight — so a winning hook should change how the remaining clips are
      captioned. **Do not pre-schedule more than 2–3 ahead** even though the
      scheduler allows 10 days; scheduling the whole batch hands away the
      ability to react. Lead with the strongest hooks (night speed,
      unlicensed penalty, ambulance number) because a new account's first
      posts calibrate who TikTok shows it to.
- [x] ~~Add a trending sound in-app to each one.~~ **Void since the voiced
      batch.** The clips carry a Kurdish voiceover now, so there is no silence
      to fill and nothing to gain from a trending sound — and baking the voice
      in is exactly what makes scheduled/API posting possible at all.
- [ ] Use the comments to settle the KRG fee question (see *open questions*) —
      asking what people actually paid gets a real figure and engagement in the
      same move.
- [x] ~~Optional: record the voiceovers.~~ Done for batch one via
      kurdishtts.com. **Batch two is written but unvoiced** — see the Done
      entry at the top: `KURDISH_TTS_KEY` was not available in that session.

**~~Do not post before Phase 0 is done.~~** Stale on both halves: Pages *and*
the Cloudflare Worker are both live, and the owner has already posted. What
survives is the warning underneath it, which turned out to be exactly right in
a way nobody checked: **every clip ends on "link in bio", so the bio is part
of the product.** A typo there costs the entire funnel and produces no error
anyone will see — the videos look fine, the views arrive, and the traffic
simply never lands.

**Still needed from the owner before the next posting decision** (asked
2026-08-26, not yet answered): TikTok Studio watch-time and retention curves,
traffic-source breakdown, whether the posted clips play with audio on their
phone, whether captions and hashtags went out in Kurdish, and whether there
are any comments. Without retention data, "low views" cannot be told apart
from "good views, broken destination" — though the dead bio URL now explains
the second half on its own.

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

**No sign-in is needed, for either payment route — this is a design choice,
not a gap.** Asked 2026-08-19. The app has no accounts and does not need any:
entitlement keys to the buyer's normalised phone number, so there are no
passwords, no account recovery, no PII on a server, and the offline property
survives. **The code is deterministic** — the same phone number always yields
the same code — so a buyer who clears their browser or changes phone is
re-issued their exact code in seconds, or simply re-enters the one they saved.
Two limits to state plainly when writing the strings: entitlement lives in
localStorage and is therefore per-browser, and the honour-system caveat above.
Even the P7 FIB integration needs no login; entitlement keys to the phone
number server-side. **Accounts only become worth building for cross-device
sync or to genuinely stop code sharing** — neither is a problem worth solving
before there is revenue.

**P7 — the FIB API is documented and buildable; the blocker is corporate, not
technical.** Researched 2026-08-19. This resolves the FIB half of the open
question below.

**UPDATE 2026-08-19: P1's architectural blocker is GONE.** This file said
"Phase 3 forces a host change because Pages cannot run code." That is no
longer true — the app is live on a Cloudflare Worker, which runs code, so the
FIB callback and entitlement check land on the **same host with no migration
and no purchase**. `ai-driving-theory.tareeq.workers.dev` is already a public
HTTPS callback URL, which is all FIB asks for; **a custom domain was never a
requirement and does not help.** The only remaining blocker is the Iraqi
company below.

**Adding the backend does not make the site billable.** The Worker is
currently assets-only, so nothing counts against any quota. Adding API routes
means only *those* routes invoke the script and count toward 100,000/day;
static asset requests stay free and unlimited. Payment callbacks are a few
requests per sale — the cap is around five orders of magnitude away.

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
1080×1920, 30fps, **20 voiced Kurdish clips in two batches, 15-24s**. Order is
`npm run voice` → `npm run check` → `npm run render:all` → `npm run upload`.
Both `voice` and `render:all` take a subset (`--only ids` / `--ids ids`), which
is what you want after adding a hook.
The earlier silent 8-hooks-×-2-languages batch is at `292a68e` if wanted.
`video/README.md` carries the full mechanics; read it before editing timing.

**The hooks are the questions where the answer most people give is the
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

**Re-verified 2026-08-26 against TikTok's own docs**, and the analysis above
holds exactly — including the error code: Direct Post accepts
`PUBLIC_TO_EVERYONE`, `MUTUAL_FOLLOW_FRIENDS`, `FOLLOWER_OF_CREATOR` and
`SELF_ONLY`, and "all content posted by unaudited clients will be restricted
to private viewing mode". One correction: the **5–10 business days** figure
above is optimistic and was never sourced. TikTok's documentation states **no
timeline at all**; practitioner write-ups report **2–4 weeks with multiple
rounds of feedback**, rejectable on any UX-guideline detail. Plan for weeks.

**T1.5 — a third-party scheduler with an ALREADY-AUDITED client — is the tier
this table missed, and it is the real automation answer.** Buffer, Metricool,
Hootsuite, Later and Postiz publish to TikTok through the same Content Posting
API, but *they* passed the audit, so you inherit it: true auto-publish, no
audit, no OAuth server, no phone. Buffer's free plan covers this but requires
a **Business** account — which Phase 2 already says to switch to for the bio
link, so it costs nothing extra. Metricool's free tier is 50 posts/month and
supports personal accounts too. Same trending-sound loss as any API route,
which is already moot here. **If automation is wanted before Phase 3, this is
it — not a self-built client.**

**T1 is the answer for a batch of ten**, and it solves the spacing problem
too — ten clips should not go out at once, and the scheduler spreads them
15 min to 10 days ahead in one sitting. **T3 only becomes worth building at a
standing cadence**, and it gets cheaper then because Cloudflare Pages
Functions will already be serving as the stable HTTPS redirect URI the OAuth
flow needs — the same host as the FIB callback.

**T4 — a hosted third-party scheduler, which beats all three.** Asked
2026-08-19. The distinction that matters:

- **Hosted SaaS (Buffer, Publer, Metricool) posts through *their* audited
  TikTok client.** You connect by OAuth and publish publicly on day one — no
  audit, no server, no OAuth code. This is the shortcut.
- **Self-hosted open source (Postiz, Mixpost) does NOT inherit anyone's
  audit.** Both require registering *your own* developer app per platform, so
  you land back in T3's audit plus a $5–10/mo VPS. **Strictly worse than doing
  nothing** — and worth recording because "open source and self-hosted" reads
  like the obvious free answer and is a trap here.

**The real gain is cross-posting, not TikTok scheduling.** TikTok's native
scheduler is already free and unlimited, where Buffer's free tier caps at 10
queued per channel. But Buffer free connects **3 channels — TikTok, YouTube
Shorts and Instagram Reels** — and the clips are already 1080×1920 with the
Kurdish voice baked in, so all three take them unmodified. This file already
notes YouTube and Instagram have weaker in-app sound libraries; baked-in audio
is therefore an *advantage* there rather than the loss it is on TikTok. Same
ten clips, three platforms, one setup. Buffer free needs no card and refills
the 10 slots per channel as posts publish.

**Two setup catches, both of which reintroduce the phone-app constraint if
missed:**
- **TikTok must be a Business profile** for Buffer to auto-publish. Free to
  switch; the Commercial-Sounds-only restriction is irrelevant with baked-in
  audio.
- **Instagram personal profiles get reminder-based publishing only** — a
  notification you must finish *in the Instagram app*, which is exactly the
  disqualifier that killed TikTok's draft flow. Needs a Business or Creator
  profile for true automatic posting, or spend the third channel elsewhere.

**Upload-Post (API-first wrapper) — checked 2026-08-19, priced out for
TikTok.** Read from their own `llms-full.txt`, not a review site:

- **The free plan explicitly excludes TikTok.** Verbatim: *"Free plan: 10
  uploads/month; platforms without TikTok (Instagram, LinkedIn, YouTube,
  Facebook, X, Threads, Pinterest, Reddit, Bluesky)."* Cheapest tier with
  TikTok is **Basic, $24/mo or $16/mo billed annually = $192/yr** — sixteen
  times the domain the owner has just declined, for the one platform that
  matters most.
- **Two admissions in their own docs, both against their commercial
  interest**, and worth more than the usual creator folklore for that reason:
  1. Their *recommended* TikTok mode is **Draft** (`post_mode=MEDIA_UPLOAD`),
     which *"lands in the user's TikTok inbox/drafts, and the caption and
     settings are added in the app before publishing"* — the precise flow the
     no-phone-app constraint rules out.
  2. *"Publishing natively from inside the TikTok app tends to earn more
     organic reach than posting directly via the API."* **This cuts against
     the entire automation direction** for a new account, where reach is the
     only thing that matters. Treat it as one vendor's claim, but note who is
     making it.

**Where it does earn a place: everything except TikTok.** The free tier (10
uploads/mo, 2 profiles, no card) covers YouTube, Instagram, Reddit, Bluesky,
X, Threads, Pinterest, LinkedIn and Facebook — and the batch is exactly 10.
It also ships an **MCP server and a Claude Code plugin**, so a session can do
this posting directly rather than handing the owner a checklist.

**Make.com and Zapier cannot post to TikTok. Checked 2026-08-19 — do not
re-explore this.** Zapier's TikTok integration covers lead generation and ads
conversion tracking only; its own community confirms publishing is still
unsupported in 2026 and its recommended workaround is to route through Buffer.
Make has a TikTok *trigger* (fires on upload) but **no posting action** — a
long-standing open request on its own Canny board — and its workaround is to
route through Upload-Post or TokPortal. Either one is therefore a **paid
middleman in front of tools already evaluated above**: two subscriptions to do
what Buffer's free tier does alone.

**The pattern, recorded so the next session stops re-deriving it.** Four
routes have now been checked — TikTok's API direct (T1–T3), hosted schedulers
(T4), Upload-Post, and Make/Zapier. Every one converges on the same answer,
because the arithmetic does not move: **ten videos × ~4 minutes is ~40 minutes
once**, while any automation costs hours plus a subscription, still needs an
audited client, and posts with less reach by the vendors' own admission. The
arithmetic only flips at a standing weekly cadence.

**And the owner's real constraint is not clicking — it is the TikTok app on
the phone.** Automation was never what protected against that; **the browser
is.** tiktok.com on desktop uploads, captions, schedules and reports analytics
with the app nowhere near the phone. That constraint is already solved, so
automation would only be saving clicks. Say this plainly rather than
re-costing the tools a fifth time.

**So the standing plan is the hybrid: post TikTok by hand on the web for the
reach, fan the same ten clips out everywhere else with Upload-Post free.**
Unresolved: whether one call to N platforms bills as 1 upload or N — their
docs do not say, and it decides whether 10 clips fit the free tier across
multiple platforms or only one.

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

**The bio is part of the product, and it is the only part with no test.**
Ten clips were rendered, safe-zone-checked pixel by pixel, bitrate-verified
and duration-verified — and then pointed at a URL with a typo in it that
nobody ever opened. `driving-theory.tareeq.workers.dev` instead of
`ai-driving-theory.tareeq.workers.dev`; a hard 404, not a redirect. Every
automated check in this repo passed while the funnel was completely broken,
because **the failure lives in a text field on someone's phone, outside
everything the repo can see.** The general shape: when a pipeline's last hop
is a human retyping a string into a third-party UI, that hop is where the
whole thing breaks, and it is the one hop with no CI. Read the destination
back and `curl` it — every time it changes, and before the first post, not
after fourteen of them.

Two things follow. **Never leave the published link long or exotic** — this
one is 36 characters with a hyphen, a subdomain and a `.dev` TLD, so a typo
was close to inevitable. And **a "link in bio" CTA silently assumes there is
a clickable bio field**; on a personal TikTok account there is not one, which
turns the same string into something a viewer must retype from memory.


**A "save on exit" path must know whether the session was ever picked up.**
The sim's resume prompt is shown while `taskIdx` is still 0, because the saved
drive has not been restored yet. So tapping ✕ instead of choosing ran
`simSaveProgress()`, which treats `taskIdx<=0` as "nothing to save" and
deletes — **destroying the exact save it was offering**. Guarded with
`SIM.resumePending`. The general shape: any persist-on-exit hook that also
prunes empty state will eat a not-yet-restored session unless it can tell
"fresh and empty" from "loaded but not yet resumed".

**The sim's overlay card is ~218px tall on a 390px phone, and its fail card is
~377px.** Measured, not guessed (`scrollHeight` vs `clientHeight`). This means
**buttons at the bottom of that card were already below the fold** before
anything was added to it — a player had to scroll an overlay they had no
reason to think was scrollable just to press *Try again*. Fixed by making the
action row `position:sticky` (`.simcardacts`). Before adding anything to that
card, check what it does to the visible region; the stage is only `w*0.72`
tall, so the card cannot simply grow.

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

`npm run check` in `video/` renders **two** frames of every composition — the
busiest one (answer + reason + CTA), and half a second into the countdown —
and asserts no non-background pixel lands in any of the four margins. The
countdown frame exists because the timer is absolutely positioned; checking
only the busy frame would never render it. **Padding is
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

---

## Handoff bundle

`npm run bundle` in `video/` splits `POSTING.md` into one `.txt` per clip
beside its `.mp4`, numbered `01`–`10` so a flat gofile listing carries the
running order on its own. `npm run upload:bundle` posts the folder and prints
one link. **`POSTING.md` stays the source of truth** — the bundle is generated
from it, so edit the markdown and rebuild, never the other way round.

Two things this cost, both worth not repeating:

- **JavaScript has no `\z`.** The block regex terminated each clip by looking
  ahead to the next `## `, so the final clip never closed and the split
  returned **9 of 10 silently**. Caught only because the script asserts the
  count. A trailing `"\n## \n"` sentinel fixes it. Assert the count on any
  parse whose input is supposed to have a known length.
- **Paths in a nested `.gitignore` are relative to that file's directory.**
  Writing `video/bundle/` inside `video/.gitignore` means
  `video/video/bundle/`, so 21 files and 35 MB of MP4 were committed and
  pushed — the exact duplication `out/` is ignored to prevent. The entry must
  be `bundle/`. Fixed by amend plus `--force-with-lease` while the commit was
  still the tip; verify with `git check-ignore -v <path>` rather than trusting
  that the line looks right.

---

## Driving simulation

> **READ THIS BOX BEFORE THE REST OF THE SECTION.** Everything below the box is
> a **chronological build log**, kept for its bug post-mortems and for the
> reasoning behind choices that were later reversed. **It is not a description
> of the current sim, and several passes describe designs that no longer
> exist** — the 2D scanline cockpit, the hand-written WebGL renderer, and above
> all the original "quiz on wheels" (drive to a checkpoint, answer a question
> card, continue). All three were replaced. Do not implement against them.
>
> **What the sim actually is today** — a **pass/fail practical driving test**,
> rendered with inlined Three.js r128:
> - Each of the 50 questions in a set becomes a **scripted road situation** you
>   must physically drive correctly (45 templates, 12 judging kernels, 745/745
>   questions covered). **No question cards appear while driving** — that was
>   removed on the owner's explicit instruction.
> - Break the rule and you **fail instantly**: the drive pauses and the card
>   shows what you did wrong plus the correct answer. Retry, or **skip** it
>   (offered from the second failure of the same situation; scores as wrong).
> - **Progress is saved** after every verdict; reopening a part-finished set
>   offers *Continue* / *Start over*, and the set list shows a resume badge.
> - Controls: **number buttons set the speed** (0·20·40·60·80·100 km/h, cruise
>   style — there is no gas pedal), **P·R·N·D** shifter with a real reverse
>   (inverted steering, ~20 km/h cap), ◀ ▶ steering, a **free-look wheel** plus
>   Left/Ahead/Behind/Right preset buttons, and a cockpit/chase camera toggle.
> - The car is a fetched `.glb` (CC-BY Corolla) with a **loading panel** and a
>   procedural fallback car if it fails.
>
> The authoritative record of current behaviour is the ***Done*** section at the
> top of this file, newest first. When this box and the log below disagree, the
> box and *Done* win.

Built this session, in `web/index.html` — a new "Driving Simulation" screen,
placed on Home right next to Mock Exam (the "final test" framing the owner
asked for). Same single-file, no-build-step, no-network app; no new file, no
dependency.

**Asked for pygame; built browser-native JS/canvas instead, with the owner's
sign-off.** pygame is a desktop-only library — it cannot run in a phone
browser without a WASM compile step (pygbag), and this app's whole traffic
plan is mobile TikTok visitors. Given the choice
(`AskUserQuestion`), the owner picked a pseudo-3D first-person road rendered
on `<canvas>`, embedded directly in `index.html` like every other screen. No
build pipeline was added — this stays true to `web/README.md`'s constraints.

**Scope, also chosen by the owner:** build the engine + framework for every
set now, real content later. Concretely:

- One route per set, reusing the exact same `QUESTIONS.slice(n*SET_SIZE,...)`
  partition `renderSets()` already uses — currently 15 sets (`Math.ceil(745/50)`),
  automatically whatever that number is if the bank grows.
- One checkpoint per question, spaced along a procedurally generated road
  (deterministic per set — seeded on the set index, so a set's route is
  stable across replays). Reaching a checkpoint freezes the car and shows
  that question as an overlay card (reusing the real question/options/
  explanation, and the sign/scene SVG when the question has one); answering
  resumes the drive. A generic warning-triangle sprite grows on the roadside
  as each checkpoint approaches — **not** bespoke hazard art per question.
  That's the deliberate content cut: 750 unique hand-built scenarios was
  explicitly ruled out of scope for this pass.
- Controls: on-screen ◀ ▶ steer buttons + a brake button (mobile-first, no
  gas pedal — the car auto-cruises), mirrored on keyboard (arrows/WASD/Space)
  for desktop testing.
- **Finishing a route feeds the existing `finish()` → `renderResults()`
  pipeline** — the same one the mock exam and practice sets use. This was a
  deliberate design choice, not a shortcut: sim answers update SRS,
  mistakes, category mastery and achievements exactly like any other
  question-answering flow, and the pass/fail score screen, 80% line and
  review-by-question list all come for free. New store key `st.simBest[n]`
  holds the best score per set, separate from `st.best`/`st.exams` (which
  stay scoped to the real 20-question mock exam format and are not touched
  by sim runs).

**Verified live, not just read.** Syntax-checked with `node -e "new
Function(...)"`, then actually driven in headless Chromium (Playwright,
pre-installed in this environment) against a local static server: navigated
Home → sim set list → in-game, steered, watched a checkpoint trigger and
answered it, then scripted a full 50-question run to completion and
confirmed the results screen, category breakdown, a real achievement firing,
and `simBest` persisting to `localStorage` — zero console errors throughout.
Screenshots were read back to check the canvas actually renders a road, not
just that no exception was thrown.

**Two real bugs the live check caught, both fixed:**
- **RTL (Kurdish, the default) mirrored the physical steer buttons** — the
  DOM order was left-then-right, so under `dir="rtl"` the grid visually
  reversed and the button showing "▶" ended up on the physical left,
  meaning the left button steered right. Fixed with `direction:ltr` on
  `.simctrls` — steering is spatial, not text, and must not follow reading
  direction.
- **The HUD's "1 / 50" reversed to "50 / 1"** — a bare `/` between two
  number runs is bidi-neutral, so inside the app's RTL default the whole
  expression got reordered. Same fix, `direction:ltr` on `.simhud .pill`.
  (The rest of the app dodges this by using words between numbers — "١ لە
  ٥٠" — which anchor the direction; the HUD needed the CSS version since a
  numeric-only game readout reads oddly with words inserted.)

**Not done, deliberately or by scope cut — read before touching this next:**
- **No real device/touch testing.** Verified with Playwright's mouse-emulated
  pointer events standing in for touch; never opened on an actual phone.
  Button hit-targets, canvas sizing on real viewport quirks (notches, browser
  chrome resizing on scroll) and actual touch-and-drag behavior are unchecked.
- **Kurdish strings for this feature (`simB`, `simD`, `simPlayHint`,
  `simLeft/Right/Brake/Drive`, `simExitConfirm`) are a first-pass translation,
  not reviewed by a native speaker** — same caveat already on record for the
  TTS voice in *Ad creative*. Don't assume they're natural phrasing.
- **Speed/steering/curve constants are untuned guesses**, not playtested for
  feel (`SIM_MAXSPD`, `SIM_STEER`, curve magnitude, checkpoint spacing —
  all in the new code block in `index.html`, right after `renderSigns()`).
  They produce a road that visibly curves and responds to input, verified by
  screenshot, but "does it feel good to drive" is a human judgement call.
- **No AI traffic, no collisions, no hills** — flat single road, no other
  vehicles. Curves are cosmetic plus a light steering requirement; there is
  no penalty for a wrong steer beyond mild off-road friction.
- **Not gated behind any paywall** — reachable free from Home, like every
  other screen today (P6's paywall was reverted and never shipped; see
  *Product plan*). Whether this simulation should sit inside or outside that
  future gate is undecided and wasn't asked.

**Cockpit pass, same session, on request** ("I need to see what's inside the
car", "SFX and sounds"). Added on top of the above, same file, still no new
dependency:

- **A real dashboard band** (`simDrawDashboard()`, bottom ~24% of the
  canvas): a live speedometer with a needle driven by actual `car.speed`, and
  a lit P/N/D indicator mirroring the shifter state.
- **A functional P/N/D shifter**, not decorative. The route starts in **P**
  (parked) — the car cannot move until the player taps **D**; tapping **P**
  sheds speed fast (parked), **N** coasts down gently (freewheel friction,
  no engine push), **D** drives normally. Steering still turns the wheel in
  any gear (realistic — turning the wheel while stationary doesn't move a
  real car either), but only **D** ever advances distance.
- **Rear-view + two wing mirrors**, not static art — `simRenderMirror()`
  clips a small rounded rect and renders the *same* road/curve data as the
  main view, just walked backward (`dir=-1`) from the car's current
  position, and horizontally flipped (a reflection, not just "facing
  backward"). They hide automatically while look-back is held, since
  showing forward-in-a-mirror while the main view faces backward would be
  contradictory.
- **A "Look back" button** (hold — touch button, or keyboard `L`) swaps the
  *entire* main view to face backward at full size — distinct from the
  mirrors: this is turning your head, not glancing at glass. Implemented by
  generalizing the old single-purpose forward-road-drawing code into one
  `simRenderRoad(ctx,x,y,w,h,dir,flip,step)` function used for all four
  views (main forward, main look-back, and the three mirrors) — one tested
  function instead of four near-duplicates.
- **Synthesized SFX via Web Audio** — no audio files, no network, consistent
  with the file's constraints. An engine oscillator whose pitch/volume track
  `car.speed` in real time (idles low when not in D); a filtered white-noise
  burst on hard braking; a click on every gear change; a rising two-note
  chime on a correct answer and a low buzz on a wrong one; a short tone when
  a checkpoint first appears. A speaker icon in the HUD mutes/unmutes
  (persisted to `localStorage`, key `tareeq_sim_mute`). The `AudioContext` is
  created lazily on the first gear tap specifically because that is a
  guaranteed user gesture — browsers refuse to play audio before one, and
  gear-tap is also the thematically right moment ("starting the engine").
  Audio is torn down in `simStop()` (oscillator stopped, context closed) so
  leaving the screen doesn't leave a hum running in the background.

**Verified the same way as the base build** — live in headless Chromium, not
just read: parked in P (steering still turns the wheel, distance does not
advance), shifted to D (speed and distance ramp, dashboard needle moves,
D lights up), held look-back (main view swaps to a visibly different
backward-tinted scene, mirrors correctly disappear), toggled mute (icon
flips, `localStorage` updates). Zero console errors across all of it.
One real false alarm during this pass worth recording: two screenshots taken
moments apart looked identical to the eye at a glance and were nearly
mistaken for a stuck-input bug; querying `#simWheel`'s actual `style.transform`
directly (a DOM property, not a closure internal) proved the wheel *had*
turned ~32°. When two renders look suspiciously alike, check a concrete DOM/
state value before concluding something is broken — don't trust a quick
visual comparison of near-identical small screenshots.

**Same open items as before, plus:** the dashboard/mirror/SFX layer adds
more untuned-by-ear surface (engine pitch curve, brake-noise loudness,
speedometer's arbitrary 0-180 scale) — still nobody has driven this on an
actual phone with the sound on.

**Replaced with a real 3D engine, same session, on request.** The owner
rejected the 2D-canvas cockpit above outright ("I don't like this") and
asked for an actual 3D game — first-person, look around, see the car from
outside, "like San Andreas." Asked to clarify scope
(`AskUserQuestion`) since a literal GTA-style open-world game is not
buildable in a single self-contained HTML file: owner picked **hand-written
WebGL, no libraries** (not Three.js — keeps the file light for the TikTok
mobile funnel) and **an orbit/chase camera to see the car from outside
while driving**, not a walk-around-on-foot mode.

**What's there now:** the entire 2D scanline renderer is gone, replaced by
a real WebGL scene — matrix math, shaders, and every mesh (car body,
interior, steering wheel, mirrors, road) hand-written from scratch, no
Three.js, no external assets. The procedural curve data from the 2D build
(`simTrack`) is reused unchanged, just consumed differently: `simTrackPose()`
Euler-integrates it into an actual XZ path with heading, instead of a
per-pixel screen offset. Two camera modes, switchable mid-drive:
- **Cockpit** — first-person from the driver's seat. Drag anywhere on the
  canvas to freely look around (continuous, not the old hold-to-glance
  toggle) — out the side windows, at the dashboard, wherever. A real
  steering wheel rotates with input, a gear lever eases toward P/N/D, and
  three mirrors (rear-view + two wing) are textured live each frame from a
  second camera facing back down the road via a WebGL framebuffer —
  genuine reflections, not painted-on art.
- **Chase** — an orbit camera around the moving car, drag to swing freely
  around it, satisfying "see the car from outside" without the much larger
  scope of an on-foot mode.

Steer/brake/gear buttons, checkpoint logic, question overlay, scoring,
SRS/achievements integration, and the synthesized SFX are **all unchanged**
— only the rendering layer was replaced, and it turned out to be a clean
seam: `simTick()`'s physics still just outputs `car.z/car.x/speed`, and the
3D layer consumes those exactly like the 2D one did.

**Two real bugs the live-in-browser check caught, both fixed, worth
remembering for the next 3D pass:**
- **The steering wheel was built from 14 separate small cubes arranged in a
  ring, gapped apart with nothing connecting them.** Looked fine as a
  mental model; up close (the driver's eye is only ~85 units from a
  42-radius ring) it rendered as a cluster of scattered floating boxes, not
  a wheel — screenshotted, initially misread as a matrix/camera bug, and
  only correctly diagnosed by toggling pieces off one at a time via a
  temporary debug flag until the culprit was isolated. Fixed by rebuilding
  it as a flat annulus (a ring of connected quads between two radii) —
  continuous geometry reads as a shape; gapped discrete pieces don't, even
  when individually positioned correctly. **Lesson: don't assume "small
  boxes arranged in a circle" will read as a ring up close — verify.**
- **The three mirrors were positioned outside the camera's own field of
  view** — simple trig error: the rear-view mirror sat at ~40° of
  elevation and the wing mirrors at ~70° off-axis, both well past the
  camera's ~30°/~39° half-angle FOV, so they were being drawn every frame
  but never actually on screen. Fixed by repositioning them within the
  frustum and widening the cockpit FOV (1.05 → 1.3 rad) for more margin.

**Verified live, not just read** — the same discipline as every pass
before this: syntax-checked, then driven in headless Chromium via
Playwright with `--use-gl=swiftshader` (headless Chromium has no real GPU
here, needs software WebGL explicitly enabled or `getContext('webgl')`
silently returns null). Confirmed: chase-mode orbit around a correctly-lit
low-poly car, cockpit free-look showing the road through a side window,
steering turning the wheel and bending the road, gear-gated physics (P
truly immobile, D drives), the full checkpoint→question→answer→continue
loop with real question data, and zero console errors throughout.

**Not done / open honestly:**
- **Mirror framing is still not great** — the reflections are real
  (confirmed via pixel screenshots, not assumed) but the rear-view mirror
  shows mostly ground rather than a balanced road/horizon view. Adjusted
  once (mirror-camera pitch) and left rather than continuing to hand-tune
  angles by screenshot; a native playtest would fix this faster than more
  guessing.
- **Low-poly, flat-shaded aesthetic, by design** — this was the explicit
  trade-off for staying hand-written/lightweight rather than pulling in
  Three.js. It looks like an early-2000s game, not a modern one. If that
  reads as "unfinished" rather than "stylized" to real users, the fallback
  discussed but not chosen was inlining Three.js at the cost of roughly
  doubling the file size.
- **No collision, no AI traffic, car always follows the road's own
  curvature** — steering shifts lateral lane position, it doesn't turn the
  car independently. Never tested on a real phone GPU, only SwiftShader
  software rendering — real mobile GPU performance (especially the
  per-frame road-mesh rebuild and three mirror render passes) is unverified.

**Rebuilt again, same session, on Three.js — by name, on request.** Shown
the hand-written low-poly result, the owner asked for "more realistic,
more detailed... can't you use Three.js library." Went with it: this
reverses the earlier trade-off (hand-written WebGL was chosen specifically
to avoid Three.js's size), and it's worth being honest about what changed
and why.

- **Three.js r128 (minified, MIT-licensed) is inlined directly into
  `index.html`** — not a `<script src="cdn...">` tag. A CDN reference would
  violate "no network calls" and would not survive the Claude Artifact's
  CSP (blocks all external hosts except Google Fonts) or the offline
  property `web/README.md` documents. Fetched once via `curl` to unpkg,
  spliced into the file with a Python script (kept the ~600KB blob out of
  the assistant's own context — piping it through `old_string`/`new_string`
  edits would have been enormously wasteful).
- **Cost, stated plainly: the file roughly grew from ~1.1MB to ~1.7MB raw,
  ~300KB to ~446KB gzipped** (measured directly, not estimated). Every
  visitor now downloads that ~150KB extra, once (cached after). This
  directly cuts against the load-speed priority this same file documents
  for the TikTok funnel — flagged before building, the owner chose it
  anyway after seeing the low-poly alternative, so the trade is deliberate
  and on the record here for whoever revisits it.
- **What Three.js bought:** its `Object3D` scene graph replaced all the
  hand-rolled matrix-composition code the previous version needed (parent
  a mesh to a group, set `.position`/`.rotation`, done) — meaningfully less
  custom code to get wrong. Real primitives (`TorusGeometry` for the
  steering wheel, `CylinderGeometry` for wheels/lamp poles, `ConeGeometry`
  for trees) instead of boxes standing in for round things. Proper
  materials (`MeshStandardMaterial` roughness/metalness for painted
  body/chrome trim, `MeshPhysicalMaterial` for glass) lit by a
  `HemisphereLight` + `DirectionalLight` instead of one flat directional
  term. A gradient sky dome (vertex-coloured sphere) and `THREE.Fog` for
  depth. `WebGLRenderTarget` for the mirrors instead of hand-rolled
  framebuffers — same live-reflection technique as before, less code.
- **World now has content beyond the road**, addressing "more realistic
  open world" as *richer scenery along the drive*, not free-roam — the
  owner had already said seeing the car from outside (chase cam) was
  enough, not getting out and walking around, so this pass didn't reopen
  that. Trees (`InstancedMesh`, ~20-220 per set depending on route length,
  two draw calls total regardless of count) and street lamps (also
  instanced) scattered deterministically along the roadside using the same
  seeded RNG as the track curves; distant low-poly buildings on the
  horizon for a sense of a bigger place. All positioned via the existing
  `simTrackPose()` — unchanged from every earlier version.
- **Interior got measurably more detailed**: a proper torus-and-spoke
  steering wheel instead of a flat annulus, a raised gauge-cluster hump
  with an actual `CanvasTexture` gauge face (drawn once via 2D canvas, no
  image asset — same "no external files" rule the sign icons in
  `web/index.html` already follow), driver *and* passenger seats with
  headrests, sun visors, door trim with armrests, a center console.
- **All physics/checkpoint/question/scoring/SFX logic is unchanged again**
  — this is the second time the rendering layer has been swapped out from
  under an unchanged game-logic core (`simTick`, `simTriggerCheckpoint`,
  `finish()`, the Web Audio SFX), which is the strongest evidence yet that
  separating "what the sim does" from "how it's drawn" in the first version
  was the right call.

**Verified the same way as every pass before this — live in headless
Chromium, not just written and assumed correct.** Confirmed Three.js
actually loads (`THREE.REVISION` read back as 128) with zero console
errors, then re-ran every check from the hand-written-WebGL pass:
cockpit view, chase-cam orbit, steering turning the wheel and bending the
road, gear-gated physics, a full checkpoint round-trip, and — this time
budgeted correctly — a scripted full 50/50 completion to the results
screen (the first attempt undershot its own iteration budget by a
timing miscalculation on my part, not a game bug: this build runs
measurably heavier per frame than the hand-written version, so 50
checkpoints at ~4-5s each needed more wall-clock than the same test
budgeted before). One mirror-specific check worth recording: at normal
size the reflections were hard to visually distinguish from the real
background in a screenshot (both often show plain sky/grass), which read
at a glance like "maybe broken" — resolved by temporarily blowing the
mirror quads up 4x, confirming they render a live, correctly-lit
gradient scene, then reverting. **Don't conclude "blank" from a small
screenshot where the reflected content is genuinely similar to what's
around it — enlarge or diff before deciding something isn't rendering.**

**Not done / open honestly, on top of the carried-over items above:**
- **File-size cost is real and unmeasured in practice** — gzipped ~446KB is
  a one-time download, not per-visit, but nobody has checked actual load
  time on a throttled mobile connection from a cold cache, which is the
  TikTok-referred visitor's real first experience.
- **Mirror and gauge-texture framing are still first-pass**, same caveat
  as the hand-written version: functionally correct, not hand-tuned by
  eye on a real device.
- **Still no real phone GPU test** — SwiftShader software rendering only.
  Three.js's heavier per-frame work (more draw calls, `MeshStandardMaterial`
  lighting, three full mirror re-renders) makes real mobile GPU performance
  more of an open question than it was for the lighter hand-written build,
  not less.

**Fourth pass, same session: real 3D models, not procedural geometry.**
Still not satisfied after Three.js ("I still don't like this... 3D ultra
realistic"), and asked to search for a better library, with SVG floated as
an option. Neither would have closed the actual gap, so said so plainly
before touching code: no web 3D library is meaningfully better than
Three.js for this, and SVG is 2D vector art — a step backward, not toward
"ultra realistic 3D". The real gap was never the renderer, it was that
every shape (car, trees, buildings) was procedurally generated from boxes/
cylinders/cones — no code library fixes that, only real 3D art does. Laid
out the honest fork (`AskUserQuestion`): accept procedural as the ceiling,
add real downloaded models, or drop the single-file constraint entirely
for a real build+asset pipeline. **Chosen: real downloaded models.**

- **Source: Kenney's "Starter Kit: Racing"**
  (github.com/KenneyNL/Starter-Kit-Racing), **CC0 1.0** — public domain,
  no attribution required, confirmed by reading the repo's own README
  ("3D Models & sounds (CC0 licensed)") before using anything, not assumed.
  Cloned via `add_repo`/git rather than scraped — poly.pizza and itch.io
  both sit behind Cloudflare bot-challenge pages that blocked a plain
  `curl`; the same assets are mirrored on GitHub, which the session's git
  proxy serves directly.
- **What was used:** `vehicle-truck-red.glb` (the pack has trucks and a
  motorcycle, no sedan — a truck reads as a real road vehicle, not
  perfectly car-shaped, and that trade-off was made for reliability/time
  rather than holding out for a sedan-specific pack of uncertain license)
  as the exterior body, and `decoration-forest.glb` (a multi-tree cluster,
  not a single tree) instanced along the roadside in place of the
  procedural cone-and-cylinder trees. Both share one small (10KB) texture
  atlas.
- **Made genuinely self-contained, not just downloaded.** Both source GLBs
  reference their texture by a relative file path
  (`Textures/colormap.png`) rather than embedding it — unusual for `.glb`
  but valid per the glTF spec. Re-packed both with a Python script that
  parses the GLB JSON+BIN chunks, swaps the image `uri` for a base64
  `data:image/png` URI of the actual texture, and re-serializes a spec-
  correct GLB (4-byte-aligned JSON chunk padded with spaces, BIN chunk
  padded with zeros) — so the embedded copies have zero external file
  references, matching every other asset in this file. Verified this
  worked by actually loading both through `THREE.GLTFLoader` in a headless
  browser before wiring anything into the app, not by assuming the
  re-pack was correct.
- **The 600KB+200KB blobs never passed through the assistant's own
  context** — same discipline as inlining Three.js itself: a Python/bash
  script spliced the base64 directly into `index.html` on disk.
- **`GLTFLoader.js` (Three r128, the matching non-module build) is
  inlined as its own `<script>` block**, same reasoning as the Three.js
  core: a CDN reference would violate no-network-calls and the Artifact
  CSP.
- **Real payoff, not just a swap:** the truck has actual body panel
  shape, a textured paint job, and real tire/rim geometry — reads as an
  actual vehicle from the chase camera, not a red box. The named node
  structure Kenney ships (`wheel-front-left/right`, `wheel-back-left/
  right`, `body`) was used directly: each wheel still spins with speed
  like before, and the **front two now also turn visually with the
  steering input** — a detail the procedural build never had, since it
  never had distinct front/rear wheel objects to steer independently.
  Trees are now recognizable tree clusters with foliage texture instead
  of flat-colour cones.
- **Cost, stated plainly, again:** file grew from ~1.7MB/~446KB gzipped to
  **~2.2MB raw / ~590KB gzipped** (measured directly) — roughly another
  144KB gzipped on top of the Three.js jump, for the two models plus their
  loader. Three rebuilds into this same session, the file has now more
  than doubled from where it started (~300KB gzipped) purely in service of
  this one screen's visual fidelity. Restated once more because it keeps
  being true: this is the TikTok-funnel app's own load-speed priority
  being traded away, deliberately, on the owner's informed and repeated
  choice.
- **Model loading is asynchronous** (`GLTFLoader.parse()` resolves on a
  microtask even for an in-memory buffer, not synchronously) — the car and
  tree groups exist as empty `THREE.Group`/counted arrays from the first
  frame and populate themselves a moment later when the parse resolves;
  nothing in `simTick()`/`simDraw()` had to change to accommodate this
  since it was already written to tolerate empty wheel arrays.
- **Interior is still procedural** — this pack has no cabin/dashboard
  model, so the hand-built dashboard, seats, steering wheel and mirrors
  from the Three.js pass are unchanged. If "more detailed" is still the
  verdict specifically on the cockpit view, that's the next thing a real
  asset would need to target.

**Verified live again, the same way as every pass**: fetched and license-
checked before use, re-packed GLBs test-loaded standalone first (catching
nothing, but not assumed clean either), then the full app re-tested in
headless Chromium — chase-cam view of the real truck, cockpit view
unaffected, front wheels visibly turning with steering input, and a
scripted checkpoint round-trip. Zero console errors.

**Not done / open, on top of everything above:** the truck-not-car
shape is a real, visible trade-off if anyone looks closely; interior
detail didn't change this pass; and the file-size trajectory across four
rounds in one session is worth a deliberate stop-and-look before a fifth,
whatever "still not realistic enough" turns out to mean next.

**Fifth pass, new session: real road/building textures — and a real bug
found underneath them.** Asked to "find more packs for the road and
interior visuals" and confirm what "more" meant: chose *more realistic
via textures/detail* over `AskUserQuestion`.

- **Source: ambientCG**, CC0 1.0 confirmed (site-wide statement on every
  asset page), fetched through its own REST API
  (`api/v2/downloads_csv`, `get?file=`) which — unlike poly.pizza/itch.io
  — isn't behind a bot-challenge, so no repo-mirror workaround was needed
  this time.
- **Used:** `Road007` (asphalt + lane markings, photographic) on the
  paved strip, `Facade001` (building panels) on the distant procedural
  boxes. Both resized/recompressed with Pillow (`pip install`d — not
  preinstalled) to 256–384px JPEGs, ~10–15KB each, embedded as base64
  `data:` URIs the same way every other binary asset in this file is.
- **Tried and rejected: `Leather037`/`Plastic013A` for the interior.**
  Color-only (albedo) PBR maps for low-relief materials like leather
  grain or dashboard plastic carry almost none of their visual detail in
  the albedo channel — the real detail lives in a normal map, which
  wasn't fetched. Resized, both came out visually flat (near-solid
  colour, 676–825 bytes) even from a native-resolution crop with no
  downscale blur, and the plastic's grey didn't match the dashboard's
  dark scheme anyway. Skipped rather than adding normal-map complexity
  for a payoff this low — the interior is still the procedural materials
  from the cockpit pass.
- **Found a real, pre-existing bug while verifying this — not caused by
  this pass, but caught here for the first time:** the paved road and
  its grass shoulder were **never actually visible**, in any round back
  to the original Three.js rewrite. Every past "verified" screenshot
  either looked from inside the cockpit (dashboard/hood covers that part
  of the view) or happened not to have anything to contrast against on
  the flat green ground. This time a chase-cam / top-down check showed
  pure ground colour with no road at all, so it got root-caused instead
  of shrugged off:
  - Isolating meshes one at a time (hide everything else, force a flat
    unlit colour, read back actual GPU pixels with `gl.readPixels`
    rather than trusting screenshots) showed the road/shoulder quads
    were being **backface-culled** — computing the cross-product of the
    quad's own vertex winding gave a normal pointing *down*
    `(0,-1,0)`, opposite the `(0,1,0)` written into the normal
    attribute, so the default `THREE.FrontSide` culled the face the
    camera actually sees on every frame.
  - First fix attempt (`side: THREE.DoubleSide`) made the mesh visible
    but rendered it near-black: Three's standard shader chunk flips the
    normal for back-facing fragments under double-sided rendering, so
    the "fix" was lighting the mesh with an effectively downward-facing
    normal — explainable and confirmed by swapping in a plain white
    unlit material and seeing the same near-black result.
  - **Real fix:** reversed the two triangles' index order in
    `simBuildRoadMesh()` (both the road strip and the grass-shoulder
    quads) so the winding matches the authored up-normal. `DoubleSide`
    was left on as a harmless margin for tight curves, but it's the
    winding fix that actually makes the road correctly lit and visible.
  - This means **every prior "verified working" screenshot of the
    chase/orbit camera in this whole simulation feature was standing on
    a green field with an invisible road** — cockpit view (the one
    angle that happened to look fine) was the only one ever actually
    checked closely. Worth remembering next time a change "only" touches
    rendering: check the thing from outside the cockpit, not just that
    nothing throws.
- **File size:** ~2.24MB raw / ~610KB gzipped (was ~2.2MB / ~590KB after
  the fourth pass) — the two textures added about 20KB gzipped; the
  rest of the delta is the road/shoulder mesh split and the winding fix,
  which added no new assets.

**Verified:** all 5 inline `<script>` blocks still parse
(`new Function(...)` per block). Isolated GPU pixel readback confirmed
the winding bug and its fix independent of screenshot timing. Chase-cam
screenshots after the fix show correctly lit grey asphalt with visible
white edge lines and alternating grass-shoulder patches; cockpit view
shows a lighter road strip where before it was flat green. Full
50-checkpoint scripted playthrough re-run after the mesh-splitting and
winding changes — zero console errors.

**Not done:** interior texture pack (rejected, see above — the ask was
"road and interior visuals" and only the road side landed this round);
building-facade tiling at various box sizes wasn't screenshot-checked
individually, only generally confirmed present.

**Sixth pass, same session: the interior, and a real search for a real
model first.** Asked again to fix the interior "with more realistic
assets, find it online" — so before touching the procedural cockpit,
spent real effort trying to find an actual downloadable car-interior
model (dashboard + seats + wheel geometry, not just a texture), the same
strategy that worked for the exterior truck in the fourth pass.

- **Searched, and came up empty on a genuinely usable one.** Checked, in
  order: Kenney's own Car Kit (`carkit_v1.4`, pulled via the
  `ETdoFresh/kenney.nl` GitHub mirror using a `--filter=blob:none
  --sparse` clone so only that one folder downloaded) — its `sedan.glb`
  is confirmed hollow, `nodes: [body, wheel_*]` only, no interior
  geometry at all, same limitation as the racing truck already in use.
  Quaternius's car pack — CC0 but its own page doesn't confirm interior
  detail and its download is a JS-driven button, not a stable URL.
  OpenGameArt's several CC0 vehicle packs — none advertise interior
  parts specifically. Sketchfab/CGTrader/TurboSquid — real interior
  models exist there, but every download path needs an account login,
  which this environment can't drive. The one model that actually
  matched the ask ("full placeholder interior, detailed steering wheel
  and dashboard") was a paid itch.io asset whose license explicitly
  forbids redistributing the model — incompatible with a publicly
  hosted, freely distributed app regardless of the $5 price. Put the
  honest result to the owner (`AskUserQuestion`): no free, redistributable,
  no-login car-interior model was found. **Chosen: improve the
  procedural interior with real CC0 PBR textures (with normal maps this
  time) plus more geometry, rather than buy a model this app legally
  couldn't ship.**
- **Source: ambientCG again — `Leather034C`** (diamond-quilted, stitched,
  CC0), fetched with both its Color and NormalGL maps this time (last
  round only pulled colour, which is why the earlier leather attempt
  looked flat and got dropped). The quilting and stitch lines are
  strong enough to read directly in the colour map alone, and the
  normal map has real bump depth on the padded diamonds — checked both
  visually before committing to using it, not assumed.
  Resized to 384×384 JPEGs (~14KB colour + ~19KB normal, ~33KB total),
  embedded as base64 `data:` URIs the same way as every other asset.
  Applied to `mat.seat` as `map`+`normalMap` (`MeshStandardMaterial`,
  `normalScale` 0.8, `repeat` 0.6×0.6 so the diamond size reads at seat
  scale) — confirmed via a direct in-page `renderer.domElement.
  toDataURL()` capture (screenshots via the normal Playwright path kept
  landing on the wrong camera angle since the seats sit behind the
  driver's own eyepoint; capturing the frame from inside the same
  `evaluate()` call that moved the camera sidesteps the render loop
  overwriting it before a separate screenshot() could fire) that the
  quilting and stitching genuinely show up, lit, on the seat back and
  headrest.
  Also checked `Plastic012A` (black plastic, matches the dashboard's
  dark scheme better than the previously-rejected white one) with its
  own normal map this round — its normal map turned out just as flat as
  its colour map (near-uniform "pointing straight up" blue, no real
  bump variation), so the earlier judgment to skip textured plastic
  stands, now confirmed with the normal map in hand rather than assumed
  from the albedo alone.
- **Reused the same leather material on the door armrest padding**
  (`mat.stitch`, previously a flat colour with no other use, was removed
  as dead code — replaced by `mat.seat` on the armrests) — zero extra
  asset cost, and armrest padding matching seat leather is how a real
  interior actually looks.
- **Added geometric detail where the texture wasn't worth it:** four
  thin dark slats per side set into the dash top as air vents, and four
  small knobs on the centre console — plain `BoxGeometry`/
  `CylinderGeometry` in the same procedural style as the rest of the
  cockpit, no new assets.
- **File size:** ~2.29MB raw / ~626KB gzipped (was ~2.24MB / ~610KB
  after the fifth pass) — the ~33KB of new leather textures accounts for
  essentially all of the gzipped delta; the geometry additions are
  trivial JS.

**Verified:** all 5 inline `<script>` blocks parse after each edit.
Seat leather confirmed visually (quilting + stitching genuinely lit and
visible, not flat) via direct canvas capture from a repositioned camera.
A 12-checkpoint scripted playthrough (short by design — the full
50-checkpoint run kept exceeding the sandbox's background-command wall-
clock budget on pure iteration overhead, not an app fault; 12 checkpoints
already exercises every code path the change touches) ran clean both
before and after removing a temporary `window.SIM` debug hook used only
for camera-repositioning screenshots.

**Not done:** the new dash vents/knobs weren't confirmed in a clean
screenshot — every camera angle tried either clipped through nearby
geometry or had the steering wheel occluding them — so their placement
is trusted from the code (plain non-overlapping boxes matching the
existing dashboard construction pattern) rather than eyeballed; worth a
closer look next time the interior comes up.

**Vents later confirmed** (direct canvas capture, wheel hidden for the
shot): the dash-top air vents render as dark slats set into the dash;
the console knobs render without error but the cabin is too cramped to
frame them in isolation.

**Seventh pass: owner wants it to look like native App Store driving
games** (sent screenshots of Driving School Simulator: EVO / Driving
Academy — Unity/Unreal titles, pro-modeled photoreal interiors, RT
reflections, hundreds of MB of assets). Told them plainly: a single
embedded HTML mini-game is a different production category and can't
match that, and the specific blocker (a detailed, redistributable,
no-login car-interior model) still doesn't exist free after searching
Kenney / Quaternius / OpenGameArt / Sketchfab / CGTrader / poly.pizza —
the good ones are login-walled or paid + non-redistributable. Owner
chose to **drop the single-file constraint** so big assets can be
network-loaded going forward. Shipped the highest realism-per-effort
change that needs no new asset and risks no regression:
- **Image-based reflections:** bake the sky dome into a
  `PMREMGenerator` env map and set `scene.environment`, so paint /
  glass / chrome / wheel rim pick up real glossy reflections instead of
  flat shading. Modest but genuine.
- **Tried and reverted a full sRGB + ACES tone-mapping pipeline:** it
  washed the scene out (milky sky/fog, low contrast) because every
  colour/vertex-colour/texture was authored for the old linear-ish
  pipeline. Doing it right needs a deep re-tune of every colour across
  all camera angles — reverted, kept only the env-map win. **If ever
  revisited: sRGB output + tone mapping is the right target, but budget
  real time to re-tune fog/sky/vertex/material colours + texture
  encodings together or it looks worse than flat.**
- **The real leap still needs a supplied asset.** Dropping the single-
  file rule solves size, not sourcing. Path to a screenshot-grade
  interior: owner downloads a detailed car+interior model from Sketchfab
  (free CC-BY, needs their login, which this env can't drive) or buys a
  redistributable one, then it's loaded as a proper asset file. That
  network-load pipeline isn't built yet — build it around the actual
  model when one's in hand, with a graceful fallback to the current
  procedural car, and verify the Cloudflare Worker + Pages actually
  serve the new file path before relying on it.
