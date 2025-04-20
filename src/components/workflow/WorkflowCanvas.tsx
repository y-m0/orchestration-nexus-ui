
import { useState, useRef } from "react";
import { useWorkflow } from "@/hooks/useWorkflow";
import { WorkflowNode as IWorkflowNode } from "@/types/workflow";
import { cn } from "@/lib/utils";

export function WorkflowCanvas() {
  const { nodes, connections, moveNode } = useWorkflow();
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.DragEvent, nodeId: string) => {
    setDraggingNodeId(nodeId);
    e.dataTransfer.setData('text/plain', nodeId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!canvasRef.current || !draggingNodeId) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    moveNode(draggingNodeId, { x, y });
  };

  const handleDragEnd = () => {
    setDraggingNodeId(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggingNodeId(null);
  };

  return (
    <div 
      ref={canvasRef}
      className="flex-1 bg-muted/10 relative overflow-hidden"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {nodes.map((node) => (
        <div
          key={node.id}
          draggable
          onDragStart={(e) => handleDragStart(e, node.id)}
          onDragEnd={handleDragEnd}
          className={cn(
            "absolute p-4 rounded-lg border shadow-md cursor-move bg-background",
            node.type === 'agent' ? 'border-primary/50' : 
            node.type === 'logic' ? 'border-blue-500/50' : 'border-yellow-500/50'
          )}
          style={{
            left: node.position.x,
            top: node.position.y,
            transform: 'translate(-50%, -50%)'
          }}
        >
          {node.title}
        </div>
      ))}
      <svg className="absolute inset-0 pointer-events-none">
        {connections.map((connection) => {
          const sourceNode = nodes.find(n => n.id === connection.source);
          const targetNode = nodes.find(n => n.id === connection.target);
          if (!sourceNode || !targetNode) return null;

          return (
            <line
              key={connection.id}
              x1={sourceNode.position.x}
              y1={sourceNode.position.y}
              x2={targetNode.position.x}
              y2={targetNode.position.y}
              stroke="currentColor"
              strokeWidth={2}
              strokeOpacity={0.3}
            />
          );
        })}
      </svg>
    </div>
  );
}
