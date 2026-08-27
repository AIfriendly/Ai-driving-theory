/* Copies the rendered MP4s into clips/public/ under the numbered names that
   POSTING.md and publish-to-buffer.mjs both use, so the deployed URL for a
   clip is exactly what the scheduler asks for.

   public/ is gitignored — the videos are build output, reproducible from
   `npm run voice && npm run render:all` in video/, and 43 MB has no business
   in git history. */
import {mkdirSync, copyFileSync, existsSync, rmSync, readdirSync} from "node:fs";
import {parsePosts} from "../video/scripts/posting-md.mjs";

process.chdir(new URL("..", import.meta.url).pathname);   // repo root

const OUT = "clips/public";
rmSync(OUT, {recursive: true, force: true});
mkdirSync(OUT, {recursive: true});

let staged = 0;
const missing = [];
for (const {nn, id, file} of parsePosts("video/POSTING.md")) {
  const src = `video/out/${file}`;
  if (!existsSync(src)) { missing.push(id); continue; }
  copyFileSync(src, `${OUT}/${nn}-${id}.mp4`);
  staged++;
}

console.log(`staged ${staged} clips into ${OUT}/`);
if (missing.length) console.log(`no MP4 rendered for ${missing.length}: ${missing.join(", ")}`);
if (!staged) { console.error("nothing to deploy"); process.exit(2); }
console.log(readdirSync(OUT).join("\n"));
