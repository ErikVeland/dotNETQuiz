/**
 * Comprehensive script to verify our Render configuration changes for both frontend and backend
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

function verifyFullRenderConfig() {
  console.log('=== Verifying Full Render Configuration Changes ===\n');
  
  try {
    // Check 1: render.yaml updates
    console.log('1. Checking render.yaml updates...');
    const renderYamlPath = path.join(__dirname, '..', 'render.yaml');
    const renderYamlContent = fs.readFileSync(renderYamlPath, 'utf8');
    const renderConfig = yaml.load(renderYamlContent);
    
    let allChecksPassed = true;
    
    // Check frontend service configuration
    const frontendService = renderConfig.services.find(service => service.name === 'fullstack-academy-frontend');
    if (frontendService) {
      if (frontendService.runtime === 'node') {
        console.log('  ✓ Frontend service updated to use Node runtime instead of Docker');
      } else {
        console.log('  ✗ Frontend service not updated correctly - runtime is:', frontendService.runtime);
        allChecksPassed = false;
      }
      
      if (frontendService.buildCommand) {
        console.log('  ✓ Frontend service includes build command:', frontendService.buildCommand);
      } else {
        console.log('  ✗ Frontend service missing build command');
        allChecksPassed = false;
      }
      
      if (frontendService.startCommand) {
        console.log('  ✓ Frontend service includes start command:', frontendService.startCommand);
      } else {
        console.log('  ✗ Frontend service missing start command');
        allChecksPassed = false;
      }
    } else {
      console.log('  ✗ Frontend service not found in render.yaml');
      allChecksPassed = false;
    }
    
    // Check backend service configuration
    const backendService = renderConfig.services.find(service => service.name === 'fullstack-academy-backend');
    if (backendService) {
      if (backendService.runtime === 'dotnet') {
        console.log('  ✓ Backend service updated to use .NET runtime instead of Docker');
      } else {
        console.log('  ✗ Backend service not updated correctly - runtime is:', backendService.runtime);
        allChecksPassed = false;
      }
      
      if (backendService.buildCommand) {
        console.log('  ✓ Backend service includes build command:', backendService.buildCommand);
      } else {
        console.log('  ✗ Backend service missing build command');
        allChecksPassed = false;
      }
      
      if (backendService.startCommand) {
        console.log('  ✓ Backend service includes start command:', backendService.startCommand);
      } else {
        console.log('  ✗ Backend service missing start command');
        allChecksPassed = false;
      }
    } else {
      console.log('  ✗ Backend service not found in render.yaml');
      allChecksPassed = false;
    }
    
    // Check 2: Dockerfiles renamed
    console.log('\n2. Checking Dockerfile handling...');
    
    const frontendDockerfilePath = path.join(__dirname, '..', 'dot-net-quiz', 'frontend', 'Dockerfile');
    const frontendDockerfileRenderPath = path.join(__dirname, '..', 'dot-net-quiz', 'frontend', 'Dockerfile.render');
    
    if (!fs.existsSync(frontendDockerfilePath) && fs.existsSync(frontendDockerfileRenderPath)) {
      console.log('  ✓ Frontend Dockerfile renamed to Dockerfile.render');
    } else {
      console.log('  ✗ Frontend Dockerfile not properly renamed');
      allChecksPassed = false;
    }
    
    const backendDockerfilePath = path.join(__dirname, '..', 'dot-net-quiz', 'backend', 'Dockerfile');
    const backendDockerfileRenderPath = path.join(__dirname, '..', 'dot-net-quiz', 'backend', 'Dockerfile.render');
    
    if (!fs.existsSync(backendDockerfilePath) && fs.existsSync(backendDockerfileRenderPath)) {
      console.log('  ✓ Backend Dockerfile renamed to Dockerfile.render');
    } else {
      console.log('  ✗ Backend Dockerfile not properly renamed');
      allChecksPassed = false;
    }
    
    // Check 3: Frontend package.json scripts
    console.log('\n3. Checking frontend package.json scripts...');
    const frontendPackageJsonPath = path.join(__dirname, '..', 'dot-net-quiz', 'frontend', 'package.json');
    const frontendPackageJsonContent = fs.readFileSync(frontendPackageJsonPath, 'utf8');
    const frontendPackageJson = JSON.parse(frontendPackageJsonContent);
    
    if (frontendPackageJson.scripts && frontendPackageJson.scripts.start) {
      console.log('  ✓ Frontend package.json has start script');
    } else {
      console.log('  ✗ Frontend package.json missing start script');
      allChecksPassed = false;
    }
    
    if (frontendPackageJson.scripts && frontendPackageJson.scripts.build) {
      console.log('  ✓ Frontend package.json has build script');
    } else {
      console.log('  ✗ Frontend package.json missing build script');
      allChecksPassed = false;
    }
    
    console.log('\n=== Verification Summary ===');
    if (allChecksPassed) {
      console.log('🎉 All Render configuration changes verified successfully!');
      console.log('\nSummary of changes:');
      console.log('- Updated render.yaml to use Node runtime for frontend and .NET runtime for backend');
      console.log('- Added buildCommand and startCommand to both services');
      console.log('- Renamed Dockerfiles to prevent Render from using them');
      console.log('- Verified package.json has required scripts');
      console.log('- This should resolve the Docker registry authentication issues');
      return true;
    } else {
      console.log('❌ Some verification checks failed. Please review the issues above.');
      return false;
    }
    
  } catch (error) {
    console.error('❌ Verification failed:', error.message);
    return false;
  }
}

// Run verification if this script is executed directly
if (require.main === module) {
  const success = verifyFullRenderConfig();
  process.exit(success ? 0 : 1);
}

module.exports = { verifyFullRenderConfig };