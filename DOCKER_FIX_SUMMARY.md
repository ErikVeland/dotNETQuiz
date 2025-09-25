# Docker Registry Authentication Issue Fix

## Problem
Render was encountering a "401 Unauthorized" error when trying to pull Docker images from Docker Hub:
```
unexpected status from HEAD request to https://registry-1.docker.io/v2/library/node/manifests/20-alpine: 401 Unauthorized
```

## Root Cause
Render was attempting to build Docker images even though we configured the services to use native runtimes. This happened because:
1. Dockerfiles existed in both frontend and backend directories
2. When a Dockerfile is present, Render prioritizes Docker builds over native runtimes
3. Render was having authentication issues with Docker Hub when pulling base images

## Solution Implemented

### 1. Updated render.yaml Configuration
Changed both services to use native runtimes instead of Docker:

**Frontend Service:**
- Changed `runtime` from `docker` to `node`
- Added `buildCommand: npm install && npm run build`
- Added `startCommand: npm start`

**Backend Service:**
- Changed `runtime` from `docker` to `dotnet`
- Added `buildCommand: dotnet publish -c Release`
- Added `startCommand: dotnet backend.dll`

### 2. Renamed Dockerfiles
To prevent Render from automatically using Docker builds:
- Renamed `dot-net-quiz/frontend/Dockerfile` to `Dockerfile.render`
- Renamed `dot-net-quiz/backend/Dockerfile` to `Dockerfile.render`

### 3. Verification
Created and ran verification scripts to ensure all changes were correctly applied:
- Verified render.yaml configuration changes
- Confirmed Dockerfiles were renamed
- Checked that package.json contains required scripts

## Expected Outcome
These changes should resolve the Docker registry authentication issues by:
1. Using Render's native runtimes instead of Docker builds
2. Eliminating the need to pull base images from Docker Hub
3. Allowing Render to manage the build and runtime environments directly

The application should now deploy successfully without encountering the 401 Unauthorized errors.