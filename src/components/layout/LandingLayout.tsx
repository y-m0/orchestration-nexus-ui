
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface LandingLayoutProps {
  children: React.ReactNode;
}

export function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <header className="w-full p-4 flex justify-between items-center fixed top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/30">
        <Link to="/" className="text-xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
          Orchestration Nexus
        </Link>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-4">
            <Button variant="ghost" asChild className="text-sm">
              <Link to="/login">Sign In</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900">
              <Link to="/onboarding">Create Account</Link>
            </Button>
          </div>
          <ThemeToggle />
        </div>
      </header>
      <main className="pt-16">
        {children}
      </main>
      <footer className="py-8 px-4 border-t border-border/30 bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Orchestration Nexus. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/onboarding">Get Started</Link>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
