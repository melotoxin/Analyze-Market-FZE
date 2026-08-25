import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'sky' | 'cyan' | 'green' | 'amber' | 'blue' | 'purple' | 'neutral' | 'outline' | 'coral' | 'emerald' | 'indigo' | 'rose';
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'sky',
  size = 'sm',
  dot = false,
  className = ''
}) => {
  const variantStyles: Record<string, string> = {
    sky: 'bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30 dark:border-sky-500/30',
    cyan: 'bg-cyan-500/15 text-cyan-700 dark:text-cyan-400 border-cyan-500/30 dark:border-cyan-500/30',
    green: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 dark:border-emerald-500/30',
    emerald: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 dark:border-emerald-500/30',
    amber: 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30 dark:border-amber-500/30',
    blue: 'bg-sky-600/15 text-sky-700 dark:text-sky-300 border-sky-600/30 dark:border-sky-600/30',
    purple: 'bg-purple-500/15 text-purple-700 dark:text-purple-400 border-purple-500/30 dark:border-purple-500/30',
    indigo: 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-400 border-indigo-500/30 dark:border-indigo-500/30',
    rose: 'bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30 dark:border-rose-500/30',
    coral: 'bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30 dark:border-sky-500/30',
    neutral: 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700',
    outline: 'bg-transparent text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700'
  };

  const dotColor: Record<string, string> = {
    sky: 'bg-sky-500',
    cyan: 'bg-cyan-500',
    green: 'bg-emerald-500',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    blue: 'bg-sky-600',
    purple: 'bg-purple-500',
    indigo: 'bg-indigo-500',
    rose: 'bg-rose-500',
    coral: 'bg-sky-500',
    neutral: 'bg-slate-400',
    outline: 'bg-slate-400'
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2.5 py-0.5 font-medium',
    md: 'text-xs px-3 py-1 font-semibold'
  };

  return (
    <span
      className={'inline-flex items-center gap-1.5 rounded-full border font-mono tracking-tight transition-all ' + (variantStyles[variant] || variantStyles.sky) + ' ' + sizeStyles[size] + ' ' + className}
    >
      {dot && <span className={'w-1.5 h-1.5 rounded-full ' + (dotColor[variant] || dotColor.sky)} />}
      {children}
    </span>
  );
};
