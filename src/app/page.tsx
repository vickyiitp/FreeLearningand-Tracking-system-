"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, Sparkles, Terminal, Code, Cpu, Shield, 
  Wallet, Trophy, Layers, Award, Info, Heart, ChevronRight, UserCheck
} from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/firebase";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setIsLoggedIn(!!u);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8 overflow-hidden min-h-screen">
      {/* Background glow flares */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-[120px] sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-bronze/30 to-emerald-500/5 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
      </div>
      
      {/* Main hero segment */}
      <div className="mx-auto max-w-7xl pt-20 pb-16 sm:pt-28 sm:pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-neutral-400 border border-white/5 bg-white/3 backdrop-blur-md flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-bronze animate-pulse" /> The Unified Developer Ecosystem
          </div>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-8xl font-black tracking-tighter text-white leading-[0.9] uppercase"
        >
          MAster the <span className="text-gradient font-serif-italic lowercase">machine.</span><br />
          BUILD THE <span className="text-white underline decoration-bronze/30 decoration-8 underline-offset-8">FUTURE.</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.8 }}
          className="mt-8 text-sm sm:text-base leading-relaxed text-neutral-400 max-w-2xl mx-auto font-medium"
        >
          A highly structured, premium workstation designed to take you from core logic foundations to advanced AI systems engineering and direct career monetization.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {isLoggedIn ? (
            <Link 
              href="/roadmap" 
              className="w-full sm:w-auto rounded-full bronze-gradient px-8 py-4.5 text-xs font-black text-white hover:opacity-90 transition-all flex items-center justify-center gap-2 tracking-widest uppercase shadow-lg"
            >
              Go to Workspace <UserCheck className="w-4 h-4" />
            </Link>
          ) : (
            <Link 
              href="/auth" 
              className="w-full sm:w-auto rounded-full bg-white px-8 py-4.5 text-xs font-black text-black hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 tracking-widest uppercase shadow-md"
            >
              Initialize Profile <ArrowRight className="w-4 h-4" />
            </Link>
          )}
          <Link 
            href="/roadmap" 
            className="w-full sm:w-auto px-8 py-4.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-black text-white transition-all tracking-widest uppercase flex items-center justify-center gap-2"
          >
            Explore Syllabus
          </Link>
        </motion.div>
      </div>

      {/* Grid of the 6 Core Modules (Mapping exactly to routes) */}
      <section className="max-w-7xl mx-auto pb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* 1. ROADMAP (Wide) */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-8 glass p-8 md:p-10 rounded-[40px] relative overflow-hidden group flex flex-col justify-between min-h-[360px]"
          >
            <div className="absolute top-0 right-0 w-72 h-72 bg-bronze/5 rounded-full blur-[80px] -z-10 group-hover:bg-bronze/10 transition-colors duration-500"></div>
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-xl bg-bronze/10 flex items-center justify-center border border-bronze/20 text-bronze">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[9px] font-black text-bronze uppercase tracking-[0.25em] block">Module 01</span>
                <h3 className="text-2xl md:text-3xl font-black text-white mt-1">Stanford-Tier Syllabus & Media Player</h3>
              </div>
              <p className="text-neutral-400 text-sm leading-relaxed max-w-xl font-medium">
                Deep dive into advanced architectures. Stream video lectures natively, check off deep reading links, write code in the sandbox environment, and tackle assignments and projects.
              </p>
            </div>
            
            <div className="flex items-center gap-4 mt-6">
              <span className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[9px] font-black text-neutral-400 uppercase tracking-widest">
                Track 12: AI Systems Engineer
              </span>
              <span className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[9px] font-black text-neutral-400 uppercase tracking-widest">
                Integrated Youtube player
              </span>
            </div>

            <Link href="/roadmap" className="absolute bottom-8 right-8 w-11 h-11 rounded-full border border-white/10 bg-white/2 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* 2. CHALLENGES (Standard) */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-4 glass p-8 md:p-10 rounded-[40px] flex flex-col justify-between group min-h-[360px]"
          >
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 text-purple-400">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[9px] font-black text-purple-400 uppercase tracking-[0.25em] block">Module 02</span>
                <h3 className="text-2xl md:text-3xl font-black text-white mt-1">100-Level Quest Board</h3>
              </div>
              <p className="text-neutral-500 text-sm leading-relaxed font-medium">
                A sequential challenge grid structured across DSA, cybersecurity and app development. Click active levels to view problem guidelines.
              </p>
            </div>
            
            <Link href="/challenges" className="text-bronze font-black text-[10px] tracking-widest uppercase flex items-center gap-1.5 hover:text-bronze-hover transition-colors">
              Access Quest Panel <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>

          {/* 3. EARNINGS (Standard) */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-4 glass p-8 md:p-10 rounded-[40px] flex flex-col justify-between group min-h-[360px]"
          >
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-400">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[9px] font-black text-emerald-400 uppercase tracking-[0.25em] block">Module 03</span>
                <h3 className="text-2xl md:text-3xl font-black text-white mt-1">100-Day Revenue Grid</h3>
              </div>
              <p className="text-neutral-500 text-sm leading-relaxed font-medium">
                Log daily earnings, cost investments, and notes. Visualize unit economics and cash runway metrics in your console.
              </p>
            </div>
            
            <Link href="/earnings" className="text-bronze font-black text-[10px] tracking-widest uppercase flex items-center gap-1.5 hover:text-bronze-hover transition-colors">
              Access Revenue Grid <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>

          {/* 4. PLANNER (Wide) */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-8 glass p-8 md:p-10 rounded-[40px] relative overflow-hidden group flex flex-col justify-between min-h-[360px]"
          >
            <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-[80px] -z-10 group-hover:bg-emerald-500/10 transition-colors duration-500"></div>
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-blue-400">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[9px] font-black text-blue-400 uppercase tracking-[0.25em] block">Module 04</span>
                <h3 className="text-2xl md:text-3xl font-black text-white mt-1">Operational Task Planner</h3>
              </div>
              <p className="text-neutral-400 text-sm leading-relaxed max-w-xl font-medium">
                A dedicated interface to manage study steps and coding tasks. Categorize tasks into Architecture, Deployments, or Refactoring, and sync them directly inside your user profile.
              </p>
            </div>

            <div className="flex items-center gap-4 mt-6">
              <span className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[9px] font-black text-neutral-400 uppercase tracking-widest">
                Category Groupings
              </span>
              <span className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[9px] font-black text-neutral-400 uppercase tracking-widest">
                Profile Drawer Sync
              </span>
            </div>

            <Link href="/planner" className="absolute bottom-8 right-8 w-11 h-11 rounded-full border border-white/10 bg-white/2 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* 5. ABOUT (Standard) */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-6 glass p-8 md:p-10 rounded-[40px] flex flex-col justify-between group min-h-[320px]"
          >
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 text-cyan-400">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[9px] font-black text-cyan-400 uppercase tracking-[0.25em] block">Module 05</span>
                <h3 className="text-2xl md:text-3xl font-black text-white mt-1">Founders & Agencies</h3>
              </div>
              <p className="text-neutral-500 text-sm leading-relaxed font-medium">
                Meet the architect Vicky IITP and explore custom software development operations via Devil Labs and media agency Indigo Lens.
              </p>
            </div>
            
            <Link href="/about" className="text-bronze font-black text-[10px] tracking-widest uppercase flex items-center gap-1.5 hover:text-bronze-hover transition-colors">
              Explore Division <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>

          {/* 6. DONATE (Standard) */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-6 glass p-8 md:p-10 rounded-[40px] flex flex-col justify-between group min-h-[320px]"
          >
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20 text-red-400">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[9px] font-black text-red-400 uppercase tracking-[0.25em] block">Module 06</span>
                <h3 className="text-2xl md:text-3xl font-black text-white mt-1">Support the Platform</h3>
              </div>
              <p className="text-neutral-500 text-sm leading-relaxed font-medium">
                Keep the servers running and the curriculum expanding. Scan our UPI QR code directly on page to help support our operations.
              </p>
            </div>
            
            <Link href="/donate" className="text-bronze font-black text-[10px] tracking-widest uppercase flex items-center gap-1.5 hover:text-bronze-hover transition-colors">
              Scan QR Code <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
