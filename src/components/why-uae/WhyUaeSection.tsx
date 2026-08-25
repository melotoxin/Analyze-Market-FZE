import React from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  TrendingUp,
  Globe2,
  ShieldCheck,
  Building,
  ArrowRight,
  Sparkles,
  Plane,
  Coins,
  Scale,
  Award,
  BarChart3
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
    { value: '200+', label: isAr ? 'وجهة طيران عالمية مباشرة' : 'Direct Flight Destinations', sub: '4 to 8 hours flight to 2/3 of the world’s population' },
    { value: '10-Year', label: isAr ? 'إقامة ذهبية طويلة الأمد' : 'Golden Visa Residency', sub: 'Self-sponsored 10-year security for investors & family' }
  ];

  return (
    <section id="why-uae" className="py-24 sm:py-32 bg-slate-50 dark:bg-[#040815] border-t border-slate-200 dark:border-white/[0.08] relative overflow-hidden transition-colors duration-300 font-sans">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100 dark:bg-slate-900 border border-sky-400/30 text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest shadow-sm">
            <TrendingUp className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
            <span>{isAr ? 'القوة الاقتصادية لدولة الإمارات' : 'UAE Macroeconomic Powerhouse'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight font-sans">
            {isAr ? 'لماذا تختار تأسيس شركتك في الإمارات؟' : (
              <>
                <span className="font-light text-slate-600 dark:text-slate-300">Why world-class leaders </span>
                <span className="font-bold text-slate-900 dark:text-white">choose the UAE</span>
              </>
            )}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            {isAr 
              ? 'المركز المالي والتجاري الأول في الشرق الأوسط، يجمع بين الأمان والاستقرار السياسي وسهولة ممارسة الأعمال والتنقل العالمي.'
              : 'Ranked #1 globally for entrepreneurial ease, combining political stability, pegged currency resilience, and strategic access to 2 billion consumers.'
            }
          </p>
        </div>

        {/* 4 Distinct Macroeconomic Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((st, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-white/[0.08] hover:border-sky-400/60 rounded-3xl p-6 flex flex-col justify-between transition-all group motion-card shadow-lg"
            >
              <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-400 font-mono mb-2">
                {st.value}
              </div>
              <div className="space-y-1">
                <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-sky-500 dark:group-hover:text-sky-300 transition-colors">
                  {st.label}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  {st.sub}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          <div className="bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-white/[0.08] hover:border-sky-500/50 rounded-3xl p-7 space-y-3 transition-all shadow-lg">
            <div className="p-3 rounded-2xl bg-sky-500/15 text-sky-400 w-fit">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans">Global Trade Gateway</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Bridge Asia, Europe, and Africa with state-of-the-art logistics, Jebel Ali seaport, and Dubai/Sharjah international cargo airports.
            </p>
          </div>

          <div className="bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-white/[0.08] hover:border-sky-500/50 rounded-3xl p-7 space-y-3 transition-all shadow-lg">
            <div className="p-3 rounded-2xl bg-emerald-500/15 text-emerald-400 w-fit">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans">Safety & Legal Security</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Ranked among the safest countries worldwide, operating with modern common law jurisdictions (ADGM, DIFC) and English court systems.
            </p>
          </div>

          <div className="bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-white/[0.08] hover:border-sky-500/50 rounded-3xl p-7 space-y-3 transition-all shadow-lg">
            <div className="p-3 rounded-2xl bg-cyan-500/15 text-cyan-400 w-fit">
              <Coins className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans">Capital Mobility & Freedom</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              100% free repatriation of profits and capital, zero exchange controls, and pegged currency (AED to USD at 3.6725) ensuring currency stability.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
