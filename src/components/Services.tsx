import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import * as THREE from "three";
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

// Faint Gold Wireframe morphing WebGL Scene on the background/side
const ServicesWebGLGlobe: React.FC<{ activeIndex: number }> = ({ activeIndex }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth || 420;
    const height = container.clientHeight || 450;

    // SCENE & TRANSPARENT BG
    const scene = new THREE.Scene();

    // CAMERA
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.z = 8.5;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // GENERAL WIREFRAME MATERIALS (Dull Gold & Bright Gold Glow)
    const baseColor = new THREE.Color("#d4a02a");
    
    // Create pre-created distinct structural wireframes matching each service block
    const shapesGroup = new THREE.Group();
    scene.add(shapesGroup);

    const meshes: THREE.LineSegments[] = [];

    // Helper to wrap wireframe line segments around mesh geometry
    const createWireSegment = (geo: THREE.BufferGeometry) => {
      const wire = new THREE.WireframeGeometry(geo);
      const mat = new THREE.LineBasicMaterial({
        color: baseColor,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
      });
      const segment = new THREE.LineSegments(wire, mat);
      shapesGroup.add(segment);
      meshes.push(segment);
      return segment;
    };

    // Shape 0: Sphere (MT5 Admins Configuration)
    const geo0 = new THREE.IcosahedronGeometry(1.8, 2);
    createWireSegment(geo0);

    // Shape 1: Box / Rack (Server Management)
    const geo1 = new THREE.BoxGeometry(1.5, 1.5, 1.5, 3, 3, 3);
    createWireSegment(geo1);

    // Shape 2: Torus Knot (STP Bridge Gateway)
    const geo2 = new THREE.TorusKnotGeometry(1.0, 0.28, 64, 12);
    createWireSegment(geo2);

    // Shape 3: Octahedron Double-Pyramid (Risk Protection)
    const geo3 = new THREE.OctahedronGeometry(1.7, 1);
    createWireSegment(geo3);

    // Shape 4: Open Orbit Helix Ring (Institutional Trainings)
    const geo4 = new THREE.TorusGeometry(1.4, 0.22, 10, 48);
    createWireSegment(geo4);

    // Faint subtle gold background point dust (5 - 10 particles maximum)
    const starsGeo = new THREE.BufferGeometry();
    const starsCount = 8;
    const starsPos = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount; i++) {
      starsPos[i * 3] = (Math.random() - 0.5) * 6;
      starsPos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      starsPos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    starsGeo.setAttribute("position", new THREE.BufferAttribute(starsPos, 3));
    const starsMat = new THREE.PointsMaterial({
      color: new THREE.Color("#ffd900"),
      size: 0.07,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending
    });
    const starPoints = new THREE.Points(starsGeo, starsMat);
    scene.add(starPoints);

    // ANIMATION TICK LOOP
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      
      // Rotate each shape independently to look organic
      meshes.forEach((mesh, idx) => {
        const factor = idx % 2 === 0 ? 1 : -1;
        mesh.rotation.y = elapsedTime * 0.12 * factor;
        mesh.rotation.x = elapsedTime * 0.07 * factor;
        mesh.rotation.z = Math.sin(elapsedTime * 0.08) * 0.15;
      });

      // Overall coordinates tilt space
      shapesGroup.rotation.y = Math.sin(elapsedTime * 0.06) * 0.08;
      shapesGroup.rotation.x = Math.cos(elapsedTime * 0.04) * 0.05;

      // Smoothly blend opacities and scales toward targeted index
      for (let i = 0; i < meshes.length; i++) {
        const isCurrent = i === activeIndex;
        const mat = meshes[i].material as THREE.LineBasicMaterial;
        
        const targetOpacity = isCurrent ? 0.32 : 0.0;
        mat.opacity += (targetOpacity - mat.opacity) * 0.1;

        const targetScale = isCurrent ? 1.0 : 0.72;
        meshes[i].scale.setScalar(
          meshes[i].scale.x + (targetScale - meshes[i].scale.x) * 0.1
        );
      }

      // Drift subtle dust points slowly (recycle if below threshold)
      const positionsArr = starsGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < starsCount; i++) {
        positionsArr[i * 3 + 1] -= 0.0025;
        if (positionsArr[i * 3 + 1] < -3) {
          positionsArr[i * 3 + 1] = 3;
        }
      }
      starsGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      meshes.forEach((mesh) => {
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach(m => m.dispose());
        } else {
          mesh.material.dispose();
        }
      });
      starsGeo.dispose();
      starsMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [activeIndex]);

  return <div ref={mountRef} className="w-full h-full relative" />;
};

