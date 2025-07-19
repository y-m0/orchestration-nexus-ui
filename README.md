# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/30c6645e-b7eb-45d5-a467-3c279f2230c5

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/30c6645e-b7eb-45d5-a467-3c279f2230c5) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/30c6645e-b7eb-45d5-a467-3c279f2230c5) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## 🧠 Codeless (Subproject)

A guided, agent-powered app-building experience for non-technical users.

📁 Location: `/apps/codeless`  
🔖 Version: 1.0 (MVP)  
🎯 Target: Interactive, AI-guided "To-Do List App" builder

➡️ See `/apps/codeless/prd/v1.0.md` for product details.

# Codeless

An interactive, agent-assisted platform that guides non-technical individuals through the process of building simple web or mobile applications.

## Overview

Codeless democratizes app creation by providing an intelligent, conversational mentor that breaks down complex development tasks into understandable, actionable steps.

## Project Structure

```
codeless/
├── agent-specs/     # AI agent specifications and capabilities
├── prd/            # Product Requirements Documents
├── prototypes/     # UI/UX prototypes and flows
└── workflows/      # Application building workflows
```

## Current Status

Version: 1.0 (MVP)
Target: Interactive, AI-guided "To-Do List App" builder

## Documentation

- [Product Requirements Document](prd/v1.0.md)
- [Build Agent Specification](agent-specs/build-agent.md)
- [To-Do App Workflow](workflows/to-do-app.json)
- [Guided UI Flow](prototypes/guided-ui.flow.json)

## Getting Started

1. Clone the repository
2. Review the PRD and agent specifications
3. Follow the workflow documentation to understand the app-building process

## Contributing

Please read our contributing guidelines before submitting pull requests.

## License

[Add appropriate license information]

## Claude-Flow Integration

This project integrates with [Claude-Flow](https://github.com/ruvnet/claude-flow) for AI-powered orchestration, agent-based task management, and workflow monitoring.

### Setup
1. Install and run Claude-Flow as a service (see their documentation).
2. Update `CLAUDE_FLOW_API_URL` in `src/services/claudeFlowApi.ts` if your Claude-Flow server is not on `localhost:3001`.

### API Service
- `src/services/claudeFlowApi.ts` provides methods to:
  - Get workflow status
  - Trigger orchestration tasks
  - Fetch security/compliance results

### UI Components
- `ClaudeFlowDashboard`: Shows orchestration/workflow status
- `ClaudeFlowTaskTrigger`: Trigger new orchestration tasks
- `ClaudeFlowStatus`: Real-time agent/task progress
- `ClaudeFlowSecurity`: Security & compliance results

These are integrated into the main dashboard UI.

### Example User Flow
1. User logs in to Orchestra Nexus UI.
2. User triggers an orchestration task (e.g., "Deploy Microservice").
3. Frontend sends a request to Claude-Flow to spawn the appropriate agents.
4. Claude-Flow agents execute tasks (deploy, monitor, summarize, secure).
5. Frontend polls or subscribes to workflow status and displays real-time progress.
6. User sees results, logs, and security/compliance feedback in the dashboard.

See the Claude-Flow repo for more details on agent and workflow configuration.
