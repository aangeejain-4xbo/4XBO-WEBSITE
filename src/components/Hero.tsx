import React, { useState, Suspense, lazy } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRouter } from "../router";
import { ErrorBoundary } from "./ErrorBoundary";
import { waLink, WA_CONSULT_MSG } from "../config";

// Heavy Three.js scene — loaded on demand so it stays out of the initial bundle.
const LivingInfrastructureSphere = lazy(() =>
  import("./LivingInfrastructureSphere").then((m) => ({ default: m.LivingInfrastructureSphere }))
);

interface HeroProps {
  onTalkClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onTalkClick }) => {
  // Both are effectively constant — the setters were never wired up.
  const [particlesAssembled] = useState(true);
  const [activeSystemMode] = useState<"hero" | "infrastructure" | "trading" | "liquidity" | "risk">("hero");

  const { navigate } = useRouter();

  // Hook into the page scroll progress using useScroll the user requested
  const { scrollYProgress } = useScroll();
  const heroGlobeOpacity = useTransform(scrollYProgress, [0, 0.28], [0.85, 0]);
  // Cinematic scroll: zoom into the core while the headline lifts away and fades.
  const heroGlobeScale = useTransform(scrollYProgress, [0, 0.25], [1, 2.3]);
  const heroContentY = useTransform(scrollYProgress, [0, 0.15], [0, -130]);
  const heroContentOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  // Cinematic staggered animation timelines matching luxury motion curves
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  // Dedicated motion specifications for high-end Apple/Stripe-level reveal timings
  const badgeVariants = {
    hidden: { opacity: 0, y: 25, filter: "blur(12px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const line1Variants = {
    hidden: { opacity: 0, y: 35, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
        delay: 0.05, // Appears first
      },
    },
  };

  const line2Variants = {
    hidden: { opacity: 0, y: 35, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
        delay: 0.15, // Appears second
      },
    },
  };

  const subheadVariants = {
    hidden: { opacity: 0, y: 15, filter: "blur(14px)" },
    visible: {
      opacity: 0.92,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
        delay: 0.24, // Blur to focus transition
      },
    },
  };

  const buttonsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
        delay: 0.32, // Staggered reveal
      },
    },
  };

  return (
    <section className="relative min-h-[82vh] md:min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#050505] py-12 md:py-24 px-4 md:px-8 select-none">
      
      {/* Exquisite Orbital Ellipses Behind Text (Symmetrically matching design mock) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1300px] h-[850px] pointer-events-none select-none z-0 overflow-hidden flex items-center justify-center">
        <svg 
          className="w-full h-full opacity-45 sm:opacity-55 scale-[1.05] sm:scale-100" 
          viewBox="0 0 1200 800" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outermost Orbit Track with tilted transform */}
          <ellipse 
            cx="600" 
            cy="400" 
            rx="485" 
            ry="232" 
            stroke="url(#orbit-gradient-1)" 
            strokeWidth="1" 
            transform="rotate(-15 600 400)" 
          />
          {/* Inner Orbit Track */}
          <ellipse 
            cx="600" 
            cy="400" 
            rx="390" 
            ry="185" 
            stroke="url(#orbit-gradient-2)" 
            strokeWidth="0.8" 
            transform="rotate(18 600 400)" 
          />
          {/* Innermost Dotted/Dashed Track */}
          <ellipse 
            cx="600" 
            cy="400" 
            rx="300" 
            ry="142" 
            stroke="url(#orbit-gradient-3)" 
            strokeWidth="0.75" 
            strokeDasharray="4 6" 
            transform="rotate(-5 600 400)" 
          />

          {/* Luxury tracking dot with double pulse halo at upper right, exactly where shown in the reference image */}
          <g transform="translate(1010, 275)">
            <circle r="14" fill="none" stroke="rgba(212, 160, 42, 0.15)" strokeWidth="1" />
            <motion.circle 
              r="20" 
              fill="none" 
              stroke="rgba(212, 160, 42, 0.08)" 
              strokeWidth="0.8" 
              animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.3, 0.8, 0.3] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            />
            <circle r="6" fill="rgba(8, 8, 8, 0.95)" stroke="rgba(212, 160, 42, 0.7)" strokeWidth="1.2" />
            <circle r="2" fill="#d4a02a" />
          </g>

          {/* Gradients configurations */}
          <defs>
            <linearGradient id="orbit-gradient-1" x1="0" y1="0" x2="1200" y2="800" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="rgba(138, 106, 24, 0.02)" />
              <stop offset="45%" stopColor="rgba(212, 160, 42, 0.32)" />
              <stop offset="55%" stopColor="rgba(212, 160, 42, 0.32)" />
              <stop offset="100%" stopColor="rgba(138, 106, 24, 0.02)" />
            </linearGradient>
            <linearGradient id="orbit-gradient-2" x1="0" y1="0" x2="1200" y2="800" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="rgba(212, 160, 42, 0.25)" />
              <stop offset="50%" stopColor="rgba(138, 106, 24, 0.03)" />
              <stop offset="100%" stopColor="rgba(212, 160, 42, 0.25)" />
            </linearGradient>
            <linearGradient id="orbit-gradient-3" x1="0" y1="0" x2="1200" y2="800" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="rgba(212, 160, 42, 0.02)" />
              <stop offset="50%" stopColor="rgba(212, 160, 42, 0.18)" />
              <stop offset="100%" stopColor="rgba(212, 160, 42, 0.02)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Luxury Central Backlight Aura Overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] aspect-square rounded-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.14)_0%,rgba(138,106,24,0.01)_55%,transparent_100%)] blur-[95px] mix-blend-screen pointer-events-none z-0 animate-pulse" />

      {/* Living Spherical Infrastructure Network Layer (Behind text) */}
      <motion.div 
        style={{ opacity: heroGlobeOpacity, scale: heroGlobeScale, y: "-50%", x: "-50%" }}
        className="absolute top-1/2 left-1/2 w-[820px] h-[820px] z-0 pointer-events-none select-none flex items-center justify-center"
      >
        <ErrorBoundary>
          <Suspense fallback={null}>
            {/* Mobile-only: enlarge the globe 50%. Desktop (md+) stays scale-100, unchanged. */}
            <div className="scale-150 md:scale-100">
              <LivingInfrastructureSphere activeMode={activeSystemMode} size={820} />
            </div>
          </Suspense>
        </ErrorBoundary>
      </motion.div>

      {/* Cinematic overlay content centered on top with 3D context wrapper */}
      <motion.div
        className="relative z-10 max-w-5xl w-full mx-auto flex flex-col items-center text-center mt-6"
        style={{ y: heroContentY, opacity: heroContentOpacity, perspective: "1250px", transformStyle: "preserve-3d" }}
      >
        
        <motion.div
          initial="hidden"
          animate={particlesAssembled ? "visible" : "hidden"}
          variants={containerVariants}
          className="flex flex-col items-center justify-center w-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Label Badge Pill - Fade up + Blur Reveal */}
          <motion.div
            variants={badgeVariants}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#050505]/95 border border-gold-400/15 shadow-[0_0_20px_rgba(212,175,55,0.06)] mb-6 md:mb-8 backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse shadow-[0_0_8px_#ffd900]" />
            <span className="text-[9px] md:text-[10px] font-mono font-bold tracking-[0.3em] text-gold-300 uppercase">
              THE ENGINE BEHIND EVERY SUCCESSFUL BROKER
            </span>
          </motion.div>

          {/* Premium Headline containing exact requested semantic H1 description */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[76px] font-bold text-white tracking-tight leading-[1.06] cursor-default mb-6 max-w-4xl mx-auto">
            <motion.div variants={line1Variants} className="block mb-2">
              <span className="text-white text-glow-light">Beyond </span>
              <span className="bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500 bg-clip-text text-transparent font-extrabold text-glow-gold filter drop-shadow-[0_2px_15px_rgba(212,160,42,0.3)]">Limits.</span>
            </motion.div>
            <motion.div variants={line2Variants} className="block text-[#a8a8a8] font-bold leading-[1.08] tracking-tight">
              Amplified with
              <br />
              experience.
            </motion.div>
          </h1>

          {/* Luxury aligned subtitle description - Blur to focus transition */}
          <motion.p
            variants={subheadVariants}
            className="mt-4 md:mt-6 font-sans font-normal text-stone-400 text-sm sm:text-base md:text-[17px] leading-relaxed max-w-2xl cursor-default select-none"
          >
            Reliable, secure, scalable back-office infrastructure for forex brokers &mdash; a living global core of MT5 servers, bridges and risk systems, watched around the clock.
          </motion.p>

          {/* Heavy visual precision Call to action buttons - Staggered reveal */}
          <motion.div
            variants={buttonsVariants}
            className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto relative z-30"
          >
            <a
              id="hero-primary-cta"
              href={waLink(WA_CONSULT_MSG)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book a Consultation with 4X BackOffice on WhatsApp"
              className="w-full sm:w-auto px-8 py-4 bg-[#d4a02a] text-stone-950 font-display text-xs font-bold tracking-[0.2em] uppercase rounded-lg shadow-[0_8px_30px_rgba(212,160,42,0.18)] border border-[#d4a02a] hover:bg-white hover:border-white hover:text-stone-950 hover:shadow-[0_12px_40px_rgba(255,255,255,0.25)] active:scale-[0.98] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2.5"
            >
              Book a Consultation <span className="text-[13px] font-sans font-bold leading-none">&rarr;</span>
            </a>
            <button
              id="hero-secondary-cta"
              onClick={() => navigate("/services")}
              className="w-full sm:w-auto px-8 py-4 border border-white/10 bg-white/[0.02] text-stone-200 hover:text-white hover:bg-white/[0.08] hover:border-white/30 rounded-lg font-display text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer backdrop-blur-md flex items-center justify-center"
            >
              Explore Services
            </button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Centered Scroll Indicator at Bottom (Exactly matching design mock) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3 select-none text-[9px] font-mono tracking-[0.35em] text-stone-500">
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="uppercase text-stone-400 font-bold"
        >
          SCROLL
        </motion.span>
        <div className="w-[1.5px] h-14 bg-gradient-to-b from-gold-500/60 to-transparent" />
      </div>
    </section>
  );
};
