"use client";
import { motion } from "framer-motion";
import { Heart, Coffee, ShieldCheck, Zap, ArrowRight, Copy } from "lucide-react";

const quotes = [
  { text: "Knowledge is the only wealth that increases when shared.", author: "Vicky Kumar" },
  { text: "Your support keeps the servers running and the curriculum expanding.", author: "MVA Platform" },
  { text: "Investing in education is investing in the future of the machine.", author: "Elite Academy" },
];

export default function DonatePage() {
  const copyWallet = () => {
    navigator.clipboard.writeText("8102099678");
    alert("Wallet Number Copied!");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-20">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <Heart className="w-10 h-10 text-emerald-500 fill-emerald-500/20" />
        </motion.div>
        <h1 className="text-5xl font-black text-white mb-6 tracking-tighter">SUPPORT THE <span className="text-emerald-500 italic">ARCHITECTURE</span></h1>
        <p className="text-neutral-500 max-w-2xl mx-auto font-medium text-lg">
          The MVA Platform is built on the principle of open, elite education. 
          Your contributions directly fuel the development of new modules and maintenance of this ecosystem.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {quotes.map((q, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="glass p-8 rounded-[40px] border-white/5 relative group"
          >
            <p className="text-lg font-serif italic text-white mb-6 leading-relaxed">"{q.text}"</p>
            <p className="text-xs font-black text-bronze uppercase tracking-widest">— {q.author}</p>
          </motion.div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto glass p-12 rounded-[50px] border-emerald-500/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px]"></div>
        
        <div className="relative z-10 space-y-10">
          <div className="flex items-start gap-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-500">
              <Coffee className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white mb-2">Buy the Architect a Coffee</h3>
              <p className="text-neutral-500 text-sm">Every small token of appreciation helps us stay focused on creating the best content.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-black/40 p-6 rounded-[32px] border border-white/5 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-neutral-600 uppercase tracking-widest mb-1">Direct Wallet (UPI/Phone)</p>
                <p className="text-2xl font-black text-white font-mono">8102099678</p>
              </div>
              <button 
                onClick={copyWallet}
                className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition group"
              >
                <Copy className="w-5 h-5 text-neutral-500 group-hover:text-emerald-500" />
              </button>
            </div>
            
            <div className="bg-black/40 p-6 rounded-[32px] border border-white/5 flex items-center justify-between">
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
             <div className="flex items-center gap-3 text-[10px] font-black text-neutral-600 uppercase">
               <ShieldCheck className="w-4 h-4 text-emerald-500" /> 100% Secure Transfer
             </div>
             <div className="flex items-center gap-3 text-[10px] font-black text-neutral-600 uppercase">
               <Zap className="w-4 h-4 text-bronze" /> Instant Support
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
