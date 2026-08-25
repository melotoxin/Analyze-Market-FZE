import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Phone,
  MessageCircle,
  ShieldCheck,
  ChevronRight,
  Zap,
  Building2
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

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.1]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen lg:h-screen lg:min-h-[640px] lg:max-h-[1080px] w-full overflow-visible lg:overflow-hidden flex flex-col justify-center pt-24 pb-12 lg:pt-16 lg:pb-6 transition-colors duration-300 font-sans"
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
        {/* 2-Column Layout: Stacks cleanly on Mobile, 2-Col with Center Gap on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center w-full">
          
          {/* Left 6 Cols: Linear / Stripe Inspired Luxury Typography & Narrative */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-4 text-left">
            
            {/* Glowing Shimmer Authority Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-2xl border border-sky-500/30 text-[11px] sm:text-xs font-mono text-slate-300 shadow-[0_0_20px_rgba(56,189,248,0.15)]">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping shrink-0" />
              <span className="font-bold text-sky-400 tracking-wider truncate max-w-[280px] sm:max-w-none">
                {isAr ? 'مجمع الشارقة للبحوث والابتكار (SRTI Park) • ترخيص B34-B047' : 'SHARJAH INNOVATION DISTRICT • LICENSE #B34-B047'}
              </span>
            </div>

            {/* Apple-Tier Two-Tone Typography with Metallic Glow */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] font-sans">
              <span className="font-light bg-gradient-to-r from-slate-200 via-white to-slate-400 bg-clip-text text-transparent block">
                {isAr ? 'تأسيس وإطلاق الشركات الذكية' : 'Incorporate your'}
              </span>
              <span className="font-light bg-gradient-to-r from-slate-200 via-white to-slate-400 bg-clip-text text-transparent block">
                {isAr ? '' : 'Enterprise'}
              </span>
              <span className="font-black text-white block mt-1 drop-shadow-[0_0_40px_rgba(56,189,248,0.25)]">
                {isAr ? 'في دولة الإمارات العربية المتحدة' : 'in the United Arab Emirates'}
              </span>
            </h1>

            {/* Narrative Subtitle with High Readability */}
            <p className="text-xs sm:text-base text-slate-300 max-w-lg leading-relaxed font-normal">
              {isAr 
                ? 'تأسيس الشركات في البر الرئيسي والمناطق الحرة (40+) والشركات القابضة، مع الإقامة الذهبية والامتثال الضريبي وحساب بنكي مؤكد تحت سقف واحد مع أنالايز ماركتس ش.م.ح.'
                : 'Turnkey Mainland, 40+ Free Zone, and Offshore corporate structuring with 10-year Golden Visas, corporate tax filing, and guaranteed tier-1 banking by AnalyzeMarkets FZE.'
              }
            </p>

            {/* High-Tech Glassmorphic Value Chips */}
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5 max-w-md text-[11px] sm:text-xs font-mono text-slate-200">
              <div className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-b from-slate-900/80 to-slate-950/90 backdrop-blur-xl px-3 py-2 rounded-xl border border-white/[0.08] shadow-sm hover:border-sky-500/30 transition-colors">
                <CheckCircle2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-emerald-400 shrink-0" />
                <span className="truncate">{isAr ? 'ملكية أجنبية 100%' : '100% Expat Ownership'}</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-b from-slate-900/80 to-slate-950/90 backdrop-blur-xl px-3 py-2 rounded-xl border border-white/[0.08] shadow-sm hover:border-sky-500/30 transition-colors">
                <CheckCircle2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-emerald-400 shrink-0" />
                <span className="truncate">{isAr ? '0% ضريبة دخل شخصي' : '0% Personal Income Tax'}</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-b from-slate-900/80 to-slate-950/90 backdrop-blur-xl px-3 py-2 rounded-xl border border-white/[0.08] shadow-sm hover:border-sky-500/30 transition-colors">
                <CheckCircle2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-emerald-400 shrink-0" />
                <span className="truncate">{isAr ? 'إصدار الرخصة في 48 ساعة' : '2-4 Days Fast-Track'}</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-b from-slate-900/80 to-slate-950/90 backdrop-blur-xl px-3 py-2 rounded-xl border border-white/[0.08] shadow-sm hover:border-sky-500/30 transition-colors">
                <CheckCircle2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-emerald-400 shrink-0" />
                <span className="truncate">{isAr ? 'حسابات بنكية من الفئة الأولى' : 'Tier-1 Bank IBAN Setup'}</span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <button
                onClick={() => onOpenConsultation('Free Zone Setup')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-sky-400 via-cyan-400 to-sky-500 hover:from-sky-300 hover:to-cyan-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(56,189,248,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>{isAr ? 'احجز استشارتك المجانية' : 'Get started for free'}</span>
                <ChevronRight className={'w-4 h-4 ' + (isAr ? 'rotate-180' : '')} />
              </button>

              <a
                href="https://wa.me/971563396961"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-white/15 hover:border-emerald-500/40 text-xs font-semibold text-slate-200 hover:text-white transition-all shadow-sm backdrop-blur-xl"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>{isAr ? 'مستشار واتساب' : 'Talk to advisor'}</span>
              </a>

              <a
                href="tel:+971563396961"
                className="inline-flex items-center gap-1.5 px-3.5 py-3 rounded-xl bg-slate-900/60 border border-white/10 hover:border-sky-400 text-xs font-mono text-slate-300 hover:text-white transition-all backdrop-blur-xl"
              >
                <Phone className="w-3.5 h-3.5 text-sky-400" />
                <span dir="ltr">+971 56 339 6961</span>
              </a>
            </div>

          </div>

          {/* Right 6 Cols: Crystal-Clear, Sharp, Ultra-Accurate UAE Enterprise Setup Studio */}
          <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end w-full">
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
