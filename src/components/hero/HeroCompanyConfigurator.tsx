import React from 'react';
import {
  CheckCircle2,
  ArrowRight,
  Compass,
  Layers
} from 'lucide-react';
import { HeroVideoBackground } from './HeroVideoBackground';
import { Language } from '../../data/translations';
import { useHeroParallax } from '../../utils/useHeroParallax';

interface HeroCompanyConfiguratorProps {
  onOpenConsultation: (details?: string) => void;
  lang: Language;
  currency: string;
}

export const HeroCompanyConfigurator: React.FC<HeroCompanyConfiguratorProps> = ({
  lang
}) => {
  const isAr = lang === 'ar';
  const { ref: containerRef, progress } = useHeroParallax<HTMLElement>();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] lg:min-h-[860px] w-full flex flex-col justify-center pt-36 pb-20 lg:pt-44 lg:pb-24 font-sans bg-slate-900 text-white border-b border-slate-800 overflow-hidden"
    >
      {/* 1. Dubai Skyline Ambient Video / Photographic Background */}
      <HeroVideoBackground translateYPercent={progress * 15} scale={1 + progress * 0.05} />

      {/* 2. Main Content */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="w-full">

          {/* Narrative */}
          <div className="max-w-3xl space-y-6 text-start">
            
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-slate-900/85 backdrop-blur-md border border-white/15 rounded-full text-xs font-mono text-slate-200 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
              <span className="font-semibold text-slate-100">
                {isAr ? 'مرخّصة من مجمع الشارقة للبحوث والتكنولوجيا والابتكار (SRTI Park)' : 'Licensed by Sharjah Research & Technology Park (SRTI Park)'}
              </span>
            </div>

            {/* Editorial Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.12] font-sans font-black text-white drop-shadow-md">
              {isAr ? (
                <>تأسيس وتوسيع الشركات في <span className="text-sky-400">دولة الإمارات</span></>
              ) : (
                <>
                  Incorporate and scale your enterprise in the <span className="text-sky-300">United Arab Emirates</span>
                </>
              )}
            </h1>

            {/* Clear Subtitle */}
            <p className="text-base sm:text-lg text-slate-200 max-w-xl leading-relaxed font-normal drop-shadow-sm">
              {isAr 
                ? 'استشارات وأبحاث لتأسيس الشركات في البر الرئيسي والمناطق الحرة (40+) والشركات القابضة، مع إرشادك خلال الإقامة الذهبية والامتثال الضريبي والتقديم لفتح حساب بنكي، من أنالايز ماركتس ش.م.ح.'
                : 'Advisory and research on Mainland, 40+ Free Zone, and Offshore corporate structuring, with guidance through 10-year Golden Visas, corporate tax filing, and Tier-1 bank applications by AnalyzeMarkets FZE.'
              }
            </p>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3 max-w-lg text-xs font-mono text-slate-200">
              <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/10 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">{isAr ? 'ملكية أجنبية 100%' : '100% Expat Ownership'}</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/10 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">{isAr ? '0% ضريبة دخل شخصي' : '0% Personal Income Tax'}</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/10 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">{isAr ? 'الرخصة عادةً خلال 2-4 أيام' : '2-4 Days Typical'}</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/10 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">{isAr ? 'دعم طلب الحساب البنكي' : 'Bank Application Support'}</span>
              </div>
            </div>

            {/* Clean Guided Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => scrollToSection('packages')}
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer inline-flex items-center gap-2"
              >
                <Layers className="w-4 h-4 text-slate-800" />
                <span>{isAr ? 'عرض باقات التأسيس' : 'View Turnkey Packages'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollToSection('freezones')}
                className="px-5 py-3.5 rounded-xl border border-white/20 bg-slate-900/80 hover:bg-slate-800 text-white font-semibold text-xs transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-slate-300" />
                <span>{isAr ? 'استكشف المناطق الحرة (40+)' : 'Explore 40+ Free Zones'}</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
