import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}

const OFFSETS: Record<string, string> = {
  up: 'translateY(35px)',
  down: 'translateY(-35px)',
  left: 'translateX(35px)',
  right: 'translateX(-35px)',
  none: 'none',
};

/**
 * Scroll-in reveal, replacing framer-motion's whileInView (~119KB).
 *
 * Deliberately a geometry check on scroll rather than an IntersectionObserver:
 * IO only delivers a callback when the intersection state *changes*, so a section
 * scrolled past in one gesture goes from "below the fold" to "above the fold"
 * without ever being reported, and stays invisible forever. That is exactly the
 * bug this component is meant to avoid, so the failure mode has to be "shown",
 * never "hidden".
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(
    () =>
      typeof window === 'undefined' ||
      typeof window.matchMedia !== 'function' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    if (visible) return;

    let frame = 0;
    const check = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const { top } = el.getBoundingClientRect();
      // Visible once its top edge has risen into the viewport — which also covers
      // anything already scrolled past (negative top).
      if (top < window.innerHeight - 40) setVisible(true);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };

    check(); // sections already on screen at mount

    // Two independent triggers, because either one alone has a blind spot:
    //   - IntersectionObserver fires without any scroll event (lazy chunk mounting,
    //     layout shift, an inner scroll container) but never reports a section that
    //     was skipped past without intersecting.
    //   - The scroll check catches exactly that skipped case.
    // Whichever fires first wins; both are idempotent.
    let observer: IntersectionObserver | undefined;
    if (typeof IntersectionObserver !== 'undefined' && ref.current) {
      observer = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) setVisible(true);
      });
      observer.observe(ref.current);
    }

    window.addEventListener('scroll', onScroll, { passive: true, capture: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener('scroll', onScroll, { capture: true } as any);
      window.removeEventListener('resize', onScroll);
    };
  }, [visible]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : OFFSETS[direction],
        transition:
          'opacity 700ms cubic-bezier(0.16,1,0.3,1) ' +
          delay +
          's, transform 700ms cubic-bezier(0.16,1,0.3,1) ' +
          delay +
          's',
      }}
    >
      {children}
    </div>
  );
};
