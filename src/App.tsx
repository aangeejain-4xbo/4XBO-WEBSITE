import React, { useState, Suspense, lazy } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Stats } from "./components/Stats";
import { Expertise } from "./components/Expertise";
import { Products } from "./components/Products";
import { Partners } from "./components/Partners";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { TalkModal } from "./components/TalkModal";
import { Icon } from "./components/Icon";
import { CustomCursor } from "./components/CustomCursor";
import { TapRipple } from "./components/TapRipple";
import { SEOSections } from "./components/SEOSections";
import { WhyUs } from "./components/WhyUs";
import { Mission } from "./components/Mission";
// Heaviest route (Three.js WebGL scene) — code-split out of the initial bundle.
const Services = lazy(() => import("./components/Services").then((m) => ({ default: m.Services })));
import { useRouter } from "./router";
import { EcosystemJourney } from "./components/EcosystemJourney";
import { MarqueeTicker } from "./components/MarqueeTicker";
import { CtaBand } from "./components/CtaBand";
import { Loader } from "./components/Loader";
import { PageTransition } from "./components/PageTransition";
import { WHATSAPP_URL } from "./config";
import { getRouteSeo, canonicalFor, buildGraph } from "./seo";

export default function App() {
  const [isTalkOpen, setIsTalkOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { currentPath, navigate } = useRouter();
  // Render route content at deferred (non-blocking) priority so mounting a heavy
  // page (3D scenes, etc.) doesn't stall the curtain transition's animation frames.
  const deferredPath = React.useDeferredValue(currentPath);

  // Dynamic SEO metadata updater — single source of truth is src/seo.ts.
  // Updates title, description/keywords, canonical, the full Open Graph AND
  // Twitter Card sets, and the per-route JSON-LD @graph on every route change.
  React.useEffect(() => {
    const seo = getRouteSeo(currentPath);
    const canonical = canonicalFor(currentPath);

    document.title = seo.title;

    // Upsert a <meta> tag identified by name= or property=.
    const setMeta = (attr: "name" | "property", key: string, content: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("name", "description", seo.description);
    setMeta("name", "keywords", seo.keywords);

    // Open Graph
    setMeta("property", "og:title", seo.title);
    setMeta("property", "og:description", seo.description);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:image", seo.ogImage);
    setMeta("property", "og:image:alt", seo.ogImageAlt);

    // Twitter Card (previously never updated per route)
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", seo.title);
    setMeta("name", "twitter:description", seo.description);
    setMeta("name", "twitter:url", canonical);
    setMeta("name", "twitter:image", seo.ogImage);
    setMeta("name", "twitter:image:alt", seo.ogImageAlt);

    // Canonical URL
    let canonicalEl = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute("href", canonical);

    // Per-route JSON-LD @graph (Organization + WebSite + ProfessionalService,
    // plus Service nodes / BreadcrumbList where relevant). FAQPage is emitted
    // separately by SEOSections so it only appears where the FAQ is visible.
    let schemaScript = document.getElementById("structured-data-schema");
    if (!schemaScript) {
      schemaScript = document.createElement("script");
      schemaScript.setAttribute("id", "structured-data-schema");
      schemaScript.setAttribute("type", "application/ld+json");
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify(buildGraph(currentPath));
  }, [currentPath]);

  // Hardware-accelerated dynamic [data-rv] scroll reveal mechanics
  React.useEffect(() => {
    // Collect all elements on current path view
    const elements = document.querySelectorAll("[data-rv]");
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            // Reveal immediately; CSS transition-delay (data-rv-delay) handles the subtle stagger.
            el.classList.add("in");
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((node) => {
      observer.observe(node);
    });

    return () => {
      observer.disconnect();
    };
  }, [currentPath, isLoading]); // Re-evaluate upon route change or loader completion

  // Parallax Ambient Lines scroll movement listener
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const ambients = document.querySelectorAll<HTMLElement>(".ambient");
      ambients.forEach((el) => {
        el.style.transform = `translateY(${scrollY * 0.04}px)`;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hook into viewport scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001
  });

  const openTalkModal = () => setIsTalkOpen(true);
  const closeTalkModal = () => setIsTalkOpen(false);

  // Map route path to components (uses deferredPath so heavy mounts stay non-blocking)
  const renderContent = () => {
    switch (deferredPath) {
      case "/":
        return (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Hero onTalkClick={openTalkModal} />
            <Stats />
            <MarqueeTicker />
            <EcosystemJourney />
            <SEOSections onTalkClick={openTalkModal} />
            <Expertise onTalkClick={openTalkModal} />
            <Partners />
            <CtaBand onTalkClick={openTalkModal} />
          </motion.div>
        );

      case "/why-us":
        return (
          <motion.div
            key="why-us"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative pt-36 pb-12 bg-[#020202] overflow-hidden text-center md:text-left border-b border-white/5">
              <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-gold-500/5 blur-[120px] rounded-full pointer-events-none" />
              <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-gold-500 uppercase">
                  Institutional Quality
                </span>
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white mt-4 tracking-tight leading-none text-glow-light">
                  Why Choose Us
                </h1>
                <p className="mt-4 font-sans font-light text-stone-400 text-sm sm:text-base max-w-2xl leading-relaxed">
                  4X BackOffice provides the structural integrity that global brokerages depend on daily to serve millions of clients in high-intensity trading networks.
                </p>
              </div>
            </div>
            
            <WhyUs onTalkClick={openTalkModal} />

            {/* Strategic Mission & Values integrated cleanly into Why Us */}
            <Mission />
            
            {/* Value Highlights Grid to make the page feel premium and dense */}
            <div className="py-20 bg-[#050505] border-t border-white/5 relative z-10">
              <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="p-6 rounded-xl border border-white/5 bg-[#0b0b0b] hover:border-gold-500/20 transition-all glow-card">
                    <div className="h-10 w-10 rounded-full border border-gold-400/20 flex items-center justify-center text-gold-400 mb-4 bg-gold-400/5">
                      <Icon name="Cpu" size={20} />
                    </div>
                    <h3 className="font-display text-lg font-bold text-white mb-2">Redundancy Failovers</h3>
                    <p className="text-stone-400 text-xs sm:text-sm font-light leading-relaxed">
                      Triple-node automatic backup routing setups active 24/7/365 to preserve live data streaming and administrative server ports.
                    </p>
                  </div>
                  <div className="p-6 rounded-xl border border-white/5 bg-[#0b0b0b] hover:border-gold-500/20 transition-all glow-card">
                    <div className="h-10 w-10 rounded-full border border-gold-400/20 flex items-center justify-center text-gold-400 mb-4 bg-gold-400/5">
                      <Icon name="Activity" size={20} />
                    </div>
                    <h3 className="font-display text-lg font-bold text-white mb-2">99.998% Network Uptime</h3>
                    <p className="text-stone-400 text-xs sm:text-sm font-light leading-relaxed">
                      Strict operational SLA commitments kept over multi-million package streams under direct supervision of server admins.
                    </p>
                  </div>
                  <div className="p-6 rounded-xl border border-white/5 bg-[#0b0b0b] hover:border-gold-500/20 transition-all glow-card">
                    <div className="h-10 w-10 rounded-full border border-gold-400/20 flex items-center justify-center text-gold-400 mb-4 bg-gold-400/5">
                      <Icon name="Zap" size={20} />
                    </div>
                    <h3 className="font-display text-lg font-bold text-white mb-2">Instantaneous Feeds</h3>
                    <p className="text-stone-400 text-xs sm:text-sm font-light leading-relaxed">
                      Latency deviations averaging under 0.12ms to eliminate slippage and trading friction, verified by triple system feedback.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case "/services":
        return (
          <motion.div
            key="services"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative pt-36 pb-12 bg-[#020202] overflow-hidden text-center md:text-left border-b border-white/5">
              <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-gold-500/5 blur-[120px] rounded-full pointer-events-none" />
              <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-gold-500 uppercase">
                  Execution Capabilities
                </span>
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white mt-4 tracking-tight leading-none text-glow-light">
                  Forex Broker Services
                </h1>
                <p className="mt-4 font-sans font-light text-stone-400 text-sm sm:text-base max-w-2xl leading-relaxed">
                  From deep structural MT5 administration to intelligent liquidity bridges, explore our full spectrum of developer and infrastructure services.
                </p>
              </div>
            </div>
            <Services />
          </motion.div>
        );

      case "/products":
        return (
          <motion.div
            key="products"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Products onTalkClick={openTalkModal} />
          </motion.div>
        );

      case "/contact":
        return (
          <motion.div
            key="contact-page"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative pt-36 pb-12 bg-[#020202] overflow-hidden text-center md:text-left border-b border-white/5">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-500/5 blur-[150px] rounded-full pointer-events-none" />
              <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-gold-500 uppercase">
                  Secure Communication Terminal
                </span>
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white mt-4 tracking-tight leading-none text-glow-light">
                  Direct Consultation
                </h1>
                <p className="mt-4 font-sans font-light text-stone-400 text-sm sm:text-base max-w-2xl leading-relaxed">
                  Let's specify your broker setup, migration guidelines, or server compliance audits. Connect directly with our execution team.
                </p>
              </div>
            </div>
            <ContactSection />
          </motion.div>
        );

      default:
        return (
          <div className="pt-40 pb-20 text-center">
            <h2 className="text-3xl text-white font-display font-bold">Route not found</h2>
            <button onClick={() => navigate("/")} className="mt-4 text-gold-400 underline font-mono text-xs">
              Return Home
            </button>
          </div>
        );
    }
  };

  return (
    <div className="relative min-h-screen premium-fintech-bg text-stone-100 overflow-x-hidden font-sans selection:bg-gold-500/30 selection:text-white">
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      <PageTransition />
      {/* Lightweight cursor trail — shadowBlur removed + 1x canvas (the heavy
          full-screen blur was the original site-wide hover-lag source). */}
      <CustomCursor />
      <TapRipple />
      {/* Dynamic Background Noise/Texture & Hardware-accelerated grids */}
      <div className="absolute inset-0 pointer-events-none premium-noise-overlay opacity-[0.85] z-0" />
      <div className="absolute inset-0 pointer-events-none grid-bg-overlay opacity-[0.45] z-0" />

      {/* Subtle Viewport Scroll Progress Bar */}
      <motion.div
        id="scroll-progress-bar"
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold-500 via-gold-400 to-gold-300 z-50 origin-[0%]"
        style={{ scaleX }}
      />

      {/* Accessibility: real keyboard skip link (visible only on focus) */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Global Header */}
      <Navbar onTalkClick={openTalkModal} />

      {/* Page Content structure with staggered entrances with Framer Motion */}
      <main id="main-content" className="relative z-10">
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-40">
              <div className="h-10 w-10 rounded-full border-2 border-gold-500/30 border-t-gold-400 animate-spin" />
            </div>
          }
        >
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </Suspense>
      </main>

      {/* Footer */}
      <Footer onTalkClick={openTalkModal} />

      {/* Persistent Gold-Accented Floating WhatsApp Button (round, glowing) */}
      <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 flex items-center justify-center group">
        {/* Soft radial golden glow halo that bleeds outward (no hard box edge) */}
        <div className="absolute h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(255,217,0,0.40)_0%,rgba(212,160,42,0.22)_38%,transparent_70%)] blur-xl pointer-events-none z-0 opacity-90 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Pulsing Backlight Ring 1 */}
        <motion.div
          className="absolute h-16 w-16 rounded-full bg-gold-500/25 pointer-events-none z-0"
          animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        />

        {/* Pulsing Backlight Ring 2 */}
        <motion.div
          className="absolute h-16 w-16 rounded-full bg-gold-400/15 pointer-events-none z-0"
          animate={{ scale: [1, 1.7, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.8 }}
        />

        {/* Hover tooltip label (sits to the left, doesn't box the button) */}
        <span className="absolute right-[78px] hidden sm:block whitespace-nowrap px-3 py-1.5 rounded-lg bg-stone-950/90 border border-gold-400/40 text-gold-300 text-[11px] font-bold tracking-wider uppercase opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
          WhatsApp Us
        </span>

        {/* Round glowing button core */}
        <motion.a
          id="global-floating-contact-btn"
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact 4X BackOffice on WhatsApp"
          initial={{ opacity: 0, scale: 0.75, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="relative z-10 flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-gold-300 via-gold-400 to-gold-600 text-stone-950 border border-gold-200/60 shadow-[0_0_28px_rgba(255,217,0,0.55),0_8px_30px_rgba(202,162,96,0.45)] hover:shadow-[0_0_46px_rgba(255,217,0,0.85),0_12px_45px_rgba(202,162,96,0.7)] cursor-pointer overflow-hidden select-none transition-shadow duration-300"
        >
          {/* Subtle shine sweep across the button */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:animate-shimmer" />

          {/* WhatsApp icon — large but fully visible & crisp (not clipped by the circle) */}
          <motion.div
            whileHover={{ rotate: [0, -10, 10, -5, 5, 0] }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex items-center justify-center"
          >
            <Icon name="WhatsApp" size={40} className="text-current" />
          </motion.div>
        </motion.a>
      </div>

      {/* Contact dialog modal overlay support */}
      <TalkModal isOpen={isTalkOpen} onClose={closeTalkModal} />
    </div>
  );
}
