
import { useState, useRef, useEffect } from "react";
import { useWorkflow } from "@/hooks/useWorkflow";
import { WorkflowNode as IWorkflowNode } from "@/types/workflow";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Bot, GitBranch, User, Database, FileCheck, CheckCircle, AlertTriangle } from "lucide-react";

interface WorkflowCanvasProps {
  workflowId?: string;
}

export function WorkflowCanvas({ workflowId }: WorkflowCanvasProps) {
  const { nodes, connections, moveNode, loadWorkflow } = useWorkflow();
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (workflowId) {
      loadWorkflow(workflowId);
    }
  }, [workflowId, loadWorkflow]);

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

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'agent':
        return <Bot className="h-4 w-4" />;
      case 'logic':
        return <GitBranch className="h-4 w-4" />;
      case 'human':
        return <User className="h-4 w-4" />;
      case 'io':
        return <Database className="h-4 w-4" />;
      default:
        return <FileCheck className="h-4 w-4" />;
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div 
      ref={canvasRef}
      className="flex-1 bg-muted/10 relative overflow-auto min-h-[500px] border rounded-md"
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
            "absolute p-3 rounded-lg border shadow-md cursor-move bg-background",
            node.type === 'agent' ? 'border-primary/50' : 
            node.type === 'logic' ? 'border-blue-500/50' : 
            node.type === 'human' ? 'border-orange-500/50' :
            'border-yellow-500/50'
          )}
          style={{
            left: node.position.x,
            top: node.position.y,
            transform: 'translate(-50%, -50%)',
            minWidth: '150px'
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            {getNodeIcon(node.type)}
            <span className="font-medium text-sm">{node.title}</span>
            {node.status && getStatusIcon(node.status)}
          </div>
          {node.description && (
            <p className="text-xs text-muted-foreground">{node.description}</p>
          )}
          {node.tags && node.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {node.tags.map((tag, i) => (
                <Badge key={i} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      ))}
      <svg className="absolute inset-0 pointer-events-none" style={{width: '100%', height: '100%'}}>
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
