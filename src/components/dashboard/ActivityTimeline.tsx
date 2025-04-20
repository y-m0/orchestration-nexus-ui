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
}

interface ActivityTimelineProps {
  items?: TimelineItem[];
  maxItems?: number;
}

export function ActivityTimeline({ items: propItems, maxItems = 5 }: ActivityTimelineProps) {
  const { workflowRuns } = useWorkflow();
  const [items, setItems] = useState<TimelineItem[]>(propItems || []);
  
  useEffect(() => {
    // If items are provided as props, use those
    if (propItems) {
      setItems(propItems);
      return;
    }
    
    // Otherwise, generate items from workflow runs
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
          status
        };
      });
    
    setItems(generatedItems);
  }, [propItems, workflowRuns, maxItems]);
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Activity className="h-5 w-5 text-[#9b87f5]" />
        Recent Activity
      </h2>
      <div className="space-y-4">
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className="flex gap-4">
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
