"use client";
import { useState, useEffect } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { Users, BarChart, Database, ShieldAlert, CheckCircle2, TrendingUp, DollarSign, Target, Calendar, Download } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users");
  const [usersData, setUsersData] = useState<any[]>([]);
  const [earningsData, setEarningsData] = useState<any[]>([]);
  const [challengeData, setChallengeData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Users
        const userSnap = await getDocs(collection(db, "users"));
        setUsersData(userSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        // Fetch Earnings
        const earnSnap = await getDocs(collection(db, "earnings"));
        setEarningsData(earnSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        // Fetch Challenges
        const chalSnap = await getDocs(collection(db, "challenges"));
        setChallengeData(chalSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalRevenue = earningsData.reduce((acc, curr) => {
    const days = curr.days || [];
    return acc + days.reduce((dAcc: number, d: any) => dAcc + (Number(d.amount) || 0), 0);
  }, 0);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16">
        <div>
          <h1 className="text-4xl font-black text-white mb-4 tracking-tighter uppercase">Architect <span className="text-bronze">Command Center</span></h1>
          <p className="text-neutral-500 max-w-xl font-medium">Surveillance protocols active. Monitoring sector progression and revenue flow.</p>
        </div>
        <button className="flex items-center gap-3 px-6 py-3 bg-bronze/10 border border-bronze/30 rounded-2xl text-bronze text-xs font-black uppercase tracking-widest hover:bg-bronze/20 transition">
          <Download className="w-4 h-4" /> Export Data Sheets
        </button>
      </div>

      {/* Metric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="glass p-8 rounded-[40px] border-white/5 bg-white/2">
           <Users className="w-6 h-6 text-bronze mb-4" />
           <p className="text-[10px] font-black text-neutral-600 uppercase tracking-widest mb-1">Total Architects</p>
           <p className="text-3xl font-black text-white">{usersData.length}</p>
        </div>
        <div className="glass p-8 rounded-[40px] border-white/5 bg-white/2">
           <DollarSign className="w-6 h-6 text-emerald-500 mb-4" />
           <p className="text-[10px] font-black text-neutral-600 uppercase tracking-widest mb-1">Total Sector Revenue</p>
           <p className="text-3xl font-black text-emerald-400 font-mono">${totalRevenue.toLocaleString()}</p>
        </div>
        <div className="glass p-8 rounded-[40px] border-white/5 bg-white/2">
           <Target className="w-6 h-6 text-pink-500 mb-4" />
           <p className="text-[10px] font-black text-neutral-600 uppercase tracking-widest mb-1">Quest Completion</p>
           <p className="text-3xl font-black text-white">{challengeData.length}</p>
        </div>
        <div className="glass p-8 rounded-[40px] border-white/5 bg-white/2">
           <CheckCircle2 className="w-6 h-6 text-blue-500 mb-4" />
           <p className="text-[10px] font-black text-neutral-600 uppercase tracking-widest mb-1">Modules Passed</p>
           <p className="text-3xl font-black text-white">
             {usersData.reduce((acc, u) => acc + (u.completedModules?.length || 0), 0)}
           </p>
        </div>
      </div>

      {/* Data Sheet Tabs */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
        {[
          { id: "users", name: "Architect Sheet", icon: Users },
          { id: "earnings", name: "Revenue Sheet", icon: DollarSign },
          { id: "challenges", name: "Quest Sheet", icon: Target },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all text-xs font-black uppercase tracking-widest whitespace-nowrap",
              activeTab === tab.id ? "bg-bronze text-white border-bronze shadow-[0_0_20px_rgba(205,127,50,0.3)]" : "bg-white/2 border-white/5 text-neutral-600 hover:border-white/10"
            )}
          >
            <tab.icon className="w-4 h-4" /> {tab.name}
          </button>
        ))}
      </div>

      <div className="glass rounded-[50px] border-white/5 bg-white/2 overflow-hidden">
        <div className="overflow-x-auto">
          {activeTab === "users" && (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 text-neutral-500">
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest">Architect / UID</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest">Roadmap Status</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest">Score</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest">Rank</th>
                </tr>
              </thead>
              <tbody>
                {usersData.map((user) => (
                  <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-6">
                      <div className="font-mono text-xs text-white">{user.id}</div>
                      <div className="text-[10px] text-neutral-600 mt-1">{user.email || "Unknown"}</div>
                    </td>
                    <td className="p-6">
                       <div className="flex gap-1 flex-wrap">
                          {(user.completedModules || []).map((m: string) => (
                            <span key={m} className="px-2 py-0.5 rounded bg-bronze/10 text-bronze text-[8px] font-black border border-bronze/20">{m}</span>
                          ))}
                       </div>
                    </td>
                    <td className="p-6"><span className="text-xl font-black text-white">{(user.completedModules?.length || 0) * 10}</span></td>
                    <td className="p-6">
                       <span className={cn(
                         "px-3 py-1 rounded-full text-[10px] font-black tracking-widest",
                         user.completedModules?.length > 5 ? "bg-emerald-500/10 text-emerald-500" : "bg-neutral-800 text-neutral-500"
                       )}>
                         {user.completedModules?.length > 5 ? "ELITE" : "INITIATE"}
                       </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === "earnings" && (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 text-neutral-500">
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest">User ID</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest">Total Earned</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest">Investment</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest">Days Tracked</th>
                </tr>
              </thead>
              <tbody>
                {earningsData.map((earn) => {
                  const total = (earn.days || []).reduce((acc: number, d: any) => acc + (Number(d.amount) || 0), 0);
                  const invest = (earn.days || []).reduce((acc: number, d: any) => acc + (Number(d.investment) || 0), 0);
                  const activeDays = (earn.days || []).filter((d: any) => d.amount > 0).length;
                  return (
                    <tr key={earn.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-6 font-mono text-xs text-white">{earn.id}</td>
                      <td className="p-6 text-xl font-black text-emerald-400 font-mono">${total}</td>
                      <td className="p-6 text-lg font-black text-red-400 font-mono">${invest}</td>
                      <td className="p-6 text-white font-bold">{activeDays} / 100</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {activeTab === "challenges" && (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 text-neutral-500">
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest">User ID</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest">DSA Progress</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest">Security Progress</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest">Mobile Progress</th>
                </tr>
              </thead>
              <tbody>
                {challengeData.map((chal) => (
                  <tr key={chal.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-6 font-mono text-xs text-white">{chal.id}</td>
                    <td className="p-6 text-white font-bold">{chal.levels?.dsa || 0} / 100</td>
                    <td className="p-6 text-white font-bold">{chal.levels?.sec || 0} / 100</td>
                    <td className="p-6 text-white font-bold">{chal.levels?.mobile || 0} / 100</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
