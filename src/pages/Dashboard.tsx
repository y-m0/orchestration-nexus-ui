
import { Bot, BarChart3, CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AgentStatusCards } from "@/components/dashboard/AgentStatusCards";
import { NotificationsWidget } from "@/components/dashboard/NotificationsWidget";
import { TaskCompletionChart } from "@/components/dashboard/TaskCompletionChart";
import { QuickFilters } from "@/components/dashboard/QuickFilters";
import { WorkflowInsights } from "@/components/dashboard/WorkflowInsights";
import { ActivityTimeline } from "@/components/dashboard/ActivityTimeline";
import { WorkflowActivityLogger } from "@/components/activity/WorkflowActivityLogger";
import { useState, useEffect } from "react";
import { useWorkflow } from "@/hooks/useWorkflow";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [activityLogs, setActivityLogs] = useState<string[]>([]);
  const { workflowRuns } = useWorkflow();
  const navigate = useNavigate();

  // Stats for workflows that impact the agent counts
  const [agentStats, setAgentStats] = useState({
    active: 16, // Default values
    idle: 5,
    error: 3
  });

  const handleLogActivity = (logEntry: string) => {
    setActivityLogs(prev => [logEntry, ...prev].slice(0, 10));
  };

  // Update agent stats based on workflow runs
  useEffect(() => {
    if (workflowRuns.length > 0) {
      // Get the most recent runs
      const recentRuns = [...workflowRuns].sort(
        (a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
      ).slice(0, 5);

      // Count active runs and nodes
      const activeRuns = recentRuns.filter(run => run.status === 'running');
      
      if (activeRuns.length > 0) {
        // Count active, error, and idle nodes
        let activeAgents = 0;
        let errorAgents = 0;
        
        activeRuns.forEach(run => {
          activeAgents += run.nodeRuns.filter(node => node.status === 'running').length;
          errorAgents += run.nodeRuns.filter(node => node.status === 'error').length;
        });
        
        // Calculate idle as the difference between total and active/error
        // Using the default total as reference
        const totalAgents = agentStats.active + agentStats.idle + agentStats.error;
        const idleAgents = Math.max(0, totalAgents - activeAgents - errorAgents);
        
        setAgentStats({
          active: activeAgents > 0 ? activeAgents : agentStats.active,
          idle: idleAgents,
          error: errorAgents > 0 ? errorAgents : agentStats.error
        });
      }
    }
  }, [workflowRuns]);

  // Handle timeline item click to navigate to the workflow
  const handleTimelineItemClick = (item: any) => {
    if (item.workflowId) {
      navigate(`/workflows?id=${item.workflowId}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Agent Orchestration Dashboard</h1>
        <QuickFilters />
      </div>

      <AgentStatusCards 
        activeAgents={agentStats.active} 
        idleAgents={agentStats.idle} 
        errorAgents={agentStats.error} 
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Task Completion</CardTitle>
              <CardDescription>Tasks completed over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <TaskCompletionChart />
            </CardContent>
          </Card>
        </div>
        <WorkflowInsights />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ActivityTimeline 
          onItemClick={handleTimelineItemClick}
        />
        <NotificationsWidget />
      </div>
      
      {/* Silent component that logs workflow activity */}
      <WorkflowActivityLogger onLogActivity={handleLogActivity} />
    </div>
  );
}
