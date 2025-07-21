import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Play, 
  Square, 
  Settings, 
  Activity,
  Brain,
  Network,
  Zap,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";
import { getWorkflowStatus, triggerOrchestration, getSecurityAnalysis } from "@/services/claudeFlowApi";

interface SwarmAgent {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'idle' | 'error';
  tasks: number;
  lastActivity: string;
}

interface SwarmMetrics {
  totalAgents: number;
  activeAgents: number;
  tasksCompleted: number;
  averageResponseTime: string;
  successRate: number;
}

export default function SwarmOrchestration() {
  const [swarmStatus, setSwarmStatus] = useState<any>(null);
  const [swarmError, setSwarmError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [taskInput, setTaskInput] = useState("");
  const [orchestrationResult, setOrchestrationResult] = useState<any>(null);
  const [orchestrationError, setOrchestrationError] = useState<string | null>(null);
  const [securityResults, setSecurityResults] = useState<any>(null);
  const [securityError, setSecurityError] = useState<string | null>(null);
  
  // Mock swarm data
  const [swarmAgents] = useState<SwarmAgent[]>([
    { id: "agent-1", name: "Coordinator", type: "coordinator", status: "active", tasks: 15, lastActivity: "2 min ago" },
    { id: "agent-2", name: "Coder", type: "coder", status: "active", tasks: 8, lastActivity: "1 min ago" },
    { id: "agent-3", name: "Researcher", type: "researcher", status: "idle", tasks: 12, lastActivity: "5 min ago" },
    { id: "agent-4", name: "Analyst", type: "analyst", status: "active", tasks: 6, lastActivity: "30 sec ago" },
    { id: "agent-5", name: "Tester", type: "tester", status: "error", tasks: 3, lastActivity: "10 min ago" },
  ]);

  const [swarmMetrics] = useState<SwarmMetrics>({
    totalAgents: 5,
    activeAgents: 3,
    tasksCompleted: 44,
    averageResponseTime: "1.2s",
    successRate: 94.5
  });

  useEffect(() => {
    fetchSwarmStatus();
    fetchSecurityAnalysis();
    
    // Set up polling for real-time updates
    const interval = setInterval(fetchSwarmStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchSwarmStatus = async () => {
    try {
      setSwarmError(null);
      const status = await getWorkflowStatus();
      setSwarmStatus(status);
    } catch (error) {
      console.error("Failed to fetch swarm status:", error);
      setSwarmError(error instanceof Error ? error.message : 'Unknown error occurred');
    }
  };

  const fetchSecurityAnalysis = async () => {
    try {
      setSecurityError(null);
      const results = await getSecurityAnalysis();
      setSecurityResults(results);
    } catch (error) {
      console.error("Failed to fetch security analysis:", error);
      setSecurityError(error instanceof Error ? error.message : 'Unknown error occurred');
    }
  };

  const handleTriggerOrchestration = async () => {
    if (!taskInput.trim()) return;
    
    setIsLoading(true);
    setOrchestrationError(null);
    try {
      const result = await triggerOrchestration(taskInput);
      setOrchestrationResult(result);
      setTaskInput("");
      
      // Refresh status after triggering
      setTimeout(fetchSwarmStatus, 1000);
    } catch (error) {
      console.error("Failed to trigger orchestration:", error);
      setOrchestrationError(error instanceof Error ? error.message : 'Unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'idle':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <Network className="h-6 w-6 text-purple-500" />
            Swarm Orchestration
          </h1>
          <p className="text-muted-foreground">Manage and monitor your AI agent swarm</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchSwarmStatus}>
            <Activity className="h-4 w-4 mr-2" />
            Refresh Status
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Swarm Settings
          </Button>
        </div>
      </div>

      {/* Swarm Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Agents</p>
                <p className="text-2xl font-bold">{swarmMetrics.totalAgents}</p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Agents</p>
                <p className="text-2xl font-bold text-green-500">{swarmMetrics.activeAgents}</p>
              </div>
              <Zap className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tasks Completed</p>
                <p className="text-2xl font-bold">{swarmMetrics.tasksCompleted}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold text-purple-500">{swarmMetrics.successRate}%</p>
              </div>
              <Brain className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Task Orchestration */}
      <Card>
        <CardHeader>
          <CardTitle>Task Orchestration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter task description (e.g., 'Deploy microservice', 'Analyze data')"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleTriggerOrchestration()}
              className="flex-1"
            />
            <Button 
              onClick={handleTriggerOrchestration}
              disabled={isLoading || !taskInput.trim()}
            >
              {isLoading ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Orchestrating...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Trigger Orchestration
                </>
              )}
            </Button>
          </div>
          
          {orchestrationResult && (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
              <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Orchestration Triggered</h4>
              <pre className="text-sm text-green-700 dark:text-green-300 overflow-auto">
                {JSON.stringify(orchestrationResult, null, 2)}
              </pre>
            </div>
          )}
          
          {orchestrationError && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
              <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">Orchestration Error</h4>
              <p className="text-sm text-red-700 dark:text-red-300">{orchestrationError}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="agents" className="space-y-4">
        <TabsList>
          <TabsTrigger value="agents">Agent Status</TabsTrigger>
          <TabsTrigger value="workflow">Workflow Status</TabsTrigger>
          <TabsTrigger value="security">Security Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="agents">
          <Card>
            <CardHeader>
              <CardTitle>Swarm Agents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {swarmAgents.map((agent) => (
                  <div key={agent.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(agent.status)}
                      <div>
                        <h4 className="font-medium">{agent.name}</h4>
                        <p className="text-sm text-muted-foreground">{agent.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{agent.tasks} tasks</p>
                      <p className="text-xs text-muted-foreground">{agent.lastActivity}</p>
                    </div>
                    <Badge variant={
                      agent.status === 'active' ? 'default' :
                      agent.status === 'idle' ? 'secondary' : 'destructive'
                    }>
                      {agent.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="workflow">
          <Card>
            <CardHeader>
              <CardTitle>Claude Flow Workflow Status</CardTitle>
            </CardHeader>
            <CardContent>
              {swarmError ? (
                <div className="text-center py-8">
                  <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
                  <p className="text-red-600 dark:text-red-400 font-medium mb-2">Connection Error</p>
                  <p className="text-sm text-muted-foreground">{swarmError}</p>
                  <Button 
                    variant="outline" 
                    onClick={fetchSwarmStatus}
                    className="mt-4"
                  >
                    Retry Connection
                  </Button>
                </div>
              ) : swarmStatus ? (
                <pre className="bg-muted p-4 rounded-md text-sm overflow-auto">
                  {JSON.stringify(swarmStatus, null, 2)}
                </pre>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Activity className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>No workflow status available</p>
                  <p className="text-sm">Make sure Claude Flow is running and connected</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security & Compliance Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              {securityError ? (
                <div className="text-center py-8">
                  <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
                  <p className="text-red-600 dark:text-red-400 font-medium mb-2">Connection Error</p>
                  <p className="text-sm text-muted-foreground">{securityError}</p>
                  <Button 
                    variant="outline" 
                    onClick={fetchSecurityAnalysis}
                    className="mt-4"
                  >
                    Retry Connection
                  </Button>
                </div>
              ) : securityResults ? (
                <pre className="bg-muted p-4 rounded-md text-sm overflow-auto">
                  {JSON.stringify(securityResults, null, 2)}
                </pre>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>No security analysis available</p>
                  <p className="text-sm">Security analysis will appear here when available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}