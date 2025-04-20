import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Activity {
  id: string;
  type: string;
  timestamp: string;
  details: string;
}

interface AppState {
  // Workflow state
  workflows: any[]
  selectedWorkflow: string | null
  // Agent state
  agents: any[]
  selectedAgent: string | null
  // Activity state
  activities: Activity[]
  // Settings state
  settings: {
    theme: 'light' | 'dark'
    notifications: boolean
    autoSave: boolean
  }
  // Actions
  setWorkflows: (workflows: any[]) => void
  setSelectedWorkflow: (id: string | null) => void
  setAgents: (agents: any[]) => void
  setSelectedAgent: (id: string | null) => void
  setActivities: (activities: Activity[] | ((prev: Activity[]) => Activity[])) => void
  updateSettings: (settings: Partial<AppState['settings']>) => void
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      workflows: [],
      selectedWorkflow: null,
      agents: [],
      selectedAgent: null,
      activities: [],
      settings: {
        theme: 'light',
        notifications: true,
        autoSave: true,
      },
      setWorkflows: (workflows) => set({ workflows }),
      setSelectedWorkflow: (id) => set({ selectedWorkflow: id }),
      setAgents: (agents) => set({ agents }),
      setSelectedAgent: (id) => set({ selectedAgent: id }),
      setActivities: (activities) => set((state) => ({
        activities: typeof activities === 'function' ? activities(state.activities) : activities
      })),
      updateSettings: (settings) => 
        set((state) => ({ settings: { ...state.settings, ...settings } })),
    }),
    {
      name: 'orchestration-nexus-storage',
    }
  )
) 