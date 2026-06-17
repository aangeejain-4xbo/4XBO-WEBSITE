import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";

interface CounterProps {
  target: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
}

const AnimatedCounter: React.FC<CounterProps> = ({
  target,
  suffix = "",
  decimals = 0,
  duration = 1800,
}) => {
  const [count, setCount] = useState<number>(0);
  const containerRef = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.6 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;

    const runCounter = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsedTime = timestamp - startTime;
      const progressRatio = Math.min(elapsedTime / duration, 1);

      // cubic bezier curve equivalent to ease-out-cubic
      // f(t) = 1 - (1 - t)^3
      const easeValue = 1 - Math.pow(1 - progressRatio, 3);
      setCount(easeValue * target);

      if (progressRatio < 1) {
        requestAnimationFrame(runCounter);
      } else {
        setCount(target);
        setDone(true);
      }
    };

    requestAnimationFrame(runCounter);
  }, [hasStarted, target, duration]);

  return (
    <motion.span
      ref={containerRef}
      className="tabular-nums inline-block"
      animate={
        done
          ? {
              scale: [1, 1.18, 1],
              textShadow: [
                "0 0 0px rgba(255,217,0,0)",
                "0 0 26px rgba(255,217,0,0.9)",
                "0 0 10px rgba(255,217,0,0.25)",
              ],
            }
          : {}
      }
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {count.toFixed(decimals)}
      {suffix}
    </motion.span>
  );
};

export const Stats: React.FC = () => {
  const statsList = [
    { value: 40, suffix: "+", decimals: 0, label: "MT5 servers managed" },
    { value: 99.9, suffix: "%", decimals: 1, label: "Uptime across platforms" },
    { value: 30, suffix: "m", decimals: 0, label: "Avg. response time" },
    { value: 15, suffix: "+", decimals: 0, label: "Brokerage clients" },
  ];

  return (
    <section 
      id="stats-band" 
      className="relative w-full bg-[#040406]/75 border-t border-b border-[#caa260]/20 py-16 px-4 md:px-8 select-none overflow-hidden"
    >
      {/* Background grid overlay with low opacity */}
      <div className="absolute inset-0 grid-bg-overlay opacity-[0.15] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[120px] bg-gold-500/5 blur-[90px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* 4-column grid (2 cols on screen width <= 760px) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6 md:gap-x-0 items-center justify-between">
          {statsList.map((stat, idx) => (
            <div 
              key={idx} 
              data-rv
              data-rv-delay={`${idx + 1}`}
              className="flex flex-col items-center justify-center text-center px-4 relative group"
            >
              {/* Vertical divider via absolute pseudo elements */}
              {idx < 3 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-14 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />
              )}
              {/* Visual Divider on Mobile (between row 1 and row 2) */}
              {idx === 1 && (
                <div className="block md:hidden absolute right-0 top-1/2 -translate-y-1/2 h-10 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />
              )}
              {idx === 3 && (
                <div className="block md:hidden absolute left-0 top-1/2 -translate-y-1/2 h-10 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />
              )}

              {/* Large counter number */}
              <div className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-[#D4AF37] tracking-tight mb-3 filter drop-shadow-[0_0_12px_rgba(212,175,55,0.2)] transition-transform duration-300 group-hover:scale-105">
                <AnimatedCounter 
                  target={stat.value} 
                  suffix={stat.suffix} 
                  decimals={stat.decimals} 
                />
              </div>

              {/* Label below counter */}
              <div className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#A29E9A] uppercase leading-relaxed max-w-[180px]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
