# Tareeq video — Remotion

Renders the TikTok quiz clips to real MP4 files. 1080×1920, 30fps, **20 hooks
in two batches, Kurdish, with a spoken voiceover**. Clip length is not fixed —
it follows the voice, and currently runs 15–24s.

This is the render path. `../web/ad.html` is an older set of clips as a page
you screen-record — useful for a quick preview or a phone-only workflow, but
the MP4s from here are what you upload.

## Render

```bash
npm install
KURDISH_TTS_KEY=... npm run voice   # generate the voiceover (do this first)
npm run check                       # safe zones, all 20, two frames each
npm run render:all                  # render
npm run upload                      # push everything to gofile, one link
npx remotion studio                 # preview and scrub in the browser
```

Both `voice` and `render:all` take a subset, which is what you want after
adding a hook rather than re-spending quota and CPU on the nineteen that have
not changed:

```bash
KURDISH_TTS_KEY=... npm run voice -- --only helmet,glass
node render-all.mjs --ids helmet,glass
```

`npm run voice` skips any clip that already has both parts in the manifest
*and* both `.wav` files on disk. `--force` regenerates anyway. The `.wav`
files are gitignored, so a fresh clone has the manifest but no audio and the
first `voice` run re-fetches everything.

**`npm run voice` must run before rendering.** It writes the audio *and* the
measured durations that every later timing depends on.

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

`src/data.ts` holds the twenty hooks, both languages, copied verbatim from the
question bank in `../web/index.html`. They are the items where the answer most
people give is the wrong one — that is what drives the comments that carry
reach. `bait` marks the wrong option to show in red on the reveal.

Set `sign` on a clip and it draws the traffic sign on a white card between the
question and the options; the artwork lives in `src/signs.ts`, copied from the
same HTML file. Only do that when the question is *about* the sign — the card
costs 250px of a column that is already the binding constraint, and it is
charged to the type weight below so a sign clip automatically runs a size
down. Without that charge the first sign clip overflowed the top and bottom
safe zones at once.

`src/timing.ts` holds the timeline, and it is **derived, not fixed**.

The first batch hard-coded 15 seconds. The voice came back at 24.6s for one
clip, so the video now fits the audio rather than the other way round:

| Beat | When |
|---|---|
| hook | 0.4s |
| options | stagger from 1.5s, 0.38s apart |
| countdown | 3-2-1, ending 1.2s before the reveal |
| **reveal** | `max(7.6s, 0.4 + sayA + 1.0)` — waits for the spoken question |
| reason | reveal + 1.4s |
| CTA | 2.4s before the end |
| end | reveal + sayB + 1.4s tail |

The countdown is a ring, not just a digit. A thin r=300 outline through the
centre of the frame drains over the three seconds, with the big ghost digit
washing behind it and popping on each tick. It is centred rather than tucked
into a corner because there is no free corner on this layout — the first
attempt put a badge at the top opposite the wordmark and it landed straight on
the hook line, which in Kurdish starts at the right edge and runs full width.

Two things stay fixed because they *are* the design: the question is on screen
in frame one, and the answer never arrives before a countdown and a beat of
silence. A viewer has to reach the end to find out whether they were right, and
completion is what the algorithm pays for. **Revealing earlier costs reach.**

## The audio is two files per clip, and that is not incidental

`sayA` is the hook and question. `sayB` is the answer, the reason and the call
to action, and it is wrapped in a `<Sequence>` that starts at the reveal.

One continuous track would have the voice say the answer several seconds before
the screen shows it — quietly destroying the entire delayed-reveal design while
everything still appears to work. If you ever merge them, you have broken the
product without breaking the build.

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
node scripts/check-safe-zones.mjs arrow-ku kerb-ku    # a few
npm run check                                        # or all 20
```

It renders **two** frames per clip. `@reason` is the busiest one — answer,
reason and CTA all on screen — which catches a column grown too tall.
`@count` is half a second into the countdown, because the timer is absolutely
positioned and therefore ignores the padding entirely. Checking only the
reason frame would never render the timer at all.

Type also **scales to content weight** now (`k` in `Ad.tsx`), because the
binding constraint is column height and hand-tuning each new hook had already
been needed twice. A wordy clip drops a size automatically.

Padding alone is not proof — an absolutely positioned element ignores it,
which is exactly how the call to action first ended up under the caption.
**Re-run the check after any copy or type change**, because the constraint is
content height: a longer question pushes the column past the safe box and the
overflow lands in both the top and bottom zones at once.

## Automated posting

The whole chain from question bank to a scheduled TikTok post:

```bash
KURDISH_TTS_KEY=... npm run voice      # audio + measured durations
npm run check && npm run render:all    # safe zones, then MP4s
# host out/*.mp4 somewhere public and permanent (see below)
BUFFER_ACCESS_TOKEN=... npm run channels               # find the TikTok channel id
BUFFER_ACCESS_TOKEN=... npm run schedule -- \
  --channel <id> --media-base https://host/path --start 2026-09-01T17:00Z
