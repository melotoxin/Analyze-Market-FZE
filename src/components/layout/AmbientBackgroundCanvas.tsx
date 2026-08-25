import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const AmbientBackgroundCanvas: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();

  // Parallax shifts for floating ambient orbs
  const orb1Y = useTransform(scrollY, [0, 5000], [0, 900]);
  const orb2Y = useTransform(scrollY, [0, 5000], [0, -700]);
  const orb3Y = useTransform(scrollY, [0, 5000], [0, 1100]);
  const orb4Y = useTransform(scrollY, [0, 5000], [0, -600]);
  const skylineY = useTransform(scrollY, [0, 5000], [0, -250]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      
      {/* 1. Subtle, Minimal Architectural Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(212,175,55,0.03)_1px,transparent_1px)] [background-size:32px_32px] opacity-40 dark:opacity-60" />

      {/* 2. Stylized Dubai Skyline Vector Silhouette with Warm Horizon */}
      <motion.div 
        style={{ y: skylineY }}
        className="absolute bottom-0 left-0 right-0 h-[420px] opacity-[0.03] dark:opacity-[0.05] flex items-end justify-center pointer-events-none overflow-hidden"
      >
        <svg viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto text-amber-300 dark:text-slate-300">
          <path d="M720 10 L723 90 L728 140 L735 220 L745 320 L695 320 L705 220 L712 140 L717 90 Z" fill="currentColor" opacity="0.8"/>
          <path d="M640 120 L655 120 L660 320 L635 320 Z" fill="currentColor" opacity="0.6"/>
          <path d="M790 90 L810 100 L815 320 L785 320 Z" fill="currentColor" opacity="0.6"/>
          <path d="M560 160 L585 160 L590 320 L555 320 Z" fill="currentColor" opacity="0.5"/>
          <path d="M870 140 L895 150 L900 320 L865 320 Z" fill="currentColor" opacity="0.5"/>
          <path d="M480 200 L510 200 L515 320 L475 320 Z" fill="currentColor" opacity="0.4"/>
          <path d="M950 180 L980 190 L985 320 L945 320 Z" fill="currentColor" opacity="0.4"/>
          <line x1="0" y1="319" x2="1440" y2="319" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
        </svg>
      </motion.div>
      
      {/* 3. Subtle Warm Cursor Dynamic Ambient Spotlight */}
      <div
        className="hidden md:block absolute w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.04)_0%,rgba(148,163,184,0.02)_40%,transparent_70%)] blur-[140px] transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: `translate3d(${mousePos.x - 350}px, ${mousePos.y - 350}px, 0)`,
        }}
      />

      {/* 4. Multi-Layered Soft Warm Atmospheric Drifts */}
      {/* Wave 1: Warm Champagne & Sand Glow */}
      <motion.div
        style={{ y: orb1Y }}
        className="absolute top-[12%] left-[-10%] w-[750px] h-[750px] bg-gradient-to-tr from-amber-600/08 via-amber-400/05 to-transparent rounded-full blur-[180px] will-change-transform"
      />

      {/* Wave 2: Quiet Slate & Subtle Indigo Warmth */}
      <motion.div
        style={{ y: orb2Y }}
        className="absolute top-[38%] right-[-10%] w-[800px] h-[800px] bg-gradient-to-bl from-slate-600/08 via-amber-700/04 to-transparent rounded-full blur-[190px] will-change-transform"
      />

      {/* Wave 3: Soft Muted Emerald & Dusk Glow */}
      <motion.div
        style={{ y: orb3Y }}
        className="absolute top-[62%] left-[-8%] w-[750px] h-[750px] bg-gradient-to-r from-emerald-600/06 via-slate-700/05 to-transparent rounded-full blur-[180px] will-change-transform"
      />

      {/* Wave 4: Rich Deep Warm Obsidian Floor */}
      <motion.div
        style={{ y: orb4Y }}
        className="absolute bottom-[2%] right-[5%] w-[850px] h-[850px] bg-gradient-to-tl from-amber-700/06 via-slate-800/06 to-transparent rounded-full blur-[200px] will-change-transform"
      />

      {/* 5. Soft Edge Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,13,20,0.5)_100%)] dark:block hidden pointer-events-none" />
    </div>
  );
};


