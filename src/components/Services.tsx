import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Icon } from "./Icon";
import { TRANSITIONS, ANIMATION_VARIANTS } from "../lib/animations";

// Fully configured service structure mapped exactly to the required layout
const servicesList = [
  {
    index: "01",
    id: "mt5_solutions",
    title: "MT5 Admin Solutions",
    description: "Unlock full command over your trading environments with customized plugins, real-time control pathways, and highly-optimized server configurations.",
    features: [
      "Symbol Configuration",
      "Group Management",
      "Leverage Profiles",
      "Routing Rules",
      "Reporting Infrastructure"
    ],
    metric: {
      label: "EXECUTION LATENCY",
      value: "< 0.12 ms"
    },
    iconName: "Settings2"
  },
  {
    index: "02",
    id: "server_management",
    title: "Server Management",
    description: "Deploy in prestigious ultra-low latency financial datacenters including NY4, LD4, and TY3 with secure physical rack redundant clustering.",
    features: [
      "NY4, LD4, TY3 Hosting",
      "Virtualization & Hardware",
      "Triple-Node Failover",
      "Latency Route Tuning",
      "24/7/365 Monitoring"
    ],
    metric: {
      label: "INFRASTRUCTURE SLA",
      value: "99.999% Uptime"
    },
    iconName: "Server"
  },
  {
    index: "03",
    id: "bridge_integration",
    title: "Bridge & Gateway Integration",
    description: "Configure high-speed STP aggregation systems that seamlessly link customized pricing engines to global top-tier liquidity providers.",
    features: [
      "Ultra-fast STP Bridges",
      "Aggregation Engine Setup",
      "Liquidity Pool Routing",
      "Fix API Routing Rules",
      "Multi-Asset Pricing"
    ],
    metric: {
      label: "ROUTING SPEED",
      value: "Sub-millisecond"
    },
    iconName: "GitMerge"
  },
  {
    index: "04",
    id: "risk_management",
    title: "Risk Management",
    description: "Establish real-time margin buffers, multi-book allocation equations, and automated hedging shields designed to patch toxic order flows.",
    features: [
      "Dynamic Margin Buffers",
      "Exposure Calculators",
      "A-Book / B-Book Allocation",
      "Real-time STP Hedging",
      "Toxic Flow Shields"
    ],
    metric: {
      label: "RISK TOLERANCE",
      value: "Zero Leakage"
    },
    iconName: "Scale"
  },
  {
    index: "05",
    id: "training_support",
    title: "Training & Support",
    description: "Acquire full operational mastery through rigorous technical back-office bootcamps and live systems sandbox debugging guided by specialists.",
    features: [
      "Back-Office Handlers Support",
      "MetaTrader Admin Bootcamps",
      "Risk Limits Configuration",
      "Sandbox Testing Practice",
      "24/7 SLA Engineering"
    ],
    metric: {
      label: "SUPPORT RESOLUTION",
      value: "< 5 mins Response"
    },
    iconName: "GraduationCap"
  }
];

// Lightweight CSS/SVG accent on the right side of the section. Pure compositor
// transforms — no GPU render loop. Concentric gold rings rotate; the centre
// shows the active service's icon. (Replaced an earlier Three.js morph that
// caused hover lag on weaker GPUs — see git history if you want it back.)
const ServicesCSSAccent: React.FC<{ activeIndex: number }> = React.memo(({ activeIndex }) => {
  const active = servicesList[activeIndex] || servicesList[0];
  return (
    <div className="relative w-[320px] h-[320px] flex items-center justify-center">
      <div className="absolute inset-0 rounded-full border border-[#d4a02a]/15 animate-[spin_30s_linear_infinite]" />
      <div className="absolute inset-[12%] rounded-full border border-[#d4a02a]/20 animate-[spin_22s_linear_infinite_reverse]" />
      <div className="absolute inset-[26%] rounded-full border border-dashed border-[#ffd900]/20 animate-[spin_16s_linear_infinite]" />
      <div className="absolute inset-[40%] rounded-full border border-[#d4a02a]/25 animate-[spin_12s_linear_infinite_reverse]" />
      {/* soft gold glow behind the icon */}
      <div className="absolute inset-[32%] rounded-full bg-[radial-gradient(circle_at_center,rgba(212,160,42,0.14)_0%,transparent_70%)] blur-md animate-[pulse_4s_ease-in-out_infinite]" />
      {/* centre icon reflects the active service; remounts (key) for a clean swap */}
      <div
        key={active.id}
        className="relative z-10 text-[#ffd900] drop-shadow-[0_0_10px_rgba(255,217,0,0.5)] transition-transform duration-500"
      >
        <Icon name={active.iconName} size={42} />
      </div>
    </div>
  );
});
ServicesCSSAccent.displayName = "ServicesCSSAccent";

