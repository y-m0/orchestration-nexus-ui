import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { ThemeToggle } from "./components/theme/ThemeToggle";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import AgentDirectory from "./pages/AgentDirectory";
import WorkflowBuilder from "./pages/WorkflowBuilder";
import ActivityLog from "./pages/ActivityLog";
import ApprovalsInbox from "./pages/ApprovalsInbox";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Activity, CircleUser, Clock, FileCheck, HardDrive, Home, Network, Settings as SettingsIcon } from "lucide-react";

const queryClient = new QueryClient();

const Navigation = () => (
  <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="flex h-14 items-center px-4">
      <NavigationMenu>
        <NavigationMenuList>
          {[
            { icon: Home, label: "Dashboard", path: "/dashboard" },
            { icon: Network, label: "Agent Directory", path: "/agent-directory" },
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
      <ThemeToggle />
    </div>
  </nav>
);

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/onboarding" element={<Onboarding />} />
              
              {/* Protected dashboard routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <>
                    <Navigation />
                    <MainLayout>
                      <Dashboard />
                    </MainLayout>
                  </>
                </ProtectedRoute>
              } />
              
              <Route path="/agent-directory" element={
                <ProtectedRoute>
                  <>
                    <Navigation />
                    <MainLayout>
                      <AgentDirectory />
                    </MainLayout>
                  </>
                </ProtectedRoute>
              } />
              
              <Route path="/workflows" element={
                <ProtectedRoute>
                  <>
                    <Navigation />
                    <MainLayout>
                      <WorkflowBuilder />
                    </MainLayout>
                  </>
                </ProtectedRoute>
              } />
              
              <Route path="/activity" element={
                <ProtectedRoute>
                  <>
                    <Navigation />
                    <MainLayout>
                      <ActivityLog />
                    </MainLayout>
                  </>
                </ProtectedRoute>
              } />
              
              <Route path="/approvals" element={
                <ProtectedRoute>
                  <>
                    <Navigation />
                    <MainLayout>
                      <ApprovalsInbox />
                    </MainLayout>
                  </>
                </ProtectedRoute>
              } />
              
              <Route path="/settings" element={
                <ProtectedRoute>
                  <>
                    <Navigation />
                    <MainLayout>
                      <Settings />
                    </MainLayout>
                  </>
                </ProtectedRoute>
              } />
              
              {/* 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
            <Sonner />
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
