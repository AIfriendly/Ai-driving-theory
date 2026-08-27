/* Schedules the rendered clips to TikTok through Buffer, so a batch goes out
   over the following weeks without anyone opening an app.

   WHY BUFFER AND NOT TIKTOK DIRECTLY. TikTok's Content Posting API restricts
   every unaudited client to SELF_ONLY viewership — posts land private and
   nobody sees them. Lifting that means submitting an app for audit, building
   a consent/disclosure UX to their spec, and waiting weeks, all to publish
   one account's videos. Buffer is already an audited TikTok partner, so
   going through them inherits that approval instead of re-earning it.

   THE ACCOUNT TYPE TURNED OUT NOT TO MATTER. This file used to warn that
   TikTok gates scheduling to Creator and Business accounts and that a
   personal account could not be scheduled to by anyone, Buffer included.
   Ten posts scheduled on 2026-08-27 against an account that was still
   personal say otherwise. The switch is still worth making — it is what
   gives a clickable Website field below 1,000 followers — but it does not
   block anything here.

   MEDIA MUST BE PUBLICLY HOSTED. Buffer's API takes a URL, never a file
   upload, and it fetches that URL when the post publishes — which for a
   scheduled post is days later. A link that dies in the meantime is a post
   that fails silently. Gofile is therefore the wrong host here: it expires
   unclaimed guest content. This repo's answer is clips/wrangler.jsonc, an
   assets-only Worker serving video/out/ at clips.tareeq.workers.dev — read
   that file before choosing anything else, it records what was ruled out.
   Whatever you use, it has to still be serving on the last dueAt below.

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
  /* `channels` takes a required organizationId, so the account has to be
     queried first — there is no way to list channels from a token alone.
     Verified against a live token 2026-08-27; the published guide for this
     404s, so the shape here is what the API actually answers, not a guess.

     The whole object is printed, not just the fields named here: the point of
     this subcommand is to discover the real shape on a live account. */
  const {account} = await gql(`query { account { id email organizations { id name } } }`);
  const orgs = account.organizations ?? [];
  if (!orgs.length) { console.error("no organizations on this account"); process.exit(1); }
  console.log(`account ${account.email}`);
  for (const org of orgs) {
    const data = await gql(
      `query Channels($input: ChannelsInput!) {
         channels(input: $input) { id name service type isDisconnected isLocked timezone }
       }`,
      {input: {organizationId: org.id}},
    );
    console.log(`\norganization ${org.name} (${org.id})`);
    console.log(JSON.stringify(data.channels, null, 2));
  }
  process.exit(0);
}

/* ---- reading the queue -------------------------------------------------- */

/* Buffer caps SCHEDULED (not published) posts per channel — 10 on the free
   tier. Queuing a batch past that fails every post with "Scheduled posts
   limit reached": a wasted round trip, and a partial success if the cap is
   hit halfway. So --top-up reads what is already queued, works out how many
   slots are free and which clips are not in it, and fills exactly that many.

   Idempotent on purpose — run it as often as you like. Matching is on the
   caption's first line, which is the hook and unique per clip, so nothing is
   ever queued twice. */
const ORG = flag("org");
const TOP_UP = argv.includes("--top-up");
const LIMIT = Number(flag("limit", "10"));

const listQueued = async () => {
  const query = `query Q($input: PostsInput!) {
    posts(first: 100, input: $input) { edges { node { id status dueAt text } } }
  }`;
  const input = {
    ...(ORG ? {organizationId: ORG} : {}),
    filter: {channelIds: [channelId], status: ["scheduled", "sending", "draft"]},
  };
  const d = await gql(query, {input});
  return (d.posts?.edges ?? []).map((e) => e.node);
};

const firstLine = (t) => (t ?? "").split("\n")[0].trim();

