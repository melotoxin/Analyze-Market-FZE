import React from 'react';
import { MessageCircle, Calculator, Phone } from 'lucide-react';
import { Language } from '../../data/translations';

interface MobileBottomDockProps {
  onOpenConsultation: (details?: string) => void;
  lang: Language;
}

export const MobileBottomDock: React.FC<MobileBottomDockProps> = ({
  onOpenConsultation,
  lang
}) => {
  const isAr = lang === 'ar';

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-lg border-t border-slate-200 px-3 py-2.5 flex items-center justify-between gap-2 shadow-2xl font-sans">
      
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/971563396961"
        target="_blank"
        rel="noreferrer"
        className="flex-1 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
      >
        <MessageCircle className="w-4 h-4" />
        <span>{isAr ? 'واتساب المستشار' : 'WhatsApp'}</span>
      </a>

      {/* Book Consultation / Estimate */}
      <button
        onClick={() => onOpenConsultation('Mobile Quick Inquiry')}
        className="flex-1 py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
      >
        <Calculator className="w-3.5 h-3.5" />
        <span>{isAr ? 'احسب التكلفة' : 'Get Quote'}</span>
      </button>

      {/* Call Hotline Icon */}
      <a
        href="tel:+971563396961"
        className="p-2.5 bg-slate-100 text-slate-900 rounded-xl border border-slate-200 flex items-center justify-center shadow-sm"
        title="Direct Call"
      >
        <Phone className="w-4 h-4" />
      </a>

    </div>
  );
};
