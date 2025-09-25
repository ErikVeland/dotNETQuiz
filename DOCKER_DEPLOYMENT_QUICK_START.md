# Docker Deployment Quick Start Guide

## 🚀 Quick Deployment Steps

### 1. Verify Current Configuration
```bash
# Check that Dockerfiles are properly configured
node scripts/verify-dockerfiles.js
```

### 2. Deploy with Current Dockerfiles
```bash
# Commit and push changes
git add .
git commit -m "Fix Docker authentication issues"
git push origin main

# Trigger deployment on Render (happens automatically on push)
```

### 3. If Authentication Issues Persist
```bash
# Switch to alternative Dockerfiles
node scripts/switch-dockerfiles.js --alternative

# Commit and push changes
git add .
git commit -m "Switch to alternative Dockerfiles"
git push origin main
```

## 📋 What's Been Fixed

### Docker Authentication Issues
- **Problem**: `401 Unauthorized` when pulling base images
- **Solution**: Optimized Dockerfiles with more stable base images

### Base Image Updates
- **Frontend**: `node:18-alpine` (more stable than `node:20-alpine`)
- **Backend**: `.NET 8.0 Alpine` (more stable than `.NET 9.0`)

### Security Improvements
- Added non-root user for frontend container
- Optimized build processes to reduce image size
- Cleaner separation of build and runtime stages

## 🛠️ Troubleshooting

### Authentication Errors Continue
1. Clear build cache in Render dashboard
2. Switch to alternative Dockerfiles:
   ```bash
   node scripts/switch-dockerfiles.js --alternative
   ```
3. Contact Render support

### Build Failures
1. Check deployment logs for specific error messages
2. Verify Dockerfile syntax:
   ```bash
   # For frontend
   docker run --rm -v $(pwd)/dot-net-quiz/frontend:/app -w /app node:18-alpine sh -c "npm install && npm run build"
   
   # For backend
   docker run --rm -v $(pwd)/dot-net-quiz/backend:/app -w /app mcr.microsoft.com/dotnet/sdk:8.0-alpine dotnet build
   ```

### Performance Issues
1. Check if build cache is working properly
2. Verify resource allocation in Render dashboard
3. Optimize application code if needed

## 📁 File Structure

```
dot-net-quiz/
├── frontend/
│   ├── Dockerfile          # Standard optimized Dockerfile
│   ├── Dockerfile.alternative  # Alternative approach
│   └── ...
├── backend/
│   ├── Dockerfile          # Standard optimized Dockerfile
│   ├── Dockerfile.alternative  # Alternative approach
│   └── ...
scripts/
├── switch-dockerfiles.js    # Switch between Dockerfile versions
├── verify-dockerfiles.js    # Verify Dockerfile configurations
└── ...
```

## 🎯 Success Criteria

After deployment, you should see:
- ✅ No Docker registry authentication errors
- ✅ Successful image builds
- ✅ Services starting correctly
- ✅ Application accessible via browser
- ✅ All existing functionality working

## 🆘 Need Help?

1. **Check deployment logs** in Render dashboard
2. **Run verification script**:
   ```bash
   node scripts/verify-dockerfiles.js
   ```
3. **Switch Dockerfile versions**:
   ```bash
   node scripts/switch-dockerfiles.js --alternative
   ```
4. **Contact support** if issues persist

## 📚 Documentation

- [Docker Authentication Fix Guide](DOCKER_AUTH_FIX.md)
- [Complete Docker Solution](COMPLETE_DOCKER_SOLUTION.md)
- [Deployment Readiness Checklist](DEPLOYMENT_READINESS_CHECKLIST.md)

This quick start guide should help you deploy successfully with the new Docker configuration that resolves the authentication issues.