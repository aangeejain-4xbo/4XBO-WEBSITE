import React from "react";
import { motion } from "motion/react";
import { Icon } from "./Icon";
import { TRANSITIONS, ANIMATION_VARIANTS } from "../lib/animations";

export const Mission: React.FC = () => {
  return (
    <section id="mission" className="relative py-14 sm:py-20 md:py-24 bg-[#080808] overflow-hidden px-4">
      {/* Background radial gold glow */}
      <div className="absolute top-1/2 left-1/3 h-96 w-96 rounded-full bg-gold-400/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: ANIMATION_VARIANTS.sectionTitle.hidden,
              visible: { ...ANIMATION_VARIANTS.sectionTitle.visible, transition: { duration: TRANSITIONS.duration.heading, ease: TRANSITIONS.ease } }
            }}
            viewport={{ once: true, margin: "-120px", amount: 0.2 }}
            whileHover={{ y: -4 }}
            className="cinematic-reveal cursor-default transition-all duration-300 relative z-20"
          >
            {/* Label - Redesign and upscaled 30-50% with premium tracking */}
            <span className="block text-sm sm:text-base md:text-[17px] font-mono font-semibold tracking-[0.28em] text-gold-500 uppercase mb-6">
              / Mission & Catalyst
            </span>
            
            {/* Large impactful heading reduced by ~20% for perfect visual balance and premium display feels */}
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mt-6 leading-[1.1] text-glow-light">
              We cleaned up,{" "}
              <span className="inline-block pr-6 -mr-6 pb-1 text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 italic font-light font-sans text-glow-gold">
                impactful
              </span>
            </h2>
          </motion.div>

          {/* Slogan details and dual columns - Added richer padding & spacing margin boundary */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: ANIMATION_VARIANTS.paragraph.hidden,
              visible: { ...ANIMATION_VARIANTS.paragraph.visible, transition: { duration: TRANSITIONS.duration.paragraph, ease: TRANSITIONS.ease } }
            }}
            viewport={{ once: true, margin: "-80px", amount: 0.2 }}
            className="cinematic-reveal grid grid-cols-1 md:grid-cols-2 gap-10 mt-16 border-l border-gold-500/25 pl-6 md:pl-10 relative z-20"
          >
            <div>
              {/* Primary description - styled to match secondary description for perfect visual balance */}
              <p className="font-sans font-light text-base sm:text-lg md:text-[17px] text-stone-400 leading-[1.75]">
                By replacing fragmented legacy servers, unmonitored custom routing bridges, and unreliable liquidity pathways, we give brokers a pristine, institutional ecosystem where latency is minimized and administration is unified.
              </p>
            </div>
            <div className="flex flex-col justify-between">
              {/* Secondary description - upscaled slightly, heightened line height for maximum legibility */}
              <p className="font-sans font-light text-base sm:text-lg md:text-[17px] text-stone-400 leading-[1.75]">
                We believe that complex technical backends should feel lightweight. Every solution we deliver is backed by a redundant secondary engine, a continuous compliance gateway, and immediate 24/7 technical operations.
              </p>
              
              {/* Live Status Container */}
              <div className="mt-8 flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-xs sm:text-sm font-mono text-emerald-400 font-semibold uppercase tracking-wider">
                  Aggregated Uptime: 99.998% Active
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Downward Connector Line */}
      <div className="mt-20 flex flex-col items-center">
        <div className="w-[1px] h-14 bg-gradient-to-b from-[#1C1B1A] to-transparent" />
      </div>
    </section>
  );
};
