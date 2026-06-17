# syntax=docker/dockerfile:1

###############################################################################
# Maussollos AR — production image for Coolify (Node + Express)
#
# Build layout produced by `pnpm build`:
#   - vite build           -> dist/public/   (static client assets + index.html)
#   - esbuild server/...   -> dist/index.js  (Express server, ESM)
# At runtime the server serves dist/public and falls back to index.html for
# client-side routing (wouter).
###############################################################################

# ---- Base: pnpm via corepack -------------------------------------------------
FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

# ---- Dependencies (cached) ---------------------------------------------------
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
# patches/ is referenced by package.json pnpm.patchedDependencies; copy if present.
COPY patches/ ./patches/
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

# ---- Build -------------------------------------------------------------------
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# ---- Production deps only ----------------------------------------------------
FROM base AS prod-deps
COPY package.json pnpm-lock.yaml ./
COPY patches/ ./patches/
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile --prod

# ---- Runtime -----------------------------------------------------------------
FROM node:22-slim AS runtime
ENV NODE_ENV=production
ENV PORT=3000
WORKDIR /app

# Server bundles its deps as external, so it needs node_modules at runtime.
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json ./

# Run as the unprivileged node user shipped in the base image.
USER node

EXPOSE 3000

# Lightweight healthcheck hitting the SPA root.
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://127.0.0.1:'+(process.env.PORT||3000)+'/',r=>process.exit(r.statusCode<500?0:1)).on('error',()=>process.exit(1))"

CMD ["node", "dist/index.js"]
