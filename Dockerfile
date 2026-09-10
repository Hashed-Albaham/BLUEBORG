# Coolify production image for the BTUC CMS prototype.
# The repository is a monorepo; the deployable application lives in btuc-cms-prototype.

FROM node:22-bookworm-slim AS build

WORKDIR /app
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0

RUN corepack enable

COPY btuc-cms-prototype/package.json btuc-cms-prototype/pnpm-lock.yaml ./
COPY btuc-cms-prototype/patches ./patches
RUN pnpm install --frozen-lockfile

COPY btuc-cms-prototype/ ./
RUN pnpm build

FROM node:22-bookworm-slim AS runtime

WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0

COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# Coolify may override PORT at runtime; server/index.ts reads process.env.PORT.
EXPOSE 3000

CMD ["node", "dist/index.js"]
