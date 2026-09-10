/* Real per-post analytics from Buffer, ranked by views.

   CORRECTS AN EARLIER FINDING IN THIS PROJECT. docs/PROGRESS.md previously
   said Buffer's API returns no analytics — "we don't currently offer your
   analytics or insights data through the API" — sourced from Buffer's own
   support docs. That is either stale or was about a different surface: the
   GraphQL schema has a real `metrics` field on every Post, live-verified
   2026-09-10, with Video Views, Reach, Reactions, Comments, Shares,
   Eng. Rate, Watch Time and Avg. Watch Time. Not experimental-flagged in the
   schema the way the docs described. Always verify against the live schema,
   not a support article — this project has been burned by that gap twice.

     BUFFER_ACCESS_TOKEN=... node scripts/buffer-metrics.mjs [--channel <id>] [--org <id>]

   Defaults to the TikTok channel/org already in use elsewhere in this repo. */
import {parsePosts} from "./posting-md.mjs";

const TOKEN = process.env.BUFFER_ACCESS_TOKEN;
if (!TOKEN) { console.error("BUFFER_ACCESS_TOKEN is not set"); process.exit(2); }

const argv = process.argv.slice(2);
const flag = (name, fallback) => { const i = argv.indexOf(`--${name}`); return i === -1 ? fallback : argv[i + 1]; };
const CHANNEL = flag("channel", "6a90a600ccaf649a672c404d");
const ORG = flag("org", "6a900933fd3a21171e33de47");

const gql = async (query, variables) => {
  const r = await fetch("https://api.buffer.com", {
    method: "POST",
    headers: {Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json"},
    body: JSON.stringify({query, variables}),
  });
  const j = await r.json();
  if (j.errors?.length) throw new Error(j.errors.map((e) => e.message).join("; "));
  return j.data;
};

const {posts} = await gql(
  `query Q($input: PostsInput!) {
     posts(first: 100, input: $input) {
       edges { node { dueAt sentAt text metrics { name value unit } } }
     }
   }`,
  {input: {organizationId: ORG, filter: {channelIds: [CHANNEL], status: ["sent"]}}},
);

/* Map each post's caption back to a clip id via its hook line, so the ranking
   is readable against the source in video/src/data.ts rather than raw dates.
   Falls back to the caption text for the pre-hook legacy batch, which used a
   different caption shape and has no 🤔 marker to split on. */
let clipsById = new Map();
try {
  const {ADS} = await import("../src/data.ts");
  clipsById = new Map(ADS.map((a) => [a.hook.ku, a.id]));
} catch { /* fine without it — falls back to raw hook text below */ }

const rows = posts.edges.map(({node: p}) => {
  const m = Object.fromEntries((p.metrics ?? []).map((x) => [x.name, x.value]));
  const hook = (p.text ?? "").split("🤔")[0].trim();
  return {
    date: (p.sentAt ?? p.dueAt ?? "").slice(0, 10),
    id: clipsById.get(hook) ?? null,
    hook: hook || "(legacy pre-hook batch)",
    views: m["Video Views"] ?? 0, reach: m.Reach ?? 0, reactions: m.Reactions ?? 0,
    comments: m.Comments ?? 0, shares: m.Shares ?? 0, eng: m["Eng. Rate"] ?? 0,
    avgWatch: m["Avg. Watch Time (sec)"] ?? 0,
  };
}).sort((a, b) => b.views - a.views);

const totalViews = rows.reduce((s, r) => s + r.views, 0);
console.log(`${rows.length} sent posts · ${totalViews} total views\n`);
console.log("date        views  reach react com shr  eng%  avgw  id".padEnd(20) + "hook");
for (const r of rows) {
  console.log(
    `${r.date}  ${String(r.views).padStart(5)}  ${String(r.reach).padStart(5)}  ` +
    `${String(r.reactions).padStart(4)} ${String(r.comments).padStart(3)} ${String(r.shares).padStart(3)}  ` +
    `${String(r.eng).padStart(4)} ${String(r.avgWatch).padStart(5)}  ${(r.id ?? "—").padEnd(14)} ${r.hook}`
  );
}
if (rows[0]) {
  const share = ((rows[0].views / totalViews) * 100).toFixed(0);
  console.log(`\nTop clip (${rows[0].id ?? rows[0].hook}) is ${share}% of all views across every post sent so far.`);
}
