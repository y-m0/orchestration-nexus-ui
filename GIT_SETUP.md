# Git Setup Instructions

## Initial Repository Setup

### 1. Initialize Git Repository
```bash
git init
git add .
git commit -m "Initial commit: Orchestration Nexus UI"
```

### 2. Add Remote Repository
```bash
# Replace with your actual repository URL
git remote add origin https://github.com/yourusername/orchestration-nexus-ui.git
git branch -M main
git push -u origin main
```

### 3. Recommended .gitignore
```gitignore
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Production builds
dist/
build/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db

# Logs
logs/
*.log

# Runtime data
pids/
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# next.js build output
.next

# nuxt.js build output
.nuxt

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port

# Stores VSCode versions used for testing VSCode extensions
.vscode-test
```

### 4. Branch Strategy
```bash
# Create development branch
git checkout -b develop

# Create feature branches
git checkout -b feature/authentication-system
git checkout -b feature/workflow-builder
git checkout -b feature/dashboard-improvements

# Create hotfix branches when needed
git checkout -b hotfix/security-fix
```

### 5. Commit Message Convention
```bash
# Format: type(scope): description

# Examples:
git commit -m "feat(auth): implement secure authentication system"
git commit -m "fix(dashboard): resolve memory leak in activity timeline"
git commit -m "docs(readme): update installation instructions"
git commit -m "refactor(workflow): improve type safety in workflow store"
git commit -m "test(auth): add comprehensive authentication tests"
```

### 6. Pre-commit Setup (Recommended)
```bash
# Install husky for git hooks
npm install --save-dev husky
npx husky install

# Add pre-commit hook
npx husky add .husky/pre-commit "npm run lint && npm run type-check"
```

### 7. Release Workflow
```bash
# Create release branch
git checkout -b release/v1.0.0

# Update version in package.json
# Create release notes
# Test thoroughly

# Merge to main
git checkout main
git merge release/v1.0.0
git tag v1.0.0
git push origin main --tags

# Merge back to develop
git checkout develop
git merge main
```

## Deployment Branches

### Production
- `main` - Production-ready code
- Automatically deploys to production
- Protected branch with required reviews

### Staging
- `develop` - Integration branch
- Automatically deploys to staging
- All features merge here first

### Feature Development
- `feature/*` - Individual features
- `bugfix/*` - Bug fixes
- `hotfix/*` - Critical production fixes