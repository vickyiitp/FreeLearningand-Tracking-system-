"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { auth, db } from "@/lib/firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { 
  DollarSign, Briefcase, Camera, Target, MousePointer2, 
  Wallet, TrendingUp, Users, Rocket, TrendingDown, Clock, MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { id: "freelance", name: "Freelancing", icon: Briefcase, color: "text-blue-400" },
  { id: "content", name: "Content Creation", icon: Camera, color: "text-pink-400" },
  { id: "jobs", name: "Full-time/Jobs", icon: Target, color: "text-emerald-400" },
  { id: "other", name: "Other Hustles", icon: MousePointer2, color: "text-purple-400" },
];

const blueprints = [
  { 
    phase: "01", 
    title: "Days 1-30: Build in Public", 
    icon: Users,
    desc: "Create a technical presence. Post 1 challenge daily using AI. Goal: 1,000 developer audience." 
  },
  { 
    phase: "02", 
    title: "Days 31-60: Micro-Tooling", 
    icon: Rocket,
    desc: "Build single-page AI tools. Launch for free to gather emails and build trust." 
  },
  { 
    phase: "03", 
    title: "Days 61-100: B2B Outreach", 
    icon: TrendingUp,
    desc: "Pitch to 10 businesses daily. Offer AI automation services for $500 - $2,000." 
  },
];

