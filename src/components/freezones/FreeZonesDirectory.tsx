import React, { useState } from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Search, Globe, CheckCircle2, ArrowRight, Sparkles, MapPin, Calculator, Building2, Zap, HelpCircle } from 'lucide-react';
import { Language, TRANSLATIONS } from '../../data/translations';

interface FreeZonesDirectoryProps {
  onOpenConsultation: (fzName?: string) => void;
  lang: Language;
  currency: string;
}

export const FreeZonesDirectory: React.FC<FreeZonesDirectoryProps> = ({
  onOpenConsultation,
  lang,
  currency
}) => {
  const t = TRANSLATIONS[lang];
  const isAr = lang === 'ar';
  const [selectedEmirate, setSelectedEmirate] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  const emirates = isAr
    ? [{ key: 'All', label: 'كافة المناطق (40+)' }, { key: 'Sharjah', label: 'الشارقة' }, { key: 'Dubai', label: 'دبي' }, { key: 'RAK', label: 'رأس الخيمة' }, { key: 'Ajman', label: 'عجمان' }]
    : [{ key: 'All', label: 'All Free Zones (40+)' }, { key: 'Sharjah', label: 'Sharjah' }, { key: 'Dubai', label: 'Dubai' }, { key: 'RAK', label: 'Ras Al Khaimah' }, { key: 'Ajman', label: 'Ajman' }];

  const freeZones = [
    { name: 'SRTI Park (Sharjah Innovation)', emirate: 'Sharjah', minCost: 'AED 11,500', visas: 'Up to 5 Visas', focus: 'AI, Tech, Software & R&D', featured: true },
    { name: 'SHAMS (Sharjah Media City)', emirate: 'Sharjah', minCost: 'AED 8,050', visas: 'Up to 6 Visas', focus: 'Media, Creative, E-Commerce', featured: false },
    { name: 'IFZA (International Free Zone)', emirate: 'Dubai', minCost: 'AED 12,900', visas: 'Up to 10 Visas', focus: 'General Trading, Consulting', featured: true },
    { name: 'DMCC (Dubai Multi Commodities)', emirate: 'Dubai', minCost: 'AED 24,000', visas: 'Unlimited', focus: 'Commodities, Tech & Finance', featured: false },
    { name: 'Meydan Free Zone', emirate: 'Dubai', minCost: 'AED 12,500', visas: 'Up to 4 Visas', focus: 'E-commerce, Digital & Media', featured: false },
    { name: 'DAFZA (Dubai Airport Freezone)', emirate: 'Dubai', minCost: 'AED 21,000', visas: 'Up to 8 Visas', focus: 'Aviation, Logistics & Trade', featured: false },
    { name: 'RAKEZ (Ras Al Khaimah Economic)', emirate: 'RAK', minCost: 'AED 6,500', visas: 'Up to 4 Visas', focus: 'Industrial, Trading & Services', featured: false },
    { name: 'Ajman Free Zone (AFZ)', emirate: 'Ajman', minCost: 'AED 9,500', visas: 'Up to 5 Visas', focus: 'E-Commerce, Manufacturing', featured: false }
  ];

  const filtered = freeZones.filter(fz => {
    const matchesEmirate = selectedEmirate === 'All' || fz.emirate === selectedEmirate;
    const matchesSearch = fz.name.toLowerCase().includes(search.toLowerCase()) ||
                          fz.focus.toLowerCase().includes(search.toLowerCase());
    return matchesEmirate && matchesSearch;
  });

  return (
    <section id="freezones" className="py-24 sm:py-32 bg-[#050811] border-t border-white/[0.08] relative overflow-hidden transition-colors duration-300 font-sans">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-sky-500/30 text-xs font-mono font-bold text-sky-400 uppercase tracking-widest shadow-sm">
            <Globe className="w-3.5 h-3.5 text-sky-400" />
            <span>{isAr ? 'دليل المناطق الحرة' : 'UAE Free Zones Explorer'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-sans">
            {isAr ? 'أكثر من 40 منطقة حرة معتمدة' : (
              <>
                <span className="font-light text-slate-300">Explore 40+ accredited </span>
                <span className="font-bold text-white">UAE Free Zones</span>
              </>
            )}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
            {isAr 
              ? 'قارن بين الرسوم الحكومية وحصص التأشيرات والأنشطة المعتمدة في الشارقة ودبي ورأس الخيمة وعجمان.'
              : 'Compare license fees, visa quotas, and approved commercial activities across all 7 Emirates.'
            }
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-gradient-to-r from-[#0c1630] via-[#091124] to-[#0c1630] border border-white/[0.08] rounded-3xl p-4 sm:p-5 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-none pb-1 md:pb-0">
            {emirates.map(em => (
              <button
                key={em.key}
                onClick={() => setSelectedEmirate(em.key)}
                className={'px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ' + (
                  selectedEmirate === em.key
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25'
                    : 'bg-[#080e20] text-slate-400 hover:text-white hover:bg-slate-800 border border-white/[0.04]'
                )}
              >
                {em.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by zone name or activity..."
              className="w-full bg-[#080e20] border border-white/[0.1] rounded-2xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
            />
          </div>
        </div>

        {/* Free Zone Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map(fz => (
            <div
              key={fz.name}
              className={'bg-gradient-to-b from-[#0e172e]/80 to-[#070b16]/90 border rounded-3xl p-5 sm:p-6 flex flex-col justify-between transition-all group motion-card shadow-lg relative backdrop-blur-xl hover:shadow-[0_0_35px_rgba(56,189,248,0.15)] hover:-translate-y-1 ' + (
                fz.featured ? 'border-sky-400/60 ring-1 ring-sky-400/30' : 'border-white/[0.08] hover:border-sky-500/50'
              )}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-sky-950/80 border border-sky-800 text-sky-400 font-bold">
                    {fz.emirate}
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 font-bold">
                    {fz.visas}
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                    {fz.name}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Focus: <span className="text-slate-200 font-medium">{fz.focus}</span>
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/[0.08] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block">Starting From:</span>
                  <span className="text-sm font-mono font-black text-white">{fz.minCost}</span>
                </div>

                <Button
                  onClick={() => onOpenConsultation(fz.name)}
                  variant="outline"
                  size="sm"
                  className="text-xs font-bold py-1.5 px-3"
                >
                  Inquire
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Free Zone Selection Advisory Banner */}
        <div className="mt-8 p-6 sm:p-7 bg-gradient-to-r from-[#0c1630] via-[#0b1329] to-[#080e20] border border-sky-500/30 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-sky-500/20 text-sky-400">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white font-sans">
                Unsure which Free Zone fits your exact commercial activity?
              </h4>
              <p className="text-xs text-slate-400">
                We compare trade license pricing, visa allocations, and banking acceptance across all 40+ zones.
              </p>
            </div>
          </div>

          <Button
            onClick={() => onOpenConsultation('Free Zone Comparison')}
            variant="primary"
            size="md"
            className="font-bold text-xs shadow-lg shadow-sky-500/25 shrink-0 py-2.5 px-4"
          >
            <span>Request Zone Recommendation</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        </div>

      </div>
    </section>
  );
};
