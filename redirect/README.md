# `t.tareeq.workers.dev` — the short link

A second Worker whose only job is to redirect to the app.

```
t.tareeq.workers.dev                    20 characters
ai-driving-theory.tareeq.workers.dev    36
tareeq.krd                              10   ← still the real answer
```

## Why this exists

TikTok gives this account **no clickable bio link** — checked in the iOS app,
on desktop web and in a mobile browser, three separate rendering paths, no
link field anywhere. So the URL is text somebody reads off the end of a video
and types by hand.

At that point the length of the address *is* the conversion rate. This is the
free stopgap. **A bought domain is still the fix** — see `docs/PROGRESS.md`.

## Deploying it

The main Worker deploys from a Cloudflare dashboard build that runs
`npx wrangler deploy` at the repo root. This one is separate and never
changes, so pasting it into the dashboard editor is less setup than wiring a
second build:

1. **Workers & Pages → Create application → "Start with Hello World!"**

   > **Not "Continue with GitHub".** That path exists on the same screen and
   > looks like the obvious choice, but it builds *this repo* with
   > `npx wrangler deploy`, which reads the **root** `wrangler.jsonc` and
   > redeploys the live main Worker under a second build project. It also
   > pre-fills the project name as `ai-driving-theory`, so the screen looks
   > correct right up until it stands on top of production. This Worker is ten
   > lines that will never change; it does not need a git pipeline.

2. Name it **`t`** — the name *is* the subdomain label, which is the entire
   point. If `t` is taken, use `krd` (22 characters). Anything longer is not
   worth deploying.
3. Deploy the placeholder, then **Edit code**, replace the Hello World body
   with `worker.js` from this directory, and deploy again.
4. **Check `··· → Settings → Domains & Routes` and enable the `workers.dev`
   route.** New Workers ship with it **disabled**, so a correct deploy serves
   nothing and looks exactly like a broken one. This cost real time on the
   main Worker already — the gotcha is in `docs/PROGRESS.md`.
5. Verify before putting it anywhere:
   ```sh
   curl -sI https://t.tareeq.workers.dev/ | head -3
   # expect: HTTP/2 302
   #         location: https://ai-driving-theory.tareeq.workers.dev/
   ```

From a machine with wrangler authenticated, the same thing is:

```sh
npx wrangler deploy -c redirect/wrangler.jsonc
```

**If you ever do want it git-connected**, the GitHub path works — but only
with *both* fields changed: project name `t`, and deploy command
`npx wrangler deploy -c redirect/wrangler.jsonc`. And note the production
branch defaults to the repo's default branch, so `redirect/` has to exist
*there* first. On a branch where it does not, the build fails with a missing
config rather than doing anything dangerous.

## Two things about it that are deliberate

**It redirects rather than serving a second copy of the app.** Two deployments
of a 2 MB file drift apart; the main Worker stays the single source of truth.

**302, not 301.** A permanent redirect is cached hard by browsers and is
effectively unrecallable. The whole point of this host is that it is
temporary — to be repointed at a real domain later — and a 301 would poison
the caches of exactly the people who used the link earliest.

## The one cost

The main Worker is assets-only and has no script, so its requests do not count
against the Workers Free plan's 100,000/day limit. **This one has a script, so
its requests do count.** At current traffic (~1,400 video views total, ever)
that is irrelevant, but it is the reason the main Worker has no script and
should not grow one.
