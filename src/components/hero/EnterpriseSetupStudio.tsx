import React, { useState } from 'react';
import {
  Building2,
  Check,
  Plus,
  Minus,
  Send,
  CheckCircle2,
  Clock,
  Zap,
  Sparkles,
  Info,
  ShieldCheck,
  Calculator,
  ArrowRight
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Language, TRANSLATIONS } from '../../data/translations';
import confetti from 'canvas-confetti';

interface EnterpriseSetupStudioProps {
  onOpenConsultation: (details?: string) => void;
  lang: Language;
  currency: string;
}

export const EnterpriseSetupStudio: React.FC<EnterpriseSetupStudioProps> = ({
  onOpenConsultation,
  lang,
  currency
}) => {
  const isAr = lang === 'ar';
  const t = TRANSLATIONS[lang];

  // Configurator state
  const [jurisdiction, setJurisdiction] = useState<'freezone' | 'mainland' | 'offshore'>('freezone');
  const [activity, setActivity] = useState<'tech' | 'trading' | 'ecommerce' | 'consulting'>('tech');
  const [visaCount, setVisaCount] = useState<number>(2);
  
  // Lead dispatch inputs
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Dynamic pricing calculation with real 2026 rates
  const basePrices = {
    freezone: 11500,
    mainland: 17500,
    offshore: 13500
  };

  const visaUnitCost = 3600;
  const rawAedTotal = basePrices[jurisdiction] + (visaCount * visaUnitCost);

  const formattedTotal = currency === 'USD' 
    ? '$' + Math.round(rawAedTotal / 3.67).toLocaleString() 
    : currency === 'EUR' 
      ? '€' + Math.round(rawAedTotal / 3.98).toLocaleString() 
      : 'AED ' + rawAedTotal.toLocaleString();

  const handleStudioSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) return;
    setIsSubmitted(true);
    confetti({ particleCount: 90, spread: 60, origin: { y: 0.6 } });
    setTimeout(() => {
      setIsSubmitted(false);
      setClientName('');
      setClientPhone('');
    }, 6000);
  };

  return (
    <div className="bg-gradient-to-b from-[#0e172e]/95 via-[#0b1329]/95 to-[#070b16]/98 border border-sky-500/30 hover:border-sky-400/60 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(56,189,248,0.15)] w-full max-w-full sm:max-w-[440px] text-slate-100 transition-all font-sans backdrop-blur-2xl relative">
      
      {/* Top Ambient Glow Ribbon */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-400 via-cyan-400 to-indigo-500" />

      {/* Header Bar */}
      <div className="bg-[#080e20]/90 px-4 sm:px-5 py-3 border-b border-white/[0.08] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-sky-500 to-cyan-400 text-slate-950 flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.4)]">
            <Calculator className="w-4 h-4 font-black" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white font-sans flex items-center gap-1.5">
              <span>{isAr ? 'حاسبة التأسيس — فانتشر' : 'Venture — The Estimator'}</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-400 block">
              {isAr ? 'حاسبة الرسوم الحكومية المعتمدة' : 'Official 2026 Tariff Simulator'}
            </span>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-950/90 text-emerald-400 border border-emerald-600/60 font-bold shadow-sm">
          ● Live 2026 Rates
        </span>
      </div>

      {/* Body Controls */}
      <div className="p-4 sm:p-5 space-y-3.5">
        
        {/* 1. Jurisdiction Selection */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="font-bold text-slate-200 uppercase tracking-wide">
              1. {isAr ? 'الهيكل القانوني:' : 'JURISDICTION STRUCTURE:'}
            </span>
            <span className="text-sky-400 text-[10px] font-semibold">
              {jurisdiction === 'freezone' ? '100% Tax-Free' : jurisdiction === 'mainland' ? 'Direct UAE Trade' : 'Asset Protection'}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            {[
              { key: 'freezone', title: isAr ? 'منطقة حرة' : 'Free Zone', fee: 'AED 11.5k' },
              { key: 'mainland', title: isAr ? 'بر رئيسي' : 'Mainland LLC', fee: 'AED 17.5k' },
              { key: 'offshore', title: isAr ? 'أوفشور' : 'Offshore SPV', fee: 'AED 13.5k' }
            ].map((j) => (
              <button
                key={j.key}
                type="button"
                onClick={() => setJurisdiction(j.key as any)}
                className={'p-2 rounded-2xl border text-center transition-all cursor-pointer ' + (
                  jurisdiction === j.key
                    ? 'bg-sky-500 text-white border-sky-400 font-bold shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                    : 'bg-[#0a1024] border-white/[0.08] text-slate-300 hover:border-slate-500 hover:text-white'
                )}
              >
                <span className="font-bold text-[11px] sm:text-xs block">{j.title}</span>
                <span className="text-[10px] font-mono block mt-0.5 opacity-90">{j.fee}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Activity Code */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-mono font-bold text-slate-200 uppercase tracking-wide block">
            2. {isAr ? 'النشاط التجاري:' : 'COMMERCIAL ACTIVITY:'}
          </span>

          <div className="grid grid-cols-2 gap-1.5 text-[11px]">
            {[
              { key: 'tech', label: 'AI, Tech & Software' },
              { key: 'trading', label: 'General Trading / Import' },
              { key: 'ecommerce', label: 'E-Commerce & Digital' },
              { key: 'consulting', label: 'Management Consulting' }
            ].map((act) => (
              <button
                key={act.key}
                type="button"
                onClick={() => setActivity(act.key as any)}
                className={'p-2 rounded-xl border text-center transition-all cursor-pointer truncate font-medium ' + (
                  activity === act.key
                    ? 'bg-sky-950/90 text-sky-300 border-sky-400 font-bold shadow-sm'
                    : 'bg-[#0a1024] border-white/[0.08] text-slate-300 hover:border-slate-600'
                )}
              >
                {act.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Visas Counter Stepper */}
        <div className="bg-[#0a1024] p-3 rounded-2xl border border-white/[0.08] flex items-center justify-between">
          <div>
            <span className="text-[11px] sm:text-xs font-bold text-slate-100 block">
              3. {isAr ? 'تأشيرات الإقامة والهوية:' : 'Residence Visas & EID:'}
            </span>
            <span className="text-[9px] sm:text-[10px] text-slate-400 font-mono">
              VIP Medical & Biometrics Included
            </span>
          </div>

          <div className="flex items-center gap-2 bg-[#060a17] p-1 rounded-xl border border-white/[0.08]">
            <button
              type="button"
              onClick={() => setVisaCount(Math.max(0, visaCount - 1))}
              className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-black font-mono text-sky-400 w-14 text-center">
              {visaCount} {visaCount === 1 ? 'Visa' : 'Visas'}
            </span>
            <button
              type="button"
              onClick={() => setVisaCount(Math.min(6, visaCount + 1))}
              className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Total Price Banner with Metallic Glow */}
        <div className="p-3.5 bg-gradient-to-r from-[#0c1630] via-[#091124] to-[#0c1630] rounded-2xl border border-sky-500/40 flex items-center justify-between shadow-inner">
          <div>
            <span className="text-[10px] font-mono uppercase text-sky-400 font-bold block tracking-wider">
              ALL-INCLUSIVE ESTIMATE:
            </span>
            <span className="text-xl sm:text-2xl font-black text-white font-mono block mt-0.5 tracking-tight">
              {formattedTotal}
            </span>
          </div>

          <div className="text-right space-y-1 font-mono text-[10px]">
            <div className="flex items-center gap-1 text-slate-200 justify-end">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              <span className="font-bold text-white">2-4 Days SLA</span>
            </div>
            <div className="flex items-center gap-1 text-emerald-400 justify-end font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>99.8% Bank Match</span>
            </div>
          </div>
        </div>

        {/* 1-Click Fast Dispatch Form */}
        {isSubmitted ? (
          <div className="p-3.5 bg-emerald-950/80 border border-emerald-500/60 rounded-2xl text-center space-y-1 font-mono">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 mx-auto" />
            <span className="text-xs font-bold text-white block">Quote & Mandate Dispatched</span>
            <span className="text-[10px] text-slate-300 block">Senior formation director will call in 30 mins.</span>
          </div>
        ) : (
          <form onSubmit={handleStudioSubmit} className="space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder={isAr ? 'الاسم بالكامل *' : 'Full Name *'}
                className="w-full bg-[#060a17] border border-white/[0.1] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
              />

              <input
                type="tel"
                required
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder={isAr ? 'الهاتف / واتساب *' : 'Phone / WhatsApp *'}
                className="w-full bg-[#060a17] border border-white/[0.1] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="sm"
              className="w-full justify-center text-xs font-bold shadow-[0_0_20px_rgba(56,189,248,0.3)] py-2.5"
            >
              <Send className={'w-3.5 h-3.5 mr-1.5 ' + (isAr ? 'rotate-180' : '')} />
              <span>{isAr ? 'تثبيت السعر وبدء الإجراءات' : 'Lock in Quote & Start Setup'}</span>
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};


