import { lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/lib/auth/AuthContext';
import { MemoryProvider } from '@/lib/memory/MemoryContext';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { LazyWrapper } from '@/components/LazyWrapper';
import { MainLayout } from '@/components/layout/MainLayout';

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
                      <MainLayout>
                        <LazyWrapper>
                          <Dashboard />
                        </LazyWrapper>
                      </MainLayout>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/projects" element={
                    <ProtectedRoute>
                      <MainLayout>
                        <LazyWrapper>
                          <Projects />
                        </LazyWrapper>
                      </MainLayout>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/projects/:id" element={
                    <ProtectedRoute>
                      <MainLayout>
                        <LazyWrapper>
                          <ProjectDetail />
                        </LazyWrapper>
                      </MainLayout>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/workflow-builder" element={
                    <ProtectedRoute>
                      <MainLayout>
                        <LazyWrapper>
                          <WorkflowBuilder />
                        </LazyWrapper>
                      </MainLayout>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/tools" element={
                    <ProtectedRoute>
                      <MainLayout>
                        <LazyWrapper>
                          <Tools />
                        </LazyWrapper>
                      </MainLayout>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/activity" element={
                    <ProtectedRoute>
                      <MainLayout>
                        <LazyWrapper>
                          <ActivityLog />
                        </LazyWrapper>
                      </MainLayout>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/agents" element={
                    <ProtectedRoute>
                      <MainLayout>
                        <LazyWrapper>
                          <AgentDirectory />
                        </LazyWrapper>
                      </MainLayout>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/approvals" element={
                    <ProtectedRoute>
                      <MainLayout>
                        <LazyWrapper>
                          <ApprovalsInbox />
                        </LazyWrapper>
                      </MainLayout>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/settings" element={
                    <ProtectedRoute>
                      <MainLayout>
                        <LazyWrapper>
                          <Settings />
                        </LazyWrapper>
                      </MainLayout>
                    </ProtectedRoute>
                  } />
                  
                  {/* Catch all route */}
                  <Route path="*" element={
                    <MainLayout>
                      <LazyWrapper>
                        <NotFound />
                      </LazyWrapper>
                    </MainLayout>
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