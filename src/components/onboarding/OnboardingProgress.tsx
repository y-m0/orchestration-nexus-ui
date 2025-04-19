
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function OnboardingProgress({ currentStep, totalSteps }: OnboardingProgressProps) {
  const isMobile = useIsMobile();
  const { theme } = useTheme();
  const progress = ((currentStep + 1) / totalSteps) * 100;
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <h2 className={cn(
          "font-semibold",
          theme === "dark" || !theme ? "text-gradient" : "text-primary"
        )}>
          Step {currentStep + 1} of {totalSteps}
        </h2>
        <span className={cn(
          "text-sm",
          theme === "dark" || !theme ? "text-white/80" : "text-muted-foreground"
        )}>
          {Math.round(progress)}% Complete
        </span>
      </div>
      
      {theme === "dark" || !theme ? (
        <div className="w-full bg-white/10 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      ) : (
        <Progress value={progress} className="h-2" />
      )}
    </div>
  );
}