/* ---- scheduling -------------------------------------------------------- */
const channelId = flag("channel");
const mediaBase = flag("media-base");
if (!channelId || !mediaBase) {
  console.error("usage: --channel <id> --media-base <public-url-prefix> [--ids a,b] " +
                "[--start <ISO8601>] [--every <hours>] [--no-ai-disclosure]\n" +
                "       [--top-up [--limit N]] [--org <id>] [--skip-media-check] [--go]\n" +
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

let posts = parsePosts().filter((p) => (only ? only.has(p.id) || only.has(p.id.replace(/-ku$/, "")) : true));
if (!posts.length) { console.error("no clips matched --ids"); process.exit(2); }

let startFrom = null;
if (TOP_UP) {
  const queued = await listQueued();
  const queuedLines = new Set(queued.map((p) => firstLine(p.text)));
  const free = Math.max(0, LIMIT - queued.length);
  const lastDue = queued.map((p) => p.dueAt).filter(Boolean).sort().at(-1);

  console.log(`queue: ${queued.length}/${LIMIT} used, ${free} free` +
    (lastDue ? `, last scheduled ${lastDue}` : ""));
  const pending = posts.filter((p) => !queuedLines.has(firstLine(p.caption)));
  console.log(`${posts.length - pending.length} of the requested clips are already queued`);

  if (!free) {
    console.log("\nnothing to do — the queue is full. Run again once a post has published.");
    process.exit(0);
  }
  if (!pending.length) { console.log("\nnothing left to queue."); process.exit(0); }
  posts = pending.slice(0, free);
  /* Continue from the end of the queue, not from --start, so a top-up never
     lands on a day that already has a post on it. */
  if (lastDue) startFrom = new Date(new Date(lastDue).getTime() + everyHours * 3600_000);
  console.log(`queuing ${posts.length}\n`);
}

const MUTATION = `
mutation Schedule($input: CreatePostInput!) {
  createPost(input: $input) {
    ... on PostActionSuccess { post { id dueAt } }
    ... on MutationError { message }
  }
}`;

/* Preflight the media before anything is scheduled.

   Buffer fetches the video WHEN THE POST PUBLISHES, which for a scheduled
   post is days later. A URL that 404s produces a post that fails quietly
   long after you stopped watching — and this project has already lost
   ~1,400 views to exactly that shape of bug, twice (a typo'd bio link, and
   a gofile handoff that expires). Checking now costs one HEAD per clip.

   It is also the guard against the easy mistake here: only the batch you
   have rendered and deployed is hosted, so running without --ids happily
   builds URLs for clips that were never uploaded. */
const preflight = async () => {
  const bad = [];
  for (const p of posts) {
    const url = mediaUrl(p);
    try {
      const r = await fetch(url, {method: "HEAD"});
      const type = r.headers.get("content-type") ?? "";
      const ok = r.ok && type.startsWith("video/");
      if (!ok) bad.push(`${p.nn} ${p.id}: HTTP ${r.status} ${type || "(no content-type)"}`);
    } catch (e) {
      bad.push(`${p.nn} ${p.id}: ${e.message}`);
    }
  }
  return bad;
};

const mediaUrl = (p) => `${mediaBase.replace(/\/$/, "")}/${p.nn}-${p.id}.mp4`;

const bad = argv.includes("--skip-media-check") ? [] : await preflight();
if (bad.length) {
  console.error(`media not reachable for ${bad.length} of ${posts.length} clips:`);
  for (const b of bad) console.error(`  ✗ ${b}`);
  console.error("\nBuffer fetches the video when the post publishes, not now, so these\n" +
                "would fail quietly days from now. Render and deploy them first\n" +
                "(clips/stage.mjs then wrangler deploy -c clips/wrangler.jsonc), or\n" +
                "narrow the run with --ids. --skip-media-check overrides.");
  process.exit(1);
}
console.log(`media check: ${posts.length}/${posts.length} reachable at ${mediaBase}\n`);

let n = 0, failed = 0;
for (const p of posts) {
  const base = startFrom ?? startAt;
  const dueAt = new Date(base.getTime() + n * everyHours * 3600_000).toISOString();
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
        url: mediaUrl(p),
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
