
import { useState, useCallback } from 'react';
import { WorkflowNode, WorkflowConnection, Workflow, WorkflowRun } from '@/types/workflow';
import { predefinedWorkflows } from '@/data/workflows';
import { useToast } from '@/hooks/use-toast';

export const useWorkflow = () => {
  const [nodes, setNodes] = useState<WorkflowNode[]>([]);
  const [connections, setConnections] = useState<WorkflowConnection[]>([]);
  const [currentWorkflow, setCurrentWorkflow] = useState<Workflow | null>(null);
  const [workflowRuns, setWorkflowRuns] = useState<WorkflowRun[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const { toast } = useToast();

  const addNode = (node: Omit<WorkflowNode, 'id' | 'position'>) => {
    const newNode: WorkflowNode = {
      ...node,
      id: `node-${Date.now()}`,
      position: { x: 200, y: 200 },
    };
    setNodes(prev => [...prev, newNode]);
  };

  const moveNode = (id: string, position: { x: number; y: number }) => {
    setNodes(prev => prev.map(node => 
      node.id === id ? { ...node, position } : node
    ));
  };

  const connectNodes = (sourceId: string, targetId: string, label?: string, condition?: string) => {
    const connectionId = `connection-${Date.now()}`;
    setConnections(prev => [...prev, {
      id: connectionId,
      source: sourceId,
      target: targetId,
      label,
      condition
    }]);
  };

  const updateNodeStatus = (id: string, status: WorkflowNode['status']) => {
    setNodes(prev => prev.map(node => 
      node.id === id ? { ...node, status } : node
    ));
  };

  const loadWorkflow = useCallback((workflowId: string) => {
    const workflow = predefinedWorkflows.find(wf => wf.id === workflowId);
    if (workflow) {
      setNodes(workflow.nodes);
      setConnections(workflow.connections);
      setCurrentWorkflow(workflow);
    }
  }, []);

  const runWorkflow = useCallback(() => {
    if (!currentWorkflow || isRunning) return;

    setIsRunning(true);

    // Reset all node statuses to idle
    setNodes(prev => prev.map(node => ({ ...node, status: 'idle' })));

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
        // Workflow completed
        setIsRunning(false);
        newRun.status = 'completed';
        newRun.endTime = new Date().toISOString();
        setWorkflowRuns(prev => [...prev, newRun]);
        
        toast({
          title: "Workflow completed",
          description: `${currentWorkflow.title} finished successfully`,
        });
        return;
      }

      const node = orderedNodes[currentNodeIndex];
      
      // Update node status to running
      updateNodeStatus(node.id, 'running');
      
      // If node requires human approval and is type 'human'
      if (node.type === 'human' && node.requiresApproval) {
        toast({
          title: "Human approval required",
          description: `${node.title} is waiting for approval`,
        });
        return; // Wait for human approval before continuing
      }

      // Mock node execution with random success/failure
      const nodeRun = {
        nodeId: node.id,
        status: 'running' as 'idle' | 'running' | 'completed' | 'error',
        startTime: new Date().toISOString(),
        output: undefined as any,
        error: undefined as string | undefined,
        endTime: undefined as string | undefined
      };
      
      newRun.nodeRuns.push(nodeRun);

      // Simulate processing time
      const processingTime = 1000 + Math.random() * 2000;
      setTimeout(() => {
        const success = Math.random() > 0.2; // 80% success rate
        
        if (success) {
          updateNodeStatus(node.id, 'completed');
          nodeRun.status = 'completed';
        } else {
          updateNodeStatus(node.id, 'error');
          nodeRun.status = 'error';
          nodeRun.error = 'Simulated error during execution';
          
          // Stop the workflow on error
          setIsRunning(false);
          newRun.status = 'error';
          newRun.endTime = new Date().toISOString();
          setWorkflowRuns(prev => [...prev, newRun]);
          
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
      }, processingTime);
    };

    // Start executing nodes
    runNextNode();
  }, [currentWorkflow, isRunning, nodes, connections, toast]);

  const stopWorkflow = useCallback(() => {
    if (!isRunning) return;
    
    setIsRunning(false);
    
    // Mark all running nodes as error
    setNodes(prev => prev.map(node => 
      node.status === 'running' ? { ...node, status: 'error' } : node
    ));
    
    // Update the current run
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
  }, [isRunning, toast]);
  
  const approveHumanTask = useCallback((nodeId: string) => {
    if (!isRunning) return;
    
    // Update node status to completed
    updateNodeStatus(nodeId, 'completed');
    
    // Continue workflow execution
    // For simplicity, we're not implementing the full logic here
    toast({
      title: "Task approved",
      description: "Workflow execution will continue",
    });
  }, [isRunning, toast]);
  
  const rejectHumanTask = useCallback((nodeId: string) => {
    if (!isRunning) return;
    
    // Update node status to error
    updateNodeStatus(nodeId, 'error');
    
    // Stop workflow execution
    setIsRunning(false);
    
    toast({
      variant: "destructive",
      title: "Task rejected",
      description: "Workflow execution was stopped",
    });
  }, [isRunning, toast]);

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
    rejectHumanTask
  };
};
