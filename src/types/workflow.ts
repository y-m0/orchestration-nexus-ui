
export interface WorkflowNode {
  id: string;
  type: 'agent' | 'logic' | 'io';
  title: string;
  position: { x: number; y: number };
}

export interface WorkflowConnection {
  id: string;
  source: string;
  target: string;
}
