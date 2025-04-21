
import { useCallback } from 'react';
import { predefinedWorkflows } from '@/data/workflows';
import { useWorkflowState } from './useWorkflowState';
import { useNodeOperations } from './useNodeOperations';
import { useConnectionOperations } from './useConnectionOperations';
import { useWorkflowExecution } from './useWorkflowExecution';
import { useWorkflowControl } from './useWorkflowControl';
import { 
  registerWorkflow, 
  logWorkflowActivity,
  updateDashboardMetrics 
} from '@/components/workflow/WorkflowIntegrations';

export const useWorkflow = () => {
  const {
    nodes,
    setNodes,
    connections,
    setConnections,
    currentWorkflow,
    setCurrentWorkflow,
    workflowRuns,
    setWorkflowRuns,
    isRunning,
    setIsRunning,
  } = useWorkflowState();

  const { addNode, moveNode, updateNodeStatus } = useNodeOperations(nodes, setNodes);
  const { connectNodes } = useConnectionOperations(setConnections);
  const { runWorkflow } = useWorkflowExecution(
    nodes,
    connections,
    currentWorkflow,
    isRunning,
    setIsRunning,
    updateNodeStatus,
    setWorkflowRuns,
  );
  const { stopWorkflow, approveHumanTask, rejectHumanTask } = useWorkflowControl({
    isRunning,
    setIsRunning,
    updateNodeStatus,
    setWorkflowRuns,
  });

  const loadWorkflow = useCallback((workflowId: string) => {
    const workflow = predefinedWorkflows.find(wf => wf.id === workflowId);
    if (workflow) {
      setNodes(workflow.nodes);
      setConnections(workflow.connections);
      setCurrentWorkflow(workflow);
      
      // Log workflow loading in activity log
      logWorkflowActivity(workflowId, 'updated');
    }
  }, [setNodes, setConnections, setCurrentWorkflow]);
  
  const createWorkflow = useCallback((workflow: any) => {
    // Register the new workflow
    registerWorkflow(workflow);
    
    // Set as current workflow
    setCurrentWorkflow(workflow);
    setNodes(workflow.nodes || []);
    setConnections(workflow.connections || []);
    
    // Log creation in activity log
    logWorkflowActivity(workflow.id, 'created');
    
    // Update dashboard metrics
    updateDashboardMetrics();
    
    return workflow;
  }, [setCurrentWorkflow, setNodes, setConnections]);

  return {
    nodes,
    connections,
    currentWorkflow,
    workflowRuns,
    isRunning,
    addNode,
    moveNode,
    connectNodes,
    updateNodeStatus,
    loadWorkflow,
    createWorkflow,
    runWorkflow,
    stopWorkflow,
    approveHumanTask,
    rejectHumanTask,
  };
};
