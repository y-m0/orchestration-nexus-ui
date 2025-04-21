import { Bot, BarChart3, CheckCircle2, AlertCircle, User, FolderOpen, Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AgentStatusCards } from "@/components/dashboard/AgentStatusCards";
import { NotificationsWidget } from "@/components/dashboard/NotificationsWidget";
import { TaskCompletionChart } from "@/components/dashboard/TaskCompletionChart";
import { QuickFilters } from "@/components/dashboard/QuickFilters";
import { WorkflowInsights } from "@/components/dashboard/WorkflowInsights";
import { ActivityTimeline } from "@/components/dashboard/ActivityTimeline";
import { WorkflowActivityLogger } from "@/components/dashboard/WorkflowActivityLogger";
import { useState, useEffect } from "react";
import { useWorkflow } from "@/hooks/useWorkflow";
import { useNavigate } from "react-router-dom";
import { useMemory } from "@/lib/memory/memoryContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { WorkflowApprovals } from "@/components/approvals/WorkflowApprovals";
import { StatusCard } from "@/components/dashboard/StatusCard";
import { useIsMobile } from "@/hooks/useIsMobile";
import { PendingApprovalsFeed } from "@/components/dashboard/PendingApprovalsFeed";

// Custom hook to centralize dashboard activity tracking
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

  // Track memory usage
  useEffect(() => {
    // This would be replaced by real memory tracking in a production system
    const interval = setInterval(() => {
      // Simulate memory activity
      searchMemory("system status", 1).catch(() => {});
    }, 60000); // Every minute
    
    return () => clearInterval(interval);
  }, [searchMemory]);
  
  // Track system health 
  useEffect(() => {
    // Count running workflows
    const runningWorkflows = workflowRuns.filter(run => run.status === 'running').length;
    
    // Count active agents - this is from workflowRuns nodeRuns that are running
    let activeAgents = 0;
    workflowRuns.forEach(run => {
      if (run.status === 'running') {
        activeAgents += run.nodeRuns.filter(node => node.status === 'running').length;
      }
    });
    
    // Count pending approvals - from workflowRuns nodeRuns that need human approval
    let pendingApprovals = 0;
    workflowRuns.forEach(run => {
      if (run.status === 'running') {
        // In a real system, we'd check nodes that are of type 'human' and require approval
        pendingApprovals += run.nodeRuns.filter(node => 
          node.status === 'running' && node.nodeId?.includes('human')
        ).length;
      }
    });
    
    setSystemHealth({
      workflowsRunning: runningWorkflows,
      agentsActive: activeAgents,
      pendingApprovals: pendingApprovals,
      memoryUsage: Math.floor(Math.random() * 100) // Simulated value
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
  const [mockApprovals, setMockApprovals] = useState([
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

  // Stats for workflows that impact the agent counts
  const [agentStats, setAgentStats] = useState({
    active: 16, // Default values
    idle: 5,
    error: 3
  });

  const handleLogActivity = (logEntry: string) => {
    setActivityLogs(prev => [logEntry, ...prev].slice(0, 10));
    
    // Also log to console for ActivityTimeline to pick up
    console.log(`Activity Log: ${logEntry}`);
  };

  // Search memory when query changes
  useEffect(() => {
    if (!searchQuery || searchQuery.length < 3) {
      setMemoryResults([]);
      return;
    }

    const searchMemoryItems = async () => {
      try {
        const results = await searchMemory(searchQuery, 5);
        setMemoryResults(results);
        
        // Log memory search to activity log
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
    } else if (item.agentId) {
      navigate(`/agents?id=${item.agentId}`);
    }
  };
  
  // Handle workflow approval navigation
  const handleViewWorkflow = (workflowId: string, nodeId?: string) => {
    navigate(`/workflows?id=${workflowId}${nodeId ? `&nodeId=${nodeId}` : ''}`);
  };

  // Get recent workflows from runs
  const recentWorkflows = [...workflowRuns]
    .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
    .slice(0, 3);

  // NEW: Separated Activity Panels
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
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Workflows</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {recentWorkflows.map((workflow) => (
                  <div key={workflow.id} className="p-4 hover:bg-muted/50 cursor-pointer" 
                       onClick={() => navigate(`/workflows?id=${workflow.workflowId}`)}>
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium">Workflow {workflow.workflowId.slice(-8)}</h4>
                      <Badge className={
                        workflow.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                        workflow.status === 'error' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                      }>
                        {workflow.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(workflow.startTime).toLocaleDateString()}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(workflow.startTime).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
                {recentWorkflows.length === 0 && (
                  <div className="p-4 text-center text-muted-foreground">
                    No recent workflows
                  </div>
                )}
              </div>
              <div className="p-3 border-t">
                <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/workflows')}>
                  View All Workflows
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2 flex flex-col gap-2">
            <div>
              <CardTitle>Workflow Activity</CardTitle>
              <CardDescription>Recent workflow executions and events</CardDescription>
            </div>
            <div>
              <input
                type="text"
                placeholder="Search memory..."
                className="px-3 py-1 text-sm border rounded-md w-[180px]"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              {memoryResults.length > 0 && (
                <div className="absolute z-10 mt-1 w-[250px] right-0 bg-white dark:bg-gray-800 rounded-md shadow-lg border">
                  {memoryResults.map((result, idx) => (
                    <div key={idx} className="p-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                      <div className="flex items-center">
                        <Badge variant="outline" className="mr-2 text-xs">
                          {result.item.metadata.type || 'memory'}
                        </Badge>
                        <span className="truncate">{result.item.text.substring(0, 50)}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Score: {result.score.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <WorkflowActivityLogger onLogActivity={handleLogActivity} />
            <div className="space-y-2 mt-4">
              {activityLogs.map((log, index) => (
                <div key={index} className="text-sm border-l-2 border-l-primary pl-3 py-1">
                  {log}
                </div>
              ))}
              {activityLogs.length === 0 && (
                <div className="text-center py-8 text-sm text-muted-foreground">
                  No recent workflow activity to display
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        <div>
          <PendingApprovalsFeed approvals={mockApprovals.filter(a => a.status === "pending")} onView={handleViewWorkflow} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ActivityTimeline 
          onItemClick={handleTimelineItemClick}
          showFilters
          maxItems={10}
        />
        <Card>
          <CardHeader>
            <CardTitle>System Activity</CardTitle>
            <CardDescription>Platform events: configuration updates, tool runs, errors, integrations, and settings changes</CardDescription>
          </CardHeader>
          <CardContent>
            {/* You may want to build a filtered ActivityTimeline, but for demo, use the same */}
            <ActivityTimeline 
              onItemClick={handleTimelineItemClick}
              showFilters
              maxItems={5}
              items={[]} // In a real implementation, filter only system/tool events
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
