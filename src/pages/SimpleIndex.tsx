import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function SimpleIndex() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-foreground">
          Orchestration Nexus UI
        </h1>
        <p className="text-lg text-muted-foreground max-w-md">
          A modern workflow orchestration platform for intelligent automation.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/onboarding">Get Started</Link>
          </Button>
        </div>
        <div className="mt-8 p-4 bg-muted rounded-lg">
          <h3 className="font-semibold mb-2">Quick Navigation Test</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <Link to="/dashboard" className="text-blue-600 hover:underline">Dashboard</Link>
            <Link to="/projects" className="text-blue-600 hover:underline">Projects</Link>
            <Link to="/workflow-builder" className="text-blue-600 hover:underline">Workflow Builder</Link>
            <Link to="/tools" className="text-blue-600 hover:underline">Tools</Link>
          </div>
        </div>
      </div>
    </div>
  );
}