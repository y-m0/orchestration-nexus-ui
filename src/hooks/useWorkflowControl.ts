
import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { WorkflowNode } from '@/types/workflow';

export const useWorkflowControl = (
  isRunning: boolean,
  setIsRunning: (isRunning: boolean) => void,
  updateNodeStatus: (id: string, status: WorkflowNode['status']) => void,
  setWorkflowRuns: (runs: any[]) => void
) => {
  const { toast } = useToast();

  const stopWorkflow = useCallback(() => {
    if (!isRunning) return;
    
    setIsRunning(false);
    
    // Mark all running nodes as error
    setWorkflowRuns(prev => {
      const lastRun = prev[prev.length - 1];
      if (lastRun && lastRun.status === 'running') {
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
    updateNodeStatus(nodeId, 'completed');
    toast({
      title: "Task approved",
      description: "Workflow execution will continue",
    });
  }, [isRunning, updateNodeStatus, toast]);
  
  const rejectHumanTask = useCallback((nodeId: string) => {
    if (!isRunning) return;
    updateNodeStatus(nodeId, 'error');
    setIsRunning(false);
    toast({
      variant: "destructive",
      title: "Task rejected",
      description: "Workflow execution was stopped",
    });
  }, [isRunning, updateNodeStatus, setIsRunning, toast]);

  return {
    stopWorkflow,
    approveHumanTask,
    rejectHumanTask,
  };
};
