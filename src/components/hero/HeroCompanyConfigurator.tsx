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

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen lg:min-h-[700px] w-full flex flex-col justify-center pt-28 pb-16 lg:pt-24 lg:pb-12 font-sans bg-[#FBFBFA] text-slate-900 border-b border-slate-200"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center w-full">
          
          {/* Left 6 Cols: Clean Editorial Agency Narrative */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-mono text-slate-700 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span className="font-semibold text-slate-800">
                {isAr ? 'مجمع الشارقة للبحوث والابتكار (SRTI Park) • ترخيص #B34-B047' : 'Sharjah Research & Technology Park • License #B34-B047'}
              </span>
            </div>

            {/* Editorial Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.12] font-sans font-bold text-slate-950">
              {isAr ? (
                <>تأسيس وتوسيع الشركات في <span className="text-sky-800">الإمارات</span></>
              ) : (
                <>
                  Incorporate and scale your enterprise in the <span className="text-slate-900">United Arab Emirates</span>
                </>
              )}
            </h1>

            {/* Clear Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed font-normal">
              {isAr 
                ? 'حلول مؤسسية متكاملة لتأسيس الشركات في البر الرئيسي والمناطق الحرة (40+) والشركات القابضة، مع الإقامة الذهبية والامتثال الضريبي وحساب بنكي مؤكد تحت سقف واحد مع أنالايز ماركتس ش.م.ح.'
                : 'Turnkey Mainland, 40+ Free Zone, and Offshore corporate structuring with 10-year Golden Visas, corporate tax filing, and guaranteed Tier-1 banking by AnalyzeMarkets FZE.'
              }
            </p>

            {/* Human Trust Badges */}
            <div className="grid grid-cols-2 gap-3 max-w-lg text-xs font-mono text-slate-700">
              <div className="flex items-center gap-2 bg-white px-3.5 py-2.5 rounded-lg border border-slate-200 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="truncate">{isAr ? 'ملكية أجنبية 100%' : '100% Expat Ownership'}</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-3.5 py-2.5 rounded-lg border border-slate-200 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="truncate">{isAr ? '0% ضريبة دخل شخصي' : '0% Personal Income Tax'}</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-3.5 py-2.5 rounded-lg border border-slate-200 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="truncate">{isAr ? 'إصدار الرخصة في 48 ساعة' : '2-4 Days Fast-Track'}</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-3.5 py-2.5 rounded-lg border border-slate-200 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="truncate">{isAr ? 'حسابات بنكية من الفئة الأولى' : 'Tier-1 Bank IBAN Match'}</span>
              </div>
            </div>

            {/* Clean Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onOpenConsultation('Free Zone Setup')}
                className="px-6 py-3.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer inline-flex items-center gap-2"
              >
                <span>{isAr ? 'احجز استشارتك المجانية' : 'Book a Consultation'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/971563396961"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-xs transition-all shadow-sm inline-flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>{isAr ? 'مستشار واتساب' : 'WhatsApp Advisor'}</span>
              </a>

              <a
                href="tel:+971563396961"
                className="px-4 py-3.5 rounded-lg border border-slate-200 bg-white text-xs font-mono text-slate-700 hover:text-slate-950 transition-all inline-flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-slate-600" />
                <span dir="ltr">+971 56 339 6961</span>
              </a>
            </div>

          </div>

          {/* Right 6 Cols: Clean White Venture Estimator Studio */}
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
