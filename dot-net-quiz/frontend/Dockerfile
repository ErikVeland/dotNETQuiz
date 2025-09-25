# Dockerfile for Next.js Frontend
# Using a minimal approach with proper path resolution and optimized for Render deployment
FROM node:18-alpine AS deps
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Rebuild the source code only when needed
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM node:18-alpine AS runner
WORKDIR /app

# Create a non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set environment variables
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV NEXT_PUBLIC_API_BASE=https://fullstack-academy-backend.onrender.com
ENV PORT=3000

# Expose port
EXPOSE 3000

# Change ownership of the files to the nextjs user
RUN chown -R nextjs:nodejs ./

# Switch to the non-root user
USER nextjs

# Start the application
CMD ["node", "server.js"]