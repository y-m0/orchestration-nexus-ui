
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="min-h-[90vh] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-purple-950/10 to-background z-0"></div>
      <div className="absolute w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-3xl -top-64 -right-64"></div>
      <div className="absolute w-[500px] h-[500px] rounded-full bg-purple-600/5 blur-3xl -bottom-64 -left-64"></div>
      
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
        <motion.div 
          className="flex flex-col justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent tracking-tight">
            Orchestration Nexus
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-muted-foreground">
            Intelligent Workflow Automation for Humans & AI
          </p>
          <p className="mt-4 text-muted-foreground">
            Build, deploy, and manage hybrid human-AI workflows with a powerful visual orchestration platform.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" asChild className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900">
              <Link to="/onboarding">Create Free Account</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </motion.div>
        <motion.div 
          className="hidden lg:flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <NodeAnimationCanvas />
        </motion.div>
      </div>
    </section>
  );
}

function NodeAnimationCanvas() {
  return (
    <div className="relative w-full max-w-[500px] aspect-square rounded-lg overflow-hidden border border-purple-500/30 bg-background/50 backdrop-blur-sm">
      {/* Decorative node visualization */}
      <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center animate-pulse-purple">
        <div className="w-10 h-10 rounded-full bg-purple-500/30 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-purple-500"></div>
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 w-20 h-20 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center animate-pulse-purple" style={{ animationDelay: "0.5s" }}>
        <div className="w-12 h-12 rounded-full bg-purple-500/30 flex items-center justify-center">
          <div className="w-5 h-5 rounded-full bg-purple-500"></div>
        </div>
      </div>
      <div className="absolute bottom-1/4 right-1/4 w-14 h-14 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center animate-pulse-purple" style={{ animationDelay: "1s" }}>
        <div className="w-8 h-8 rounded-full bg-purple-500/30 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
        </div>
      </div>
      
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M25 25 L50 50 L75 25" stroke="url(#purpleGradient)" strokeWidth="0.5" fill="none" strokeDasharray="3,2" />
        <path d="M50 50 L75 75" stroke="url(#purpleGradient)" strokeWidth="0.5" fill="none" strokeDasharray="3,2" />
        
        <defs>
          <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9b87f5" />
            <stop offset="100%" stopColor="#7e69ab" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
