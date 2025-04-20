
import { useCallback } from 'react';
import { predefinedWorkflows } from '@/data/workflows';
import { useWorkflowState } from './useWorkflowState';
import { useNodeOperations } from './useNodeOperations';
import { useConnectionOperations } from './useConnectionOperations';
import { useWorkflowExecution } from './useWorkflowExecution';
import { useWorkflowControl } from './useWorkflowControl';

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
  const { stopWorkflow, approveHumanTask, rejectHumanTask } = useWorkflowControl(
    isRunning,
    setIsRunning,
    updateNodeStatus,
    setWorkflowRuns,
  );

  const loadWorkflow = useCallback((workflowId: string) => {
    const workflow = predefinedWorkflows.find(wf => wf.id === workflowId);
    if (workflow) {
      setNodes(workflow.nodes);
      setConnections(workflow.connections);
      setCurrentWorkflow(workflow);
    }
  }, [setNodes, setConnections, setCurrentWorkflow]);

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
    runWorkflow,
    stopWorkflow,
    approveHumanTask,
    rejectHumanTask,
  };
};
