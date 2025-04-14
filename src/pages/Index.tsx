
import { Bot, Network, Zap } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { StatusCard } from "@/components/dashboard/StatusCard";
import { ActivityTimeline } from "@/components/dashboard/ActivityTimeline";

const mockActivity = [
  {
    id: "1",
    title: "Agent A1 completed task",
    description: "Successfully processed 1,000 data points",
    timestamp: "5 minutes ago",
    status: "success" as const,
  },
  {
    id: "2",
    title: "New agent connection established",
    description: "Agent B2 connected to network",
    timestamp: "10 minutes ago",
    status: "success" as const,
  },
  {
    id: "3",
    title: "Resource allocation in progress",
    description: "Optimizing resource distribution for Agent C3",
    timestamp: "15 minutes ago",
    status: "pending" as const,
  },
];

export default function Index() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Agent Orchestration Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatusCard 
            title="Active Agents"
            value="24"
            icon={<Bot className="h-6 w-6" />}
            trend="up"
            trendValue="+3 from last hour"
          />
          <StatusCard 
            title="Network Load"
            value="67%"
            icon={<Network className="h-6 w-6" />}
          />
          <StatusCard 
            title="Tasks Completed"
            value="1,284"
            icon={<Zap className="h-6 w-6" />}
            trend="up"
            trendValue="+12% this week"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Placeholder for agent network visualization */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 h-[400px] flex items-center justify-center">
              <p className="text-gray-500">Agent Network Visualization</p>
            </div>
          </div>
          <div className="lg:col-span-1">
            <ActivityTimeline items={mockActivity} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
