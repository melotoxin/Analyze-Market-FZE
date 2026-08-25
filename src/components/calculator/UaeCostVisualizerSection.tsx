import React, { useState } from 'react';
import { 
  Calculator, 
  Building2, 
  Users, 
  Briefcase, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  TrendingDown,
  ShieldCheck,
  Coins
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Language } from '../../data/translations';

interface UaeCostVisualizerSectionProps {
  lang?: Language;
  currency?: string;
  onOpenConsultation: (topic?: string) => void;
}

export const UaeCostVisualizerSection: React.FC<UaeCostVisualizerSectionProps> = ({
  lang = 'en',
  currency = 'AED',
  onOpenConsultation
}) => {
  const isAr = lang === 'ar';

  const [jurisdiction, setJurisdiction] = useState<'freezone' | 'mainland' | 'offshore'>('freezone');
  const [visas, setVisas] = useState(1);
  const [officeType, setOfficeType] = useState<'flexi' | 'smart' | 'dedicated'>('flexi');

  // Base pricing matrix in AED
  const baseCost = {
    freezone: 11500,
    mainland: 16500,
    offshore: 12800
  }[jurisdiction];

  const visaCost = visas * 3200;

  const officeCost = {
    flexi: 0,
    smart: 4500,
    dedicated: 15000
  }[officeType];

  const totalAed = baseCost + visaCost + officeCost;

  // Currency converter
  const rates: Record<string, { symbol: string; rate: number }> = {
    AED: { symbol: 'AED', rate: 1 },
    USD: { symbol: '$', rate: 0.272 },
    EUR: { symbol: '€', rate: 0.25 },
    GBP: { symbol: '£', rate: 0.215 }
  };

  const curr = rates[currency] || rates.AED;
  const convertedTotal = Math.round(totalAed * curr.rate).toLocaleString();
  const convertedMonthly = Math.round((totalAed / 12) * curr.rate).toLocaleString();

  return (
    <section id="cost-calculator" className="py-24 sm:py-32 bg-white dark:bg-[#030712] border-t border-slate-200 dark:border-white/[0.08] relative overflow-hidden transition-colors duration-300 font-sans">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 dark:bg-slate-900 border border-sky-400/30 text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest shadow-sm">
            <Calculator className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
            <span>{isAr ? 'حاسبة التكاليف التفاعلية' : 'Interactive UAE Cost Simulator'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight font-sans">
            {isAr ? 'احسب تكلفة تأسيس شركتك بدقة وشفافية' : (
              <>
                <span className="font-light text-slate-600 dark:text-slate-300">Simulate your exact </span>
                <span className="font-bold text-slate-900 dark:text-white bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">UAE setup investment</span>
              </>
            )}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            {isAr 
              ? 'احصل على تفصيل دقيق لرسوم التراخيص الحكومية وحصص التأشيرات وخيارات المساحات المكتبية دون أي رسوم مخفية.'
              : 'Calculate government licensing fees, residency quotas, and workspace requirements with real-time currency conversion.'
            }
          </p>
        </div>

        {/* 2-Column Calculator Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left 7 Columns: Interactive Configuration Controls */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-[#070d1e] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            
            {/* 1. Jurisdiction Choice */}
            <div className="space-y-3">
              <label className="text-xs font-mono font-bold uppercase text-slate-500 dark:text-slate-400 block">
                1. Select Legal Jurisdiction:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'freezone', label: 'Free Zone (40+ Zones)', sub: '0% Corporate Tax (QFZP)' },
                  { id: 'mainland', label: 'Mainland LLC', sub: 'Direct UAE Local Trade' },
                  { id: 'offshore', label: 'Offshore SPV', sub: 'Asset & IP Holding' }
                ].map((j) => (
                  <button
                    key={j.id}
                    type="button"
                    onClick={() => setJurisdiction(j.id as any)}
                    className={'p-4 rounded-2xl border text-left transition-all cursor-pointer ' + (
                      jurisdiction === j.id
                        ? 'bg-white dark:bg-sky-950/40 border-sky-500 shadow-md ring-1 ring-sky-400'
                        : 'bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-white/[0.06] hover:border-slate-400'
                    )}
                  >
                    <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white block">{j.label}</span>
                    <span className="text-[10px] text-sky-600 dark:text-sky-300 font-mono mt-1 block">{j.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Visa Allocation Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-bold uppercase text-slate-500 dark:text-slate-400">
                  2. Executive & Investor Visas:
                </label>
                <span className="text-sm font-mono font-black px-3 py-1 rounded-full bg-sky-500 text-white shadow-sm">
                  {visas} {visas === 1 ? 'Visa' : 'Visas'}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={6}
                value={visas}
                onChange={(e) => setVisas(parseInt(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer h-2 bg-slate-200 dark:bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400">
                <span>0 Visas (Solo Holding)</span>
                <span>2 Visas (Standard Partners)</span>
                <span>4 Visas (Family / Co-Founders)</span>
                <span>6+ Visas (Enterprise Team)</span>
              </div>
            </div>

            {/* 3. Office & Workspace Requirements */}
            <div className="space-y-3">
              <label className="text-xs font-mono font-bold uppercase text-slate-500 dark:text-slate-400 block">
                3. Registered Workspace Facility:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'flexi', label: 'Flexi-Desk (Included)', sub: 'Zero Lease Overhead' },
                  { id: 'smart', label: 'Smart Executive Office', sub: 'Sharjah / Dubai Innovation' },
                  { id: 'dedicated', label: 'Dedicated Corporate Suite', sub: 'Full Commercial Lease' }
                ].map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => setOfficeType(o.id as any)}
                    className={'p-4 rounded-2xl border text-left transition-all cursor-pointer ' + (
                      officeType === o.id
                        ? 'bg-white dark:bg-sky-950/40 border-sky-500 shadow-md ring-1 ring-sky-400'
                        : 'bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-white/[0.06] hover:border-slate-400'
                    )}
                  >
                    <span className="font-bold text-xs text-slate-900 dark:text-white block">{o.label}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-1 block">{o.sub}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right 5 Columns: Dynamic Quote Card & Breakdown */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-[#0a142c] to-slate-950 border border-sky-500/40 rounded-3xl p-7 sm:p-8 text-white space-y-6 shadow-2xl relative overflow-hidden">
            
            {/* Ambient inner glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-sky-400 block">
                Estimated Turnkey Investment
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono tracking-tight text-white">
                  {curr.symbol}{convertedTotal}
                </span>
                <span className="text-xs font-mono text-slate-400">/ 1st Year Turnkey</span>
              </div>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 mt-1">
                <Coins className="w-3.5 h-3.5" />
                <span>Equivalent to ~{curr.symbol}{convertedMonthly} / month</span>
              </span>
            </div>

            {/* Itemized Cost Breakdown */}
            <div className="space-y-3 pt-4 border-t border-white/[0.1] text-xs font-mono">
              <div className="flex items-center justify-between text-slate-300">
                <span>Government Trade License:</span>
                <span className="font-bold text-white">{curr.symbol}{Math.round(baseCost * curr.rate).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Residency Visas ({visas}):</span>
                <span className="font-bold text-white">{curr.symbol}{Math.round(visaCost * curr.rate).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Workspace Facility:</span>
                <span className="font-bold text-white">{officeCost === 0 ? 'Included (Free)' : `${curr.symbol}${Math.round(officeCost * curr.rate).toLocaleString()}`}</span>
              </div>
              <div className="flex items-center justify-between text-emerald-400 font-bold pt-2 border-t border-white/[0.08]">
                <span>Corporate Tax (QFZP Exemption):</span>
                <span>0% Guaranteed</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/[0.08] space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 text-sky-300 font-bold">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span>All-Inclusive Fixed Pricing Guarantee</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Includes official MOA notarization, immigration file, VIP concierge, and guaranteed bank account approval.
              </p>
            </div>

            <Button
              onClick={() => onOpenConsultation(`Custom Setup: ${jurisdiction.toUpperCase()} with ${visas} Visas (${curr.symbol}${convertedTotal})`)}
              variant="primary"
              size="md"
              className="w-full font-bold text-xs shadow-lg shadow-sky-500/30 py-3.5"
            >
              <span>Lock In This Quotation</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>

          </div>

        </div>

      </div>
    </section>
  );
};
