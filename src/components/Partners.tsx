import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { AnimatedTrendBackground } from "./AnimatedTrendBackground";
import { TRANSITIONS, ANIMATION_VARIANTS } from "../lib/animations";

export const Partners: React.FC = () => {
  // Logos are local assets — render them immediately, no artificial loading gate.
  const isLoading = false;

  // Each technology partner logo, rendered inside identical premium cards.
  const partnerLogos: { id: string; node: React.ReactNode }[] = [
    {
      id: "primexm",
      node: (
        <img
          src="/partners/primexm.png"
          alt="PrimeXM"
          loading="lazy"
          className="w-auto h-[58px] object-contain"
        />
      ),
    },
    {
      id: "metatrader5",
      node: (
        <svg
          className="w-auto h-[46px] object-contain transition-transform duration-300"
          viewBox="0 0 280 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="MetaTrader 5"
        >
          {/* Embedded brand color gradient definitions to render realistic 3D appearance without filters */}
          <defs>
            <radialGradient id="mt5-sphere-green" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="45%" stopColor="#16a34a" />
              <stop offset="100%" stopColor="#14532d" />
            </radialGradient>
            <radialGradient id="mt5-sphere-blue" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="45%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </radialGradient>
            <radialGradient id="mt5-sphere-yellow" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="45%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#713f12" />
            </radialGradient>
            <linearGradient id="mt5-digit-orange" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="45%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#c2410c" />
            </linearGradient>
          </defs>

          <g transform="translate(5, 0)">
            {/* Interconnected MetaTrader Nodes */}
            <g transform="translate(0, -1)">
              {/* Ring connections in original brand schema */}
              <path d="M 22 36 A 8 8 0 1 1 22 24" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.85" />
              <circle cx="17.5" cy="30" r="4.8" fill="url(#mt5-sphere-yellow)" />

              <path d="M 42 24 A 8 8 0 1 1 42 36" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.85" />
              <circle cx="46.5" cy="30" r="4.8" fill="url(#mt5-sphere-blue)" />

              <path d="M 28 18 A 8 8 0 1 1 36 18" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.85" />
              <circle cx="32" cy="13" r="4.8" fill="url(#mt5-sphere-green)" />

              {/* Floating mini center structural sphere */}
              <circle cx="32" cy="30" r="5" fill="#080808" stroke="#dddddd" strokeWidth="0.8" />
              <path d="M 28 30 H 36 M 32 26 V 34" stroke="#ffffff" strokeWidth="0.8" />
            </g>

            {/* Exact text typography positioning */}
            <text x="62" y="38" fill="#FFFFFF" fontFamily="system-ui, -apple-system, sans-serif" fontSize="23" fontWeight="700" letterSpacing="-0.02em">MetaTrader</text>
            <text x="181" y="38" fill="url(#mt5-digit-orange)" fontFamily="system-ui, -apple-system, sans-serif" fontSize="28" fontWeight="900" letterSpacing="-0.01em">5</text>
          </g>
        </svg>
      ),
    },
    {
      id: "centroid",
      node: (
        <svg
          className="w-auto h-[46px] object-contain transition-transform duration-300"
          viewBox="0 0 280 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Centroid Solutions"
        >
          <defs>
            <linearGradient id="centroid-slice-red" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
            <linearGradient id="centroid-slice-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="centroid-slice-dark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#1e40af" />
            </linearGradient>
          </defs>

          <g transform="translate(5, 0)">
            {/* High-fidelity vector layout mirroring the exact circular pie segments of the original logo */}
            <g transform="translate(4, 0)">
              {/* Solid Dark Navy Base segment (Right/Bottom-Right quadrant) */}
              <circle cx="28" cy="30" r="18" fill="url(#centroid-slice-dark)" />
              {/* Bright Red Segment (Left/Upper-Left quadrant) */}
              <path d="M 28 30 L 10 30 A 18 18 0 0 1 28 12 Z" fill="url(#centroid-slice-red)" />
              {/* Sky Blue Segment (Bottom-Left quadrant) */}
              <path d="M 28 30 L 28 48 A 18 18 0 0 1 10 30 Z" fill="url(#centroid-slice-cyan)" />
              {/* White center axle highlight */}
              <circle cx="28" cy="30" r="1.8" fill="#ffffff" />
            </g>

            {/* Typography perfectly sized and kerned */}
            <text x="58" y="32" fill="#0ea5e9" fontFamily="system-ui, -apple-system, sans-serif" fontSize="24" fontWeight="700" letterSpacing="-0.01em">Centroid</text>
            <text x="59" y="46" fill="#e5e5e5" fontFamily="system-ui, -apple-system, sans-serif" fontSize="9" fontWeight="800" letterSpacing="0.32em">SOLUTIONS</text>
          </g>
        </svg>
      ),
    },
    {
      id: "toolsforbrokers",
      node: (
        <svg
          className="w-auto h-[44px] object-contain transition-transform duration-300"
          viewBox="0 0 280 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Tools For Brokers"
        >
          <defs>
            <linearGradient id="tfb-cyan-solid" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>

          <g transform="translate(5, 0)">
            {/* High Quality Aquamarine Ring Visual Element */}
            <g transform="translate(2, 0)">
              <path d="M 28 15 A 15 15 0 1 0 43 30" stroke="url(#tfb-cyan-solid)" strokeWidth="6.5" strokeLinecap="round" fill="none" />
              <circle cx="28" cy="30" r="5.2" fill="#06b6d4" />
              {/* Aquamarine outer accent detail path */}
              <path d="M 28 11 Q 40 11 41 23" stroke="#22d3ee" strokeWidth="4.2" strokeLinecap="round" fill="none" />
            </g>

            {/* Condensed high contrast brand typography match */}
            <text x="60" y="37" fill="#FFFFFF" fontFamily="'Arial Black', 'Helvetica Neue', 'Impact', sans-serif" fontSize="19" fontWeight="900" letterSpacing="-0.04em">TOOLS FOR BROKERS</text>
          </g>
        </svg>
      ),
    },
    {
      id: "techysquad",
      // White-background brand mark: presented on a light chip so it reads cleanly on the dark card.
      node: (
        <div className="bg-white rounded-lg px-5 py-3.5 flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.45)] ring-1 ring-white/10">
          <img
            src="/partners/techysquad.png"
            alt="TechySquad"
            loading="lazy"
            className="h-[40px] w-auto object-contain"
          />
        </div>
      ),
    },
  ];

  // Duplicate the list so the marquee can loop seamlessly (CSS translateX 0% -> -50%).
  const marqueeLogos = [...partnerLogos, ...partnerLogos];

  // Shared premium card chrome reused for every logo in the running marquee.
  const renderCard = (logo: { id: string; node: React.ReactNode }, key: React.Key) => (
    <div
      key={key}
      className="relative cursor-pointer group rounded-xl border border-[#caa260]/12 bg-[#040404] h-40 w-[240px] sm:w-[280px] shrink-0 transition-all duration-300 shadow-[0_1px_12px_rgba(0,0,0,0.8)] hover:border-[#caa260]/40 hover:shadow-[0_0_25px_rgba(202,162,96,0.25)] hover:-translate-y-1"
    >
      {/* Top gold border center-aligned specular flare */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-[1.5px] bg-gradient-to-r from-transparent via-[#ffd990]/80 to-transparent opacity-40 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300 shadow-[0_0_8px_rgba(202,162,96,0.6)]" />

      {/* Bottom gold border center-aligned specular flare */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-24 h-[1.5px] bg-gradient-to-r from-transparent via-[#ffd990]/80 to-transparent opacity-40 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300 shadow-[0_0_8px_rgba(202,162,96,0.6)]" />

      {/* Slow ambient gold light border sweep wrapper */}
      <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
        <div className="absolute -inset-[100%] bg-[conic-gradient(from_0deg,transparent_40%,rgba(202,162,96,0.1)_50%,transparent_60%)] animate-[spin_10s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Soft card inner-glow */}
        <div className="absolute inset-0 bg-[#caa260]/[0.01] group-hover:bg-[#caa260]/[0.03] transition-colors duration-300" />
      </div>

      {/* Logo */}
      <div className="w-full h-full flex items-center justify-center p-6">
        {logo.node}
      </div>
    </div>
  );

  return (
    <section id="technology-partners" className="relative py-32 bg-[#020202] overflow-hidden">

      <AnimatedTrendBackground />

      {/* 1. Subtle gold particle/grid texture background perfectly matched */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05] z-0"
        style={{
          backgroundImage: `radial-gradient(#caa260 1px, transparent 1px)`,
          backgroundSize: "32px 32px"
        }}
      />

      {/* 2. Low-opacity ambient gradients & glowing lighting accents from the original image */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-[#caa260]/10 to-transparent blur-[130px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[400px] bg-[#caa260]/3 blur-[160px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[400px] bg-[#fbbf24]/3 blur-[160px] rounded-full pointer-events-none z-0" />
      {/* Soft center glow beneath the heading */}
      <div className="absolute top-[22%] left-1/2 -translate-x-1/2 w-[300px] h-[100px] bg-[#caa260]/15 blur-[60px] rounded-full pointer-events-none z-0 animate-pulse duration-[8000ms]" />
      {/* Elegant gold lighting accent under the cards */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[900px] h-[200px] bg-[#caa260]/8 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 z-10">

        {/* SECTION HEADER */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: ANIMATION_VARIANTS.ctaZoomOut.hidden,
            visible: {
              ...ANIMATION_VARIANTS.ctaZoomOut.visible,
              transition: {
                ...ANIMATION_VARIANTS.ctaZoomOut.visible.transition,
                staggerChildren: 0.12,
              }
            }
          }}
          viewport={{ once: true, margin: "-100px", amount: 0.15 }}
          className="text-center max-w-4xl mx-auto mb-20 relative"
          style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
        >

          {/* Small Top Label: TRUSTED INTEGRATIONS */}
          <motion.div
            variants={{
              hidden: ANIMATION_VARIANTS.heading.hidden,
              visible: { ...ANIMATION_VARIANTS.heading.visible, transition: { duration: TRANSITIONS.duration.heading, ease: TRANSITIONS.ease } }
            }}
            className="cinematic-reveal inline-flex items-center gap-4 mb-5 font-sans font-medium hover:scale-[1.02] transition-transform duration-300 relative z-20"
          >
            {/* Left Decorative Line Accent */}
            <div className="w-10 sm:w-16 h-[1.2px] bg-gradient-to-r from-transparent via-[#caa260]/50 to-[#caa260]/80" />

            {/* Shield Check Icon + Label */}
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-[#ffd900] drop-shadow-[0_0_6px_rgba(202,162,96,0.6)]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 11 2 2 4-4" />
              </svg>
              <span className="text-[11px] sm:text-[12px] font-sans uppercase tracking-[0.25em] font-bold text-[#ffd900] filter brightness-110">
                TRUSTED INTEGRATIONS
              </span>
            </div>

            {/* Right Decorative Line Accent */}
            <div className="w-10 sm:w-16 h-[1.2px] bg-gradient-to-l from-transparent via-[#caa260]/50 to-[#caa260]/80" />
          </motion.div>

          {/* Main Heading: centered bold typography with white & premium gold gradient */}
          <motion.h2
            variants={{
              hidden: ANIMATION_VARIANTS.heading.hidden,
              visible: { ...ANIMATION_VARIANTS.heading.visible, transition: { duration: TRANSITIONS.duration.heading, ease: TRANSITIONS.ease } }
            }}
            whileHover={{ y: -3 }}
            className="cinematic-reveal font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-none text-white cursor-default transition-all duration-300 relative z-20"
          >
            Technology <span className="bg-gradient-to-r from-[#ffe8bf] via-[#d4af37] to-[#aa7c11] bg-clip-text text-transparent">Partners</span>
          </motion.h2>

          {/* Elegant horizontal separator line with glowing gold center lens flare star/spark */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0.3 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl h-[1.2px] bg-gradient-to-r from-transparent via-[#caa260]/60 to-transparent mx-auto mt-8"
          >
            {/* Glowing lens flare spark perfectly centered */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_3px_rgba(255,255,255,1),0_0_22px_8px_rgba(202,162,96,0.95)] z-10 animate-pulse" />
          </motion.div>
        </motion.div>

        {/* LOGO AREA - continuously running marquee of partner logos */}
        <div className="relative w-full mx-auto mb-20">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center justify-center w-full"
              >
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="relative rounded-xl border border-[#caa260]/10 bg-[#060606] h-40 overflow-hidden shadow-[0_1px_12px_rgba(0,0,0,0.5)]">
                    {/* Gold shimmering wave */}
                    <motion.div
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: i * 0.15 }}
                      className="absolute top-0 bottom-0 left-0 w-[150%] z-10"
                      style={{
                        background: 'linear-gradient(90deg, transparent 0%, rgba(202, 162, 96, 0.08) 50%, transparent 100%)'
                      }}
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(202,162,96,0.05)_0%,transparent_70%)] opacity-50" />
                    {/* Placeholder central box */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-10 bg-white/[0.02] rounded border border-white/[0.02]" />
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full overflow-hidden"
              >
                {/* Edge fade masks so logos elegantly dissolve in/out at the section borders */}
                <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#020202] to-transparent z-20 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#020202] to-transparent z-20 pointer-events-none" />

                {/* Running track: pauses on hover so visitors can inspect a logo */}
                <div className="flex w-max gap-6 pr-6 py-4 animate-marquee hover:[animation-play-state:paused]">
                  {marqueeLogos.map((logo, idx) => renderCard(logo, `${logo.id}-${idx}`))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* 3. PREMIUM WAVE/DOT MESH EFFECT NEAR THE BOTTOM */}
      {/* Elegantly absolute-positioned at the bottom with a curve & gold particle mesh design */}
      <div className="absolute bottom-0 left-0 right-0 h-44 overflow-hidden pointer-events-none z-0 mt-16 select-none opacity-[0.95]">
        <svg
          className="absolute bottom-0 w-full h-full text-gold-500/5"
          viewBox="0 0 1440 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* Subtle glowing center ground light accent */}
          <defs>
            <radialGradient id="bottom-wave-glow" cx="50%" cy="100%" r="60%">
              <stop offset="0%" stopColor="#caa260" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#020202" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect x="0" y="0" width="1440" height="180" fill="url(#bottom-wave-glow)" />

          {/* Golden curved dot matrix rows to recreate the beautiful wavy mesh look at the bottom */}
          {/* Row 1 */}
          <path
            d="M 0 140 Q 360 80 720 120 T 1440 130"
            stroke="url(#dot-gradient-1)"
            strokeWidth="3"
            strokeDasharray="2 14"
            strokeLinecap="round"
          />
          {/* Row 2 */}
          <path
            d="M 0 146 Q 360 86 720 126 T 1440 136"
            stroke="url(#dot-gradient-2)"
            strokeWidth="3.6"
            strokeDasharray="2.5 18"
            strokeLinecap="round"
          />
          {/* Row 3 */}
          <path
            d="M 0 152 Q 360 92 720 132 T 1440 142"
            stroke="url(#dot-gradient-1)"
            strokeWidth="2.2"
            strokeDasharray="1.5 12"
            strokeLinecap="round"
            opacity="0.65"
          />

          <defs>
            <linearGradient id="dot-gradient-1" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#8d6d36" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#caa260" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#8d6d36" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="dot-gradient-2" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#8d6d36" stopOpacity="0.05" />
              <stop offset="50%" stopColor="#caa260" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8d6d36" stopOpacity="0.05" />
            </linearGradient>
          </defs>
        </svg>
      </div>

    </section>
  );
};
