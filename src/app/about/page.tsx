"use client";
import { motion } from "framer-motion";
import { Globe, Shield, Zap, Terminal, Code, Cpu } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex flex-col md:flex-row gap-16 items-center mb-32">
        <div className="flex-1">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl font-black text-white mb-8 tracking-tighter"
          >
            THE ARCHITECT: <span className="text-bronze italic underline underline-offset-8 decoration-bronze/30">VICKY IITP</span>
          </motion.h1>
          <p className="text-neutral-400 text-lg leading-relaxed mb-8 font-medium">
            Student at IIT Patna, Full-Stack AI Engineer, and the visionary behind the MVA Platform. 
            Vicky has spent years documenting the intersection of software architecture and enterprise automation. 
            The MVA Platform is the culmination of this journey—a gift to the engineering community.
          </p>
          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 glass rounded-3xl border-white/5">
              <h3 className="text-bronze font-black text-xs tracking-widest uppercase mb-2">Primary Directive</h3>
              <p className="text-white font-bold text-sm">Democratizing elite-tier technical education.</p>
            </div>
            <div className="p-6 glass rounded-3xl border-white/5">
              <h3 className="text-bronze font-black text-xs tracking-widest uppercase mb-2">Current Focus</h3>
              <p className="text-white font-bold text-sm">Autonomous Multi-Agent AI Swarms.</p>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full max-w-md aspect-square bronze-gradient rounded-[60px] opacity-20 blur-3xl animate-pulse"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
         <div className="glass p-12 rounded-[50px] border-white/5 group hover:border-bronze/20 transition-all">
            <h2 className="text-3xl font-black text-white mb-6">Devil Labs</h2>
            <p className="text-neutral-500 mb-8 text-sm leading-relaxed">
              The commercial B2B engine of the MVA ecosystem. Devil Labs architects custom SaaS solutions, 
              Internal AI tooling, and high-performance cloud infrastructure for modern enterprises.
            </p>
            <a href="mailto:themvaplatform@gmail.com" className="inline-flex items-center gap-3 text-bronze font-black text-xs tracking-[0.2em] group-hover:gap-5 transition-all">
              CONSULTATION <Zap className="w-4 h-4 fill-bronze" />
            </a>
         </div>

         <div className="glass p-12 rounded-[50px] border-white/5 group hover:border-bronze/20 transition-all">
            <h2 className="text-3xl font-black text-white mb-6">Indigo Lens</h2>
            <p className="text-neutral-500 mb-8 text-sm leading-relaxed">
              Our creative creative agency. Indigo Lens leverages AI video processing to produce high-impact 
              short-form content and cinematic branding at scale.
            </p>
            <a href="https://indigolens.in" className="inline-flex items-center gap-3 text-bronze font-black text-xs tracking-[0.2em] group-hover:gap-5 transition-all">
              VISIT INDIGOLENS.IN <Globe className="w-4 h-4" />
            </a>
         </div>
      </div>
    </div>
  );
}
