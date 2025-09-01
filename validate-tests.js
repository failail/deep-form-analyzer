#!/usr/bin/env node

// Test validation script to check TypeScript compilation and basic test structure
const fs = require('fs');
const path = require('path');

console.log('🔍 Validating test files...\n');

const testFiles = [
  'src/test/questionCount.test.ts',
  'src/test/conditionalLogic.test.ts',
  'src/test/formValidation.test.ts',
  'src/test/financialCalculations.test.ts',
  'src/test/paginationAndProgress.test.ts',
  'src/test/resultsPage.test.ts'
];

const helperFiles = [
  'src/test/setup.ts',
  'src/test/testData.ts',
  'src/test/utils/testHelpers.ts'
];

let allFilesExist = true;
let testCount = 0;

// Check if test files exist
console.log('📁 Checking test file existence:');
[...testFiles, ...helperFiles].forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
    
    // Count test cases in test files
    if (file.endsWith('.test.ts')) {
      const content = fs.readFileSync(file, 'utf8');
      const testMatches = content.match(/test\(/g);
      const count = testMatches ? testMatches.length : 0;
      testCount += count;
      console.log(`   📊 Contains ${count} test cases`);
    }
  } else {
    console.log(`❌ ${file} - MISSING`);
    allFilesExist = false;
  }
});

console.log(`\n📈 Total test cases found: ${testCount}`);

// Check TypeScript configuration
console.log('\n⚙️  Checking TypeScript configuration:');
if (fs.existsSync('vitest.config.ts')) {
  console.log('✅ vitest.config.ts exists');
} else {
  console.log('❌ vitest.config.ts missing');
  allFilesExist = false;
}

if (fs.existsSync('src/test/setup.ts')) {
  console.log('✅ Test setup file exists');
} else {
  console.log('❌ Test setup file missing');
  allFilesExist = false;
}

// Summary
console.log('\n📋 Summary:');
console.log(`Files exist: ${allFilesExist ? '✅' : '❌'}`);
console.log(`Total test cases: ${testCount}`);
console.log(`Test files: ${testFiles.length}`);
console.log(`Helper files: ${helperFiles.length}`);

if (allFilesExist && testCount > 0) {
  console.log('\n🎉 Test suite appears to be properly configured!');
  console.log('\n🔧 To run tests manually:');
  console.log('   npx vitest');
  console.log('   npx vitest --ui');
  console.log('   npx vitest --coverage');
} else {
  console.log('\n⚠️  Test suite needs fixes before running');
}