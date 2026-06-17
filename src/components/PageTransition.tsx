import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "../router";

// Page order used to decide sweep direction (matches the nav order).
const ROUTE_ORDER = ["/", "/why-us", "/services", "/products", "/contact"];

/**
 * Cinematic route-change "curtain": on navigation a branded gold panel sweeps
 * in to cover the screen, then sweeps off to reveal the new page.
 * Direction follows navigation: moving to a later page sweeps RIGHT, going back sweeps LEFT.
 */
export const PageTransition: React.FC = () => {
  const { currentPath } = useRouter();
  const [sweep, setSweep] = useState<{ key: number; dir: 1 | -1 } | null>(null);
  const isFirst = useRef(true);
  const prevPath = useRef(currentPath);
  const counter = useRef(0);

  useEffect(() => {
    // Don't play on the very first load.
    if (isFirst.current) {
      isFirst.current = false;
      prevPath.current = currentPath;
      return;
    }
    // No real navigation (same path, e.g. StrictMode re-run or a re-render) — don't play the curtain.
    if (prevPath.current === currentPath) {
      return;
    }
    // Forward (further along the page order) => sweep right (dir 1); backward => sweep left (dir -1).
    const prevIndex = ROUTE_ORDER.indexOf(prevPath.current);
    const nextIndex = ROUTE_ORDER.indexOf(currentPath);
    const dir: 1 | -1 = prevIndex !== -1 && nextIndex !== -1 && nextIndex < prevIndex ? -1 : 1;
    prevPath.current = currentPath;
    counter.current += 1;
    setSweep({ key: counter.current, dir });
  }, [currentPath]);

  return (
    <AnimatePresence>
      {sweep !== null && (
        <motion.div
          key={sweep.key}
          className="fixed inset-0 z-[120] pointer-events-none overflow-hidden"
          initial={{ x: sweep.dir === 1 ? "-100%" : "100%" }}
          animate={{ x: "0%" }}
          exit={{ x: sweep.dir === 1 ? "100%" : "-100%" }}
          transition={{ duration: 0.28, ease: [0.76, 0, 0.24, 1] }}
          onAnimationComplete={() => setSweep(null)}
        >
          {/* Panel body */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#070605] via-[#15100a] to-[#070605]" />
          {/* Subtle gold grain/glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,160,42,0.12),transparent_60%)]" />
          {/* Bright leading gold edges on BOTH sides for a symmetric sweep */}
          <div className="absolute top-0 left-0 h-full w-[5px] bg-gradient-to-b from-transparent via-gold-400 to-transparent shadow-[0_0_40px_8px_rgba(212,160,42,0.7)]" />
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
