import React from "react";
import { motion } from "motion/react";

interface ScrollReveal3DProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  rotateXOffset?: number;
}

export const ScrollReveal3D: React.FC<ScrollReveal3DProps> = ({
  children,
  delay = 0,
  duration = 1.05,
  yOffset = 45,
  rotateXOffset = 14,
}) => {
  return (
    <div className="perspective-1000 w-full" style={{ transformStyle: "preserve-3d" }}>
      <motion.div
        initial={{
          opacity: 0,
          y: yOffset,
          rotateX: rotateXOffset,
          scale: 0.96,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
        }}
        viewport={{ once: true, margin: "-12%" }}
        transition={{
          duration: duration,
          delay: delay,
          ease: [0.16, 1, 0.3, 1], // Cinematic luxury-class ease curve
        }}
        style={{
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          willChange: "transform, opacity",
        }}
        className="w-full"
      >
        {children}
      </motion.div>
    </div>
  );
};
