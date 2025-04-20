
import { useState } from "react";
import { ChevronRight, Play, Square, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { WorkflowCanvas } from "./WorkflowCanvas";
import { cn } from "@/lib/utils";

interface WorkflowCardProps {
  title: string;
  description: string;
  trigger: string;
  complexity: "low" | "medium" | "high";
  status?: "idle" | "running" | "completed" | "error";
  successRate?: number;
  avgRunTime?: string;
  workflowId: string;
}

export function WorkflowCard({ 
  title, 
  description, 
  trigger, 
  complexity, 
  status = "idle", 
  successRate, 
  avgRunTime,
  workflowId
}: WorkflowCardProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const handleRun = () => {
    setIsRunning(!isRunning);
  };
  
  const complexityColors = {
    low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  };
  
  const statusColors = {
    idle: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300",
    running: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    error: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  };

  return (
    <>
      <Card className="w-full hover:shadow-md transition-shadow duration-200">
        <CardContent className="p-5">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-muted-foreground text-sm mb-2">{description}</p>
            </div>
            <Badge className={complexityColors[complexity]}>
              {complexity.charAt(0).toUpperCase() + complexity.slice(1)} Complexity
            </Badge>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline" className="flex gap-1 items-center">
              <Clock className="h-3 w-3" /> Trigger: {trigger}
            </Badge>
            {status && (
              <Badge className={statusColors[status]}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Badge>
            )}
            {successRate !== undefined && (
              <Badge variant="outline" className="bg-background">
                {successRate}% Success Rate
              </Badge>
            )}
            {avgRunTime && (
              <Badge variant="outline" className="bg-background">
                Avg. Run: {avgRunTime}
              </Badge>
            )}
          </div>
          
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={() => setIsOpen(true)}>
              Open Workflow <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
            <Button onClick={handleRun}>
              {isRunning ? (
                <>
                  <Square className="h-4 w-4 mr-1" /> Stop
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-1" /> Run
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-auto p-2 bg-muted/20">
            <WorkflowCanvas workflowId={workflowId} />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Close
            </Button>
            <Button onClick={handleRun}>
              {isRunning ? (
                <>
                  <Square className="h-4 w-4 mr-1" /> Stop
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-1" /> Run
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
