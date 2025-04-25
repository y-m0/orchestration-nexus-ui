
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
    <div className="min-h-screen bg-background flex flex-col">
      <header className="w-full p-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Orchestration Nexus</Link>
        <ThemeToggle />
      </header>
      
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
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
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            
            <SocialLogin />
            
            <p className="text-center text-sm">
              Don't have an account?{" "}
              <Link to="/onboarding" className="text-primary font-medium hover:underline">
                Sign up
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
