import React, { useState, useRef, useEffect } from 'react';
import { motion, MotionValue } from 'framer-motion';

interface HeroVideoBackgroundProps {
  posterUrl?: string;
  videoUrl?: string;
  parallaxY?: MotionValue<number>;
  parallaxScale?: MotionValue<number>;
  parallaxOpacity?: MotionValue<number>;
}

export const HeroVideoBackground: React.FC<HeroVideoBackgroundProps> = ({
  posterUrl = 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2560&q=90',
  videoUrl = 'https://assets.mixkit.co/videos/preview/mixkit-dubai-city-buildings-at-night-4217-large.mp4',
  parallaxY,
  parallaxScale,
  parallaxOpacity
}) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7;
    }
  }, []);

  return (
    <motion.div
      style={{
        y: parallaxY,
        scale: parallaxScale,
        opacity: parallaxOpacity
      }}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none will-change-transform"
    >
      {/* 1. High-Res Poster Backdrop */}
      <div
        className={`absolute inset-0 bg-no-repeat transition-opacity duration-1000 ${
          isVideoLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          backgroundImage: `url(${posterUrl})`,
          backgroundPosition: 'center 12%',
          backgroundSize: 'cover'
        }}
      />

      {/* 2. Low-Bandwidth Streaming Video centered on Dubai skyline */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onCanPlay={() => setIsVideoLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-1000 ${
          isVideoLoaded ? 'opacity-35' : 'opacity-0'
        } filter brightness-95 contrast-115`}
        style={{ objectPosition: 'center 12%' }}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      {/* 3. Dark Gradient & Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/55 to-slate-950/90" />
    </motion.div>
  );
};
