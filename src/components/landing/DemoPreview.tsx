
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CircleUser, FileCheck, MessageSquarePlus, Play } from "lucide-react";
import { Link } from "react-router-dom";

export function DemoPreview() {
  return (
    <section className="py-20 px-4" id="demo">
      <motion.div 
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
          See It In Action
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          Experience the power of Orchestration Nexus with our interactive demo. Build workflows, trigger LLMs, and manage approvals.
        </p>

        <div className="relative aspect-video max-w-5xl mx-auto rounded-xl overflow-hidden border border-purple-500/30 bg-background/60 backdrop-blur-sm shadow-[0_0_30px_rgba(155,135,245,0.15)]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full p-4 flex flex-col">
              {/* Mock workflow interface */}
              <div className="flex justify-between items-center border-b border-border pb-3 mb-4">
                <div className="text-lg font-semibold text-purple-400">Customer Support Workflow</div>
                <Button variant="outline" size="sm" className="text-purple-400 border-purple-500/30">
                  <Play className="h-4 w-4 mr-1" /> Run Workflow
                </Button>
              </div>
              
              <div className="flex-1 flex">
                {/* Sidebar */}
                <div className="w-1/4 pr-4 border-r border-border">
                  <div className="text-sm font-medium mb-2 text-purple-400">Nodes</div>
                  <div className="space-y-2">
                    <div className="p-2 rounded bg-purple-500/10 border border-purple-500/20 flex items-center gap-2">
                      <MessageSquarePlus className="h-4 w-4 text-purple-400" />
                      <span className="text-sm">LLM Node</span>
                    </div>
                    <div className="p-2 rounded bg-purple-500/10 border border-purple-500/20 flex items-center gap-2">
                      <CircleUser className="h-4 w-4 text-purple-400" />
                      <span className="text-sm">Human Input</span>
                    </div>
                    <div className="p-2 rounded bg-purple-500/10 border border-purple-500/20 flex items-center gap-2">
                      <FileCheck className="h-4 w-4 text-purple-400" />
                      <span className="text-sm">Approval</span>
                    </div>
                  </div>
                </div>
                
                {/* Canvas */}
                <div className="flex-1 relative">
                  <div className="absolute left-1/4 top-1/4 w-32 h-32 border border-purple-500/30 rounded-lg bg-purple-500/10 flex items-center justify-center flex-col p-2">
                    <MessageSquarePlus className="h-6 w-6 text-purple-400" />
                    <div className="text-xs text-center mt-2">Summarize Request</div>
                    <div className="text-[10px] text-purple-300 mt-1">LLM Node</div>
                  </div>
                  
                  <svg width="100%" height="100%" className="absolute inset-0 pointer-events-none">
                    <path 
                      d="M150,120 C180,120 220,180 250,180" 
                      stroke="url(#demoGradient)" 
                      strokeWidth="2" 
                      fill="none" 
                      strokeDasharray="5,2" 
                    />
                    <defs>
                      <linearGradient id="demoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#9b87f5" />
                        <stop offset="100%" stopColor="#7e69ab" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  <div className="absolute right-1/4 bottom-1/4 w-32 h-32 border border-purple-500/30 rounded-lg bg-purple-500/10 flex items-center justify-center flex-col p-2">
                    <FileCheck className="h-6 w-6 text-purple-400" />
                    <div className="text-xs text-center mt-2">Manager Review</div>
                    <div className="w-full mt-2 p-1 bg-yellow-500/10 border border-yellow-500/30 rounded text-[10px] text-center text-yellow-400">
                      Awaiting Approval
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-4">See What You Can Build Inside</h3>
                  <Button asChild>
                    <Link to="/onboarding">Get Started</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
