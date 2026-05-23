"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Heart, ShieldCheck, Zap } from "lucide-react";

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DonationModal({ isOpen, onClose }: DonationModalProps) {
  const [copied, setCopied] = useState(false);

  const copyWallet = () => {
    navigator.clipboard.writeText("8102099678@ibl");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg glass p-8 md:p-10 rounded-[48px] border-emerald-500/10 overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] -z-10"></div>
            
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 md:top-8 md:right-8 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition"
            >
              <X className="w-5 h-5 text-neutral-500" />
            </button>

            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-emerald-500 fill-emerald-500/20" />
              </div>
              <h3 className="text-3xl font-black text-white mb-2 tracking-tighter">SUPPORT THE ARCHITECT</h3>
              <p className="text-neutral-500 text-sm font-medium">Your contributions fuel the evolution of this platform.</p>
            </div>

            {/* QR Scan & Pay */}
            <div className="flex flex-col items-center mb-8">
              <img 
                src="/upi_qr.jpg" 
                alt="UPI QR Code" 
                className="w-44 h-44 rounded-3xl border border-white/10 shadow-[0_0_30px_rgba(16,185,129,0.1)] mb-3 object-contain" 
              />
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.15em]">Scan to Pay using PhonePe / UPI</span>
            </div>

            <div className="space-y-4 mb-8">
              <div className="bg-black/40 p-5 rounded-[32px] border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-neutral-600 uppercase tracking-widest mb-1">UPI ID / ADDRESS</p>
                  <p className="text-xl font-black text-white font-mono tracking-tight">8102099678@ibl</p>
                </div>
                <button 
                  onClick={copyWallet}
                  className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition group relative"
                >
                  <Copy className={`w-5 h-5 transition-colors ${copied ? 'text-emerald-500' : 'text-neutral-500 group-hover:text-white'}`} />
                  {copied && (
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-[10px] font-black text-emerald-500 uppercase bg-black/80 px-2 py-1 rounded border border-emerald-500/20">
                      Copied
                    </span>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="flex items-center gap-3 text-[9px] font-black text-neutral-600 uppercase tracking-widest bg-black/40 p-4 rounded-2xl border border-white/5 justify-center">
                   <ShieldCheck className="w-4 h-4 text-emerald-500" /> Secure
                 </div>
                 <div className="flex items-center gap-3 text-[9px] font-black text-neutral-600 uppercase tracking-widest bg-black/40 p-4 rounded-2xl border border-white/5 justify-center">
                   <Zap className="w-4 h-4 text-bronze" /> Instant
                 </div>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="w-full py-5 rounded-[24px] bronze-gradient text-white text-xs font-black uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(184,115,51,0.2)] hover:shadow-[0_15px_40px_rgba(184,115,51,0.3)] transition-all"
            >
              Continue Learning
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
