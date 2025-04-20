import { useState } from "react";
import { Save, Play, PanelLeft, ChevronRight, Bot, GitBranch, User, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { WorkflowCanvas } from "@/components/workflow/WorkflowCanvas";
import { WorkflowNode } from "@/components/workflow/WorkflowNode";
import { useWorkflow } from "@/hooks/useWorkflow";

export default function WorkflowBuilder() {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { addNode } = useWorkflow();
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    try {
      const data = JSON.parse(e.dataTransfer.getData("application/workflow"));
      addNode(data);
    } catch (err) {
      console.error("Failed to add node:", err);
    }
  };
  
  return (
    <div className="flex h-[calc(100vh-80px)] gap-0 overflow-hidden">
      <Card className={`border-r rounded-none transition-all duration-200 ${isSidebarCollapsed ? "w-12" : "w-64"}`}>
        <div className="flex items-center justify-between p-2">
          <h3 className={`font-medium ${isSidebarCollapsed ? "hidden" : "block"}`}>Components</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
            className="p-0 h-8 w-8"
          >
            {isSidebarCollapsed ? <ChevronRight /> : <PanelLeft />}
          </Button>
        </div>
        <Separator />
        <ScrollArea className="h-full">
          {!isSidebarCollapsed && (
            <Tabs defaultValue="agents">
              <TabsList className="w-full">
                <TabsTrigger value="agents" className="flex-1">Agents</TabsTrigger>
                <TabsTrigger value="logic" className="flex-1">Logic</TabsTrigger>
                <TabsTrigger value="io" className="flex-1">I/O</TabsTrigger>
              </TabsList>
              <TabsContent value="agents" className="p-2 space-y-2">
                <WorkflowNode 
                  title="Data Processor" 
                  icon={<Bot className="h-4 w-4" />} 
                  type="agent"
                  draggable
                />
                <WorkflowNode 
                  title="Content Generator" 
                  icon={<Bot className="h-4 w-4" />} 
                  type="agent"
                  draggable
                />
                <WorkflowNode 
                  title="Validator Agent" 
                  icon={<Bot className="h-4 w-4" />} 
                  type="agent"
                  draggable
                />
              </TabsContent>
              <TabsContent value="logic" className="p-2 space-y-2">
                <WorkflowNode 
                  title="Conditional" 
                  icon={<GitBranch className="h-4 w-4" />} 
                  type="logic"
                  draggable
                />
                <WorkflowNode 
                  title="Human Approval" 
                  icon={<User className="h-4 w-4" />} 
                  type="logic"
                  draggable
                />
              </TabsContent>
              <TabsContent value="io" className="p-2 space-y-2">
                <WorkflowNode 
                  title="Data Input" 
                  icon={<Database className="h-4 w-4" />} 
                  type="io"
                  draggable
                />
                <WorkflowNode 
                  title="Data Output" 
                  icon={<Database className="h-4 w-4" />} 
                  type="io"
                  draggable
                />
              </TabsContent>
            </Tabs>
          )}
        </ScrollArea>
      </Card>
      
      <div className="flex-1 flex flex-col">
        <div className="border-b p-2 flex justify-between items-center">
          <h1 className="text-xl font-semibold">New Workflow</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Play className="h-4 w-4 mr-2" /> Test Run
            </Button>
            <Button size="sm">
              <Save className="h-4 w-4 mr-2" /> Save Draft
            </Button>
          </div>
        </div>
        <WorkflowCanvas onDrop={handleDrop} />
      </div>
    </div>
  );
}
