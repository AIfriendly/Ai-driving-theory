/* Remotion errors out if <Audio> points at a file that is not there, so the
   render cannot just "try" each clip's voiceover. This scans public/audio and
   writes a manifest of what actually exists; Ad.tsx renders audio only for
   entries in it. Run before every render — render-all.mjs does that for you.

   Convention:
     public/audio/<composition-id>.mp3   voiceover for that one clip
     public/audio/music.mp3              bed under every clip
   e.g. public/audio/mirrors-ku.mp3 */
import {readdirSync, writeFileSync, existsSync, mkdirSync} from "node:fs";

mkdirSync("public/audio", {recursive: true});
const files = existsSync("public/audio") ? readdirSync("public/audio") : [];
const voice = files
  .filter((f) => /\.(mp3|m4a|wav|aac)$/i.test(f) && !/^music\./i.test(f))
  .reduce((acc, f) => ({...acc, [f.replace(/\.[^.]+$/, "")]: f}), {});
const music = files.find((f) => /^music\.(mp3|m4a|wav|aac)$/i.test(f)) ?? null;

writeFileSync("src/audio-manifest.json", JSON.stringify({voice, music}, null, 2) + "\n");
console.log(`audio manifest: ${Object.keys(voice).length} voiceover(s)${music ? ", music bed" : ", no music"}`);
