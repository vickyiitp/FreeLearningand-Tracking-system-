"use client";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { 
  CheckCircle2, Circle, Globe, Cpu, Code, Smartphone, Server, Shield, 
  Terminal, ArrowRight, BookOpen, Clock, ChevronDown, 
  CheckSquare, Video, Play, ExternalLink, Search, Filter, 
  BookMarked, Sparkles, Copy, Award, Check
} from "lucide-react";
import { cn } from "@/lib/utils";
import { degreeTracks, Track, Day, Module } from "@/lib/roadmapData";

const iconMap: Record<string, any> = {
  globe: Globe,
  cpu: Cpu,
  code: Code,
  smartphone: Smartphone,
  server: Server,
  shield: Shield,
  terminal: Terminal,
};

const categoryLabels: Record<string, string> = {
  all: "All Disciplines",
  tech: "Technology & AI",
  foundations: "Foundations",
  business: "Startup & Sales",
  finance: "Finance",
  career: "Soft Skills & Career"
};

export default function RoadmapPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeTrackId, setActiveTrackId] = useState(degreeTracks[0].id);
  const [activeModuleIdx, setActiveModuleIdx] = useState(0);
  const [activeDayNum, setActiveDayNum] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Tab control for main console
  const [consoleTab, setConsoleTab] = useState<"learn" | "readings" | "lab" | "assignment">("learn");

  // Completion states synced with Firestore
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [user, setUser] = useState<any>(null);
  
  // UI States
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string>("");
  const [copiedCode, setCopiedCode] = useState(false);

  // Authenticate and subscribe to database
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((u) => {
      if (u) {
        setUser(u);
        const docRef = doc(db, "users", u.uid);
        onSnapshot(docRef, (doc) => {
          if (doc.exists()) {
            setCompletedItems(doc.data().completedRoadmapItems || []);
          }
        });
      }
    });
    return () => unsubscribeAuth();
  }, []);

  // Filter tracks by category
  const filteredTracks = useMemo(() => {
    if (activeCategory === "all") return degreeTracks;
    return degreeTracks.filter(t => t.category === activeCategory);
  }, [activeCategory]);

  // Handle active track binding
  const activeTrack = useMemo(() => {
    let track = filteredTracks.find(t => t.id === activeTrackId);
    if (!track && filteredTracks.length > 0) {
      track = filteredTracks[0];
    }
    return track || degreeTracks[0];
  }, [filteredTracks, activeTrackId]);

  // Bound current active day object
  const activeDay = useMemo(() => {
    const module = activeTrack.modules[activeModuleIdx] || activeTrack.modules[0];
    if (!module) return null;
    const day = module.days.find(d => d.dayNum === activeDayNum);
    return day || module.days[0] || null;
  }, [activeTrack, activeModuleIdx, activeDayNum]);

  // Set default video when day updates
  useEffect(() => {
    if (activeDay && activeDay.videos.length > 0) {
      setSelectedVideoUrl(activeDay.videos[0].url);
    } else {
      setSelectedVideoUrl("");
    }
  }, [activeDay]);

  // Parse Youtube video IDs for native embedding
  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Sync completion markers to Firestore database dynamically
  const toggleItem = async (itemId: string) => {
    if (!user) {
      alert("Please log in or sign up to track your learning journey progress!");
      return;
    }
    const newCompleted = completedItems.includes(itemId)
      ? completedItems.filter(id => id !== itemId)
      : [...completedItems, itemId];
    
    setCompletedItems(newCompleted);
    try {
      await setDoc(doc(db, "users", user.uid), { 
        completedRoadmapItems: newCompleted 
      }, { merge: true });
    } catch (e) {
      console.error("Firestore sync error:", e);
    }
  };

  // Search filter implementation across all syllabus tracks
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const queryStr = searchQuery.toLowerCase();
    const matches: Array<{ track: Track; module: Module; day: Day; moduleIdx: number }> = [];

    degreeTracks.forEach(track => {
      track.modules.forEach((module, moduleIdx) => {
        module.days.forEach(day => {
          if (
            day.title.toLowerCase().includes(queryStr) ||
            (day.intro && day.intro.toLowerCase().includes(queryStr)) ||
            (day.practice && day.practice.task.toLowerCase().includes(queryStr)) ||
            (day.assignment && day.assignment.title.toLowerCase().includes(queryStr))
          ) {
            matches.push({ track, module, day, moduleIdx });
          }
        });
      });
    });
    return matches;
  }, [searchQuery]);

  // Calculate learning progress percentages
  const progressStats = useMemo(() => {
    let totalItems = 0;
    let completedCount = 0;

    degreeTracks.forEach(track => {
      track.modules.forEach((module, mIdx) => {
        module.days.forEach(day => {
          const baseId = `${track.id}_m${mIdx}_d${day.dayNum}`;
          
          // Video items
          day.videos.forEach((_, vIdx) => {
            totalItems++;
            if (completedItems.includes(`${baseId}_video_${vIdx}`)) completedCount++;
          });

          // Document items
          day.docs.forEach((_, dIdx) => {
            totalItems++;
            if (completedItems.includes(`${baseId}_doc_${dIdx}`)) completedCount++;
          });

          // Lab / Sandbox
          totalItems++;
          if (completedItems.includes(`${baseId}_practice`)) completedCount++;

          // Assignment
          if (day.assignment) {
            totalItems++;
            if (completedItems.includes(`${baseId}_assignment`)) completedCount++;
          }

          // Project
          if (day.project) {
            totalItems++;
            if (completedItems.includes(`${baseId}_project`)) completedCount++;
          }
        });
      });
    });

    const percent = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;
    return { totalItems, completedCount, percent };
  }, [completedItems]);

  const copyCodeToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Dynamic Header & Stats Banner */}
      <header className="pt-24 pb-8 px-6 relative overflow-hidden border-b border-white/5">
        <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-bronze/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full border border-bronze/30 bg-bronze/10 text-bronze text-[9px] font-black uppercase tracking-widest"
            >
              <Award className="w-3 h-3 text-bronze" /> Stanford & Ivy online Syllabus Hub
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-[0.9]">
              THE MASTER <span className="text-bronze italic">CONSOLE.</span>
            </h1>
          </div>
          
          {/* Progress Tracker Card */}
          <div className="glass p-6 rounded-[32px] border-white/5 flex items-center gap-6 w-full md:w-auto md:min-w-[320px]">
            <div className="relative w-16 h-16 shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-white/5"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <motion.path
                  className="text-bronze"
                  strokeWidth="3.5"
                  strokeDasharray={`${progressStats.percent}, 100`}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-mono text-sm font-black text-white">
                {progressStats.percent}%
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-1">Architecture Progress</p>
              <p className="text-sm font-bold text-white leading-tight">
                {progressStats.completedCount} / {progressStats.totalItems} Steps Completed
              </p>
              <p className="text-[10px] text-bronze font-black uppercase tracking-wider mt-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Level: {progressStats.percent >= 90 ? "Master Architect" : progressStats.percent >= 50 ? "System Designer" : progressStats.percent >= 15 ? "Elite Builder" : "Initiate Dev"}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Categories & Search Hub */}
      <section className="bg-background/80 backdrop-blur-xl border-b border-white/5 sticky top-20 z-40 py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Search bar */}
          <div className="relative w-full md:w-80 shrink-0">
            <Search className="w-4 h-4 text-neutral-600 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search syllabus, tasks, code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 pl-11 pr-4 text-xs focus:border-bronze focus:bg-white/8 transition-all outline-none text-white placeholder:text-neutral-600"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-neutral-500 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {Object.entries(categoryLabels).map(([catKey, label]) => (
              <button
                key={catKey}
                onClick={() => {
                  setActiveCategory(catKey);
                  setActiveTrackId(""); // reset track selection
                  setSearchQuery(""); // clear search
                }}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all border",
                  activeCategory === catKey 
                    ? "bg-bronze border-bronze text-white shadow-lg" 
                    : "bg-white/2 border-white/5 text-neutral-500 hover:border-white/10 hover:text-white"
                )}
              >
                {label}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Global Command Center Layout */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Search Results Display Overlay */}
        {searchQuery && (
          <div className="mb-10 bg-white/2 border border-white/5 rounded-[32px] p-6">
            <h3 className="text-lg font-black text-white mb-4 flex items-center gap-2">
              <Search className="w-5 h-5 text-bronze" /> Search Intelligence Results ({searchResults?.length || 0})
            </h3>
            {searchResults && searchResults.length > 0 ? (
              <div className="grid gap-4 max-h-80 overflow-y-auto pr-2">
                {searchResults.map((res, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveTrackId(res.track.id);
                      setActiveModuleIdx(res.moduleIdx);
                      setActiveDayNum(res.day.dayNum);
                      setSearchQuery("");
                    }}
                    className="flex justify-between items-center p-4 bg-black/40 border border-white/5 hover:border-bronze/30 rounded-2xl text-left transition-all"
                  >
                    <div>
                      <span className="text-[9px] font-black text-bronze uppercase tracking-widest">{res.track.title} • Module {res.moduleIdx + 1}</span>
                      <h4 className="text-white font-bold text-sm mt-1">Day {res.day.dayNum}: {res.day.title}</h4>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-700" />
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-neutral-500 py-6 text-center">No modules matching your query were found.</p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Panel: Modular Selector Tree */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Track Selector Card */}
            <div className="glass p-5 rounded-[32px] border-white/5">
              <span className="text-[9px] font-black text-neutral-600 uppercase tracking-widest mb-3 block">Selected Track</span>
              <div className="space-y-2">
                {filteredTracks.map(track => {
                  const Icon = iconMap[track.icon] || Globe;
                  const isTrackActive = activeTrack.id === track.id;
                  return (
                    <button
                      key={track.id}
                      onClick={() => {
                        setActiveTrackId(track.id);
                        setActiveModuleIdx(0);
                        setActiveDayNum(1);
                      }}
                      className={cn(
                        "w-full flex items-start gap-4 p-4 rounded-2xl text-left transition-all border",
                        isTrackActive 
                          ? "bg-bronze/10 border-bronze/30 text-white" 
                          : "bg-black/20 border-white/2 hover:border-white/10 text-neutral-500 hover:text-neutral-300"
                      )}
                    >
                      <div className={cn(
                        "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                        isTrackActive ? "bg-bronze text-white" : "bg-white/5 text-neutral-600"
                      )}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <h4 className={cn("text-xs font-black uppercase tracking-wider truncate", isTrackActive ? "text-white" : "text-neutral-400")}>
                          {track.title}
                        </h4>
                        <p className="text-[10px] text-neutral-600 mt-1 line-clamp-1">{track.description}</p>
                      </div>
                    </button>
                  );
                })}
                {filteredTracks.length === 0 && (
                  <p className="text-xs text-neutral-600 py-6 text-center">No tracks available in this category.</p>
                )}
              </div>
            </div>

            {/* Modules and Days Selector Tree */}
            <div className="glass p-5 rounded-[32px] border-white/5 max-h-[600px] overflow-y-auto">
              <span className="text-[9px] font-black text-neutral-600 uppercase tracking-widest mb-3 block">Course Syllabus Architecture</span>
              
              <div className="space-y-4">
                {activeTrack.modules.map((module, mIdx) => (
                  <div key={mIdx} className="space-y-2">
                    <h5 className="text-[9px] font-black text-bronze uppercase tracking-[0.15em] border-b border-white/5 pb-2">
                      Mod {mIdx + 1}: {module.title.split(':')[1] || module.title}
                    </h5>
                    
                    <div className="space-y-1 pl-1">
                      {module.days.map((day) => {
                        const isDaySelected = activeModuleIdx === mIdx && activeDayNum === day.dayNum;
                        
                        // Calculate completion score for this day
                        const dayBaseId = `${activeTrack.id}_m${mIdx}_d${day.dayNum}`;
                        const dayVideos = day.videos.map((_, idx) => `${dayBaseId}_video_${idx}`);
                        const dayDocs = day.docs.map((_, idx) => `${dayBaseId}_doc_${idx}`);
                        
                        const itemsToCheck = [
                          ...dayVideos,
                          ...dayDocs,
                          `${dayBaseId}_practice`,
                          ...(day.assignment ? [`${dayBaseId}_assignment`] : []),
                          ...(day.project ? [`${dayBaseId}_project`] : [])
                        ];
                        
                        const completedInDay = itemsToCheck.filter(id => completedItems.includes(id)).length;
                        const isDayFullyDone = itemsToCheck.length > 0 && completedInDay === itemsToCheck.length;

                        return (
                          <button
                            key={day.dayNum}
                            onClick={() => {
                              setActiveModuleIdx(mIdx);
                              setActiveDayNum(day.dayNum);
                            }}
                            className={cn(
                              "w-full flex items-center justify-between p-3 rounded-xl transition-all text-xs font-bold text-left",
                              isDaySelected 
                                ? "bg-white/5 text-white" 
                                : "text-neutral-500 hover:text-neutral-300"
                            )}
                          >
                            <span className="flex items-center gap-2 truncate">
                              {isDayFullyDone ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                              ) : completedInDay > 0 ? (
                                <div className="w-4 h-4 rounded-full border-2 border-bronze/40 flex items-center justify-center shrink-0">
                                  <div className="w-1.5 h-1.5 rounded-full bg-bronze"></div>
                                </div>
                              ) : (
                                <Circle className="w-4 h-4 text-neutral-800 shrink-0" />
                              )}
                              <span className="truncate">Day {day.dayNum}: {day.title}</span>
                            </span>
                            <span className="text-[9px] font-mono text-neutral-600 shrink-0 ml-2">
                              {completedInDay}/{itemsToCheck.length}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Panel: Integrated Syllabus Console */}
          <div className="lg:col-span-8 space-y-6">
            
            {activeDay ? (
              <div className="glass rounded-[40px] border-white/5 overflow-hidden flex flex-col min-h-[600px]">
                
                {/* Day Header */}
                <div className="p-6 md:p-8 bg-white/2 border-b border-white/5">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <span className="text-[10px] font-black text-bronze uppercase tracking-[0.2em] mb-1 block">
                        Module {activeModuleIdx + 1} • Day {activeDay.dayNum}
                      </span>
                      <h2 className="text-2xl font-black text-white tracking-tight">{activeDay.title}</h2>
                    </div>

                    <div className="flex gap-2">
                      <span className="text-[9px] font-black px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-neutral-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-bronze" /> 10-Hour Plan
                      </span>
                    </div>
                  </div>
                </div>

                {/* Day Console Sub-Tabs */}
                <div className="flex bg-black/40 border-b border-white/5 overflow-x-auto">
                  <button
                    onClick={() => setConsoleTab("learn")}
                    className={cn(
                      "px-6 py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all whitespace-nowrap",
                      consoleTab === "learn" ? "text-bronze border-bronze bg-bronze/5" : "text-neutral-500 border-transparent hover:text-white"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <Play className="w-3.5 h-3.5" /> 1. Concept & Video Lectures
                    </span>
                  </button>
                  <button
                    onClick={() => setConsoleTab("readings")}
                    className={cn(
                      "px-6 py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all whitespace-nowrap",
                      consoleTab === "readings" ? "text-bronze border-bronze bg-bronze/5" : "text-neutral-500 border-transparent hover:text-white"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <BookMarked className="w-3.5 h-3.5" /> 2. Readings & Schedule
                    </span>
                  </button>
                  <button
                    onClick={() => setConsoleTab("lab")}
                    className={cn(
                      "px-6 py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all whitespace-nowrap",
                      consoleTab === "lab" ? "text-bronze border-bronze bg-bronze/5" : "text-neutral-500 border-transparent hover:text-white"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <Code className="w-3.5 h-3.5" /> 3. Practice Sandbox
                    </span>
                  </button>
                  <button
                    onClick={() => setConsoleTab("assignment")}
                    className={cn(
                      "px-6 py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all whitespace-nowrap",
                      consoleTab === "assignment" ? "text-bronze border-bronze bg-bronze/5" : "text-neutral-500 border-transparent hover:text-white"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <CheckSquare className="w-3.5 h-3.5" /> 4. Assignments & Projects
                    </span>
                  </button>
                </div>

                {/* Sub-Tab Contents */}
                <div className="p-6 md:p-8 flex-1">
                  <AnimatePresence mode="wait">
                    
                    {/* Tab 1: Learn - Video Player & Concept Intro */}
                    {consoleTab === "learn" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-6"
                      >
                        {/* Concept Guide Section */}
                        {activeDay.intro && (
                          <div className="bg-white/2 border border-white/5 rounded-3xl p-5 md:p-6">
                            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-3 flex items-center gap-2">
                              <Terminal className="w-4 h-4 text-bronze" /> Concepts Briefing
                            </h4>
                            <p className="text-neutral-400 text-sm leading-relaxed font-medium">
                              {activeDay.intro}
                            </p>
                          </div>
                        )}

                        {/* Video Lectures */}
                        {activeDay.videos.length > 0 ? (
                          <div className="space-y-6">
                            <h4 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                              <Video className="w-4 h-4 text-red-500" /> Interactive Lectures Feed
                            </h4>
                            
                            {/* Native embedded iframe player */}
                            {selectedVideoUrl && getYoutubeId(selectedVideoUrl) ? (
                              <div className="w-full aspect-video rounded-3xl border border-white/10 overflow-hidden shadow-2xl bg-black relative">
                                <iframe 
                                  src={`https://www.youtube.com/embed/${getYoutubeId(selectedVideoUrl)}?modestbranding=1&rel=0`}
                                  className="w-full h-full"
                                  title="Integrated Lecture Stream"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                  allowFullScreen
                                ></iframe>
                              </div>
                            ) : (
                              <div className="w-full aspect-video rounded-3xl border border-dashed border-white/5 flex flex-col items-center justify-center text-center p-8 bg-black/20">
                                <Play className="w-12 h-12 text-neutral-800 mb-4" />
                                <p className="text-neutral-500 text-xs font-black uppercase tracking-widest">No Stream Active</p>
                              </div>
                            )}

                            {/* Lecture selector list with watched status */}
                            <div className="grid gap-3">
                              {activeDay.videos.map((v, vIdx) => {
                                const videoKey = `${activeTrack.id}_m${activeModuleIdx}_d${activeDay.dayNum}_video_${vIdx}`;
                                const isVideoWatched = completedItems.includes(videoKey);
                                const isSelected = selectedVideoUrl === v.url;

                                return (
                                  <div 
                                    key={vIdx}
                                    className={cn(
                                      "flex items-center justify-between p-4 bg-black/40 border rounded-2xl transition-all",
                                      isSelected ? "border-bronze/40 bg-bronze/2" : "border-white/5 hover:border-white/10"
                                    )}
                                  >
                                    <button 
                                      onClick={() => setSelectedVideoUrl(v.url)}
                                      className="flex items-center gap-4 text-left min-w-0 flex-1 mr-4"
                                    >
                                      <div className={cn(
                                        "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                                        isSelected ? "bg-red-500 text-white" : "bg-red-500/10 text-red-500"
                                      )}>
                                        <Play className="w-4 h-4 fill-current" />
                                      </div>
                                      <div className="min-w-0">
                                        <h5 className="text-sm font-bold text-white truncate">{v.title}</h5>
                                        <p className="text-[10px] text-neutral-500 mt-1 uppercase font-black tracking-widest">{v.channel}</p>
                                      </div>
                                    </button>

                                    {/* Watched Status Trigger */}
                                    <button 
                                      onClick={() => toggleItem(videoKey)}
                                      className={cn(
                                        "px-4 py-2 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center gap-2",
                                        isVideoWatched 
                                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" 
                                          : "bg-white/5 text-neutral-500 border border-white/5 hover:text-white hover:border-white/10"
                                      )}
                                    >
                                      {isVideoWatched ? <Check className="w-3.5 h-3.5" /> : null}
                                      {isVideoWatched ? "Watched" : "Mark Watched"}
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ) : (
                          <div className="py-20 text-center text-neutral-600">
                            No video lectures registered for this conceptual lesson.
                          </div>
                        )}
                      </motion.div>
                    )}

                    {/* Tab 2: Readings & Timeline */}
                    {consoleTab === "readings" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-8"
                      >
                        {/* Hour Timeline Protocol */}
                        <div>
                          <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-bronze" /> 10-Hour Execution Protocol
                          </h4>
                          <div className="grid gap-2">
                            {activeDay.hours.map((h, i) => (
                              <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/2 border border-white/2 hover:bg-white/4 transition-colors">
                                <span className="font-mono text-[10px] text-neutral-600 w-24 shrink-0 pt-1 uppercase">{h.time}</span>
                                <div className="flex-1">
                                  <span className={cn(
                                    "text-[9px] font-black px-2 py-0.5 rounded border mr-3 uppercase tracking-widest inline-block mb-2",
                                    h.type === 'Theory' ? 'border-purple-500/20 bg-purple-500/10 text-purple-400' :
                                    h.type === 'Video' ? 'border-red-500/20 bg-red-500/10 text-red-400' :
                                    'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                                  )}>
                                    {h.type}
                                  </span>
                                  <p className="text-sm text-neutral-400 font-medium">{h.desc}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Deep Reading References */}
                        {activeDay.docs.length > 0 && (
                          <div className="space-y-4">
                            <h4 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                              <BookOpen className="w-4 h-4 text-blue-400" /> Deep Reading References
                            </h4>
                            <div className="grid gap-3">
                              {activeDay.docs.map((d, dIdx) => {
                                const docKey = `${activeTrack.id}_m${activeModuleIdx}_d${activeDay.dayNum}_doc_${dIdx}`;
                                const isDocRead = completedItems.includes(docKey);

                                return (
                                  <div 
                                    key={dIdx}
                                    className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-2xl"
                                  >
                                    <a 
                                      href={d.url} 
                                      target="_blank" 
                                      rel="noreferrer"
                                      className="flex items-center gap-4 text-left min-w-0 flex-1 mr-4 group"
                                    >
                                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 transition-colors group-hover:bg-blue-500">
                                        <BookOpen className="w-4 h-4 text-blue-400 group-hover:text-white" />
                                      </div>
                                      <h5 className="text-sm font-bold text-white truncate group-hover:text-blue-400 transition-colors flex items-center gap-2">
                                        {d.title} <ExternalLink className="w-3.5 h-3.5 opacity-50" />
                                      </h5>
                                    </a>

                                    <button 
                                      onClick={() => toggleItem(docKey)}
                                      className={cn(
                                        "px-4 py-2 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center gap-2",
                                        isDocRead 
                                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" 
                                          : "bg-white/5 text-neutral-500 border border-white/5 hover:text-white hover:border-white/10"
                                      )}
                                    >
                                      {isDocRead ? <Check className="w-3.5 h-3.5" /> : null}
                                      {isDocRead ? "Read" : "Mark Read"}
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {/* Tab 3: Sandbox Lab */}
                    {consoleTab === "lab" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-6"
                      >
                        <div className="space-y-4">
                          <h4 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                            <Terminal className="w-4 h-4 text-emerald-400" /> Sandbox Practice Execution
                          </h4>

                          <div className="bg-black/60 rounded-3xl border border-white/5 p-6 space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="text-[9px] font-black text-neutral-600 uppercase tracking-widest">
                                Environment: {activeDay.practice.platform}
                              </span>
                              <div className="flex gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                                <div className="w-2 h-2 rounded-full bg-bronze/50"></div>
                                <div className="w-2 h-2 rounded-full bg-emerald-500/50"></div>
                              </div>
                            </div>

                            <p className="text-sm text-neutral-400 font-medium">
                              {activeDay.practice.task}
                            </p>

                            {/* Simulated Code Panel */}
                            <div className="relative group/code">
                              <pre className="font-mono text-xs text-emerald-400/80 bg-black/80 p-5 rounded-2xl border border-white/5 overflow-x-auto pr-16 max-h-60 overflow-y-auto">
                                {activeDay.practice.code}
                              </pre>
                              <button
                                onClick={() => copyCodeToClipboard(activeDay.practice.code)}
                                className="absolute top-4 right-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 p-2 rounded-xl text-neutral-400 hover:text-white transition-all flex items-center gap-1.5 text-[10px] font-black uppercase"
                              >
                                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                                {copiedCode ? "Copied" : "Copy"}
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Completion Checker */}
                        <div className="flex justify-end pt-4 border-t border-white/5">
                          <button
                            onClick={() => toggleItem(`${activeTrack.id}_m${activeModuleIdx}_d${activeDay.dayNum}_practice`)}
                            className={cn(
                              "px-6 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 border",
                              completedItems.includes(`${activeTrack.id}_m${activeModuleIdx}_d${activeDay.dayNum}_practice`)
                                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                                : "bg-white border-white text-black hover:bg-neutral-200"
                            )}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            {completedItems.includes(`${activeTrack.id}_m${activeModuleIdx}_d${activeDay.dayNum}_practice`) 
                              ? "Lab Sandbox Completed" 
                              : "Verify Lab Completion"}
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* Tab 4: Assignments & Projects */}
                    {consoleTab === "assignment" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-8"
                      >
                        {/* Stanford Assignment Section */}
                        {activeDay.assignment ? (
                          <div className="bg-white/2 border border-white/5 rounded-3xl p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-bronze/5 rounded-full blur-2xl"></div>
                            
                            <div className="flex justify-between items-start gap-4 mb-4">
                              <div>
                                <span className="text-[9px] font-black text-bronze uppercase tracking-widest mb-1 block">Ivy League Assignment Set</span>
                                <h4 className="text-lg font-black text-white tracking-tight">{activeDay.assignment.title}</h4>
                              </div>
                              
                              <button
                                onClick={() => toggleItem(`${activeTrack.id}_m${activeModuleIdx}_d${activeDay.dayNum}_assignment`)}
                                className={cn(
                                  "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0",
                                  completedItems.includes(`${activeTrack.id}_m${activeModuleIdx}_d${activeDay.dayNum}_assignment`)
                                    ? "bg-emerald-500 border-emerald-500 text-white"
                                    : "border-white/20 hover:border-emerald-500/50"
                                )}
                              >
                                {completedItems.includes(`${activeTrack.id}_m${activeModuleIdx}_d${activeDay.dayNum}_assignment`) && (
                                  <Check className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>

                            <p className="text-neutral-400 text-sm leading-relaxed mb-6 font-medium">
                              {activeDay.assignment.description}
                            </p>

                            {activeDay.assignment.template && (
                              <div className="mb-6">
                                <span className="text-[9px] font-black text-neutral-500 uppercase tracking-widest mb-2 block">Starter Code Template</span>
                                <pre className="font-mono text-xs text-neutral-400 bg-black/60 p-4 rounded-xl border border-white/5 overflow-x-auto">
                                  {activeDay.assignment.template}
                                </pre>
                              </div>
                            )}

                            <div className="bg-black/30 p-4 rounded-2xl border border-white/5">
                              <span className="text-[9px] font-black text-neutral-500 uppercase tracking-widest block mb-1">Grading Deliverable</span>
                              <p className="text-xs text-white font-bold">{activeDay.assignment.deliverable}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="p-8 border border-dashed border-white/5 rounded-3xl text-center text-neutral-600">
                            No individual assignment registered for this session.
                          </div>
                        )}

                        {/* Practical Project Gate Section */}
                        {activeDay.project ? (
                          <div className="bg-white/2 border border-white/5 rounded-3xl p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl"></div>
                            
                            <div className="flex justify-between items-start gap-4 mb-4">
                              <div>
                                <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-1 block">Project Gate Milestone</span>
                                <h4 className="text-lg font-black text-white tracking-tight">{activeDay.project.title}</h4>
                              </div>
                              
                              <button
                                onClick={() => toggleItem(`${activeTrack.id}_m${activeModuleIdx}_d${activeDay.dayNum}_project`)}
                                className={cn(
                                  "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0",
                                  completedItems.includes(`${activeTrack.id}_m${activeModuleIdx}_d${activeDay.dayNum}_project`)
                                    ? "bg-emerald-500 border-emerald-500 text-white"
                                    : "border-white/20 hover:border-emerald-500/50"
                                )}
                              >
                                {completedItems.includes(`${activeTrack.id}_m${activeModuleIdx}_d${activeDay.dayNum}_project`) && (
                                  <Check className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>

                            <p className="text-neutral-400 text-sm leading-relaxed mb-6 font-medium">
                              {activeDay.project.description}
                            </p>

                            <div className="bg-black/30 p-4 rounded-2xl border border-white/5">
                              <span className="text-[9px] font-black text-neutral-500 uppercase tracking-widest block mb-1">Target Checkpoint</span>
                              <p className="text-xs text-white font-bold">{activeDay.project.milestone}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="p-8 border border-dashed border-white/5 rounded-3xl text-center text-neutral-600">
                            No master project validation required for this module session.
                          </div>
                        )}
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>

              </div>
            ) : (
              <div className="glass rounded-[40px] border-white/5 min-h-[600px] flex flex-col items-center justify-center text-center p-8">
                <BookMarked className="w-16 h-16 text-neutral-800 mb-4" />
                <h3 className="text-xl font-black text-white uppercase tracking-tight">Select Course Day</h3>
                <p className="text-neutral-500 max-w-sm text-xs mt-2 font-medium">Select a modules day on the left menu directory console to activate your engineering console.</p>
              </div>
            )}

          </div>

        </div>

      </main>
    </div>
  );
}
