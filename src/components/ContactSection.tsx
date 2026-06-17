import React, { Suspense, lazy } from "react";
import { motion } from "motion/react";
import { Icon } from "./Icon";
import { ErrorBoundary } from "./ErrorBoundary";
import { WHATSAPP_URL, CONSULTATION_PHONE, DEMO_REQUEST_EMAIL } from "../config";
import { AnimatedTrendBackground } from "./AnimatedTrendBackground";
import { TRANSITIONS, ANIMATION_VARIANTS } from "../lib/animations";

// Heavy Three.js globe — loaded on demand to keep the initial bundle light.
const ContactGlobe = lazy(() =>
  import("./ContactGlobe").then((m) => ({ default: m.ContactGlobe }))
);

export const ContactSection: React.FC = () => {
  // Inquiry submissions are handled by the shared "Let's Talk" modal (see TalkModal).

  return (
    <section id="contact-us" className="relative py-20 bg-[#070707] overflow-hidden px-4">
      <AnimatedTrendBackground />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Title */}
        <div className="mb-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: ANIMATION_VARIANTS.sectionTitle.hidden,
              visible: { ...ANIMATION_VARIANTS.sectionTitle.visible, transition: { duration: TRANSITIONS.duration.heading, ease: TRANSITIONS.ease } }
            }}
            viewport={{ once: true, margin: "-100px", amount: 0.2 }}
            whileHover={{ y: -4 }}
            className="cursor-default transition-all duration-300 relative z-20"
          >
            <span className="text-xs font-mono font-medium tracking-widest text-gold-500 uppercase">
              Inquire Now
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-5xl font-extrabold text-[#FCFCFC] tracking-tight mt-2.5 text-glow-light">
              Contact Us
            </h2>
          </motion.div>
        </div>

        {/* Form + Map Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* WhatsApp Primary Contact Card */}
          <div className="lg:col-span-12 xl:col-span-5 relative z-20">
            <motion.div
              layout
              initial="hidden"
              whileInView="visible"
              variants={{
                hidden: ANIMATION_VARIANTS.card.hidden,
                visible: { ...ANIMATION_VARIANTS.card.visible, transition: { duration: TRANSITIONS.duration.paragraph, ease: TRANSITIONS.ease } }
              }}
              viewport={{ once: true, margin: "-80px", amount: 0.1 }}
              className="rounded-2xl border border-gold-500/20 bg-[#101010]/95 p-6 md:p-8 relative overflow-hidden shadow-2xl shadow-black/80 flex flex-col justify-between glow-card"
              style={{
                backgroundImage: "radial-gradient(circle at top right, rgba(212, 175, 55, 0.05), transparent 70%)"
              }}
            >
              <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-gold-400/5 blur-2xl pointer-events-none" />

              <div>
                {/* Header with WhatsApp logo container */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-gold-400/30 bg-gold-500/10 text-gold-400 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                    <Icon name="WhatsApp" size={30} className="text-gold-400" />
                    <span className="absolute inset-0 rounded-full bg-gold-400/15 blur-sm animate-pulse pointer-events-none" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-gold-400 uppercase">
                      Primary Contact
                    </span>
                    <h3 className="font-display text-xl font-bold text-white tracking-tight">
                      WhatsApp Terminal
                    </h3>
                  </div>
                </div>

                {/* Main Content Display */}
                <div className="space-y-6">
                  {/* Phone number display */}
                  <div className="p-5 rounded-xl border border-white/5 bg-black/40 group relative overflow-hidden glow-card">
                    <div className="absolute inset-0 bg-gradient-to-r from-gold-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <span className="block text-[10px] font-mono font-bold tracking-widest text-stone-500 uppercase mb-1">
                      Direct WhatsApp Line
                    </span>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Contact 4X BackOffice on WhatsApp"
                      className="font-mono text-xl sm:text-2xl font-black text-[#f6dc82] hover:text-white tracking-widest transition-colors flex items-center gap-3.5"
                    >
                      <span>+971 58 509 9086</span>
                      <Icon name="ExternalLink" size={16} className="text-gold-400/60 group-hover:text-gold-400" />
                    </a>
                  </div>

                  {/* Descriptive text */}
                  <p className="font-sans font-light text-stone-300 text-sm leading-relaxed">
                    Speak directly with our team via WhatsApp for consultations, demos, product inquiries, and support.
                  </p>
                </div>
              </div>

              {/* Action Buttons Layout */}
              <div className="space-y-3.5 mt-8 border-t border-white/5 pt-6">
                <span className="block text-[10px] font-mono font-bold tracking-widest text-stone-500 uppercase mb-2">
                  Select WhatsApp Action
                </span>

                <a
                  href={`tel:${CONSULTATION_PHONE}`}
                  aria-label="Call 4X BackOffice to book a consultation"
                  className="w-full relative overflow-hidden rounded-xl bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 hover:brightness-110 active:brightness-95 py-3.5 text-xs font-bold tracking-[0.15em] uppercase text-stone-950 font-display transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2"
                >
                  <Icon name="Phone" size={15} />
                  Book a Consultation
                </a>

                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${DEMO_REQUEST_EMAIL}&su=${encodeURIComponent("Demo Request - 4X BackOffice")}&body=${encodeURIComponent("Hello,\n\nI would like to request a demo of 4X BackOffice. Please reach out to arrange a suitable time.\n\nThank you.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Request a demo from 4X BackOffice by email"
                  className="w-full relative overflow-hidden rounded-xl border border-gold-400/30 bg-gold-400/5 hover:bg-gold-400/10 hover:border-gold-400/50 py-3.5 text-xs font-bold tracking-[0.15em] uppercase text-gold-400 font-display transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                >
                  <Icon name="Mail" size={15} />
                  Request Demo
                </a>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contact 4X BackOffice on WhatsApp"
                  className="w-full relative overflow-hidden rounded-xl border border-white/10 bg-transparent hover:bg-white/5 py-3.5 text-xs font-bold tracking-[0.15em] uppercase text-stone-300 font-display transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Icon name="WhatsApp" size={15} className="text-gold-400" />
                  Direct WhatsApp Chat
                </a>
              </div>
            </motion.div>
          </div>

          {/* Map & World Presence column */}
          <div className="lg:col-span-12 xl:col-span-7 flex flex-col justify-between h-full space-y-8 select-none">
            
            {/* Title */}
            <div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={{
                  hidden: ANIMATION_VARIANTS.heading.hidden,
                  visible: { ...ANIMATION_VARIANTS.heading.visible, transition: { duration: TRANSITIONS.duration.heading, ease: TRANSITIONS.ease } }
                }}
                viewport={{ once: true, margin: "-80px", amount: 0.1 }}
                whileHover={{ y: -4 }}
                className="cinematic-reveal cursor-default transition-all duration-300 relative z-20"
              >
                <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#FDFDFD] leading-tight text-glow-light">
                  Connect with our <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 italic font-sans font-light text-glow-gold inline-block">
                    experts worldwide
                  </span>
                </h3>
                <p className="text-xs text-stone-500 uppercase mt-2.5 tracking-widest font-mono">
                  Our operational presence across key global hubs
                </p>
              </motion.div>
            </div>

            {/* Rotating 3D globe of our operational hubs */}
            <div className="relative w-full h-[360px] sm:h-[420px] md:h-[460px] rounded-2xl border border-white/5 bg-[#0A0A0A] overflow-hidden shadow-inner">
              <div className="absolute inset-0 grid-bg-overlay opacity-15 pointer-events-none" />
              <ErrorBoundary
                fallback={
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-[200px] w-[200px] rounded-full border border-gold-500/25" />
                  </div>
                }
              >
                <Suspense
                  fallback={
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-10 w-10 rounded-full border-2 border-gold-500/30 border-t-gold-400 animate-spin" />
                    </div>
                  }
                >
                  <ContactGlobe />
                </Suspense>
              </ErrorBoundary>
            </div>

          </div>

        </div>
      </div>

      {/* Downward Connector Line */}
      <div className="mt-20 flex flex-col items-center">
        <div className="w-[1px] h-14 bg-gradient-to-b from-[#1C1B1A] to-transparent" />
      </div>
    </section>
  );
};
