import React from 'react';

interface AmDxbLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const AmDxbLogo: React.FC<AmDxbLogoProps> = ({
  className = '',
  size = 'md',
  showText = true
}) => {
  const sizeMap = {
    sm: { icon: 28, text: 'text-sm' },
    md: { icon: 36, text: 'text-base sm:text-lg' },
    lg: { icon: 44, text: 'text-xl sm:text-2xl' }
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none whitespace-nowrap ${className}`}>
      {/* Official AM DXB Circular Mountain Monogram */}
      <svg
        width={currentSize.icon}
        height={currentSize.icon}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform group-hover:scale-105"
      >
        <defs>
          <linearGradient id="amGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
          <filter id="amGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#0ea5e9" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* Outer Circle Ring */}
        <circle
          cx="50"
          cy="50"
          r="46"
          stroke="url(#amGradient)"
          strokeWidth="6"
          filter="url(#amGlow)"
        />

        {/* First Peak (A) */}
        <path
          d="M20 72 L42 28 L62 72"
          stroke="url(#amGradient)"
          strokeWidth="6.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Inner Crossbar of Peak A */}
        <path
          d="M30 55 L52 55"
          stroke="url(#amGradient)"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Second Peak (M) */}
        <path
          d="M48 42 L62 28 L80 72"
          stroke="url(#amGradient)"
          strokeWidth="6.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* AM DXB Brand Text */}
      {showText && (
        <div className="flex flex-col whitespace-nowrap">
          <div className={`font-extrabold tracking-wider ${currentSize.text} font-sans flex items-center gap-1.5 leading-none`}>
            <span className="text-sky-400 tracking-widest font-black">AM</span>
            <span className="text-slate-900 dark:text-slate-100 font-bold tracking-widest transition-colors">DXB</span>
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono tracking-tight mt-0.5 hidden sm:block">
            Analyze Markets
          </span>
        </div>
      )}
    </div>
  );
};
