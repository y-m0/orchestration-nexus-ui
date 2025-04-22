
import React, { useRef } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useToast } from "@/components/ui/use-toast";
import { useTheme } from "next-themes";

interface CaptchaVerificationProps {
  captchaToken: string | null;
  setCaptchaToken: (token: string | null) => void;
  setCaptchaVerifying: (verifying: boolean) => void;
}

export const CaptchaVerification: React.FC<CaptchaVerificationProps> = ({
  captchaToken,
  setCaptchaToken,
  setCaptchaVerifying,
}) => {
  const captchaRef = useRef<HCaptcha | null>(null);
  const { toast } = useToast();
  const { theme } = useTheme();

  // Determine hCaptcha theme based on current app theme
  const getCaptchaTheme = () => {
    if (theme === 'dark') return 'dark';
    if (theme === 'light') return 'light';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const handleCaptchaVerify = (token: string) => {
    setCaptchaToken(token);
    setCaptchaVerifying(false);
  };

  const handleCaptchaExpire = () => {
    setCaptchaToken(null);
    toast({
      variant: "destructive",
      title: "Captcha expired",
      description: "Please verify the captcha again.",
    });
  };

  const handleCaptchaError = () => {
    setCaptchaToken(null);
    setCaptchaVerifying(false);
    toast({
      variant: "destructive", 
      title: "Captcha verification failed",
      description: "Please try again.",
    });
  };

  return (
    <div className="flex justify-center pt-2">
      <div className="overflow-hidden rounded-lg border border-border bg-card/30 px-2 py-2 min-w-[290px] max-w-[340px] flex items-center justify-center">
        <HCaptcha
          sitekey={import.meta.env.VITE_HCAPTCHA_SITE_KEY || "10000000-ffff-ffff-ffff-000000000001"} 
          onVerify={handleCaptchaVerify}
          onExpire={handleCaptchaExpire}
          onError={handleCaptchaError}
          ref={captchaRef}
          theme={getCaptchaTheme()}
        />
      </div>
    </div>
  );
};
