
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

interface OnboardingLayoutProps {
  children: React.ReactNode;
}

export function OnboardingLayout({ children }: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Logo and branding */}
      <div className="relative z-10 pt-6 pb-4 px-6 border-b border-border/40">
        <div className="flex items-center">
          <div className="text-2xl font-bold text-foreground">
            Orchestration Nexus
          </div>
          <div className="ml-auto flex items-center gap-4">
            <ThemeToggle />
            <Link to="/" className="text-sm transition-colors text-muted-foreground hover:text-foreground">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center py-4 md:py-10 min-h-[calc(100vh-80px)]">
        <div className="w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
