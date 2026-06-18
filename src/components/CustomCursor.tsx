import React, { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";

export const CustomCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  
  const mouseRef = useRef({ x: -100, y: -100 });
  const pointsRef = useRef<{ x: number; y: number }[]>([]);
  const isHoveringRef = useRef(false);
  const isVisibleRef = useRef(false);

  const numPoints = 20; // Silky smooth segmented trailing chain
  const lagFactor = 0.28; // The damping speed of trail interpolation (creates the "delay" inertia)

  // Initialize trailing coordinates
  useEffect(() => {
    pointsRef.current = Array.from({ length: numPoints }, () => ({ x: -100, y: -100 }));
  }, [numPoints]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Skip entirely on touch / mobile — the trail canvas is hidden there (`hidden md:block`),
    // so running the listeners + 60fps rAF loop would only waste CPU and battery.
    if (!window.matchMedia("(min-width: 768px) and (pointer: fine)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }

      // Check hover state of buttons, links, clickable items
      const target = e.target as HTMLElement;
      const isClickable = !!target.closest(
        'a, button, [role="button"], input, select, textarea, .cursor-pointer'
      );
      
      if (isHoveringRef.current !== isClickable) {
        isHoveringRef.current = isClickable;
        setIsHovering(isClickable);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };
    const handleMouseEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
    };

    // Auto-resize canvas helper to secure correct high-resolution painting
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth * window.devicePixelRatio;
        canvas.height = window.innerHeight * window.devicePixelRatio;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("resize", resizeCanvas);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    resizeCanvas();

    // The high-frequency animation render loop for physics and trail rendering
    let animationFrameId: number;
    
    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx || pointsRef.current.length === 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // 1. Physical Calculations for trailing layers
      // Interpolate the head (index 0) toward target cursor
      const head = pointsRef.current[0];
      head.x += (mouseRef.current.x - head.x) * (lagFactor + 0.15); // Faster tracking for the head
      head.y += (mouseRef.current.y - head.y) * (lagFactor + 0.15);

      // Interpolate each next joint towards the one ahead of it
      for (let i = 1; i < numPoints; i++) {
        const prev = pointsRef.current[i - 1];
        const curr = pointsRef.current[i];
        
        // Add subtle physics offsets depending on hover to differentiate movement
        const intensity = isHoveringRef.current ? 0.22 : lagFactor;
        curr.x += (prev.x - curr.x) * intensity;
        curr.y += (prev.y - curr.y) * intensity;
      }

      // Clear the viewport nicely
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Only draw visual trails when active inside viewport boundaries
      if (isVisibleRef.current && pointsRef.current[0].x > -10) {
        // 2. Render connected spline path line (Fluid ribbon trailer)
        ctx.beginPath();
        ctx.moveTo(pointsRef.current[0].x, pointsRef.current[0].y);

        for (let i = 1; i < numPoints - 1; i++) {
          const xc = (pointsRef.current[i].x + pointsRef.current[i + 1].x) / 2;
          const yc = (pointsRef.current[i].y + pointsRef.current[i + 1].y) / 2;
          ctx.quadraticCurveTo(pointsRef.current[i].x, pointsRef.current[i].y, xc, yc);
        }

        // Apply premium trailing gradient
        const gradient = ctx.createLinearGradient(
          pointsRef.current[0].x, pointsRef.current[0].y,
          pointsRef.current[numPoints - 1].x, pointsRef.current[numPoints - 1].y
        );
        
        // Gold / Amber color profiles to match branding
        gradient.addColorStop(0, isClicked ? "rgba(220, 160, 42, 0.72)" : (isHoveringRef.current ? "rgba(255, 215, 0, 0.55)" : "rgba(202, 162, 96, 0.38)"));
        gradient.addColorStop(0.5, "rgba(202, 162, 96, 0.18)");
        gradient.addColorStop(1, "rgba(202, 162, 96, 0.0)");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = isHoveringRef.current ? 4.5 : 2.5;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        
        // Add subtle shadow to line to enhance the glowing neon feel
        ctx.shadowBlur = isHoveringRef.current ? 15 : 6;
        ctx.shadowColor = "rgba(202, 162, 96, 0.25)";
        
        ctx.stroke();
        ctx.shadowBlur = 0; // Reset shadow

        // 3. Render floating glow nodes (Lag layers)
        // We draw individual circle segments at specific intervals of the trail chain
        const segmentsToDraw = [0, 3, 7, 12];
        segmentsToDraw.forEach((index) => {
          if (index >= numPoints) return;
          const point = pointsRef.current[index];
          const opacity = (1 - index / numPoints) * 0.45;
          const radius = (1 - index / numPoints) * (isHoveringRef.current ? 5.5 : 3.5);

          if (index === 0) {
            // Draw central target dot
            ctx.beginPath();
            ctx.arc(point.x, point.y, isClicked ? 1.5 : 2.5, 0, Math.PI * 2);
            ctx.fillStyle = "#E6C17A";
            ctx.shadowBlur = 10;
            ctx.shadowColor = "#caa260";
            ctx.fill();
            ctx.shadowBlur = 0;
            return;
          }

          // Ambient trailing layered rings
          ctx.beginPath();
          ctx.arc(point.x, point.y, radius + (isClicked ? -1 : 1), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(202, 162, 96, ${opacity})`;
          ctx.strokeStyle = `rgba(202, 162, 96, ${opacity * 0.5})`;
          ctx.lineWidth = 0.5;
          ctx.fill();
          ctx.stroke();
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isClicked, numPoints]);

  return (
    <>
      {/* High performance hardware-accelerated canvas for trailing effects */}
      <canvas
        ref={canvasRef}
        className="hidden md:block fixed top-0 left-0 w-screen h-screen pointer-events-none z-[9999] select-none scale-100 will-change-transform"
        style={{
          transform: "translate3d(0,0,0)",
          mixBlendMode: "screen"
        }}
      />
      
      {/* Small extra fluid follower to give organic 3D parallax on cursor hovering */}
      <motion.div
        className="hidden md:block fixed top-0 left-0 w-2 h-2 rounded-full border border-gold-400/40 bg-gold-400/10 pointer-events-none z-[10000] mix-blend-screen"
        style={{
          x: mouseRef.current.x,
          y: mouseRef.current.y,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible && isHovering ? 1 : 0,
          scale: isClicked ? 0.7 : (isHovering ? 5.0 : 0)
        }}
        animate={{
          scale: isClicked ? 0.7 : (isHovering ? 5.0 : 0),
          borderColor: isClicked ? "#caa260" : "rgba(202, 162, 96, 0.4)",
          backgroundColor: isClicked ? "rgba(202, 162, 96, 0.2)" : "rgba(202, 162, 96, 0.05)"
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
      />
    </>
  );
};

