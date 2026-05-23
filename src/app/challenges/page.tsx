"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { auth, db } from "@/lib/firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { 
  Trophy, Lock, CheckCircle2, Sword, ShieldAlert, 
  Smartphone, ArrowRight, Zap, Play, X, Star, Compass, Cpu, Code
} from "lucide-react";
import { cn } from "@/lib/utils";

const challengeTypes = [
  { id: "dsa", name: "DSA Mastery", icon: Sword, color: "text-emerald-400", bgColor: "bg-emerald-500/10", border: "border-emerald-500/20" },
  { id: "sec", name: "Cybersecurity", icon: ShieldAlert, color: "text-red-400", bgColor: "bg-red-500/10", border: "border-red-500/20" },
  { id: "mobile", name: "App Development", icon: Smartphone, color: "text-pink-400", bgColor: "bg-pink-500/10", border: "border-pink-500/20" },
];

export default function ChallengesPage() {
  const [selectedType, setSelectedType] = useState("dsa");
  const [progress, setProgress] = useState<Record<string, number>>({ dsa: 5, sec: 2, mobile: 1 });
  const [user, setUser] = useState<any>(null);
  
  // Interactive detail overlay
  const [activeLevelDetails, setActiveLevelDetails] = useState<number | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      if (u) {
        setUser(u);
        const docRef = doc(db, "challenges", u.uid);
        onSnapshot(docRef, (doc) => {
          if (doc.exists()) {
            setProgress(doc.data().levels || { dsa: 5, sec: 2, mobile: 1 });
          }
        });
      }
    });
    return () => unsubscribe();
  }, []);

  const completeLevel = async (type: string, level: number) => {
    if (!user) {
      alert("Please log in or register to track your quest progression.");
      return;
    }
    
    const newProgress = { ...progress, [type]: Math.max(progress[type], level) };
    setProgress(newProgress);
    try {
      await setDoc(doc(db, "challenges", user.uid), { levels: newProgress }, { merge: true });
      setActiveLevelDetails(null); // close details card
    } catch (e) {
      console.error("Failed to update challenges progress:", e);
    }
  };

  // Get difficulty/phase name for level ranges
  const getLevelPhaseInfo = (level: number) => {
    if (level <= 25) return { name: "Initiate Tier", color: "text-neutral-500", desc: "Core algorithms and foundational logic." };
    if (level <= 50) return { name: "Specialist Tier", color: "text-blue-400", desc: "Intermediate design patterns and pipelines." };
    if (level <= 75) return { name: "Architect Tier", color: "text-bronze", desc: "High-performance systems and structures." };
    return { name: "AGI Mastermind", color: "text-purple-400", desc: "Autonomous agent integrations and client simulations." };
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-bronze/30 bg-bronze/10 text-bronze text-[9px] font-black uppercase tracking-widest"
        >
          <Trophy className="w-3.5 h-3.5" /> Core Portfolio Quest Grid
        </motion.div>
        <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tighter leading-tight">
          THE QUEST <span className="text-bronze italic">BOARD.</span>
        </h1>
        <p className="text-neutral-500 max-w-xl mx-auto font-medium text-sm leading-relaxed">
          100 sequential levels of engineering tasks. Click any unlocked level cell to view the required challenge constraints.
        </p>
      </div>

      {/* Type Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {challengeTypes.map((t) => {
          const isSelected = selectedType === t.id;
          return (
            <button
              key={t.id}
              onClick={() => {
                setSelectedType(t.id);
                setActiveLevelDetails(null);
              }}
              className={cn(
                "p-6 rounded-[32px] border transition-all flex items-center justify-between group cursor-pointer",
                isSelected 
                  ? "bg-white/5 border-white/10 shadow-2xl" 
                  : "bg-black/40 border-white/5 hover:border-white/10"
              )}
            >
              <div className="flex items-center gap-4">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0", t.bgColor)}>
                  <t.icon className={cn("w-5 h-5", t.color)} />
                </div>
                <div className="text-left">
                  <span className="text-[9px] font-black text-neutral-600 uppercase tracking-widest block">{t.name}</span>
                  <p className="text-white font-black text-lg mt-0.5">{progress[t.id] || 0} / 100 Completed</p>
                </div>
              </div>
              <ArrowRight className={cn("w-4 h-4 transition-transform", isSelected ? "text-bronze translate-x-1" : "text-neutral-800")} />
            </button>
          );
        })}
      </div>

      {/* Level Layout Grid */}
      <div className="glass p-8 rounded-[48px] border-white/5 mb-16">
        <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-3">
          {Array.from({ length: 100 }, (_, i) => {
            const level = i + 1;
            const currentProgress = progress[selectedType] || 0;
            const isCompleted = level <= currentProgress;
            const isUnlocked = level === currentProgress + 1;
            const isLocked = level > currentProgress + 1;

            return (
              <motion.div
                key={level}
                whileHover={isUnlocked ? { scale: 1.08 } : {}}
                onClick={() => !isLocked && setActiveLevelDetails(level)}
                className={cn(
                  "aspect-square rounded-2xl border flex flex-col items-center justify-center transition-all cursor-pointer relative group",
                  isCompleted ? "bg-bronze/10 border-bronze/35 text-white shadow-[0_0_15px_rgba(210,144,84,0.15)]" :
                  isUnlocked ? "bg-white/5 border-bronze/20 text-bronze animate-pulse" :
                  "bg-black/30 border-white/2 text-neutral-800 cursor-not-allowed"
                )}
              >
                <span className={cn("text-xs font-mono font-black group-hover:hidden", isLocked ? "opacity-15" : "text-white/80")}>
                  {level}
                </span>
                
                {/* Status Indicator Overlays */}
                <div className="hidden group-hover:block shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-bronze" />
                  ) : isUnlocked ? (
                    <Zap className="w-4 h-4 text-bronze animate-bounce" />
                  ) : (
                    <Lock className="w-4 h-4 text-neutral-800" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Level details overlay card */}
      <AnimatePresence>
        {activeLevelDetails !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveLevelDetails(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            {/* Content Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              className="relative w-full max-w-lg glass p-8 md:p-10 rounded-[40px] border-white/10 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-bronze/5 rounded-full blur-[80px] -z-10"></div>
              
              <button 
                onClick={() => setActiveLevelDetails(null)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition"
              >
                <X className="w-4 h-4 text-neutral-400" />
              </button>

              <div className="mb-6">
                <span className={cn(
                  "text-[9px] font-black uppercase tracking-[0.2em] block mb-1",
                  getLevelPhaseInfo(activeLevelDetails).color
                )}>
                  {getLevelPhaseInfo(activeLevelDetails).name}
                </span>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  Level {activeLevelDetails} Challenge Profile
                </h3>
              </div>

              <div className="space-y-6 mb-8">
                <div className="bg-black/40 p-5 rounded-2xl border border-white/5">
                  <h4 className="text-[9px] font-black text-neutral-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-bronze" /> Challenge Statement
                  </h4>
                  <p className="text-xs text-neutral-300 leading-relaxed font-medium">
                    {selectedType === "dsa" ? (
                      `Build optimization solutions for index range ${activeLevelDetails}. You must complete local trace calculations, write memory-safe pointers, and test boundary exceptions.`
                    ) : selectedType === "sec" ? (
                      `Audit web-service input vector ${activeLevelDetails}. Sanitize incoming queries, configure CORS authorization rules, and verify boundary escape sequences.`
                    ) : (
                      `Implement adaptive grid render controller ${activeLevelDetails}. Link state variables to local storage nodes, build swipe triggers, and ensure 60fps scrolling.`
                    )}
                  </p>
                </div>

                <div className="bg-black/40 p-5 rounded-2xl border border-white/5">
                  <h4 className="text-[9px] font-black text-neutral-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5 text-blue-400" /> Required Deliverables
                  </h4>
                  <p className="text-xs text-white font-bold leading-relaxed">
                    A clean, compilation-safe Git commit containing your implementation parameters pushed to your portfolio repository.
                  </p>
                </div>

                <div className="bg-black/40 p-4 rounded-2xl border border-white/5 flex justify-between items-center text-xs">
                  <span className="font-black text-neutral-500 uppercase">Verification Status</span>
                  <span className={cn(
                    "px-3 py-1 rounded-full text-[9px] font-black tracking-wider uppercase border",
                    (progress[selectedType] || 0) >= activeLevelDetails
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                      : "bg-bronze/10 border-bronze/20 text-bronze animate-pulse"
                  )}>
                    {(progress[selectedType] || 0) >= activeLevelDetails ? "Completed" : "Active / Unlocked"}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              {(progress[selectedType] || 0) < activeLevelDetails ? (
                <button
                  onClick={() => completeLevel(selectedType, activeLevelDetails)}
                  className="w-full py-4.5 rounded-2xl bronze-gradient text-white text-xs font-black uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" /> Verify & Sync Progress
                </button>
              ) : (
                <button
                  onClick={() => setActiveLevelDetails(null)}
                  className="w-full py-4.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Close Level Profile
                </button>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* Portfolio Info Card */}
      <div className="glass p-10 rounded-[48px] border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-bronze/5 rounded-full blur-[100px] -z-10"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <Trophy className="w-8 h-8 text-bronze" />
            <h2 className="text-3xl font-black text-white tracking-tighter">THE PORTFOLIO PROTOCOL</h2>
          </div>
          <p className="text-neutral-500 text-sm mb-8 max-w-3xl leading-relaxed font-medium">
            Completing 100 levels builds a massive repository of production-grade code. 
            Levels 80-100 are **Client Simulations** where you build for virtual enterprise customers, 
            preparing you for actual B2B contracts.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
             <div className="p-5 bg-black/40 rounded-2xl border border-white/5">
                <h4 className="font-black text-white mb-2 uppercase text-[10px] tracking-widest text-bronze">Hard Logic</h4>
                <p className="text-neutral-500 text-xs font-medium leading-relaxed">Solve real problems: Distributed systems, RAG optimization, and kernel-level tweaks.</p>
             </div>
             <div className="p-5 bg-black/40 rounded-2xl border border-white/5">
                <h4 className="font-black text-white mb-2 uppercase text-[10px] tracking-widest text-bronze">Public Proof</h4>
                <p className="text-neutral-500 text-xs font-medium leading-relaxed">Every level requires a GitHub commit. You end with 100 verifiable technical receipts.</p>
             </div>
             <div className="p-5 bg-black/40 rounded-2xl border border-white/5">
                <h4 className="font-black text-white mb-2 uppercase text-[10px] tracking-widest text-bronze">B2B Ready</h4>
                <p className="text-neutral-500 text-xs font-medium leading-relaxed">Graduate from student to architect. Final levels prepare you for $2k+ contracts.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
