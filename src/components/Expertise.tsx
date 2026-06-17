import React, { useRef } from "react";
import { motion } from "motion/react";
import { Icon } from "./Icon";
import { waLink, WA_CONSULT_MSG } from "../config";

interface ExpertiseProps {
  onTalkClick: () => void;
}

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  borderLeftColor?: string;
}

const BentoCard: React.FC<BentoCardProps> = ({
  children,
  className = "",
  delay = 0,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${px}px`);
    card.style.setProperty("--mouse-y", `${py}px`);

    const pctX = (px / rect.width) * 100;
    const pctY = (py / rect.height) * 100;
    card.style.setProperty("--mx", `${pctX}%`);
    card.style.setProperty("--my", `${pctY}%`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5 }}
      className={`relative bg-[#09090b] border border-white/5 p-5 sm:p-6 md:p-10 flex flex-col justify-between overflow-hidden shadow-2xl rounded-2xl group transition-transform duration-300 bx glow-card ${className}`}
    >
      {/* Spotlight background radial glow */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
        style={{
          background: "radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(212, 175, 55, 0.08), transparent 80%)"
        }}
      />
      
      {/* Light border reflection spotlight using same coordinates */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
        style={{
          padding: "1.2px",
          borderRadius: "inherit",
          background: "radial-gradient(280px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(212, 175, 55, 0.25), transparent 80%)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude"
        }}
      />

      {/* Gold top line highlight stripe */}
      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-[#D4AF37]/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-20" />

      {/* Inner children contents */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  );
};

export const Expertise: React.FC<ExpertiseProps> = ({ onTalkClick }) => {
  return (
    <section id="services" className="relative py-14 sm:py-20 md:py-24 bg-[#050505] overflow-hidden px-4 md:px-8 select-none">
      {/* Glow overlays to highlight this beautiful bento grid */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gold-500/3 blur-[180px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gold-600/3 blur-[180px] rounded-full pointer-events-none z-0" />

      <div className="relative max-w-7xl mx-auto z-10">
        
        {/* Centered Heading Block */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight cursor-default"
          >
            Expertise That Drives Quality
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 font-sans font-light text-stone-400 text-sm sm:text-base md:text-md max-w-2xl mx-auto leading-relaxed"
          >
            With deep expertise, we deliver quality solutions that drive success and exceed industry standards consistently.
          </motion.p>
        </div>

        {/* Bento Grid layout with equal height cards, exactly matching the reference image layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-stretch">
          
          {/* Card 01 - Analyse with integrated chart layout */}
          <BentoCard delay={0}>
            {/* Soft grid inside card */}
            <div className="absolute inset-0 grid-bg-overlay opacity-[0.1] pointer-events-none" />

            <div>
              <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#D4AF37] block mb-4 uppercase">
                01 Analyse
              </span>
              <h3 className="font-display text-xl md:text-2xl font-black text-white leading-snug tracking-tight mb-4">
                We thoughtfully understand your every requirement.
              </h3>
              <p className="font-sans font-light text-stone-400 text-sm leading-relaxed mb-6">
                In-depth audit of your server latency, bridge routing guidelines, and liquidity provider risk parameters to engineer the perfect platform.
              </p>
            </div>

            {/* Embedded illuminated custom financial trend chart */}
            <div className="relative w-full h-32 sm:h-36 md:h-40 bg-[#080808] border border-white/5 rounded-lg overflow-hidden flex items-end">
              <div className="absolute inset-0 grid bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:14px_14px]" />
              
              {/* Animated financial candles / path */}
              <svg className="w-full h-full opacity-70" viewBox="0 0 400 160">
                <defs>
                  <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffd900" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#ffd900" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,140 L30,120 L60,135 L90,110 L120,115 L150,85 L180,95 L210,65 L240,75 L270,45 L300,55 L330,25 L360,40 L400,10 L400,160 L0,160 Z"
                  fill="url(#chart-glow)"
                />
                <path
                  d="M0,140 L30,120 L60,135 L90,110 L120,115 L150,85 L180,95 L210,65 L240,75 L270,45 L300,55 L330,25 L360,40 L400,10"
                  stroke="#ffd900"
                  strokeWidth="2"
                  fill="none"
                />
                {/* Horizontal target/feed levels */}
                <line x1="0" y1="80" x2="400" y2="80" stroke="rgba(255,217,0,0.15)" strokeDasharray="3,5" />
                <line x1="0" y1="40" x2="400" y2="40" stroke="rgba(255,217,0,0.1)" strokeDasharray="3,5" />
              </svg>
            </div>
          </BentoCard>

          {/* Card 02 - Plan & Organize with checklists */}
          <BentoCard delay={0.1}>
            <div>
              <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#D4AF37] block mb-4 uppercase">
                02 Plan & Organize
              </span>
              <h3 className="font-display text-xl md:text-2xl font-black text-white leading-snug tracking-tight mb-8">
                We plan and organize the process while keeping all technical aspects in mind.
              </h3>
              
              {/* Checklists exactly corresponding to screenshot */}
              <div className="flex flex-col gap-4">
                {[
                  "MT5 Admin Solutions",
                  "Server Management",
                  "Bridge & Gateway Integrations",
                  "Data Protection",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full border border-gold-500/30 flex items-center justify-center bg-gold-500/10 text-gold-400">
                      <svg
                        className="w-3 h-3 text-gold-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="font-sans font-medium text-stone-200 text-sm">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* Card 03 - Smart Executions with checklists */}
          <BentoCard delay={0}>
            <div>
              <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#D4AF37] block mb-4 uppercase">
                03 Smart Executions
              </span>
              <h3 className="font-display text-xl md:text-2xl font-black text-white leading-snug tracking-tight mb-8">
                Every plan is executed with precision, efficiency, and intelligence.
              </h3>
              
              {/* Checklists */}
              <div className="flex flex-col gap-4">
                {[
                  "Trade Analysis",
                  "Platform Security",
                  "Trainings",
                  "Risk Management",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full border border-gold-500/30 flex items-center justify-center bg-gold-500/10 text-gold-400">
                      <svg
                        className="w-3 h-3 text-gold-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="font-sans font-medium text-stone-200 text-sm">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* Card OUR MISSION - Custom Layout */}
          <BentoCard delay={0.1}>
            {/* Shield/badge vector on top right */}
            <div className="absolute top-10 right-10 flex items-center justify-center h-12 w-12 rounded-full border border-gold-500/20 bg-gold-500/5 text-gold-400 z-10">
              <Icon name="Shield" size={24} />
            </div>

            <div className="h-full flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#D4AF37] block mb-4 uppercase">
                  Our Mission
                </span>
                <h3 className="font-display text-xl md:text-2xl font-black text-white leading-snug tracking-tight mb-4 max-w-sm">
                  We Empower Forex Brokers To Operate Seamlessly
                </h3>
                <p className="font-sans font-light text-stone-400 text-sm leading-relaxed mb-8 max-w-md">
                  First impressions matter. That's why our mission is to build stable, efficient, and secure trading environments that define trust from the very first trade.
                </p>
              </div>

              {/* Custom Outline Button: BOOK A CONSULTATION */}
              <div className="mt-auto">
                <a
                  href={waLink(WA_CONSULT_MSG)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Book a Consultation with 4X BackOffice on WhatsApp"
                  className="inline-block px-8 py-3.5 rounded-none border border-gold-500 text-gold-400 hover:text-stone-950 hover:bg-gold-500 font-display text-xs font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer"
                >
                  Book A Consultation
                </a>
              </div>
            </div>
          </BentoCard>

        </div>

      </div>

      {/* Down Connector layout */}
      <div className="mt-20 flex flex-col items-center">
        <div className="w-[1px] h-14 bg-gradient-to-b from-white/10 to-transparent" />
      </div>
    </section>
  );
};
