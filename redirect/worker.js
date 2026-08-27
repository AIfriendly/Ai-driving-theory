/* t.tareeq.workers.dev -> ai-driving-theory.tareeq.workers.dev
 *
 * Exists because TikTok gives this account no clickable bio link, so the URL
 * is text a viewer reads off a video and types by hand. At that point the
 * length of the address IS the conversion rate: 36 characters with a hyphen,
 * a subdomain and a .dev TLD is a lot to ask, and 20 is less. A bought domain
 * would be better still (tareeq.krd is 10) — this is the free stopgap, not
 * the destination.
 *
 * Deliberately a REDIRECT rather than a second copy of the app. Two
 * deployments of a 2 MB file would drift apart, and the main Worker stays the
 * single source of truth for what is live.
 *
 * 302, not 301. A permanent redirect is cached hard by browsers and is
 * effectively unrecallable — and the whole point of this host is that it is
 * temporary, to be repointed at a real domain later. 301 here would poison
 * the caches of exactly the people who used the link earliest.
 *
 * NOTE ON THE FREE PLAN: unlike the assets-only main Worker, this one has a
 * script, so its requests DO count against the 100,000/day limit. At this
 * traffic that is irrelevant — the account has served ~1,400 video views
 * total — but it is the reason the main Worker has no script and should not
 * grow one.
 */

const TARGET = "https://ai-driving-theory.tareeq.workers.dev";

export default {
  fetch(request) {
    const from = new URL(request.url);
    /* Carry the path and query across, so /ad.html and any future deep link
       survive the hop instead of all landing on the homepage. */
    const to = new URL(from.pathname + from.search, TARGET);
    return Response.redirect(to.toString(), 302);
  },
};
