import { useEffect, useRef, useState } from 'react';

/**
 * The hero's scroll parallax was the only remaining reason the site shipped
 * framer-motion (~119KB). This is the same effect in a few lines of rAF-throttled
 * scroll maths, and it opts out under prefers-reduced-motion.
 */
export function useHeroParallax<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      // 0 while the hero fills the viewport, 1 once it has scrolled fully past.
      const scrolled = Math.min(1, Math.max(0, -top / Math.max(height, 1)));
      setProgress(scrolled);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return { ref, progress };
}
