import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const AmbientBackgroundCanvas: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();

  // Parallax shifts for floating ambient orbs
  const orb1Y = useTransform(scrollY, [0, 4000], [0, 800]);
  const orb2Y = useTransform(scrollY, [0, 4000], [0, -600]);
  const orb3Y = useTransform(scrollY, [0, 4000], [0, 1000]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Soft tracking of mouse coordinates
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      
      {/* 1. Fine Architectural Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:36px_36px] opacity-[0.035] dark:opacity-[0.055]" />
      
      {/* 2. Interactive Cursor Reactive Spotlight (follows mouse on desktop) */}
      <div
        className="hidden md:block absolute w-[650px] h-[650px] rounded-full bg-sky-500/[0.04] blur-[150px] transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: `translate3d(${mousePos.x - 325}px, ${mousePos.y - 325}px, 0)`,
        }}
      />

      {/* 3. Deep Ambient Floating Color Waves (Scroll Reacting) */}
      {/* Wave 1: Sky / Cyan Accent Orb (Mid page) */}
      <motion.div
        style={{ y: orb1Y }}
        className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-sky-600/[0.07] dark:bg-sky-500/[0.06] rounded-full blur-[180px] will-change-transform animate-pulse-glow"
      />

      {/* Wave 2: Indigo / Royal Azure Orb (Comparison & Packages) */}
      <motion.div
        style={{ y: orb2Y }}
        className="absolute top-[45%] right-[-10%] w-[700px] h-[700px] bg-indigo-600/[0.08] dark:bg-indigo-500/[0.06] rounded-full blur-[200px] will-change-transform"
      />

      {/* Wave 3: Emerald Accent Glow (Free Zones & Golden Visas) */}
      <motion.div
        style={{ y: orb3Y }}
        className="absolute top-[70%] left-[15%] w-[550px] h-[550px] bg-emerald-500/[0.05] dark:bg-emerald-500/[0.04] rounded-full blur-[180px] will-change-transform"
      />

      {/* Wave 4: Deep Sapphire Ambient Floor (FAQ & About) */}
      <div className="absolute bottom-0 right-[20%] w-[650px] h-[650px] bg-cyan-600/[0.06] rounded-full blur-[190px]" />

      {/* 4. Subtle Vignette Edge Mask */}
      <div className="absolute inset-0 bg-radial-vignette opacity-40 pointer-events-none" />

    </div>
  );
};
