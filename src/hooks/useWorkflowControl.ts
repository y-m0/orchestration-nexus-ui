
import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { WorkflowNode, WorkflowRun } from '@/types/workflow';

export const useWorkflowControl = (
  isRunning: boolean,
  setIsRunning: (isRunning: boolean) => void,
  updateNodeStatus: (id: string, status: WorkflowNode['status']) => void,
  setWorkflowRuns: (runs: WorkflowRun[] | ((prev: WorkflowRun[]) => WorkflowRun[])) => void
) => {
  const { toast } = useToast();

  const stopWorkflow = useCallback(() => {
    if (!isRunning) return;
    
    setIsRunning(false);
    
    // Mark all running nodes as error
    setWorkflowRuns((prev: WorkflowRun[]) => {
      if (prev.length === 0) return prev;
      
      const lastRun = prev[prev.length - 1];
      if (lastRun && lastRun.status === 'running') {
        // Add activity log entry
        console.log(`Activity Log: Workflow ${lastRun.workflowId} stopped manually at ${new Date().toLocaleTimeString()}`);
        
        return [
          ...prev.slice(0, prev.length - 1),
          { ...lastRun, status: 'error', endTime: new Date().toISOString() }
        ];
      }
      return prev;
    });
    
    toast({
      title: "Workflow stopped",
      description: "Execution was manually stopped",
    });
  }, [isRunning, setIsRunning, setWorkflowRuns, toast]);
  
  const approveHumanTask = useCallback((nodeId: string) => {
    if (!isRunning) return;
    
    // Log the approval action
    console.log(`Activity Log: Task ${nodeId} approved at ${new Date().toLocaleTimeString()}`);
    
    // Update node status
    updateNodeStatus(nodeId, 'completed');
    
    // Update workflow run to reflect the approval
    setWorkflowRuns((prev: WorkflowRun[]) => {
      if (prev.length === 0) return prev;
      
      const updatedRuns = [...prev];
      const currentRun = updatedRuns[updatedRuns.length - 1];
      
      if (currentRun && currentRun.status === 'running') {
        const updatedNodeRuns = currentRun.nodeRuns.map(nodeRun => {
          if (nodeRun.nodeId === nodeId) {
            return {
              ...nodeRun,
              status: 'completed' as 'idle' | 'running' | 'completed' | 'error',
              endTime: new Date().toISOString(),
              output: { approved: true }
            };
          }
          return nodeRun;
        });
        
        updatedRuns[updatedRuns.length - 1] = {
          ...currentRun,
          nodeRuns: updatedNodeRuns
        };
      }
      
      return updatedRuns;
    });
    
    toast({
      title: "Task approved",
      description: "Workflow execution will continue",
    });
  }, [isRunning, updateNodeStatus, setWorkflowRuns, toast]);
  
  const rejectHumanTask = useCallback((nodeId: string) => {
    if (!isRunning) return;
    
    // Log the rejection action
    console.log(`Activity Log: Task ${nodeId} rejected at ${new Date().toLocaleTimeString()}`);
    
    // Update node status
    updateNodeStatus(nodeId, 'error');
    
    // Update workflow run to reflect the rejection
    setWorkflowRuns((prev: WorkflowRun[]) => {
      if (prev.length === 0) return prev;
      
      const updatedRuns = [...prev];
      const currentRun = updatedRuns[updatedRuns.length - 1];
      
      if (currentRun && currentRun.status === 'running') {
        const updatedNodeRuns = currentRun.nodeRuns.map(nodeRun => {
          if (nodeRun.nodeId === nodeId) {
            return {
              ...nodeRun,
              status: 'error' as 'idle' | 'running' | 'completed' | 'error',
              endTime: new Date().toISOString(),
              error: "Task was rejected by user"
            };
          }
          return nodeRun;
        });
        
        updatedRuns[updatedRuns.length - 1] = {
          ...currentRun,
          nodeRuns: updatedNodeRuns,
          status: 'error',
          endTime: new Date().toISOString()
        };
      }
      
      return updatedRuns;
    });
    
    setIsRunning(false);
    
    toast({
      variant: "destructive",
      title: "Task rejected",
      description: "Workflow execution was stopped",
    });
  }, [isRunning, updateNodeStatus, setIsRunning, setWorkflowRuns, toast]);

  return {
    stopWorkflow,
    approveHumanTask,
    rejectHumanTask,
  };
};
