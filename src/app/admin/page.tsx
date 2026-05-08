"use client";
import { useState, useEffect } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { Users, BarChart, Database, ShieldAlert, CheckCircle2, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  const [usersData, setUsersData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would check if the current user is an admin here
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUsersData(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="mb-16">
        <h1 className="text-4xl font-black text-white mb-4 tracking-tighter">ARCHITECT <span className="text-bronze">COMMAND CENTER</span></h1>
        <p className="text-neutral-500 max-w-xl font-medium">Real-time surveillance of the MVA ecosystem. Monitor user progression, earnings, and engagement metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="glass p-8 rounded-[40px] border-white/5 bg-white/2">
           <div className="flex items-center gap-4 mb-4">
              <Users className="w-6 h-6 text-bronze" />
              <span className="text-[10px] font-black text-neutral-600 uppercase tracking-widest">Total Architects</span>
           </div>
           <p className="text-4xl font-black text-white">{usersData.length}</p>
        </div>
        <div className="glass p-8 rounded-[40px] border-white/5 bg-white/2">
           <div className="flex items-center gap-4 mb-4">
              <CheckCircle2 className="w-6 h-6 text-emerald-500" />
              <span className="text-[10px] font-black text-neutral-600 uppercase tracking-widest">Modules Completed</span>
           </div>
           <p className="text-4xl font-black text-white">
             {usersData.reduce((acc, u) => acc + (u.completedModules?.length || 0), 0)}
           </p>
        </div>
        <div className="glass p-8 rounded-[40px] border-white/5 bg-white/2">
           <div className="flex items-center gap-4 mb-4">
              <TrendingUp className="w-6 h-6 text-blue-500" />
              <span className="text-[10px] font-black text-neutral-600 uppercase tracking-widest">Active Quests</span>
           </div>
           <p className="text-4xl font-black text-white">
             {usersData.filter(u => u.completedModules?.length > 0).length}
           </p>
        </div>
      </div>

      <div className="glass rounded-[50px] border-white/5 bg-white/2 overflow-hidden">
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/5">
           <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-3">
             <Database className="w-5 h-5 text-bronze" /> USER DATA SHEETS
           </h2>
           <span className="text-[10px] font-black text-neutral-600 uppercase tracking-widest">Synced with Firestore</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 text-neutral-500">
                <th className="p-6 text-[10px] font-black uppercase tracking-widest">Architect ID / UID</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest">Modules</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest">Points</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user) => (
                <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-6">
                    <div className="font-mono text-xs text-white">{user.id}</div>
                    <div className="text-[10px] text-neutral-600 mt-1">{user.email || "Anonymous Architect"}</div>
                  </td>
                  <td className="p-6">
                    <div className="flex gap-1 flex-wrap">
                      {(user.completedModules || []).map((m: string) => (
                        <span key={m} className="px-2 py-0.5 rounded bg-bronze/10 text-bronze text-[8px] font-black border border-bronze/20">
                          {m}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="text-xl font-black text-white">{(user.completedModules?.length || 0) * 10}</span>
                  </td>
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
              {usersData.length === 0 && !loading && (
                <tr>
                  <td colSpan={4} className="p-20 text-center">
                     <ShieldAlert className="w-12 h-12 text-neutral-800 mx-auto mb-4" />
                     <p className="text-neutral-700 text-xs font-black uppercase tracking-widest">No architects found in sector.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
