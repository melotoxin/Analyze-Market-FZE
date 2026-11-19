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
      {/* Official AM DXB mountain monogram (supplied brand artwork) */}
      <img
        src="/img/am-dxb-mark.png"
        width={currentSize.icon}
        height={currentSize.icon}
        alt=""
        aria-hidden="true"
        decoding="async"
        className="shrink-0 transition-transform group-hover:scale-105"
        style={{ width: currentSize.icon, height: currentSize.icon }}
      />

      {/* AM DXB Brand Text */}
      {showText && (
        <div className="flex flex-col whitespace-nowrap">
          <div className={`font-extrabold tracking-wider ${currentSize.text} font-sans flex items-center gap-1.5 leading-none`}>
            <span className="tracking-widest font-black text-[#29ABE2]">AM</span>
            <span className="font-bold tracking-widest text-[#5A6770] dark:text-slate-300 transition-colors">DXB</span>
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono tracking-tight mt-0.5 hidden sm:block">
            Analyze Markets
          </span>
        </div>
      )}
    </div>
  );
};
