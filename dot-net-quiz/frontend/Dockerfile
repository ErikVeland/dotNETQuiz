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

# Use the PORT environment variable provided by Render.com, default to 3000
CMD ["node", "server.js"]