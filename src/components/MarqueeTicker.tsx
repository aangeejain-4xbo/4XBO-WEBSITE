import React from "react";

interface MarqueeTickerProps {
  className?: string;
}

export const MarqueeTicker: React.FC<MarqueeTickerProps> = ({ className = "" }) => {
  const tags = [
    "MT5 ADMIN SOLUTIONS",
    "SERVER RESILIENCE HUBS",
    "LIQUIDITY BRIDGE GATEWAYS",
    "REAL-TIME RISK MANAGEMENT",
    "FAILOVER REDUNDANCY DEPLOYMENT",
    "ZERO DOWNTIME MIGRATIONS",
    "24/7 NETWORK OPERATING CENTERS",
    "COMPLEX SYMBOL ROUTING SOLUTIONS",
  ];

  // Repeat the tags multiple times to ensure continuous seamless infinite scrolling
  const repeatedTags = [...tags, ...tags, ...tags, ...tags];

  return (
    <div className={`relative w-full overflow-hidden bg-[#0a0a0d]/60 border-t border-b border-gold-400/10 py-5 select-none ${className}`}>
      {/* Background radial gradient to give a premium glow to the text marquee */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#050507] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#050507] to-transparent z-10 pointer-events-none" />

      {/* Infinite loop flex container */}
      <div className="flex whitespace-nowrap animate-marquee" style={{ animationDuration: "18s" }}>
        <div className="flex gap-16 shrink-0 items-center">
          {repeatedTags.map((tag, idx) => (
            <div key={idx} className="flex items-center gap-6">
              <span className="font-mono text-[11px] sm:text-xs font-bold tracking-[0.25em] text-[#FCFCFC] opacity-75 hover:opacity-100 hover:text-gold-400 hover:scale-105 transition-all duration-300">
                {tag}
              </span>
              {/* Gold Diamond separator */}
              <div className="h-2 w-2 transform rotate-45 bg-[#D4AF37]/50 shadow-[0_0_8px_rgba(212,175,55,0.3)] shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
