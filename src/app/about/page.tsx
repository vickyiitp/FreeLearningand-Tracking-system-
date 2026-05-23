"use client";
import { motion } from "framer-motion";
import { 
  Globe, 
  Shield, 
  Zap, 
  Terminal, 
  Code, 
  Cpu, 
  ExternalLink, 
  Blocks, 
  Layers, 
  Server, 
  Cloud
} from "lucide-react";

const floatingIcons = [
  { Icon: Code, top: "10%", left: "10%", color: "text-blue-500" },
  { Icon: Cpu, top: "20%", right: "15%", color: "text-emerald-500" },
  { Icon: Server, bottom: "20%", left: "15%", color: "text-bronze" },
  { Icon: Cloud, bottom: "10%", right: "10%", color: "text-cyan-500" },
  { Icon: Terminal, top: "40%", left: "0%", color: "text-purple-500" },
  { Icon: Blocks, bottom: "40%", right: "0%", color: "text-bronze" },
];

const milestones = [
  {
    phase: "PHASE 01",
    title: "The Genesis Node",
    date: "Q3 2024",
    description: "Inception of the MVA methodology. Formulated the core engineering curriculum and designed the pilot codebase structure.",
    icon: Code
  },
  {
    phase: "PHASE 02",
    title: "VMVA Platform Release",
    date: "Q1 2025",
    description: "Launched the full Next.js application, integrating Firestore tracking, interactive Quest boards, and 100-day challenges.",
    icon: Zap
  },
  {
    phase: "PHASE 03",
    title: "Devil Labs B2B Scale",
    date: "Q3 2025",
    description: "Expanded MVA into corporate training. Devil Labs scaled custom AI operations and server integrations for enterprises.",
    icon: Server
  },
  {
    phase: "PHASE 04",
    title: "Autonomous Agent Nodes",
    date: "2026 & Beyond",
    description: "Integrating decentralized multi-agent frameworks, enabling self-healing codebases and automated platform growth.",
    icon: Shield
  }
];

