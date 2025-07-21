import { lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/lib/auth/AuthContext';
import { MemoryProvider } from '@/lib/memory/MemoryContext';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { LazyWrapper } from '@/components/LazyWrapper';

// Landing and Auth Pages (keep these non-lazy for fast initial load)
import SimpleIndex from '@/pages/SimpleIndex';
import Login from '@/pages/Login';

// Lazy load heavy components for code splitting
const Onboarding = lazy(() => import('@/pages/Onboarding'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Projects = lazy(() => import('@/pages/Projects'));
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail'));
const WorkflowBuilder = lazy(() => import('@/pages/WorkflowBuilder'));
const Tools = lazy(() => import('@/pages/Tools'));
const Settings = lazy(() => import('@/pages/Settings'));
const ActivityLog = lazy(() => import('@/pages/ActivityLog'));
const AgentDirectory = lazy(() => import('@/pages/AgentDirectory'));
const ApprovalsInbox = lazy(() => import('@/pages/ApprovalsInbox'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="system" storageKey="orchestration-ui-theme">
        <AuthProvider>
          <MemoryProvider>
            <Router>
              <div className="min-h-screen bg-background text-foreground">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<SimpleIndex />} />
                  <Route path="/login" element={<Login />} />
                  
                  {/* Protected Routes */}
                  <Route path="/onboarding" element={
                    <ProtectedRoute>
                      <LazyWrapper>
                        <Onboarding />
                      </LazyWrapper>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <LazyWrapper>
                        <Dashboard />
                      </LazyWrapper>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/projects" element={
                    <ProtectedRoute>
                      <LazyWrapper>
                        <Projects />
                      </LazyWrapper>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/projects/:id" element={
                    <ProtectedRoute>
                      <LazyWrapper>
                        <ProjectDetail />
                      </LazyWrapper>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/workflow-builder" element={
                    <ProtectedRoute>
                      <LazyWrapper>
                        <WorkflowBuilder />
                      </LazyWrapper>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/tools" element={
                    <ProtectedRoute>
                      <LazyWrapper>
                        <Tools />
                      </LazyWrapper>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/activity" element={
                    <ProtectedRoute>
                      <LazyWrapper>
                        <ActivityLog />
                      </LazyWrapper>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/agents" element={
                    <ProtectedRoute>
                      <LazyWrapper>
                        <AgentDirectory />
                      </LazyWrapper>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/approvals" element={
                    <ProtectedRoute>
                      <LazyWrapper>
                        <ApprovalsInbox />
                      </LazyWrapper>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/settings" element={
                    <ProtectedRoute>
                      <LazyWrapper>
                        <Settings />
                      </LazyWrapper>
                    </ProtectedRoute>
                  } />
                  
                  {/* Catch all route */}
                  <Route path="*" element={
                    <LazyWrapper>
                      <NotFound />
                    </LazyWrapper>
                  } />
                </Routes>
                <Toaster />
              </div>
            </Router>
          </MemoryProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;