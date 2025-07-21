#!/usr/bin/env node

/**
 * Project Export Script
 * Helps organize and prepare the project for transfer to a Git environment
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Orchestration Nexus UI - Project Export Helper');
console.log('================================================\n');

// Check if we're in the right directory
const packageJsonPath = path.join(process.cwd(), 'package.json');
if (!fs.existsSync(packageJsonPath)) {
  console.error('❌ Error: package.json not found. Please run this script from the project root.');
  process.exit(1);
}

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
console.log(`📦 Project: ${packageJson.name}`);
console.log(`📋 Version: ${packageJson.version}`);
console.log(`🏗️  Framework: React + TypeScript + Vite\n`);

// List critical files that must be transferred
const criticalFiles = [
  'package.json',
  'package-lock.json',
  'vite.config.ts',
  'tsconfig.json',
  'tailwind.config.ts',
  'index.html',
  'src/',
  'public/',
  'README.md'
];

console.log('📁 Critical Files Check:');
criticalFiles.forEach(file => {
  const exists = fs.existsSync(path.join(process.cwd(), file));
  console.log(`${exists ? '✅' : '❌'} ${file}`);
});

// Check for potential issues
console.log('\n🔍 Pre-transfer Analysis:');

// Check for mock authentication
const mockAuthPath = path.join(process.cwd(), 'src/lib/auth/mockAuth.ts');
if (fs.existsSync(mockAuthPath)) {
  console.log('⚠️  Mock authentication detected - REPLACE before production');
}

// Check for any types
try {
  const { execSync } = require('child_process');
  const anyTypesCount = execSync('find src -name "*.ts" -o -name "*.tsx" | xargs grep -l "any\\[\\]\\|: any" | wc -l', { encoding: 'utf8' }).trim();
  if (parseInt(anyTypesCount) > 0) {
    console.log(`⚠️  ${anyTypesCount} files with 'any' types - improve type safety`);
  }
} catch (e) {
  console.log('ℹ️  Could not analyze TypeScript types');
}

// Check node_modules size
try {
  const nodeModulesPath = path.join(process.cwd(), 'node_modules');
  if (fs.existsSync(nodeModulesPath)) {
    console.log('✅ Dependencies installed (remember to run npm install in new environment)');
  }
} catch (e) {
  console.log('ℹ️  Dependencies not installed');
}

console.log('\n📋 Next Steps:');
console.log('1. Copy all files to your Git-enabled environment');
console.log('2. Run: npm install');
console.log('3. Run: npm run dev');
console.log('4. Initialize Git: git init');
console.log('5. Add remote: git remote add origin <your-repo>');
console.log('6. Commit: git add . && git commit -m "Initial commit"');
console.log('7. Push: git push -u origin main');

console.log('\n🔒 Security Reminders:');
console.log('- Replace mock authentication system');
console.log('- Fix TypeScript any types');
console.log('- Set up proper environment variables');
console.log('- Configure production API endpoints');

console.log('\n✨ Project ready for transfer!');