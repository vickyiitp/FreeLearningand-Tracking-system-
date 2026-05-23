"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, Sparkles, Terminal, Code, Cpu, Shield, 
  Wallet, Trophy, Layers, Award, Play, ChevronRight, UserCheck
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
      {/* Premium Ambient Light Flares */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-[120px] sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-bronze/30 to-emerald-500/10 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
      </div>
      <div className="absolute top-[60vh] left-[-200px] w-[500px] h-[500px] bg-bronze/5 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      <div className="absolute top-[100vh] right-[-200px] w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none -z-10"></div>

      <div className="mx-auto max-w-7xl pt-24 pb-20 sm:pt-32 sm:pb-28">
        <div className="text-center">
          
          {/* Subheading Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex justify-center"
          >
            <div className="relative rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-widest text-neutral-400 ring-1 ring-white/10 hover:ring-white/20 bg-white/5 backdrop-blur-md flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-bronze animate-pulse" /> The Evolution of Software Engineering
            </div>
          </motion.div>
          
          {/* Title Hero */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl font-black tracking-tighter text-white sm:text-8xl leading-[0.95] uppercase"
          >
            Master the <span className="text-gradient font-serif italic lowercase">machine.</span><br />
            Architect the <span className="text-white underline decoration-bronze/40 decoration-8 underline-offset-8">Future.</span>
          </motion.h1>
          
          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-10 text-base sm:text-lg leading-relaxed text-neutral-400 max-w-2xl mx-auto font-medium"
          >
            A high-performance training ecosystem built for developers. 
            Elite Full-Stack AI pathways, structured syllabus templates, and active tools for career validation.
          </motion.p>

          {/* Action Triggers */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {isLoggedIn ? (
              <Link 
                href="/roadmap" 
                className="w-full sm:w-auto rounded-full bronze-gradient px-8 py-4.5 text-xs font-black text-white shadow-xl hover:shadow-[0_0_30px_rgba(205,127,50,0.2)] hover:scale-102 transition-all flex items-center justify-center gap-2 tracking-widest uppercase"
              >
                Go to Workspace Console <UserCheck className="w-4 h-4" />
              </Link>
            ) : (
              <Link 
                href="/auth" 
                className="w-full sm:w-auto rounded-full bg-white px-8 py-4.5 text-xs font-black text-black shadow-md hover:bg-neutral-200 hover:scale-102 transition-all flex items-center justify-center gap-2 tracking-widest uppercase"
              >
                Initiate Candidate Profile <ArrowRight className="w-4 h-4" />
              </Link>
            )}
            
            <Link 
              href="/about" 
              className="w-full sm:w-auto px-8 py-4.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-xs font-black leading-6 text-white transition-all tracking-widest uppercase flex items-center justify-center gap-2"
            >
              Explore Core Division <ChevronRight className="w-4 h-4 text-neutral-500" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Advanced Bento Grid Showcases */}
      <section className="max-w-7xl mx-auto pb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: Wide Syllabus Console Preview */}
          <motion.div 
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="md:col-span-8 glass p-8 md:p-10 rounded-[40px] border-white/5 relative overflow-hidden group flex flex-col justify-between min-h-[380px]"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-bronze/5 rounded-full blur-[80px] -z-10 group-hover:bg-bronze/10 transition-all duration-500"></div>
            
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-bronze/10 flex items-center justify-center border border-bronze/20">
                <Terminal className="w-6 h-6 text-bronze" />
              </div>
              <div>
                <span className="text-[10px] font-black text-bronze uppercase tracking-[0.25em]">Premium Syllabus Hub</span>
                <h3 className="text-3xl font-black text-white mt-1">Stanford-Tier Curriculum Console</h3>
              </div>
              <p className="text-neutral-400 max-w-lg text-sm leading-relaxed font-medium">
                Access curated guides across advanced subjects. Learn LLM RAG pipelines, fine-tune Llama3 parameters locally, serve endpoints with vLLM, and program autonomous graph agent networks.
              </p>
            </div>

            {/* Embedded Mini Mock Code panel */}
            <div className="mt-8 bg-black/60 border border-white/5 rounded-2xl p-4 font-mono text-[10px] text-emerald-400/80 max-w-md">
              <span className="text-neutral-600">// Track 12: Initialize Agent Stateful Graph</span><br />
              from langgraph.graph import StateGraph<br />
              workflow = StateGraph(AgentState)<br />
              workflow.add_node("agent", call_model)
            </div>

            <Link 
              href="/roadmap" 
              className="absolute bottom-8 right-8 w-12 h-12 rounded-full border border-white/10 bg-white/2 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all shadow-lg"
            >
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Card 2: 100-Day Challenge */}
          <motion.div 
            whileHover={{ y: -6 }}
            className="md:col-span-4 glass p-8 md:p-10 rounded-[40px] border-white/5 flex flex-col justify-between group min-h-[380px]"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <Wallet className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.25em]">Financial Blueprint</span>
                <h3 className="text-3xl font-black text-white mt-1">100-Day Revenue Grid</h3>
              </div>
              <p className="text-neutral-500 text-sm leading-relaxed font-medium">
                Track personal software development business earnings and operational costs. Calculate project margins, LTV ratios, and business cash runway parameters.
              </p>
            </div>
            
            <Link 
              href="/earnings" 
              className="text-bronze font-black text-xs tracking-widest flex items-center gap-1.5 mt-8 group-hover:text-bronze-hover transition-colors"
            >
              LAUNCH REVENUE MONITOR <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Card 3: Quest Board */}
          <motion.div 
            whileHover={{ y: -6 }}
            className="md:col-span-4 glass p-8 md:p-10 rounded-[40px] border-white/5 flex flex-col justify-between group min-h-[350px]"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                <Trophy className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <span className="text-[10px] font-black text-purple-400 uppercase tracking-[0.25em]">Gamified Levels</span>
                <h3 className="text-3xl font-black text-white mt-1">Quest Level Board</h3>
              </div>
              <p className="text-neutral-500 text-sm leading-relaxed font-medium">
                Face 100 intense code milestones. Earn technical validation badges by completing GitHub code repository commits.
              </p>
            </div>
            
            <Link 
              href="/challenges" 
              className="text-white font-black text-xs tracking-widest flex items-center gap-1.5 mt-8 hover:underline"
            >
              LAUNCH QUEST MODULE <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Card 4: Wide Planner Preview */}
          <motion.div 
            whileHover={{ y: -6 }}
            className="md:col-span-8 glass p-8 md:p-10 rounded-[40px] border-white/5 relative overflow-hidden group flex flex-col justify-between min-h-[350px]"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-[80px] -z-10 group-hover:bg-emerald-500/10 transition-all duration-500"></div>
            
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                <Layers className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.25em]">Operations Control</span>
                <h3 className="text-3xl font-black text-white mt-1">Operational Task Planner</h3>
              </div>
              <p className="text-neutral-400 max-w-lg text-sm leading-relaxed font-medium">
                Organize daily study goals, deployment steps, and projects. Synced with your cloud architect profile, keeping your daily roadmap on schedule.
              </p>
            </div>

            <Link 
              href="/planner" 
              className="absolute bottom-8 right-8 w-12 h-12 rounded-full border border-white/10 bg-white/2 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all shadow-lg"
            >
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
