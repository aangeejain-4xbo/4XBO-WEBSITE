import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string>("INITIALIZING THE CORE...");
  const [isVisible, setIsVisible] = useState<boolean>(true);

  // Status message rotation based on progress thresholds
  useEffect(() => {
    if (progress < 22) {
      setStatusMessage("ESTABLISHING SECURE CORE...");
    } else if (progress < 45) {
      setStatusMessage("CONNECTING NY4 & LD4 SERVER HUBS...");
    } else if (progress < 70) {
      setStatusMessage("OPTIMIZING LIQUIDITY GATEWAYS...");
    } else if (progress < 92) {
      setStatusMessage("ENFORCING CRYPTOGRAPHIC SHIELDS...");
    } else {
      setStatusMessage("FINTECH INTEGRITY LABS SECURED.");
    }
  }, [progress]);

  // Handle progress counting & safety fallback timeout
  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    let safetyTimeout: NodeJS.Timeout;

    // Fast initial progress, decelerating near the end, then standard quick load
    const startProgress = () => {
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            // Brief hold at 100, then quick fade out
            setTimeout(() => {
              setIsVisible(false);
              setTimeout(onComplete, 350); // matches fadeout duration
            }, 120);
            return 100;
          }
          // Dynamic increment size for realistic feel
          const jump = Math.max(4, Math.min(14, Math.floor(Math.random() * 16)));
          return prev + jump > 100 ? 100 : prev + jump;
        });
      }, 30);
    };

    startProgress();

    // Safety fallback timeout
    safetyTimeout = setTimeout(() => {
      clearInterval(progressInterval);
      setProgress(100);
      setIsVisible(false);
      setTimeout(onComplete, 350);
    }, 2500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(safetyTimeout);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <div
          id="load"
          className="fixed inset-0 z-[200] bg-[#030303] flex flex-col items-center justify-center select-none"
          style={{
            transition: "opacity 0.35s ease-in-out, visibility 0.35s ease-in-out",
            opacity: isVisible ? 1 : 0,
            pointerEvents: isVisible ? "all" : "none",
          }}
        >
          {/* Glowing back-lighting aura */}
          <div className="absolute w-[450px] h-[450px] bg-gold-500/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative flex flex-col items-center">
            {/* Spinning gold ring (54x54, border-top gold, custom spin animation) */}
            <div className="relative mb-10">
              <div 
                className="w-[54px] h-[54px] rounded-full border-4 border-gold-400/10 border-t-gold-500 animate-spin"
                style={{ animationDuration: "0.85s" }}
              />
              {/* Inner ambient dot */}
              <div className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-gold-400 shadow-[0_0_10px_rgba(212,175,55,0.8)] animate-pulse" />
            </div>

            {/* Mono loading label and state */}
            <h2 className="font-mono text-xs font-black tracking-[0.3em] text-[#FCFCFC] mb-4 text-center uppercase">
              INITIALIZING SECURE CORE...
            </h2>

            {/* Structured Progress Bar container */}
            <div className="w-56 h-[3px] bg-white/5 border border-white/5 overflow-hidden mb-3 relative rounded-full">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-300 shadow-[0_0_8px_rgba(212,175,55,0.6)]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.1 }}
              />
            </div>

            {/* Detailed loadMsg status description */}
            <div className="min-h-[16px] text-center">
              <span 
                id="loadMsg" 
                className="font-mono text-[9px] font-semibold tracking-widest text-[#caa260]/75 uppercase"
              >
                {statusMessage}
              </span>
            </div>

            {/* Visual percent indicator */}
            <span className="font-mono text-[11px] text-white/40 mt-1">
              {progress}%
            </span>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
