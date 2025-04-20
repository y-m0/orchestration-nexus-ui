
import { useState } from "react";
import { Save, Play, PanelLeft, ChevronRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { WorkflowCard } from "@/components/workflow/WorkflowCard";
import { groupedWorkflows } from "@/data/workflows";

export default function WorkflowBuilder() {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Workflows</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Play className="h-4 w-4 mr-2" /> Test All
          </Button>
          <Button variant="outline" size="sm">
            <PanelLeft className="h-4 w-4 mr-2" /> New Workflow
          </Button>
          <Button size="sm">
            <Save className="h-4 w-4 mr-2" /> Save Changes
          </Button>
        </div>
      </div>
      
      <Card className="p-4">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Workflows</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6">
            <div className="text-sm text-muted-foreground mb-4">
              Browse example automation workflows grouped by complexity. Each workflow shows how agents can be orchestrated to solve business problems.
            </div>
            
            <Accordion type="multiple" defaultValue={['low-complexity']}>
              {/* Low Complexity Workflows */}
              <AccordionItem value="low-complexity" className="border rounded-lg p-2">
                <AccordionTrigger className="hover:no-underline px-4 py-2 [&[data-state=open]>svg]:rotate-0">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-3"></div>
                    <h3 className="text-lg font-medium">Low Complexity Workflows</h3>
                    <div className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 text-xs rounded-full px-2 py-0.5 ml-3">
                      Simple 2-3 step automations
                    </div>
                  </div>
                  <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200" />
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
                    {groupedWorkflows.low.map((workflow) => (
                      <WorkflowCard
                        key={workflow.id}
                        title={workflow.title}
                        description={workflow.description}
                        trigger={workflow.trigger}
                        complexity={workflow.complexity}
                        status={workflow.status}
                        successRate={workflow.successRate}
                        avgRunTime={workflow.avgRunTime}
                        workflowId={workflow.id}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              {/* Medium Complexity Workflows */}
              <AccordionItem value="medium-complexity" className="border rounded-lg p-2 mt-4">
                <AccordionTrigger className="hover:no-underline px-4 py-2 [&[data-state=open]>svg]:rotate-0">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-yellow-500 mr-3"></div>
                    <h3 className="text-lg font-medium">Medium Complexity Workflows</h3>
                    <div className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 text-xs rounded-full px-2 py-0.5 ml-3">
                      Multi-step processes with conditionals
                    </div>
                  </div>
                  <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200" />
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
                    {groupedWorkflows.medium.map((workflow) => (
                      <WorkflowCard
                        key={workflow.id}
                        title={workflow.title}
                        description={workflow.description}
                        trigger={workflow.trigger}
                        complexity={workflow.complexity}
                        status={workflow.status}
                        successRate={workflow.successRate}
                        avgRunTime={workflow.avgRunTime}
                        workflowId={workflow.id}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              {/* High Complexity Workflows */}
              <AccordionItem value="high-complexity" className="border rounded-lg p-2 mt-4">
                <AccordionTrigger className="hover:no-underline px-4 py-2 [&[data-state=open]>svg]:rotate-0">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-red-500 mr-3"></div>
                    <h3 className="text-lg font-medium">High Complexity Workflows</h3>
                    <div className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 text-xs rounded-full px-2 py-0.5 ml-3">
                      Advanced multi-agent orchestrations
                    </div>
                  </div>
                  <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200" />
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
                    {groupedWorkflows.high.map((workflow) => (
                      <WorkflowCard
                        key={workflow.id}
                        title={workflow.title}
                        description={workflow.description}
                        trigger={workflow.trigger}
                        complexity={workflow.complexity}
                        status={workflow.status}
                        successRate={workflow.successRate}
                        avgRunTime={workflow.avgRunTime}
                        workflowId={workflow.id}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
          
          <TabsContent value="active" className="text-center py-12 text-muted-foreground">
            <p>Switch to the "All Workflows" tab to view example workflows</p>
          </TabsContent>
          
          <TabsContent value="drafts" className="text-center py-12 text-muted-foreground">
            <p>Switch to the "All Workflows" tab to view example workflows</p>
          </TabsContent>
          
          <TabsContent value="archived" className="text-center py-12 text-muted-foreground">
            <p>Switch to the "All Workflows" tab to view example workflows</p>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
