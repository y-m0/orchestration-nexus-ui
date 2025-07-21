# Project Deployment Guide

## Project Overview
This is the Orchestration Nexus UI - a React/TypeScript application for intelligent workflow automation.

## Quick Setup in Git Environment

### 1. Prerequisites
- Node.js 18+ 
- Git
- npm or yarn

### 2. Initial Setup
```bash
# Clone or initialize repository
git init
git remote add origin <your-repo-url>

# Install dependencies
npm install

# Start development server
npm run dev
```

### 3. Environment Configuration
Create a `.env.local` file:
```
VITE_API_URL=http://localhost:3000/api
```

### 4. Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - TypeScript type checking

### 5. Project Structure
```
src/
├── components/     # Reusable UI components
├── pages/         # Route components
├── lib/           # Utilities and stores
├── hooks/         # Custom React hooks
├── types/         # TypeScript type definitions
└── services/      # API services
```

### 6. Key Features
- Authentication system (currently mock - needs production replacement)
- Workflow builder with visual editor
- Agent directory and management
- Activity logging and monitoring
- Settings and configuration

### 7. Production Deployment
- Build: `npm run build`
- Deploy `dist/` folder to your hosting service
- Configure environment variables for production

### 8. Docker Deployment
```bash
docker build -t orchestration-nexus-ui .
docker run -p 8080:80 orchestration-nexus-ui
```

## Important Notes
- Replace mock authentication before production use
- Configure proper API endpoints
- Set up monitoring and error tracking
- Review security settings