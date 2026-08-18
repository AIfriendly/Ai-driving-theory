/* Renders every composition to out/. Serial on purpose — the renderer already
   uses all cores per clip, so running them in parallel only thrashes.

   Remotion needs the OLD headless mode, which the full Chromium binary no
   longer ships. Playwright's chrome-headless-shell is the one that works;
   without pointing at it the render dies with "Old Headless mode has been
   removed from the Chrome binary". */
import {execFileSync} from "node:child_process";
import {mkdirSync} from "node:fs";

const SHELL = "/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell";
const IDS = [
  "mirrors", "alley", "helmet", "burn", "green",
  "sign-priority", "sign-crossing", "sign-narrow",
];
const LANGS = process.argv.slice(2).length ? process.argv.slice(2) : ["ku", "en"];

mkdirSync("out", {recursive: true});
let n = 0;
for (const lang of LANGS) {
  for (const id of IDS) {
    const name = `${id}-${lang}`;
    process.stdout.write(`[${++n}] ${name} ... `);
    execFileSync("npx", ["remotion", "render", "src/index.ts", name,
      `out/${name}.mp4`, `--browser-executable=${SHELL}`, "--log=error"],
      {stdio: ["ignore", "ignore", "inherit"]});
    console.log("done");
  }
}
console.log(`\nRendered ${n} clips to out/`);
