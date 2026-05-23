"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { GraduationCap, Trophy, Calendar, Briefcase, Info, Heart, User } from "lucide-react";
import { auth, db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { ProfileDrawer } from "./ProfileDrawer";

const navItems = [
  { name: "Roadmap", href: "/roadmap", icon: GraduationCap },
  { name: "Challenges", href: "/challenges", icon: Trophy },
  { name: "Earnings", href: "/earnings", icon: Briefcase },
  { name: "Planner", href: "/planner", icon: Calendar },
  { name: "About", href: "/about", icon: Info },
];

export function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [profileName, setProfileName] = useState("Architect");
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Authentication State Listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      if (u) {
        setUser(u);
        
        // Listen to custom display credentials in Firestore
        const docRef = doc(db, "users", u.uid);
        const unsubDoc = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists() && docSnap.data().displayName) {
            setProfileName(docSnap.data().displayName);
          } else {
            setProfileName(u.email ? u.email.split("@")[0] : "Architect");
          }
        });
        
        return () => unsubDoc();
      } else {
        setUser(null);
        setProfileName("Architect");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <header className="fixed top-0 w-full z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bronze-gradient flex items-center justify-center font-black text-xl shadow-[0_0_20px_rgba(184,115,51,0.3)] transition-transform group-hover:scale-110">
              V
            </div>
            <span className="font-black text-xl tracking-tighter text-white hidden sm:block">
              MVA <span className="text-bronze italic">PLATFORM</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all relative group",
                    isActive ? "text-white" : "text-neutral-500 hover:text-white"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 bg-white/5 rounded-full border border-white/10"
                      transition={{ type: "spring", duration: 0.6 }}
                    />
                  )}
                  <Icon className={cn("w-4 h-4", isActive ? "text-bronze" : "group-hover:text-bronze")} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/donate" className="flex items-center gap-2 text-xs font-black text-emerald-500 hover:text-emerald-400 transition animate-pulse">
              <Heart className="w-3 h-3 fill-emerald-500" /> DONATE
            </Link>
            
            {user ? (
              <button 
                onClick={() => setIsProfileOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-bronze/30 rounded-full transition text-xs font-black text-white shrink-0 uppercase tracking-widest cursor-pointer"
              >
                <div className="w-5 h-5 rounded-md bg-bronze/20 flex items-center justify-center shrink-0">
                  <User className="w-3 h-3 text-bronze" />
                </div>
                <span className="truncate max-w-[80px]">{profileName}</span>
              </button>
            ) : (
              <Link href="/auth" className="px-6 py-2.5 bg-white text-black font-black rounded-full hover:bg-neutral-200 transition text-xs tracking-widest">
                LOG IN
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Slide-over Profile Drawer */}
      <ProfileDrawer isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </>
  );
}
