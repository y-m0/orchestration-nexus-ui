
import { useEffect, useState } from 'react';
import { useMemory } from '@/lib/memory/memoryContext';
import { useWorkflow } from '@/hooks/useWorkflow';
import { formatDateTime } from '@/lib/utils';
import { MemoryItem } from '@/types/memory';
import { Badge } from '@/components/ui/badge';

interface WorkflowActivityLoggerProps {
  limit?: number;
  onlyLatest?: boolean;
  onLogActivity?: (logEntry: string) => void;
}

export function WorkflowActivityLogger({ 
  limit = 10, 
  onlyLatest = false, 
  onLogActivity 
}: WorkflowActivityLoggerProps) {
  const [logs, setLogs] = useState<MemoryItem[]>([]);
  const { searchMemory, storeMemory } = useMemory();
  const { workflowRuns } = useWorkflow();
  
  // Monitor workflow runs and store in memory
  useEffect(() => {
    const processWorkflowRuns = async () => {
      if (workflowRuns.length === 0) return;
      
      // Get the latest run
      const latestRun = [...workflowRuns].sort(
        (a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
      )[0];
      
      // Store it in memory
      if (latestRun) {
        const text = `Workflow ${latestRun.workflowId} ${latestRun.status} at ${formatDateTime(latestRun.startTime)}`;
        
        const memoryItem = await storeMemory(text, {
          workflowId: latestRun.workflowId,
          type: 'workflow',
          tags: ['activity', latestRun.status]
        });
        
        // Notify parent component if needed
        if (onLogActivity) {
          onLogActivity(text);
        }
      }
    };
    
    processWorkflowRuns();
  }, [workflowRuns, storeMemory, onLogActivity]);
  
  // Load workflow logs from memory
  useEffect(() => {
    const fetchWorkflowLogs = async () => {
      try {
        const results = await searchMemory('workflow activity', limit);
        const logItems = results.map(result => result.item);
        setLogs(logItems);
      } catch (err) {
        console.error('Error fetching workflow logs:', err);
      }
    };
    
    fetchWorkflowLogs();
    
    // Set up a periodic refresh
    const intervalId = setInterval(fetchWorkflowLogs, 30000);
    
    return () => clearInterval(intervalId);
  }, [searchMemory, limit]);
  
  // Only render actual logs when needed
  if (onlyLatest || logs.length === 0) {
    return null;
  }
  
  return (
    <div className="space-y-2">
      {logs.map(log => (
        <div key={log.id} className="text-sm">
          <Badge variant="outline" className="mr-2">
            {log.metadata.type}
          </Badge>
          <span>{log.text}</span>
        </div>
      ))}
    </div>
  );
}
