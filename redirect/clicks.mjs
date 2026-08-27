/* Daily request counts for the short link — the only honest measure of
   whether any of this reaches the app.

   WHY THIS EXISTS. Views are vanity; clicks are the funnel. Buffer's API does
   not return analytics at all ("we don't currently offer your analytics or
   insights data through the API"), and even Buffer's UI has no watch time,
   retention or traffic source for TikTok, because TikTok does not give those
   to third parties. So the numbers that would tell us whether the clips work
   are not obtainable programmatically from anywhere.

   What IS obtainable is this. The main site is assets-only, so its requests
   are free and uncounted — but t.tareeq.workers.dev has a script, so every
   hit on it is counted. That number is people who saw a clip, remembered a
   URL and typed it: a far better signal than an impression.

   ATTRIBUTION COMES FREE FROM THE CADENCE. Posting one clip a day means a
   spike on day N belongs to the clip posted on day N. No tracking, no
   per-clip URLs, no consent banner — just the daily count read against the
   posting schedule. It is the strongest argument for one-a-day.

     CLOUDFLARE_API_TOKEN=... node redirect/clicks.mjs [days]

   The token needs only **Account Analytics: Read** — NOT the Workers Scripts:
   Edit token used to deploy. Use a separate read-only one and keep it; it can
   change nothing. */

const TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const ACCOUNT = process.env.CLOUDFLARE_ACCOUNT_ID ?? "32213f3ae8854532c5846b209ff2ea55";
if (!TOKEN) { console.error("CLOUDFLARE_API_TOKEN is not set (needs Account Analytics: Read)"); process.exit(2); }

const days = Number(process.argv[2] ?? 30);
const since = new Date(Date.now() - days * 86400_000).toISOString();

const query = `query($account: String!, $since: Time!) {
  viewer { accounts(filter: {accountTag: $account}) {
    workersInvocationsAdaptive(limit: 1000, filter: {datetime_geq: $since},
                               orderBy: [date_ASC]) {
      sum { requests }
      dimensions { date scriptName }
    }
  } }
}`;

const res = await fetch("https://api.cloudflare.com/client/v4/graphql", {
  method: "POST",
  headers: {Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json"},
  body: JSON.stringify({query, variables: {account: ACCOUNT, since}}),
});
const j = await res.json();
if (j.errors) { console.error(j.errors.map((e) => e.message).join("; ")); process.exit(1); }

const rows = j.data?.viewer?.accounts?.[0]?.workersInvocationsAdaptive ?? [];
if (!rows.length) { console.log(`no requests recorded in the last ${days} days`); process.exit(0); }

/* Grouped by script so the short link and anything added later stay separate;
   the assets-only main site never appears here, by design. */
const byScript = new Map();
for (const r of rows) {
  const m = byScript.get(r.dimensions.scriptName) ?? new Map();
  m.set(r.dimensions.date, (m.get(r.dimensions.date) ?? 0) + r.sum.requests);
  byScript.set(r.dimensions.scriptName, m);
}

for (const [script, byDate] of byScript) {
  const total = [...byDate.values()].reduce((a, b) => a + b, 0);
  const peak = Math.max(...byDate.values());
  console.log(`\n${script}  —  ${total} requests over ${byDate.size} day(s)\n`);
  for (const [date, n] of [...byDate].sort()) {
    /* 40 columns of bar, scaled to the busiest day, so a spike is visible
       without reading the numbers. */
    const bar = "█".repeat(Math.max(n > 0 ? 1 : 0, Math.round((n / peak) * 40)));
    console.log(`  ${date}  ${String(n).padStart(5)}  ${bar}`);
  }
}
console.log("\nOne clip a day means a spike belongs to that day's clip.");
