"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { auth, db } from "@/lib/firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Circle, 
  Layout, 
  ListTodo, 
  History, 
  Layers, 
  Server, 
  Cpu, 
  Shield,
  Info,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: "Architecture", label: "Architecture", icon: Layers, color: "text-bronze", bgColor: "bg-bronze/10", borderColor: "border-bronze/20" },
  { id: "Deployment", label: "Deployment", icon: Server, color: "text-blue-400", bgColor: "bg-blue-400/10", borderColor: "border-blue-400/20" },
  { id: "Refactoring", label: "Refactoring", icon: Cpu, color: "text-purple-400", bgColor: "bg-purple-400/10", borderColor: "border-purple-400/20" },
  { id: "Security", label: "System Security", icon: Shield, color: "text-emerald-400", bgColor: "bg-emerald-400/10", borderColor: "border-emerald-400/20" },
];

const defaultTasks = [
  { id: 1, text: "Configure environment variables for Firebase production environment", category: "Deployment", done: false },
  { id: 2, text: "Establish collection indexes for Firestore users & leaderboard paths", category: "Architecture", done: true },
  { id: 3, text: "Implement SSL and secure HTTP headers in next.config.ts config", category: "Security", done: false },
  { id: 4, text: "Refactor legacy SVG files and replace them with lucide icons", category: "Refactoring", done: false },
];

