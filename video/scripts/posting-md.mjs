/* POSTING.md is the single source of truth for what goes out with each clip,
   and two scripts now need to read it — the bundler that builds a handoff
   folder and the Buffer publisher. Parsing it in both places meant two
   regexes that could drift apart, so it lives here.

   A block looks like:

     ## 3. `ambulance-ku.mp4`
     **Title / caption (Kurdish)**
     ```
     …
     ```
     **Tags**
     ```
     …
     ```
     **Description / bio link**
     ```
     …
     ```
*/
import {readFileSync} from "node:fs";

/* Trailing sentinel: the block regex ends each match by looking ahead to the
   next "## ". JS has no \z, so without this the final clip never terminates
   and the parse silently returns 9 of 10. */
const SENTINEL = "\n## \n";

const field = (body, label) => {
  const m = body.match(new RegExp(`\\*\\*${label}[^*]*\\*\\*\\s*\\n\`\`\`\\n([\\s\\S]*?)\\n\`\`\``));
  return m ? m[1].trim() : "";
};

export const parsePosts = (path = "POSTING.md") => {
  const md = readFileSync(path, "utf8") + SENTINEL;
  const blocks = [...md.matchAll(/^## (\d+)\.\s*`([^`]+)`\s*\n([\s\S]*?)(?=^## |\z)/gm)];
  /* A floor, not an exact count. It was pinned at 10 and the second batch of
     ten made every caller throw; a hard number just breaks on the next batch.
     A floor still catches a parse that has fallen apart. */
  if (blocks.length < 5) throw new Error(`only ${blocks.length} clip blocks parsed out of ${path}`);

  return blocks.map(([, n, file, body]) => {
    const id = file.replace(/\.mp4$/, "");
    const post = {
      n: Number(n), nn: String(n).padStart(2, "0"), file, id,
      caption: field(body, "Title / caption"),
      tags: field(body, "Tags"),
      desc: field(body, "Description / bio link"),
    };
    if (!post.caption || !post.tags || !post.desc) throw new Error(`${id}: missing a field in ${path}`);
    return post;
  });
};
