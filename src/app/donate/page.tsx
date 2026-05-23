"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShieldCheck, Zap, ArrowRight, Copy } from "lucide-react";

const quotes = [
  { text: "Knowledge is the only wealth that increases when shared.", author: "Vicky Kumar" },
  { text: "Your support keeps the servers running and the curriculum expanding.", author: "MVA Platform" },
  { text: "Investing in education is investing in the future of the machine.", author: "Elite Academy" },
];

export default function DonatePage() {
  const [copied, setCopied] = useState(false);

  const copyWallet = () => {
    navigator.clipboard.writeText("8102099678@ibl");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <Heart className="w-10 h-10 text-emerald-500 fill-emerald-500/20" />
        </motion.div>
        <h1 className="text-5xl font-black text-white mb-4 tracking-tighter">SUPPORT THE <span className="text-emerald-500 italic">ARCHITECTURE</span></h1>
        <p className="text-neutral-500 max-w-2xl mx-auto font-medium text-base">
          The MVA Platform is built on the principle of open, elite education. 
          Your contributions directly fuel the development of new modules and maintenance of this ecosystem.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {quotes.map((q, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className="glass p-6 rounded-[32px] border-white/5 relative group flex flex-col justify-between"
          >
            <p className="text-base font-serif italic text-white mb-6 leading-relaxed">"{q.text}"</p>
            <p className="text-[10px] font-black text-bronze uppercase tracking-widest">— {q.author}</p>
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center glass p-8 md:p-12 rounded-[50px] border-emerald-500/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px] -z-10"></div>
        
        {/* Scan Section */}
        <div className="flex flex-col items-center p-6 bg-black/40 border border-white/5 rounded-[40px] shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none"></div>
          <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-4">Indian UPI Scan & Pay</p>
          <img 
            src="/upi_qr.jpg" 
            alt="Vicky Kumar UPI QR Code" 
            className="w-64 h-64 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(16,185,129,0.15)] mb-4 object-contain"
          />
          <p className="text-sm font-black text-white">Vicky Kumar</p>
          <p className="text-[10px] text-neutral-500 mt-1 font-mono">8102099678@ibl</p>
        </div>

        {/* Action Details */}
        <div className="space-y-8">
          <div>
            <h3 className="text-3xl font-black text-white mb-3 tracking-tighter">Scan & Support</h3>
            <p className="text-neutral-500 text-sm leading-relaxed font-medium">
              We provide all course materials, practice sandboxes, and project outlines for free. 
              If you find our structured Stanford-grade tracks helpful, consider contributing to keep the project open-source.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-black/40 p-5 rounded-[28px] border border-white/5 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-neutral-600 uppercase tracking-widest mb-1">Direct UPI ID</p>
                <p className="text-lg font-black text-white font-mono tracking-tight">8102099678@ibl</p>
              </div>
              <button 
                onClick={copyWallet}
                className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition group relative"
              >
                <Copy className={`w-5 h-5 transition-colors ${copied ? 'text-emerald-500' : 'text-neutral-500 group-hover:text-white'}`} />
                {copied && (
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-[10px] font-black text-emerald-500 uppercase bg-black/80 px-2 py-1 rounded border border-emerald-500/20 whitespace-nowrap">
                    Copied ID
                  </span>
                )}
              </button>
            </div>
            
            <div className="bg-black/40 p-5 rounded-[28px] border border-white/5 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-neutral-600 uppercase tracking-widest mb-1">Business Inquiries</p>
                <p className="text-sm font-bold text-white">themvaplatform@gmail.com</p>
              </div>
              <a href="mailto:themvaplatform@gmail.com" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition">
                <ArrowRight className="w-5 h-5 text-neutral-500" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="flex items-center gap-3 text-[9px] font-black text-neutral-600 uppercase tracking-widest">
               <ShieldCheck className="w-4 h-4 text-emerald-500" /> Secure Payments
             </div>
             <div className="flex items-center gap-3 text-[9px] font-black text-neutral-600 uppercase tracking-widest">
               <Zap className="w-4 h-4 text-bronze" /> Instant Processing
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
