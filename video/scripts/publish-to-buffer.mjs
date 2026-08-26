/* Schedules the rendered clips to TikTok through Buffer, so a batch goes out
   over the following weeks without anyone opening an app.

   WHY BUFFER AND NOT TIKTOK DIRECTLY. TikTok's Content Posting API restricts
   every unaudited client to SELF_ONLY viewership — posts land private and
   nobody sees them. Lifting that means submitting an app for audit, building
   a consent/disclosure UX to their spec, and waiting weeks, all to publish
   one account's videos. Buffer is already an audited TikTok partner, so
   going through them inherits that approval instead of re-earning it.

   WHAT THIS STILL CANNOT DO FOR YOU. Buffer can only publish to a TikTok
   account it is allowed to connect, and TikTok gates scheduling to Creator
   and Business accounts — a personal account cannot be scheduled to by
   anyone, Buffer included. That switch is free and needs no documents; it is
   not the same thing as business *verification*, which does. See PROGRESS.

   MEDIA MUST BE PUBLICLY HOSTED. Buffer's API takes a URL, never a file
   upload, and it fetches that URL when the post publishes — which for a
   scheduled post is days later. A link that dies in the meantime is a post
   that fails silently. Gofile is therefore the wrong host here: it expires
   unclaimed guest content. Use somewhere permanent and unauthenticated —
   a GitHub Release on this (public) repo works and costs nothing.

     BUFFER_ACCESS_TOKEN=... node scripts/publish-to-buffer.mjs channels
     BUFFER_ACCESS_TOKEN=... node scripts/publish-to-buffer.mjs \
       --channel <id> --media-base https://host/path --start 2026-09-01T18:00Z

   Prints what it would send and stops. It only talks to Buffer when you add
   --go, because scheduling a post is not an action to take by accident.
*/
import {parsePosts} from "./posting-md.mjs";

const API = "https://api.buffer.com";

const argv = process.argv.slice(2);
const flag = (name, fallback = null) => {
  const i = argv.indexOf(`--${name}`);
  return i === -1 ? fallback : argv[i + 1];
};
const GO = argv.includes("--go");

const TOKEN = process.env.BUFFER_ACCESS_TOKEN;
if (!TOKEN) { console.error("BUFFER_ACCESS_TOKEN is not set"); process.exit(2); }

const gql = async (query, variables) => {
  const r = await fetch(API, {
    method: "POST",
    headers: {Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json"},
    body: JSON.stringify({query, variables}),
  });
  const j = await r.json().catch(() => null);
  if (!r.ok || !j) throw new Error(`${r.status} ${r.statusText} — ${JSON.stringify(j).slice(0, 300)}`);
  /* GraphQL answers 200 with an errors array, so a bare status check passes
     straight over a failed mutation. */
  if (j.errors?.length) throw new Error(j.errors.map((e) => e.message).join("; "));
  return j.data;
};

/* ---- channels ---------------------------------------------------------- */
if (argv[0] === "channels") {
  /* The whole object is printed, not just the fields named here: the point of
     this subcommand is to discover the real shape on a live account, and the
     published guide for it 404s. */
  const data = await gql(`query { channels { id name service } }`);
  console.log(JSON.stringify(data, null, 2));
  process.exit(0);
}

/* ---- scheduling -------------------------------------------------------- */
const channelId = flag("channel");
const mediaBase = flag("media-base");
if (!channelId || !mediaBase) {
  console.error("usage: --channel <id> --media-base <public-url-prefix> [--ids a,b] " +
                "[--start <ISO8601>] [--every <hours>] [--no-ai-disclosure] [--go]\n" +
                "       (run `channels` first to find the id)");
  process.exit(2);
}

/* TikTok requires AI-generated content to be disclosed, and the voiceover on
   every one of these clips is synthetic (kurdishtts.com). Buffer surfaces
   that as metadata.tiktok.isAiGenerated, so it defaults to true here.
   Over-disclosing costs nothing; under-disclosing risks the account, which is
   the only asset with an audience on it. --no-ai-disclosure overrides it, but
   do that only on a clip whose audio is a real human voice. */
const AI_DISCLOSURE = !argv.includes("--no-ai-disclosure");

const only = flag("ids") ? new Set(flag("ids").split(",").map((s) => s.trim())) : null;
/* Default: start tomorrow evening in Kurdistan (UTC+3), one clip a day. The
   evening slot and the one-a-day cadence are the posting plan in PROGRESS,
   not arbitrary — a burst from a young account reads as spam. */
const startAt = flag("start") ? new Date(flag("start")) : (() => {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + 1);
  d.setUTCHours(17, 0, 0, 0);          // 20:00 in Kurdistan
  return d;
})();
if (Number.isNaN(startAt.getTime())) { console.error(`--start is not a date: ${flag("start")}`); process.exit(2); }
const everyHours = Number(flag("every", "24"));

const posts = parsePosts().filter((p) => (only ? only.has(p.id) || only.has(p.id.replace(/-ku$/, "")) : true));
if (!posts.length) { console.error("no clips matched --ids"); process.exit(2); }

const MUTATION = `
mutation Schedule($input: CreatePostInput!) {
  createPost(input: $input) {
    ... on PostActionSuccess { post { id dueAt } }
    ... on MutationError { message }
  }
}`;

let n = 0, failed = 0;
for (const p of posts) {
  const dueAt = new Date(startAt.getTime() + n * everyHours * 3600_000).toISOString();
  /* TikTok has one caption field, so the tags ride along with the caption.
     The description block is deliberately NOT sent: it carries the site link,
     and TikTok captions do not make links clickable — putting it there just
     spends caption budget people could be reading the question with. */
  const input = {
    channelId,
    text: `${p.caption}\n\n${p.tags}`,
    schedulingType: "automatic",
    mode: "customScheduled",
    dueAt,
    /* TikTok has ONE caption field, so there is no title or description to
       fill in: metadata.tiktok carries only the AI flag and a title that
       applies to photo posts, which these are not. */
    metadata: {tiktok: {isAiGenerated: AI_DISCLOSURE}},
    assets: [{
      video: {
        url: `${mediaBase.replace(/\/$/, "")}/${p.nn}-${p.id}.mp4`,
        /* 1.5s in. Frame zero is mid-fade, and TikTok shows this still in the
           profile grid — where the question has to be readable or the tap
           never happens. */
        metadata: {thumbnailOffset: 1500},
      },
    }],
  };
  n++;

  if (!GO) {
    console.log(`[dry-run] ${p.nn} ${p.id}  ->  ${dueAt}`);
    console.log(`          ${input.assets[0].video.url}`);
    console.log(`          ${input.text.split("\n")[0]}`);
    console.log(`          tags: ${p.tags}  |  AI disclosed: ${AI_DISCLOSURE}`);
    continue;
  }
  try {
    const d = await gql(MUTATION, {input});
    const res = d.createPost;
    if (res?.message) { failed++; console.log(`✗ ${p.nn} ${p.id}: ${res.message}`); }
    else console.log(`✓ ${p.nn} ${p.id} scheduled ${res?.post?.dueAt ?? dueAt} (${res?.post?.id})`);
  } catch (e) {
    failed++;
    console.log(`✗ ${p.nn} ${p.id}: ${e.message}`);
  }
}

console.log(GO
  ? `\n${n - failed} of ${n} scheduled${failed ? `, ${failed} failed` : ""}`
  : `\n${n} posts would be scheduled, ${everyHours}h apart from ${startAt.toISOString()}.\nAdd --go to actually send them.`);
process.exit(failed ? 1 : 0);
