"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { auth, db } from "@/lib/firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { DollarSign, BarChart3, Target, MousePointer2, Briefcase, Camera, Wallet, TrendingUp, Users, Rocket } from "lucide-react";
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
    if (!user) return alert("Please log in to save data.");
    const newEarnings = [...earnings];
    newEarnings[index] = { ...newEarnings[index], [field]: value };
    setEarnings(newEarnings);
    await setDoc(doc(db, "earnings", user.uid), { days: newEarnings }, { merge: true });
  };

  const totalEarned = earnings.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
  const totalInvested = earnings.reduce((acc, curr) => acc + (Number(curr.investment) || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-20">
        <div className="max-w-2xl">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-bronze font-black text-xs tracking-[0.3em] uppercase mb-4"
          >
            Monetization Protocol
          </motion.div>
          <h1 className="text-6xl font-black text-white mb-6 tracking-tighter leading-tight">
            100-DAY <span className="text-bronze italic">REVENUE</span> GRID.
          </h1>
          <p className="text-neutral-500 font-medium text-lg leading-relaxed">
            Shift from learning to earning. Track every dollar of revenue and investment. 
            This data is secured and synced to your personal cloud profile.
          </p>
        </div>
        <div className="flex gap-6 w-full lg:w-auto">
          <div className="glass flex-1 lg:w-64 p-8 rounded-[40px] border-emerald-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-3xl"></div>
            <p className="text-[10px] font-black text-neutral-600 uppercase mb-2 tracking-widest">Total Revenue</p>
            <p className="text-4xl font-black text-emerald-400 font-mono tracking-tighter">${totalEarned.toLocaleString()}</p>
          </div>
          <div className="glass flex-1 lg:w-64 p-8 rounded-[40px] border-red-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-3xl"></div>
            <p className="text-[10px] font-black text-neutral-600 uppercase mb-2 tracking-widest">Total Investment</p>
            <p className="text-4xl font-black text-red-400 font-mono tracking-tighter">${totalInvested.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Blueprints Section */}
      <div className="grid md:grid-cols-3 gap-6 mb-20">
        {blueprints.map((b, i) => (
          <div key={i} className="glass p-10 rounded-[40px] border-white/5 bg-white/2 hover:bg-white/5 transition-colors group">
             <div className="text-4xl font-black text-neutral-800 mb-6 group-hover:text-bronze transition-colors">{b.phase}</div>
             <div className="flex items-center gap-3 mb-4 text-white">
                <b.icon className="w-5 h-5 text-bronze" />
                <h3 className="font-black tracking-tight">{b.title}</h3>
             </div>
             <p className="text-sm text-neutral-500 leading-relaxed font-medium">{b.desc}</p>
          </div>
        ))}
      </div>

      {/* Category Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={cn(
              "p-8 rounded-[40px] border transition-all flex flex-col items-center gap-4 group",
              selectedCategory === cat.id ? "bg-white/5 border-bronze/30 shadow-2xl" : "bg-black/40 border-white/5 hover:border-white/10"
            )}
          >
            <cat.icon className={cn("w-10 h-10 transition-colors", selectedCategory === cat.id ? cat.color : "text-neutral-700 group-hover:text-neutral-400")} />
            <span className={cn("text-xs font-black uppercase tracking-widest", selectedCategory === cat.id ? "text-white" : "text-neutral-600")}>
              {cat.name}
            </span>
          </button>
        ))}
      </div>

      {/* 100-Day Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-10 gap-4 mb-20">
        {earnings.map((day, i) => (
          <div key={i} className="group relative">
            <div className={cn(
              "aspect-square rounded-[24px] border flex flex-col items-center justify-center transition-all p-2",
              day.amount > 0 ? "bg-emerald-500/10 border-emerald-500/30" : "bg-white/2 border-white/5"
            )}>
              <span className="text-[8px] font-black text-neutral-700 mb-1">DAY {i + 1}</span>
              <input 
                type="number"
                value={day.amount || ""}
                onChange={(e) => updateDay(i, "amount", e.target.value)}
                placeholder="$0"
                className="w-full bg-transparent text-center text-sm font-black text-white focus:outline-none placeholder:text-neutral-800 font-mono tracking-tighter"
              />
            </div>
            
            {/* Expanded Controls on Hover/Focus */}
            <div className="absolute top-full left-0 z-50 w-56 p-6 glass rounded-[32px] border-white/10 opacity-0 group-focus-within:opacity-100 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all mt-4 translate-y-2 group-hover:translate-y-0">
               <div className="space-y-4">
                  <div>
                    <label className="text-[8px] font-black text-neutral-600 uppercase tracking-widest mb-1 block">Daily Investment</label>
                    <div className="relative">
                      <DollarSign className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 text-red-500" />
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
                    <label className="text-[8px] font-black text-neutral-600 uppercase tracking-widest mb-1 block">Notes / Hustle</label>
                    <textarea 
                      value={day.note || ""}
                      onChange={(e) => updateDay(i, "note", e.target.value)}
                      className="w-full bg-transparent border border-white/10 rounded-xl p-3 text-[10px] text-neutral-400 focus:outline-none focus:border-bronze h-20 resize-none transition-colors"
                      placeholder="What did you build today?"
                    />
                  </div>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
