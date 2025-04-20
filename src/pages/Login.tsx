import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { User, Lock, Home } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useAuth } from "@/lib/auth";
import { Skeleton } from "@/components/ui/skeleton";

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, loading } = useAuth();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(credentials.email, credentials.password);
      toast({
        title: "Success",
        description: "Successfully logged in",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to login",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md p-6">
          <Skeleton className="h-8 w-3/4 mx-auto mb-4" />
          <Skeleton className="h-4 w-1/2 mx-auto mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with back button and theme toggle */}
      <div className="w-full p-4 flex items-center border-b border-border/40">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/">
            <Home className="h-5 w-5" />
            <span className="sr-only">Back to home</span>
          </Link>
        </Button>
        <div className="flex-1 text-center font-medium">Orchestration Nexus</div>
        <ThemeToggle />
      </div>

      {/* Login form */}
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <form onSubmit={handleLogin} className="p-6 space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h1>
              <p className="text-muted-foreground">Please sign in to continue</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <div className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground">
                    <User className="h-5 w-5" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={credentials.email}
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <div className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground">
                    <Lock className="h-5 w-5" />
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            <div className="text-center">
              <Button 
                variant="link" 
                type="button"
                onClick={() => navigate("/onboarding")}
              >
                Don't have an account? Sign up
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
