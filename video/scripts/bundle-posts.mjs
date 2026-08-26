/* Builds video/bundle/ — every clip paired with its own copy, numbered so the
   folder itself is the running order. Gofile shows a flat list, so the number
   prefix is the only thing keeping a clip next to its text.

   POSTING.md stays the single source of truth; this only reshapes it. Re-run
   after editing POSTING.md or the pairs drift out of sync with it. */
import {readFileSync, writeFileSync, mkdirSync, copyFileSync, rmSync, existsSync} from "node:fs";

// Trailing sentinel: the block regex ends each match by looking ahead to the
// next "## ". JS has no \z, so without this the final clip never terminates
// and the parse silently returns 9 of 10.
const md = readFileSync("POSTING.md", "utf8") + "\n## \n";
const OUT = "bundle";
rmSync(OUT, {recursive: true, force: true});
mkdirSync(OUT, {recursive: true});

// Blocks look like:  ## 3. `ambulance-ku.mp4`   … up to the next "## " or EOF.
const blocks = [...md.matchAll(/^## (\d+)\.\s*`([^`]+)`\s*\n([\s\S]*?)(?=^## |\z)/gm)];
/* Count comes from POSTING.md rather than a constant. It was pinned at 10 and
   the second batch of ten made the whole script throw — a hard number here
   just means the next batch breaks it again. A floor still catches a parse
   that has silently fallen apart. */
if (blocks.length < 5) throw new Error(`only ${blocks.length} clip blocks parsed out of POSTING.md`);
const TOTAL = blocks.length;

const field = (body, label) => {
  const m = body.match(new RegExp(`\\*\\*${label}[^*]*\\*\\*\\s*\\n\`\`\`\\n([\\s\\S]*?)\\n\`\`\``));
  return m ? m[1].trim() : "";
};

const order = [];

let paired = 0;
const missing = [];
for (const [, n, file, body] of blocks) {
  const id = file.replace(/\.mp4$/, "");
  const nn = String(n).padStart(2, "0");
  const caption = field(body, "Title / caption");
  const tags = field(body, "Tags");
  const desc = field(body, "Description / bio link");
  if (!caption || !tags || !desc) throw new Error(`${id}: missing a field`);

  /* A clip with no MP4 is skipped rather than fatal, and skipped *before* its
     .txt is written — a caption file with no video beside it is worse than
     nothing in a handoff folder. Rendering one batch at a time is the normal
     state: out/ is gitignored, so a fresh clone has every caption and no
     video at all. Loud about it, though; a silently missing clip is how you
     hand over a bundle that is short two videos and nobody notices. */
  if (!existsSync(`out/${file}`)) { missing.push(id); continue; }

  writeFileSync(`${OUT}/${nn}-${id}.txt`,
`${nn} of ${TOTAL} — ${id}.mp4
${"=".repeat(46)}

[1] CAPTION  → paste into TikTok's caption field
${"-".repeat(46)}
${caption}

[2] TAGS  → append to the caption, or paste into the tag field
${"-".repeat(46)}
${tags}

[3] DESCRIPTION / what the link is for
${"-".repeat(46)}
${desc}

${"-".repeat(46)}
Do not put the answer in the caption.
Link goes in the BIO, not the caption — TikTok captions are not clickable.
`);
  copyFileSync(`out/${file}`, `${OUT}/${nn}-${id}.mp4`);
  order.push(`  ${nn}  ${id}`);
  paired++;
}

/* Header counts what is actually in the folder, not what POSTING.md lists.
   It said "20 clips" over a folder holding 10, which is exactly the kind of
   quiet wrongness a handoff cannot afford. */
const index = [`TAREEQ — ${paired} clips, each paired with its own caption/tags/description.`, "",
  "Each NN-name.mp4 has a matching NN-name.txt. Open the .txt, copy the three",
  "blocks into TikTok's caption, tags and description fields.", "",
  "BEFORE POSTING ANYTHING: check the bio link resolves. Open it on the phone",
  "you post from and confirm the app loads. Ten clips were once posted against",
  "a bio with a typo in it, and every view went to a 404.", "",
  `  Bio must read exactly:  ai-driving-theory.tareeq.workers.dev`, "",
  "POST 2-3, THEN STOP for 48h and read the result before posting the rest.",
  "The video files are fixed but captions are not, so a hook that lands should",
  "change how the remaining clips are written.", "",
  "Strongest hooks in this batch: 12 helmet, 14 glass, 11 hangover — being",
  "confidently wrong about first aid is what makes people comment.",
  "Do NOT put the answer in the caption — the clip depends on people watching",
  "to find out.", "",
  "Order:", ...order];
writeFileSync(`${OUT}/00-START-HERE.txt`, index.join("\n") + "\n");
console.log(`bundle/ built — ${paired} of ${TOTAL} clips paired, plus 00-START-HERE.txt`);
if (missing.length) {
  console.log(`\nNO MP4 IN out/ FOR ${missing.length}: ${missing.join(", ")}`);
  console.log(`Render them first if they belong in this handoff:\n  node render-all.mjs --ids ${missing.map((m) => m.replace(/-ku$/, "")).join(",")}`);
}
