# Coolify Deployment Guide — Maussollos AR

This app ships as a single Node container: an Express server (`server/index.ts`,
bundled to `dist/index.js`) that serves the built Vite client from `dist/public`
and falls back to `index.html` for client-side routing.

## Files added for Coolify

| File | Purpose |
|------|---------|
| `Dockerfile` | Multi-stage build (pnpm install → build → slim runtime). |
| `.dockerignore` | Keeps the build context small; excludes secrets, `dist`, `node_modules`. |
| `.env.example` | Template (only the optional `PORT` override). |
| `patches/wouter@3.7.1.patch` | **Recovered** — required by `pnpm-lock.yaml`; build fails without it. |

## Quick start in Coolify

1. **New Resource → Application → Public/Private Git Repository.**
   Point it at `https://github.com/ubterzioglu/hazal` (branch `main`).
2. **Build Pack:** select **Dockerfile**. Coolify auto-detects the root `Dockerfile`.
3. **Port:** set the exposed port to **3000** (the server reads `PORT`, defaults to 3000).
4. **Deploy.** Coolify builds the image and runs `node dist/index.js`.
5. Attach a domain and Coolify will provision HTTPS (Let's Encrypt) automatically.
   HTTPS matters here because the AR / camera features require a secure context.

No environment variables are required to build or run the app.

## Health check

The image defines a `HEALTHCHECK` that GETs `/`. Coolify will surface container
health from it. No extra config needed.

## Local verification (optional)

```bash
docker build -t maussollos-ar .
docker run --rm -p 3000:3000 maussollos-ar
# open http://localhost:3000
```

## Notes

- The old Vercel deployment served a stale build that loaded a placeholder
  `Astronaut.glb` (404 in console) via Google model-viewer. The current code
  uses a Sketchfab embed, so a fresh deploy (Coolify or a new Vercel build)
  no longer triggers that 404.
- The umami analytics `<script>` was removed from `client/index.html`; it was
  pointing at an unset `%VITE_ANALYTICS_ENDPOINT%` placeholder and caused the
  `umami` / `ERR_HTTP2_PROTOCOL_ERROR` console error.
- `vercel.json` is left in place; it only affects Vercel and is ignored by the
  Docker build.
