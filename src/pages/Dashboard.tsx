
import { Bot, BarChart3, CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AgentStatusCards } from "@/components/dashboard/AgentStatusCards";
import { NotificationsWidget } from "@/components/dashboard/NotificationsWidget";
import { TaskCompletionChart } from "@/components/dashboard/TaskCompletionChart";
import { QuickFilters } from "@/components/dashboard/QuickFilters";
import { WorkflowInsights } from "@/components/dashboard/WorkflowInsights";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Agent Orchestration Dashboard</h1>
        <QuickFilters />
      </div>

      <AgentStatusCards />

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
    </div>
  );
}
