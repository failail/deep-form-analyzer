#!/usr/bin/env node

// Simple test runner script since package.json is read-only
const { spawn } = require('child_process');

const command = process.argv[2] || 'test';

const testCommands = {
  test: 'npx vitest',
  'test:ui': 'npx vitest --ui',
  'test:coverage': 'npx vitest --coverage'
};

const cmd = testCommands[command] || testCommands.test;

console.log(`Running: ${cmd}`);

const child = spawn(cmd, [], { 
  shell: true, 
  stdio: 'inherit',
  cwd: process.cwd()
});

child.on('close', (code) => {
  process.exit(code);
});