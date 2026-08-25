import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Phone,
  MessageCircle,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { Button } from '../ui/Button';
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

  // Auto scroll-driven parallax motion
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.1]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[640px] max-h-[1080px] w-full overflow-hidden flex flex-col justify-center pt-16 pb-6 transition-colors duration-300 font-sans"
    >
      {/* 1. Low-Latency Background with Centered Uncropped Burj Khalifa + Auto Parallax on Scroll */}
      <HeroVideoBackground
        parallaxY={backgroundY as any}
        parallaxScale={backgroundScale}
      />

      {/* Main Viewport Content with Auto Scroll Fade/Parallax */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex items-center will-change-transform"
      >
        {/* 2-Column Layout with Center Gap Highlighting Burj Khalifa in Mid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 xl:gap-16 items-center w-full">
          
          {/* Left 6 Cols: n8n-Inspired Typography & Narrative */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-4 text-left">
            
            {/* Authority Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-xl border border-white/10 text-xs font-mono text-slate-300 shadow-md">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
              <span className="font-bold text-sky-400 tracking-wide">
                {isAr ? 'مجمع الشارقة للبحوث والابتكار (SRTI Park) • ترخيص B34-B047' : 'Sharjah Innovation District • License #B34-B047'}
              </span>
            </div>

            {/* n8n-Inspired Typography: Muted line 1 + Bold White line 2 */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08] font-sans">
              <span className="font-light text-slate-200 block">
                {isAr ? 'تأسيس وإطلاق الشركات الذكية' : 'Incorporate your enterprise'}
              </span>
              <span className="font-bold text-white block mt-1 drop-shadow-2xl">
                {isAr ? 'في دولة الإمارات العربية المتحدة' : 'in the United Arab Emirates'}
              </span>
            </h1>

            {/* Narrative Subtitle */}
            <p className="text-sm sm:text-base text-slate-300 max-w-lg leading-relaxed font-normal">
              {isAr 
                ? 'تأسيس الشركات في البر الرئيسي والمناطق الحرة (40+) والشركات القابضة، مع الإقامة الذهبية والامتثال الضريبي وحساب بنكي مؤكد تحت سقف واحد مع أنالايز ماركتس ش.م.ح.'
                : 'Turnkey Mainland, 40+ Free Zone, and Offshore company incorporation with 10-year Golden Visas, corporate tax filing, and guaranteed tier-1 banking by AnalyzeMarkets FZE.'
              }
            </p>

            {/* Value Badges */}
            <div className="grid grid-cols-2 gap-2.5 max-w-md text-xs font-mono text-slate-200">
              <div className="flex items-center gap-2 bg-slate-950/60 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isAr ? 'ملكية أجنبية 100%' : '100% Expat Ownership'}</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-950/60 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isAr ? '0% ضريبة دخل شخصي' : '0% Personal Income Tax'}</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-950/60 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isAr ? 'إصدار الرخصة في 48 ساعة' : '2-4 Days Fast-Track'}</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-950/60 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isAr ? 'حسابات بنكية من الفئة الأولى' : 'Tier-1 Bank Setup'}</span>
              </div>
            </div>

            {/* n8n-Style Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onOpenConsultation('Free Zone Setup')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white font-bold text-xs shadow-xl shadow-sky-500/25 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <span>{isAr ? 'احجز استشارتك المجانية' : 'Get started for free'}</span>
                <ChevronRight className={'w-4 h-4 ' + (isAr ? 'rotate-180' : '')} />
              </button>

              <a
                href="https://wa.me/971563396961"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/15 hover:border-white/30 text-xs font-semibold text-slate-200 hover:text-white transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Talk to advisor</span>
              </a>

              <a
                href="tel:+971563396961"
                className="inline-flex items-center gap-1.5 px-3.5 py-3 rounded-xl bg-slate-900/60 border border-white/10 hover:border-sky-400 text-xs font-mono text-slate-300 hover:text-white transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-sky-400" />
                <span dir="ltr">+971 56 339 6961</span>
              </a>
            </div>

          </div>

          {/* Right 6 Cols: Crystal-Clear, Sharp, Ultra-Accurate UAE Enterprise Setup Studio */}
          <div className="lg:col-span-6 xl:col-span-6 flex justify-end">
            <EnterpriseSetupStudio
              onOpenConsultation={onOpenConsultation}
              lang={lang}
              currency={currency}
            />
          </div>

        </div>

      </motion.div>

    </section>
  );
};
