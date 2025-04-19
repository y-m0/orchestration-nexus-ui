
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface OnboardingLayoutProps {
  children: React.ReactNode;
}

export function OnboardingLayout({ children }: OnboardingLayoutProps) {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a192f] to-black relative overflow-hidden">
      {/* Star elements for cosmic background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="stars-sm"></div>
        <div className="stars-md"></div>
        <div className="stars-lg"></div>
      </div>

      {/* Logo and branding */}
      <div className="relative z-10 pt-6 pb-4 px-6">
        <div className="text-gradient text-2xl font-bold">Orchestration Nexus</div>
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
