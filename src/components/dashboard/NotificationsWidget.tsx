import { AlertTriangle, AlertCircle, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const notifications = [
  {
    id: "1",
    title: "Agent Error Detected",
    description: "Data Processor Agent encountered an API timeout",
    type: "error",
    time: "10 minutes ago"
  },
  {
    id: "2",
    title: "New Agent Deployed",
    description: "Marketing Analytics Agent is now active",
    type: "info",
    time: "1 hour ago"
  },
  {
    id: "3",
    title: "Warning: High Usage",
    description: "API usage approaching quota limit",
    type: "warning",
    time: "2 hours ago"
  },
  {
    id: "4",
    title: "Approval Required",
    description: "Customer refund approval waiting",
    type: "info",
    time: "3 hours ago"
  }
];

export function NotificationsWidget() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[236px] pr-4">
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex gap-3 pb-3 border-b border-border/40 last:border-0">
                <div className={`
                  flex-shrink-0 p-1.5 rounded-full mt-0.5
                  ${notification.type === 'error' ? 'bg-red-500/10' : 
                    notification.type === 'warning' ? 'bg-yellow-500/10' : 
                    'bg-blue-500/10'}
                `}>
                  {notification.type === 'error' && <AlertCircle className="h-4 w-4 text-red-500" />}
                  {notification.type === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                  {notification.type === 'info' && <Info className="h-4 w-4 text-blue-500" />}
                </div>
                <div>
                  <p className="font-medium text-sm">{notification.title}</p>
                  <p className="text-xs text-muted-foreground">{notification.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
