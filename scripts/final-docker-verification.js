/**
 * Final verification script for Docker configuration
 */

const fs = require('fs');
const path = require('path');

function finalDockerVerification() {
  console.log('=== Final Docker Configuration Verification ===\n');
  
  try {
    // Check frontend Dockerfile
    console.log('1. Checking frontend Dockerfile...');
    const frontendDockerfile = path.join(__dirname, '..', 'dot-net-quiz', 'frontend', 'Dockerfile');
    if (fs.existsSync(frontendDockerfile)) {
      const content = fs.readFileSync(frontendDockerfile, 'utf8');
      console.log('  ✓ Frontend Dockerfile exists');
      
      if (content.includes('FROM node:18-alpine3.18') || content.includes('FROM docker.io/library/node:18-alpine3.18')) {
        console.log('  ✓ Using node:18-alpine3.18 base image');
      } else if (content.includes('FROM node:')) {
        console.log('  ⚠ Using alternative Node.js base image');
      } else {
        console.log('  ✗ No recognizable Node.js base image found');
      }
    } else {
      console.log('  ✗ Frontend Dockerfile not found');
    }
    
    // Check backend Dockerfile
    console.log('\n2. Checking backend Dockerfile...');
    const backendDockerfile = path.join(__dirname, '..', 'dot-net-quiz', 'backend', 'Dockerfile');
    if (fs.existsSync(backendDockerfile)) {
      const content = fs.readFileSync(backendDockerfile, 'utf8');
      console.log('  ✓ Backend Dockerfile exists');
      
      if (content.includes('FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine')) {
        console.log('  ✓ Using .NET 8.0 Alpine base image');
      } else if (content.includes('FROM mcr.microsoft.com/dotnet/aspnet:')) {
        console.log('  ⚠ Using alternative .NET base image');
      } else {
        console.log('  ✗ No recognizable .NET base image found');
      }
    } else {
      console.log('  ✗ Backend Dockerfile not found');
    }
    
    // Check render.yaml
    console.log('\n3. Checking render.yaml...');
    const renderYaml = path.join(__dirname, '..', 'render.yaml');
    if (fs.existsSync(renderYaml)) {
      const content = fs.readFileSync(renderYaml, 'utf8');
      console.log('  ✓ render.yaml exists');
      
      if (content.includes('dockerfilePath:')) {
        console.log('  ✓ Explicit dockerfilePath configured');
      }
      
      if (content.includes('runtime: docker')) {
        console.log('  ✓ Docker runtime configured');
      }
    } else {
      console.log('  ✗ render.yaml not found');
    }
    
    // Summary
    console.log('\n=== Verification Summary ===');
    console.log('Current Docker configuration has been optimized to reduce authentication issues.');
    console.log('If authentication errors persist, recommended actions:');
    console.log('1. Contact Render support with detailed error logs');
    console.log('2. Try pre-building and pushing images to a public registry');
    console.log('3. Consider creating new services with native runtimes');
    console.log('\nFor detailed troubleshooting steps, see FINAL_DOCKER_SOLUTION.md');
    
  } catch (error) {
    console.error('❌ Verification failed:', error.message);
  }
}

// Run verification if executed directly
if (require.main === module) {
  finalDockerVerification();
}

module.exports = { finalDockerVerification };