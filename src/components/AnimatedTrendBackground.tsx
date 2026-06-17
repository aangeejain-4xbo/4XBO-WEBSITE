import React from "react";
import { motion } from "motion/react";

/**
 * Ambient section background.
 * (The old animated market trend-line chart was removed — replaced with a calm,
 * slow-drifting gold "aurora" glow over a faint dot grid for premium depth.)
 */
export const AnimatedTrendBackground: React.FC = () => {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ willChange: "transform", transform: "translateZ(0)" }}
    >
      {/* Faint, slowly scrolling dot grid for subtle texture */}
      <motion.div
        animate={{ x: [0, -52] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
        className="absolute inset-0 z-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(202, 162, 96, 0.35) 1px, transparent 1px)`,
          backgroundSize: "26px 26px",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      />

      {/* Soft drifting gold aurora orbs — gentle, ambient depth */}
      <motion.div
        animate={{ x: [0, 45, 0], y: [0, -30, 0], scale: [1, 1.14, 1] }}
        transition={{ repeat: Infinity, ease: "easeInOut", duration: 18 }}
        className="absolute top-1/4 left-1/4 h-80 w-80 rounded-full bg-gold-400/[0.06] blur-[110px] pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, -55, 0], y: [0, 38, 0], scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, ease: "easeInOut", duration: 23 }}
        className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-gold-500/[0.05] blur-[130px] pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, 26, 0], opacity: [0.35, 0.65, 0.35] }}
        transition={{ repeat: Infinity, ease: "easeInOut", duration: 26 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-gold-300/[0.04] blur-[100px] pointer-events-none"
      />
    </div>
  );
};
