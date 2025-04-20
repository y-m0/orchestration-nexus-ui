
export interface WorkflowNode {
  id: string;
  type: 'agent' | 'logic' | 'io' | 'human';
  title: string;
  position: { x: number; y: number };
  description?: string;
  status?: 'idle' | 'running' | 'completed' | 'error';
  tags?: string[];
}

export interface WorkflowConnection {
  id: string;
  source: string;
  target: string;
  label?: string;
}

export interface Workflow {
  id: string;
  title: string;
  description: string;
  trigger: string;
  complexity: 'low' | 'medium' | 'high';
  status?: 'idle' | 'running' | 'completed' | 'error';
  successRate?: number;
  avgRunTime?: string;
  nodes: WorkflowNode[];
  connections: WorkflowConnection[];
}
