import React from 'react';

interface NavBlinkTextProps {
  children: string;
  active?: boolean;
}

/** Splits nav label into letters that blink logo-sky blue on parent hover. */
export const NavBlinkText: React.FC<NavBlinkTextProps> = ({ children, active = false }) => (
  <span className="nav-blink-text">
    {[...children].map((char, i) => (
      <span
        key={`${char}-${i}`}
        className={'nav-blink-char' + (active ? ' nav-blink-char--on' : '')}
        style={{ animationDelay: `${i * 0.055}s` }}
        aria-hidden={char !== ' '}
      >
        {char === ' ' ? '\u00a0' : char}
      </span>
    ))}
  </span>
);
