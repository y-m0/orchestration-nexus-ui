import { Bot, BarChart3, CheckCircle2, AlertCircle, User, FolderOpen, Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AgentStatusCards } from "@/components/dashboard/AgentStatusCards";
import { NotificationsWidget } from "@/components/dashboard/NotificationsWidget";
import { TaskCompletionChart } from "@/components/dashboard/TaskCompletionChart";
import { QuickFilters } from "@/components/dashboard/QuickFilters";
import { WorkflowInsights } from "@/components/dashboard/WorkflowInsights";
import { ActivityTimeline } from "@/components/dashboard/ActivityTimeline";
import { useState, useEffect } from "react";
import { useWorkflow } from "@/hooks/useWorkflow";
import { useNavigate } from "react-router-dom";
import { useMemory } from "@/lib/memory/memoryContext";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { WorkflowApprovals } from "@/components/approvals/WorkflowApprovals";
import { StatusCard } from "@/components/dashboard/StatusCard";
import { useIsMobile } from "@/hooks/useIsMobile";
import { PendingApprovalsFeed, Approval } from "@/components/dashboard/PendingApprovalsFeed";

function useDashboardActivity() {
  const { workflowRuns, currentWorkflow } = useWorkflow();
  const { searchMemory } = useMemory();
  const [memoryActivity, setMemoryActivity] = useState<any[]>([]);
  const [systemHealth, setSystemHealth] = useState({
    workflowsRunning: 0,
    agentsActive: 0,
    pendingApprovals: 0,
    memoryUsage: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      searchMemory("system status", 1).catch(() => {});
    }, 60000);
    
    return () => clearInterval(interval);
  }, [searchMemory]);
  
  useEffect(() => {
    const runningWorkflows = workflowRuns.filter(run => run.status === 'running').length;
    
    let activeAgents = 0;
    workflowRuns.forEach(run => {
      if (run.status === 'running') {
        activeAgents += run.nodeRuns.filter(node => node.status === 'running').length;
      }
    });
    
    let pendingApprovals = 0;
    workflowRuns.forEach(run => {
      if (run.status === 'running') {
        pendingApprovals += run.nodeRuns.filter(node => 
          node.status === 'running' && node.nodeId?.includes('human')
        ).length;
      }
    });
    
    setSystemHealth({
      workflowsRunning: runningWorkflows,
      agentsActive: activeAgents,
      pendingApprovals: pendingApprovals,
      memoryUsage: Math.floor(Math.random() * 100)
    });
  }, [workflowRuns]);
  
  return {
    systemHealth,
    memoryActivity
  };
}

export default function Dashboard() {
  const [activityLogs, setActivityLogs] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [memoryResults, setMemoryResults] = useState<any[]>([]);
  const { workflowRuns } = useWorkflow();
  const { searchMemory } = useMemory();
  const navigate = useNavigate();
  const { systemHealth } = useDashboardActivity();
  const isMobile = useIsMobile();
  const [mockApprovals, setMockApprovals] = useState<Approval[]>([
    {
      id: "appr-1",
      workflowName: "Expense Approval",
      requester: "Anna",
      submittedAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
      status: "pending",
      stakeholder: "John Appleseed"
    },
    {
      id: "appr-2",
      workflowName: "Content Review",
      requester: "Ben",
      submittedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      status: "approved",
      stakeholder: "Sarah Connor"
    },
    {
      id: "appr-3",
      workflowName: "Data Analysis",
      requester: "Charlie",
      submittedAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
      status: "pending",
      stakeholder: "Priya Patel"
    },
  ]);

  const [agentStats, setAgentStats] = useState({
    active: 16,
    idle: 5,
    error: 3
  });

  const handleLogActivity = (logEntry: string) => {
    setActivityLogs(prev => [logEntry, ...prev].slice(0, 10));
    console.log(`Activity Log: ${logEntry}`);
  };

  useEffect(() => {
    if (!searchQuery || searchQuery.length < 3) {
      setMemoryResults([]);
      return;
    }

    const searchMemoryItems = async () => {
      try {
        const results = await searchMemory(searchQuery, 5);
        setMemoryResults(results);
        if (results.length > 0) {
          console.log(`Activity Log: Memory searched for "${searchQuery}" with ${results.length} results`);
        }
      } catch (error) {
        console.error("Error searching memory:", error);
      }
    };

    const debounceTimer = setTimeout(searchMemoryItems, 500);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, searchMemory]);

  useEffect(() => {
    if (workflowRuns.length > 0) {
      const recentRuns = [...workflowRuns].sort(
        (a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
      ).slice(0, 5);

      const activeRuns = recentRuns.filter(run => run.status === 'running');
      
      if (activeRuns.length > 0) {
        let activeAgents = 0;
        let errorAgents = 0;
        
        activeRuns.forEach(run => {
          activeAgents += run.nodeRuns.filter(node => node.status === 'running').length;
          errorAgents += run.nodeRuns.filter(node => node.status === 'error').length;
        });
        
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

  const handleTimelineItemClick = (item: any) => {
    if (item.workflowId) {
      navigate(`/workflows?id=${item.workflowId}`);
    } else if (item.agentId) {
      navigate(`/agents?id=${item.agentId}`);
    }
  };

  const handleViewWorkflow = (workflowId: string, nodeId?: string) => {
    navigate(`/workflows?id=${workflowId}${nodeId ? `&nodeId=${nodeId}` : ''}`);
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
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>System Health</CardTitle>
              <CardDescription>Current system metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <StatusCard
                  title="Workflows Running"
                  value="4"
                  icon={<FolderOpen className="h-4 w-4 text-primary" />}
                />
                <StatusCard
                  title="Active Agents"
                  value="23"
                  icon={<User className="h-4 w-4 text-[#9b87f5]" />}
                />
                <StatusCard
                  title="Pending Approvals"
                  value="7"
                  icon={<Clock className="h-4 w-4 text-yellow-500" />}
                />
                <StatusCard
                  title="Memory Usage"
                  value="44%"
                  icon={<BarChart3 className="h-4 w-4 text-[#7E69AB]" />}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`${isMobile ? 'order-2' : ''} md:col-span-2`}>
          <WorkflowInsights />
        </div>
        <div className={`${isMobile ? 'order-1' : ''}`}>
          <PendingApprovalsFeed approvals={mockApprovals.filter(a => a.status === "pending")} onView={handleViewWorkflow} />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Activity</CardTitle>
          <CardDescription>Platform events: configuration updates, tool runs, errors, integrations, and settings changes</CardDescription>
        </CardHeader>
        <CardContent>
          <ActivityTimeline 
            onItemClick={handleTimelineItemClick}
            showFilters
            maxItems={10}
            items={[]} // In a real implementation, filter only system/tool events
          />
        </CardContent>
      </Card>
    </div>
  );
}