export const Services: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Hover states tracking
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0); // First open as default
  
  // Flash gold sweeps on clicks
  const [pulseRowIndex, setPulseRowIndex] = useState<number | null>(null);

  // Mouse coords tracking for local cursor spark and spot glows
  const [cursorCoords, setCursorCoords] = useState<{ [key: number]: { x: number; y: number } }>({});
  const [rowHoveredMap, setRowHoveredMap] = useState<{ [key: number]: boolean }>({});

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
    setCursorCoords((prev) => ({
      ...prev,
      [idx]: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      },
    }));
  };

  const handleRowClick = (idx: number) => {
    setPulseRowIndex(idx);
    setActiveIndex(idx);
    setTimeout(() => {
      setPulseRowIndex(null);
    }, 650);
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

        {/* Master Double-Split Layout (Left: Row Accordion Lists | Right: Morphing WebGL Globe Canvas) */}
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
                const coords = cursorCoords[idx] || { x: 0, y: 0 };

                return (
                  <motion.div
                    key={srv.id}
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
                    className={`relative z-10 ml-10 md:ml-14 rounded-xl border transition-all duration-300 overflow-hidden cursor-pointer ${
                      isActive 
                        ? "bg-[#0b0b0d] border-[#d4a02a]/25 shadow-[0_0_24px_rgba(212,160,42,0.04)]" 
                        : "bg-stone-900/30 border-white/5 hover:border-[#caa260]/18"
                    }`}
                  >
                    
                    {/* Spotlight Glass Sweep that follows pointer hover locally */}
                    {isRowHover && (
                      <div
                        className="absolute pointer-events-none rounded-full bg-[radial-gradient(circle_at_center,rgba(212,160,42,0.07)_0%,transparent_68%)] blur-[25px] transition-opacity duration-300"
                        style={{
                          width: "360px",
                          height: "360px",
                          left: `${coords.x - 180}px`,
                          top: `${coords.y - 180}px`,
                        }}
                      />
                    )}

                    {/* Highly discreet micro-interactive gold ripple Spark inside spotlight bounds */}
                    {isRowHover && (
                      <div 
                        className="absolute w-1.5 h-1.5 rounded-full bg-[#ffd900] blur-[1px] pointer-events-none mix-blend-screen opacity-40 shadow-[0_0_8px_#ffd900]"
                        style={{
                          left: `${coords.x}px`,
                          top: `${coords.y}px`,
                          transition: "left 0.15s ease-out, top 0.15s ease-out"
                        }}
                      />
                    )}

                    {/* Clicking Sweep Pulse Line Overlay */}
                    {pulseRowIndex === idx && (
                      <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ duration: 0.65, ease: "easeOut" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ffd900]/15 to-transparent pointer-events-none z-10"
                      />
                    )}

                    {/* Gold left-edge sweep gradient strip */}
                    <div className={`absolute top-0 left-0 h-full w-[4px] bg-gradient-to-b from-[#ffd900] via-[#d4a02a] to-transparent transition-transform duration-300 origin-top z-20 ${isHovered || isActive ? "scale-y-100" : "scale-y-0"}`} />

                    {/* Main Row Block Header */}
                    <div 
                      className="flex items-center justify-between p-5 md:p-6 select-none relative z-10 transition-all duration-300"
                      style={{ paddingLeft: isHovered || isActive ? "34px" : "24px" }}
                    >
                      
                      <div className="flex items-center gap-5 md:gap-6 min-w-0 transition-transform duration-300" style={{ transform: isHovered || isActive ? "translateX(6px)" : "translateX(0px)" }}>
                        {/* Brighter index on hover with vertical pulse */}
                        <motion.span 
                          animate={isHovered || isActive ? { scale: [1, 1.14, 1] } : {}}
                          transition={{ duration: 0.55 }}
                          className={`font-mono text-sm md:text-base font-bold transition-colors duration-300 ${
                            isHovered || isActive ? "text-[#ffd900]" : "text-[#caa260]/60"
                          }`}
                        >
                          {srv.index}
                        </motion.span>
                        
                        <span className={`text-lg md:text-xl font-display font-semibold transition-colors duration-300 tracking-tight ${
                          isHovered || isActive ? "text-[#ffd900]" : "text-white"
                        }`}>
                          {srv.title}
                        </span>
                      </div>

                      {/* Sliding right Arrow transition with -45 degree rotation */}
                      <motion.div
                        animate={{ 
                          x: isHovered || isActive ? 8 : 0,
                          rotate: isHovered || isActive ? -45 : 0
                        }}
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        className={`transition-colors duration-300 ${
                          isHovered || isActive ? "text-[#ffd900] drop-shadow-[0_0_6px_#ffd900]" : "text-stone-500"
                        }`}
                      >
                        <Icon name="ArrowRight" size={18} />
                      </motion.div>
                    </div>

                    {/* EXPANDED DETAIL AKORDION PANEL (Smooth height extension, no layout jump) */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] as const }}
                          className="overflow-hidden border-t border-white/[0.04] bg-[#0c0c0e]/85"
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
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </motion.div>
                );
              })}
            </motion.div>

          </div>

          {/* RIGHT SECTION (Faint background custom morphing Three.js graphics) */}
          <div className="lg:col-span-4 h-[450px] hidden lg:flex items-center justify-center pointer-events-none select-none">
            
            {/* Soft background golden aura surrounding the globe */}
            <div className="absolute w-[360px] h-[360px] rounded-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06)_0%,transparent_70%)] blur-[40px]" />
            
            {/* Faint morphing wireframe shapes canvas system representing current service */}
            <ServicesWebGLGlobe activeIndex={activeSegmentIndex} />
            
          </div>

        </div>

        {/* Dynamic Mobile Background canvas fallback */}
        <div className="absolute inset-0 block lg:hidden pointer-events-none opacity-20 z-0 select-none overflow-hidden h-[300px] sm:h-[400px] top-[20%]">
          <ServicesWebGLGlobe activeIndex={activeSegmentIndex} />
        </div>

      </div>

      {/* Vertical grid system continuity line down */}
      <div className="mt-16 flex flex-col items-center">
        <div className="w-[1px] h-14 bg-gradient-to-b from-[#1C1B1A] to-transparent" />
      </div>
    </section>
  );
};
