# Project Structure Documentation

## Root Files
- `package.json` - Dependencies and scripts
- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `index.html` - Main HTML template

## Source Code (`src/`)

### Core Application
- `main.tsx` - Application entry point
- `App.tsx` - Main app component with routing
- `index.css` - Global styles

### Components (`src/components/`)
- `ui/` - Shadcn/ui component library
- `auth/` - Authentication components
- `dashboard/` - Dashboard-specific components
- `workflow/` - Workflow builder components
- `settings/` - Settings page components
- `landing/` - Landing page components
- `layout/` - Layout components

### Pages (`src/pages/`)
- `Dashboard.tsx` - Main dashboard
- `Login.tsx` - Login page
- `Projects.tsx` - Projects management
- `WorkflowBuilder.tsx` - Workflow creation
- `Settings.tsx` - Application settings
- `ActivityLog.tsx` - Activity monitoring

### Library (`src/lib/`)
- `store.ts` - Zustand state management
- `utils.ts` - Utility functions
- `api.ts` - API client
- `auth/` - Authentication logic
- `memory/` - Memory management

### Hooks (`src/hooks/`)
- `useWorkflow.ts` - Workflow management
- `useIsMobile.tsx` - Mobile detection
- `use-toast.ts` - Toast notifications

### Types (`src/types/`)
- `workflow.ts` - Workflow type definitions
- `project.ts` - Project type definitions
- `tool.ts` - Tool type definitions

### Services (`src/services/`)
- `api.ts` - API service layer
- `claudeFlowApi.ts` - Claude Flow integration

## Backend (`backend/`)
- `app.py` - Flask backend (basic)
- `requirements.txt` - Python dependencies

## Data Summarization Agent (`data_summarization_agent/`)
- `main.py` - FastAPI application
- `models.py` - Pydantic models
- `agent_logic.py` - Core logic
- `tests/` - Test files

## Configuration Files
- `.claude/` - Claude Flow configuration
- `components.json` - Shadcn/ui configuration
- `eslint.config.js` - ESLint configuration
- `postcss.config.js` - PostCSS configuration

## Docker & Deployment
- `Dockerfile` - Container configuration
- `docker-compose.yml` - Multi-service setup
- `cloudbuild.yaml` - Google Cloud Build
- `.github/` - GitHub Actions workflows

## Documentation
- `README.md` - Project overview
- `code-guide.json` - Development guidelines
- Various markdown files for features and setup