"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { CheckCircle2, Circle, Globe, Cpu, Code, Smartphone, Server, Shield, Terminal, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const tracks = [
  {
    id: "track-1",
    title: "Full-Stack Web & AI Integrations",
    icon: Globe,
    description: "Start from absolute zero. Learn terminal, HTML/CSS, React, Node.js, and how to hook up OpenAI/Claude APIs.",
    modules: [
      { id: "t1m1", title: "Absolute Foundations (Zero to One)", points: 10 },
      { id: "t1m2", title: "Modern React & Next.js Ecosystem", points: 20 },
      { id: "t1m3", title: "Full Stack Backend & AI Integration", points: 30 },
    ]
  },
  {
    id: "track-2",
    title: "Adv. AI, ML & Data Analytics",
    icon: Cpu,
    description: "Go beyond API calls. Train Neural Networks from scratch and master Data Analytics with Python.",
    modules: [
      { id: "t2m1", title: "Data Science Stack & Math", points: 20 },
      { id: "t2m2", title: "Deep Learning & NLP", points: 40 },
    ]
  },
  {
    id: "track-3",
    title: "DSA Mastery (IIT/Stanford Tier)",
    icon: Code,
    description: "The core logic of computer science. C++, Data Structures, DP, and Graph Algorithms.",
    modules: [
      { id: "t3m1", title: "C++ & Memory Architecture", points: 25 },
      { id: "t3m2", title: "Advanced Algorithms (DP/Graphs)", points: 50 },
    ]
  },
  {
    id: "track-4",
    title: "App Development",
    icon: Smartphone,
    description: "Build iOS and Android applications natively using React Native and Expo.",
    modules: [
      { id: "t4m1", title: "Cross-Platform Mobile Foundations", points: 20 },
      { id: "t4m2", title: "Native Features & Performance", points: 30 },
    ]
  },
  {
    id: "track-5",
    title: "Systems & Cloud Infrastructure",
    icon: Server,
    description: "Docker, Kubernetes, Networking, Distributed DBs. The Original Architect Phase.",
    modules: [
      { id: "t5m1", title: "Infrastructure as Code & Docker", points: 30 },
      { id: "t5m2", title: "Kubernetes & Scaling", points: 50 },
    ]
  },
  {
    id: "track-6",
    title: "Cybersecurity in AI Era",
    icon: Shield,
    description: "Offensive and defensive security. Protecting AI models and web servers from modern attacks.",
    modules: [
      { id: "t6m1", title: "Penetration Testing & Web Exploits", points: 30 },
      { id: "t6m2", title: "AI/LLM Security Vulnerabilities", points: 40 },
    ]
  }
];

export default function RoadmapPage() {
  const [completed, setCompleted] = useState<string[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((u) => {
      if (u) {
        setUser(u);
        const docRef = doc(db, "users", u.uid);
        onSnapshot(docRef, (doc) => {
          if (doc.exists()) {
            setCompleted(doc.data().completedModules || []);
          }
        });
      }
    });
    return () => unsubscribeAuth();
  }, []);

  const toggleModule = async (moduleId: string) => {
    if (!user) return alert("Please log in to save progress.");
    const newCompleted = completed.includes(moduleId)
      ? completed.filter(id => id !== moduleId)
      : [...completed, moduleId];
    
    setCompleted(newCompleted);
    await setDoc(doc(db, "users", user.uid), { completedModules: newCompleted }, { merge: true });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-bronze/30 bg-bronze/10 text-bronze text-[10px] font-black uppercase tracking-widest mb-6"
        >
          <Terminal className="w-3 h-3" /> Ground Zero Protocol Active
        </motion.div>
        <h1 className="text-6xl font-black text-white mb-6 tracking-tighter leading-tight">
          THE MASTER <span className="text-bronze italic">SYLLABUS.</span>
        </h1>
        <p className="text-neutral-500 max-w-2xl font-medium text-lg leading-relaxed">
          A persistent, 6-track journey through the foundations of the digital world. 
          Every module completed is synchronized to your architect profile.
        </p>
      </div>

      <div className="grid gap-16">
        {tracks.map((track, idx) => {
          const Icon = track.icon;
          return (
            <motion.div 
              key={track.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-12 rounded-[50px] border-white/5 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-bronze/5 rounded-full blur-[100px] -z-10 group-hover:bg-bronze/10 transition-all"></div>
              
              <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-12">
                <div className="w-20 h-20 rounded-[32px] bronze-gradient flex items-center justify-center text-white shadow-[0_0_30px_rgba(184,115,51,0.2)]">
                  <Icon className="w-10 h-10" />
                </div>
                <div className="flex-1">
                  <h2 className="text-4xl font-black text-white mb-2">{track.title}</h2>
                  <p className="text-neutral-500 font-medium max-w-2xl">{track.description}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 relative z-10">
                {track.modules.map((module) => {
                  const isDone = completed.includes(module.id);
                  return (
                    <motion.div
                      key={module.id}
                      whileHover={{ y: -5 }}
                      onClick={() => toggleModule(module.id)}
                      className={cn(
                        "p-8 rounded-[40px] border cursor-pointer transition-all flex flex-col justify-between h-56",
                        isDone ? "bg-bronze/10 border-bronze/40" : "bg-white/2 border-white/5 hover:border-white/20"
                      )}
                    >
                      <div className="flex justify-between items-start">
                        <span className={cn("text-[10px] font-black uppercase tracking-widest", isDone ? "text-bronze" : "text-neutral-700")}>
                          {module.points} ARCHITECT POINTS
                        </span>
                        {isDone ? (
                          <div className="w-8 h-8 rounded-full bg-bronze/20 flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5 text-bronze" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                            <Circle className="w-5 h-5 text-neutral-800" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className={cn("text-xl font-black transition-colors leading-tight", isDone ? "text-white" : "text-neutral-500")}>
                          {module.title}
                        </h3>
                        <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-neutral-600 group-hover:text-bronze transition-colors uppercase tracking-widest">
                           Deep Dive <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
