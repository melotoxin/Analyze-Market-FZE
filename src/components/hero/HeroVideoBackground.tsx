import React, { useState, useRef, useEffect } from 'react';

interface HeroVideoBackgroundProps {
  posterUrl?: string;
  videoUrl?: string;
  /** Parallax offset as a percentage of the element height. */
  translateYPercent?: number;
  scale?: number;
}

// Matches the preload hint in index.html so the LCP backdrop is fetched once, early.
export const HERO_POSTER_URL =
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=80';

/** A decorative autoplaying video is not worth a phone's data plan or battery. */
function shouldPlayVideo(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  if (window.matchMedia('(max-width: 768px)').matches) return false;
  const connection = (navigator as any).connection;
  if (connection?.saveData) return false;
  if (/^(2g|slow-2g)$/.test(connection?.effectiveType || '')) return false;
  return true;
}

export const HeroVideoBackground: React.FC<HeroVideoBackgroundProps> = ({
  posterUrl = HERO_POSTER_URL,
  videoUrl = 'https://assets.mixkit.co/videos/preview/mixkit-dubai-city-buildings-at-night-4217-large.mp4',
  translateYPercent = 0,
  scale = 1,
}) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Decide after mount: the poster alone must be enough to render a correct hero.
  useEffect(() => {
    setPlayVideo(shouldPlayVideo());
  }, []);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.7;
  }, [playVideo]);

  return (
    <div
      style={{
        transform: 'translateY(' + translateYPercent + '%) scale(' + scale + ')',
      }}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none will-change-transform"
      aria-hidden="true"
    >
      <div
        className={
          'absolute inset-0 bg-no-repeat transition-opacity duration-1000 ' +
          (isVideoLoaded ? 'opacity-0' : 'opacity-100')
        }
        style={{
          backgroundImage: 'url(' + posterUrl + ')',
          backgroundPosition: 'center 12%',
          backgroundSize: 'cover',
        }}
      />

      {playVideo && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          onCanPlay={() => setIsVideoLoaded(true)}
          className={
            'w-full h-full object-cover transition-opacity duration-1000 ' +
            (isVideoLoaded ? 'opacity-35' : 'opacity-0') +
            ' filter brightness-95 contrast-115'
          }
          style={{ objectPosition: 'center 12%' }}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/55 to-slate-950/90" />
    </div>
  );
};
