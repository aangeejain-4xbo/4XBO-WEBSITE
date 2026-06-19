import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Operational locations with real-world coordinates
const cities = [
  { name: "DUBAI", lat: 25.20, lon: 55.27 },
  { name: "ISRAEL", lat: 32.07, lon: 34.79 },
  { name: "IRAN", lat: 35.69, lon: 51.39 },
  { name: "SYDNEY", lat: -33.87, lon: 151.21 },
  { name: "LONDON", lat: 51.51, lon: -0.13 },
  { name: "NEW YORK", lat: 40.71, lon: -74.01 },
  { name: "SINGAPORE", lat: 1.35, lon: 103.82 },
  { name: "HONG KONG", lat: 22.32, lon: 114.17 },
];

const R = 2.4; // globe radius (scene units)

// Latitude / longitude -> 3D cartesian on the sphere surface
const latLonToVector3 = (lat: number, lon: number, radius: number): THREE.Vector3 => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    Math.sin(phi) * Math.sin(theta) * radius,
    Math.cos(phi) * radius,
    Math.sin(phi) * Math.cos(theta) * radius
  );
};

export const ContactGlobe: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    // WebGL capability check
    try {
      const test = document.createElement("canvas");
      if (!(window.WebGLRenderingContext && (test.getContext("webgl") || test.getContext("experimental-webgl")))) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    if (!containerRef.current || !canvasRef.current) return;
    const container = containerRef.current;
    const canvas = canvasRef.current;

    let width = container.clientWidth || 400;
    let height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 7.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const disposables: { dispose: () => void }[] = [];
    const globe = new THREE.Group();
    globe.rotation.x = 0.18; // slight tilt for a premium 3/4 view
    scene.add(globe);

    // 1. Solid dark inner sphere — occludes back-facing dots/markers so it reads as a real globe
    const coreGeo = new THREE.SphereGeometry(R * 0.99, 48, 48);
    const coreMat = new THREE.MeshBasicMaterial({ color: new THREE.Color("#0a0a0c") });
    globe.add(new THREE.Mesh(coreGeo, coreMat));
    disposables.push(coreGeo, coreMat);

    // 2. Faint lat/long wireframe grid
    const gridGeo = new THREE.SphereGeometry(R * 1.001, 32, 20);
    const gridMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#d4a02a"),
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    globe.add(new THREE.Mesh(gridGeo, gridMat));
    disposables.push(gridGeo, gridMat);

    // 3. Gold "land" dots distributed over the surface (fibonacci sphere)
    const dotCount = window.innerWidth < 768 ? 900 : 1600;
    const dotPositions = new Float32Array(dotCount * 3);
    for (let i = 0; i < dotCount; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / dotCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      dotPositions[i * 3] = Math.cos(theta) * Math.sin(phi) * R * 1.004;
      dotPositions[i * 3 + 1] = Math.sin(theta) * Math.sin(phi) * R * 1.004;
      dotPositions[i * 3 + 2] = Math.cos(phi) * R * 1.004;
    }
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute("position", new THREE.BufferAttribute(dotPositions, 3));
    const dotMat = new THREE.PointsMaterial({
      color: new THREE.Color("#caa260"),
      size: 0.032,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    });
    globe.add(new THREE.Points(dotGeo, dotMat));
    disposables.push(dotGeo, dotMat);

    // 4. Atmosphere rim glow (back-side sphere, slightly larger)
    const atmoGeo = new THREE.SphereGeometry(R * 1.16, 48, 48);
    const atmoMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#d4a02a"),
      transparent: true,
      opacity: 0.06,
      side: THREE.BackSide,
    });
    globe.add(new THREE.Mesh(atmoGeo, atmoMat));
    disposables.push(atmoGeo, atmoMat);

    // 5. City markers (glowing node + pulsing ping ring), with HTML labels
    const markers = cities.map((city) => {
      const pos = latLonToVector3(city.lat, city.lon, R * 1.01);

      const nodeGeo = new THREE.SphereGeometry(0.06, 16, 16);
      const nodeMat = new THREE.MeshBasicMaterial({ color: new THREE.Color("#ffd900") });
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.copy(pos);
      globe.add(node);
      disposables.push(nodeGeo, nodeMat);

      const ringGeo = new THREE.RingGeometry(0.08, 0.12, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color("#ffd900"),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pos);
      ring.lookAt(0, 0, 0);
      globe.add(ring);
      disposables.push(ringGeo, ringMat);

      return { ...city, pos, node, ring, ringMat };
    });

    // Interaction: drag to spin, otherwise auto-rotate
    const st = { autoRotate: true, dragging: false, lastX: 0, velocity: 0.0025, time: 0 };

    const onDown = (clientX: number) => { st.dragging = true; st.autoRotate = false; st.lastX = clientX; };
    const onMove = (clientX: number) => {
      if (!st.dragging) return;
      const dx = clientX - st.lastX;
      st.lastX = clientX;
      globe.rotation.y += dx * 0.005;
      st.velocity = dx * 0.005;
    };
    const onUp = () => { st.dragging = false; setTimeout(() => { st.autoRotate = true; }, 1200); };

    const mouseDown = (e: MouseEvent) => onDown(e.clientX);
    const mouseMove = (e: MouseEvent) => onMove(e.clientX);
    const touchStart = (e: TouchEvent) => { if (e.touches[0]) onDown(e.touches[0].clientX); };
    const touchMove = (e: TouchEvent) => { if (e.touches[0]) onMove(e.touches[0].clientX); };

    container.addEventListener("mousedown", mouseDown, { passive: true });
    window.addEventListener("mousemove", mouseMove, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    container.addEventListener("touchstart", touchStart, { passive: true });
    container.addEventListener("touchmove", touchMove, { passive: true });
    window.addEventListener("touchend", onUp, { passive: true });

    const handleResize = () => {
      if (!containerRef.current) return;
      width = containerRef.current.clientWidth;
      height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    const ro = new ResizeObserver(handleResize);
    ro.observe(container);

    const tmp = new THREE.Vector3();
    let lastTime = performance.now();
    let animId = 0;
    let visible = true; // gated by the IntersectionObserver below

    const tick = () => {
      const _now = performance.now();
      const dt = (_now - lastTime) / 1000;
      lastTime = _now;
      st.time += dt;

      // Rotation: auto-spin, or coast from drag
      if (st.autoRotate) {
        globe.rotation.y += 0.0028;
      } else if (!st.dragging) {
        globe.rotation.y += st.velocity;
        st.velocity *= 0.95;
      }

      // Pulsing ping rings
      markers.forEach((m, i) => {
        const p = 1 + ((st.time * 1.4 + i * 0.4) % 1.5);
        m.ring.scale.setScalar(p);
        m.ringMat.opacity = Math.max(0, 0.8 * (1 - (p - 1) / 1.5));

        // Project marker to screen for its HTML label
        const labelEl = document.getElementById(`cg-label-${i}`);
        if (labelEl) {
          m.node.getWorldPosition(tmp);
          const front = tmp.clone().normalize().dot(camera.position.clone().normalize()) > 0.1;
          tmp.project(camera);
          const x = (tmp.x * 0.5 + 0.5) * width;
          const y = (-tmp.y * 0.5 + 0.5) * height;
          labelEl.style.transform = `translate3d(${x}px, ${y}px, 0)`;
          labelEl.style.opacity = front ? "1" : "0";
        }
      });

      renderer.render(scene, camera);
      if (visible) animId = requestAnimationFrame(tick);
    };
    tick();

    // Pause the render loop while the globe is scrolled off-screen — no GPU
    // work for an invisible canvas. Resume (without a dt jump) on re-entry.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible) {
          visible = true;
          lastTime = performance.now();
          animId = requestAnimationFrame(tick);
        } else if (!entry.isIntersecting && visible) {
          visible = false;
          cancelAnimationFrame(animId);
        }
      },
      { threshold: 0 }
    );
    io.observe(container);

    return () => {
      cancelAnimationFrame(animId);
      io.disconnect();
      ro.disconnect();
      container.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", onUp);
      container.removeEventListener("touchstart", touchStart);
      container.removeEventListener("touchmove", touchMove);
      window.removeEventListener("touchend", onUp);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
    };
  }, [hasWebGL]);

  if (!hasWebGL) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[200px] w-[200px] rounded-full border border-gold-500/25 animate-spin" style={{ animationDuration: "40s" }} />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="absolute inset-0 cursor-grab active:cursor-grabbing">
      {/* Soft golden backlight behind the globe */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] aspect-square rounded-full bg-[radial-gradient(circle,rgba(212,160,42,0.12)_0%,transparent_70%)] blur-2xl pointer-events-none" />
      <canvas ref={canvasRef} className="relative block" style={{ touchAction: "pan-y" }} />

      {/* Projected city labels */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {cities.map((city, i) => (
          <div
            key={city.name}
            id={`cg-label-${i}`}
            style={{ position: "absolute", left: 0, top: 0, transform: "translate3d(-50%,-50%,0)", willChange: "transform, opacity" }}
            className="-mt-5 flex items-center gap-1.5 px-2 py-0.5 bg-black/80 border border-gold-500/30 rounded backdrop-blur-sm transition-opacity duration-200 whitespace-nowrap"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400 shadow-[0_0_6px_#ffd900]" />
            <span className="text-[9px] font-mono font-bold tracking-[0.15em] text-gold-300 uppercase">{city.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
