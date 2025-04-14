
import { useState } from "react";
import { Search, Filter, Clock, Check, XCircle, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const mockActivities = [
  {
    id: "1",
    agent: "Data Analyst Agent",
    action: "Processed monthly financial report",
    time: "10 minutes ago",
    outcome: "success",
  },
  {
    id: "2",
    agent: "Customer Support Bot",
    action: "Responded to customer inquiry #12345",
    time: "30 minutes ago",
    outcome: "success",
  },
  {
    id: "3",
    agent: "Marketing Analytics",
    action: "Generated campaign performance metrics",
    time: "1 hour ago",
    outcome: "failure",
  },
  {
    id: "4",
    agent: "Inventory Manager",
    action: "Stock level verification",
    time: "2 hours ago",
    outcome: "error",
  },
  {
    id: "5",
    agent: "HR Document Processor",
    action: "Validated new employee documents",
    time: "3 hours ago",
    outcome: "success",
  },
];

export default function ActivityLog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState("all");
  
  // Filter activities based on search query and time filter
  const filteredActivities = mockActivities.filter(activity => 
    (activity.agent.toLowerCase().includes(searchQuery.toLowerCase()) || 
     activity.action.toLowerCase().includes(searchQuery.toLowerCase())) && 
    (timeFilter === "all" || true) // Mock time filtering, would use real logic here
  );
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Task Feed / Activity Log</h1>
      
      <div className="flex gap-4 flex-col md:flex-row">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search activities..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={timeFilter} onValueChange={setTimeFilter}>
          <SelectTrigger className="w-[180px]">
            <Clock className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Time Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuItem>Status: Success</DropdownMenuItem>
            <DropdownMenuItem>Status: Failure</DropdownMenuItem>
            <DropdownMenuItem>Status: Error</DropdownMenuItem>
            <DropdownMenuItem>Agent: Data Analyst</DropdownMenuItem>
            <DropdownMenuItem>Agent: Customer Support</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <Card>
        <CardHeader className="pb-0">
          <CardTitle>Recent Activities ({filteredActivities.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Outcome</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredActivities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell className="font-medium">{activity.agent}</TableCell>
                  <TableCell>{activity.action}</TableCell>
                  <TableCell>{activity.time}</TableCell>
                  <TableCell>
                    {activity.outcome === "success" && (
                      <div className="flex items-center">
                        <Check className="h-4 w-4 mr-1 text-green-500" />
                        <span>Success</span>
                      </div>
                    )}
                    {activity.outcome === "failure" && (
                      <div className="flex items-center">
                        <XCircle className="h-4 w-4 mr-1 text-red-500" />
                        <span>Failure</span>
                      </div>
                    )}
                    {activity.outcome === "error" && (
                      <div className="flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-1 text-yellow-500" />
                        <span>Error</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">View Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
