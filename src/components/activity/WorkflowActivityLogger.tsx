
import { useState, useEffect } from "react";
import { useWorkflow } from "@/hooks/useWorkflow";
import { WorkflowRun } from "@/types/workflow";

interface WorkflowActivityLoggerProps {
  onLogActivity?: (logEntry: string) => void;
}

export function WorkflowActivityLogger({ onLogActivity }: WorkflowActivityLoggerProps) {
  const { workflowRuns, currentWorkflow } = useWorkflow();
  const [previousRunsCount, setPreviousRunsCount] = useState<number>(0);
  
  useEffect(() => {
    // If there's a new run, log it
    if (workflowRuns.length > previousRunsCount && currentWorkflow) {
      const latestRun = workflowRuns[workflowRuns.length - 1];
      
      // Format timestamp
      const timestamp = new Date().toLocaleTimeString();
      
      // Create log message
      const logMessage = `[${timestamp}] • Workflow ${currentWorkflow.title} run by ${latestRun.triggeredBy} with ${latestRun.nodeRuns.length} steps → Status: ${latestRun.status === 'completed' ? 'Success' : latestRun.status === 'error' ? 'Failed' : 'Running'}`;
      
      // Send to parent component or activity log system
      if (onLogActivity) {
        onLogActivity(logMessage);
      }
      
      // Log to console as fallback
      console.log("Workflow Activity:", logMessage);
      
      setPreviousRunsCount(workflowRuns.length);
    }
  }, [workflowRuns, previousRunsCount, currentWorkflow, onLogActivity]);
  
  // This is a "silent" component that doesn't render anything visible
  return null;
}
