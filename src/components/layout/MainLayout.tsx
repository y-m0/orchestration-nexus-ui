
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Activity, CircleUser, HardDrive, Home, Network, Settings } from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      <div className="flex h-screen">
        <Sidebar className="border-r border-gray-200">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                {[
                  { icon: Home, label: "Dashboard", path: "/" },
                  { icon: Network, label: "Agents", path: "/agents" },
                  { icon: Activity, label: "Activities", path: "/activities" },
                  { icon: HardDrive, label: "Resources", path: "/resources" },
                  { icon: CircleUser, label: "Users", path: "/users" },
                  { icon: Settings, label: "Settings", path: "/settings" },
                ].map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild>
                      <a href={item.path} className="flex items-center gap-3 text-gray-600 hover:text-gray-900">
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
