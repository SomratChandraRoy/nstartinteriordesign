import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoaded(true), 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 1;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%",
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030712] text-[#F8FAFC]"
        >
          {/* Logo Reveal */}
          <div className="relative mb-12 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-4"
            >
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center">
                <img src="/n.png" alt="NSID" className="w-full h-full object-contain" />
              </div>
              <span className="font-display text-3xl tracking-[0.2em]">NSID</span>
            </motion.div>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="h-px bg-[#D4AF37] max-w-[200px]"
            />
          </div>

          {/* Percentage Counter */}
          <div className="relative">
            <span className="font-display text-[8vw] lg:text-[6rem] leading-none text-white/5 selection:bg-transparent">
              {Math.min(progress, 100)}%
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs uppercase tracking-[0.5em] text-[#D4AF37]/60">
                    Architecting Silence
                </span>
            </div>
          </div>

          {/* Bottom Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5">
            <motion.div 
              className="h-full bg-[#D4AF37]"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>

          {/* Decorative elements */}
          <div className="absolute top-10 left-10 text-[10px] uppercase tracking-[0.3em] text-white/20">
            NorthStar Interior Design
          </div>
          <div className="absolute bottom-10 right-10 text-[10px] uppercase tracking-[0.3em] text-white/20">
            Dhaka · Bangladesh
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
