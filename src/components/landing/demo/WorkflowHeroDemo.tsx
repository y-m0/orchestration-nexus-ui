
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Database, User, Circle, CircleCheck } from "lucide-react";

export function WorkflowHeroDemo() {
  const [activeNodeIndex, setActiveNodeIndex] = useState(0);
  
  const nodes = [
    { id: "agent", icon: Circle, label: "AI Agent", x: "25%", y: "30%" },
    { id: "db", icon: Database, label: "Database", x: "50%", y: "50%" },
    { id: "human", icon: User, label: "Human Task", x: "75%", y: "30%" },
    { id: "approval", icon: CircleCheck, label: "Approval", x: "50%", y: "70%" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNodeIndex((prev) => (prev + 1) % nodes.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full aspect-[16/9] max-w-4xl mx-auto">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-purple-500/5 rounded-3xl border border-purple-500/20">
        {/* Nodes */}
        {nodes.map((node, index) => (
          <motion.div
            key={node.id}
            className="absolute"
            style={{ left: node.x, top: node.y }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              filter: activeNodeIndex === index ? "brightness(1.5)" : "brightness(1)"
            }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className={`relative p-4 rounded-2xl bg-card/50 backdrop-blur-sm border border-purple-500/30
                ${activeNodeIndex === index ? 'shadow-lg shadow-purple-500/20' : ''}`}
              whileHover={{ scale: 1.05 }}
              animate={{
                boxShadow: activeNodeIndex === index 
                  ? "0 0 20px rgba(168, 85, 247, 0.4)"
                  : "0 0 0px rgba(168, 85, 247, 0)"
              }}
            >
              <node.icon className={`w-8 h-8 ${
                activeNodeIndex === index ? 'text-purple-400' : 'text-muted-foreground'
              }`} />
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm text-muted-foreground whitespace-nowrap">
                {node.label}
              </span>
            </motion.div>
          </motion.div>
        ))}

        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {[
            ["25%", "30%", "50%", "50%"],
            ["50%", "50%", "75%", "30%"],
            ["50%", "50%", "50%", "70%"],
          ].map(([x1, y1, x2, y2], index) => (
            <motion.path
              key={index}
              d={`M ${x1} ${y1} L ${x2} ${y2}`}
              stroke="url(#purpleGradient)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: 1,
                strokeWidth: activeNodeIndex === index ? 3 : 2
              }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
          <defs>
            <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9333EA" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
          </defs>
        </svg>

        {/* Background Effects */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-purple-500/5 rounded-3xl"
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>
    </div>
  );
}