export default function EarningsPage() {
  const [selectedCategory, setSelectedCategory] = useState("freelance");
  const [earnings, setEarnings] = useState<any[]>(Array(100).fill({ amount: 0, investment: 0, note: "" }));
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      if (u) {
        setUser(u);
        const docRef = doc(db, "earnings", u.uid);
        onSnapshot(docRef, (doc) => {
          if (doc.exists()) {
            setEarnings(doc.data().days || Array(100).fill({ amount: 0, investment: 0, note: "" }));
          }
        });
      }
    });
    return () => unsubscribe();
  }, []);

  const updateDay = async (index: number, field: string, value: any) => {
    if (!user) {
      alert("Please log in or register to save your earnings data.");
      return;
    }
    const newEarnings = [...earnings];
    newEarnings[index] = { ...newEarnings[index], [field]: value };
    setEarnings(newEarnings);
    try {
      await setDoc(doc(db, "earnings", user.uid), { days: newEarnings }, { merge: true });
    } catch (e) {
      console.error("Failed to update daily earnings:", e);
    }
  };

  const totalEarned = earnings.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
  const totalInvested = earnings.reduce((acc, curr) => acc + (Number(curr.investment) || 0), 0);
  
  // Custom stats calculators
  const netProfit = totalEarned - totalInvested;
  const roi = totalInvested > 0 ? Math.round((netProfit / totalInvested) * 100) : 0;
  const activeDays = earnings.filter(d => Number(d.amount) > 0).length;

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mb-16">
        <div className="max-w-2xl">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-bronze font-black text-[10px] tracking-[0.3em] uppercase mb-3"
          >
            Monetization Protocol
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tighter leading-tight">
            100-DAY <span className="text-bronze italic">REVENUE</span> GRID.
          </h1>
          <p className="text-neutral-500 font-medium text-sm leading-relaxed">
            Transition from standard developer to business architect. Input your daily revenue inputs, capital cost investments, and notes to calculate operations net growth.
          </p>
        </div>

        {/* Dynamic Financial Panel */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full lg:w-auto shrink-0">
          <div className="glass p-5 rounded-[28px] border-emerald-500/10 min-w-[130px] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-full blur-2xl"></div>
            <p className="text-[8px] font-black text-neutral-500 uppercase tracking-widest mb-1">Total Revenue</p>
            <p className="text-2xl font-black text-emerald-400 font-mono tracking-tighter">${totalEarned.toLocaleString()}</p>
          </div>
          
          <div className="glass p-5 rounded-[28px] border-red-500/10 min-w-[130px] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/5 rounded-full blur-2xl"></div>
            <p className="text-[8px] font-black text-neutral-500 uppercase tracking-widest mb-1">Investment</p>
            <p className="text-2xl font-black text-red-400 font-mono tracking-tighter">${totalInvested.toLocaleString()}</p>
          </div>

          <div className="glass p-5 rounded-[28px] min-w-[130px] relative overflow-hidden border-white/5">
            <p className="text-[8px] font-black text-neutral-500 uppercase tracking-widest mb-1">Net Balance</p>
            <p className={cn(
              "text-2xl font-black font-mono tracking-tighter",
              netProfit >= 0 ? "text-emerald-400" : "text-red-400"
            )}>
              {netProfit >= 0 ? "+" : ""}${netProfit.toLocaleString()}
            </p>
          </div>

          <div className="glass p-5 rounded-[28px] min-w-[130px] relative overflow-hidden border-white/5">
            <p className="text-[8px] font-black text-neutral-500 uppercase tracking-widest mb-1">Estimated ROI</p>
            <p className={cn(
              "text-2xl font-black font-mono tracking-tighter flex items-center gap-1",
              roi >= 0 ? "text-emerald-400" : "text-red-400"
            )}>
              {roi}% {roi >= 0 ? <TrendingUp className="w-4 h-4 text-emerald-400" /> : <TrendingDown className="w-4 h-4 text-red-400" />}
            </p>
          </div>
        </div>
      </div>

      {/* Blueprints Section */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {blueprints.map((b, i) => (
          <div key={i} className="glass p-8 rounded-[36px] border-white/5 bg-white/2 hover:bg-white/4 transition-colors group">
             <div className="text-3xl font-black text-neutral-800 mb-4 group-hover:text-bronze transition-colors">{b.phase}</div>
             <div className="flex items-center gap-3 mb-3 text-white">
                <b.icon className="w-4.5 h-4.5 text-bronze" />
                <h3 className="font-black text-base tracking-tight">{b.title}</h3>
             </div>
             <p className="text-xs text-neutral-500 leading-relaxed font-medium">{b.desc}</p>
          </div>
        ))}
      </div>

      {/* Category Selection Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                "p-6 rounded-[32px] border transition-all flex flex-col items-center gap-3 group cursor-pointer",
                isSelected ? "bg-white/5 border-bronze/20 shadow-xl" : "bg-black/40 border-white/5 hover:border-white/10"
              )}
            >
              <cat.icon className={cn("w-8 h-8 transition-colors", isSelected ? cat.color : "text-neutral-700 group-hover:text-neutral-500")} />
              <span className={cn("text-[9px] font-black uppercase tracking-widest", isSelected ? "text-white" : "text-neutral-600")}>
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* 100-Day Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-10 gap-3 mb-16">
        {earnings.map((day, i) => {
          const amountVal = Number(day.amount) || 0;
          const investVal = Number(day.investment) || 0;

          // Compute cell borders dynamically
          const isRevenueActive = amountVal > 0;
          const isInvestActive = investVal > 0;

          return (
            <div key={i} className="group relative">
              <div className={cn(
                "aspect-square rounded-2xl border flex flex-col items-center justify-center transition-all p-2 relative overflow-hidden",
                isRevenueActive 
                  ? "bg-emerald-500/5 border-emerald-500/35 shadow-[0_0_10px_rgba(16,185,129,0.05)]" 
                  : isInvestActive 
                    ? "bg-red-500/5 border-red-500/35" 
                    : "bg-white/2 border-white/5"
              )}>
                <span className="text-[7px] font-black text-neutral-700 mb-1">DAY {i + 1}</span>
                <input 
                  type="number"
                  value={day.amount || ""}
                  onChange={(e) => updateDay(i, "amount", e.target.value)}
                  placeholder="$0"
                  className="w-full bg-transparent text-center text-xs font-black text-white focus:outline-none placeholder:text-neutral-850 font-mono tracking-tighter"
                />
                
                {/* Floating Note indicator */}
                {day.note && (
                  <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-bronze"></div>
                )}
              </div>
              
              {/* Hover detail overlay panel */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 z-50 w-56 p-5 glass rounded-[28px] border-white/10 opacity-0 group-focus-within:opacity-100 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all mt-3 translate-y-1">
                 <div className="space-y-4">
                    <div>
                      <label className="text-[8px] font-black text-neutral-500 uppercase tracking-widest mb-1.5 block flex items-center gap-1">
                        <TrendingDown className="w-3 h-3 text-red-500" /> Daily Cost Investment
                      </label>
                      <div className="relative">
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 text-xs font-black text-neutral-600">$</span>
                        <input 
                          type="number" 
                          value={day.investment || ""}
                          onChange={(e) => updateDay(i, "investment", e.target.value)}
                          className="w-full bg-transparent border-b border-white/10 py-1 pl-4 text-xs font-bold text-white focus:outline-none focus:border-red-500 transition-colors"
                          placeholder="0"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[8px] font-black text-neutral-500 uppercase tracking-widest mb-1.5 block flex items-center gap-1">
                        <MessageSquare className="w-3 h-3 text-bronze" /> Log Description
                      </label>
                      <textarea 
                        value={day.note || ""}
                        onChange={(e) => updateDay(i, "note", e.target.value)}
                        className="w-full bg-transparent border border-white/10 rounded-xl p-2.5 text-[9px] text-neutral-400 focus:outline-none focus:border-bronze h-16 resize-none transition-colors"
                        placeholder="e.g. custom agent contract deployed"
                      />
                    </div>
                 </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
