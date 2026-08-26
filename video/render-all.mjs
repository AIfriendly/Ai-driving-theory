/* Renders every composition to out/. Serial on purpose — the renderer already
   uses all cores per clip, so running them in parallel only thrashes.

   Remotion needs the OLD headless mode, which the full Chromium binary no
   longer ships. Playwright's chrome-headless-shell is the one that works;
   without pointing at it the render dies with "Old Headless mode has been
   removed from the Chrome binary". */
import {execFileSync} from "node:child_process";
import {mkdirSync, existsSync} from "node:fs";

/* Voiceover and music are file-driven, so refresh the manifest first —
   otherwise a newly dropped-in mp3 is silently ignored. */
/* The manifest is written by gen-voice.mjs now — it carries measured
   durations, which a directory scan cannot produce. Just check it is there. */
if (!existsSync("src/audio-manifest.json")) {
  console.error("src/audio-manifest.json missing — run: npm run voice");
  process.exit(2);
}

const SHELL = "/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell";

/* Encoding settings live here as CLI flags, not in a config file. A
   remotion.config.mjs is NOT auto-discovered — Remotion looks for
   remotion.config.ts — so one silently did nothing while appearing to set the
   bitrate, and the clips shipped at 812 kbps.

   Why a bitrate target rather than CRF: this content is flat colour and static
   text, so it encodes very cheaply. CRF targets quality and bottoms out around
   1,090 kbps even at --crf=10; a 6M target spends more and lands at ~1,870.
   That is just under TikTok's recommended 2,000-2,500 for 1080p and the
   encoder will not go higher — there is no more detail to spend bits on.
   Acceptable here because the guidance exists to survive TikTok's re-encode
   without banding, and banding needs gradients. This background is one flat
   colour. */
const BITRATE = "6M";
/* Read straight from src/data.ts rather than kept in sync by hand: the list
   was already duplicated in three places, and adding batch two meant getting
   the same ten ids right in all of them. Pass ids on the command line to
   render a subset (`node render-all.mjs --ids helmet,glass`). */
import {ADS} from "./src/data.ts";
const ALL = ADS.map((a) => a.id.replace(/_/g, "-"));
const args = process.argv.slice(2);
const pick = args.indexOf("--ids");
const IDS = pick === -1 ? ALL : args[pick + 1].split(",").map((s) => s.trim());
const unknown = IDS.filter((id) => !ALL.includes(id));
if (unknown.length) { console.error(`unknown id(s): ${unknown.join(", ")}`); process.exit(2); }
/* Kurdish only by default — that is where the voice and the audience are.
   `node render-all.mjs ku en` renders both. */
const langArgs = args.filter((a, i) => a !== "--ids" && args[i - 1] !== "--ids");
const LANGS = langArgs.length ? langArgs : ["ku"];

mkdirSync("out", {recursive: true});
let n = 0;
for (const lang of LANGS) {
  for (const id of IDS) {
    const name = `${id}-${lang}`;
    process.stdout.write(`[${++n}] ${name} ... `);
    execFileSync("npx", ["remotion", "render", "src/index.ts", name,
      `out/${name}.mp4`, `--browser-executable=${SHELL}`,
      `--video-bitrate=${BITRATE}`, "--codec=h264", "--log=error"],
      {stdio: ["ignore", "ignore", "inherit"]});
    console.log("done");
  }
}
console.log(`\nRendered ${n} clips to out/`);
