"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { auth, db } from "@/lib/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, Globe, Code } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", userCredential.user.uid), {
          email: userCredential.user.email,
          createdAt: new Date().toISOString(),
          completedModules: []
        }, { merge: true });
      }
      router.push("/roadmap");
    } catch (error: any) {
      alert(error.message);
    }
  };

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      await setDoc(doc(db, "users", result.user.uid), {
        email: result.user.email,
        lastLogin: new Date().toISOString(),
      }, { merge: true });
      router.push("/roadmap");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
       <div className="absolute inset-0 bronze-gradient opacity-5 blur-[100px] -z-10 animate-pulse"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full glass p-10 rounded-[40px] border-white/10 relative z-10"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black tracking-tighter text-white mb-2">
            {isLogin ? "WELCOME BACK" : "JOIN THE ELITE"}
          </h2>
          <p className="text-neutral-500 text-sm font-medium">Access your personalized engineering dashboard.</p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm focus:border-bronze transition-all outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm focus:border-bronze transition-all outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="w-full bronze-gradient py-4 rounded-2xl text-white font-black text-xs tracking-widest hover:opacity-90 transition flex items-center justify-center gap-2">
            {isLogin ? "INITIATE SESSION" : "CREATE ARCHITECT PROFILE"} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="my-8 flex items-center gap-4 text-neutral-700">
          <div className="h-px bg-white/5 flex-1"></div>
          <span className="text-[10px] font-black uppercase">Or continue with</span>
          <div className="h-px bg-white/5 flex-1"></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button onClick={googleSignIn} className="flex items-center justify-center gap-3 py-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition text-xs font-bold">
            <Globe className="w-4 h-4 text-neutral-400" /> Google
          </button>
          <button className="flex items-center justify-center gap-3 py-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition text-xs font-bold">
            <Code className="w-4 h-4 text-neutral-400" /> GitHub
          </button>
        </div>

        <p className="text-center mt-10 text-xs text-neutral-500">
          {isLogin ? "Don't have an account?" : "Already a member?"}{" "}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-bronze font-black hover:underline underline-offset-4"
          >
            {isLogin ? "SIGN UP" : "LOG IN"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
