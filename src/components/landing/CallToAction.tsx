import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

export function CallToAction() {
  const features = [
    "Visual workflow designer",
    "Human-AI collaboration tools",
    "Approval management",
    "Activity monitoring",
    "Role-based access control",
    "Secure data connections"
  ];

  return (
    <section className="py-20 px-4 relative" id="get-started">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-purple-950/5 to-background z-0"></div>
      
      <motion.div 
        className="max-w-5xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="bg-card border border-purple-500/30 rounded-xl p-8 md:p-12 shadow-[0_0_30px_rgba(155,135,245,0.15)]">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Ready to Transform Your Workflows?
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8">
            Get started with Orchestration Nexus today and experience the power of intelligent workflow automation.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-xl mb-4 text-purple-400">Everything you need</h3>
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-purple-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-center">
              <div className="p-6 bg-purple-500/5 rounded-lg border border-purple-500/20 mb-4">
                <p className="text-sm mb-2"><span className="font-bold">Free tier includes:</span> 5 workflows, 3 integrations, and 1,000 executions per month</p>
                <p className="text-xs text-muted-foreground">No credit card required to start</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  asChild 
                  className="bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 w-full text-white shadow-xl shadow-purple-500/50 brightness-125 saturate-200 hover:brightness-150 transition-all duration-300"
                >
                  <Link to="/onboarding">Create Free Account</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="w-full">
                  <Link to="/login">Sign In</Link>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            <p>Trusted by startups and enterprises alike</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
