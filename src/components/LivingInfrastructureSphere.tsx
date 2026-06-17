import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface Point3D {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  color: string;
  size: number;
  pulseOffset: number;
  // Dynamic displacement and velocity variables for elastic spring-like pop out physics
  popX: number;
  popY: number;
  popZ: number;
  popVx: number;
  popVy: number;
  popVz: number;
  // Reactor specific properties
  orbitRadius?: number;
  orbitSpeed?: number;
  orbitAngle?: number;
  orbitHeight?: number;
}

interface Connection {
  i: number;
  j: number;
  active: boolean;
  pulseProgress: number;
  pulseSpeed: number;
}

interface LivingInfrastructureSphereProps {
  activeMode: "hero" | "infrastructure" | "crm" | "trading" | "liquidity" | "risk" | "payments" | "unified";
  scrollProgress?: number; // 0 to 1 representing position in a section
  className?: string;
  size?: number; // dimension size
}

export const LivingInfrastructureSphere: React.FC<LivingInfrastructureSphereProps> = ({
  activeMode,
  scrollProgress = 0,
  className = "",
  size = 540,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const threeCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null);

  // Three.js Core Particle Sphere Effect for "hero" mode
  useEffect(() => {
    if (activeMode !== "hero") return;
    const canvas = threeCanvasRef.current;
    if (!canvas) return;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050507, 0.055);

    // Camera
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.set(0, 0, 15);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(size, size);

    // 6,000 Particle core with dynamic responsive density
    const screenWidth = window.innerWidth;
    const densityPct = screenWidth < 768 ? 0.5 : (screenWidth < 1024 ? 0.75 : 1.0);
    const particleCount = Math.floor(6000 * densityPct);
    const radius = 5.2;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const rndOffsets = new Float32Array(particleCount);

    const homeSphere = new Float32Array(particleCount * 3);
    const homeCloud = new Float32Array(particleCount * 3);

    const colorGold = new THREE.Color("#D4AF37");
    const colorPaleGold = new THREE.Color("#F6DC82");

    for (let i = 0; i < particleCount; i++) {
      const idx3 = i * 3;
      rndOffsets[i] = Math.random();

      // Fibonacci Spiral distribution
      const tParam = i / particleCount;
      const inclination = Math.acos(1 - 2 * tParam);
      const azimuth = Math.PI * (1 + Math.sqrt(5)) * i;

      const sx = Math.sin(inclination) * Math.cos(azimuth);
      const sy = Math.sin(inclination) * Math.sin(azimuth);
      const sz = Math.cos(inclination);
      const r = radius * (0.92 + Math.random() * 0.16);

      homeSphere[idx3] = sx * r;
      homeSphere[idx3 + 1] = sy * r;
      homeSphere[idx3 + 2] = sz * r;

      positions[idx3] = 0;
      positions[idx3 + 1] = 0;
      positions[idx3 + 2] = 0;

      homeCloud[idx3] = (Math.random() - 0.5) * 26;
      homeCloud[idx3 + 1] = (Math.random() - 0.5) * 16;
      homeCloud[idx3 + 2] = (Math.random() - 0.5) * 20;

      const c = colorGold.clone().lerp(colorPaleGold, Math.random() * 0.7 + (sy * 0.5 + 0.5) * 0.3);
      colors[idx3] = c.r;
      colors[idx3 + 1] = c.g;
      colors[idx3 + 2] = c.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Create high-end dynamic shiny golden sprite texture
    const createCircleTexture = () => {
      const c = document.createElement("canvas");
      c.width = 64;
      c.height = 64;
      const ctx = c.getContext("2d");
      if (ctx) {
        const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        grad.addColorStop(0, "rgba(255, 255, 255, 1)");
        grad.addColorStop(0.25, "rgba(255, 240, 200, 0.9)");
        grad.addColorStop(0.6, "rgba(212, 175, 55, 0.35)");
        grad.addColorStop(1, "rgba(212, 175, 55, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 64, 64);
      }
      return new THREE.CanvasTexture(c);
    };

    const spriteTexture = createCircleTexture();

    const material = new THREE.PointsMaterial({
      size: 0.13,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      map: spriteTexture,
    });

    const core = new THREE.Points(geometry, material);
    scene.add(core);

    // Orbital Rings Torus Group
    const rg = new THREE.Group();
    rg.rotation.z = 0.3;

    const ring = (rad: number, tube: number, tilt: number, op: number) => {
      const g = new THREE.TorusGeometry(rad, tube, 2, 160);
      const m = new THREE.MeshBasicMaterial({
        color: 0xD4AF37,
        transparent: true,
        opacity: op,
        blending: THREE.AdditiveBlending,
      });
      const msh = new THREE.Mesh(g, m);
      msh.rotation.x = tilt;
      return msh;
    };

    const ring1 = ring(7.2, 0.02, Math.PI / 2.4, 0.5);
    const ring2 = ring(8.4, 0.015, Math.PI / 2.1, 0.35);
    const ring3 = ring(9.6, 0.01, Math.PI / 1.9, 0.22);
    rg.add(ring1);
    rg.add(ring2);
    rg.add(ring3);
    scene.add(rg);

    // Orbiting Motes (60 points) with dynamic responsive density
    const screenMoteWidth = window.innerWidth;
    const densityMotePct = screenMoteWidth < 768 ? 0.5 : (screenMoteWidth < 1024 ? 0.75 : 1.0);
    const moteCount = Math.floor(60 * densityMotePct);
    const motePositions = new Float32Array(moteCount * 3);
    const motesGeo = new THREE.BufferGeometry();
    const moteData: { angle: number; radius: number; speed: number }[] = [];

    for (let k = 0; k < moteCount; k++) {
      moteData.push({
        angle: Math.random() * 6.28,
        radius: 7.0 + Math.random() * 2.6,
        speed: 0.003 + Math.random() * 0.006,
      });
    }

    motesGeo.setAttribute("position", new THREE.BufferAttribute(motePositions, 3));
    const motesMaterial = new THREE.PointsMaterial({
      size: 0.12,
      map: spriteTexture,
      color: 0xF6DC82,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.9,
    });

    const motes = new THREE.Points(motesGeo, motesMaterial);
    scene.add(motes);

    // Background Stars (800 points) with dynamic responsive density
    const screenStarWidth = window.innerWidth;
    const densityStarPct = screenStarWidth < 768 ? 0.5 : (screenStarWidth < 1024 ? 0.75 : 1.0);
    const starCount = Math.floor(800 * densityStarPct);
    const starPositions = new Float32Array(starCount * 3);

    for (let j = 0; j < starCount; j++) {
      const idx3 = j * 3;
      const rr = 20.0 + Math.random() * 30.0;
      const th = Math.random() * 6.28;
      const ph = Math.acos(2.0 * Math.random() - 1.0);

      starPositions[idx3] = rr * Math.sin(ph) * Math.cos(th);
      starPositions[idx3 + 1] = rr * Math.sin(ph) * Math.sin(th);
      starPositions[idx3 + 2] = rr * Math.cos(ph);
    }

    const starsGeo = new THREE.BufferGeometry();
    starsGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starsMaterial = new THREE.PointsMaterial({
      size: 0.06,
      color: 0xD4AF37,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const stars = new THREE.Points(starsGeo, starsMaterial);
    scene.add(stars);

    // Mouse Interaction
    let tMx = 0;
    let tMy = 0;
    let cMx = 0;
    let cMy = 0;

    const handleMouseMove = (e: MouseEvent) => {
      tMx = e.clientX / window.innerWidth - 0.5;
      tMy = e.clientY / window.innerHeight - 0.5;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Click/Touch push behavior
    let dispT = 0;
    let disp = 0;

    const handleMouseDown = () => { dispT = 1; };
    const handleMouseUp = () => { dispT = 0; };

    const parentContainer = canvas.parentElement;
    if (parentContainer) {
      parentContainer.addEventListener("mousedown", handleMouseDown);
      parentContainer.addEventListener("mouseup", handleMouseUp);
      parentContainer.addEventListener("touchstart", handleMouseDown, { passive: true });
      parentContainer.addEventListener("touchend", handleMouseUp, { passive: true });
      parentContainer.addEventListener("mouseleave", handleMouseUp);
    }

    // Intro Easing progress
    let intro = 0;
    const clock = new THREE.Clock();
    let frameId: number;

    const animateScene = () => {
      frameId = requestAnimationFrame(animateScene);
      const time = clock.getElapsedTime();

      if (intro < 1) {
        intro += 0.012;
      }
      const ie = 1 - Math.pow(1 - Math.min(1, intro), 3);

      cMx += (tMx - cMx) * 0.04;
      cMy += (tMy - cMy) * 0.04;
      camera.position.x = cMx * 5;
      camera.position.y = -cMy * 3;
      camera.lookAt(0, 0, 0);

      disp += (dispT - disp) * 0.06;

      core.rotation.y = time * 0.08;
      core.rotation.x = Math.sin(time * 0.15) * 0.12;

      rg.rotation.y = time * 0.05;
      rg.rotation.z = 0.3 + Math.sin(time * 0.1) * 0.05;

      stars.rotation.y = time * 0.01;

      const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const ix = i * 3;
        const iy = ix + 1;
        const iz = ix + 2;

        const wob = Math.sin(time * 0.6 + rndOffsets[i] * Math.PI * 2) * 0.12;

        const hx = homeSphere[ix] * (1 + wob * 0.04);
        const hy = homeSphere[iy] * (1 + wob * 0.04);
        const hz = homeSphere[iz] * (1 + wob * 0.04);

        const tx = hx + (homeCloud[ix] - hx) * disp;
        const ty = hy + (homeCloud[iy] - hy) * disp;
        const tz = hz + (homeCloud[iz] - hz) * disp;

        posArray[ix] += (tx * ie - posArray[ix]) * 0.08;
        posArray[iy] += (ty * ie - posArray[iy]) * 0.08;
        posArray[iz] += (tz * ie - posArray[iz]) * 0.08;
      }
      posAttr.needsUpdate = true;

      material.size = 0.12 + Math.sin(time * 1.5) * 0.02 + disp * 0.05;
      material.opacity = 0.95 - disp * 0.25;

      const motesPosAttr = motesGeo.getAttribute("position") as THREE.BufferAttribute;
      const motesPosArray = motesPosAttr.array as Float32Array;

      for (let m = 0; m < moteCount; m++) {
        const idx3 = m * 3;
        const d = moteData[m];
        d.angle += d.speed;
        motesPosArray[idx3] = Math.cos(d.angle) * d.radius;
        motesPosArray[idx3 + 1] = Math.sin(d.angle) * 0.9;
        motesPosArray[idx3 + 2] = Math.sin(d.angle) * d.radius;
      }
      motesPosAttr.needsUpdate = true;

      motes.rotation.x = Math.PI / 2.4;
      motes.rotation.y = time * 0.05;

      renderer.render(scene, camera);
    };

    animateScene();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouseMove);
      
      if (parentContainer) {
        parentContainer.removeEventListener("mousedown", handleMouseDown);
        parentContainer.removeEventListener("mouseup", handleMouseUp);
        parentContainer.removeEventListener("touchstart", handleMouseDown);
        parentContainer.removeEventListener("touchend", handleMouseUp);
        parentContainer.removeEventListener("mouseleave", handleMouseUp);
      }

      geometry.dispose();
      material.dispose();
      spriteTexture.dispose();

      ring1.geometry.dispose();
      ring1.material.dispose();
      ring2.geometry.dispose();
      ring2.material.dispose();
      ring3.geometry.dispose();
      ring3.material.dispose();

      motesGeo.dispose();
      motesMaterial.dispose();
      starsGeo.dispose();
      starsMaterial.dispose();
      renderer.dispose();
    };
  }, [activeMode, size]);

  // Core properties (3D points)
  const points = useRef<Point3D[]>([]);
  const connections = useRef<Connection[]>([]);
  const coreWaveRadius = useRef<number>(0);
  const rotationAngle = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isHoveredNode = useRef<number | null>(null);

  // Mouse interaction offsets for smooth interactive tilting parallax
  const mouseOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const targetMouseOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Specific 6 Major Core Infrastructure Nodes coordinates in 3D representing CRM, MT5, Liquidity, Risk, Payments, Analytics
  const majorNodes = useRef<{
    name: string;
    description: string;
    x: number;
    y: number;
    z: number;
    projX: number;
    projY: number;
    color: string;
    iconLabel: string;
  }[]>([
    { name: "Trading (MT5)", description: "High-performance bridge gateway", x: 0, y: -130, z: 0, projX: 0, projY: 0, color: "#fff3cc", iconLabel: "MT5" },
    { name: "CRM", description: "Lead sync & manager allocator", x: -110, y: -40, z: 65, projX: 0, projY: 0, color: "#d4a02a", iconLabel: "CRM" },
    { name: "Liquidity", description: "Multi-provider order router", x: 110, y: -40, z: 65, projX: 0, projY: 0, color: "#d4a02a", iconLabel: "LIQ" },
    { name: "Risk Management", description: "Exposure check & aggregation", x: 100, y: 70, z: -80, projX: 0, projY: 0, color: "#d4a02a", iconLabel: "RSK" },
    { name: "Payments", description: "Automated deposit/withdrawal ledger", x: -100, y: 70, z: -80, projX: 0, projY: 0, color: "#ffd700", iconLabel: "PAY" },
    { name: "Analytics", description: "Real-time broker telemetry dashboard", x: 0, y: 120, z: 40, projX: 0, projY: 0, color: "#ffffff", iconLabel: "ANL" }
  ]);

  // Handle initialization of points and connections
  useEffect(() => {
    const pts: Point3D[] = [];
    const conns: Connection[] = [];

    if (activeMode === "hero") {
      // ----------------- REACTOR PARTICLES DESIGN (2000 particles) with dynamic responsive density
      const screenWidth = window.innerWidth;
      const densityPct = screenWidth < 768 ? 0.5 : (screenWidth < 1024 ? 0.75 : 1.0);
      const numPoints = Math.floor(2000 * densityPct);

      for (let i = 0; i < numPoints; i++) {
        // Orbit particles: distributed around concentric rings
        // We can group them into distinct radius brackets for layered density
        let orbitRadius = 0;
        const rand = Math.random();
        
        if (rand < 0.15) {
          // dense near core
          orbitRadius = 40 + Math.random() * 40;
        } else if (rand < 0.55) {
          // mid rotor range
          orbitRadius = 80 + Math.random() * 100;
        } else if (rand < 0.85) {
          // outer telemetry tracks
          orbitRadius = 180 + Math.random() * 80;
        } else {
          // remote drift field
          orbitRadius = 260 + Math.random() * 120;
        }

        // Proportional scale to dimensions
        orbitRadius = orbitRadius * (size / 820);

        const orbitAngle = Math.random() * Math.PI * 2;
        const orbitSpeed = (0.0016 + Math.random() * 0.004) * (Math.random() > 0.5 ? 1 : -1);
        const orbitHeight = -80 + Math.random() * 160;

        // Gold palette selection
        const goldColors = [
          "rgba(217, 174, 103, ", // Main gold #D9AE67
          "rgba(255, 243, 204, ", // Pale gold #FFF3CC
          "rgba(138, 106, 24, ",  // Dark gold #8A6A18
          "rgba(255, 215, 0, ",   // Bright yellow gold #FFD700
        ];
        const colorPrefix = goldColors[Math.floor(Math.random() * goldColors.length)];
        const alpha = 0.2 + Math.random() * 0.65;

        pts.push({
          x: 0,
          y: 0,
          z: 0,
          baseX: 0,
          baseY: 0,
          baseZ: 0,
          color: colorPrefix + alpha + ")",
          size: 0.8 + Math.random() * 1.5,
          pulseOffset: Math.random() * Math.PI * 2,
          popX: 0,
          popY: 0,
          popZ: 0,
          popVx: 0,
          popVy: 0,
          popVz: 0,
          orbitRadius,
          orbitSpeed,
          orbitAngle,
          orbitHeight,
        });
      }
    } else {
      // ----------------- STANDARD EXISTING CORE SPHERE (100% untouched) with dynamic responsive density
      const screenWidth = window.innerWidth;
      const densityPct = screenWidth < 768 ? 0.5 : (screenWidth < 1024 ? 0.75 : 1.0);
      const numPoints = Math.floor(140 * densityPct);
      const r = size * 0.38;

      for (let i = 0; i < numPoints; i++) {
        const phi = Math.acos(-1 + (2 * i) / numPoints);
        const theta = Math.sqrt(numPoints * Math.PI) * phi;

        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);

        pts.push({
          x,
          y,
          z,
          baseX: x,
          baseY: y,
          baseZ: z,
          color: `rgba(212, 160, 42, ${0.15 + Math.random() * 0.3})`,
          size: 1 + Math.random() * 2,
          pulseOffset: Math.random() * Math.PI * 2,
          popX: 0,
          popY: 0,
          popZ: 0,
          popVx: 0,
          popVy: 0,
          popVz: 0,
        });
      }

      const connectionThreshold = r * 0.42;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dz = pts[i].z - pts[j].z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          
          if (dist < connectionThreshold) {
            conns.push({
              i,
              j,
              active: Math.random() > 0.4,
              pulseProgress: Math.random(),
              pulseSpeed: 0.004 + Math.random() * 0.008,
            });
          }
        }
      }
    }

    points.current = pts;
    connections.current = conns;
  }, [size, activeMode]);

  // Handle subtle, high-performance mouse movement listener for interactive sphere parallax tilting
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Base the reaction on viewport center to provide a premium full-screen dynamic feel
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Limit max tilting range dynamically to a professional 0.35 radians (about 20 degrees max)
      const targetX = ((e.clientX / width) - 0.5) * 0.35;
      const targetY = ((e.clientY / height) - 0.5) * 0.35;

      targetMouseOffset.current.x = targetX;
      targetMouseOffset.current.y = targetY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Frame animation loops
  useEffect(() => {
    let t = 0;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // High DPI Retina display support
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const fov = 350; // Camera Field of View length
    const centerX = size / 2;
    const centerY = size / 2;

    // Trigger an outward pop burst of particles using dynamic velocity inflation
    const triggerBurst = (intensity = 1.0) => {
      points.current.forEach((pt) => {
        const len = Math.sqrt(pt.baseX * pt.baseX + pt.baseY * pt.baseY + pt.baseZ * pt.baseZ) || 1;
        const dx = pt.baseX / len;
        const dy = pt.baseY / len;
        const dz = pt.baseZ / len;

        // Dynamic speed of outward popping
        const force = (9 + Math.random() * 11) * intensity;
        pt.popVx += dx * force;
        pt.popVy += dy * force;
        pt.popVz += dz * force;
      });
    };

    // User-triggered click burst on canvas
    const handleCanvasClick = () => {
      triggerBurst(1.0);
    };
    canvas.addEventListener("click", handleCanvasClick);

    // Initial transition/entrance pop-out trigger when state loads
    triggerBurst(0.75);

    const render = () => {
      t += 1;
      
      // Clear with elegant premium dark transparent backdrop
      ctx.clearRect(0, 0, size, size);

      if (activeMode === "hero") {
        // --- 1. CORE PHYSICS VALUES & COORD BASE ---
        const scaleFactor = size / 820; // 820 is standard design size

        // Parallax center with mouse offset
        mouseOffset.current.x += (targetMouseOffset.current.x - mouseOffset.current.x) * 0.08;
        mouseOffset.current.y += (targetMouseOffset.current.y - mouseOffset.current.y) * 0.08;

        const mouseTranslationX = mouseOffset.current.x * 55; // up to ~10px shift
        const mouseTranslationY = mouseOffset.current.y * 55;
        const reactorX = centerX + mouseTranslationX;
        const reactorY = centerY + mouseTranslationY;

        // Flare timing loop (every 9 seconds / 540 frames)
        const flarePeriod = 540;
        const currentFlareIndex = t % flarePeriod;
        let flareIntensity = 0;

        if (currentFlareIndex < 120) {
          // 2 seconds flare lifetime
          if (currentFlareIndex < 20) {
            flareIntensity = currentFlareIndex / 20; // swift expansion
          } else {
            flareIntensity = Math.exp(-(currentFlareIndex - 20) * 0.045); // smooth exponential settle
          }
        }

        // Pulsing and ring brightness factor
        const ringFade = 1.0 + flareIntensity * 0.7;

        // --- 2. DRAW CENTRAL RADIAL BACKGROUND GLOW ---
        // Keeps the gorgeous soft gold backlight behind the main text.
        // --- 4. DRAW CENTRAL GLOWING REACTOR CORE (Pulsing every 3 seconds) ---
        const coreBaseRadius = 38 * scaleFactor;
        const coreRadius = coreBaseRadius + Math.sin(t * 0.035) * (3 * scaleFactor) + (flareIntensity * 22 * scaleFactor);

        // Core backlight aura gradients
        const radialGlow = ctx.createRadialGradient(reactorX, reactorY, 2 * scaleFactor, reactorX, reactorY, coreRadius + 90 * scaleFactor);
        radialGlow.addColorStop(0, "#ffffff");
        radialGlow.addColorStop(0.12, "#ffd900");
        radialGlow.addColorStop(0.32, `rgba(217, 174, 103, ${0.48 + flareIntensity * 0.5})`);
        radialGlow.addColorStop(0.6, "rgba(138, 106, 24, 0.08)");
        radialGlow.addColorStop(1, "rgba(8, 8, 8, 0)");

        ctx.fillStyle = radialGlow;
        ctx.beginPath();
        ctx.arc(reactorX, reactorY, coreRadius + 90 * scaleFactor, 0, Math.PI * 2);
        ctx.fill();

        // Core central shiny orb
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "#ffd900";
        ctx.shadowBlur = 10 * scaleFactor;
        ctx.beginPath();
        ctx.arc(reactorX, reactorY, coreRadius * 0.45, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset shadow context instantly

        // Ring containment collar glow border
        ctx.strokeStyle = "rgba(255, 255, 255, 0.75)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(reactorX, reactorY, coreRadius * 0.95, 0, Math.PI * 2);
        ctx.stroke();

        // Energy Shockwave outwards from flares
        if (flareIntensity > 0.01) {
          const waveRadius = flareIntensity * 420 * scaleFactor;
          ctx.strokeStyle = `rgba(255, 215, 0, ${0.45 * (1.0 - flareIntensity)})`;
          ctx.lineWidth = 1.3 - (flareIntensity * 0.6);
          ctx.beginPath();
          ctx.arc(reactorX, reactorY, waveRadius, 0, Math.PI * 2);
          ctx.stroke();

          // Shockwave ripple aura rings
          ctx.strokeStyle = `rgba(217, 174, 103, ${0.18 * (1.0 - flareIntensity)})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.arc(reactorX, reactorY, Math.max(0, waveRadius - 20), 0, Math.PI * 2);
          ctx.stroke();
        }

        // --- 5. RENDER & TRANSFORM ORBIT PARTICLES ---
        // Setup color buckets for single-pass instanced batch filling to maximize performance
        const pBucketMainGold: Point3D[] = [];
        const pBucketPaleGold: Point3D[] = [];
        const pBucketDarkGold: Point3D[] = [];

        points.current.forEach((pt) => {
          // Increment angle orbital path
          pt.orbitAngle = (pt.orbitAngle || 0) + (pt.orbitSpeed || 0.002);

          // 3D elliptical rotation around X-axis
          const rBase = pt.orbitRadius || 120;
          const rx = Math.cos(pt.orbitAngle) * rBase;
          const rz = Math.sin(pt.orbitAngle) * rBase;
          const ry = pt.orbitHeight || 0;

          // Swiss Watch engine physical tilt angles 
          const tiltX = 0.65; // ~37 degrees perspective vertical squish
          const cosTilt = Math.cos(tiltX);
          const sinTilt = Math.sin(tiltX);

          // Rotate coordinate matrix
          let x3d = rx;
          let y3d = ry * cosTilt - rz * sinTilt;
          let z3d = ry * sinTilt + rz * cosTilt;

          // Scroll expansion vertical pull
          // "As user scrolls: Reactor energy expands downward. Data streams connect to the next section."
          y3d += scrollProgress * 150;
          x3d *= (1.0 + scrollProgress * 0.22); // disperse wider on scroll

          let px = reactorX + x3d;
          let py = reactorY + y3d;

          // Push particles back from active flares
          if (flareIntensity > 0.01) {
            const dx = px - reactorX;
            const dy = py - reactorY;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const waveR = flareIntensity * 420 * scaleFactor;
            
            const diff = dist - waveR;
            if (diff > -45 && diff < 45) {
              const pushForce = (1.0 - Math.abs(diff) / 45) * 16 * flareIntensity * scaleFactor;
              px += (dx / dist) * pushForce;
              py += (dy / dist) * pushForce;
            }
          }

          // Mouse Gravitational local attractor (Limit to max 10px shift as requested)
          const mxInCanvas = centerX + (targetMouseOffset.current.x * size * 0.5);
          const myInCanvas = centerY + (targetMouseOffset.current.y * size * 0.5);
          
          const dxMouse = px - mxInCanvas;
          const dyMouse = py - myInCanvas;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse) || 1;

          if (distMouse < 95) {
            const pullVal = (1.0 - distMouse / 95);
            // subtle attraction, maximum shift clamped to 10px
            px -= (dxMouse / distMouse) * (pullVal * 9.5);
            py -= (dyMouse / distMouse) * (pullVal * 9.5);
          }

          // Projection scale based on depth Z index to simulate real camera field of view volume
          const fovFactor = 360 / (360 + z3d);
          pt.x = px;
          pt.y = py;
          pt.size = (0.75 + Math.random() * 1.5) * fovFactor * scaleFactor;

          // Batching distribution
          if (pt.color.includes("rgba(217, 174, 103,")) {
            pBucketMainGold.push(pt);
          } else if (pt.color.includes("rgba(255, 243, 204,")) {
            pBucketPaleGold.push(pt);
          } else {
            pBucketDarkGold.push(pt);
          }
        });

        // Batch Render Main Gold
        ctx.fillStyle = "rgba(217, 174, 103, 0.58)";
        ctx.beginPath();
        pBucketMainGold.forEach((p) => { ctx.rect(p.x, p.y, p.size, p.size); });
        ctx.fill();

        // Batch Render Pale Gold
        ctx.fillStyle = "rgba(255, 243, 204, 0.78)";
        ctx.beginPath();
        pBucketPaleGold.forEach((p) => { ctx.rect(p.x, p.y, p.size, p.size); });
        ctx.fill();

        // Batch Render Dark Gold / Amber
        ctx.fillStyle = "rgba(138, 106, 24, 0.4)";
        ctx.beginPath();
        pBucketDarkGold.forEach((p) => { ctx.rect(p.x, p.y, p.size, p.size); });
        ctx.fill();

        // Request next loop frames and exit
        animationFrameId.current = requestAnimationFrame(render);
        return;
      }

      // --- Mode Specific Tweaks & Morphing physics ---
      // Apply smooth slow rotation
      let speedFactorX = 0.0018;
      let speedFactorY = 0.0035;

      if (activeMode === "trading") {
        speedFactorY = 0.009; // fast activity representation
      } else if (activeMode === "risk") {
        speedFactorX = 0.0006;
        speedFactorY = 0.0012; // slow defensive focus
      } else if (activeMode === "liquidity") {
        speedFactorY = 0.006; // fluent routing
      }

      // Continuous accumulation of rotation
      rotationAngle.current.x += speedFactorX + (scrollProgress * 0.002);
      rotationAngle.current.y += speedFactorY + (scrollProgress * 0.002);

      // Smoothly interpolate current mouse offset to targets (lerp with 8% velocity increment per frame)
      mouseOffset.current.x += (targetMouseOffset.current.x - mouseOffset.current.x) * 0.08;
      mouseOffset.current.y += (targetMouseOffset.current.y - mouseOffset.current.y) * 0.08;

      // Merge baseline rotation angles with mouse dynamic tilt offsets
      const finalAngleX = rotationAngle.current.x + mouseOffset.current.y;
      const finalAngleY = rotationAngle.current.y + mouseOffset.current.x;

      const sinX = Math.sin(finalAngleX);
      const cosX = Math.cos(finalAngleX);
      const sinY = Math.sin(finalAngleY);
      const cosY = Math.cos(finalAngleY);

      // Core wave pulse expansion
      coreWaveRadius.current += 1.4;
      if (coreWaveRadius.current > 180) {
        coreWaveRadius.current = 0;
      }

      // --- Draw Ambient Backlight Glow ---
      const auraGlow = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, 190);
      let glowOpacity = 0.08;
      if (activeMode === "unified") glowOpacity = 0.16;

      auraGlow.addColorStop(0, `rgba(212, 160, 42, ${glowOpacity})`);
      auraGlow.addColorStop(0.35, `rgba(138, 106, 24, ${glowOpacity * 0.4})`);
      auraGlow.addColorStop(1, "rgba(8, 8, 8, 0)");
      ctx.fillStyle = auraGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 190, 0, Math.PI * 2);
      ctx.fill();

      // --- 3D Projection Matrix Transformation ---
      const pts = points.current;
      const projectedPoints: { x: number; y: number; size: number; alpha: number; zIndex: number }[] = [];

      pts.forEach((pt, idx) => {
        // High-fidelity spring recoil pulling particles back to rest positions (0,0,0 offsets)
        pt.popVx += (0 - pt.popX) * 0.05 - pt.popVx * 0.12;
        pt.popVy += (0 - pt.popY) * 0.05 - pt.popVy * 0.12;
        pt.popVz += (0 - pt.popZ) * 0.05 - pt.popVz * 0.12;

        pt.popX += pt.popVx;
        pt.popY += pt.popVy;
        pt.popZ += pt.popVz;

        // Apply organic wave morph on shell coordinates representing ecosystem flow
        let morph = 0;
        if (activeMode === "unified") {
          morph = Math.sin(t * 0.04 + pt.pulseOffset) * 12;
        } else if (activeMode === "payments") {
          // Flatten standard sphere to showcase accumulation
          const heightOffset = Math.sin(t * 0.02 + pt.pulseOffset) * 4;
          pt.y = pt.baseY + heightOffset;
        } else {
          morph = Math.sin(t * 0.015 + pt.pulseOffset) * 5;
        }

        const radiusFactor = 1 + (morph / 160);
        let rx = (pt.baseX + pt.popX) * radiusFactor;
        let ry = (pt.baseY + pt.popY) * radiusFactor;
        let rz = (pt.baseZ + pt.popZ) * radiusFactor;

        // Apply 3D Rotation Math
        // Y-Axis Rotate
        let x1 = rx * cosY - rz * sinY;
        let z1 = rx * sinY + rz * cosY;

        // X-Axis Rotate
        let y2 = ry * cosX - z1 * sinX;
        let z2 = ry * sinX + z1 * cosX;

        // Perspective Divide Projection
        const scale = fov / (fov + z2);
        const px = centerX + x1 * scale;
        const py = centerY + y2 * scale;

        const alpha = Math.max(0.04, Math.min(0.85, 1 - (z2 + 160) / 320));
        projectedPoints.push({
          x: px,
          y: py,
          size: pt.size * scale,
          alpha,
          zIndex: z2,
        });
      });

      // --- Project & Rotate Major Core Node points ---
      const activeNodeIndex = {
        hero: -1,
        infrastructure: 0, // MT5
        crm: 1, // CRM
        trading: 0, // MT5 / Trading Platform
        liquidity: 2, // LIQ
        risk: 3, // RSK
        payments: 4, // PAY
        unified: -1, // All
      }[activeMode];

      const scaleFactor = (size * 0.38) / 160;

      majorNodes.current.forEach((node, idx) => {
        // Subtly rotate major nodes 3D positions with dynamic scaling
        let rx = node.x * scaleFactor;
        let ry = node.y * scaleFactor;
        let rz = node.z * scaleFactor;

        // Y-Rotate
        let x1 = rx * cosY - rz * sinY;
        let z1 = rx * sinY + rz * cosY;

        // X-Rotate
        let y2 = ry * cosX - z1 * sinX;
        let z2 = ry * sinX + z1 * cosX;

        const scale = fov / (fov + z2);
        node.projX = centerX + x1 * scale;
        node.projY = centerY + y2 * scale;
      });

      // --- 1. Draw connecting web lattice lines representing core grids ---
      ctx.lineWidth = 0.6;
      connections.current.forEach((conn) => {
        const ptA = projectedPoints[conn.i];
        const ptB = projectedPoints[conn.j];

        if (!ptA || !ptB) return;

        // Line distance representation styling
        const zMid = (ptA.zIndex + ptB.zIndex) / 2;
        const lineAlpha = Math.max(0.01, Math.min(0.24, 1 - (zMid + 160) / 320));

        // In Unified mode, highlight everything bright gold
        let strokeStyle = `rgba(212, 160, 42, ${lineAlpha * 0.7})`;
        if (activeMode === "trading") {
          strokeStyle = `rgba(255, 230, 160, ${lineAlpha * 0.9})`;
        } else if (activeMode === "risk") {
          strokeStyle = `rgba(212, 160, 42, ${lineAlpha * 0.4})`;
        }

        ctx.strokeStyle = strokeStyle;
        ctx.beginPath();
        ctx.moveTo(ptA.x, ptA.y);
        ctx.lineTo(ptB.x, ptB.y);
        ctx.stroke();

        // Animate subtle high-frequency electronic data pulses down lines
        conn.pulseProgress += conn.pulseSpeed;
        if (conn.pulseProgress > 1) {
          conn.pulseProgress = 0;
          conn.active = Math.random() > 0.4;
        }

        if (conn.active && (activeMode === "trading" || activeMode === "crm" || activeMode === "unified")) {
          const px = ptA.x + (ptB.x - ptA.x) * conn.pulseProgress;
          const py = ptA.y + (ptB.y - ptA.y) * conn.pulseProgress;
          const pAlpha = lineAlpha * 1.5;

          ctx.fillStyle = `rgba(255, 254, 242, ${pAlpha})`;
          ctx.beginPath();
          ctx.arc(px, py, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // --- 2. If 'Unified' Mode, Draw Ripple Shockwaves travelling out of the core ---
      if (activeMode === "unified") {
        ctx.strokeStyle = "rgba(212, 160, 42, 0.12)";
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.arc(centerX, centerY, coreWaveRadius.current, 0, Math.PI * 2);
        ctx.stroke();
      }

      // --- 3. If Risk Mode, Draw an outer layered translucent protective shield ring ---
      if (activeMode === "risk") {
        ctx.strokeStyle = "rgba(212, 160, 42, 0.22)";
        ctx.lineWidth = 0.8;
        ctx.setLineDash([4, 12]);
        ctx.beginPath();
        ctx.arc(centerX, centerY, 175, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Interactive defense shield core flare
        const gradientShield = ctx.createRadialGradient(centerX, centerY, 140, centerX, centerY, 185);
        gradientShield.addColorStop(0, "rgba(212, 160, 42, 0)");
        gradientShield.addColorStop(1, "rgba(212, 160, 42, 0.05)");
        ctx.fillStyle = gradientShield;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 180, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- 4. Draw CRM Incoming External Client Acquisition Pulses ---
      if (activeMode === "crm") {
        // Draw external user node dots injecting data packets to CRM
        const timeFactor = (t * 0.035) % 1;
        const startX = centerX - 220;
        const startY = centerY - 100;
        const crmNode = majorNodes.current[1]; // CRM Major Node

        // Line representing entry bridge
        ctx.strokeStyle = "rgba(212, 160, 42, 0.2)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(crmNode.projX, crmNode.projY);
        ctx.stroke();

        // Pulsing Client Node dot
        ctx.fillStyle = "#d4a02a";
        ctx.beginPath();
        ctx.arc(startX, startY, 4, 0, Math.PI * 2);
        ctx.fill();

        // Packet flowing down line
        const packetX = startX + (crmNode.projX - startX) * timeFactor;
        const packetY = startY + (crmNode.projY - startY) * timeFactor;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(packetX, packetY, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- 5. Draw Liquidity Outlet Streams ---
      if (activeMode === "liquidity") {
        const liqNode = majorNodes.current[2]; // Liquidity major node
        const numStreams = 3;

        for (let i = 0; i < numStreams; i++) {
          const angle = -0.3 + i * 0.3;
          const endX = centerX + 230;
          const endY = centerY + (i - 1) * 70;
          const progress = (t * 0.02 + i * 0.33) % 1;

          ctx.strokeStyle = "rgba(212, 160, 42, 0.16)";
          ctx.beginPath();
          ctx.moveTo(liqNode.projX, liqNode.projY);
          ctx.lineTo(endX, endY);
          ctx.stroke();

          // Outer Liquidity Provider nodes
          ctx.fillStyle = "rgba(212,160,42,0.6)";
          ctx.beginPath();
          ctx.arc(endX, endY, 3.5, 0, Math.PI * 2);
          ctx.fill();

          // Flowing orders to LPs
          const orderX = liqNode.projX + (endX - liqNode.projX) * progress;
          const orderY = liqNode.projY + (endY - liqNode.projY) * progress;
          ctx.fillStyle = "#ffd900";
          ctx.beginPath();
          ctx.arc(orderX, orderY, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // --- 6. Draw individual lattice points ---
      projectedPoints.forEach((pt) => {
        ctx.fillStyle = `rgba(212, 160, 42, ${pt.alpha})`;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // --- 7. Draw Major Core Infrastructure Nodes ---
      majorNodes.current.forEach((node, idx) => {
        const isFocused = idx === activeNodeIndex || activeMode === "unified";
        const isHovered = isHoveredNode.current === idx;

        // Project node center
        const nx = node.projX;
        const ny = node.projY;

        // Draw elegant focus glow rings
        const dotRadius = isFocused ? 5.5 : 3.5;
        const outerRadius = isFocused ? 14 : 8;

        if (isFocused) {
          ctx.strokeStyle = "rgba(212, 160, 42, 0.55)";
          ctx.lineWidth = 1.0;
          ctx.beginPath();
          ctx.arc(nx, ny, outerRadius, 0, Math.PI * 2);
          ctx.stroke();

          // Dotted orbit ring
          ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
          ctx.setLineDash([2, 4]);
          ctx.beginPath();
          ctx.arc(nx, ny, outerRadius + 5, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Core gold glowing signal spot
        ctx.fillStyle = isFocused ? "#ffd900" : "rgba(212, 160, 42, 0.6)";
        ctx.beginPath();
        ctx.arc(nx, ny, dotRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Restart rendering frame
      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      canvas.removeEventListener("click", handleCanvasClick);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [activeMode, size, scrollProgress]);

  if (activeMode === "hero") {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <canvas
          ref={threeCanvasRef}
          className="block relative max-w-full drop-shadow-[0_0_35px_rgba(212,175,55,0.25)] filter cursor-grab active:cursor-grabbing"
          style={{ width: size, height: size }}
        />
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <canvas
        ref={canvasRef}
        className="block relative max-w-full drop-shadow-[0_0_35px_rgba(212,160,42,0.15)] filter"
      />
    </div>
  );
};
