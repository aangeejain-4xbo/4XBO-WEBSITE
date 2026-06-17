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
import { Loader } from "./components/Loader";
import { PageTransition } from "./components/PageTransition";
import { WHATSAPP_URL } from "./config";

export default function App() {
  const [isTalkOpen, setIsTalkOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { currentPath, navigate } = useRouter();

  // Dynamic SEO Metadata Updater
  React.useEffect(() => {
    let title = "B2B Forex Back Office Solutions | MT5 Admin & Server Management | 4X BackOffice";
    let description = "4X BackOffice is a premier B2B Forex back office solutions provider for global brokers. Specialized in MT5 administration, high-performance server management, PrimeXM/Centroid bridge integrations, and premium risk management infrastructure.";
    let keywords = "Forex back office, MT5 admin, server management, bridge integrations, gateway integrations, risk management, data protection, trade analysis, platform security, PrimeXM, Centroid Solutions, Tools for Brokers, B2B fintech, forex technology";
    
    switch (currentPath) {
      case "/":
        title = "B2B Forex Back Office Solutions | MT5 Admin & Server Management | 4X BackOffice";
        description = "4X BackOffice offers enterprise-grade Forex Back Office Solutions and MT5 Administration for global brokers. Connect robust CRMs, liquidity bridges, and low-latency servers.";
        keywords = "Forex Back Office Solutions, Forex Broker Solutions, MT5 Administration, Forex Infrastructure, Broker Technology Provider, Forex CRM Solutions, Forex Broker Services";
        break;
      case "/why-us":
        title = "Why Choose 4X BackOffice | Premium Broker Infrastructure";
        description = "Discover why leading brokers choose 4X BackOffice for institutional MT5 servers, core risk protection, and multi-tier liquidity bridge management.";
        keywords = "Why Choose 4X BackOffice, Broker Infrastructure, Forex Infrastructure, MT5 Server Uptime, Broker Technology Partner";
        break;
      case "/services":
        title = "Forex Broker Services | MT5 Administration & Support | 4X BackOffice";
        description = "Comprehensive broker technology services including custom MT5 configuration, hosting optimization, secure KYC pipelines, and liquidity setups.";
        keywords = "Forex Broker Services, MT5 Administration, Forex Risk Management, Liquidity Bridge Solutions, Broker CRM Integration";
        break;
      case "/products":
        title = "Forex Broker Products | Copy Trading, B-Book & Swap Management";
        description = "Advanced broker technology products including copy trading, swap management, credit control, and B-book slippage solutions.";
        keywords = "Forex Broker Products, Copy Trading Solutions, Swap Management, Credit Management, B-Book Slippage Management";
        break;
      case "/contact":
        title = "Contact Forex Technology Provider | 4X BackOffice Consultation";
        description = "Get in touch with 4X BackOffice to configure your brokerage infrastructure, deploy secure servers, or inquire about custom bridge setups.";
        keywords = "Contact Forex Technology Provider, Forex Technology Partner, MT5 Admin Support, Custom Bridge Setup Contact";
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
          "description": "Provider of premium B2B Forex back office solutions, MT5 server administration, and low-latency smart order routing hubs.",
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
                "text": "Forex back-office services encompass the operational framework required to run a brokerage, including MT5 server configuration, custom liquidity bridge gateways, CRM lead sync pipelines, and regulatory security audits."
              }
            },
            {
              "@type": "Question",
              "name": "Do you provide MT5 administration?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we provide 24/7 dedicated certified MT5 server administration including symbol groups, trading settings, margin calculations setup, and automatic failovers."
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
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
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
