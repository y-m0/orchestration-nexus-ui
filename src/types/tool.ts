
export interface AgentTool {
  id: string;
  name: string;
  description: string;
  icon?: string;
  category: ToolCategory;
  enabled: boolean;
  requiresConfig: boolean;
  configSchema?: Record<string, unknown>;
  run: (input: string, context?: Record<string, unknown>) => Promise<ToolResult>;
}

export type ToolCategory = 'search' | 'data' | 'communication' | 'analysis' | 'utility';

export interface ToolResult {
  success: boolean;
  result: string;
  metadata?: Record<string, unknown>;
  error?: string;
}

export interface ToolRegistry {
  getAllTools: () => AgentTool[];
  getEnabledTools: () => AgentTool[];
  getTool: (id: string) => AgentTool | undefined;
  registerTool: (tool: AgentTool) => void;
  enableTool: (id: string) => void;
  disableTool: (id: string) => void;
  configureToolSettings: (id: string, settings: Record<string, unknown>) => void;
}
