import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { 
  Network, 
  TrendingUp, 
  Link2, 
  ShieldCheck, 
  Layers 
} from "lucide-react";

interface JourneyStep {
  id: string;
  mode: "infrastructure" | "trading" | "liquidity" | "risk" | "unified";
  num: string;
  title: string;
  subtitle: string;
  desc: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  stats: { label: string; value: string }[];
}

// Build a smooth curve that passes through every node, bulging to alternating
// sides between consecutive nodes (always rightward on mobile to stay in frame).
const buildSmoothPath = (pts: { x: number; y: number }[], isMobile: boolean): string => {
  if (pts.length < 2) return "";
  // Mobile: amp 0 → a clean straight vertical timeline line. Desktop keeps the curved spine.
  const amp = isMobile ? 0 : 54;
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i];
    const p1 = pts[i + 1];
    const dir = isMobile ? 1 : i % 2 === 0 ? 1 : -1;
    const c1x = p0.x + dir * amp;
    const c1y = p0.y + (p1.y - p0.y) / 3;
    const c2x = p1.x + dir * amp;
    const c2y = p0.y + (2 * (p1.y - p0.y)) / 3;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
  }
  return d;
};

export const EcosystemJourney: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [pathD, setPathD] = useState<string>("");
  const [trackSize, setTrackSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  // Drives mobile-only spine styling (kept in sync via the measure() resize listener below).
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const steps: JourneyStep[] = [
    {
      id: "journey-infra",
      mode: "infrastructure",
      num: "01",
      title: "Infrastructure Layer",
      subtitle: "Enterprise Backbone & NY4/LD4 Datacenters",
      desc: "Establish low-latency co-location channels physically interconnected with major institutions in NYC (NY4) and London (LD4). 4XBO configures bare-metal hardware and proprietary fiber networks for continuous redundancy, eliminating weak links.",
      icon: Network,
      stats: [
        { label: "Transit Latency", value: "<0.12ms" },
        { label: "Physical SLA", value: "99.999%" }
      ]
    },
    {
      id: "journey-trading",
      mode: "trading",
      num: "02",
      title: "Trading Platform Layer",
      subtitle: "MT5 Orchestration & Speed Control",
      desc: "Maintain absolute authority over trade matching, server hygiene, and order execution pathways. Streamline symbols, group settings, custom manager access, and dealer assistants under intense volume peaks.",
      icon: TrendingUp,
      stats: [
        { label: "Active Threads", value: "24,000/sec" },
        { label: "Server Hygiene", value: "100% Auto" }
      ]
    },
    {
      id: "journey-liquidity",
      mode: "liquidity",
      num: "03",
      title: "Liquidity Routing",
      subtitle: "Smart Order Bridges & Gateways",
      desc: "Connect securely to premier institutional liquidity providers. Support hyper-optimized Centroid and PrimeXM bridge setups, custom order books mapping, and intelligent A/B book split control systems.",
      icon: Link2,
      stats: [
        { label: "Bridge Sync", value: "Dual Engine" },
        { label: "LP Connect", value: "35+ Globals" }
      ]
    },
    {
      id: "journey-risk",
      mode: "risk",
      num: "04",
      title: "Risk Management & Shield",
      subtitle: "Volumetric Attack Protection & Exposure Guard",
      desc: "Shield database nodes with real-time risk checks, auto-adjustments supervision, and smart DDoS mitigation. Live multi-tier dashboards expose volume aggregates, margin calls, and rogue account activity instantaneously.",
      icon: ShieldCheck,
      stats: [
        { label: "Scan Freq", value: "Sub-millisecond" },
        { label: "Shield Rating", value: "Tier 1 Def" }
      ]
    },
    {
      id: "journey-unified",
      mode: "unified",
      num: "05",
      title: "Unified Ecosystem Core",
      subtitle: "Total Synchronous Command Hub",
      desc: "Bind every functional node into a highly integrated, sovereign technical command center. 4XBO abstracts infrastructure complications completely, allowing brokers to prioritize volume gains and target conversion scaling.",
      icon: Layers,
      stats: [
        { label: "Node Control", value: "Universal" },
        { label: "Command Latency", value: "0ms Relative" }
      ]
    }
  ];

  useEffect(() => {
    // Zero-lag continuous scroll-based line progress tracking
    let rafId = 0;
    let ticking = false;
    const calculateProgress = () => {
      // Coalesce bursts of scroll events into a single rAF per frame.
      if (ticking) return;
      ticking = true;
      rafId = window.requestAnimationFrame(() => {
        ticking = false;
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Start tracking when section is 20% from bottom of viewport, finish near the top
        const triggerStart = viewportHeight * 0.8;
        const triggerEnd = viewportHeight * 0.2;

        const totalDistance = rect.height - (triggerStart - triggerEnd);
        const scrolled = -rect.top + triggerStart;

        let progress = scrolled / totalDistance;
        progress = Math.max(0, Math.min(1, progress));
        setScrollProgress(progress);
      });
    };

    // Fast and performant view intersection observer to highlight current step
    // Zero-height trigger line at the exact viewport center: only one layer can
    // contain it at a time, so each becomes active cleanly with no overlap race
    // (a band let two adjacent layers fight, delaying the next one's glow).
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const indexAttr = entry.target.getAttribute("data-step-index");
          if (indexAttr !== null) {
            setActiveIndex(parseInt(indexAttr, 10));
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    window.addEventListener("scroll", calculateProgress, { passive: true });
    window.addEventListener("resize", calculateProgress, { passive: true });
    
    // Quick initial call to sync current page position
    const timeoutId = setTimeout(() => {
      calculateProgress();
    }, 100);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", calculateProgress);
      window.removeEventListener("resize", calculateProgress);
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
  }, []);

  // Measure node positions and build the curved spine that threads through them.
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const tr = track.getBoundingClientRect();
      const pts = nodeRefs.current
        .map((n) => {
          if (!n) return null;
          const r = n.getBoundingClientRect();
          return { x: r.left + r.width / 2 - tr.left, y: r.top + r.height / 2 - tr.top };
        })
        .filter((p): p is { x: number; y: number } => p !== null);
      if (pts.length < 2) return;
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setTrackSize({ w: tr.width, h: tr.height });
      setPathD(buildSmoothPath(pts, mobile));
    };

    measure();
    const t1 = setTimeout(measure, 200);
    const t2 = setTimeout(measure, 600);
    // Debounce resize so measure() isn't hammered during continuous resizing.
    let resizeId = 0;
    const onResize = () => {
      clearTimeout(resizeId);
      resizeId = window.setTimeout(measure, 150);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeId);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative bg-[#020202] py-24 sm:py-36 px-4 md:px-8 overflow-hidden select-none border-b border-white/5"
    >
      {/* Premium ambient glows */}
      <div className="absolute inset-0 grid-bg-overlay opacity-[0.08] pointer-events-none" />
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-amber-500/[0.04] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Dynamic Header Block with dramatic design */}
        <div className="max-w-3xl mx-auto text-center mb-14 md:mb-32">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-gold-400/5 border border-gold-400/15 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-[10px] font-mono font-black tracking-[0.25em] text-gold-400 uppercase">
              Operational Sequence
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6">
            Architectural Layers
          </h2>
          <p className="font-sans font-light text-stone-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Take a synchronous walk through our custom broker infrastructure framework. Built with absolute redundancy and ultra-low internal latency routing.
          </p>
        </div>

        {/* Master Interactive Vertical Timeline Tracks */}
        <div ref={trackRef} className="relative mt-8 md:mt-24">

          {/* Gold curved spine threaded through every layer node, drawn on scroll */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
            style={{ zIndex: 0 }}
            viewBox={`0 0 ${trackSize.w || 1} ${trackSize.h || 1}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="eco-zz-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#facc15" />
                <stop offset="50%" stopColor="#d4af37" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
            {/* Faint full route underneath */}
            <path
              d={pathD}
              fill="none"
              stroke="rgba(202,162,96,0.12)"
              strokeWidth={isMobile ? 3 : 2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Gold route drawn proportionally to scroll progress (bolder + brighter glow on mobile) */}
            <path
              d={pathD}
              fill="none"
              stroke="url(#eco-zz-grad)"
              strokeWidth={isMobile ? 4 : 2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - scrollProgress}
              style={{
                filter: isMobile
                  ? "drop-shadow(0 0 10px rgba(212,160,42,0.95))"
                  : "drop-shadow(0 0 6px rgba(212,160,42,0.8))",
                transition: "stroke-dashoffset 75ms ease-out",
              }}
            />
          </svg>

          {/* Sequential Story Elements */}
          <div className="space-y-14 md:space-y-36 relative z-10">
            {steps.map((step, idx) => {
              const isCurrent = idx === activeIndex;
              const IconComponent = step.icon;
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={step.id}
                  id={step.id}
                  data-step-index={idx}
                  ref={(el) => { stepRefs.current[idx] = el; }}
                  className={`relative w-full transition-all duration-700 ease-out flex flex-col md:flex-row ${
                    isCurrent ? "opacity-100" : "opacity-60 md:opacity-35 blur-[0.4px]"
                  } ${isEven ? "md:justify-start" : "md:justify-end"}`}
                >
                  
                  {/* DRAMATIC FLOATING TIMELINE NODE POINT */}
                  {/* Left-aligned on mobile, central on desktop */}
                  <div
                    ref={(el) => { nodeRefs.current[idx] = el; }}
                    className={`absolute left-0 sm:left-1 md:left-1/2 md:-translate-x-1/2 top-4 flex items-center justify-center z-20`}
                  >
                    <div className="relative flex items-center justify-center">
                      <div 
                        className={`h-10 w-10 sm:h-12 sm:w-12 rounded-full border flex items-center justify-center transition-all duration-500 ${
                          isCurrent 
                            ? "border-gold-400 bg-black text-gold-400 shadow-[0_0_25px_rgba(212,175,55,0.35)] scale-110" 
                            : "border-stone-800 bg-[#070709] text-stone-500"
                        }`}
                      >
                        <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-500" />
                      </div>

                      {/* Ripple pulse wave beacon radiating outward */}
                      {isCurrent && (
                        <div className="absolute inset-0 border border-gold-400/40 rounded-full animate-ping pointer-events-none" />
                      )}
                    </div>
                  </div>

                  {/* MASTER STORY CONTENT CONTAINER CARD */}
                  <div className={`ml-14 sm:ml-20 md:ml-0 md:w-[44%] transition-all duration-500 ${
                    isEven ? "md:pr-8" : "md:pl-8"
                  }`}>

                    <div className={`p-3 sm:p-5 md:p-8 border bg-[#060608]/90 backdrop-blur-md rounded-none relative transition-all duration-700 flex flex-col justify-between ${
                      isCurrent
                        ? "border-gold-500/40 md:border-gold-500/30 shadow-[0_4px_30px_rgba(212,175,55,0.16)] md:shadow-[0_4px_35px_rgba(212,175,55,0.06)] bg-[#0a0a0d]"
                        : "border-white/5 hover:border-white/10"
                    }`}>
                      
                      {/* Geometric cyber corners overlay */}
                      {isCurrent && (
                        <>
                          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gold-400" />
                          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-gold-400" />
                          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-gold-400" />
                          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gold-400" />
                        </>
                      )}

                      <div>
                        {/* Header metadata tag line */}
                        <div className={`flex items-center justify-between mb-3 md:mb-5 w-full ${
                          isEven ? "md:flex-row" : "md:flex-row-reverse"
                        }`}>
                          <span className={`font-mono text-[10px] md:text-xs font-black tracking-widest px-2.5 py-1 uppercase transition-all duration-500 ${
                            isCurrent 
                              ? "text-gold-400 bg-gold-400/10 border border-gold-400/20" 
                              : "text-stone-500 bg-white/5 border border-white/5"
                          }`}>
                            LAYER {step.num}
                          </span>
                          <span className="font-mono text-[8px] tracking-wider text-stone-500 uppercase">
                            {isCurrent ? "ACTIVE SEQUENCE" : "STANDBY"}
                          </span>
                        </div>

                        {/* Title text */}
                        <h3 className={`font-display text-base sm:text-2xl md:text-3xl font-extrabold tracking-tight mb-2 transition-all duration-500 ${
                          isCurrent ? "text-white text-glow-light" : "text-stone-300"
                        }`}>
                          {step.title}
                        </h3>

                        {/* Subtitle tag line */}
                        <span className="font-mono text-[9px] sm:text-[10px] md:text-[11px] text-stone-400 tracking-wider block mb-3 md:mb-5 uppercase">
                          {step.subtitle}
                        </span>

                        {/* Descriptive Paragraph text */}
                        <p
                          className={`font-sans font-light text-[11px] sm:text-sm md:text-base leading-relaxed mb-4 md:mb-6 transition-all duration-500 ${
                            isCurrent ? "text-stone-200" : "text-stone-300"
                          }`}
                          style={isCurrent ? { textShadow: "0 0 12px rgba(212,175,55,0.75), 0 0 26px rgba(212,175,55,0.45)" } : undefined}
                        >
                          {step.desc}
                        </p>
                      </div>

                      {/* Premium Stats grids matching layout symmetry */}
                      <div>
                        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
                          {step.stats.map((stat, sIdx) => (
                            <div 
                              key={sIdx}
                              className={`p-2 sm:p-3 border rounded-none flex flex-col justify-center items-start transition-all duration-300 ${
                                isCurrent 
                                  ? "border-gold-500/20 bg-[#0f0f13]/90" 
                                  : "border-white/5 bg-[#08080a]/90"
                              }`}
                            >
                              <span className="text-stone-500 font-mono text-[8.5px] uppercase tracking-wider mb-1 block">
                                {stat.label}
                              </span>
                              <span className="text-gold-400 font-display text-xs sm:text-sm md:text-base font-black tracking-tight leading-none">
                                {stat.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
