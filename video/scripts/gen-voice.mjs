/* Generates the spoken audio with kurdishtts.com and measures it, because the
   timeline has to fit the voice rather than the other way round.

   Each clip gets TWO files. sayA (hook + question) plays from the start; sayB
   (answer + reason + CTA) must not start until the answer is on screen, or the
   voice reveals it early and the whole delayed-answer design is pointless.

   Writes src/audio-manifest.json with the real measured seconds of each part.
   Root.tsx turns those into per-composition durations and Ad.tsx derives every
   beat after the question from them. Nothing here is hard-coded to 15s — the
   first batch was, and the voice ran 24.6s against it.

   The API key is read from KURDISH_TTS_KEY and must never be committed.
     KURDISH_TTS_KEY=... node scripts/gen-voice.mjs [ku|en ...] [--only id,id]

   Already-voiced clips are skipped. The free tier is 20,000 characters a
   month and a full pass over the bank now costs about 4,200, so re-running
   this after adding one hook used to spend the other nineteen clips' quota
   rewriting files that were already correct. Pass --force to regenerate.
*/
import {mkdirSync, writeFileSync, readFileSync, existsSync} from "node:fs";
import {ADS} from "../src/data.ts";

const KEY = process.env.KURDISH_TTS_KEY;
if (!KEY) { console.error("KURDISH_TTS_KEY is not set"); process.exit(2); }

const ENDPOINT = "https://www.kurdishtts.com/api/tts-proxy";
const SPEAKER = {ku: "sorani_1", en: "sorani_1"};   // service is Kurdish-only

const argv = process.argv.slice(2);
const FORCE = argv.includes("--force");
const onlyAt = argv.indexOf("--only");
const ONLY = onlyAt === -1 ? null : new Set(argv[onlyAt + 1].split(",").map((s) => s.trim()));
const langs = argv.filter((a, i) => !a.startsWith("--") && argv[i - 1] !== "--only");
const LANGS = langs.length ? langs : ["ku"];

/* WAV header parse — cheaper and more reliable here than shelling out to a
   media tool, and this environment has no general-purpose ffmpeg. */
const wavSeconds = (buf) => {
  if (buf.length < 44 || buf.toString("ascii", 0, 4) !== "RIFF") return null;
  let pos = 12, rate = 0, bytesPerSec = 0;
  while (pos + 8 <= buf.length) {
    const id = buf.toString("ascii", pos, pos + 4);
    const size = buf.readUInt32LE(pos + 4);
    if (id === "fmt ") { rate = buf.readUInt32LE(pos + 12); bytesPerSec = buf.readUInt32LE(pos + 16); }
    if (id === "data") return bytesPerSec ? size / bytesPerSec : null;
    pos += 8 + size + (size % 2);
  }
  return null;
};

const say = async (text, lang, out) => {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {"x-api-key": KEY, "Content-Type": "application/json"},
    body: JSON.stringify({speaker_id: SPEAKER[lang], model_version: "v4", text}),
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${(await res.text()).slice(0, 200)}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const secs = wavSeconds(buf);
  if (!secs) throw new Error(`response was not a readable WAV (${buf.length} bytes)`);
  writeFileSync(out, buf);
  return secs;
};

mkdirSync("public/audio", {recursive: true});
const manifestPath = "src/audio-manifest.json";
const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, "utf8")) : {};
manifest.voice ??= {};
manifest.music ??= null;

let chars = 0, skipped = 0;
for (const lang of LANGS) {
  for (const ad of ADS) {
    const key = `${ad.id}-${lang}`;
    if (ONLY && !ONLY.has(ad.id)) continue;
    /* Both parts in the manifest AND both files still on disk — nothing to
       buy. The .wav files are gitignored, so a fresh clone has the manifest
       but not the audio, and that has to count as missing. */
    const have = manifest.voice[key];
    const onDisk = have?.a?.file && have?.b?.file
      && existsSync(`public/audio/${have.a.file}`) && existsSync(`public/audio/${have.b.file}`);
    if (onDisk && !FORCE) { skipped++; continue; }
    const parts = {};
    for (const part of ["A", "B"]) {
      const text = ad[`say${part}`][lang];
      const file = `${key}-${part.toLowerCase()}.wav`;
      process.stdout.write(`  ${key}-${part.toLowerCase()} (${text.length}c) ... `);
      const secs = await say(text, lang, `public/audio/${file}`);
      chars += text.length;
      parts[part.toLowerCase()] = {file, seconds: Number(secs.toFixed(2))};
      console.log(`${secs.toFixed(1)}s`);
    }
    manifest.voice[key] = parts;
  }
}
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
console.log(`\n${chars} characters used (free tier is 20,000/month)` +
  (skipped ? `, ${skipped} already voiced and skipped` : ""));
