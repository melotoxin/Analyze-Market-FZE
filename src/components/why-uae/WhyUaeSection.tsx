import React from 'react';
import {
  TrendingUp,
  Globe2,
  ShieldCheck,
  Building,
  Coins
} from 'lucide-react';
import { Language } from '../../data/translations';

interface WhyUaeSectionProps {
  onOpenConsultation: () => void;
  lang: Language;
}

export const WhyUaeSection: React.FC<WhyUaeSectionProps> = ({
  onOpenConsultation,
  lang
}) => {
  const isAr = lang === 'ar';

  const stats = [
    { value: '#1 Ranked', label: isAr ? 'الأول عالمياً في سهولة الأعمال' : 'Ease of Doing Business', sub: 'Ranked #1 entrepreneurial ecosystem in MENA' },
    { value: '$500B+', label: isAr ? 'حجم التجارة الخارجية السنوية' : 'Annual Global Trade Volume', sub: 'Connecting Asia, Europe, and Africa seamlessly' },
    { value: '200+', label: isAr ? 'وجهة طيران عالمية مباشرة' : 'Direct Flight Destinations', sub: '4 to 8 hours flight to 2/3 of world population' },
    { value: '10-Year', label: isAr ? 'إقامة ذهبية طويلة الأمد' : 'Golden Visa Residency', sub: 'Self-sponsored 10-year security for investors & family' }
  ];

  return (
    <section id="why-uae" className="py-20 sm:py-28 bg-white border-b border-slate-200 font-sans text-slate-900">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-xs font-mono font-bold text-slate-700">
            <TrendingUp className="w-3.5 h-3.5 text-slate-700" />
            <span>08 / Macroeconomic Strengths</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 tracking-tight font-sans">
            {isAr ? 'لماذا تختار تأسيس شركتك في الإمارات؟' : 'Why international leaders choose the UAE'}
          </h2>
          <p className="text-base text-slate-600 leading-relaxed max-w-2xl font-normal">
            {isAr 
              ? 'المركز المالي والتجاري الأول في الشرق الأوسط، يجمع بين الأمان والاستقرار السياسي وسهولة ممارسة الأعمال والتنقل العالمي.'
              : 'Ranked #1 globally for entrepreneurial ease, combining political stability, pegged currency resilience, and strategic market access.'
            }
          </p>
        </div>

        {/* 4 Distinct Macroeconomic Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((st, idx) => (
            <div
              key={idx}
              className="bg-[#FBFBFA] border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm"
            >
              <div className="text-3xl sm:text-4xl font-black text-slate-950 font-mono mb-2">
                {st.value}
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900">
                  {st.label}
                </h4>
                <p className="text-xs text-slate-500 font-mono">
                  {st.sub}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          <div className="bg-[#FBFBFA] border border-slate-200 rounded-2xl p-6 sm:p-7 space-y-3 shadow-sm">
            <div className="p-2.5 rounded-xl bg-slate-100 text-slate-900 w-fit">
              <Globe2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-sans">Global Trade Gateway</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Bridge Asia, Europe, and Africa with state-of-the-art logistics, Jebel Ali seaport, and international air cargo hubs.
            </p>
          </div>

          <div className="bg-[#FBFBFA] border border-slate-200 rounded-2xl p-6 sm:p-7 space-y-3 shadow-sm">
            <div className="p-2.5 rounded-xl bg-slate-100 text-slate-900 w-fit">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-sans">Safety & Legal Security</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ranked among the safest countries worldwide, operating with modern common law jurisdictions (ADGM, DIFC) and English court systems.
            </p>
          </div>

          <div className="bg-[#FBFBFA] border border-slate-200 rounded-2xl p-6 sm:p-7 space-y-3 shadow-sm">
            <div className="p-2.5 rounded-xl bg-slate-100 text-slate-900 w-fit">
              <Coins className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-sans">Capital Mobility & Freedom</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              100% free repatriation of profits and capital, zero exchange controls, and pegged currency (AED to USD at 3.6725) ensuring financial stability.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
