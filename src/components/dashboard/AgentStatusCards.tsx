
import { Bot, AlertCircle, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function AgentStatusCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="border-l-4 border-l-green-500">
        <CardContent className="flex items-center p-6">
          <div className="bg-green-500/10 p-3 rounded-full mr-4">
            <Bot className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <p className="font-semibold text-2xl">16</p>
            <p className="text-sm text-muted-foreground">Active Agents</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-l-yellow-500">
        <CardContent className="flex items-center p-6">
          <div className="bg-yellow-500/10 p-3 rounded-full mr-4">
            <Clock className="h-6 w-6 text-yellow-500" />
          </div>
          <div>
            <p className="font-semibold text-2xl">5</p>
            <p className="text-sm text-muted-foreground">Idle Agents</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-l-red-500">
        <CardContent className="flex items-center p-6">
          <div className="bg-red-500/10 p-3 rounded-full mr-4">
            <AlertCircle className="h-6 w-6 text-red-500" />
          </div>
          <div>
            <p className="font-semibold text-2xl">3</p>
            <p className="text-sm text-muted-foreground">Error State</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
