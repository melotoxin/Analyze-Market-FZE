import React from 'react';
import { ShieldCheck, Activity, Search, PhoneCall, Sparkles } from 'lucide-react';
import { Language } from '../../data/translations';

interface SystemStatusBarProps {
  lang: Language;
  onOpenCommandPalette: () => void;
  onOpenConsultation: () => void;
}

export const SystemStatusBar: React.FC<SystemStatusBarProps> = ({
  lang,
  onOpenCommandPalette,
  onOpenConsultation
}) => {
  const isAr = lang === 'ar';

  return (
    <div className="bg-slate-900 text-slate-300 border-b border-white/[0.08] text-[11px] font-mono py-1.5 px-4 sm:px-8 hidden md:flex items-center justify-between transition-colors z-40 relative">
      
      {/* Live SLA & Gateway Status */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{isAr ? 'بوابة التسجيل التجاري: متصلة 100%' : 'UAE Commercial Registry Gateway: Operational'}</span>
        </div>
        <span className="text-slate-600">|</span>
        <div className="hidden lg:flex items-center gap-1.5 text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
          <span>SRTI Park Sharjah Hub: Office #B34-B047</span>
        </div>
      </div>

      {/* Right Controls: Command Palette Shortcut & Hotline */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenCommandPalette}
          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/10 transition-all cursor-pointer shadow-sm text-[10px]"
          title="Open Global Search & Command Palette"
        >
          <Search className="w-3 h-3 text-sky-400" />
          <span>{isAr ? 'بحث سريع' : 'Quick Search'}</span>
          <kbd className="px-1 py-0.2 rounded bg-slate-900 border border-white/20 text-[9px] font-bold text-sky-300">Ctrl+K</kbd>
        </button>

        <span className="text-slate-600">|</span>

        <a
          href="tel:+971563396961"
          className="text-slate-300 hover:text-white font-bold transition-colors flex items-center gap-1"
        >
          <PhoneCall className="w-3 h-3 text-sky-400" />
          <span>+971 56 339 6961</span>
        </a>
      </div>

    </div>
  );
};
