/* Renders the busiest frame of each composition and asserts nothing is drawn
   inside the margins TikTok covers with its own UI. Padding alone is not
   proof — an absolutely positioned element ignores it, which is exactly how
   the call to action ended up under the caption the first time. */
import {execFileSync} from "node:child_process";
import {readFileSync, mkdirSync} from "node:fs";

const SHELL = "/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell";
const W = 1080, H = 1920;
const SAFE = {top: 130, bottom: 320, right: 120, left: 60};
const BG = [11, 16, 24];          // C.bg #0b1018
const TOL = 10;                    // jpeg/ffmpeg noise around the flat fill

/* Two frames per clip, because there are two different ways to overflow.

   "reason" is the busiest frame: just after the reason appears, when the
   answer, the reason and the CTA can all be on screen at once. That is the
   one that catches a column grown too tall.

   "count" is half a second into the countdown. The timer badge is absolutely
   positioned in a top corner, so it ignores the padding entirely — exactly
   the class of mistake that put the CTA under the caption the first time.
   Checking only the reason frame would never render it.

   Durations differ per clip, so fixed frame numbers would miss or overshoot. */
import {beatsFor, FPS} from "../src/timing.ts";
import {ADS} from "../src/data.ts";
const framesFor = (compId) => {
  const ad = ADS.find((a) => compId.startsWith(a.id.replace(/_/g, "-")));
  if (!ad) return [{name: "reason", frame: 390}];
  const lang = compId.endsWith("-en") ? "en" : "ku";
  const b = beatsFor(ad, lang);
  return [
    {name: "reason", frame: Math.round(Math.min(b.cta + 0.6, b.end - 0.4) * FPS)},
    {name: "count", frame: Math.round((b.countStart + 0.5) * FPS)},
  ];
};

const ids = process.argv.slice(2);
if (!ids.length) { console.error("usage: node scripts/check-safe-zones.mjs <id>..."); process.exit(2); }
mkdirSync("out/zones", {recursive: true});

/* Minimal PNG reader. Remotion writes colour type 2 (8-bit RGB, 3 bytes per
   pixel), not RGBA — assuming 4 here silently shears every scanline and makes
   the whole frame read as painted. Read the depth from IHDR rather than
   guessing it. */
import {inflateSync} from "node:zlib";
const readPng = (file) => {
  const buf = readFileSync(file);
  let pos = 8, idat = [], w = 0, h = 0, ctype = 6;
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos), type = buf.toString("ascii", pos + 4, pos + 8);
    if (type === "IHDR") { w = buf.readUInt32BE(pos + 8); h = buf.readUInt32BE(pos + 12); ctype = buf[pos + 17]; }
    if (type === "IDAT") idat.push(buf.subarray(pos + 8, pos + 8 + len));
    pos += len + 12;
  }
  const raw = inflateSync(Buffer.concat(idat));
  const bpp = ctype === 6 ? 4 : ctype === 2 ? 3 : ctype === 4 ? 2 : 1;
  const stride = w * bpp, out = Buffer.alloc(w * h * bpp);
  let p = 0;
  for (let y = 0; y < h; y++) {
    const filter = raw[p++];
    for (let x = 0; x < stride; x++) {
      const cur = raw[p + x];
      const a = x >= bpp ? out[y * stride + x - bpp] : 0;
      const b = y > 0 ? out[(y - 1) * stride + x] : 0;
      const c = x >= bpp && y > 0 ? out[(y - 1) * stride + x - bpp] : 0;
      let v;
      if (filter === 0) v = cur; else if (filter === 1) v = cur + a;
      else if (filter === 2) v = cur + b; else if (filter === 3) v = cur + ((a + b) >> 1);
      else { const pp = a + b - c, pa = Math.abs(pp - a), pb = Math.abs(pp - b), pc = Math.abs(pp - c);
             v = cur + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c); }
      out[y * stride + x] = v & 0xff;
    }
    p += stride;
  }
  return {w, h, bpp, data: out};
};

const painted = (d, w, bpp, x, y) => {
  const i = (y * w + x) * bpp;
  return Math.abs(d[i] - BG[0]) > TOL || Math.abs(d[i + 1] - BG[1]) > TOL || Math.abs(d[i + 2] - BG[2]) > TOL;
};

let bad = 0;
for (const id of ids) {
  for (const {name, frame} of framesFor(id)) {
    const png = `out/zones/${id}-${name}.png`;
    execFileSync("npx", ["remotion", "still", "src/index.ts", id, png,
      `--frame=${frame}`, `--browser-executable=${SHELL}`, "--log=error"], {stdio: ["ignore", "ignore", "inherit"]});
    const {w, h, bpp, data} = readPng(png);
    const hits = {top: 0, bottom: 0, right: 0, left: 0};
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      if (!painted(data, w, bpp, x, y)) continue;
      if (y < SAFE.top) hits.top++;
      if (y >= h - SAFE.bottom) hits.bottom++;
      if (x >= w - SAFE.right) hits.right++;
      if (x < SAFE.left) hits.left++;
    }
    const fail = Object.entries(hits).filter(([, n]) => n > 0);
    if (fail.length) { bad++; console.log(`✗ ${id} @${name}: ${fail.map(([k, n]) => `${k}=${n}px`).join(" ")}`); }
    else console.log(`✓ ${id} @${name}: clear of all four zones`);
  }
}
process.exit(bad ? 1 : 0);
