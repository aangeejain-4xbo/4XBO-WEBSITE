import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { whyUsData } from "../data";
import { Icon } from "./Icon";
import { TRANSITIONS, ANIMATION_VARIANTS } from "../lib/animations";

const WhyUsCard = ({ card, index, activeIndex, totalCards, onNext, onPrev, onSelect }: any) => {
  let diff = index - activeIndex;
  if (diff < -1) diff += totalCards;
  if (diff > 1) diff -= totalCards;

  const isCenter = diff === 0;
  const isLeft = diff === -1;
  const isRight = diff === 1;

  let xPosition = "0%";
  let scaleVal = 1;
  let opacityVal = 1;
  let zIndexVal = 20;

  if (isCenter) {
    xPosition = "0%";
    scaleVal = 1.07;
    opacityVal = 1;
    zIndexVal = 30;
  } else if (isLeft) {
    xPosition = "-105%";
    scaleVal = 0.91;
    opacityVal = 0.55;
    zIndexVal = 10;
  } else if (isRight) {
    xPosition = "105%";
    scaleVal = 0.91;
    opacityVal = 0.55;
    zIndexVal = 10;
  }

  return (
    <motion.div
      style={{
        position: "absolute",
        width: "100%",
        maxWidth: "min(400px, 88vw)",
        zIndex: zIndexVal,
        willChange: "transform, opacity",
        transform: "translateZ(0)"
      }}
      animate={{
        x: xPosition,
        scale: scaleVal,
        opacity: opacityVal,
        y: isCenter ? -8 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 110,
        damping: 20,
        mass: 0.8,
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.4}
      onDragEnd={(e, info) => {
        const threshold = 50;
        if (info.offset.x < -threshold) {
          onNext();
        } else if (info.offset.x > threshold) {
          onPrev();
        }
      }}
      onClick={onSelect}
      className={`group relative rounded-2xl cursor-pointer flex flex-col justify-between border grow min-h-[300px] sm:min-h-[340px] md:min-h-[350px] qt glow-card ${
        isCenter
          ? "border-transparent bg-[#110F0C]"
          : "border-white/5 bg-[#0C0C0C]/80"
      }`}
    >
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none z-0">
        {/* Subtle pulsing active golden border shimmer */}
        {isCenter && (
          <div
            className="absolute inset-0 border border-gold-400 bg-gradient-to-b from-[#12100D] to-[#0A0908] z-0 shadow-lg shadow-gold-400/10"
          />
        )}
      </div>

      <div className="relative p-6 sm:p-8 flex flex-col justify-between h-full z-20 pointer-events-none">
        {/* Content Container */}
        <div className="flex flex-col items-center text-center">
          {/* Icon container */}
          <div
            className={`h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 rounded-full flex items-center justify-center mb-6 border transition-all duration-300 ${
              isCenter
                ? "bg-gold-500/15 text-gold-400 border-gold-400/30"
                : "bg-white/5 text-stone-400 border-white/5"
            }`}
          >
            <Icon name={card.iconName} size={32} />
          </div>

          {/* Title */}
          <h3 className="font-display text-lg md:text-xl font-semibold text-white tracking-tight mb-4">
            {card.title}
          </h3>

          {/* Description */}
          <p className={`font-sans font-light text-sm leading-relaxed transition-colors duration-300 ${isCenter ? "text-stone-300" : "text-stone-400"}`}>
            {card.description}
          </p>
        </div>

        {/* Active/Subtle Status footer inside card */}
        <div className="mt-6 flex justify-center">
          <span
            className={`text-[10px] font-mono tracking-widest uppercase transition-all duration-300 ${
              isCenter ? "text-gold-400 opacity-100" : "text-stone-600 opacity-40"
            }`}
          >
            {isCenter ? "✦ CONFIGURED & ACTIVE ✦" : "SELECT TO INSPECT"}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

interface WhyUsProps {
  onTalkClick?: () => void;
}

export const WhyUs: React.FC<WhyUsProps> = ({ onTalkClick }) => {
  const [activeIndex, setActiveIndex] = useState<number>(1); // Default center card (index 1: Seamless Trading Experience)
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const autoSlideTimer = useRef<NodeJS.Timeout | null>(null);

  const totalCards = whyUsData.length;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % totalCards);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);
  };

  // Auto-slide effect
  useEffect(() => {
    if (!isHovered) {
      autoSlideTimer.current = setInterval(() => {
        handleNext();
      }, 2000);
    } else {
      if (autoSlideTimer.current) {
        clearInterval(autoSlideTimer.current);
      }
    }

    return () => {
      if (autoSlideTimer.current) {
        clearInterval(autoSlideTimer.current);
      }
    };
  }, [isHovered]);

  return (
    <section id="why-us" className="relative py-14 sm:py-20 md:py-24 bg-[#070707] overflow-hidden px-4 select-none">
      {/* Parallax Ambient Lines */}
      <div className="ambient">
        <span className="gline" style={{ left: "15%", height: "100%", top: 0 }} />
        <span className="gline" style={{ left: "50%", height: "100%", top: 0 }} />
        <span className="gline" style={{ left: "85%", height: "100%", top: 0 }} />
      </div>

      {/* Premium background radial golden ambient halos */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-gold-500/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: ANIMATION_VARIANTS.sectionTitle.hidden,
              visible: { ...ANIMATION_VARIANTS.sectionTitle.visible, transition: { duration: TRANSITIONS.duration.heading, ease: TRANSITIONS.ease } }
            }}
            viewport={{ once: true, margin: "-100px", amount: 0.2 }}
            className="cinematic-reveal cursor-default transition-all duration-300"
          >
            <span className="text-xs font-mono font-medium tracking-widest text-gold-500 uppercase">
              Operational Advantages
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-5xl font-extrabold text-[#FCFCFC] tracking-tight mt-2.5 text-glow-light">
              Why Us
            </h2>
          </motion.div>
          
          {/* Top level Carousel controllers for desktop */}
          <div className="hidden md:flex items-center gap-3">
            <button
              id="why-us-carousel-prev"
              onClick={handlePrev}
              className="h-10 w-10 rounded-full border border-white/10 hover:border-gold-400/50 text-stone-400 hover:text-gold-300 bg-[#0F0F0F] transition-all flex items-center justify-center cursor-pointer active:scale-95"
            >
              <Icon name="ChevronLeft" size={18} />
            </button>
            <button
              id="why-us-carousel-next"
              onClick={handleNext}
              className="h-10 w-10 rounded-full border border-white/10 hover:border-gold-400/50 text-stone-400 hover:text-gold-300 bg-[#0F0F0F] transition-all flex items-center justify-center cursor-pointer active:scale-95"
            >
              <Icon name="ChevronRight" size={18} />
            </button>
          </div>
        </div>

        {/* Carousel Viewport */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.95, ease: "easeOut" }}
          className="relative h-[400px] sm:h-[440px] flex items-center justify-center w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left/Right click regions on desktop for super intuitive navigation */}
          <div 
            onClick={handlePrev} 
            className="absolute left-0 top-0 bottom-0 w-[12%] z-30 cursor-pointer hidden lg:block" 
            title="Previous advantage"
          />
          <div 
            onClick={handleNext} 
            className="absolute right-0 top-0 bottom-0 w-[12%] z-30 cursor-pointer hidden lg:block" 
            title="Next advantage"
          />

          <div className="relative w-full max-w-5xl h-full flex items-center justify-center">
            {whyUsData.map((card, index) => {
              // Calculate index offset difference in wrap-around circle
              let diff = index - activeIndex;
              if (diff < -1) diff += totalCards;
              if (diff > 1) diff -= totalCards;

              return (
                  <WhyUsCard
                    key={card.id}
                    card={card}
                    index={index}
                    activeIndex={activeIndex}
                    totalCards={totalCards}
                    onNext={handleNext}
                    onPrev={handlePrev}
                    onSelect={() => {
                      if (diff !== 0) {
                        setActiveIndex(index);
                      }
                    }}
                  />
              );
            })}
          </div>
        </motion.div>

        {/* Dots Navigator Panel */}
        <div className="flex items-center justify-center gap-2.5 mt-8 relative z-30">
          {whyUsData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className="h-9 w-9 md:h-4 md:w-4 rounded-full flex items-center justify-center transition-all cursor-pointer group"
              title={`Jump to index ${idx + 1}`}
            >
              <motion.span 
                animate={{
                  scale: activeIndex === idx ? 1.3 : 1,
                  backgroundColor: activeIndex === idx ? "#caa260" : "rgba(255, 255, 255, 0.15)"
                }}
                className="h-2 w-2 rounded-full block transition-colors group-hover:bg-gold-400/75" 
              />
            </button>
          ))}
        </div>
      </div>

      {/* Downward Connector Line */}
      <div className="mt-16 flex flex-col items-center">
        <div className="w-[1px] h-14 bg-gradient-to-b from-[#1C1B1A] to-transparent" />
      </div>
    </section>
  );
};
