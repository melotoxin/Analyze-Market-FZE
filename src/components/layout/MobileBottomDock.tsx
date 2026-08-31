import React from 'react';
import { MessageCircle, Calculator, Phone, Mail } from 'lucide-react';
import { Language } from '../../data/translations';
import { openAdvisoryEmail } from '../../utils/submitLead';

interface MobileBottomDockProps {
  onOpenConsultation: (details?: string) => void;
  lang: Language;
}

export const MobileBottomDock: React.FC<MobileBottomDockProps> = ({
  onOpenConsultation,
  lang
}) => {
  const isAr = lang === 'ar';

  const btnBase =
    'rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-md active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2';

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-lg border-t border-slate-200 px-3 py-2.5 flex items-center justify-between gap-2 shadow-2xl font-sans">
      
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/971563396961"
        target="_blank"
        rel="noopener noreferrer"
        className={`flex-1 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white ${btnBase}`}
      >
        <MessageCircle className="w-4 h-4" />
        <span>{isAr ? 'واتساب المستشار' : 'WhatsApp'}</span>
      </a>

      <button
        type="button"
        onClick={() =>
          openAdvisoryEmail({
            name: 'Prospective client',
            phone: 'To be provided',
            service: 'Mobile advisory enquiry',
          })
        }
        className={`flex-1 py-2.5 px-3 bg-white hover:bg-slate-50 hover:border-slate-400 text-slate-900 border border-slate-300 ${btnBase} cursor-pointer`}
      >
        <Mail className="w-4 h-4" />
        <span>{isAr ? 'بريد' : 'Email'}</span>
      </button>

      {/* Book Consultation / Estimate */}
      <button
        onClick={() => onOpenConsultation('Mobile Quick Inquiry')}
        className={`flex-1 py-2.5 px-3 bg-slate-900 hover:bg-slate-700 text-white uppercase tracking-wider ${btnBase} cursor-pointer`}
      >
        <Calculator className="w-3.5 h-3.5" />
        <span>{isAr ? 'احسب التكلفة' : 'Get Quote'}</span>
      </button>

      {/* Call Hotline Icon */}
      <a
        href="tel:+971563396961"
        className={`p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200 ${btnBase}`}
        title="Direct Call"
        aria-label={isAr ? 'اتصل بنا' : 'Call us'}
      >
        <Phone className="w-4 h-4" />
      </a>

    </div>
  );
};