#   ^ prints what it would send; add --go to actually schedule
```

**Why Buffer rather than TikTok directly.** TikTok's Content Posting API
restricts every *unaudited* client to `SELF_ONLY` viewership — posts land
private and nobody sees them. Lifting that means submitting an app for audit,
building a consent/disclosure UX to their spec, and waiting weeks, to publish
one account's videos. Buffer is already an audited TikTok partner, and its API
is on the free plan, so going through them inherits that approval instead of
re-earning it.

**The one thing no script can do for you.** TikTok gates scheduling to
**Creator or Business** accounts. A personal account cannot be scheduled to by
anyone — not Buffer, not TikTok's own scheduler. Switching is free and needs
no documents; it is *not* the same thing as business **verification**, which
does want company registration papers. Getting that distinction wrong costs
weeks. See `docs/PROGRESS.md`.

**Media must be publicly hosted and must stay up.** Buffer's API takes a URL,
never a file upload, and it fetches that URL *when the post publishes* — days
later for a scheduled post. A link that dies in the meantime is a post that
fails quietly. **Gofile is the wrong host for this**: `npm run upload:bundle`
is a handoff for a human, and gofile expires unclaimed guest content. Use a
GitHub Release on this public repo, or any other permanent unauthenticated
URL, and point `--media-base` at it.

`--start` defaults to tomorrow 17:00 UTC (20:00 in Kurdistan) and `--every` to
24 hours, which is the cadence in `docs/PROGRESS.md` rather than an arbitrary
default: a burst from a young account reads as spam. **Do not schedule more
than 2–3 ahead of what you have read the results of** — the video files are
fixed but captions are not, so a hook that lands should change how the rest
are written, and a full queue hands away the ability to react.

## Posting

The clips carry a Kurdish voiceover, so they are **not** silent and do not need
a trending sound. Note the trade-off that follows from that: any scheduled or
API upload can only carry embedded audio, so baking the voice in is what makes
automated posting viable at all.

Never put the answer in the caption, and never trim the opening — the question
has to be on screen in the first frame or people scroll past.
`POSTING.md` has the caption, tags and description for each clip.

## Bitrate

Set with `--video-bitrate=6M` in `render-all.mjs`, which lands at ~1,870 kbps.

**Do not move this into a `remotion.config.mjs`.** Remotion looks for
`remotion.config.ts`, so a `.mjs` config is never discovered — one sat here
appearing to set the bitrate while doing nothing, and the first sixteen clips
shipped at 812 kbps.

Why a bitrate target rather than CRF: this content is flat colour and large
static text, so it encodes very cheaply. CRF targets quality and bottoms out
near 1,090 kbps even at `--crf=10`, while a 6M target spends more and reaches
~1,870. Raising the target past 6M changes nothing — the encoder has no more
detail to spend bits on.

That sits just under TikTok's recommended 2,000-2,500 for 1080p, and it is
fine here. The recommendation exists so the source survives TikTok's re-encode
without banding, and banding needs gradients. This background is a single flat
colour, so there is no gradient to band.

## Voice

kurdishtts.com. `POST /api/tts-proxy`, header `x-api-key`, body
`{speaker_id: "sorani_1", model_version: "v4", text}`, returns WAV.

The key is read from `KURDISH_TTS_KEY` and **must never be committed**.
Free tier is 20,000 characters/month via the API. Batch one cost about 2,100
characters and batch two about 2,700, so all twenty clips come to roughly
4,800 — a quarter of one month's free allowance. There is no reason to pay for
this. `--only` and the skip-if-already-voiced check exist so a re-run does not
spend the other nineteen clips' quota rewriting files that were correct.

The generated `.wav` files are gitignored — they are reproducible and large.

## Licence

Remotion is free for individuals and companies of up to three people, and
needs a paid company licence beyond that. See https://remotion.dev/license —
worth checking before this becomes a business with staff.
