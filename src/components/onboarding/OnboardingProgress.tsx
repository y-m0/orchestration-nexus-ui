
import { useIsMobile } from "@/hooks/use-mobile";

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function OnboardingProgress({ currentStep, totalSteps }: OnboardingProgressProps) {
  const isMobile = useIsMobile();
  const progress = ((currentStep + 1) / totalSteps) * 100;
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-white font-semibold">
          Step {currentStep + 1} of {totalSteps}
        </h2>
        <span className="text-white/80 text-sm">
          {Math.round(progress)}% Complete
        </span>
      </div>
      <div className="w-full bg-gray-700/40 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
