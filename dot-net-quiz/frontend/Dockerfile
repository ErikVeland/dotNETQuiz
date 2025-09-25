# Dockerfile for Next.js Frontend
# Using a minimal approach with a base image that should work
FROM node:18-alpine3.18
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --production

# Copy source and build
COPY . .
RUN npm run build

# Environment variables
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV NEXT_PUBLIC_API_BASE=https://fullstack-academy-backend.onrender.com
ENV PORT=3000

EXPOSE 3000

# Start the application
CMD ["npm", "start"]