# Dockerfile for Next.js Frontend
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy standalone output
COPY --from=builder /app/.next/standalone ./
# Copy public assets
COPY --from=builder /app/public ./public
# Copy .next/static for static assets
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

ENV PORT=3000
# server.js is created by next build from the standalone mode
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "server.js"]