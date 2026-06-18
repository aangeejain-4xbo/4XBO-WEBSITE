import React, { useState } from "react";
import { motion } from "motion/react";
import { Icon } from "./Icon";
import { WHATSAPP_URL, CONSULTATION_PHONE, CONTACT_EMAIL } from "../config";

interface ProductsProps {
  onTalkClick: () => void;
}

export const Products: React.FC<ProductsProps> = ({ onTalkClick }) => {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  // Staggered layout configuration lists enriched for Technical SEO requirements
  const productsList = [
    {
      id: 1,
      tag: "OVERNIGHT RISK GATE",
      title: "Swap Management",
      description:
        "Automate swap calculations and manage overnight financing with complete flexibility across symbols, account groups, and trading environments.",
      longDescription:
        "4X BackOffice Swap Management is an enterprise-grade rollover automation solution designed to manage overnight financing rates across multiple MT5 servers. The platform empowers broker operations with sub-millisecond calculation pipelines, allowing direct configuration on a per-symbol or per-group level. This protects brokerages from overnight interest leakages, arbitrage exploits, and high-intensity trading news fluctuations, ensuring flawless ledger consistency.",
      features: [
        "Dynamic Swap Configuration",
        "Custom Group Rules",
        "Automated Calculations",
        "Symbol-Based Management",
        "Broker Control Panel",
      ],
      visualType: "swap",
    },
    {
      id: 2,
      tag: "FINANCIAL INTEGRITY",
      title: "Credit Management",
      description:
        "Manage client credits, bonuses, and account adjustments efficiently through a centralized infrastructure.",
      longDescription:
        "Our centralized credit management engine streamlines leverage allocations, virtual promotional multipliers, database margins, and commission rollbacks. This fully automated control layer runs real-time margin risk audits, protecting main broker liquidity pools from sudden negative balance situations under high leveraged user profiles.",
      features: [
        "Credit Allocation",
        "Bonus Management",
        "Automated Adjustments",
        "Real-Time Monitoring",
        "Risk Controls",
      ],
      visualType: "credit",
    },
    {
      id: 3,
      tag: "DEALING SHIELD",
      title: "B-Book Slippage Management",
      description:
        "Control execution quality and optimize dealing desk operations through intelligent slippage and risk management tools.",
      longDescription:
        "4X BackOffice B-Book Slippage Management is an institutional execution safeguard constructed for hybrid brokerage desks. The platform monitors incoming order execution delay values, routing paths, and slippage indexes (pips) in real-time. This dynamic deal shield detects latency arbitrage and automatically re-routes toxic order flows to external STP liquidity providers, safeguarding the brokerage's bottom-line profitability.",
      features: [
        "Slippage Configuration",
        "Execution Controls",
        "Dealer Monitoring",
        "Risk Optimization",
        "Advanced Reporting",
      ],
      visualType: "slippage",
    },
    {
      id: 4,
      tag: "SOCIAL INVESTMENT",
      title: "Copy Trading",
      description:
        "Enable investors to replicate successful trading strategies through a secure and scalable copy trading ecosystem.",
      longDescription:
        "Drive account acquisitions and trade volume velocity using the Copy Trading solution. Mirror master signal parameters, trade proportions, and commission structures across thousands of follower allocations with zero system friction. Designed with dedicated load balances, copy actions transmit under sub-millisecond timelines to ensure zero signal lag under volatile markets.",
      features: [
        "Master Account Management",
        "Real-Time Synchronization",
        "Multi-Level Controls",
      ],
      visualType: "copytrade",
    },
  ];

  // Schema generation for Google E-E-A-T and Product validation
  const productsSchema = {
    "@context": "https://schema.org",
    "@graph": productsList.map((prod) => ({
      "@type": "Product",
      "@id": `https://4xbo.com/products#prod-${prod.id}`,
      "name": `${prod.title} - Forex Broker Solutions`,
      "image": "https://4xbo.com/logo-og.png",
      "description": prod.longDescription,
      "brand": {
        "@type": "Brand",
        "name": "4X BackOffice"
      },
      "category": "B2B Fintech Broker software",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "USD",
        "offeredBy": {
          "@type": "Organization",
          "@id": "https://4xbo.com/#organization",
          "name": "4X BackOffice",
          "url": "https://4xbo.com",
          "telephone": CONSULTATION_PHONE,
          "email": CONTACT_EMAIL
        }
      }
    }))
  };

  return (
    <div className="relative min-h-screen bg-[#080808] text-white overflow-hidden select-none">
      {/* Structural Product Schemas Dynamic Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productsSchema) }}
      />
      
      {/* ----------------- HERO SECTION ----------------- */}
      <section className="relative min-h-[75vh] md:min-h-[80vh] flex flex-col justify-center items-center py-24 md:py-32 px-4 md:px-8 border-b border-white/5">
        
        {/* Luxury elements backdrop */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[320px] sm:w-[580px] aspect-square bg-[radial-gradient(circle_at_center,rgba(217,174,103,0.06)_0%,rgba(0,0,0,0)_65%)] blur-[80px] pointer-events-none z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/10 via-transparent to-[#080808]" />

        <div className="relative z-10 max-w-4xl text-center flex flex-col items-center">
          
          {/* Badge Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0d0d0d] border border-gold-400/20 mb-6 backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse shadow-[0_0_6px_#ffd900]" />
            <span className="text-[10px] md:text-[11px] font-mono font-bold tracking-[0.25em] text-gold-400 uppercase">
              SOVEREIGN SYSTEMS & TOOLS
            </span>
          </motion.div>

          {/* Title and Subtitle Reveal */}
          <motion.h1 
            initial={{ opacity: 0, y: 25, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.05]"
          >
            Forex Broker Products
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
            className="text-gold-300 font-display text-lg sm:text-xl md:text-2xl font-light tracking-wide mt-4 md:mt-5 leading-snug text-glow-gold"
          >
            Institutional-Grade Solutions for Modern Forex Brokers
          </motion.p>

          <motion.p 
            initial={{ opacity: 0, y: 15, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
            className="mt-6 font-sans font-light text-stone-400 text-sm sm:text-base leading-relaxed max-w-2xl border-t border-white/5 pt-6"
          >
            Enhance profitability, automate operations, and scale your brokerage with advanced infrastructure solutions. Engineered with flawless redundancy to run at maximum velocity globally.
          </motion.p>

          {/* Action indicator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.45, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-14 flex flex-col items-center gap-2 text-[9px] font-mono tracking-[0.3em] uppercase text-stone-500 animate-[bounce_3.5s_infinite]"
          >
            <span>SCROLL TO SYSTEM CORE</span>
            <span className="text-xs">&darr;</span>
          </motion.div>
        </div>
      </section>

      {/* ----------------- PRODUCTS SECTION ----------------- */}
      <section className="relative py-28 md:py-36 px-4 md:px-8 z-10 max-w-7xl mx-auto">
        <div className="space-y-36 md:space-y-48">
          
          {productsList.map((product, index) => {
            const isImageLeft = index % 2 === 0; // Alternate layout pattern
            const isHovered = hoveredProduct === product.id;

            return (
              <div 
                key={product.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch"
              >
                
                {/* Visual Area (Responsive placement switching based on isImageLeft) */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className={`lg:col-span-6 w-full ${isImageLeft ? "order-first" : "order-first lg:order-last"}`}
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <div className={`relative rounded-xl border p-6 md:p-8 bg-[#0b0c0d]/80 overflow-hidden group shadow-2xl transition-all duration-700 min-h-[300px] md:min-h-[360px] h-full flex flex-col justify-between ${
                    isHovered 
                      ? "border-gold-500/30 shadow-[0_0_40px_rgba(217,174,103,0.06)] translate-y-[-4px]" 
                      : "border-white/5 shadow-black/80"
                  }`}>
                    
                    {/* Low opacity digital network grid within card itself */}
                    <div className="absolute inset-0 bg-[#060606] bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:20px_20px] opacity-40 z-0" />
                    
                    {/* Radial backlight aura that glows on hover */}
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] rounded-full transition-opacity duration-1000 blur-[60px] pointer-events-none z-0 ${
                      isHovered ? "bg-gold-500/10 opacity-100" : "bg-gold-500/3 opacity-40"
                    }`} />

                    {/* MOCKUP CONTENTS ACCORDING TO USER'S DETAILED REQUESTS */}
                    <div className="relative z-10 w-full h-full flex flex-col justify-between grow">
                      
                      {/* 1. MOCKUP: SWAP MANAGEMENT */}
                      {product.visualType === "swap" && (
                        <div className="flex flex-col h-full justify-between gap-5 font-mono animate-[float_6s_ease-in-out_infinite]">
                          <div className="flex items-center justify-between border-b border-white/5 pb-3">
                            <span className="text-[10px] tracking-widest text-[#D9AE67] uppercase font-bold flex items-center gap-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-ping" />
                              Rollover Portal v4.2
                            </span>
                            <span className="text-[9px] text-stone-500">OVERNIGHT TIMERS: ACTIVE</span>
                          </div>

                          <div className="grid grid-cols-3 gap-2 text-center text-[10px] md:text-[11px] my-auto">
                            {[
                              { label: "EURUSD", long: "-4.25", short: "+1.15", active: true },
                              { label: "GBPUSD", long: "-5.80", short: "+1.65", active: false },
                              { label: "XAUUSD", long: "-18.50", short: "+4.20", active: true },
                            ].map((row, rIdx) => (
                              <div 
                                key={rIdx} 
                                className={`p-2 rounded border transition-all duration-300 ${
                                  row.active && isHovered
                                    ? "bg-gold-500/5 border-gold-500/35 shadow-[0_0_12px_rgba(217,174,103,0.12)]"
                                    : "bg-black/40 border-white/5"
                                }`}
                              >
                                <span className="font-bold text-stone-200 block mb-1">{row.label}</span>
                                <div className="space-y-0.5 text-[8px] sm:text-[9px] text-stone-400">
                                  <div className="flex justify-between"><span>Long:</span><span className="text-red-400">{row.long}</span></div>
                                  <div className="flex justify-between"><span>Short:</span><span className="text-emerald-400">{row.short}</span></div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="flex justify-between items-center text-[9px] text-stone-500 border-t border-white/5 pt-3">
                            <span>COUNTDOWN TO 22:00 UTC</span>
                            <span className="text-gold-400 text-[10px] font-bold tracking-wider">01:14:42</span>
                          </div>
                        </div>
                      )}

                      {/* 2. MOCKUP: CREDIT MANAGEMENT */}
                      {product.visualType === "credit" && (
                        <div className="flex flex-col h-full justify-between gap-5 font-mono animate-[float_6s_ease-in-out_infinite_1.5s]">
                          <div className="flex items-center justify-between border-b border-white/5 pb-3">
                            <span className="text-[10px] tracking-widest text-[#D9AE67] uppercase font-bold flex items-center gap-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                              Underwriter Core
                            </span>
                            <span className="text-[9px] text-stone-500">RISK CONTROL: LOCKED</span>
                          </div>

                          <div className="space-y-2.5 my-auto">
                            <div className="grid grid-cols-2 gap-3 mb-2">
                              <div className="p-2 px-3 rounded bg-black/50 border border-white/5">
                                <span className="text-[8px] text-stone-400 block uppercase">Allocated Multipliers</span>
                                <span className="text-xs sm:text-sm font-bold text-white">$450,000.00</span>
                              </div>
                              <div className="p-2 px-3 rounded bg-black/50 border border-white/5">
                                <span className="text-[8px] text-stone-400 block uppercase">Safe Margin Ratio</span>
                                <span className="text-xs sm:text-sm font-bold text-gold-400">142.8%</span>
                              </div>
                            </div>

                            {[
                              { id: "A-59122", amount: "+$25,000.00", status: "Allocated", c: "text-emerald-400" },
                              { id: "A-48011", amount: "-$12,500.00", status: "Auto-Damp", c: "text-amber-400" },
                            ].map((tx, tIdx) => (
                              <div key={tIdx} className="flex items-center justify-between bg-black/20 px-3 py-1.5 rounded text-[10px] border border-white/5">
                                <span className="text-stone-300">Client {tx.id}</span>
                                <span className={tx.c}>{tx.amount}</span>
                                <span className="text-stone-500 text-[9px]">{tx.status}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex justify-between items-center text-[9px] text-stone-500 border-t border-white/5 pt-3">
                            <span>RECONCILIATION GATE: SYNC</span>
                            <span className="text-emerald-400 text-[10px]">99.998% SLA</span>
                          </div>
                        </div>
                      )}

                      {/* 3. MOCKUP: B-BOOK SLIPPAGE MANAGEMENT */}
                      {product.visualType === "slippage" && (
                        <div className="flex flex-col h-full justify-between gap-4 font-mono animate-[float_6s_ease-in-out_infinite_3s]">
                          <div className="flex items-center justify-between border-b border-white/5 pb-3">
                            <span className="text-[10px] tracking-widest text-[#D9AE67] uppercase font-bold flex items-center gap-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                              Shield Engine active
                            </span>
                            <span className="text-[9px] text-stone-500">DEALING PORT: 3042</span>
                          </div>

                          <div className="relative h-20 bg-black/60 rounded border border-white/5 overflow-hidden flex items-end px-3 my-auto">
                            {/* Low opacity simulated line network graph */}
                            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 280 80" preserveAspectRatio="none">
                              <path 
                                d="M 0 60 Q 30 70 60 40 T 120 45 T 180 20 T 240 50 T 280 15" 
                                fill="none" 
                                stroke="#D9AE67" 
                                strokeWidth="1.5"
                                className="opacity-80"
                              />
                              <path 
                                d="M 0 60 Q 30 70 60 40 T 120 45 T 180 20 T 240 50 T 280 15 L 280 80 L 0 80 Z" 
                                fill="url(#gold-area-gradient)" 
                                className="opacity-10"
                              />
                              <defs>
                                <linearGradient id="gold-area-gradient" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#D9AE67" />
                                  <stop offset="100%" stopColor="#D9AE67" stopOpacity="0" />
                                </linearGradient>
                              </defs>
                              {/* Horizontal threshold reference line */}
                              <line x1="0" y1="35" x2="280" y2="35" stroke="rgba(255,255,255,0.1)" strokeDasharray="3,3" />
                            </svg>
                            <span className="absolute top-1.5 left-2 text-[8px] text-stone-400">SLIPPAGE MARGIN THRESHOLD (MAX 0.5 PIPS)</span>
                            <span className="absolute bottom-1.5 right-2 text-[9px] font-bold text-[#D9AE67] bg-black/80 px-1 rounded animate-pulse">0.12 ms DELAY</span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-[9px] text-stone-500 border-t border-white/5 pt-3">
                            <div>LIMITS: <span className="text-stone-300">AUTO-CLAMP</span></div>
                            <div className="text-right">PROTECTION STATUS: <span className="text-emerald-400">ONLINE</span></div>
                          </div>
                        </div>
                      )}

                      {/* 4. MOCKUP: COPY TRADING */}
                      {product.visualType === "copytrade" && (
                        <div className="flex flex-col h-full justify-between gap-5 font-mono animate-[float_6s_ease-in-out_infinite_4.5s]">
                          <div className="flex items-center justify-between border-b border-white/5 pb-3">
                            <span className="text-[10px] tracking-widest text-[#D9AE67] uppercase font-bold flex items-center gap-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                              Synchronizer Core v1
                            </span>
                            <span className="text-[9px] text-stone-500">SYNC INTERVAL: LIVE</span>
                          </div>

                          <div className="relative flex items-center justify-center h-28 my-auto overflow-hidden">
                            {/* Network core nodes mapping */}
                            <svg className="w-full h-full max-w-[280px]" viewBox="0 0 280 100">
                              {/* Connector lines dynamic glow */}
                              <g className="stroke-[#D9AE67]/25" strokeWidth="0.75">
                                <line x1="140" y1="50" x2="60" y2="25" />
                                <line x1="140" y1="50" x2="60" y2="75" />
                                <line x1="140" y1="50" x2="220" y2="25" />
                                <line x1="140" y1="50" x2="220" y2="75" />
                              </g>
                              
                              {/* Master Account */}
                              <circle cx="140" cy="50" r="13" fill="#080808" stroke="#D9AE67" strokeWidth="1.5" />
                              <text x="140" y="53" textAnchor="middle" fill="#D9AE67" fontSize="8" fontWeight="bold">M</text>
                              <circle cx="140" cy="50" r="18" fill="none" stroke="#D9AE67" strokeWidth="0.5" strokeDasharray="2,2" className="animate-[spin_20s_linear_infinite]" />

                              {/* Followers nodes */}
                              {[
                                { cx: 60, cy: 25, label: "F1" },
                                { cx: 60, cy: 75, label: "F2" },
                                { cx: 220, cy: 25, label: "F3" },
                                { cx: 220, cy: 75, label: "F4" },
                              ].map((fNode, fIdx) => (
                                <g key={fIdx}>
                                  <circle cx={fNode.cx} cy={fNode.cy} r="8" fill="#0c0d0e" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                                  <text x={fNode.cx} y={fNode.cy + 3} textAnchor="middle" fill="#ccc" fontSize="7">{fNode.label}</text>
                                  {/* Dynamic travelling pulses */}
                                  <circle cx={fNode.cx} cy={fNode.cy} r="12" fill="none" stroke="#D9AE67" strokeWidth="0.5" className="animate-ping" style={{ animationDelay: `${fIdx * 0.8}s`, animationDuration: "2.5s" }} />
                                </g>
                              ))}
                            </svg>
                            <span className="absolute bottom-1 bg-black/80 px-2 py-0.5 rounded text-[8px] tracking-wider text-stone-300">MASTER SYNCHRONIZATION: 100% COMPLETE</span>
                          </div>

                          <div className="flex justify-between items-center text-[9px] text-stone-500 border-t border-white/5 pt-3">
                            <span>TOTAL FOLLOWER DEPTH</span>
                            <span className="text-gold-400 font-bold">$18,450,230</span>
                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                </motion.div>

                {/* Content Area */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:col-span-6 flex flex-col justify-between items-start text-left"
                >
                  <div>
                    {/* Category Pill Tag */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111112] border border-gold-400/20 mb-5 shadow-[0_4px_12px_rgba(217,174,103,0.03)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse shadow-[0_0_6px_rgba(217,174,103,0.8)]" />
                      <span className="text-[9px] md:text-[10px] font-mono font-bold tracking-[0.2em] text-gold-400 uppercase">
                        {product.tag}
                      </span>
                    </div>

                    {/* Product Header Title */}
                    <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-5 hover:text-gold-300 transition-colors duration-300">
                      {product.title}
                    </h2>

                    {/* Description text */}
                    <p className="font-sans font-light text-stone-400 text-sm sm:text-[15px] leading-relaxed mb-8 max-w-xl">
                      {product.description}
                    </p>

                    {/* Checklist wrapper */}
                    <div className="space-y-3.5 mb-6 w-full">
                      {product.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full border border-gold-500/35 flex items-center justify-center bg-gold-400/5 text-gold-400 shadow-[0_0_8px_rgba(217,174,103,0.1)]">
                            <svg
                              className="w-3.5 h-3.5 text-[#D9AE67]"
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
                          <span className="font-mono text-[11px] sm:text-[12px] font-bold tracking-wide text-stone-200">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                  </div>

                  {/* CTA Action button with gorgeous shimmers */}
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Inquire on WhatsApp with 4X BackOffice"
                    className="group inline-flex items-center gap-3.5 px-6 py-4 border border-white/10 hover:border-gold-500/80 bg-transparent text-stone-200 hover:text-stone-950 hover:bg-[#D9AE67] hover:shadow-[0_0_30px_rgba(217,174,103,0.25)] font-mono text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer overflow-hidden relative z-10"
                  >
                    <span>Inquire on WhatsApp</span>
                    <Icon name="ArrowRight" size={13} className="transform duration-300 group-hover:translate-x-1 flex-shrink-0" />
                  </a>
                </motion.div>

              </div>
            );
          })}

        </div>
      </section>

      {/* ----------------- ENTERPRISE INTEGRITY BLOCK ----------------- */}
      <section className="relative py-24 md:py-32 bg-[#040405] border-t border-white/5 z-10">
        
        {/* Soft atmospheric golden flare overlay */}
        <div className="absolute top-[40%] left-1/4 w-[280px] h-[280px] bg-gold-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 text-center cursor-default">
          <span className="text-[10px] font-mono tracking-[0.25em] text-gold-500 uppercase">ENTERPRISE SYSTEM CAPABILITIES</span>
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold mt-4 text-white">Triple-redundancy Broker Operations</h3>
          <p className="mt-4 font-sans font-light text-stone-400 text-sm max-w-2xl mx-auto leading-relaxed">
            Every product runs within a multi-tenant, fully isolated cloud infrastructure that boasts instant failovers, automated security compliance, and microsecond package processing rules to sustain major global volume.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 text-left">
            {[
              { title: "Redundancy setup", text: "Multi-region fallback configuration ensuring no single point of processing fault." },
              { title: "Under 1ms Latency", text: "Pricing calculations and synchronizations executed instantly at network cards." },
              { title: "Sovereign Audit Log", text: "Complete tamper-proof cryptographic telemetry logs tracking every parameter shift." }
            ].map((card, cIdx) => (
              <div key={cIdx} className="p-5 rounded-lg bg-[#09090a] border border-white/5 hover:border-gold-500/20 transition-colors duration-300 glow-card">
                <h4 className="font-display text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-400 inline-block" />
                  {card.title}
                </h4>
                <p className="text-stone-400 text-[11px] font-light leading-relaxed">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
