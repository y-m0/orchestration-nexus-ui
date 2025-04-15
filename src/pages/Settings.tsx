import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { UserRoleSettings } from "@/components/settings/UserRoleSettings";
import { AgentPoliciesSettings } from "@/components/settings/AgentPoliciesSettings";
import { DataConnectionsSettings } from "@/components/settings/DataConnectionsSettings";
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { AnalyticsSettings } from "@/components/settings/AnalyticsSettings";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Settings() {
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold">Settings / Admin Panel</h1>
        <Button>Save Changes</Button>
      </div>
      
      <Tabs defaultValue="users">
        <TabsList className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-5'} w-full mb-6`}>
          <TabsTrigger value="users" className="text-sm">User Roles</TabsTrigger>
          <TabsTrigger value="agents" className="text-sm">Agents</TabsTrigger>
          <TabsTrigger value="data" className="text-sm">Data</TabsTrigger>
          <TabsTrigger value="notifications" className="text-sm">Notifications</TabsTrigger>
          <TabsTrigger value="analytics" className="text-sm">Analytics</TabsTrigger>
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
        
        <TabsContent value="analytics">
          <AnalyticsSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
