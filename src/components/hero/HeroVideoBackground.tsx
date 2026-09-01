import React, { useState, useRef, useEffect } from 'react';

interface HeroVideoBackgroundProps {
  posterUrl?: string;
  /** Local path under /public — only used when enableVideo is true. */
  videoUrl?: string | null;
  enableVideo?: boolean;
  translateYPercent?: number;
  scale?: number;
}

/** Self-hosted Burj Khalifa / Dubai skyline — same look as before Mixkit. */
export const HERO_POSTER_URL = '/hero/burj-poster.jpg';

/** CDN fallback if the local poster is missing (e.g. before deploy). */
export const HERO_POSTER_FALLBACK =
  '/img/1512453979798-5ea266-w1920.webp';

/**
 * Drop a Flow-exported clip at public/hero/burj-hero.mp4 and set enableVideo on the hero.
 * Until then the static poster is shown (no third-party stock video).
 */
export const HERO_VIDEO_URL = '/hero/burj-hero.mp4';

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
  videoUrl = null,
  enableVideo = false,
  translateYPercent = 0,
  scale = 1,
}) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);
  const [resolvedPoster, setResolvedPoster] = useState(posterUrl);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeVideo = enableVideo && videoUrl ? videoUrl : null;

  useEffect(() => {
    setResolvedPoster(posterUrl);
    const probe = new Image();
    probe.onerror = () => setResolvedPoster(HERO_POSTER_FALLBACK);
    probe.src = posterUrl;
  }, [posterUrl]);

  useEffect(() => {
    setPlayVideo(Boolean(activeVideo && shouldPlayVideo()));
  }, [activeVideo]);

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
          backgroundImage: 'url(' + resolvedPoster + ')',
          backgroundPosition: 'center 12%',
          backgroundSize: 'cover',
        }}
      />

      {playVideo && activeVideo && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={resolvedPoster}
          onCanPlay={() => setIsVideoLoaded(true)}
          className={
            'w-full h-full object-cover transition-opacity duration-1000 ' +
            (isVideoLoaded ? 'opacity-35' : 'opacity-0') +
            ' filter brightness-95 contrast-115'
          }
          style={{ objectPosition: 'center 12%' }}
        >
          <source src={activeVideo} type="video/mp4" />
        </video>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/55 to-slate-950/90" />
    </div>
  );
};
