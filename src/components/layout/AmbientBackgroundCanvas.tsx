import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const AmbientBackgroundCanvas: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();

  // Parallax shifts for floating ambient orbs
  const orb1Y = useTransform(scrollY, [0, 4000], [0, 600]);
  const orb2Y = useTransform(scrollY, [0, 4000], [0, -500]);
  const orb3Y = useTransform(scrollY, [0, 4000], [0, 800]);
  const orb4Y = useTransform(scrollY, [0, 4000], [0, -400]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      
      {/* 1. Subtle SVG Film Grain Noise Layer (Eliminates flat digital look) */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.035] contrast-150 brightness-100 pointer-events-none">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      {/* 2. Fine Architectural Blueprint Matrix Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.04] dark:opacity-[0.065]" />
      
      {/* 3. Interactive Cursor Spotlight (Dual-tone Cyan + Royal Violet Glow) */}
      <div
        className="hidden md:block absolute w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.07)_0%,rgba(99,102,241,0.03)_50%,transparent_70%)] blur-[120px] transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: `translate3d(${mousePos.x - 350}px, ${mousePos.y - 350}px, 0)`,
        }}
      />

      {/* 4. Deep Atmospheric Aurora Waves (Scroll-Reacting) */}
      {/* Wave 1: Cyan / Sky Aurora Orb (Mid-page) */}
      <motion.div
        style={{ y: orb1Y }}
        className="absolute top-[18%] left-[-8%] w-[700px] h-[700px] bg-gradient-to-tr from-sky-600/10 to-cyan-400/5 rounded-full blur-[180px] will-change-transform animate-pulse"
      />

      {/* Wave 2: Royal Indigo & Violet Orb (Comparison & Packages) */}
      <motion.div
        style={{ y: orb2Y }}
        className="absolute top-[42%] right-[-10%] w-[800px] h-[800px] bg-gradient-to-bl from-indigo-600/10 via-purple-600/5 to-transparent rounded-full blur-[200px] will-change-transform"
      />

      {/* Wave 3: Luxury Emerald & Amber Accent (Free Zones & Golden Visas) */}
      <motion.div
        style={{ y: orb3Y }}
        className="absolute top-[68%] left-[10%] w-[650px] h-[650px] bg-gradient-to-r from-emerald-500/08 to-sky-500/05 rounded-full blur-[190px] will-change-transform"
      />

      {/* Wave 4: Deep Sapphire Ambient Floor (FAQ & About) */}
      <motion.div
        style={{ y: orb4Y }}
        className="absolute bottom-[5%] right-[15%] w-[750px] h-[750px] bg-gradient-to-tl from-cyan-600/08 to-indigo-600/06 rounded-full blur-[200px] will-change-transform"
      />

      {/* 5. Edge Vignette for Cinematic Focus */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,8,17,0.7)_100%)] pointer-events-none" />

    </div>
  );
};