export default function PlannerPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [newTask, setNewTask] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Architecture");
  const [activeFilter, setActiveFilter] = useState("All");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = () => {};

    const unsub = auth.onAuthStateChanged((u) => {
      if (u) {
        setUser(u);
        const docRef = doc(db, "planner", u.uid);
        unsubscribe = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            setTasks(docSnap.data().tasks || []);
          } else {
            setTasks(defaultTasks);
            setDoc(docRef, { tasks: defaultTasks }, { merge: true });
          }
          setLoading(false);
        });
      } else {
        setUser(null);
        if (typeof window !== "undefined") {
          const local = localStorage.getItem("guest_tasks");
          if (local) {
            setTasks(JSON.parse(local));
          } else {
            setTasks(defaultTasks);
          }
        }
        setLoading(false);
      }
    });

    return () => {
      unsub();
      unsubscribe();
    };
  }, []);

  const saveTasks = async (newTasks: any[]) => {
    if (user) {
      await setDoc(doc(db, "planner", user.uid), { tasks: newTasks }, { merge: true });
    } else {
      localStorage.setItem("guest_tasks", JSON.stringify(newTasks));
    }
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    const updated = [
      ...tasks, 
      { 
        id: Date.now(), 
        text: newTask.trim(), 
        category: selectedCategory, 
        done: false 
      }
    ];
    setTasks(updated);
    saveTasks(updated);
    setNewTask("");
  };

  const toggleTask = (id: number) => {
    const updated = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
    setTasks(updated);
    saveTasks(updated);
  };

  const deleteTask = (id: number) => {
    const updated = tasks.filter(t => t.id !== id);
    setTasks(updated);
    saveTasks(updated);
  };

  const filteredTasks = tasks.filter(t => {
    if (activeFilter === "All") return true;
    return (t.category || "Architecture") === activeFilter;
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.done).length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const getCategoryCount = (categoryName: string) => {
    const catTasks = tasks.filter(t => (t.category || "Architecture") === categoryName);
    const catCompleted = catTasks.filter(t => t.done).length;
    return {
      total: catTasks.length,
      completed: catCompleted,
      percent: catTasks.length > 0 ? Math.round((catCompleted / catTasks.length) * 100) : 0
    };
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
        <div>
          <h1 className="text-4xl font-black text-white mb-4 tracking-tighter uppercase">
            THE PROFESSIONAL <span className="text-bronze">PLANNER</span>
          </h1>
          <p className="text-neutral-500 max-w-xl font-medium">
            A unified command center for tracking software architecture pipelines, deployment scripts, and daily milestones.
          </p>
        </div>
        
        {!user && (
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/5 border border-white/5 text-xs text-neutral-400">
            <Info className="w-4 h-4 text-bronze" />
            <span>Running in <strong className="text-neutral-300">Guest Sandbox</strong> mode (saved locally).</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-1 glass p-8 rounded-[40px] border-white/5 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-bronze/5 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <h3 className="text-neutral-500 text-[10px] font-black uppercase tracking-widest mb-6">Execution Index</h3>
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="48" cy="48" r="40" stroke="rgba(255,255,255,0.03)" strokeWidth="6" fill="transparent" />
                  <circle 
                    cx="48" 
                    cy="48" 
                    r="40" 
                    stroke="currentColor" 
                    strokeWidth="6" 
                    fill="transparent" 
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 - (251.2 * completionPercentage) / 100}
                    strokeLinecap="round"
                    className="text-bronze transition-all duration-1000 ease-out"
                  />
                </svg>
                <span className="absolute text-xl font-black text-white font-mono">{completionPercentage}%</span>
              </div>
              <div>
                <div className="text-2xl font-black text-white">{completedTasks} / {totalTasks}</div>
                <div className="text-xs text-neutral-500 font-bold uppercase mt-1">Objectives Resolved</div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-6 mt-8 flex justify-between text-[10px] font-black uppercase tracking-widest text-neutral-600">
            <span>Core Pipeline Status</span>
            <span className={cn(completionPercentage === 100 ? "text-emerald-400" : "text-bronze")}>
              {completionPercentage === 100 ? "Full Operational Ready" : "Deployment Active"}
            </span>
          </div>
        </div>

        <div className="lg:col-span-2 glass p-8 rounded-[40px] border-white/5 grid grid-cols-2 gap-4">
          {CATEGORIES.map((cat) => {
            const stats = getCategoryCount(cat.id);
            const Icon = cat.icon;
            return (
              <div key={cat.id} className="p-4 rounded-3xl bg-white/2 border border-white/5 flex flex-col justify-between hover:border-white/10 transition-all">
                <div className="flex justify-between items-start mb-2">
                  <div className={cn("p-2.5 rounded-2xl", cat.bgColor, cat.borderColor, "border")}>
                    <Icon className={cn("w-4 h-4", cat.color)} />
                  </div>
                  <span className="font-mono text-xs text-neutral-500 font-bold">{stats.completed}/{stats.total}</span>
                </div>
                <div>
                  <h4 className="text-sm font-black text-white mb-2">{cat.label}</h4>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className={cn("h-full transition-all duration-1000", 
                        cat.id === "Architecture" ? "bg-bronze" : 
                        cat.id === "Deployment" ? "bg-blue-500" : 
                        cat.id === "Refactoring" ? "bg-purple-500" : "bg-emerald-500"
                      )}
                      style={{ width: `${stats.percent}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="glass p-10 rounded-[40px] border-white/5">
        <form onSubmit={addTask} className="mb-10">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Initialize new system objective..."
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:border-bronze transition-all outline-none text-white font-medium"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              required
            />
            <div className="flex items-center gap-2 bg-white/2 border border-white/5 rounded-2xl p-2 shrink-0 overflow-x-auto scrollbar-none">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer whitespace-nowrap",
                      isSelected 
                        ? cn(cat.bgColor, cat.color, cat.borderColor, "border") 
                        : "text-neutral-500 hover:text-neutral-300 bg-transparent border border-transparent"
                    )}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{cat.id}</span>
                  </button>
                );
              })}
            </div>

            <button 
              type="submit"
              className="px-8 h-14 rounded-2xl bronze-gradient flex items-center justify-center gap-2 text-white font-black text-xs tracking-widest shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-4 h-4" /> ADD OBJECTIVE
            </button>
          </div>
        </form>

        <div className="flex items-center justify-between border-b border-white/5 pb-6 mb-8 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveFilter("All")}
              className={cn(
                "px-5 py-2 rounded-xl text-xs font-black tracking-wider uppercase transition-all cursor-pointer",
                activeFilter === "All" 
                  ? "bg-white/10 text-white" 
                  : "text-neutral-500 hover:text-neutral-300"
              )}
            >
              All Operations ({totalTasks})
            </button>
            {CATEGORIES.map((cat) => {
              const count = tasks.filter(t => (t.category || "Architecture") === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={cn(
                    "px-5 py-2 rounded-xl text-xs font-black tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer",
                    activeFilter === cat.id 
                      ? "bg-white/10 text-white" 
                      : "text-neutral-500 hover:text-neutral-300"
                  )}
                >
                  <span className={cn("w-1.5 h-1.5 rounded-full", 
                    cat.id === "Architecture" ? "bg-bronze" : 
                    cat.id === "Deployment" ? "bg-blue-500" : 
                    cat.id === "Refactoring" ? "bg-purple-500" : "bg-emerald-500"
                  )}></span>
                  {cat.id} ({count})
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-20">
              <Loader2 className="w-8 h-8 text-bronze animate-spin mx-auto mb-4" />
              <p className="text-neutral-500 text-xs font-black uppercase tracking-widest">Loading Operations...</p>
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-[32px]">
              <ListTodo className="w-12 h-12 text-neutral-800 mx-auto mb-4" />
              <p className="text-neutral-600 text-xs font-black uppercase tracking-[0.2em]">Queue Empty in {activeFilter}</p>
            </div>
          ) : (
            <div className="grid gap-3">
              <AnimatePresence mode="popLayout">
                {filteredTasks.map((task) => {
                  const catMeta = CATEGORIES.find(c => c.id === (task.category || "Architecture")) || CATEGORIES[0];
                  const CatIcon = catMeta.icon;
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      key={task.id}
                      className={cn(
                        "flex items-center gap-4 p-5 bg-black/40 rounded-3xl border border-white/5 group hover:border-white/10 transition-all",
                        task.done && "bg-black/20 opacity-80"
                      )}
                    >
                      <button 
                        onClick={() => toggleTask(task.id)} 
                        className="shrink-0 focus:outline-none cursor-pointer"
                        aria-label="Toggle task completion status"
                      >
                        {task.done ? (
                          <CheckCircle2 className="w-6 h-6 text-bronze transition-transform hover:scale-105" />
                        ) : (
                          <Circle className="w-6 h-6 text-neutral-700 group-hover:text-neutral-500 transition-colors" />
                        )}
                      </button>
                      
                      <div className="flex-1 min-w-0">
                        <span className={cn(
                          "block text-sm font-bold transition-all break-words",
                          task.done ? "text-neutral-600 line-through font-medium" : "text-neutral-200"
                        )}>
                          {task.text}
                        </span>
                        <div className="flex items-center gap-1.5 mt-2">
                          <CatIcon className={cn("w-3 h-3", catMeta.color)} />
                          <span className={cn("text-[9px] font-black uppercase tracking-wider", catMeta.color)}>
                            {task.category || "Architecture"}
                          </span>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => deleteTask(task.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:text-red-500 cursor-pointer"
                        aria-label="Delete objective"
                      >
                        <Trash2 className="w-4 h-4 text-neutral-500 hover:text-red-400 transition-colors" />
                      </button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>

        {tasks.length > 0 && (
          <div className="mt-10 pt-8 border-t border-white/5 flex justify-between items-center">
            <div className="flex gap-6">
               <span className="text-[10px] font-black text-neutral-600 uppercase tracking-widest flex items-center gap-2">
                 <History className="w-3.5 h-3.5 text-neutral-600" /> {completedTasks} RESOLVED
               </span>
               <span className="text-[10px] font-black text-neutral-600 uppercase tracking-widest flex items-center gap-2">
                 <Layout className="w-3.5 h-3.5 text-neutral-600" /> {totalTasks - completedTasks} QUEUED
               </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
