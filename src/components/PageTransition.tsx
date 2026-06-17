import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "../router";

/**
 * Cinematic route-change "curtain": on navigation a branded gold panel sweeps
 * in to cover the screen, then sweeps off to reveal the new page.
 */
export const PageTransition: React.FC = () => {
  const { currentPath } = useRouter();
  const [sweepKey, setSweepKey] = useState<number | null>(null);
  const isFirst = useRef(true);
  const counter = useRef(0);

  useEffect(() => {
    // Don't play on the very first load (the Loader already covers that).
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    counter.current += 1;
    setSweepKey(counter.current);
  }, [currentPath]);

  return (
    <AnimatePresence>
      {sweepKey !== null && (
        <motion.div
          key={sweepKey}
          className="fixed inset-0 z-[120] pointer-events-none overflow-hidden"
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.28, ease: [0.76, 0, 0.24, 1] }}
          onAnimationComplete={() => setSweepKey(null)}
        >
          {/* Panel body */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#070605] via-[#15100a] to-[#070605]" />
          {/* Subtle gold grain/glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,160,42,0.12),transparent_60%)]" />
          {/* Bright leading gold edge */}
          <div className="absolute top-0 right-0 h-full w-[5px] bg-gradient-to-b from-transparent via-gold-400 to-transparent shadow-[0_0_40px_8px_rgba(212,160,42,0.7)]" />
          {/* Centered complete logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.img
              src="/logo.png"
              alt="4X BackOffice"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              className="h-32 md:h-44 w-auto drop-shadow-[0_0_40px_rgba(212,160,42,0.6)]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