export const Services: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Hover states tracking
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0); // First open as default

  // Cursor spark + spotlight glow are written straight to the DOM via refs.
  // Driving them through React state would re-render the whole section on every
  // mousemove frame; direct style writes keep the effect with zero re-renders.
  const rowMoveTicking = useRef(false);
  const [rowHoveredMap, setRowHoveredMap] = useState<{ [key: number]: boolean }>({});
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const glowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sparkRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Mobile/touch only: open each service as it scrolls to the viewport center
  // (no hover on touch, so clicking felt clunky). Desktop keeps hover/click.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: coarse)").matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = entry.target.getAttribute("data-row-index");
            if (idx !== null) setActiveIndex(parseInt(idx, 10));
          }
        });
      },
      { root: null, rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );
    rowRefs.current.forEach((r) => { if (r) observer.observe(r); });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const winHeight = window.innerHeight;
      
      const start = winHeight * 0.85;
      const end = winHeight * 0.15;
      const range = rect.height + (start - end);
      const scrolled = start - rect.top;
      
      const progress = Math.max(0, Math.min(1, scrolled / range));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleRowMouseMove = (idx: number, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // Throttle to one DOM write per animation frame. No setState -> no re-render.
    if (rowMoveTicking.current) return;
    rowMoveTicking.current = true;
    requestAnimationFrame(() => {
      rowMoveTicking.current = false;
      // Position via transform (compositor) not left/top (which repaints the
      // large blurred glow region every frame). translate3d promotes a GPU layer.
      const glow = glowRefs.current[idx];
      if (glow) glow.style.transform = `translate3d(${x - 150}px, ${y - 150}px, 0)`;
      const spark = sparkRefs.current[idx];
      if (spark) spark.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
  };

  const activeSegmentIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;

  // sequential entrance row animation parameters
  const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07, // tight, synced stagger reveal sequence
      },
    },
  };

  const rowItemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const, // Custom luxury institutional curve
      },
    },
  };

  return (
    <section 
      id="services" 
      ref={containerRef}
      className="relative py-28 bg-[#040405] overflow-hidden px-4 select-none"
    >
      {/* Background radial soft aura glow */}
      <div className="absolute top-1/2 left-1/3 w-[550px] h-[550px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.02)_0%,transparent_70%)] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-14 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: ANIMATION_VARIANTS.sectionTitle.hidden,
              visible: { ...ANIMATION_VARIANTS.sectionTitle.visible, transition: { duration: TRANSITIONS.duration.heading, ease: TRANSITIONS.ease } }
            }}
            viewport={{ once: true, margin: "-100px", amount: 0.2 }}
            className="cinematic-reveal cursor-default"
          >
            <span className="text-xs font-mono font-medium tracking-widest text-[#caa260] uppercase">
              PLUGINS & INTEGRATION
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-5xl font-extrabold text-[#FCFCFC] tracking-tight mt-2 text-glow-light">
              Services
            </h2>
          </motion.div>
        </div>

        {/* Master Double-Split Layout (Left: Row Accordion Lists | Right: Rotating Gold Accent) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative pb-8 mt-4">
          
          {/* LEFT SECTION (Grows tracking line & houses service items) */}
          <div className="lg:col-span-8 relative">
            
            {/* Scroll-driven Gold Tracking Line on left gutter */}
            <div className="absolute left-4 md:left-6 top-6 bottom-6 w-[2px] bg-white/[0.04] rounded-full pointer-events-none z-0">
              <motion.div 
                className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#d4a02a] via-[#ffd900] to-transparent origin-top shadow-[0_0_10px_rgba(255,217,0,0.5)] rounded-full"
                style={{ height: `${scrollProgress * 100}%` }}
              />
            </div>

            {/* List sequence */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={listContainerVariants}
              className="space-y-4 md:space-y-5"
            >
              {servicesList.map((srv, idx) => {
                const isActive = activeIndex === idx;
                const isHovered = hoveredIndex === idx;
                const isRowHover = rowHoveredMap[idx] || false;

                return (
                  <motion.div
                    key={srv.id}
                    ref={(el) => { rowRefs.current[idx] = el; }}
                    data-row-index={idx}
                    variants={rowItemVariants}
                    onMouseEnter={() => {
                      setHoveredIndex(idx);
                      setRowHoveredMap((prev) => ({ ...prev, [idx]: true }));
                      setActiveIndex(idx);
                    }}
                    onMouseLeave={() => {
                      setHoveredIndex(null);
                      setRowHoveredMap((prev) => ({ ...prev, [idx]: false }));
                    }}
                    onMouseMove={(e) => handleRowMouseMove(idx, e)}
                    className={`relative z-10 ml-10 md:ml-14 rounded-xl border transition-colors duration-300 overflow-hidden cursor-pointer [contain:content] ${
                      isActive 
                        ? "bg-[#0b0b0d] border-[#d4a02a]/25 shadow-[0_0_24px_rgba(212,160,42,0.04)]" 
                        : "bg-stone-900/30 border-white/5 hover:border-[#caa260]/18"
                    }`}
                  >
                    
                    {/* Spotlight Glass Sweep that follows pointer hover locally */}
                    {isRowHover && (
                      <div
                        ref={(el) => { glowRefs.current[idx] = el; }}
                        className="absolute left-0 top-0 pointer-events-none rounded-full bg-[radial-gradient(circle_at_center,rgba(212,160,42,0.07)_0%,transparent_68%)] blur-[18px] will-change-transform"
                        style={{
                          width: "300px",
                          height: "300px",
                          transform: "translate3d(-9999px, -9999px, 0)",
                        }}
                      />
                    )}

                    {/* Highly discreet micro-interactive gold ripple Spark inside spotlight bounds */}
                    {isRowHover && (
                      <div
                        ref={(el) => { sparkRefs.current[idx] = el; }}
                        className="absolute left-0 top-0 w-1.5 h-1.5 rounded-full bg-[#ffd900] blur-[1px] pointer-events-none mix-blend-screen opacity-40 shadow-[0_0_8px_#ffd900] will-change-transform"
                        style={{
                          transform: "translate3d(-9999px, -9999px, 0)",
                          transition: "transform 0.15s ease-out"
                        }}
                      />
                    )}

                    {/* Gold left-edge sweep gradient strip */}
                    <div className={`absolute top-0 left-0 h-full w-[4px] bg-gradient-to-b from-[#ffd900] via-[#d4a02a] to-transparent transition-transform duration-300 origin-top z-20 ${isHovered || isActive ? "scale-y-100" : "scale-y-0"}`} />

                    {/* Main Row Block Header — fixed padding; the slide-in below is
                        a composited transform (animating paddingLeft would reflow). */}
                    <div className="flex items-center justify-between p-5 md:p-6 pl-7 select-none relative z-10">
                      
                      <div className="flex items-center gap-5 md:gap-6 min-w-0 transition-transform duration-300" style={{ transform: isHovered || isActive ? "translateX(6px)" : "translateX(0px)" }}>
                        {/* Brighter index on hover — CSS scale/color transition (no JS) */}
                        <span
                          className={`font-mono text-sm md:text-base font-bold transition-all duration-300 will-change-transform inline-block ${
                            isHovered || isActive ? "text-[#ffd900] scale-110" : "text-[#caa260]/60 scale-100"
                          }`}
                        >
                          {srv.index}
                        </span>
                        
                        <span className={`text-lg md:text-xl font-display font-semibold transition-colors duration-300 tracking-tight ${
                          isHovered || isActive ? "text-[#ffd900]" : "text-white"
                        }`}>
                          {srv.title}
                        </span>
                      </div>

                      {/* Sliding right Arrow with -45deg rotation — CSS transform (no JS) */}
                      <div
                        className={`transition-all duration-300 ease-out will-change-transform ${
                          isHovered || isActive
                            ? "text-[#ffd900] drop-shadow-[0_0_6px_#ffd900] translate-x-2 -rotate-45"
                            : "text-stone-500 translate-x-0 rotate-0"
                        }`}
                      >
                        <Icon name="ArrowRight" size={18} />
                      </div>
                    </div>

                    {/* EXPANDED DETAIL ACCORDION PANEL — height snaps via grid-rows
                        (0fr/1fr) in a single reflow; the content reveal is a composited
                        opacity + translateY fade, so opening writes no per-frame layout. */}
                    <div
                      className="grid"
                      style={{ gridTemplateRows: isActive ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden min-h-0">
                        <div
                          className="border-t border-white/[0.04] bg-[#0c0c0e]/85 transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none"
                          style={{
                            opacity: isActive ? 1 : 0,
                            transform: isActive ? "translateY(0)" : "translateY(-6px)",
                          }}
                        >
                          <div className="p-6 md:p-7 relative select-text z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                            
                            {/* Short desc & bullet points */}
                            <div className="md:col-span-8 space-y-4">
                              <p className="font-sans font-light text-stone-300 leading-relaxed text-sm">
                                {srv.description}
                              </p>

                              {/* Multi bullet elements */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                                {srv.features.map((bullet, bulletIdx) => (
                                  <div key={bulletIdx} className="flex items-center gap-2.5 text-stone-400 text-[12px]">
                                    <Icon name="CheckCircle2" size={13} className="text-[#ffd900] flex-shrink-0" />
                                    <span>{bullet}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Operational Metric block */}
                            <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-white/5 pt-5 md:pt-0 md:pl-6 flex flex-col justify-center space-y-3 font-mono text-[11px] text-stone-400 w-full">
                              <div className="bg-stone-900/40 p-3.5 border border-white/5 rounded-lg space-y-2">
                                <div>
                                  <span className="text-stone-500 block mb-0.5 uppercase tracking-widest leading-[1]">
                                    {srv.metric.label}
                                  </span>
                                  <span className="text-lg font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-400">
                                    {srv.metric.value}
                                  </span>
                                </div>
                                <div className="border-t border-white/5 pt-2">
                                  <span className="text-stone-500 block mb-0.5 uppercase tracking-widest leading-[1]">
                                    ENGINE COMPATIBILITY
                                  </span>
                                  <span className="text-white font-medium">MT4/MT5 Server API</span>
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </motion.div>

          </div>

          {/* RIGHT SECTION (Faint rotating gold accent for the active service) */}
          <div className="lg:col-span-4 h-[450px] hidden lg:flex items-center justify-center pointer-events-none select-none">

            {/* Soft background golden aura */}
            <div className="absolute w-[360px] h-[360px] rounded-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06)_0%,transparent_70%)] blur-[40px]" />

            <ServicesCSSAccent activeIndex={activeSegmentIndex} />

          </div>

        </div>

        {/* Mobile background accent — CSS only. */}
        <div className="absolute inset-0 block lg:hidden pointer-events-none opacity-20 z-0 select-none overflow-hidden h-[300px] sm:h-[400px] top-[20%] flex items-center justify-center">
          <ServicesCSSAccent activeIndex={activeSegmentIndex} />
        </div>

      </div>

      {/* Vertical grid system continuity line down */}
      <div className="mt-16 flex flex-col items-center">
        <div className="w-[1px] h-14 bg-gradient-to-b from-[#1C1B1A] to-transparent" />
      </div>
    </section>
  );
};
