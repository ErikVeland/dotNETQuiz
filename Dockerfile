# Multi-stage Dockerfile for Fullstack Academy

# Stage 1: Build the .NET backend
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS backend-build
WORKDIR /src
COPY dot-net-quiz/backend/backend.csproj ./dot-net-quiz/backend/
RUN dotnet restore ./dot-net-quiz/backend/backend.csproj
COPY dot-net-quiz/backend/. ./dot-net-quiz/backend/
WORKDIR /src/dot-net-quiz/backend
RUN dotnet publish backend.csproj -c Release -o /app/backend

# Stage 2: Build the Next.js frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app
COPY dot-net-quiz/frontend/package*.json ./dot-net-quiz/frontend/
WORKDIR /app/dot-net-quiz/frontend
RUN npm ci
COPY dot-net-quiz/frontend/. .
RUN npm run build

# Stage 3: Runtime image
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app

# Copy backend files
COPY --from=backend-build /app/backend ./backend

# Copy frontend build files
COPY --from=frontend-build /app/dot-net-quiz/frontend/.next ./frontend/.next
COPY --from=frontend-build /app/dot-net-quiz/frontend/public ./frontend/public
COPY --from=frontend-build /app/dot-net-quiz/frontend/package*.json ./frontend/

# Copy startup script
COPY start.sh .
RUN chmod +x start.sh

WORKDIR /app/frontend
RUN npm ci --only=production
WORKDIR /app

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/graphql || exit 1

# Start both backend and frontend
CMD ["./start.sh"]