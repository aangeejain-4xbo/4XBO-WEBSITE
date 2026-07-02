import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface LivingInfrastructureSphereProps {
  className?: string;
  size?: number; // dimension size
}

/**
 * The hero's "living global core": a Three.js additive-blended particle sphere
 * with orbital rings, motes and background stars. Loaded lazily by Hero.tsx so
 * three.js stays out of the initial bundle.
 *
 * (A legacy multi-mode 2D-canvas system — infrastructure/crm/trading/liquidity/
 * risk/payments/unified — used to live here but was unreachable: the only
 * consumer always rendered the hero mode. It was removed as dead code.)
 */
export const LivingInfrastructureSphere: React.FC<LivingInfrastructureSphereProps> = ({
  className = "",
  size = 540,
}) => {
  const threeCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Three.js Core Particle Sphere Effect
  useEffect(() => {
    const canvas = threeCanvasRef.current;
    if (!canvas) return;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050507, 0.055);

    // Camera
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.set(0, 0, 15);
    camera.lookAt(0, 0, 0);

    // 6,000 Particle core with dynamic responsive density
    const screenWidth = window.innerWidth;
    const isMobile = screenWidth < 768;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    // Mobile: cap the backing store at 1.5x — the 820px canvas is mostly
    // cropped on a phone screen, and additive-blended glow sprites hide the
    // resolution difference. ~44% fewer shaded pixels per frame. Desktop
    // keeps the original 2x cap.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setSize(size, size);

    // Mobile-only: denser particle field for a brighter, fuller globe (desktop unchanged).
    const densityPct = isMobile ? 0.7 : (screenWidth < 1024 ? 0.75 : 1.0);
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
      // Mobile-only: larger points so the additive glow reads brighter (desktop stays 0.13).
      size: isMobile ? 0.2 : 0.13,
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
    const densityMotePct = screenWidth < 768 ? 0.5 : (screenWidth < 1024 ? 0.75 : 1.0);
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
    const densityStarPct = screenWidth < 768 ? 0.5 : (screenWidth < 1024 ? 0.75 : 1.0);
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
    const startTime = performance.now();
    let frameId: number;
    let visible = true; // toggled by the IntersectionObserver below

    const animateScene = () => {
      frameId = requestAnimationFrame(animateScene);
      if (!visible) return; // skip particle sim + GPU render while off-screen
      const time = (performance.now() - startTime) / 1000;

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

      // Mobile keeps a larger base point size so the additive glow reads brighter (desktop unchanged at 0.12).
      material.size = (isMobile ? 0.19 : 0.12) + Math.sin(time * 1.5) * 0.02 + disp * 0.05;
      material.opacity = Math.max(0, 0.95 - disp * 0.25);

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

    // Skip the particle sim + GPU render while the hero canvas is scrolled
    // off-screen (site-wide perf). The loop stays alive; it just no-ops hidden.
    const visObserver = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; },
      { threshold: 0 }
    );
    visObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(frameId);
      visObserver.disconnect();
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
  }, [size]);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <canvas
        ref={threeCanvasRef}
        className="block relative max-w-full drop-shadow-[0_0_35px_rgba(212,175,55,0.25)] filter cursor-grab active:cursor-grabbing"
        style={{ width: size, height: size }}
      />
    </div>
  );
};
