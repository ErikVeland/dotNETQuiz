/**
 * Design System Test Script
 * Validates the shared design system assets
 */

const fs = require('fs');
const path = require('path');

// Test CSS design system
function testCssDesignSystem() {
  console.log('Testing CSS Design System...');
  try {
    const cssPath = path.join(__dirname, '..', 'design-system', 'css', 'design-system.css');
    
    // Check if file exists
    if (!fs.existsSync(cssPath)) {
      throw new Error('CSS design system file not found');
    }
    
    // Read file
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    
    // Check for required elements
    const requiredElements = [
      ':root',
      '--color-primary',
      '--color-secondary',
      '--color-accent',
      '.btn',
      '.btn-primary',
      '.btn-secondary',
      '.card',
      '.form-input',
      '.alert',
      '.container',
      'grid'
    ];
    
    for (const element of requiredElements) {
      if (!cssContent.includes(element)) {
        throw new Error(`Missing required element: ${element}`);
      }
    }
    
    console.log('  ✓ CSS file exists and contains required elements');
    console.log('  ✓ Color variables defined');
    console.log('  ✓ Component classes defined');
    console.log('  ✓ Responsive grid system included');
    
    console.log('✓ CSS Design System tests passed\n');
    return true;
  } catch (error) {
    console.error('✗ CSS Design System tests failed:', error.message);
    return false;
  }
}

// Test SCSS design system
function testScssDesignSystem() {
  console.log('Testing SCSS Design System...');
  try {
    const scssDir = path.join(__dirname, '..', 'design-system', 'scss');
    
    // Check if required files exist
    const requiredFiles = [
      '_variables.scss',
      '_mixins.scss',
      '_components.scss',
      'design-system.scss'
    ];
    
    for (const file of requiredFiles) {
      const filePath = path.join(scssDir, file);
      if (!fs.existsSync(filePath)) {
        throw new Error(`SCSS file not found: ${file}`);
      }
    }
    
    // Check variables file
    const variablesContent = fs.readFileSync(path.join(scssDir, '_variables.scss'), 'utf8');
    const requiredVariables = [
      '$color-primary',
      '$color-secondary',
      '$color-accent',
      '$spacing-4',
      '$font-size-base'
    ];
    
    for (const variable of requiredVariables) {
      if (!variablesContent.includes(variable)) {
        throw new Error(`Missing required variable: ${variable}`);
      }
    }
    
    console.log('  ✓ All SCSS files exist');
    console.log('  ✓ SCSS variables defined');
    console.log('  ✓ Mixins available');
    console.log('  ✓ Components structured');
    
    console.log('✓ SCSS Design System tests passed\n');
    return true;
  } catch (error) {
    console.error('✗ SCSS Design System tests failed:', error.message);
    return false;
  }
}

// Main test function
function testDesignSystem() {
  console.log('=== Design System Testing ===\n');
  
  const cssPassed = testCssDesignSystem();
  const scssPassed = testScssDesignSystem();
  
  if (cssPassed && scssPassed) {
    console.log('🎉 Design System tests passed!');
    return true;
  } else {
    console.log('❌ Design System tests failed!');
    return false;
  }
}

// Run tests if this script is executed directly
if (require.main === module) {
  const success = testDesignSystem();
  process.exit(success ? 0 : 1);
}

module.exports = { testDesignSystem };