const skillNodes = [
  { category: "Systems & Cloud", skills: ["Docker", "Kubernetes", "AWS Cloud", "Firebase / Firestore"], icon: Server, color: "text-blue-400" },
  { category: "Artificial Intelligence", skills: ["Autonomous Swarms", "Agent Architectures", "LLMs", "LangChain"], icon: Cpu, color: "text-emerald-400" },
  { category: "Engineering Design", skills: ["Clean Architecture", "API Engineering", "Security Protocols", "CI/CD Workflows"], icon: Layers, color: "text-bronze" },
  { category: "Interface Crafts", skills: ["Next.js App Router", "Tailwind CSS", "Framer Motion", "WebGL Elements"], icon: Blocks, color: "text-purple-400" }
];

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row gap-20 items-center mb-32 relative">
        <div className="flex-1 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-bronze/30 bg-bronze/10 text-bronze text-[10px] font-black uppercase tracking-widest"
          >
            Founder & Lead Architect
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none"
          >
            VICKY <span className="text-bronze italic font-serif-italic">IITP.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-neutral-400 text-xl leading-relaxed mb-10 font-medium max-w-xl"
          >
            Student at IIT Patna, Full-Stack AI Engineer, and the visionary behind the MVA Platform. 
            Vicky specializes in autonomous multi-agent systems and high-performance software architecture.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-8 glass rounded-[40px] border-white/5"
            >
              <h3 className="text-bronze font-black text-[10px] tracking-widest uppercase mb-4">Primary Directive</h3>
              <p className="text-white font-bold text-sm leading-tight">Democratizing elite-tier technical education for the next generation of builders.</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-8 glass rounded-[40px] border-white/5"
            >
              <h3 className="text-bronze font-black text-[10px] tracking-widest uppercase mb-4">Current Focus</h3>
              <p className="text-white font-bold text-sm leading-tight">Architecting autonomous AI swarms and secure multi-agent software nodes.</p>
            </motion.div>
          </div>
        </div>

        <div className="flex-1 relative w-full max-w-xl aspect-square flex items-center justify-center">
          {/* Decorative Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-bronze/10 rounded-full blur-[120px] animate-pulse"></div>
          
          {/* Main Image Container */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 w-80 h-80 md:w-96 md:h-96 glass rounded-[60px] border-white/10 overflow-hidden group p-1"
          >
            <div className="w-full h-full rounded-[58px] bronze-gradient-subtle flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500"></div>
               {/* Decorative Avatar Layer */}
               <div className="text-8xl font-black text-white/5 select-none font-serif-italic">V</div>
               
               {/* Logo Overlay */}
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-40 h-40 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 flex flex-col items-center justify-center group-hover:scale-110 transition-transform duration-700">
                     <span className="text-5xl font-black text-white italic tracking-tighter">MVA</span>
                     <span className="text-[10px] font-black text-bronze tracking-widest mt-1">NODE 01</span>
                  </div>
               </div>
            </div>
          </motion.div>

          {/* Floating Icons */}
          {floatingIcons.map((item, i) => (
            <motion.div
              key={i}
              className={`absolute z-20 ${item.color}`}
              style={{ top: item.top, bottom: item.bottom, left: item.left, right: item.right } as any}
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{ 
                duration: 5 + i, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <item.Icon className="w-10 h-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interactive Milestone Timeline */}
      <div className="mb-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase mb-4">Development <span className="text-gradient">Milestones</span></h2>
          <p className="text-neutral-500 max-w-xl mx-auto font-medium">The sequential pipeline tracing the evolution of the MVA platform from genesis to scale.</p>
        </div>

        <div className="relative max-w-4xl mx-auto pl-8 md:pl-0">
          {/* Vertical Center Line (on md screens) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-bronze/50 via-white/5 to-transparent -translate-x-1/2"></div>

          <div className="space-y-16">
            {milestones.map((milestone, idx) => {
              const Icon = milestone.icon;
              const isEven = idx % 2 === 0;
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  key={idx} 
                  className={`relative flex flex-col md:flex-row items-start ${isEven ? "md:flex-row-reverse" : ""}`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 top-1.5 -translate-x-1/2 z-10 w-9 h-9 rounded-full bg-background border border-bronze/40 flex items-center justify-center shadow-lg shadow-black">
                    <Icon className="w-4 h-4 text-bronze" />
                  </div>

                  {/* Empty space helper for alignment */}
                  <div className="hidden md:block w-1/2"></div>

                  {/* Timeline Card */}
                  <div className="w-full md:w-1/2 pl-8 md:pl-12 md:pr-12">
                    <div className="glass p-8 rounded-[32px] border-white/5 hover:border-bronze/20 transition-all relative group">
                      <div className="absolute top-6 right-6 font-mono text-[10px] font-black text-neutral-500 tracking-wider">
                        {idx === 0 ? "Q3 2024" : idx === 1 ? "Q1 2025" : idx === 2 ? "Q3 2025" : "2026 & Beyond"}
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-[9px] font-black text-bronze uppercase tracking-widest mb-4">
                        {milestone.phase}
                      </div>
                      <h4 className="text-xl font-black text-white mb-2 group-hover:text-bronze transition-colors">{milestone.title}</h4>
                      <p className="text-neutral-500 text-sm leading-relaxed font-medium">{milestone.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Core Credentials / Skills Matrix */}
      <div className="mb-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase mb-4">System <span className="text-gradient">Capabilities</span></h2>
          <p className="text-neutral-500 max-w-xl mx-auto font-medium">Underlying technical domains driving Devil Labs and the MVA platform ecosystem.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillNodes.map((node, idx) => {
            const Icon = node.icon;
            return (
              <motion.div
                whileHover={{ y: -6 }}
                key={idx}
                className="glass p-8 rounded-[32px] border-white/5 flex flex-col justify-between"
              >
                <div>
                  <div className="p-3 bg-white/2 border border-white/5 rounded-2xl w-fit mb-6">
                    <Icon className={`w-5 h-5 ${node.color}`} />
                  </div>
                  <h3 className="text-white font-black text-md mb-4">{node.category}</h3>
                </div>
                <div className="space-y-2 mt-4 pt-4 border-t border-white/5">
                  {node.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2 text-xs font-bold text-neutral-500">
                      <span className="w-1 h-1 rounded-full bg-neutral-700"></span>
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Labs & Agencies B2B Section */}
      <div className="grid md:grid-cols-2 gap-8">
         <motion.div 
           whileHover={{ y: -10 }}
           className="glass p-12 rounded-[50px] border-white/5 group hover:border-bronze/20 transition-all relative overflow-hidden"
         >
            <div className="absolute top-0 right-0 w-32 h-32 bg-bronze/5 rounded-full blur-3xl group-hover:bg-bronze/10 transition-all"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-black text-white mb-6 tracking-tighter uppercase italic">Devil Labs</h2>
              <p className="text-neutral-500 mb-8 text-lg leading-relaxed font-medium">
                The commercial B2B engine of the MVA ecosystem. Devil Labs architects custom SaaS solutions, 
                internal AI tooling, and high-performance cloud infrastructure for modern enterprises.
              </p>
              <a 
                href="https://vickyiitp.tech" 
                target="_blank"
                className="inline-flex items-center gap-4 bg-bronze/10 text-bronze px-8 py-4 rounded-2xl border border-bronze/20 font-black text-xs tracking-[0.2em] group-hover:bg-bronze group-hover:text-white transition-all shadow-[0_10px_30px_rgba(184,115,51,0.1)] hover:shadow-[0_15px_40px_rgba(184,115,51,0.2)]"
              >
                VISIT VICKYIITP.TECH <ExternalLink className="w-4 h-4" />
              </a>
            </div>
         </motion.div>

         <motion.div 
           whileHover={{ y: -10 }}
           className="glass p-12 rounded-[50px] border-white/5 group hover:border-bronze/20 transition-all relative overflow-hidden"
         >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-all"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-black text-white mb-6 tracking-tighter uppercase italic">Indigo Lens</h2>
              <p className="text-neutral-500 mb-8 text-lg leading-relaxed font-medium">
                Our creative multimedia agency. Indigo Lens leverages AI video processing pipelines to produce high-impact 
                short-form content and cinematic branding at scale.
              </p>
              <a 
                href="https://indigolens.in" 
                target="_blank"
                className="inline-flex items-center gap-4 bg-white/5 text-white px-8 py-4 rounded-2xl border border-white/10 font-black text-xs tracking-[0.2em] group-hover:bg-white group-hover:text-black transition-all"
              >
                VISIT INDIGOLENS.IN <Globe className="w-4 h-4" />
              </a>
            </div>
         </motion.div>
      </div>
    </div>
  );
}
