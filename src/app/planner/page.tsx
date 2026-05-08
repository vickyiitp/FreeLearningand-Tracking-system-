"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { auth, db } from "@/lib/firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { Plus, Trash2, CheckCircle2, Circle, Layout, ListTodo, History } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PlannerPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [newTask, setNewTask] = useState("");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      if (u) {
        setUser(u);
        const docRef = doc(db, "planner", u.uid);
        onSnapshot(docRef, (doc) => {
          if (doc.exists()) {
            setTasks(doc.data().tasks || []);
          }
        });
      }
    });
    return () => unsubscribe();
  }, []);

  const saveTasks = async (newTasks: any[]) => {
    if (!user) return;
    await setDoc(doc(db, "planner", user.uid), { tasks: newTasks }, { merge: true });
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    const updated = [...tasks, { id: Date.now(), text: newTask, done: false }];
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

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="mb-16">
        <h1 className="text-4xl font-black text-white mb-4 tracking-tighter">THE PROFESSIONAL <span className="text-bronze">PLANNER</span></h1>
        <p className="text-neutral-500 max-w-xl font-medium">A unified command center for your daily engineering operations. Precise. Persistent. Powerful.</p>
      </div>

      <div className="glass p-10 rounded-[40px] border-white/5 bg-white/2 backdrop-blur-3xl">
        <form onSubmit={addTask} className="flex gap-4 mb-10">
          <input
            type="text"
            placeholder="Initialize new objective..."
            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:border-bronze transition-all outline-none"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button className="w-14 h-14 rounded-2xl bronze-gradient flex items-center justify-center text-white shadow-lg hover:scale-105 transition-transform">
            <Plus className="w-6 h-6" />
          </button>
        </form>

        <div className="space-y-4">
          {tasks.length === 0 && (
            <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-[32px]">
              <ListTodo className="w-12 h-12 text-neutral-800 mx-auto mb-4" />
              <p className="text-neutral-700 text-xs font-black uppercase tracking-[0.2em]">Deployment Queue Empty</p>
            </div>
          )}
          {tasks.map((task) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              key={task.id}
              className="flex items-center gap-4 p-5 bg-black/40 rounded-3xl border border-white/5 group hover:border-white/10 transition-all"
            >
              <button onClick={() => toggleTask(task.id)} className="shrink-0">
                {task.done ? (
                  <CheckCircle2 className="w-6 h-6 text-bronze" />
                ) : (
                  <Circle className="w-6 h-6 text-neutral-800 group-hover:text-neutral-600 transition-colors" />
                )}
              </button>
              <span className={cn(
                "flex-1 text-sm font-bold transition-all",
                task.done ? "text-neutral-600 line-through" : "text-neutral-300"
              )}>
                {task.text}
              </span>
              <button 
                onClick={() => deleteTask(task.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        {tasks.length > 0 && (
          <div className="mt-10 pt-8 border-t border-white/5 flex justify-between items-center">
            <div className="flex gap-4">
               <span className="text-[10px] font-black text-neutral-600 uppercase tracking-widest flex items-center gap-2">
                 <History className="w-3 h-3" /> {tasks.filter(t => t.done).length} COMPLETED
               </span>
               <span className="text-[10px] font-black text-neutral-600 uppercase tracking-widest flex items-center gap-2">
                 <Layout className="w-3 h-3" /> {tasks.filter(t => !t.done).length} PENDING
               </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
