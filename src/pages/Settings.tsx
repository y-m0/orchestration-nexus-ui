
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { UserRoleSettings } from "@/components/settings/UserRoleSettings";
import { AgentPoliciesSettings } from "@/components/settings/AgentPoliciesSettings";
import { DataConnectionsSettings } from "@/components/settings/DataConnectionsSettings";
import { NotificationSettings } from "@/components/settings/NotificationSettings";

export default function Settings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Settings / Admin Panel</h1>
        <Button>Save Changes</Button>
      </div>
      
      <Tabs defaultValue="users">
        <TabsList className="grid grid-cols-4 w-full mb-6">
          <TabsTrigger value="users">User Roles & Access</TabsTrigger>
          <TabsTrigger value="agents">Agent Policies</TabsTrigger>
          <TabsTrigger value="data">Data Connections</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          <UserRoleSettings />
        </TabsContent>
        
        <TabsContent value="agents">
          <AgentPoliciesSettings />
        </TabsContent>
        
        <TabsContent value="data">
          <DataConnectionsSettings />
        </TabsContent>
        
        <TabsContent value="notifications">
          <NotificationSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
