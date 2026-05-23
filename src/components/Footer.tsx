"use client";
import Link from "next/link";
import { GitBranch, Globe, Camera, Briefcase, Video, ExternalLink, Heart, Coffee } from "lucide-react";
import { motion } from "framer-motion";
import { DonationModal } from "./DonationModal";
import { useState } from "react";

const socialLinks = [
  { icon: Globe, href: "https://x.com/vickyiitp", label: "X (Twitter)" },
  { icon: Camera, href: "https://instagram.com/vickyiitp", label: "Instagram" },
  { icon: Video, href: "https://youtube.com/@vickyiitp", label: "YouTube" },
  { icon: Briefcase, href: "https://linkedin.com/in/vickyiitp", label: "LinkedIn" },
  { icon: GitBranch, href: "https://github.com/vickyiitp", label: "GitHub" },
];

const footerLinks = [
  { name: "Roadmap", href: "/roadmap" },
  { name: "Challenges", href: "/challenges" },
  { name: "Planner", href: "/planner" },
  { name: "Donate", href: "/donate" },
];

export function Footer() {
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  return (
    <footer className="border-t border-white/5 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-bronze/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-black text-white tracking-tighter">
                THE MVA <span className="text-bronze italic">PLATFORM.</span>
              </span>
            </Link>
            <p className="text-neutral-500 max-w-sm mb-8 font-medium">
              An elite ecosystem for engineers to code, build, and earn. 
              Founded by <a href="https://vickyiitp.tech" target="_blank" className="text-white hover:text-bronze transition-colors">Vicky Kumar</a>.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-neutral-500 hover:bg-bronze/20 hover:text-bronze transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-6">Navigation</h4>
            <ul className="space-y-4">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-neutral-500 hover:text-bronze transition-colors font-medium text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-6">Connect</h4>
            <ul className="space-y-4">
              <li>
                <a 
                  href="https://vickyiitp.tech" 
                  target="_blank" 
                  className="text-neutral-500 hover:text-bronze transition-colors font-medium text-sm flex items-center gap-2"
                >
                  Devil Labs <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <button 
                  onClick={() => setIsDonateOpen(true)}
                  className="text-neutral-500 hover:text-emerald-500 transition-colors font-medium text-sm flex items-center gap-2"
                >
                  Quick Donate <Coffee className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-6">
          <div className="text-[10px] font-black text-neutral-700 uppercase tracking-[0.3em]">
            © 2026 THE MVA PLATFORM • ALL RIGHTS RESERVED
          </div>
          <div className="flex items-center gap-2 text-[10px] font-black text-neutral-700 uppercase tracking-[0.2em]">
            Built with <Heart className="w-3 h-3 text-bronze fill-bronze" /> by <span className="text-neutral-500">Vicky Kumar</span>
          </div>
        </div>
      </div>
      <DonationModal isOpen={isDonateOpen} onClose={() => setIsDonateOpen(false)} />
    </footer>
  );
}
