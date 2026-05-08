"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { auth, db } from "@/lib/firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { Trophy, Lock, CheckCircle2, Sword, ShieldAlert, Smartphone, ArrowRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const challengeTypes = [
  { id: "dsa", name: "DSA Mastery", icon: Sword, color: "text-emerald-400", bgColor: "bg-emerald-500/10" },
  { id: "sec", name: "Cybersecurity", icon: ShieldAlert, color: "text-red-400", bgColor: "bg-red-500/10" },
  { id: "mobile", name: "App Development", icon: Smartphone, color: "text-pink-400", bgColor: "bg-pink-500/10" },
];

export default function ChallengesPage() {
  const [selectedType, setSelectedType] = useState("dsa");
  const [progress, setProgress] = useState<Record<string, number>>({ dsa: 5, sec: 2, mobile: 1 });
  const [user, setUser] = useState<any>(null);

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
    if (!user) return alert("Please log in to track progress.");
    if (level > progress[type] + 1) return alert("Complete previous levels first!");
    
    const newProgress = { ...progress, [type]: Math.max(progress[type], level) };
    setProgress(newProgress);
    await setDoc(doc(db, "challenges", user.uid), { levels: newProgress }, { merge: true });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-20">
        <h1 className="text-6xl font-black text-white mb-6 tracking-tighter leading-tight">
          THE <span className="text-bronze italic">QUEST</span> BOARD.
        </h1>
        <p className="text-neutral-500 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
          100 levels of pure engineering intensity. No theory without building. 
          Each level requires a "Project Gate" commit to proceed.
        </p>
      </div>

      {/* Type Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {challengeTypes.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelectedType(t.id)}
            className={cn(
              "p-8 rounded-[40px] border transition-all flex items-center justify-between group",
              selectedType === t.id ? "bg-white/5 border-white/20 shadow-2xl" : "bg-black/40 border-white/5 hover:border-white/10"
            )}
          >
            <div className="flex items-center gap-6">
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", t.bgColor)}>
                <t.icon className={cn("w-7 h-7", t.color)} />
              </div>
              <div className="text-left">
                <span className="text-xs font-black text-neutral-600 uppercase tracking-widest">{t.name}</span>
                <p className="text-white font-black text-xl">{progress[t.id]} / 100</p>
              </div>
            </div>
            <ArrowRight className={cn("w-5 h-5 transition-transform", selectedType === t.id ? "text-bronze translate-x-2" : "text-neutral-800")} />
          </button>
        ))}
      </div>

      {/* Levels Grid */}
      <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-4 mb-20">
        {Array.from({ length: 100 }, (_, i) => {
          const level = i + 1;
          const isCompleted = level <= progress[selectedType];
          const isUnlocked = level === progress[selectedType] + 1;
          const isLocked = level > progress[selectedType] + 1;

          return (
            <motion.div
              key={level}
              whileHover={isUnlocked ? { scale: 1.1 } : {}}
              onClick={() => isUnlocked && completeLevel(selectedType, level)}
              className={cn(
                "aspect-square rounded-[24px] border flex flex-col items-center justify-center transition-all cursor-pointer relative group",
                isCompleted ? "bg-bronze/20 border-bronze/40 text-white shadow-[0_0_20px_rgba(205,127,50,0.2)]" :
                isUnlocked ? "bg-white/5 border-bronze/20 text-bronze animate-pulse" :
                "bg-black/40 border-white/5 text-neutral-800"
              )}
            >
              <span className={cn("text-[10px] font-black group-hover:hidden", isLocked ? "opacity-20" : "")}>{level}</span>
              <div className="hidden group-hover:block">
                 {isCompleted ? <CheckCircle2 className="w-5 h-5 text-bronze" /> : 
                  isUnlocked ? <Zap className="w-5 h-5 text-bronze" /> : 
                  <Lock className="w-5 h-5 text-neutral-900" />}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Info Card */}
      <div className="glass p-12 rounded-[50px] border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-bronze/5 rounded-full blur-[100px]"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <Trophy className="w-10 h-10 text-bronze" />
            <h2 className="text-4xl font-black text-white tracking-tighter">THE PORTFOLIO PROTOCOL</h2>
          </div>
          <p className="text-neutral-500 text-lg mb-10 max-w-3xl leading-relaxed">
            Completing 100 levels builds a massive repository of production-grade code. 
            Levels 80-100 are **Client Simulations** where you build for virtual enterprise customers, 
            preparing you for actual B2B contracts with **Devil Labs**.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
             <div className="p-6 bg-black/40 rounded-3xl border border-white/5">
                <h4 className="font-bold text-white mb-2 uppercase text-xs tracking-widest text-bronze">Hard Logic</h4>
                <p className="text-neutral-500 text-xs font-medium">Solve real problems: Distributed systems, RAG optimization, and kernel-level tweaks.</p>
             </div>
             <div className="p-6 bg-black/40 rounded-3xl border border-white/5">
                <h4 className="font-bold text-white mb-2 uppercase text-xs tracking-widest text-bronze">Public Proof</h4>
                <p className="text-neutral-500 text-xs font-medium">Every level requires a GitHub commit. You end with 100 verifiable technical receipts.</p>
             </div>
             <div className="p-6 bg-black/40 rounded-3xl border border-white/5">
                <h4 className="font-bold text-white mb-2 uppercase text-xs tracking-widest text-bronze">B2B Ready</h4>
                <p className="text-neutral-500 text-xs font-medium">Graduate from student to architect. Final levels prepare you for $2k+ contracts.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
