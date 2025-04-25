
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

export function HeroSection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };

  return (
    <section className="min-h-[90vh] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-purple-950/10 to-background z-0"></div>
      <motion.div 
        className="absolute w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-3xl -top-64 -right-64"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      ></motion.div>
      <motion.div 
        className="absolute w-[500px] h-[500px] rounded-full bg-purple-600/5 blur-3xl -bottom-64 -left-64"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      ></motion.div>
      
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
        <motion.div 
          className="flex flex-col justify-center"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent tracking-tight"
            variants={item}
          >
            Orchestration Nexus
          </motion.h1>
          <motion.p 
            className="mt-6 text-xl md:text-2xl text-muted-foreground"
            variants={item}
          >
            Intelligent Workflow Automation for Humans & AI
          </motion.p>
          <motion.p 
            className="mt-4 text-muted-foreground"
            variants={item}
          >
            Build, deploy, and manage hybrid human-AI workflows with a powerful visual orchestration platform.
          </motion.p>
          <motion.div 
            className="mt-8 flex flex-wrap gap-4"
            variants={item}
          >
            <Button size="lg" asChild className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 group">
              <Link to="/onboarding">
                Create Free Account
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="group">
              <Link to="#demo" className="flex items-center">
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Link>
            </Button>
          </motion.div>
          
          <motion.div 
            className="mt-8 flex items-center gap-2 text-sm text-muted-foreground"
            variants={item}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7 }}
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-[10px]">
                  {i}
                </div>
              ))}
            </div>
            <span>Join 500+ teams already using Orchestration Nexus</span>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="hidden lg:flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <NodeAnimationCanvas />
        </motion.div>
      </div>
    </section>
  );
}

function NodeAnimationCanvas() {
  return (
    <motion.div 
      className="relative w-full max-w-[500px] aspect-square rounded-lg overflow-hidden border border-purple-500/30 bg-background/50 backdrop-blur-sm"
      whileHover={{ boxShadow: "0 0 30px rgba(155,135,245,0.3)" }}
      transition={{ duration: 0.3 }}
    >
      {/* Decorative node visualization */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="w-10 h-10 rounded-full bg-purple-500/30 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-purple-500"></div>
        </div>
      </motion.div>
      
      <motion.div 
        className="absolute top-1/2 left-1/2 w-20 h-20 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ duration: 3.5, delay: 0.5, repeat: Infinity }}
      >
        <div className="w-12 h-12 rounded-full bg-purple-500/30 flex items-center justify-center">
          <div className="w-5 h-5 rounded-full bg-purple-500"></div>
        </div>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-14 h-14 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ duration: 3, delay: 1, repeat: Infinity }}
      >
        <div className="w-8 h-8 rounded-full bg-purple-500/30 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
        </div>
      </motion.div>
      
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path 
          d="M25 25 L50 50 L75 25" 
          stroke="url(#purpleGradient)" 
          strokeWidth="0.5" 
          fill="none" 
          strokeDasharray="3,2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "loop", repeatDelay: 3 }}
        />
        
        <motion.path 
          d="M50 50 L75 75" 
          stroke="url(#purpleGradient)" 
          strokeWidth="0.5" 
          fill="none" 
          strokeDasharray="3,2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 2, repeat: Infinity, repeatType: "loop", repeatDelay: 3.5 }}
        />
        
        <defs>
          <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9b87f5" />
            <stop offset="100%" stopColor="#7e69ab" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Pulse animation */}
      <motion.div
        className="absolute inset-0 bg-purple-500/5 rounded-lg"
        animate={{
          boxShadow: [
            "0 0 0 0 rgba(155, 135, 245, 0)",
            "0 0 0 15px rgba(155, 135, 245, 0.1)",
            "0 0 0 30px rgba(155, 135, 245, 0)"
          ]
        }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
      />
    </motion.div>
  )
}
