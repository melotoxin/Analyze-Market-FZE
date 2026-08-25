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
    <section id="about" className="py-24 sm:py-32 bg-white dark:bg-[#030712] border-t border-slate-200 dark:border-white/[0.08] relative overflow-hidden transition-colors duration-300 font-sans">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100 dark:bg-slate-900 border border-sky-400/30 text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest shadow-sm">
            <Building2 className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
            <span>{isAr ? 'عن الشركة والاعتماد الرسمي' : 'Corporate Identity & Credentials'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight font-sans">
            {isAr ? 'أنالايز ماركتس ش.م.ح (AnalyzeMarkets FZE)' : (
              <>
                <span className="font-light text-slate-600 dark:text-slate-300">Strategic intelligence & </span>
                <span className="font-bold text-slate-900 dark:text-white">enterprise formation</span>
              </>
            )}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            {isAr 
              ? 'شركة استشارات إدارية ومعلومات أبحاث مرخصة رسمياً في مجمع الشارقة للبحوث والتكنولوجيا والابتكار (SRTI Park).'
              : 'Officially accredited Management Consultancy & Research Information firm incorporated at Sharjah Research Technology & Innovation Park.'
            }
          </p>
        </div>

        {/* 2-Column Corporate Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left 7 Cols: Official License Details & Corporate Mandate */}
          <div className="lg:col-span-7 relative overflow-hidden rounded-3xl p-7 sm:p-9 space-y-6 shadow-2xl border border-sky-400/30 group flex flex-col justify-between bg-slate-950">
            
            {/* Full-Bleed Softly Blurred Photographic Background (No gaps, no seams) */}
            <div 
              className="absolute -inset-4 bg-cover bg-center filter blur-[5px] scale-105 opacity-30 transition-transform duration-700 ease-out group-hover:scale-110"
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80)' }}
            />
            {/* Uniform Deep Dark Overlay */}
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/70 to-slate-950/90 pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between border-b border-white/[0.12] pb-4">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-sky-400 uppercase tracking-wider font-bold">Licensed Entity:</span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white font-sans drop-shadow-md">AnalyzeMarkets FZE</h3>
                </div>
                <span className="text-xs font-mono px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-bold backdrop-blur-md shadow-sm">
                  Active & Good Standing
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-slate-200">
                <div className="p-4 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-md space-y-1 shadow-inner">
                  <span className="text-slate-400 block uppercase text-[10px]">Registered Location:</span>
                  <span className="text-white font-bold block text-sm">SRTI Park, Block B</span>
                  <span className="text-sky-300 text-xs block font-semibold">Office #B34-B047</span>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-md space-y-1 shadow-inner">
                  <span className="text-slate-400 block uppercase text-[10px]">Official Contact:</span>
                  <span className="text-white font-bold block text-sm">+971 56 339 6961</span>
                  <span className="text-slate-300 text-xs block">info@amdxb.com</span>
                </div>
              </div>

              <p className="text-sm text-slate-200 leading-relaxed font-sans font-normal drop-shadow-sm">
                AnalyzeMarkets FZE operates as a tier-1 corporate advisory and business formation agency. We connect global founders, family offices, and multinational enterprises with the regulatory authorities across Dubai, Sharjah, Abu Dhabi, and the Northern Emirates.
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap items-center gap-3 pt-6 border-t border-white/[0.12]">
              <a
                href="https://amdxb.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 hover:border-sky-400 text-xs font-bold text-white transition-all cursor-pointer shadow-md backdrop-blur-md"
              >
                <span>Visit amdxb.com</span>
                <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
              </a>

              <Button
                onClick={onOpenConsultation}
                variant="primary"
                size="sm"
                className="font-bold text-xs shadow-xl shadow-sky-500/30 py-2.5 px-5 rounded-xl"
              >
                <span>Schedule Executive Meeting</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </div>
          </div>

          {/* Right 5 Cols: Regulatory Guarantee Card */}
          <div className="lg:col-span-5 relative overflow-hidden rounded-3xl p-7 sm:p-9 space-y-6 shadow-2xl border border-sky-400/30 group flex flex-col justify-between bg-slate-950">
            
            {/* Full-Bleed Softly Blurred Photographic Background (No gaps, no seams) */}
            <div 
              className="absolute -inset-4 bg-cover bg-center filter blur-[5px] scale-105 opacity-30 transition-transform duration-700 ease-out group-hover:scale-110"
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1200&q=80)' }}
            />
            {/* Uniform Deep Dark Overlay */}
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/70 to-slate-950/90 pointer-events-none" />

            <div className="relative z-10 space-y-5">
              <div className="p-3.5 rounded-2xl bg-sky-500/20 border border-sky-400/40 text-sky-300 w-fit backdrop-blur-md shadow-inner">
                <Award className="w-7 h-7" />
              </div>
              <h4 className="text-2xl font-black text-white font-sans drop-shadow-md">
                Our 100% Commitment & SLA
              </h4>
              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-200 font-sans">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">Guaranteed upfront fixed quotation with zero subsequent hidden charges.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">Direct submission to government departments without secondary middlemen.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">Dedicated corporate concierge accompanying you through VIP medicals & biometrics.</span>
                </li>
              </ul>
            </div>

            <div className="relative z-10 pt-4 border-t border-white/[0.12] flex items-center justify-between text-xs font-mono text-sky-300">
              <span>Sharjah Research & Tech Park</span>
              <span className="font-bold px-2.5 py-0.5 rounded-full bg-sky-500/20 border border-sky-400/40">Govt Accredited</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
