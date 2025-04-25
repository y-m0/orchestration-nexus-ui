
import { useEffect, useState } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes: Node[] = [
  {
    id: 'start',
    type: 'input',
    position: { x: 150, y: 50 },
    data: { label: 'Start' },
  },
];

const nodeSteps: Node[] = [
  {
    id: 'llm',
    type: 'default',
    position: { x: 150, y: 150 },
    data: { label: 'Process with LLM' },
    className: 'bg-purple-500/10 border-purple-500/30',
  },
  {
    id: 'approval',
    type: 'default',
    position: { x: 150, y: 250 },
    data: { label: 'Manager Approval' },
    className: 'border-yellow-500/30 bg-yellow-500/10',
  },
  {
    id: 'end',
    type: 'output',
    position: { x: 150, y: 350 },
    data: { label: 'Complete' },
  },
];

const edgeSteps: Edge[] = [
  {
    id: 'e-start-llm',
    source: 'start',
    target: 'llm',
    animated: true,
  },
  {
    id: 'e-llm-approval',
    source: 'llm',
    target: 'approval',
    animated: true,
  },
  {
    id: 'e-approval-end',
    source: 'approval',
    target: 'end',
    animated: true,
  },
];

export function AnimatedWorkflow() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((current) => {
        const nextStep = (current + 1) % (nodeSteps.length + 1);
        
        if (nextStep === 0) {
          // Reset animation
          setNodes(initialNodes);
          setEdges([]);
          return nextStep;
        }

        setNodes([...initialNodes, ...nodeSteps.slice(0, nextStep)]);
        setEdges(edgeSteps.slice(0, nextStep));
        return nextStep;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden border border-purple-500/30 bg-background/60 backdrop-blur-sm">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        nodesDraggable={false}
        nodesConnectable={false}
        zoomOnScroll={false}
        panOnDrag={false}
        zoomOnPinch={false}
        panOnScroll={false}
        preventScrolling={true}
      />
    </div>
  );
}
