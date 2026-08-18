# Tareeq video — Remotion

Renders the TikTok quiz clips to real MP4 files. 1080×1920, 30fps, 15 seconds,
eight hooks × two languages = 16 clips.

This is the render path. `../web/ad.html` is the same eight clips as a page you
screen-record — useful for a quick preview or a phone-only workflow, but the
MP4s from here are what you upload.

## Render

```bash
npm install
npm run render:all          # all 16
node render-all.mjs ku      # Kurdish only
npx remotion studio         # preview and scrub in the browser
```

Output lands in `out/`, which is gitignored — these are build artifacts, not
source.

## Two things that will break a render on a fresh machine

**Remotion needs the OLD headless mode**, which the full Chromium binary no
longer ships. Pointing it at `/opt/pw-browsers/chromium` fails with *"Old
Headless mode has been removed from the Chrome binary"*. Use the
`chrome-headless-shell` that Playwright installs alongside it — the path is in
`render-all.mjs`. On a machine without Playwright, let Remotion download its
own instead and drop the `--browser-executable` flag.

**There is no Arabic-script font on a stock container.** DejaVu covers none of
it, so every Kurdish glyph renders as a tofu box and the clip looks fine in a
code review and is worthless on screen. `Root.tsx` imports Noto Kufi Arabic
from `node_modules`, so the render never depends on the network or on system
fonts. Do not remove those imports.

Composition ids allow `a-z A-Z 0-9 -` only. `sign_priority` is rejected, which
is why `Root.tsx` slugifies underscores out.

## Editing the clips

`src/data.ts` holds the eight hooks, both languages, copied verbatim from the
question bank in `../web/index.html`. They are the items where the answer most
people give is the wrong one — that is what drives the comments that carry
reach. `bait` marks the wrong option to show in red on the reveal.

`src/Ad.tsx` holds the timeline. `BEATS` is the whole design:

| Beat | Second | Why |
|---|---|---|
| hook | 0.4 | stakes line, the reason to keep watching |
| opts | 1.5 | options stagger in, 0.38s apart |
| count | 3.4 | 3-2-1, one per second |
| beat | 6.4 | countdown clears, one second of silence |
| reveal | 7.6 | the answer |
| why | 9.0 | one-line reason |
| cta | 12.4 | call to action |

The answer is late on purpose. A viewer has to reach the end of the clip to
find out whether they were right, and completion rate is what the algorithm
pays out for. Moving `reveal` earlier will cost you reach.

## TikTok safe zones — checked, not assumed

TikTok draws its own UI over the video and anything beneath it is not read.
On a 1080x1920 canvas: ~130px of status bar at the top, ~320px at the bottom
for caption, username and the sound row, ~120px down the right edge for the
like / comment / share column, ~60px on the left for the progress bar.

The right edge is the one that bites here. Kurdish sets right-to-left, so
Kurdish text *starts* exactly where those buttons sit — a layout that looks
fine in English quietly puts the Kurdish clips under the share button.

`SAFE` in `src/Ad.tsx` is the budget. `npm run check` renders the busiest
frame of each composition and asserts no non-background pixel lands in any of
the four margins:

```bash
node scripts/check-safe-zones.mjs mirrors-ku sign-narrow-ku      # a few
npm run check                                                    # or all 16
```

Padding alone is not proof — an absolutely positioned element ignores it,
which is exactly how the call to action first ended up under the caption.
**Re-run the check after any copy or type change**, because the constraint is
content height: a longer question pushes the column past the safe box and the
overflow lands in both the top and bottom zones at once.

## Posting

The clips are silent by design — add a trending sound in TikTok itself. Never
put the answer in the caption, and never trim the opening: the question has to
be on screen in the first frame or people scroll past.

## Bitrate

`Config.setVideoBitrate("3M")`, deliberately not CRF. CRF targets quality, and
this content — flat dark background, large static text — is so cheap to encode
that CRF 18 produced ~810 kbps. That clears TikTok's 516 kbps in-feed minimum
but sits far below the 2,000-2,500 they recommend for 1080p. TikTok re-encodes
on upload, and a thin source gives their encoder little to work with: it shows
as banding across the dark background and mush on text edges. 3 Mbps is about
5.6 MB per clip against a 500 MB cap.

## Licence

Remotion is free for individuals and companies of up to three people, and
needs a paid company licence beyond that. See https://remotion.dev/license —
worth checking before this becomes a business with staff.
