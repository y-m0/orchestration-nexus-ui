
import { useCallback } from 'react';
import { WorkflowNode, WorkflowConnection, Workflow, WorkflowRun } from '@/types/workflow';
import { useToast } from '@/hooks/use-toast';

export const useWorkflowExecution = (
  nodes: WorkflowNode[],
  connections: WorkflowConnection[],
  currentWorkflow: Workflow | null,
  isRunning: boolean,
  setIsRunning: (isRunning: boolean) => void,
  updateNodeStatus: (id: string, status: WorkflowNode['status']) => void,
  setWorkflowRuns: (runs: WorkflowRun[] | ((prev: WorkflowRun[]) => WorkflowRun[])) => void,
) => {
  const { toast } = useToast();

  const runWorkflow = useCallback(() => {
    if (!currentWorkflow || isRunning) return;

    setIsRunning(true);

    // Reset all node statuses to idle
    nodes.forEach(node => updateNodeStatus(node.id, 'idle'));

    // Create a new workflow run
    const newRun: WorkflowRun = {
      id: `run-${Date.now()}`,
      workflowId: currentWorkflow.id,
      status: 'running',
      startTime: new Date().toISOString(),
      triggeredBy: 'current-user',
      nodeRuns: []
    };

    // Mock workflow execution
    let currentNodeIndex = 0;
    const orderedNodes = [...nodes].sort((a, b) => {
      const aConnections = connections.filter(c => c.target === a.id).length;
      const bConnections = connections.filter(c => c.target === b.id).length;
      return aConnections - bConnections;
    });

    const runNextNode = () => {
      if (currentNodeIndex >= orderedNodes.length) {
        setIsRunning(false);
        newRun.status = 'completed';
        newRun.endTime = new Date().toISOString();
        setWorkflowRuns((prev: WorkflowRun[]) => [...prev, newRun]);
        
        toast({
          title: "Workflow completed",
          description: `${currentWorkflow.title} finished successfully`,
        });
        return;
      }

      const node = orderedNodes[currentNodeIndex];
      updateNodeStatus(node.id, 'running');
      
      if (node.type === 'human' && node.requiresApproval) {
        toast({
          title: "Human approval required",
          description: `${node.title} is waiting for approval`,
        });
        return;
      }

      const nodeRun = {
        nodeId: node.id,
        status: 'running' as 'idle' | 'running' | 'completed' | 'error',
        startTime: new Date().toISOString(),
        output: undefined as any,
        error: undefined as string | undefined,
        endTime: undefined as string | undefined
      };
      
      newRun.nodeRuns.push(nodeRun);

      setTimeout(() => {
        const success = Math.random() > 0.2;
        
        if (success) {
          updateNodeStatus(node.id, 'completed');
          nodeRun.status = 'completed';
        } else {
          updateNodeStatus(node.id, 'error');
          nodeRun.status = 'error';
          nodeRun.error = 'Simulated error during execution';
          
          setIsRunning(false);
          newRun.status = 'error';
          newRun.endTime = new Date().toISOString();
          setWorkflowRuns((prev: WorkflowRun[]) => [...prev, newRun]);
          
          toast({
            variant: "destructive",
            title: "Workflow error",
            description: `Error at step: ${node.title}`,
          });
          return;
        }
        
        nodeRun.endTime = new Date().toISOString();
        currentNodeIndex++;
        runNextNode();
      }, 1000 + Math.random() * 2000);
    };

    runNextNode();
  }, [currentWorkflow, isRunning, nodes, connections, updateNodeStatus, setIsRunning, setWorkflowRuns, toast]);

  return {
    runWorkflow,
  };
};
