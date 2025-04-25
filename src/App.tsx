import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { ThemeToggle } from "./components/theme/ThemeToggle";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import WorkflowBuilder from "./pages/WorkflowBuilder";
import ActivityLog from "./pages/ActivityLog";
import ApprovalsInbox from "./pages/ApprovalsInbox";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Tools from "./pages/Tools";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { 
  Activity, 
  CircleUser, 
  Clock, 
  FileCheck, 
  FolderOpen, 
  Home, 
  Network, 
  Settings as SettingsIcon, 
  Wrench,
  Menu as MenuIcon,
  ChevronDown
} from "lucide-react";
import { ErrorBoundary } from './components/ui/ErrorBoundary'
import { useStore } from './lib/store'
import { MemoryProvider } from './lib/memory/MemoryContext'
import * as React from "react";
import { useIsMobile } from "./hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DataConnections } from './components/settings/DataConnections';

const queryClient = new QueryClient();

const NAV_ITEMS = [
  { icon: Home, label: "Dashboard", path: "/dashboard" },
  { icon: Activity, label: "Workflows", path: "/workflows" },
  { icon: FolderOpen, label: "Projects", path: "/projects" },
  { icon: Wrench, label: "Tools", path: "/tools" },
  { icon: Clock, label: "Activity Log", path: "/activity" },
  { icon: FileCheck, label: "Approvals", path: "/approvals" },
  { icon: SettingsIcon, label: "Settings", path: "/settings" },
];

const Navigation = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full">
        <div className="flex h-14 items-center px-4 justify-between">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open navigation menu">
                <MenuIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[180px] bg-background z-50">
              {NAV_ITEMS.map((item) => (
                <DropdownMenuItem key={item.label} asChild>
                  <Link to={item.path} className="flex items-center gap-2 w-full">
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    );
  }

  return (
    <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4">
        <NavigationMenu>
          <NavigationMenuList>
            {NAV_ITEMS.map((item) => (
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
};

const App = () => {
  const { settings } = useStore()

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <TooltipProvider>
            <MemoryProvider>
              <div className={settings.theme === 'dark' ? 'dark' : ''}>
                <Router>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/onboarding" element={<Onboarding />} />
                    
                    <Route path="/dashboard" element={
                      <>
                        <Navigation />
                        <MainLayout>
                          <Dashboard />
                        </MainLayout>
                      </>
                    } />
                    
                    <Route path="/workflows" element={
                      <>
                        <Navigation />
                        <MainLayout>
                          <WorkflowBuilder />
                        </MainLayout>
                      </>
                    } />
                    
                    <Route path="/projects" element={
                      <>
                        <Navigation />
                        <MainLayout>
                          <Projects />
                        </MainLayout>
                      </>
                    } />
                    
                    <Route path="/projects/:projectId" element={
                      <>
                        <Navigation />
                        <MainLayout>
                          <ProjectDetail />
                        </MainLayout>
                      </>
                    } />
                    
                    <Route path="/tools" element={
                      <>
                        <Navigation />
                        <MainLayout>
                          <Tools />
                        </MainLayout>
                      </>
                    } />
                    
                    <Route path="/activity" element={
                      <>
                        <Navigation />
                        <MainLayout>
                          <ActivityLog />
                        </MainLayout>
                      </>
                    } />
                    
                    <Route path="/approvals" element={
                      <>
                        <Navigation />
                        <MainLayout>
                          <ApprovalsInbox />
                        </MainLayout>
                      </>
                    } />
                    
                    <Route path="/settings" element={
                      <>
                        <Navigation />
                        <MainLayout>
                          <Settings />
                        </MainLayout>
                      </>
                    } />
                    
                    <Route path="/settings/data-connections" element={
                      <>
                        <Navigation />
                        <MainLayout>
                          <DataConnections />
                        </MainLayout>
                      </>
                    } />
                    
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <Toaster />
                  <Sonner />
                </Router>
              </div>
            </MemoryProvider>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App;
