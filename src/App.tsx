
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import AgentDirectory from "./pages/AgentDirectory";
import WorkflowBuilder from "./pages/WorkflowBuilder";
import ActivityLog from "./pages/ActivityLog";
import ApprovalsInbox from "./pages/ApprovalsInbox";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Activity, CircleUser, Clock, FileCheck, HardDrive, Home, Network, Settings as SettingsIcon } from "lucide-react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="dark">
        <BrowserRouter>
          <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center px-4">
              <NavigationMenu>
                <NavigationMenuList>
                  {[
                    { icon: Home, label: "Dashboard", path: "/" },
                    { icon: Network, label: "Agents", path: "/agents" },
                    { icon: Activity, label: "Workflows", path: "/workflows" },
                    { icon: Clock, label: "Activity Log", path: "/activity" },
                    { icon: FileCheck, label: "Approvals", path: "/approvals" },
                    { icon: SettingsIcon, label: "Settings", path: "/settings" },
                  ].map((item) => (
                    <NavigationMenuItem key={item.label}>
                      <NavigationMenuLink asChild>
                        <Link 
                          to={item.path} 
                          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                        >
                          <item.icon className="h-4 w-4 mr-2" />
                          <span>{item.label}</span>
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </nav>
          <MainLayout>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/agents" element={<AgentDirectory />} />
              <Route path="/workflows" element={<WorkflowBuilder />} />
              <Route path="/activity" element={<ActivityLog />} />
              <Route path="/approvals" element={<ApprovalsInbox />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MainLayout>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
