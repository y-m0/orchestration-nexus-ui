
import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Activity, CircleUser, Clock, FileCheck, Home, Network, Settings } from "lucide-react";

export function MobileNavigation() {
  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: Network, label: "Agent Directory", path: "/agent-directory" },
    { icon: Activity, label: "Workflows", path: "/workflows" },
    { icon: Clock, label: "Activity Log", path: "/activity" },
    { icon: FileCheck, label: "Approvals", path: "/approvals" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="font-medium">Orchestration Nexus</div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton asChild>
                <Link to={item.path}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
