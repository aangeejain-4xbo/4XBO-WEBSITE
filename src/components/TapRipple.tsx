import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

/**
 * Mobile-only signature interaction: a soft gold ripple radiates from every tap.
 * Replaces the desktop cursor trail (which is disabled on touch) so phones get
 * their own premium tactile feedback. Touch devices only; fully hidden on desktop.
 */
interface Ripple {
  id: number;
  x: number;
  y: number;
}

export const TapRipple: React.FC = () => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Touch / coarse-pointer devices only — never runs on desktop.
    if (!window.matchMedia("(pointer: coarse)").matches) return;

    let counter = 0;
    const onTap = (e: PointerEvent) => {
      const id = ++counter;
      setRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
      window.setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 650);
    };

    window.addEventListener("pointerdown", onTap, { passive: true });
    return () => window.removeEventListener("pointerdown", onTap);
  }, []);

  return (
    <div className="fixed inset-0 z-[9998] pointer-events-none overflow-hidden md:hidden">
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          initial={{ scale: 0, opacity: 0.55 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ left: r.x - 44, top: r.y - 44 }}
          className="absolute h-[88px] w-[88px] rounded-full bg-[radial-gradient(circle,rgba(212,160,42,0.5)_0%,rgba(212,160,42,0.18)_42%,transparent_70%)] mix-blend-screen"
        />
      ))}
    </div>
  );
};
