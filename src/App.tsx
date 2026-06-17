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
import { SEOSections } from "./components/SEOSections";
import { WhyUs } from "./components/WhyUs";
import { Mission } from "./components/Mission";
// Heaviest route (Three.js WebGL scene) — code-split out of the initial bundle.
const Services = lazy(() => import("./components/Services").then((m) => ({ default: m.Services })));
import { useRouter } from "./router";
import { EcosystemJourney } from "./components/EcosystemJourney";
import { MarqueeTicker } from "./components/MarqueeTicker";
import { CtaBand } from "./components/CtaBand";
import { PageTransition } from "./components/PageTransition";
import { WHATSAPP_URL } from "./config";

export default function App() {
  const [isTalkOpen, setIsTalkOpen] = useState(false);
  const { currentPath, navigate } = useRouter();

  // Dynamic SEO Metadata Updater
  React.useEffect(() => {
    let title = "Forex Back Office & MetaTrader MT5 Management | 4X BackOffice";
    let description = "MetaTrader MT4/MT5 management & forex back office solutions for brokers — low-latency trading servers, liquidity bridges, smart order routing & risk management.";
    let keywords = "forex back office solutions, MetaTrader management, MT5 administration, MT4 management, forex trading technology, forex trading infrastructure, liquidity bridges, STP aggregation, smart order routing, broker risk management, broker technology provider, PrimeXM, Centroid";

    switch (currentPath) {
      case "/":
        title = "Forex Back Office & MetaTrader MT5 Management | 4X BackOffice";
        description = "Enterprise forex back office solutions and MetaTrader MT4/MT5 management for global brokers — low-latency forex trading servers, liquidity bridges, smart order routing and institutional risk management.";
        keywords = "forex back office solutions, MetaTrader management, MT5 administration, MT4 management, forex trading technology, forex trading infrastructure, liquidity bridges, smart order routing, broker risk management, broker technology provider";
        break;
      case "/why-us":
        title = "Why 4X BackOffice | MetaTrader Management & Forex Trading Infrastructure";
        description = "See why brokers choose 4X BackOffice for MetaTrader MT5 server management, low-latency forex trading infrastructure, multi-tier liquidity bridges and risk management.";
        keywords = "why choose 4X BackOffice, MetaTrader server management, MT5 server uptime, forex trading infrastructure, broker technology partner, liquidity bridge management, broker risk management";
        break;
      case "/services":
        title = "Forex Broker Services | MetaTrader MT5 Management & Liquidity | 4X BackOffice";
        description = "Forex broker technology services: custom MetaTrader MT4/MT5 administration, low-latency trading server hosting, liquidity bridge and STP aggregation setups, and real-time risk management.";
        keywords = "forex broker services, MetaTrader management, MT5 administration, MT4 configuration, forex trading server hosting, liquidity bridge solutions, STP aggregation, forex risk management";
        break;
      case "/products":
        title = "Forex Broker Products | Copy Trading, B-Book & Swap Management | 4X BackOffice";
        description = "Forex trading technology products — copy trading, swap and credit control, A-book/B-book allocation, and B-book slippage management for MetaTrader brokers.";
        keywords = "forex broker products, copy trading solutions, swap management, credit management, A-book B-book allocation, B-book slippage management, MetaTrader trading tools";
        break;
      case "/contact":
        title = "Contact 4X BackOffice | MetaTrader MT5 & Forex Back Office Support";
        description = "Contact 4X BackOffice to deploy MetaTrader MT5 servers, configure liquidity bridges and smart order routing, or scale your forex trading infrastructure.";
        keywords = "contact forex technology provider, MetaTrader MT5 support, forex back office support, liquidity bridge setup, forex trading infrastructure consultation";
        break;
    }

    document.title = title;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", description);
    } else {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      metaDesc.setAttribute("content", description);
      document.head.appendChild(metaDesc);
    }

    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute("content", keywords);
    } else {
      metaKeywords = document.createElement("meta");
      metaKeywords.setAttribute("name", "keywords");
      metaKeywords.setAttribute("content", keywords);
      document.head.appendChild(metaKeywords);
    }

    // Update Open Graph tags for social search optimization
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", description);
    
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", `https://4xbo.com${currentPath}`);

    // Update Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute("href", `https://4xbo.com${currentPath}`);
    } else {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      canonical.setAttribute("href", `https://4xbo.com${currentPath}`);
      document.head.appendChild(canonical);
    }

    // Inject Dynamic JSON-LD Structured Data for absolute Google SEO Authority
    let schemaScript = document.getElementById("structured-data-schema");
    if (!schemaScript) {
      schemaScript = document.createElement("script");
      schemaScript.setAttribute("id", "structured-data-schema");
      schemaScript.setAttribute("type", "application/ld+json");
      document.head.appendChild(schemaScript);
    }
    
    const structuredSchema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "name": "4X BackOffice",
          "url": "https://4xbo.com",
          "description": "Provider of B2B forex back office solutions, MetaTrader MT4/MT5 server management, low-latency forex trading infrastructure, liquidity bridges, smart order routing and risk management.",
          "logo": "https://4xbo.com/logo.png"
        },
        {
          "@type": "WebSite",
          "url": "https://4xbo.com",
          "name": "4X BackOffice"
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What are Forex Back Office Services?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Forex back-office services cover the operational framework required to run a brokerage, including MetaTrader MT4/MT5 server configuration, custom liquidity bridge gateways, smart order routing, low-latency trading server hosting, and regulatory security audits."
              }
            },
            {
              "@type": "Question",
              "name": "What is MetaTrader (MT4/MT5) management?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "MetaTrader management is the end-to-end administration of MT4 and MT5 trading platforms — symbol and group configuration, leverage and margin profiles, plugin and routing rules, server hosting, and 24/7 monitoring of your forex trading infrastructure."
              }
            },
            {
              "@type": "Question",
              "name": "Do you provide MT5 administration?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. We provide 24/7 certified MetaTrader MT5 server administration including symbol groups, trading settings, margin calculation setup, and automatic failover."
              }
            },
            {
              "@type": "Question",
              "name": "Do you offer liquidity bridges and risk management?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We configure low-latency liquidity bridges with STP aggregation and smart order routing to liquidity providers, plus real-time A-book/B-book allocation, exposure monitoring and automated hedging for broker risk management."
              }
            }
          ]
        }
      ]
    };
    schemaScript.innerHTML = JSON.stringify(structuredSchema);
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
  }, [currentPath]); // Re-evaluate upon route change

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

  // Map route path to components
  const renderContent = () => {
    switch (currentPath) {
      case "/":
        return (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
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
            transition={{ duration: 0.35 }}
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
            transition={{ duration: 0.35 }}
          >
            <div className="relative pt-36 pb-12 bg-[#020202] overflow-hidden text-center md:text-left border-b border-white/5">
              <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-gold-500/5 blur-[120px] rounded-full pointer-events-none" />
              <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-gold-500 uppercase">
                  Execution Capabilities
                </span>
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white mt-4 tracking-tight leading-none text-glow-light">
                  Our Services
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
            transition={{ duration: 0.4 }}
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
            transition={{ duration: 0.35 }}
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
      <PageTransition />
      <CustomCursor />
      {/* Dynamic Background Noise/Texture & Hardware-accelerated grids */}
      <div className="absolute inset-0 pointer-events-none premium-noise-overlay opacity-[0.85] z-0" />
      <div className="absolute inset-0 pointer-events-none grid-bg-overlay opacity-[0.45] z-0" />

      {/* Subtle Viewport Scroll Progress Bar */}
      <motion.div
        id="scroll-progress-bar"
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold-500 via-gold-400 to-gold-300 z-50 origin-[0%]"
        style={{ scaleX }}
      />

      {/* Global Header */}
      <nav id="navbar-skip" className="sr-only">Skip navigation</nav>
      <Navbar onTalkClick={openTalkModal} />

      {/* Page Content structure with staggered entrances with Framer Motion */}
      <main className="relative z-10">
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

      {/* Persistent Gold-Accented Floating Action Button (FAB) */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center justify-center">
        {/* Pulsing Backlight Ring 1 */}
        <motion.div
          className="absolute h-14 w-14 rounded-full bg-gold-500/25 pointer-events-none z-0"
          animate={{
            scale: [1, 2.1, 1],
            opacity: [0.6, 0, 0.6],
          }}
          transition={{
            repeat: Infinity,
            duration: 2.5,
            ease: "easeInOut",
          }}
        />

        {/* Pulsing Backlight Ring 2 */}
        <motion.div
          className="absolute h-14 w-14 rounded-full bg-gold-400/15 pointer-events-none z-0"
          animate={{
            scale: [1, 1.6, 1],
            opacity: [0.7, 0, 0.7],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut",
            delay: 0.8,
          }}
        />

        {/* Floating Action Button Core (WhatsApp Premium) */}
        <motion.a
          id="global-floating-contact-btn"
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact 4X BackOffice on WhatsApp"
          initial={{ opacity: 0, scale: 0.75, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          whileHover="hover"
          whileTap={{ scale: 0.95 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
          className="relative z-10 flex items-center gap-2 h-14 px-4 rounded-full bg-stone-950 border border-gold-400/80 text-gold-400 font-sans text-xs font-semibold tracking-wider uppercase shadow-[0_8px_30px_rgba(202,162,96,0.25)] hover:bg-gold-500 hover:text-stone-950 hover:border-gold-300 hover:shadow-[0_12px_40px_rgba(202,162,96,0.55)] cursor-pointer overflow-hidden group select-none transition-all duration-300"
        >
          {/* Subtle inside-button wave reflection highlight */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />

          {/* Centered WhatsApp icon with scale dynamic */}
          <motion.div
            variants={{
              hover: { rotate: [0, -10, 10, -5, 5, 0] }
            }}
            transition={{ duration: 0.5 }}
          >
            <Icon name="WhatsApp" size={18} className="text-current" />
          </motion.div>

          {/* Smooth Slider label expand layout */}
          <motion.span
            variants={{
              hover: { width: "auto", opacity: 1, marginRight: 4 },
            }}
            initial={{ width: 0, opacity: 0, marginRight: 0 }}
            className="overflow-hidden whitespace-nowrap inline-block text-[11px] font-bold"
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            WhatsApp Us
          </motion.span>
        </motion.a>
      </div>

      {/* Contact dialog modal overlay support */}
      <TalkModal isOpen={isTalkOpen} onClose={closeTalkModal} />
    </div>
  );
}
