"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { LucideIcon, GraduationCap, Trophy, Calendar, Briefcase, Info, Heart } from "lucide-react";

const navItems = [
  { name: "Roadmap", href: "/roadmap", icon: GraduationCap },
  { name: "Challenges", href: "/challenges", icon: Trophy },
  { name: "Earnings", href: "/earnings", icon: Briefcase },
  { name: "Planner", href: "/planner", icon: Calendar },
  { name: "About", href: "/about", icon: Info },
];

export function Navbar() {
  const pathname = usePathname();

  return (
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
          <Link href="/auth" className="px-6 py-2.5 bg-white text-black font-black rounded-full hover:bg-neutral-200 transition text-xs tracking-widest">
            LOG IN
          </Link>
        </div>
      </div>
    </header>
  );
}
