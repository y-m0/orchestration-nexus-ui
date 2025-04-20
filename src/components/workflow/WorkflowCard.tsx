
import { useState } from "react";
import { ChevronRight, Play, Square, Clock, Calendar, Activity, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { WorkflowCanvas } from "./WorkflowCanvas";
import { cn } from "@/lib/utils";
import { useWorkflow } from "@/hooks/useWorkflow";

interface WorkflowCardProps {
  title: string;
  description: string;
  trigger: string;
  complexity: "low" | "medium" | "high";
  status?: "idle" | "running" | "completed" | "error";
  successRate?: number;
  avgRunTime?: string;
  workflowId: string;
  lastModifiedBy?: string;
  updatedAt?: string;
  totalRuns?: number;
}

export function WorkflowCard({ 
  title, 
  description, 
  trigger, 
  complexity, 
  status = "idle", 
  successRate, 
  avgRunTime,
  workflowId,
  lastModifiedBy,
  updatedAt,
  totalRuns = 0
}: WorkflowCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { runWorkflow, stopWorkflow, isRunning, loadWorkflow } = useWorkflow();
  
  const handleToggleRun = () => {
    if (isRunning) {
      stopWorkflow();
    } else {
      loadWorkflow(workflowId);
      runWorkflow();
    }
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
              {lastModifiedBy && updatedAt && (
                <p className="text-xs text-muted-foreground flex items-center">
                  <User className="h-3 w-3 mr-1" />
                  Last modified by {lastModifiedBy} • {updatedAt}
                </p>
              )}
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
            {totalRuns > 0 && (
              <Badge variant="outline" className="bg-background flex gap-1 items-center">
                <Activity className="h-3 w-3" />
                {totalRuns} Runs
              </Badge>
            )}
          </div>
          
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={() => setIsOpen(true)}>
              Open Workflow <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
            <Button onClick={handleToggleRun}>
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
        <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span>{title}</span>
              <Badge className={statusColors[status]}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Badge>
            </DialogTitle>
            <p className="text-sm text-muted-foreground">{description}</p>
          </DialogHeader>
          <div className="flex-1 overflow-auto p-2 bg-muted/20">
            <WorkflowCanvas workflowId={workflowId} />
          </div>
          <DialogFooter className="flex justify-between items-center border-t pt-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Last Run: {updatedAt || 'Never'}</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Close
              </Button>
              <Button onClick={handleToggleRun}>
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
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
