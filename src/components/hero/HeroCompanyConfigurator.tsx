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
  Building2,
  Award,
  Globe
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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.15]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen lg:h-screen lg:min-h-[660px] lg:max-h-[1080px] w-full overflow-visible lg:overflow-hidden flex flex-col justify-center pt-28 pb-12 lg:pt-20 lg:pb-6 transition-colors duration-300 font-sans bg-[#121316] text-white editorial-grid"
    >
      {/* Background with video/urban backdrop */}
      <HeroVideoBackground
        parallaxY={backgroundY as any}
        parallaxScale={useTransform(scrollYProgress, [0, 1], [1, 1.05])}
      />

      {/* Main Viewport Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex items-center will-change-transform"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center w-full">
          
          {/* Left 6 Cols: Cyber-Duck Style Editorial Typography & Real Human Framing */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-5 text-left">
            
            {/* Editorial Category Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1 bg-[#191a1e] border border-slate-700 text-xs font-mono text-slate-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
              <span className="font-bold text-amber-400 tracking-wider">
                {isAr ? 'مجمع الشارقة للبحوث والابتكار (SRTI PARK) • ترخيص #B34-B047' : 'SHARJAH INNOVATION DISTRICT • LICENSE #B34-B047'}
              </span>
            </div>

            {/* Cyber-Duck Signature Editorial Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.12] font-sans">
              <span className="text-slate-300 font-light block">
                {isAr ? 'معاً، نصنع تحولاً' : 'Together, we '}
                <em className="font-serif italic text-amber-400 not-italic font-bold text-white">empower</em>
              </span>
              <span className="font-black text-white block mt-1">
                {isAr ? 'في تأسيس وتوسيع الشركات بالإمارات' : 'enterprise setup in the UAE'}
              </span>
            </h1>

            {/* Authentic, Clear Subtitle */}
            <p className="text-xs sm:text-base text-slate-300 max-w-xl leading-relaxed font-normal">
              {isAr 
                ? 'حلول مؤسسية متكاملة لتأسيس الشركات في البر الرئيسي والمناطق الحرة (40+) والشركات القابضة، مع الإقامة الذهبية والامتثال الضريبي وحساب بنكي مؤكد تحت سقف واحد مع أنالايز ماركتس ش.م.ح.'
                : 'Turnkey Mainland, 40+ Free Zone, and Offshore corporate structuring with 10-year Golden Visas, corporate tax filing, and guaranteed tier-1 banking by AnalyzeMarkets FZE.'
              }
            </p>

            {/* Cyber-Duck Human Trust Chips */}
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5 max-w-lg text-xs font-mono text-slate-200">
              <div className="flex items-center gap-2 bg-[#191a1e] px-3.5 py-2.5 border border-white/[0.08] shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">{isAr ? 'ملكية أجنبية 100%' : '100% Expat Ownership'}</span>
              </div>
              <div className="flex items-center gap-2 bg-[#191a1e] px-3.5 py-2.5 border border-white/[0.08] shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">{isAr ? '0% ضريبة دخل شخصي' : '0% Personal Income Tax'}</span>
              </div>
              <div className="flex items-center gap-2 bg-[#191a1e] px-3.5 py-2.5 border border-white/[0.08] shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">{isAr ? 'إصدار الرخصة في 48 ساعة' : '2-4 Days Fast-Track'}</span>
              </div>
              <div className="flex items-center gap-2 bg-[#191a1e] px-3.5 py-2.5 border border-white/[0.08] shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">{isAr ? 'حسابات بنكية من الفئة الأولى' : 'Tier-1 Bank IBAN Match'}</span>
              </div>
            </div>

            {/* High-Impact Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onOpenConsultation('Free Zone Setup')}
                className="btn-cyber-primary"
              >
                <span>{isAr ? 'احجز استشارتك المجانية' : 'Book Strategy Call'}</span>
                <ArrowRight className={'w-4 h-4 ' + (isAr ? 'rotate-180' : '')} />
              </button>

              <a
                href="https://wa.me/971563396961"
                target="_blank"
                rel="noreferrer"
                className="btn-cyber-outline"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>{isAr ? 'مستشار واتساب' : 'Talk to advisor'}</span>
              </a>

              <a
                href="tel:+971563396961"
                className="px-3.5 py-3 border border-slate-700 bg-slate-900/60 text-xs font-mono text-slate-300 hover:text-white hover:border-amber-400 transition-all inline-flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span dir="ltr">+971 56 339 6961</span>
              </a>
            </div>

          </div>

          {/* Right 6 Cols: Venture — The Estimator */}
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
