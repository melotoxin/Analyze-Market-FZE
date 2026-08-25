import React from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  Building2,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  FileText,
  Award,
  ArrowRight,
  Sparkles,
  Phone,
  MessageCircle,
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
    <section id="about" className="py-24 sm:py-32 bg-[#050811] border-t border-white/[0.08] relative overflow-hidden transition-colors duration-300 font-sans">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with n8n typography */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-sky-500/30 text-xs font-mono font-bold text-sky-400 uppercase tracking-widest shadow-sm">
            <Building2 className="w-3.5 h-3.5 text-sky-400" />
            <span>{isAr ? 'عن الشركة والاعتماد الرسمي' : 'Corporate Identity & Credentials'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-sans">
            {isAr ? 'أنالايز ماركتس ش.م.ح (AnalyzeMarkets FZE)' : (
              <>
                <span className="font-light text-slate-300">Strategic intelligence & </span>
                <span className="font-bold text-white">enterprise formation</span>
              </>
            )}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
            {isAr 
              ? 'شركة استشارات إدارية ومعلومات أبحاث مرخصة رسمياً في مجمع الشارقة للبحوث والتكنولوجيا والابتكار (SRTI Park).'
              : 'Officially accredited Management Consultancy & Research Information firm incorporated at Sharjah Research Technology & Innovation Park.'
            }
          </p>
        </div>

        {/* 2-Column Corporate Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left 7 Cols: Official License Details & Corporate Mandate */}
          <div className="lg:col-span-7 bg-[#0b1329] border border-[#1e293b] rounded-3xl p-7 sm:p-9 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div className="space-y-1">
                <span className="text-xs font-mono text-slate-400 uppercase">Licensed Entity:</span>
                <h3 className="text-xl font-bold text-white font-sans">AnalyzeMarkets FZE</h3>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800 font-bold">
                Active & Good Standing
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-slate-300">
              <div className="p-3.5 rounded-2xl bg-[#080e20] border border-white/[0.06] space-y-1">
                <span className="text-slate-400 block">Registered Location:</span>
                <span className="text-white font-bold block">SRTI Park, Block B</span>
                <span className="text-sky-400 text-[11px] block">Office #B34-B047</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#080e20] border border-white/[0.06] space-y-1">
                <span className="text-slate-400 block">Official Contact:</span>
                <span className="text-white font-bold block">+971 56 339 6961</span>
                <span className="text-slate-400 text-[11px] block">info@amdxb.com</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              AnalyzeMarkets FZE operates as a tier-1 corporate advisory and business formation agency. We connect global founders, family offices, and multinational enterprises with the regulatory authorities across Dubai, Sharjah, Abu Dhabi, and the Northern Emirates.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://amdxb.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 hover:border-sky-400 text-xs font-bold text-white transition-all cursor-pointer shadow-md"
              >
                <span>Visit amdxb.com</span>
                <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
              </a>

              <Button
                onClick={onOpenConsultation}
                variant="primary"
                size="sm"
                className="font-bold text-xs shadow-md shadow-sky-500/25 py-2.5 px-4"
              >
                <span>Schedule Executive Meeting</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </div>
          </div>

          {/* Right 5 Cols: Regulatory Guarantee Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-gradient-to-br from-[#0c1630] via-[#0b1329] to-[#080e20] border border-sky-500/40 rounded-3xl p-7 space-y-4 shadow-xl">
              <div className="p-3 rounded-2xl bg-sky-500/20 text-sky-400 w-fit">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white font-sans">
                Our 100% Commitment & SLA
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-300 font-sans">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Guaranteed upfront fixed quotation with zero subsequent hidden charges.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Direct submission to government departments without secondary middlemen.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Dedicated corporate concierge accompanying you through VIP medicals & biometrics.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
