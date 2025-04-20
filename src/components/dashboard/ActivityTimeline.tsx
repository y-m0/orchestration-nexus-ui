
import { Activity } from "lucide-react";
import { WorkflowRun } from "@/types/workflow";
import { useWorkflow } from "@/hooks/useWorkflow";
import { useState, useEffect } from "react";

interface TimelineItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  status: 'success' | 'pending' | 'error';
  workflowId?: string;
  nodeId?: string;
}

interface ActivityTimelineProps {
  items?: TimelineItem[];
  maxItems?: number;
  onItemClick?: (item: TimelineItem) => void;
}

export function ActivityTimeline({ items: propItems, maxItems = 5, onItemClick }: ActivityTimelineProps) {
  const { workflowRuns } = useWorkflow();
  const [items, setItems] = useState<TimelineItem[]>(propItems || []);
  
  useEffect(() => {
    // If items are provided as props, use those
    if (propItems) {
      setItems(propItems);
      return;
    }
    
    // Listen for workflow activity logs from console
    const consoleLog = console.log;
    const activityLogs: TimelineItem[] = [];
    
    console.log = function(message: any, ...optionalParams: any[]) {
      consoleLog.apply(console, [message, ...optionalParams]);
      
      // Check if this is an activity log message
      if (typeof message === 'string' && message.startsWith('Activity Log:')) {
        const logMessage = message.substring('Activity Log:'.length).trim();
        const timestamp = new Date().toISOString();
        
        // Extract workflow ID and status from log message if possible
        const workflowMatch = logMessage.match(/Workflow\s+([a-zA-Z0-9-]+)/i);
        const workflowId = workflowMatch ? workflowMatch[1] : undefined;
        
        const statusMatch = logMessage.match(/(completed|failed|started|created|updated)/i);
        const status = statusMatch 
          ? statusMatch[1].toLowerCase() === 'completed' ? 'success' 
          : statusMatch[1].toLowerCase() === 'failed' ? 'error'
          : 'pending'
          : 'pending';
        
        activityLogs.unshift({
          id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          title: logMessage.split('at')[0].trim(),
          description: logMessage.includes('at') ? `at ${logMessage.split('at')[1].trim()}` : '',
          timestamp,
          status,
          workflowId
        });
        
        // Update the timeline with the new log
        setItems(prev => [...activityLogs, ...prev].slice(0, maxItems));
      }
    };
    
    // Generate items from workflow runs
    const generatedItems: TimelineItem[] = workflowRuns
      .slice()
      .reverse()
      .slice(0, maxItems)
      .map(run => {
        const status = run.status === 'completed' ? 'success' : 
                      run.status === 'running' ? 'pending' : 'error';
                      
        return {
          id: run.id,
          title: `Workflow ${run.workflowId.slice(-5)} ${run.status}`,
          description: `${run.nodeRuns.length} nodes processed`,
          timestamp: new Date(run.startTime).toLocaleString(),
          status,
          workflowId: run.workflowId
        };
      });
    
    setItems([...activityLogs, ...generatedItems].slice(0, maxItems));
    
    // Cleanup
    return () => {
      console.log = consoleLog;
    };
  }, [propItems, workflowRuns, maxItems]);
  
  const handleItemClick = (item: TimelineItem) => {
    if (onItemClick) {
      onItemClick(item);
    } else {
      // Default behavior - maybe open the workflow detail view
      console.log("Activity item clicked:", item);
    }
  };
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Activity className="h-5 w-5 text-[#9b87f5]" />
        Recent Activity
      </h2>
      <div className="space-y-4">
        {items.length > 0 ? (
          items.map((item) => (
            <div 
              key={item.id} 
              className="flex gap-4 cursor-pointer hover:bg-slate-50 p-1 rounded transition-colors"
              onClick={() => handleItemClick(item)}
            >
              <div className={`w-2 h-2 mt-2 rounded-full ${
                item.status === 'success' ? 'bg-green-500' :
                item.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
              }`} />
              <div className="flex-1">
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-600">{item.description}</p>
                <p className="text-xs text-gray-500 mt-1">{item.timestamp}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted-foreground py-4">No recent activity</p>
        )}
      </div>
    </div>
  );
}
