import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface LLMNode {
  id: string;
  type: 'openai' | 'huggingface';
  name: string;
  config: {
    model: string;
    temperature: number;
    maxTokens: number;
    apiKey?: string;
  };
  status: 'idle' | 'running' | 'error' | 'success';
  lastExecution?: {
    timestamp: string;
    input: any;
    output: any;
    duration: number;
  };
}

export interface WorkflowNode {
  id: string;
  type: 'llm' | 'human' | 'logic' | 'data';
  position: { x: number; y: number };
  data: {
    label: string;
    config: any;
  };
  inputs: string[];
  outputs: string[];
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  data: {
    label?: string;
    type: 'data' | 'control';
  };
}

export interface Workflow {
  id: string;
  name: string;
  description?: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'active' | 'archived';
  lastRun?: {
    timestamp: string;
    status: 'success' | 'error' | 'running';
    duration?: number;
  };
}

interface WorkflowState {
  // Workflow state
  workflows: Workflow[];
  selectedWorkflow: string | null;
  // LLM nodes state
  llmNodes: LLMNode[];
  // Data connections
  dataConnections: {
    postgresql: any[];
    s3: any[];
    pinecone: any[];
  };
  // Actions
  setWorkflows: (workflows: Workflow[]) => void;
  setSelectedWorkflow: (id: string | null) => void;
  addWorkflow: (workflow: Omit<Workflow, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateWorkflow: (id: string, updates: Partial<Workflow>) => void;
  deleteWorkflow: (id: string) => void;
  // LLM node actions
  setLLMNodes: (nodes: LLMNode[]) => void;
  addLLMNode: (node: Omit<LLMNode, 'id'>) => void;
  updateLLMNode: (id: string, updates: Partial<LLMNode>) => void;
  // Data connection actions
  setDataConnections: (connections: WorkflowState['dataConnections']) => void;
  addDataConnection: (type: keyof WorkflowState['dataConnections'], connection: any) => void;
  removeDataConnection: (type: keyof WorkflowState['dataConnections'], id: string) => void;
}

export const useWorkflowStore = create<WorkflowState>()(
  persist(
    (set, get) => ({
      workflows: [],
      selectedWorkflow: null,
      llmNodes: [],
      dataConnections: {
        postgresql: [],
        s3: [],
        pinecone: [],
      },
      setWorkflows: (workflows) => set({ workflows }),
      setSelectedWorkflow: (id) => set({ selectedWorkflow: id }),
      addWorkflow: (workflow) => set((state) => ({
        workflows: [
          {
            ...workflow,
            id: `workflow-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          ...state.workflows,
        ],
      })),
      updateWorkflow: (id, updates) => set((state) => ({
        workflows: state.workflows.map((workflow) =>
          workflow.id === id
            ? {
                ...workflow,
                ...updates,
                updatedAt: new Date().toISOString(),
              }
            : workflow
        ),
      })),
      deleteWorkflow: (id) => set((state) => ({
        workflows: state.workflows.filter((workflow) => workflow.id !== id),
      })),
      setLLMNodes: (nodes) => set({ llmNodes: nodes }),
      addLLMNode: (node) => set((state) => ({
        llmNodes: [
          {
            ...node,
            id: `llm-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          },
          ...state.llmNodes,
        ],
      })),
      updateLLMNode: (id, updates) => set((state) => ({
        llmNodes: state.llmNodes.map((node) =>
          node.id === id ? { ...node, ...updates } : node
        ),
      })),
      setDataConnections: (connections) => set({ dataConnections: connections }),
      addDataConnection: (type, connection) => set((state) => ({
        dataConnections: {
          ...state.dataConnections,
          [type]: [
            {
              ...connection,
              id: `${type}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            },
            ...state.dataConnections[type],
          ],
        },
      })),
      removeDataConnection: (type, id) => set((state) => ({
        dataConnections: {
          ...state.dataConnections,
          [type]: state.dataConnections[type].filter(
            (connection) => connection.id !== id
          ),
        },
      })),
    }),
    {
      name: 'orchestration-nexus-workflow-storage',
    }
  )
); 