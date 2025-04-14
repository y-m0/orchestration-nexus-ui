
import { DragEvent, ReactNode } from "react";

interface WorkflowNodeProps {
  title: string;
  icon: ReactNode;
  type: 'agent' | 'logic' | 'io';
  draggable?: boolean;
}

export function WorkflowNode({ title, icon, type, draggable = false }: WorkflowNodeProps) {
  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    // Set data for drag and drop
    e.dataTransfer.setData("application/reactflow", JSON.stringify({ type, title }));
    e.dataTransfer.effectAllowed = "move";
  };
  
  return (
    <div
      className={`
        p-3 rounded-md border border-border/40 flex items-center gap-3 cursor-pointer
        ${type === 'agent' ? 'bg-primary/10' : 
          type === 'logic' ? 'bg-blue-500/10' : 'bg-yellow-500/10'}
      `}
      draggable={draggable}
      onDragStart={draggable ? handleDragStart : undefined}
    >
      {icon}
      <span className="text-sm">{title}</span>
    </div>
  );
}
