import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  CheckCircle2,
  ArrowRight,
  Phone,
  MessageCircle,
  ShieldCheck,
  Building2,
  Globe
} from 'lucide-react';
import { HeroVideoBackground } from './HeroVideoBackground';
import { EnterpriseSetupStudio } from './EnterpriseSetupStudio';
import { Language, TRANSLATIONS } from '../../data/translations';

interface HeroCompanyConfiguratorProps {
  onOpenConsultation: (details?: string) => void;
  lang: Language;
  currency: string;
}

export const HeroCompanyConfigurator: React.FC<HeroCompanyConfiguratorProps> = ({
  onOpenConsultation,
  lang,
  currency
}) => {
  const isAr = lang === 'ar';
  const t = TRANSLATIONS[lang];
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen lg:min-h-[720px] w-full flex flex-col justify-center pt-28 pb-16 lg:pt-24 lg:pb-12 font-sans bg-slate-900 text-white border-b border-slate-800 overflow-hidden"
    >
      {/* 1. Dubai Skyline Ambient Video / Photographic Background */}
      <HeroVideoBackground
        parallaxY={backgroundY as any}
        parallaxScale={useTransform(scrollYProgress, [0, 1], [1, 1.05])}
      />

      {/* 2. Main Content */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center w-full">
          
          {/* Left 6 Cols: Clean Narrative */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-slate-900/80 backdrop-blur-md border border-white/15 rounded-full text-xs font-mono text-slate-200 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
              <span className="font-semibold text-slate-100">
                {isAr ? 'مجمع الشارقة للبحوث والابتكار (SRTI Park) • ترخيص #B34-B047' : 'Sharjah Research & Technology Park • License #B34-B047'}
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
                ? 'حلول مؤسسية متكاملة لتأسيس الشركات في البر الرئيسي والمناطق الحرة (40+) والشركات القابضة، مع الإقامة الذهبية والامتثال الضريبي وحساب بنكي مؤكد تحت سقف واحد مع أنالايز ماركتس ش.م.ح.'
                : 'Turnkey Mainland, 40+ Free Zone, and Offshore corporate structuring with 10-year Golden Visas, corporate tax filing, and guaranteed Tier-1 banking by AnalyzeMarkets FZE.'
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
                <span className="truncate">{isAr ? 'إصدار الرخصة في 48 ساعة' : '2-4 Days Fast-Track'}</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/10 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">{isAr ? 'حسابات بنكية من الفئة الأولى' : 'Tier-1 Bank IBAN Match'}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onOpenConsultation('Free Zone Setup')}
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer inline-flex items-center gap-2"
              >
                <span>{isAr ? 'احجز استشارتك المجانية' : 'Book a Consultation'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/971563396961"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-lg inline-flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>{isAr ? 'مستشار واتساب' : 'WhatsApp Advisor'}</span>
              </a>

              <a
                href="tel:+971563396961"
                className="px-4 py-3.5 rounded-xl border border-white/15 bg-slate-900/70 text-xs font-mono text-slate-200 hover:text-white transition-all inline-flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-slate-300" />
                <span dir="ltr">+971 56 339 6961</span>
              </a>
            </div>

          </div>

          {/* Right 6 Cols: Clean Estimator Studio */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end w-full">
            <EnterpriseSetupStudio
              onOpenConsultation={onOpenConsultation}
              lang={lang}
              currency={currency}
            />
          </div>

        </div>
      </div>
    </section>
  );
};
