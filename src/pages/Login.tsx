
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LoginForm } from "@/components/auth/LoginForm";
import { SocialLogin } from "@/components/auth/SocialLogin";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useAuth } from "@/lib/auth";
import { useEffect } from "react";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col bg-gradient-to-br from-background to-purple-950/20">
      <header className="w-full p-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">Orchestration Nexus</Link>
        <ThemeToggle />
      </header>
      
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto neo-border glass-card">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-gradient">Agent Orchestration System</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the workflow dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <LoginForm 
              credentials={credentials} 
              setCredentials={setCredentials}
            />
            
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background/80 backdrop-blur-sm px-2 text-muted-foreground">
                  Explore Features
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-xs">
              <Link 
                to="/dashboard" 
                className="p-3 border border-border/50 rounded-md hover:bg-accent/50 transition-colors text-center"
              >
                <div className="text-purple-400 font-medium">Dashboard</div>
                <div className="text-muted-foreground mt-1">Agent status & metrics</div>
              </Link>
              <Link 
                to="/workflows" 
                className="p-3 border border-border/50 rounded-md hover:bg-accent/50 transition-colors text-center"
              >
                <div className="text-purple-400 font-medium">Workflows</div>
                <div className="text-muted-foreground mt-1">LLM agent orchestration</div>
              </Link>
              <Link 
                to="/activity" 
                className="p-3 border border-border/50 rounded-md hover:bg-accent/50 transition-colors text-center"
              >
                <div className="text-purple-400 font-medium">Activity</div>
                <div className="text-muted-foreground mt-1">Execution history</div>
              </Link>
              <Link 
                to="/settings" 
                className="p-3 border border-border/50 rounded-md hover:bg-accent/50 transition-colors text-center"
              >
                <div className="text-purple-400 font-medium">Settings</div>
                <div className="text-muted-foreground mt-1">Data connections & API keys</div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
