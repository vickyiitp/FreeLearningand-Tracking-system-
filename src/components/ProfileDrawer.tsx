"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Briefcase, Mail, LogOut, CheckCircle2, Circle, Settings, Sparkles, BookOpen, Code } from "lucide-react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileDrawer({ isOpen, onClose }: ProfileDrawerProps) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  
  // Profile form states
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [github, setGithub] = useState("");
  const [upiId, setUpiId] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Active planner tasks
  const [tasks, setTasks] = useState<any[]>([]);
  const [completedRoadmapItems, setCompletedRoadmapItems] = useState<string[]>([]);

  // Auth & Profile Listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      if (u) {
        setUser(u);
        
        // Listen to User Profile Data
        const userDocRef = doc(db, "users", u.uid);
        const unsubUser = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setDisplayName(data.displayName || "");
            setRole(data.role || "");
            setBio(data.bio || "");
            setGithub(data.github || "");
            setUpiId(data.upiId || "");
            setCompletedRoadmapItems(data.completedRoadmapItems || []);
          } else {
            // Default display name to email prefix if profile document doesn't exist
            setDisplayName(u.email ? u.email.split("@")[0] : "Architect");
          }
        });

        // Listen to Planner Tasks
        const plannerDocRef = doc(db, "planner", u.uid);
        const unsubPlanner = onSnapshot(plannerDocRef, (docSnap) => {
          if (docSnap.exists()) {
            setTasks(docSnap.data().tasks || []);
          }
        });

        return () => {
          unsubUser();
          unsubPlanner();
        };
      } else {
        setUser(null);
        setTasks([]);
        setCompletedRoadmapItems([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSaving(true);
    try {
      await setDoc(doc(db, "users", user.uid), {
        displayName,
        role,
        bio,
        github,
        upiId,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (e) {
      console.error("Failed to save user profile:", e);
      alert("Error saving profile details.");
    } finally {
      setIsSaving(false);
    }
  };

  const toggleTask = async (id: number) => {
    if (!user) return;
    const updatedTasks = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
    setTasks(updatedTasks);
    await setDoc(doc(db, "planner", user.uid), { tasks: updatedTasks }, { merge: true });
  };

  const handleLogout = async () => {
    await auth.signOut();
    onClose();
    router.push("/");
  };

  // Get active tasks (pending)
  const activeTasks = tasks.filter(t => !t.done);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-screen max-w-md glass border-l border-white/10 flex flex-col h-full overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-black text-bronze uppercase tracking-[0.2em] flex items-center gap-2">
                  <Settings className="w-3.5 h-3.5 animate-spin-slow" /> Architect Profile
                </span>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition"
                >
                  <X className="w-4 h-4 text-neutral-400 hover:text-white" />
                </button>
              </div>

              {/* Scrollable Container */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-none">
                
                {user ? (
                  <>
                    {/* User Card */}
                    <div className="p-6 bg-white/2 rounded-[32px] border border-white/5 text-center relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-bronze/5 rounded-full blur-[40px] -z-10"></div>
                      <div className="w-20 h-20 bg-bronze/10 border-2 border-bronze/20 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform duration-500">
                        <User className="w-10 h-10 text-bronze" />
                      </div>
                      <h4 className="text-xl font-black text-white">{displayName || "Anonymous Architect"}</h4>
                      <p className="text-xs text-neutral-500 font-semibold mt-1 flex items-center justify-center gap-1">
                        {role || "Developer Candidate"}
                      </p>
                      
                      {/* Sub-stats grid */}
                      <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/5">
                        <div className="text-left bg-black/40 p-3 rounded-2xl border border-white/2">
                          <span className="text-[8px] font-black text-neutral-600 uppercase tracking-widest block mb-1">Checkpoints</span>
                          <span className="text-base font-black text-white font-mono flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-bronze" /> {completedRoadmapItems.length}
                          </span>
                        </div>
                        <div className="text-left bg-black/40 p-3 rounded-2xl border border-white/2">
                          <span className="text-[8px] font-black text-neutral-600 uppercase tracking-widest block mb-1">Active Tasks</span>
                          <span className="text-base font-black text-white font-mono flex items-center gap-1">
                            <BookOpen className="w-3.5 h-3.5 text-blue-400" /> {activeTasks.length}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Profile settings form */}
                    <form onSubmit={saveProfile} className="space-y-4">
                      <h5 className="text-[9px] font-black text-neutral-600 uppercase tracking-widest border-b border-white/5 pb-2">Customization Panel</h5>
                      
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-neutral-500 uppercase tracking-wider">Display Name</label>
                        <input
                          type="text"
                          required
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          placeholder="e.g. Vicky Kumar"
                          className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 px-4 text-xs focus:border-bronze transition outline-none text-white placeholder:text-neutral-700"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-neutral-500 uppercase tracking-wider">Architect Role / Specialty</label>
                        <input
                          type="text"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          placeholder="e.g. Full-Stack AI Developer"
                          className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 px-4 text-xs focus:border-bronze transition outline-none text-white placeholder:text-neutral-700"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-neutral-500 uppercase tracking-wider">Short Bio / Status</label>
                        <textarea
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          placeholder="What are you building currently?"
                          className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 px-4 text-xs focus:border-bronze transition outline-none text-white placeholder:text-neutral-700 h-20 resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[9px] font-black text-neutral-500 uppercase tracking-wider flex items-center gap-1"><Code className="w-3 h-3" /> GitHub</label>
                          <input
                            type="text"
                            value={github}
                            onChange={(e) => setGithub(e.target.value)}
                            placeholder="username"
                            className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 px-4 text-xs focus:border-bronze transition outline-none text-white placeholder:text-neutral-700"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-black text-neutral-500 uppercase tracking-wider">Personal UPI ID</label>
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="e.g. 8102099678@ibl"
                            className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 px-4 text-xs focus:border-bronze transition outline-none text-white placeholder:text-neutral-700"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSaving}
                        className={cn(
                          "w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                          saveSuccess 
                            ? "bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                            : "bronze-gradient text-white shadow-[0_0_20px_rgba(205,127,50,0.1)] hover:opacity-90"
                        )}
                      >
                        {isSaving ? "Saving Config..." : saveSuccess ? "Config Synced!" : "Save Profile Configuration"}
                      </button>
                    </form>

                    {/* Active Milestones / Planner List */}
                    <div className="space-y-4">
                      <h5 className="text-[9px] font-black text-neutral-600 uppercase tracking-widest border-b border-white/5 pb-2">Active Planner Milestones</h5>
                      
                      <div className="space-y-2">
                        {activeTasks.length === 0 ? (
                          <div className="text-center py-6 border border-dashed border-white/5 rounded-2xl bg-black/10">
                            <span className="text-[9px] font-black text-neutral-600 uppercase tracking-wider">Deployment Queue Empty</span>
                          </div>
                        ) : (
                          activeTasks.map(task => (
                            <div 
                              key={task.id}
                              className="flex items-center gap-3 p-3 bg-black/40 border border-white/2 rounded-2xl hover:border-white/5 transition-all group"
                            >
                              <button 
                                onClick={() => toggleTask(task.id)}
                                className="shrink-0"
                              >
                                <Circle className="w-4 h-4 text-neutral-700 group-hover:text-neutral-500" />
                              </button>
                              <span className="text-xs text-neutral-300 font-bold truncate flex-1">{task.text}</span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="py-20 text-center flex flex-col items-center">
                    <User className="w-16 h-16 text-neutral-800 mb-4 animate-pulse" />
                    <h4 className="text-base font-black text-white uppercase">Profile Locked</h4>
                    <p className="text-neutral-500 text-xs mt-2 max-w-[200px] mx-auto leading-relaxed">Login to activate your cloud-synced onboarding profile.</p>
                    <button 
                      onClick={() => { onClose(); router.push("/auth"); }}
                      className="mt-6 px-6 py-3 bg-white text-black text-[10px] font-black tracking-widest uppercase rounded-xl hover:bg-neutral-200 transition"
                    >
                      Authenticate Now
                    </button>
                  </div>
                )}

              </div>

              {/* Footer */}
              {user && (
                <div className="p-6 border-t border-white/5 bg-black/20">
                  <button
                    onClick={handleLogout}
                    className="w-full py-4 border border-red-500/10 hover:border-red-500/30 bg-red-500/5 hover:bg-red-500/10 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest transition flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" /> De-Authenticate Session
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
