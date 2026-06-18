import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useRouter, PathRoute } from "../router";

/**
 * Cinematic route-change "curtain": on navigation a branded gold panel sweeps
 * across the screen to cover it, then sweeps off to reveal the new page.
 *
 * The sweep is directional, mirroring the site's page order:
 *   /  ->  /why-us  ->  /services  ->  /products  ->  /contact
 * Navigating *forward* (toward /contact) sweeps left -> right.
 * Navigating *backward* (toward /) sweeps right -> left.
 */

// Canonical page order — matches the Navbar links / PathRoute union.
const PAGE_ORDER: PathRoute[] = ["/", "/why-us", "/services", "/products", "/contact"];

const orderIndex = (path: string) => {
  const i = PAGE_ORDER.indexOf(path as PathRoute);
  return i === -1 ? PAGE_ORDER.length : i; // unknown routes sort to the end
};

export const PageTransition: React.FC = () => {
  const { currentPath } = useRouter();
  const [sweep, setSweep] = useState<{ key: number; dir: 1 | -1 } | null>(null);
  const isFirst = useRef(true);
  const counter = useRef(0);
  const prevPath = useRef(currentPath);

  useEffect(() => {
    // Don't play on the very first load (the Loader already covers that).
    if (isFirst.current) {
      isFirst.current = false;
      prevPath.current = currentPath;
      return;
    }

    // 1 = forward (left -> right), -1 = backward (right -> left).
    const dir: 1 | -1 =
      orderIndex(currentPath) >= orderIndex(prevPath.current) ? 1 : -1;
    prevPath.current = currentPath;

    counter.current += 1;
    setSweep({ key: counter.current, dir });
  }, [currentPath]);

  return (
    <AnimatePresence>
      {sweep !== null && (
        <motion.div
          key={sweep.key}
          className="fixed inset-0 z-[120] pointer-events-none overflow-hidden will-change-transform [backface-visibility:hidden]"
          // Forward: enter from the left, exit to the right.
          // Backward: enter from the right, exit to the left.
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
          {/* Bright leading gold edge — on the side the panel travels toward */}
          <div
            className={`absolute top-0 h-full w-[5px] bg-gradient-to-b from-transparent via-gold-400 to-transparent shadow-[0_0_40px_8px_rgba(212,160,42,0.7)] ${
              sweep.dir === 1 ? "right-0" : "left-0"
            }`}
          />
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
