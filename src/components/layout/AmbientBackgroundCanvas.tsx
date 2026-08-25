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
      
      {/* 1. Fine Architectural Blueprint Grid Matrix with Subtle Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] dark:opacity-60 opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] dark:opacity-[0.08]" />

      {/* 2. Stylized Dubai Skyline / DIFC Architectural Vector Silhouette in Backdrop */}
      <motion.div 
        style={{ y: skylineY }}
        className="absolute bottom-0 left-0 right-0 h-[480px] opacity-[0.04] dark:opacity-[0.07] flex items-end justify-center pointer-events-none overflow-hidden"
      >
        <svg viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto text-sky-400">
          {/* Stylized Burj Khalifa & Modern Dubai Towers Silhouette */}
          <path d="M720 10 L723 90 L728 140 L735 220 L745 320 L695 320 L705 220 L712 140 L717 90 Z" fill="currentColor" opacity="0.8"/>
          <path d="M640 120 L655 120 L660 320 L635 320 Z" fill="currentColor" opacity="0.6"/>
          <path d="M790 90 L810 100 L815 320 L785 320 Z" fill="currentColor" opacity="0.6"/>
          <path d="M560 160 L585 160 L590 320 L555 320 Z" fill="currentColor" opacity="0.5"/>
          <path d="M870 140 L895 150 L900 320 L865 320 Z" fill="currentColor" opacity="0.5"/>
          <path d="M480 200 L510 200 L515 320 L475 320 Z" fill="currentColor" opacity="0.4"/>
          <path d="M950 180 L980 190 L985 320 L945 320 Z" fill="currentColor" opacity="0.4"/>
          <path d="M380 220 L420 220 L425 320 L375 320 Z" fill="currentColor" opacity="0.3"/>
          <path d="M1040 210 L1080 220 L1085 320 L1035 320 Z" fill="currentColor" opacity="0.3"/>
          {/* Glowing Horizon line */}
          <line x1="0" y1="319" x2="1440" y2="319" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
        </svg>
      </motion.div>
      
      {/* 3. Interactive Cursor Dynamic Spotlight (Cyan + Sapphire + Gold Core) */}
      <div
        className="hidden md:block absolute w-[750px] h-[750px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.08)_0%,rgba(99,102,241,0.04)_40%,transparent_70%)] blur-[130px] transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: `translate3d(${mousePos.x - 375}px, ${mousePos.y - 375}px, 0)`,
        }}
      />

      {/* 4. Multi-Layered Luminous Aurora Meshes throughout the entire page */}
      {/* Wave 1: Trust & Matrix Section Glow (Cyan / Sky) */}
      <motion.div
        style={{ y: orb1Y }}
        className="absolute top-[15%] left-[-10%] w-[800px] h-[800px] bg-gradient-to-tr from-sky-500/15 via-cyan-400/10 to-transparent rounded-full blur-[170px] will-change-transform"
      />

      {/* Wave 2: Packages & Formation Section Glow (Indigo / Gold / Amber) */}
      <motion.div
        style={{ y: orb2Y }}
        className="absolute top-[35%] right-[-12%] w-[850px] h-[850px] bg-gradient-to-bl from-amber-500/10 via-indigo-600/10 to-transparent rounded-full blur-[190px] will-change-transform"
      />

      {/* Wave 3: Free Zones & Interactive Explorer Glow (Emerald / Cyan) */}
      <motion.div
        style={{ y: orb3Y }}
        className="absolute top-[60%] left-[-5%] w-[750px] h-[750px] bg-gradient-to-r from-emerald-500/10 via-sky-500/10 to-transparent rounded-full blur-[180px] will-change-transform"
      />

      {/* Wave 4: Macroeconomics, FAQ & Corporate Credentials Floor (Sapphire / Violet) */}
      <motion.div
        style={{ y: orb4Y }}
        className="absolute bottom-[2%] right-[5%] w-[900px] h-[900px] bg-gradient-to-tl from-cyan-600/12 via-blue-600/08 to-indigo-900/10 rounded-full blur-[200px] will-change-transform"
      />

      {/* 5. Radial Edge Vignette to keep focus high-contrast */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(3,7,18,0.6)_100%)] dark:block hidden pointer-events-none" />

    </div>
  );
};

