"use client";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Terminal, Code, Cpu } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8 overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-bronze to-slate opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
      </div>

      <div className="mx-auto max-w-7xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 flex justify-center"
          >
            <div className="relative rounded-full px-4 py-1 text-sm leading-6 text-neutral-400 ring-1 ring-white/10 hover:ring-white/20 bg-white/5 backdrop-blur-md">
              The Evolution of Engineering. <Link href="/roadmap" className="font-semibold text-bronze tracking-widest"><span className="absolute inset-0" aria-hidden="true"></span>Read more <span aria-hidden="true">&rarr;</span></Link>
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-5xl font-black tracking-tighter text-white sm:text-8xl leading-[0.9]"
          >
            MASTER THE <span className="text-gradient font-serif italic">MACHINE.</span><br />
            BUILD THE <span className="text-white underline decoration-bronze/30 decoration-8 underline-offset-8">FUTURE.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-12 text-lg leading-8 text-neutral-400 max-w-2xl mx-auto font-medium"
          >
            A high-performance ecosystem for the next generation of architects. 
            Elite Full-Stack AI training, persistent roadmap tracking, and a blueprint for global monetization.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-16 flex items-center justify-center gap-x-6"
          >
            <Link href="/auth" className="rounded-full bg-white px-8 py-4 text-sm font-black text-black shadow-sm hover:bg-neutral-200 transition-all flex items-center gap-2 tracking-widest">
              START YOUR JOURNEY <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/about" className="text-sm font-bold leading-6 text-white hover:text-bronze transition tracking-widest">
              EXPLORE BEYOND <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Feature Grid Previews (Bento Style) */}
      <section className="max-w-7xl mx-auto pb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-8 glass p-10 rounded-[40px] border-white/5 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-bronze/5 rounded-full blur-[80px]"></div>
            <div className="relative z-10">
              <Terminal className="w-10 h-10 text-bronze mb-6" />
              <h3 className="text-3xl font-black mb-4">Elite Engineer Roadmap</h3>
              <p className="text-neutral-400 max-w-md text-lg">
                The most comprehensive syllabus on the planet. From low-level C++ memory logic to scaling global AI agent swarms. 
                Every checkbox synced to your cloud profile.
              </p>
            </div>
            <Link href="/roadmap" className="absolute bottom-10 right-10 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-4 glass p-10 rounded-[40px] border-white/5 flex flex-col justify-between group"
          >
            <div>
              <Sparkles className="w-10 h-10 text-emerald-400 mb-6" />
              <h3 className="text-3xl font-black mb-4">100-Day Challenge</h3>
              <p className="text-neutral-500 text-sm">
                The monetization blueprint. Content creation, freelancing, and career scaling. Track every dollar earned.
              </p>
            </div>
            <Link href="/earnings" className="text-bronze font-bold text-sm tracking-widest flex items-center gap-2 mt-8">
              UNLOCk POTENTIAL <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
