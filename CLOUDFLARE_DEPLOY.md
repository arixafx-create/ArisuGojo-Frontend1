# Deploy ArisuGojo frontend to Cloudflare Pages

The frontend is configured for **Cloudflare Pages** using
[`@cloudflare/next-on-pages`](https://github.com/cloudflare/next-on-pages).
All server-rendered pages already use `export const runtime = "edge"`.

## Option A — Deploy via the Cloudflare Dashboard (recommended)

1. Push this repo to GitHub / GitLab.
2. In the Cloudflare dashboard go to **Workers & Pages → Create → Pages → Connect to Git**.
3. Pick the repository. When asked for the build settings, use:
   - **Framework preset:** *Next.js*
   - **Build command:** `npx @cloudflare/next-on-pages@1`
   - **Build output directory:** `.vercel/output/static`
   - **Root directory:** `frontend` (only if you deploy the monorepo — otherwise leave blank)
4. Add environment variables (**Settings → Environment variables**):
   - `NEXT_PUBLIC_API_URL` — your Railway backend URL (e.g. `https://arisugojo-backend.up.railway.app`)
   - `NEXT_PUBLIC_SITE_URL` — your public Cloudflare Pages URL (e.g. `https://arisugojo.pages.dev`)
   - `NODE_VERSION` — `20`
5. In **Settings → Functions → Compatibility flags**, add: `nodejs_compat`
   (both Production and Preview).
6. Deploy. First build usually takes ~2 minutes.

## Option B — Deploy from your machine with Wrangler

```bash
cd frontend
npm install
npm run pages:build
npx wrangler pages deploy .vercel/output/static --project-name arisugojo
```

Wrangler will prompt for a Cloudflare login the first time.

## Post-deploy

- Update the Railway backend `FRONTEND_ORIGIN` env var to include your
  Cloudflare URL, e.g. `FRONTEND_ORIGIN=https://arisugojo.pages.dev`. Redeploy
  Railway so CORS accepts the new origin.
- Visit `/admin/login` and sign in with `ADMIN_EMAIL` / `ADMIN_PASSWORD`.

## Local preview

```bash
npm run preview
```

That builds for Pages and runs it locally under Miniflare on port 8788.
