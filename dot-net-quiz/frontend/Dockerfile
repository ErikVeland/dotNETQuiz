# Dockerfile for Next.js Frontend
# Using a minimal approach with proper path resolution
FROM node:18-alpine3.18
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Environment variables
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV NEXT_PUBLIC_API_BASE=https://fullstack-academy-backend.onrender.com
ENV PORT=3000

EXPOSE 3000

# Start the application
CMD ["npm", "start"]