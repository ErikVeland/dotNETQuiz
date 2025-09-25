# Dockerfile for Next.js Frontend
# Simpler approach to avoid module resolution issues
FROM node:18-alpine
WORKDIR /app

# Copy all files
COPY . .

# Install dependencies
RUN npm ci

# Build the application
RUN npm run build

# Install production dependencies only
RUN npm ci --only=production && npm cache clean --force

# Set environment variables
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV NEXT_PUBLIC_API_BASE=https://fullstack-academy-backend.onrender.com
ENV PORT=3000

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]