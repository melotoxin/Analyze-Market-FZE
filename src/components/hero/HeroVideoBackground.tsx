import React, { useState, useRef, useEffect } from 'react';
import { Video, VideoOff } from 'lucide-react';
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
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7;
    }
  }, []);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      } else {
        videoRef.current.play();
        setIsVideoPlaying(true);
      }
    }
  };

  return (
    <motion.div
      style={{
        y: parallaxY,
        scale: parallaxScale,
        opacity: parallaxOpacity
      }}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none will-change-transform"
    >
      {/* 1. Low-Latency High-Res Poster Centered on Spire */}
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

      {/* 2. Low-Bandwidth Streaming Video centered on Burj Khalifa */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onCanPlay={() => setIsVideoLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-1000 ${
          isVideoLoaded ? 'opacity-35 dark:opacity-30' : 'opacity-0'
        } filter brightness-95 contrast-115`}
        style={{ objectPosition: 'center 12%' }}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      {/* 3. Luxury Multi-Layer Dark Gradient & Glass Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/45 to-[#070b16] dark:from-[#050811]/85 dark:via-[#070b16]/50 dark:to-[#070b16]" />
      
      {/* 4. Fine Dot Grid / Subtle Blueprint Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.06] dark:opacity-[0.10]" />

      {/* 5. Glowing Radial Ambient Accent Lights */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-sky-500/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />

      {/* 6. Video Ambient Controls Button */}
      <div className="absolute bottom-4 right-4 pointer-events-auto z-10 hidden sm:block">
        <button
          onClick={toggleVideo}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-slate-300 hover:text-white transition-all cursor-pointer shadow-lg"
          title={isVideoPlaying ? 'Pause ambient video' : 'Play ambient video'}
        >
          {isVideoPlaying ? <Video className="w-3 h-3 text-sky-400" /> : <VideoOff className="w-3 h-3 text-slate-400" />}
          <span>{isVideoPlaying ? 'Ambient Live' : 'Motion Paused'}</span>
        </button>
      </div>

    </motion.div>
  );
};
