
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useAuth } from "@/lib/auth";
import { useTheme } from "next-themes";
import { useToast } from "@/components/ui/use-toast";

// Split-out components
import { LoginForm } from "@/components/auth/LoginForm";
import { SocialLogin } from "@/components/auth/SocialLogin";
import { Home } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { loading } = useAuth();
  const { theme } = useTheme();
  const { toast } = useToast();

  // Simplified state for credentials
  const [credentials, setCredentials] = useState({ email: "", password: "" });

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
      {/* Header with navigation and theme toggle */}
      <header className="w-full p-4 flex items-center border-b border-border/40">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/">
            <Home className="h-5 w-5" />
            <span className="sr-only">Back to home</span>
          </Link>
        </Button>
        <div className="flex-1 text-center font-medium">Orchestration Nexus</div>
        <ThemeToggle />
      </header>

      {/* Main content area */}
      <main className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-md shadow-xl border-border/60 overflow-hidden">
          <CardContent className="p-8 space-y-8">
            {/* Social Logins */}
            <SocialLogin />

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/60" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-4 text-muted-foreground">
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Email/Password Login Form */}
            <LoginForm
              credentials={credentials}
              setCredentials={setCredentials}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
