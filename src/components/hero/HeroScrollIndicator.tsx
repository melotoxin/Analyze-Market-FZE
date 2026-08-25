import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Language } from '../../data/translations';

interface HeroScrollIndicatorProps {
  targetId?: string;
  lang: Language;
}

export const HeroScrollIndicator: React.FC<HeroScrollIndicatorProps> = ({
  targetId = 'packages',
  lang
}) => {
  const isAr = lang === 'ar';

  const handleScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="relative z-20 flex flex-col items-center justify-center cursor-pointer select-none group"
      onClick={handleScroll}
    >
      <div className="flex flex-col items-center gap-1.5 py-1">
        
        {/* Animated Mouse Body */}
        <div className="w-5 h-8 rounded-full border-2 border-slate-400/60 group-hover:border-sky-400 p-0.5 flex justify-center bg-slate-950/40 backdrop-blur-sm transition-colors shadow-lg">
          <motion.div
            animate={{
              y: [0, 8, 0],
              opacity: [0.8, 0.2, 0.8]
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="w-1 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]"
          />
        </div>

        {/* Text Prompt */}
        <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400 group-hover:text-sky-400 transition-colors flex items-center gap-1">
          <span>{isAr ? 'مرر للأسفل للمزيد' : 'Scroll to explore'}</span>
          <motion.span
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-3 h-3 text-sky-400" />
          </motion.span>
        </span>
      </div>
    </motion.div>
  );
};
