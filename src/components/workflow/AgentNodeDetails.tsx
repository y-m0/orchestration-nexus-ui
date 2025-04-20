
import { Link } from "react-router-dom";
import { User, Bot, ChevronRight, BarChart3, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WorkflowNode } from "@/types/workflow";

interface AgentNodeDetailsProps {
  node: WorkflowNode;
}

export function AgentNodeDetails({ node }: AgentNodeDetailsProps) {
  if (node.type !== 'agent' || !node.agentId) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-semibold flex items-center">
              <Bot className="h-4 w-4 mr-2 text-primary" />
              {node.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">{node.description}</p>
          </div>
          <Badge className={
            node.status === 'completed' ? 'bg-green-100 text-green-800' : 
            node.status === 'error' ? 'bg-red-100 text-red-800' :
            node.status === 'running' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100'
          }>
            {node.status || 'Idle'}
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm mb-4">
          <div>
            <div className="text-muted-foreground">Agent ID</div>
            <div className="font-medium">{node.agentId}</div>
          </div>
          {node.lastRunTimestamp && (
            <div>
              <div className="text-muted-foreground">Last Run</div>
              <div className="font-medium">{node.lastRunTimestamp}</div>
            </div>
          )}
          {node.executionTime && (
            <div>
              <div className="text-muted-foreground">Execution Time</div>
              <div className="font-medium flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {node.executionTime}ms
              </div>
            </div>
          )}
          {node.successRate && (
            <div>
              <div className="text-muted-foreground">Success Rate</div>
              <div className="font-medium flex items-center">
                <BarChart3 className="h-3 w-3 mr-1" />
                {node.successRate}%
              </div>
            </div>
          )}
        </div>
        
        {node.tags && node.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {node.tags.map((tag, i) => (
              <Badge key={i} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <div className="text-xs text-muted-foreground flex items-center">
            <User className="h-3 w-3 mr-1" /> 
            Last modified by Admin
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to={`/directory/agent/${node.agentId}`}>
              View Agent <ChevronRight className="h-3 w-3 ml-1" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
