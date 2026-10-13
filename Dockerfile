# Production image for Google Cloud Run — built by `bash deploy/gcp-deploy.sh`.
# Three stages: install dependencies, build the site, then a small runtime
# image that only contains Next.js' standalone server.

FROM node:22-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Baked into the pages at build time: canonical URLs, sitemap, social share cards
ARG NEXT_PUBLIC_SITE_URL=https://www.thescalehouse.in
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=8080 \
    HOSTNAME=0.0.0.0
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/public ./public
# Unprivileged user that ships with the node image
USER node
EXPOSE 8080
CMD ["node", "server.js"]
