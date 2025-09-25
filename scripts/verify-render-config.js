/**
 * Script to verify our Render configuration changes
 */

const fs = require('fs');
const path = require('path');

function verifyRenderConfig() {
  console.log('=== Verifying Render Configuration Changes ===\n');
  
  try {
    // Check 1: render.yaml updates
    console.log('1. Checking render.yaml updates...');
    const renderYamlPath = path.join(__dirname, '..', 'render.yaml');
    const renderYamlContent = fs.readFileSync(renderYamlPath, 'utf8');
    
    if (renderYamlContent.includes('runtime: node')) {
      console.log('  ✓ Frontend service updated to use Node runtime instead of Docker');
    } else {
      console.log('  ✗ Frontend service not updated correctly');
      return false;
    }
    
    if (renderYamlContent.includes('runtime: dotnet')) {
      console.log('  ✓ Backend service updated to use .NET runtime instead of Docker');
    } else {
      console.log('  ✗ Backend service not updated correctly');
      return false;
    }
    
    if (renderYamlContent.includes('buildCommand: npm install && npm run build')) {
      console.log('  ✓ Frontend service includes build command');
    } else {
      console.log('  ✗ Frontend service missing build command');
      return false;
    }
    
    if (renderYamlContent.includes('startCommand: npm start')) {
      console.log('  ✓ Frontend service includes start command');
    } else {
      console.log('  ✗ Frontend service missing start command');
      return false;
    }
    
    if (renderYamlContent.includes('buildCommand: dotnet publish -c Release')) {
      console.log('  ✓ Backend service includes build command');
    } else {
      console.log('  ✗ Backend service missing build command');
      return false;
    }
    
    if (renderYamlContent.includes('startCommand: dotnet backend.dll')) {
      console.log('  ✓ Backend service includes start command');
    } else {
      console.log('  ✗ Backend service missing start command');
      return false;
    }
    
    // Check 2: Dockerfiles renamed
    console.log('\n2. Checking Dockerfile handling...');
    
    const frontendDockerfilePath = path.join(__dirname, '..', 'dot-net-quiz', 'frontend', 'Dockerfile');
    const frontendDockerfileRenderPath = path.join(__dirname, '..', 'dot-net-quiz', 'frontend', 'Dockerfile.render');
    
    if (!fs.existsSync(frontendDockerfilePath) && fs.existsSync(frontendDockerfileRenderPath)) {
      console.log('  ✓ Frontend Dockerfile renamed to Dockerfile.render');
    } else {
      console.log('  ✗ Frontend Dockerfile not properly renamed');
      return false;
    }
    
    const backendDockerfilePath = path.join(__dirname, '..', 'dot-net-quiz', 'backend', 'Dockerfile');
    const backendDockerfileRenderPath = path.join(__dirname, '..', 'dot-net-quiz', 'backend', 'Dockerfile.render');
    
    if (!fs.existsSync(backendDockerfilePath) && fs.existsSync(backendDockerfileRenderPath)) {
      console.log('  ✓ Backend Dockerfile renamed to Dockerfile.render');
    } else {
      console.log('  ✗ Backend Dockerfile not properly renamed');
      return false;
    }
    
    // Check 3: package.json has required scripts
    console.log('\n3. Checking package.json scripts...');
    const packageJsonPath = path.join(__dirname, '..', 'dot-net-quiz', 'frontend', 'package.json');
    const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
    const packageJson = JSON.parse(packageJsonContent);
    
    if (packageJson.scripts && packageJson.scripts.start) {
      console.log('  ✓ package.json has start script');
    } else {
      console.log('  ✗ package.json missing start script');
      return false;
    }
    
    if (packageJson.scripts && packageJson.scripts.build) {
      console.log('  ✓ package.json has build script');
    } else {
      console.log('  ✗ package.json missing build script');
      return false;
    }
    
    console.log('\n🎉 All Render configuration changes verified successfully!');
    console.log('\nSummary of changes:');
    console.log('- Updated render.yaml to use Node runtime for frontend and .NET runtime for backend');
    console.log('- Added buildCommand and startCommand to both services');
    console.log('- Renamed Dockerfiles to prevent Render from using them');
    console.log('- Verified package.json has required scripts');
    console.log('- This should resolve the Docker registry authentication issues');
    
    return true;
    
  } catch (error) {
    console.error('❌ Verification failed:', error.message);
    return false;
  }
}

// Run verification if this script is executed directly
if (require.main === module) {
  const success = verifyRenderConfig();
  process.exit(success ? 0 : 1);
}

module.exports = { verifyRenderConfig };