# Driving-sim audit

Drives **every situation in all 15 practice sets** headlessly and checks that
each one is buildable, judgeable, bilingual and — the part that matters —
actually passable. "Every question has a scenario" was already checkable from
`window.simScenAudit()`; this answers the harder question, *can a learner beat
it?*

## Running it

```sh
npx http-server web -p 8899 -s &      # serve web/ so the .glb + texture fetches resolve
npm i -D playwright                   # or use a global install
node scripts/simaudit/audit.mjs > audit.json
```

Takes roughly 11 minutes for all 745 situations. Then:

```sh
node -e 'const d=require("./audit.json");
  const rows=[]; d.sets.forEach(s=>s.rows.forEach(r=>rows.push({set:s.set,...r})));
  console.log("pageErrors",d.pageErrors.length,"buildFails",d.buildFails.length);
  console.log("unbeaten", rows.filter(r=>r.right.v!=="pass").length);'
```

## What it checks

Per situation, in both languages:

- it **builds** — no `pageerror`, no `scenario build failed`, at least one prop staged
- the instruction banner and the failure line both resolve, and differ between
  Kurdish and English (a string that falls back to English shows up as a match)
- **driven right, it passes** — a per-kernel autopilot stops at the line, waits
  out the crosser, holds the band, keeps the corridor, and so on
- **driven wrong, it fails**, and the fail card names a reason

## Reading the results

Two known false positives, both harness artefacts rather than defects:

- **the last situation of a set** reports `fail`. Passing it calls
  `simFinishTest()`, which sets `SIM.paused`, and the verdict check reads
  `paused` before `idx`. `solve.mjs` has the corrected check.
- **`overtake`** reports `fail` from `audit.mjs`'s crude line. It is passable —
  see below.

`solve.mjs` takes the failures and grid-searches whether *any* line beats them,
which is what separates "the autopilot is dumb" from "nobody can pass this":

```sh
node -e 'const d=require("./audit.json");const bad=[];
  d.sets.forEach(s=>s.rows.forEach(r=>{if(r.right.v!=="pass"&&r.i!==s.total-1)bad.push([s.set-1,r.i,r.id,r.k]);}));
  require("fs").writeFileSync("bad.json",JSON.stringify(bad));'
node scripts/simaudit/solve.mjs bad.json
```

## Gotchas

- **`simTest.goto(i)` leaves `SIM.task` null** — the next frame builds it. Call
  `simTest.step(0.001,1)` before reading `state().k`, `.z` or `.p`, or a built
  situation looks like a build failure.
- **Never conclude "converged" from wall-clock polling.** Headless rAF runs a
  handful of frames, so a value that stops changing between polls may just mean
  no frame ran. Count frames alongside the value.
- **The speed pad only offers 0/20/40/60/80/100.** A zone band narrower than
  20 km/h that misses every button is unwinnable however well it is driven —
  `audit.mjs` reports that as `no selectable speed inside the band` rather than
  a driving failure.
