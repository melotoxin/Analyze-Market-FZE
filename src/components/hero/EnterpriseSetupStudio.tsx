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
  Info
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

  // Dynamic pricing calculation
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
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    setTimeout(() => {
      setIsSubmitted(false);
      setClientName('');
      setClientPhone('');
    }, 6000);
  };

  return (
    <div className="bg-[#0b1329]/95 border border-[#1e293b] hover:border-sky-500/50 rounded-2xl overflow-hidden shadow-2xl w-full max-w-[420px] text-slate-100 transition-all font-sans">
      
      {/* Compact Top Header Bar */}
      <div className="bg-[#080e20] px-4 py-2.5 border-b border-[#1e293b] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-sky-600 to-cyan-400 text-white flex items-center justify-center shadow-sm">
            <Zap className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white font-sans flex items-center gap-1.5">
              <span>{isAr ? 'حاسبة التأسيس — فانتشر' : 'Venture — The Estimator'}</span>
            </h3>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 font-bold">
          2026 Live
        </span>
      </div>

      {/* Compact Body */}
      <div className="p-3.5 sm:p-4 space-y-3">
        
        {/* 1. Jurisdiction Selection */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="font-bold text-slate-300 uppercase">
              1. {isAr ? 'الهيكل القانوني:' : 'Jurisdiction Structure:'}
            </span>
            <span className="text-sky-400 text-[10px]">
              {jurisdiction === 'freezone' ? '100% Tax-Free' : jurisdiction === 'mainland' ? 'Direct UAE Trade' : 'Asset Holding'}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 text-center">
            {[
              { key: 'freezone', title: isAr ? 'منطقة حرة' : 'Free Zone', fee: 'AED 11.5k' },
              { key: 'mainland', title: isAr ? 'بر رئيسي' : 'Mainland LLC', fee: 'AED 17.5k' },
              { key: 'offshore', title: isAr ? 'أوفشور' : 'Offshore SPV', fee: 'AED 13.5k' }
            ].map((j) => (
              <button
                key={j.key}
                type="button"
                onClick={() => setJurisdiction(j.key as any)}
                className={'p-2 rounded-xl border text-center transition-all cursor-pointer ' + (
                  jurisdiction === j.key
                    ? 'bg-sky-950/90 border-sky-400 text-white shadow-sm'
                    : 'bg-[#0e1628] border-[#1e293b] text-slate-400 hover:border-slate-600 hover:text-white'
                )}
              >
                <span className="font-bold text-[11px] block">{j.title}</span>
                <span className="text-[9px] font-mono text-sky-400 block mt-0.5">{j.fee}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Activity Code */}
        <div className="space-y-1">
          <span className="text-[11px] font-mono font-bold text-slate-300 uppercase block">
            2. {isAr ? 'النشاط التجاري:' : 'Commercial Activity:'}
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
                className={'p-1.5 rounded-lg border text-center transition-all cursor-pointer truncate ' + (
                  activity === act.key
                    ? 'bg-sky-500 text-white border-sky-400 font-bold shadow-sm'
                    : 'bg-[#0e1628] border-[#1e293b] text-slate-300 hover:border-slate-600'
                )}
              >
                {act.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Visas Counter Stepper */}
        <div className="bg-[#0e1628] p-2 rounded-xl border border-[#1e293b] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-200 block">
              3. {isAr ? 'تأشيرات الإقامة والهوية:' : 'Residence Visas & EID:'}
            </span>
            <span className="text-[9px] text-slate-400 font-mono">
              VIP Medical & Typing Included
            </span>
          </div>

          <div className="flex items-center gap-2 bg-[#080e20] p-1 rounded-lg border border-[#1e293b]">
            <button
              type="button"
              onClick={() => setVisaCount(Math.max(0, visaCount - 1))}
              className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="text-xs font-black font-mono text-sky-400 w-10 text-center">
              {visaCount} {visaCount === 1 ? 'Visa' : 'Visas'}
            </span>
            <button
              type="button"
              onClick={() => setVisaCount(Math.min(6, visaCount + 1))}
              className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Compact Total Price Banner */}
        <div className="p-2.5 bg-gradient-to-r from-slate-900 via-[#0e1628] to-slate-900 rounded-xl border border-sky-500/40 flex items-center justify-between">
          <div>
            <span className="text-[9px] font-mono uppercase text-sky-400 font-bold block">
              ALL-INCLUSIVE ESTIMATE:
            </span>
            <span className="text-xl font-black text-white font-mono block mt-0.5">
              {formattedTotal}
            </span>
          </div>

          <div className="text-right space-y-0.5 font-mono text-[10px]">
            <div className="flex items-center gap-1 text-slate-300 justify-end">
              <Clock className="w-3 h-3 text-sky-400" />
              <span className="font-bold text-white">2-4 Days SLA</span>
            </div>
            <div className="flex items-center gap-1 text-emerald-400 justify-end font-semibold">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>99.8% Bank Match</span>
            </div>
          </div>
        </div>

        {/* 1-Click Fast Dispatch Form */}
        {isSubmitted ? (
          <div className="p-2.5 bg-emerald-950/70 border border-emerald-500/50 rounded-xl text-center space-y-0.5 font-mono">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" />
            <span className="text-[11px] font-bold text-white block">Quote & Mandate Dispatched</span>
            <span className="text-[9px] text-slate-300 block">Senior formation director will call in 30 mins.</span>
          </div>
        ) : (
          <form onSubmit={handleStudioSubmit} className="space-y-1.5">
            <div className="grid grid-cols-2 gap-1.5">
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder={isAr ? 'الاسم *' : 'Full Name *'}
                className="w-full bg-[#080e20] border border-[#1e293b] rounded-lg px-2.5 py-1.5 text-[11px] text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
              />

              <input
                type="tel"
                required
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder={isAr ? 'الهاتف *' : 'Phone / WhatsApp *'}
                className="w-full bg-[#080e20] border border-[#1e293b] rounded-lg px-2.5 py-1.5 text-[11px] text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="sm"
              className="w-full justify-center text-xs font-bold shadow-md shadow-sky-500/25 py-2"
            >
              <Send className={'w-3 h-3 mr-1 ' + (isAr ? 'rotate-180' : '')} />
              <span>{isAr ? 'تثبيت السعر وبدء الإجراءات' : 'Lock in Quote & Start Setup'}</span>
            </Button>
          </form>
        )}

      </div>
    </div>
  );
};
