
import { useState } from 'react';
import { WorkflowNode, WorkflowConnection } from '@/types/workflow';

export const useWorkflow = () => {
  const [nodes, setNodes] = useState<WorkflowNode[]>([]);
  const [connections, setConnections] = useState<WorkflowConnection[]>([]);

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

  const connectNodes = (sourceId: string, targetId: string) => {
    const connectionId = `connection-${Date.now()}`;
    setConnections(prev => [...prev, {
      id: connectionId,
      source: sourceId,
      target: targetId,
    }]);
  };

  return {
    nodes,
    connections,
    addNode,
    moveNode,
    connectNodes,
  };
};
