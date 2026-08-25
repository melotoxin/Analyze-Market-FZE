import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular' | 'card';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'circular':
        return 'rounded-full';
      case 'text':
        return 'rounded-md h-4 my-1';
      case 'card':
        return 'rounded-3xl';
      case 'rectangular':
      default:
        return 'rounded-2xl';
    }
  };

  const style: React.CSSProperties = {
    width: width,
    height: height,
  };

  return (
    <div
      style={style}
      className={`relative overflow-hidden bg-slate-200/80 dark:bg-slate-800/60 ${getVariantStyles()} ${className}`}
    >
      {/* Shimmer metallic wave gradient */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-sky-400/10 to-transparent" />
    </div>
  );
};

export const FreeZoneCardSkeleton: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl min-h-[280px] p-6 flex flex-col justify-between border border-slate-200 dark:border-white/[0.08] bg-slate-100 dark:bg-[#070e22] animate-pulse">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="w-16 h-5 rounded-full" />
          <Skeleton className="w-24 h-5 rounded-full" />
        </div>
        <div className="space-y-2 pt-2">
          <Skeleton className="w-3/4 h-6 rounded-lg" />
          <Skeleton className="w-1/2 h-4 rounded-md" />
        </div>
      </div>

      <div className="pt-4 border-t border-slate-200 dark:border-white/[0.08] flex items-center justify-between">
        <div className="space-y-1">
          <Skeleton className="w-16 h-3 rounded" />
          <Skeleton className="w-20 h-5 rounded" />
        </div>
        <Skeleton className="w-20 h-8 rounded-xl" />
      </div>
    </div>
  );
};

export const ImageWithSkeleton: React.FC<{
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}> = ({ src, alt, className = '', containerClassName = '' }) => {
  const [loaded, setLoaded] = React.useState(false);

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 dark:via-sky-400/10 to-transparent" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      />
    </div>
  );
};
