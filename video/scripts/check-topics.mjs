/* Guards against making the same video twice.

   This is not paranoia about my own memory — the question bank itself
   contains near-duplicates. It carries two questions about how a pregnant
   woman wears a seat belt (#367 and #551) and three about removing a
   motorcyclist's helmet (#119, #427, #604). Picking "something new" by
   reading is exactly how a second helmet clip gets made, and the cost lands
   on the audience: the same answer twice from an account that is supposed to
   be teaching them 745 different things.

   So every clip carries a `topic` — one line naming what it is ABOUT, not
   what it says — and this refuses anything that collides.

     node scripts/check-topics.mjs          # check
     node scripts/check-topics.mjs --list   # print the ledger

   Run it before writing a new batch, and after. */
import {ADS} from "../src/data.ts";

/* Normalised so "Speed limit in an alley" and "speed limit in an alley!"
   cannot both exist, and near-misses surface as shared keywords below.

   \p{L} and \p{N} with the /u flag, NOT [a-z0-9]. The first version used the
   ASCII class and every Kurdish question normalised to an empty string, so
   all forty "matched" each other and the check reported thirty-five
   duplicates that did not exist. A validator that cannot read the language it
   validates is worse than none — it fails loudly enough to be turned off. */
const norm = (s) => s.toLowerCase().replace(/[^\p{L}\p{N} ]+/gu, " ").replace(/\s+/g, " ").trim();
const STOP = new Set(["the","a","an","of","in","on","at","to","for","and","or","is","how","what",
  "when","where","who","why","must","should","may","from","with","your","you","it","its","not",
  "vs","under","over","by","that","this","are","be"]);
const keywords = (s) => new Set(norm(s).split(" ").filter((w) => w.length > 2 && !STOP.has(w)));

/* Empty is not a value. Without this, anything that normalises away — a topic
   left blank, a script bug — collides with every other empty one and buries
   the real signal. */
const skipEmpty = (v) => v === "";

const problems = [];
const seen = new Map();

for (const ad of ADS) {
  if (!ad.topic) problems.push(`${ad.id}: no topic`);
  for (const [field, value] of [["id", ad.id], ["topic", norm(ad.topic ?? "")],
                                ["question", norm(ad.q.ku)]]) {
    if (skipEmpty(value)) { problems.push(`${ad.id}: ${field} is empty after normalising`); continue; }
    const key = `${field}:${value}`;
    if (seen.has(key)) problems.push(`duplicate ${field}: ${ad.id} and ${seen.get(key)} share "${value}"`);
    else seen.set(key, ad.id);
  }
}

/* A softer signal than an exact match: two topics sharing most of their
   meaningful words are probably the same video written twice. Warns rather
   than fails — "Speed limit in an alley" and "Night speed limit on a two-way
   road" legitimately share a word. */
const warn = [];
for (let i = 0; i < ADS.length; i++) {
  for (let j = i + 1; j < ADS.length; j++) {
    const a = keywords(ADS[i].topic ?? ""), b = keywords(ADS[j].topic ?? "");
    const shared = [...a].filter((w) => b.has(w));
    const overlap = shared.length / Math.min(a.size, b.size);
    if (shared.length >= 2 && overlap >= 0.6) {
      warn.push(`  ${ADS[i].id} / ${ADS[j].id} — both about: ${shared.join(", ")}`);
    }
  }
}

if (process.argv.includes("--list")) {
  const w = Math.max(...ADS.map((a) => a.id.length));
  ADS.forEach((a, i) => console.log(`${String(i + 1).padStart(2)}. ${a.id.padEnd(w)}  ${a.topic}`));
  console.log(`\n${ADS.length} clips, ${new Set(ADS.map((a) => a.topic)).size} distinct topics`);
}

if (warn.length) { console.log("\npossible overlaps (not failures — read them):"); console.log(warn.join("\n")); }

if (problems.length) {
  console.error(`\n${problems.length} problem(s):`);
  for (const p of problems) console.error(`  ✗ ${p}`);
  process.exit(1);
}
console.log(`\n✓ ${ADS.length} clips, no duplicate id, topic or question`);
