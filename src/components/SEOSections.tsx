import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Icon } from "./Icon";
import { SpotlightCard } from "./SpotlightCard";
import { ScrollReveal3D } from "./ScrollReveal3D";
import { WHATSAPP_URL, waLink, WA_DEMO_MSG, WA_DETAILS_MSG } from "../config";

interface SEOSectionsProps {
  onTalkClick: () => void;
}

export const SEOSections: React.FC<SEOSectionsProps> = ({ onTalkClick }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Section 1 - Comprehensive Forex Back Office Services Card Data
  const servicesCards = [
    {
      id: "srv-card-mt5",
      title: "MT5 Administration",
      subtitle: "Custom Configurations & Groups",
      desc: "Complete setup and performance orchestration for MT5 infrastructure. Manage symbol groups, risk settings, manager clearance permissions, database hygiene, and backend plugin installations for seamless core efficiency.",
      icon: "Settings",
    },
    {
      id: "srv-card-liq",
      title: "Liquidity Bridge Management",
      subtitle: "High-Performance Bridge Gateways",
      desc: "Integrate powerful liquidity bridges powered by global aggregators (PrimeXM, Centroid Solutions). Ensure smart order routing, hybrid A/B book executions, and sub-millisecond route optimization under volatility.",
      icon: "GitMerge",
    },
    {
      id: "srv-card-ops",
      title: "Broker Operations Support",
      subtitle: "Dedicated Dealer Assistance",
      desc: "Continuous backing support for client onboarding, risk exposure metrics checking, manual trade adjustment, data protection reports, and absolute platform regulatory compliance.",
      icon: "Activity",
    },
    {
      id: "srv-card-infra",
      title: "Infrastructure Management",
      subtitle: "Financial Server Cohosting",
      desc: "Deploy in premium low-latency financial datacenters (Equinix NY4, LD4, SG1, TY3) equipped with physical server management, private network configurations, and massive failover loops.",
      icon: "Server",
    },
    {
      id: "srv-card-tech",
      title: "Technical Support",
      subtitle: "Highly Responsive SLA",
      desc: "SLA-driven technical consulting with 24/7 proactive monitoring, instant patch deployment, emergency configurations backup, and direct engineer-to-broker hotline coverage.",
      icon: "PhoneCall",
    },
  ];

  // Section 2 - MT5 Hosting & Infrastructure Management Items
  const mt5HostingItems = [
    {
      id: "host-item-1",
      title: "Dedicated Servers",
      text: "Deploy on dedicated single-tenant bare-metal nodes configured solely for your broker load profile, eliminating noisy-neighbor latency spikes.",
      icon: "Cpu",
    },
    {
      id: "host-item-2",
      title: "Security Monitoring",
      text: "Continuous perimeter shielding and traffic scanning to mitigate volumetric DDoS attacks, zero-day threat vectors, and server intrusions.",
      icon: "ShieldAlert",
    },
    {
      id: "host-item-3",
      title: "Performance Optimization",
      text: "Sub-millisecond route optimization. We fine-tune physical fiber cross-connect lines linking your server instantly to global liquidity pools.",
      icon: "Zap",
    },
    {
      id: "host-item-4",
      title: "Automated Backups",
      text: "Automated triple-redundant state logging and secure DB hourly snapshots, enabling fast system recovery with zero trade state losses.",
      icon: "Database",
    },
    {
      id: "host-item-5",
      title: "Global Infrastructure",
      text: "Co-located physical structures in NY4 (New York), LD4 (London), SG1 (Singapore), and TY3 (Tokyo) to serve global brokers at absolute peak levels.",
      icon: "Globe",
    },
  ];

  // Section 4 - Why Brokers Choose 4XBO
  const whyChooseItems = [
    {
      id: "why-item-1",
      title: "Enterprise-grade security",
      text: "Rigorous administrative safety. Multi-factor logins, data segmentation, custom role matrix configurations, and full physical firewalls safeguarding your backend.",
    },
    {
      id: "why-item-2",
      title: "High-performance infrastructure",
      text: "Optimized server frameworks achieving low latency and stable MT5 core execution loads, even during critical macroeconomic volatile events.",
    },
    {
      id: "why-item-3",
      title: "Scalable architecture",
      text: "Our back-office modules scale effortlessly as your trader base grows. Launch thousands of trading accounts and additional instruments with zero downtime.",
    },
    {
      id: "why-item-4",
      title: "Experienced operations team",
      text: "Managed by certified experts with 10+ years of deep background in forex technology, liquidity bridges deployment, and multi-asset risk management.",
    },
    {
      id: "why-item-5",
      title: "24/7 technical support",
      text: "Dedicated SLA response. Around-the-clock technical guidance to handle emergency scenarios, core system patches, and hardware maintenance protocols.",
    },
  ];

  // Trust Building Metrics Section
  const trustBuildingMetrics = [
    {
      id: "trust-metric-1",
      title: "Forex Infrastructure Management",
      desc: "Low-latency forex back office solutions hosted across tier-1 financial data centers globally (LD4, NY4, SG1, TY3). We build, monitor, and scale ultra-fast private networks.",
      stat: "Global Hosting",
    },
    {
      id: "trust-metric-2",
      title: "Expert MT5 Administration",
      desc: "Complete MT5 administration and broker operations support including custom configurations, routing groups setup, secure client logs, and continuous server maintenance.",
      stat: "SLA Guaranteed",
    },
    {
      id: "trust-metric-3",
      title: "Liquidity Bridge Solutions",
      desc: "Connect your broker ecosystem directly to deep asset pools with intelligent order routing. Minimize transaction slip with modern bridging and aggregation channels.",
      stat: "Sub-Millisecond",
    },
  ];

  // FAQ Items
  const faqItems = [
    {
      question: "What are Forex Back Office Services?",
      answer: "Forex back-office services encompass the operational framework required to run a brokerage, including MT5 server setup, administration, custom bridge routing, compliance tracking, data protection compliance, and customer lifecycle management. By delegating these complex tasks to 4XBO, brokers can focus on client acquisition, marketing, and commercial scaling.",
    },
    {
      question: "Do you provide MT5 administration?",
      answer: "Yes, we offer comprehensive MT5 platform administration. This includes full group setups, trade symbol configuration, risk book parameters, server maintenance, manager access provisions, custom plugin installations, and real-time support to guarantee continuous server uptime, protecting your business from sudden outages.",
    },
    {
      question: "Do you support liquidity bridge integrations?",
      answer: "Yes, we deploy and manage high-performance liquidity bridge systems and aggregation gateways in partnership with industry leaders like PrimeXM, Centroid Solutions, and Tools for Brokers. We configure smart order routing, hybrid A/B book models, and execution parameters to ensure optimal execution speeds and minimal slip.",
    },
    {
      question: "How does 4XBO help brokers scale?",
      answer: "We provide enterprise-grade infrastructure and expert configurations that reduce platform latency down to sub-milliseconds. With our scalable architecture, 24/7 operations team, and multi-asset hosting, your brokerage can launch new accounts, add trading symbols, and transition to new liquidity pools with zero system disruption.",
    },
  ];

  // FAQPage schema — emitted ONLY here, where the FAQ is actually visible, so
  // the markup stays byte-identical to the on-page questions/answers (Google
  // policy). Organization/WebSite/ProfessionalService/Breadcrumb live in
  // src/seo.ts (injected once per route by App.tsx) — do not duplicate them here.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://4xbo.com/#faq",
    "mainEntity": faqItems.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  };

  return (
    <>
      {/* FAQ structured data — matches the visible FAQ section below */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Trust-Building Metrics Section (Conversion Optimization Goal) */}
      <section id="trust-metrics" className="relative py-20 bg-stone-950 border-t border-b border-white/5 overflow-hidden px-4 select-none">
        <div className="absolute inset-0 bg-[#060606] bg-[linear-gradient(to_right,rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40 z-0" />
        <div className="max-w-7xl mx-auto z-10 relative">
          <ScrollReveal3D>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[10px] font-mono font-black tracking-[0.25em] text-gold-500 uppercase block mb-3">
                Trusted Forex Infrastructure Metrics
              </span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
                Enterprise Forex Broker Infrastructure & Operations Support
              </h2>
              <p className="font-sans font-light text-stone-400 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
                Deliver seamless trading experiences with high-performance forex back office solutions. We specialize in comprehensive MT5 administration, dedicated broker operations support, automated CRM integration, and high-frequency liquidity bridge solutions. Boost operational efficiency with low-latency forex broker technology and enterprise-grade forex infrastructure management designed to scale institutional platforms worldwide.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trustBuildingMetrics.map((tech) => (
                <div key={tech.id} className="h-full">
                  <SpotlightCard
                    className="bg-[#0b0b0f]/80 p-6 rounded-none border border-white/5 relative flex flex-col justify-between h-full glow-card"
                  >
                    <div>
                      <span className="text-2xl font-mono font-bold text-gold-400 block mb-4 filter drop-shadow-[0_0_8px_rgba(202,162,96,0.3)]">
                        {tech.stat}
                      </span>
                      <h3 className="font-sans text-md font-bold text-stone-100 tracking-tight leading-tight mb-2">
                        {tech.title}
                      </h3>
                      <p className="font-sans font-light text-stone-400 text-xs leading-relaxed">
                        {tech.desc}
                      </p>
                    </div>
                  </SpotlightCard>
                </div>
              ))}
            </div>
          </ScrollReveal3D>
        </div>
      </section>

      {/* SECTION 1: Comprehensive Forex Back Office Services */}
      <section id="comprehensive-services" className="relative py-24 bg-[#050505] overflow-hidden px-4 md:px-8 select-none border-b border-white/5">
        <div className="absolute top-[20%] right-[-10%] w-[450px] h-[450px] bg-gold-500/3 blur-[150px] rounded-full pointer-events-none z-0" />

        <div className="relative max-w-7xl mx-auto z-10">
          <ScrollReveal3D>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-gold-500 uppercase block mb-3">
                PLATFORM OPERATIONAL HIGHLIGHTS
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                Comprehensive Forex Back Office Services
              </h2>
              <p className="mt-4 font-sans font-light text-stone-400 text-sm sm:text-base leading-relaxed">
                We engineer total stability for high-velocity brokers globally. Power your trading systems through dedicated setups built with absolute precision.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
              {servicesCards.map((service) => (
                <SpotlightCard
                  key={service.id}
                  spotlightColor="rgba(202, 162, 96, 0.15)"
                  className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-21.33px)] bg-[#0b0b0b] border border-white/5 p-6 md:p-8 flex flex-col justify-between shadow-lg relative rounded-none transition-all duration-500 group hover:-translate-y-2 hover:border-gold-500/50 hover:shadow-[0_15px_45px_rgba(202,162,96,0.18)] flex-shrink-0"
                >
                  {/* Premium top glowing laser line */}
                  <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-gold-400 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center z-20" />
                  
                  {/* Subtle inside ambient radial background glow to keep colors warm */}
                  <div className="absolute inset-0 bg-transparent group-hover:bg-[radial-gradient(circle_at_center,rgba(202,162,96,0.02)_0%,transparent_70%)] pointer-events-none transition-all duration-500" />

                  <div className="relative z-10">
                    {/* Glowing Icon Container */}
                    <div className="h-11 w-11 rounded-full bg-gold-400/5 text-gold-400 border border-gold-400/10 flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-gold-500/15 group-hover:text-gold-300 group-hover:border-gold-400/35 group-hover:shadow-[0_0_20px_rgba(202,162,96,0.35)]">
                      <Icon name={service.icon} size={20} />
                    </div>
                    
                    <span className="font-mono text-[10px] tracking-[0.1em] text-stone-500 block mb-1 uppercase group-hover:text-gold-500/70 transition-colors duration-300">
                      {service.subtitle}
                    </span>
                    
                    <h3 className="font-sans text-lg font-bold text-stone-300 group-hover:text-white transition-colors duration-300 tracking-tight leading-tight mb-4 text-left">
                      {service.title}
                    </h3>
                    
                    <p className="font-sans font-light text-stone-400 text-xs leading-relaxed mb-6 text-left group-hover:text-stone-300 transition-colors duration-300">
                      {service.desc}
                    </p>
                  </div>

                  <div className="text-left relative z-10 pt-4 border-t border-white/[0.03] group-hover:border-gold-500/15 transition-colors duration-500">
                    <a
                      href={waLink(WA_DETAILS_MSG)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Request details on WhatsApp"
                      className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-gold-400 hover:text-gold-300 uppercase transition-all duration-300 cursor-pointer"
                    >
                      <span className="relative overflow-hidden group/link">
                        <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1">Request Details</span>
                      </span>
                      <motion.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Icon name="ArrowRight" size={10} className="text-gold-400 group-hover:text-gold-300" />
                      </motion.div>
                    </a>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </ScrollReveal3D>
        </div>
      </section>

      {/* SECTION 2: MT5 Hosting & Infrastructure Management */}
      <section id="hosting-infrastructure" className="relative py-24 bg-[#080808] overflow-hidden px-4 md:px-8 select-none border-b border-white/5">
        <div className="absolute top-1/2 left-[-15%] w-[500px] h-[500px] bg-gold-500/2 blur-[170px] rounded-full pointer-events-none z-0" />

        <div className="relative max-w-7xl mx-auto z-10">
          <ScrollReveal3D>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 flex flex-col items-start">
                <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-gold-500 uppercase block mb-3">
                  ZERO-LATENCY ARCHITECTURE
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#FCFCFC] tracking-tight leading-none mb-6">
                  MT5 Hosting & Infrastructure Management
                </h2>
                <p className="font-sans font-light text-stone-400 text-sm leading-relaxed mb-8">
                  We manage enterprise setups physically linked via elite network cross-connects with top tier-1 liquidity providers. Our infrastructure shields your brokerage with continuous performance auditing.
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Talk to 4X BackOffice experts on WhatsApp"
                  className="inline-block px-8 py-3.5 border border-gold-500 text-gold-400 hover:text-stone-950 hover:bg-gold-500 font-display text-xs font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer"
                >
                  Talk to Our Experts
                </a>
              </div>

              <div className="lg:col-span-7 space-y-4">
                {mt5HostingItems.map((item) => (
                  <div
                    key={item.id}
                    className="group flex gap-4 p-5 bg-[#0b0b0b]/60 border border-white/5 rounded-none hover:bg-stone-900/40 hover:border-gold-500/20 transition-all duration-300 text-left glow-card"
                  >
                    <div className="flex-shrink-0 h-10 w-10 bg-white/5 text-stone-400 border border-white/5 rounded-full flex items-center justify-center group-hover:text-gold-400 group-hover:border-gold-400/20 group-hover:bg-gold-400/5 transition-all duration-300">
                      <Icon name={item.icon} size={18} />
                    </div>
                    <div>
                      <h3 className="font-sans text-sm font-bold text-stone-200 tracking-tight leading-tight mb-1 group-hover:text-white transition-colors">
                        {item.title}
                      </h3>
                      <p className="font-sans font-light text-stone-400 text-xs leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal3D>
        </div>
      </section>

      {/* SECTION 4: Why Brokers Choose 4XBO */}
      <section id="why-brokers-choose" className="relative py-24 bg-[#080808] overflow-hidden px-4 md:px-8 select-none border-b border-white/5">
        <div className="absolute top-[30%] left-1/3 w-[450px] h-[450px] bg-gold-500/3 blur-[140px] rounded-full pointer-events-none z-0" />

        <div className="relative max-w-7xl mx-auto z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-gold-500 uppercase block mb-3">
              THE 4XBO BENEFIT
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-[#FCFCFC] tracking-tight leading-tight">
              Why Brokers Choose 4XBO
            </h2>
            <p className="mt-4 font-sans font-light text-stone-400 text-sm leading-relaxed">
              Serving the global financial sector with persistent innovation, robust hardware setups, and a customer-first focus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {whyChooseItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, borderColor: "rgba(202, 162, 96, 0.25)" }}
                className="bg-[#0b0b0b] border border-white/5 p-6 md:p-8 flex flex-col justify-start shadow-xl relative rounded-none transition-all duration-300 step glow-card"
              >
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gold-400/5 text-gold-400 border border-gold-400/10 flex items-center justify-center font-mono text-xs font-black mb-6 n">
                  {`0${idx + 1}`}
                </div>
                <h4 className="font-sans text-md font-bold text-stone-100 tracking-tight leading-tight mb-3 transition-colors duration-300">
                  {item.title}
                </h4>
                <p className="font-sans font-light text-stone-400 text-xs leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}

            {/* A Dynamic CTA Card as the last box to beautifully aggregate conversions */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, borderColor: "rgba(202, 162, 96, 0.25)" }}
              className="bg-[#0b0b0b] border border-white/5 p-6 md:p-8 flex flex-col justify-between shadow-xl relative rounded-none transition-all duration-300 step glow-card"
            >
              <div>
                <Icon name="Crown" size={24} className="text-gold-400 mb-6 filter drop-shadow-[0_0_8px_rgba(202,162,96,0.3)] animate-pulse" />
                <h3 className="font-sans text-md font-extrabold text-white tracking-tight leading-tight mb-3 uppercase">
                  Infrastructure Built Around You
                </h3>
                <p className="font-sans font-light text-stone-300 text-xs leading-relaxed max-w-xs">
                  We support 15+ global brokers, maintaining a 4.9/5 satisfaction score. We'd be glad to explore how our fintech expertise can support your operations.
                </p>
              </div>
              <a
                href={waLink(WA_DEMO_MSG)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Request a Demo from 4X BackOffice on WhatsApp"
                className="inline-block w-full text-center py-3 bg-gold-500 text-stone-950 font-display text-xs font-black tracking-widest uppercase shadow-lg shadow-gold-500/10 hover:bg-gold-400 active:scale-[0.98] transition-all cursor-pointer mt-6"
              >
                Request a Demo
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PREMIUM FAQ SECTION */}
      <section id="faq-section" className="relative py-24 bg-[#050505] overflow-hidden px-4 md:px-8 select-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[250px] bg-gold-500/3 blur-[120px] rounded-full pointer-events-none z-0" />
        <div className="max-w-4xl mx-auto z-10 relative">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-mono font-black tracking-[0.25em] text-gold-500 uppercase block mb-3">
              KNOWLEDGE BASE support
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-none mb-4">
              Frequently Asked Questions
            </h2>
            <p className="font-sans font-light text-stone-400 text-xs sm:text-sm leading-relaxed">
              Explore immediate, expert-rich responses surrounding professional Forex Broker Infrastructure, custom integrations, and operational scalabilities.
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setOpenFaq(idx)}
                  onMouseLeave={() => setOpenFaq(null)}
                  className={`bg-[#0b0b0f] border [transition:border-color_400ms_ease,box-shadow_400ms_ease,background-color_400ms_ease] rounded-none relative group overflow-hidden ${
                    isOpen
                      ? "border-gold-500/40 shadow-[0_0_35px_rgba(202,162,96,0.18)] bg-[#0e0e14]"
                      : "border-white/5 hover:border-gold-500/20"
                  }`}
                >
                  {/* Gentle inside ambient radial glow to keep it extremely elegant */}
                  <div className={`absolute inset-0 bg-transparent transition-all duration-500 pointer-events-none z-0 ${
                    isOpen ? "opacity-100 bg-[radial-gradient(circle_at_center,rgba(202,162,96,0.03)_0%,transparent_70%)]" : "opacity-0"
                  }`} />

                  {/* Top glowing focus-edge */}
                  <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-400 to-transparent transform transition-all duration-500 origin-center z-10 ${
                    isOpen ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                  }`} />

                  <button
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                    className="w-full flex justify-between items-center px-6 py-5 text-left cursor-pointer group relative z-10"
                  >
                    <span className={`font-sans text-sm md:text-base font-bold transition-all duration-300 ${
                      isOpen ? "text-gold-400 drop-shadow-[0_0_8px_rgba(202,162,96,0.2)]" : "text-stone-200 group-hover:text-gold-400"
                    }`}>
                      {item.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0, color: isOpen ? "#caa260" : "#a8a29e" }}
                      transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                      className="ml-4"
                    >
                      <Icon name="ChevronDown" size={20} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
                          opacity: { duration: 0.35, ease: "easeInOut" },
                        }}
                        className="overflow-hidden relative z-10"
                      >
                        <div className="px-6 pb-6 text-stone-350 font-sans font-light text-xs sm:text-sm leading-relaxed border-t border-white/[0.03] pt-4 transition-colors">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
