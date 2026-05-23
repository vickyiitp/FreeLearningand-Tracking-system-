"use client";
import { motion } from "framer-motion";
import { Globe, Shield, Zap, Terminal, Code, Cpu, ExternalLink, Blocks, Layers, Server, Cloud } from "lucide-react";
import Link from "next/link";

const floatingIcons = [
  { Icon: Code, top: "10%", left: "10%", color: "text-blue-500" },
  { Icon: Cpu, top: "20%", right: "15%", color: "text-emerald-500" },
  { Icon: Server, bottom: "20%", left: "15%", color: "text-bronze" },
  { Icon: Cloud, bottom: "10%", right: "10%", color: "text-cyan-500" },
  { Icon: Terminal, top: "40%", left: "0%", color: "text-purple-500" },
  { Icon: Blocks, bottom: "40%", right: "0%", color: "text-amber-500" },
];

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex flex-col md:flex-row gap-20 items-center mb-32 relative">
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
            VICKY <span className="text-bronze italic">IITP.</span>
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
          <div className="grid grid-cols-2 gap-6">
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-8 glass rounded-[40px] border-white/5"
            >
              <h3 className="text-bronze font-black text-[10px] tracking-widest uppercase mb-4">Primary Directive</h3>
              <p className="text-white font-bold text-sm leading-tight">Democratizing elite-tier technical education for the next generation.</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-8 glass rounded-[40px] border-white/5"
            >
              <h3 className="text-bronze font-black text-[10px] tracking-widest uppercase mb-4">Current Focus</h3>
              <p className="text-white font-bold text-sm leading-tight">Architecting autonomous AI swarms for enterprise efficiency.</p>
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
               {/* This is where the user's profile image would go */}
               <div className="text-8xl font-black text-white/10 select-none">V</div>
               
               {/* Logo Overlay */}
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-40 h-40 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                     <span className="text-5xl font-black text-white italic tracking-tighter">MVA7</span>
                  </div>
               </div>
            </div>
          </motion.div>

          {/* Floating Icons */}
          {floatingIcons.map((item, i) => (
            <motion.div
              key={i}
              className={`absolute z-20 ${item.color} ${item.top ? `top-[${item.top}]` : ''} ${item.bottom ? `bottom-[${item.bottom}]` : ''} ${item.left ? `left-[${item.left}]` : ''} ${item.right ? `right-[${item.right}]` : ''}`}
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
                Internal AI tooling, and high-performance cloud infrastructure for modern enterprises.
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
                Our creative creative agency. Indigo Lens leverages AI video processing to produce high-impact 
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
