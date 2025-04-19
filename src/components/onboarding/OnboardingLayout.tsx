
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

interface OnboardingLayoutProps {
  children: React.ReactNode;
}

export function OnboardingLayout({ children }: OnboardingLayoutProps) {
  const isMobile = useIsMobile();
  const { theme } = useTheme();
  
  // Cosmic theme only applied in dark mode
  const isCosmicTheme = theme === "dark" || !theme;
  
  return (
    <div className={cn(
      "min-h-screen relative overflow-hidden",
      isCosmicTheme 
        ? "bg-gradient-to-b from-[#0a192f] to-black" 
        : "bg-background"
    )}>
      {/* Star elements for cosmic background - only in dark mode */}
      {isCosmicTheme && (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="stars-sm"></div>
          <div className="stars-md"></div>
          <div className="stars-lg"></div>
        </div>
      )}

      {/* Logo and branding */}
      <div className={cn(
        "relative z-10 pt-6 pb-4 px-6",
        !isCosmicTheme && "border-b border-border/40"
      )}>
        <div className="flex items-center">
          <div className={isCosmicTheme ? "text-gradient text-2xl font-bold" : "text-2xl font-bold text-foreground"}>
            Orchestration Nexus
          </div>
          <div className="ml-auto flex items-center gap-4">
            <ThemeToggle />
            <Link to="/" className={cn(
              "text-sm transition-colors",
              isCosmicTheme 
                ? "text-white/70 hover:text-white" 
                : "text-muted-foreground hover:text-foreground"
            )}>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className={`relative z-10 flex items-center justify-center ${isMobile ? "py-4" : "py-10"} min-h-[calc(100vh-80px)]`}>
        <div className="w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
