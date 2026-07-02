import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Icon } from "./Icon";
import { waLink, WA_CONSULT_MSG } from "../config";

interface CtaBandProps {
  onTalkClick: () => void;
}

export const CtaBand: React.FC<CtaBandProps> = ({ onTalkClick }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let iframeId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    class GoldParticle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      fadeSpeed: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 30;
        this.size = Math.random() * 2 + 0.8;
        this.speedY = -(Math.random() * 0.5 + 0.2);
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.6 + 0.3;
        this.fadeSpeed = Math.random() * 0.0015 + 0.001;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.opacity -= this.fadeSpeed;
        if (this.opacity <= 0 || this.y < -10) {
          this.x = Math.random() * width;
          this.y = height + 10;
          this.opacity = Math.random() * 0.6 + 0.3;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
        ctx.fill();
      }
    }

    const particlesList: GoldParticle[] = Array.from({ length: 30 }, () => new GoldParticle());

    let visible = true; // toggled by the IntersectionObserver below

    const drawLoop = () => {
      iframeId = requestAnimationFrame(drawLoop);
      if (!visible) return; // skip sim + paint while the band is off-screen
      ctx.clearRect(0, 0, width, height);
      // Shadow state is set once per frame, not per particle — identical glow,
      // far fewer canvas state changes.
      ctx.shadowColor = "rgba(212, 175, 55, 0.4)";
      ctx.shadowBlur = 4;
      particlesList.forEach((p) => {
        p.update();
        p.draw();
      });
      ctx.shadowBlur = 0;
    };
    drawLoop();

    // Pause the particle loop while the CTA band is scrolled off-screen —
    // it lives at the bottom of the home page, so this is most of the time.
    const visObserver = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; },
      { threshold: 0 }
    );
    visObserver.observe(canvas);

    return () => {
      window.removeEventListener("resize", handleResize);
      visObserver.disconnect();
      cancelAnimationFrame(iframeId);
    };
  }, []);

  return (
    <section id="cta-section" className="relative py-20 px-4 md:px-8 select-none overflow-hidden bg-[#030303]">
      {/* Container holding the custom card with precise details */}
      <div 
        data-rv
        data-rv-delay="1"
        className="max-w-6xl mx-auto rounded-[26px] bg-gradient-to-b from-[#110F0D] to-[#070707] border border-[#d4a02a]/20 p-8 md:p-14 relative overflow-hidden cta-shimmer-border shadow-[0_25px_60px_rgba(3,3,3,0.8)]"
      >
        {/* Floating gold particle canvas layer */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80" 
        />

        {/* Top-Center majestic gold lighting aura */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] sm:w-[500px] h-[150px] bg-[#d4a02a]/15 blur-[55px] rounded-full pointer-events-none z-0" />

        {/* Card Contents */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Subtle logo-inspired diamond mini badge */}
          <div className="h-10 w-10 rounded-full border border-[#d4a02a]/25 flex items-center justify-center text-[#d4a02a] mb-5 bg-[#d4a02a]/5 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
            <Icon name="Activity" size={18} />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-8 text-glow-light">
            Let's turn your platform <br className="hidden sm:inline" />
            into an advantage.
          </h2>

          <motion.a
            id="cta-book-call-btn"
            href={waLink(WA_CONSULT_MSG)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Book a Consultation with 4X BackOffice on WhatsApp"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-10 py-4.5 bg-[#d4a02a] hover:bg-white text-stone-950 font-display text-xs font-bold tracking-[0.25em] uppercase hover:text-stone-950 shadow-[0_12px_40px_rgba(212,160,42,0.18)] hover:shadow-[0_12px_40px_rgba(255,255,255,0.22)] active:scale-[0.98] transition-all duration-300 cursor-pointer flex items-center justify-center gap-3"
          >
            Book a Consultation <span className="text-[14px] font-sans font-bold leading-none">&rarr;</span>
          </motion.a>
        </div>
      </div>
    </section>
  );
};
