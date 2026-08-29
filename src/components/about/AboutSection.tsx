import React from 'react';
import {
  Building2,
  CheckCircle2,
  MapPin,
  Award,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { Language } from '../../data/translations';

interface AboutSectionProps {
  onOpenConsultation: () => void;
  lang: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onOpenConsultation,
  lang
}) => {
  const isAr = lang === 'ar';

  return (
    <section id="about" className="py-20 sm:py-28 bg-[#FBFBFA] border-b border-slate-200 font-sans text-slate-900">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-mono font-bold text-slate-700">
            <Building2 className="w-3.5 h-3.5 text-slate-700" />
            <span>09 / Corporate Credentials</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 tracking-tight font-sans">
            {isAr ? 'أنالايز ماركتس ش.م.ح (AnalyzeMarkets FZE)' : 'Strategic intelligence & enterprise formation'}
          </h2>
          <p className="text-base text-slate-600 leading-relaxed max-w-2xl font-normal">
            {isAr 
              ? 'شركة استشارات إدارية ومعلومات أبحاث مرخصة رسمياً في مجمع الشارقة للبحوث والتكنولوجيا والابتكار (SRTI Park).'
              : 'Officially accredited Management Consultancy & Research Information firm incorporated at Sharjah Research Technology & Innovation Park.'
            }
          </p>
        </div>

        {/* 2-Column Corporate Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left 7 Cols: Official License Details & Corporate Mandate */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-wider font-bold">Licensed Entity:</span>
                  <h3 className="text-2xl font-bold text-slate-900 font-sans">AnalyzeMarkets FZE</h3>
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold">
                  Active & Good Standing
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-slate-700">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-slate-500 block uppercase text-[10px]">Registered Location:</span>
                  <span className="text-slate-900 font-bold block text-sm">SRTI Park, Block B</span>
                  <span className="text-slate-700 text-xs block font-medium">Office #B34-B047</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-slate-500 block uppercase text-[10px]">Official Contact:</span>
                  <span className="text-slate-900 font-bold block text-sm">+971 56 339 6961</span>
                  <span className="text-slate-700 text-xs block">contact@amdxb.com</span>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed font-sans font-normal">
                AnalyzeMarkets FZE operates as a tier-1 corporate advisory and business formation agency. We connect global founders, family offices, and multinational enterprises with the regulatory authorities across Dubai, Sharjah, Abu Dhabi, and the Northern Emirates.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-slate-100">
              <a
                href="https://amdxb.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold transition-all cursor-pointer"
              >
                <span>Visit amdxb.com</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-600" />
              </a>

              <button
                onClick={onOpenConsultation}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm inline-flex items-center gap-2 cursor-pointer transition-all"
              >
                <span>Schedule Executive Meeting</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right 5 Cols: Regulatory Guarantee Card */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-5">
              <div className="p-3 rounded-xl bg-slate-100 text-slate-900 w-fit">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 font-sans">
                Our 100% Commitment & SLA
              </h4>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-600 font-sans">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">Guaranteed upfront fixed quotation with zero subsequent hidden charges.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">Direct electronic submission to government authorities without secondary middlemen.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">Dedicated corporate concierge accompanying you through VIP medicals & biometrics.</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-600">
              <span>Sharjah Research & Tech Park</span>
              <span className="font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-800">Govt Accredited</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
