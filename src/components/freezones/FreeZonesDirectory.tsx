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
    { 
      name: 'SRTI Park (Sharjah Innovation)', 
      emirate: 'Sharjah', 
      minCost: 'AED 11,500', 
      visas: 'Up to 5 Visas', 
      focus: 'AI, Tech, Software & R&D', 
      featured: true,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      url: 'https://srtip.ae/'
    },
    { 
      name: 'SHAMS (Sharjah Media City)', 
      emirate: 'Sharjah', 
      minCost: 'AED 8,050', 
      visas: 'Up to 6 Visas', 
      focus: 'Media, Creative, E-Commerce', 
      featured: false,
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
      url: 'https://shams.ae/'
    },
    { 
      name: 'IFZA (International Free Zone)', 
      emirate: 'Dubai', 
      minCost: 'AED 12,900', 
      visas: 'Up to 10 Visas', 
      focus: 'General Trading, Consulting', 
      featured: true,
      image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80',
      url: 'https://ifza.com/'
    },
    { 
      name: 'DMCC (Dubai Multi Commodities)', 
      emirate: 'Dubai', 
      minCost: 'AED 24,000', 
      visas: 'Unlimited', 
      focus: 'Commodities, Tech & Finance', 
      featured: false,
      image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800&q=80',
      url: 'https://dmcc.ae/'
    },
    { 
      name: 'Meydan Free Zone', 
      emirate: 'Dubai', 
      minCost: 'AED 12,500', 
      visas: 'Up to 4 Visas', 
      focus: 'E-commerce, Digital & Media', 
      featured: false,
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80',
      url: 'https://meydanfz.ae/'
    },
    { 
      name: 'DAFZA (Dubai Airport Freezone)', 
      emirate: 'Dubai', 
      minCost: 'AED 21,000', 
      visas: 'Up to 8 Visas', 
      focus: 'Aviation, Logistics & Trade', 
      featured: false,
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
      url: 'https://dafz.ae/'
    },
    { 
      name: 'RAKEZ (Ras Al Khaimah Economic)', 
      emirate: 'RAK', 
      minCost: 'AED 6,500', 
      visas: 'Up to 4 Visas', 
      focus: 'Industrial, Trading & Services', 
      featured: false,
      image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80',
      url: 'https://rakez.com/'
    },
    { 
      name: 'Ajman Free Zone (AFZ)', 
      emirate: 'Ajman', 
      minCost: 'AED 9,500', 
      visas: 'Up to 5 Visas', 
      focus: 'E-Commerce, Manufacturing', 
      featured: false,
      image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80',
      url: 'https://afz.ae/'
    }
  ];

  const filtered = freeZones.filter(fz => {
    const matchesEmirate = selectedEmirate === 'All' || fz.emirate === selectedEmirate;
    const matchesSearch = fz.name.toLowerCase().includes(search.toLowerCase()) ||
                          fz.focus.toLowerCase().includes(search.toLowerCase());
    return matchesEmirate && matchesSearch;
  });

  return (
    <section id="freezones" className="py-24 sm:py-32 bg-slate-50 dark:bg-[#040815] border-t border-slate-200 dark:border-white/[0.08] relative overflow-hidden transition-colors duration-300 font-sans">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100 dark:bg-slate-900 border border-sky-400/30 text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest shadow-sm">
            <Globe className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
            <span>{isAr ? 'دليل المناطق الحرة' : 'UAE Free Zones Explorer'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight font-sans">
            {isAr ? 'أكثر من 40 منطقة حرة معتمدة' : (
              <>
                <span className="font-light text-slate-600 dark:text-slate-300">Explore 40+ accredited </span>
                <span className="font-bold text-slate-900 dark:text-white">UAE Free Zones</span>
              </>
            )}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            {isAr 
              ? 'قارن بين الرسوم الحكومية وحصص التأشيرات والأنشطة المعتمدة في الشارقة ودبي ورأس الخيمة وعجمان.'
              : 'Compare license fees, visa quotas, and approved commercial activities across all 7 Emirates.'
            }
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white dark:bg-gradient-to-r dark:from-[#0c1630] dark:via-[#091124] dark:to-[#0c1630] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-4 sm:p-5 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl backdrop-blur-xl">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-none pb-1 md:pb-0">
            {emirates.map(em => (
              <button
                key={em.key}
                onClick={() => setSelectedEmirate(em.key)}
                className={'px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ' + (
                  selectedEmirate === em.key
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25'
                    : 'bg-slate-100 dark:bg-[#080e20] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-white/[0.04]'
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
              className="w-full bg-slate-50 dark:bg-[#080e20] border border-slate-200 dark:border-white/[0.1] rounded-2xl py-2.5 pl-10 pr-4 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-sky-400"
            />
          </div>
        </div>

        {/* Free Zone Cards Grid with Background Photography & High Contrast Overlays */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map(fz => (
            <div
              key={fz.name}
              className={'relative overflow-hidden rounded-3xl min-h-[280px] p-6 flex flex-col justify-between transition-all group motion-card shadow-2xl hover:shadow-[0_0_40px_rgba(56,189,248,0.3)] hover:-translate-y-1.5 border ' + (
                fz.featured 
                  ? 'border-sky-400 ring-2 ring-sky-400/50 shadow-sky-500/20' 
                  : 'border-slate-300 dark:border-white/[0.12] hover:border-sky-400'
              )}
            >
              {/* Shimmer Skeleton Placeholder */}
              <div className="absolute inset-0 bg-slate-900">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </div>

              {/* Background Photography with Zoom Effect */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                style={{ backgroundImage: `url(${fz.image})` }}
              />

              {/* Vivid High-Contrast Gradient: Clear on top, protective contrast at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-slate-950/20 transition-all duration-500 group-hover:from-slate-950/90 group-hover:via-slate-950/35" />

              {/* Content Container (z-10 for perfect readability) */}
              <div className="relative z-10 space-y-4">
                
                {/* Top Badges */}
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-sky-500/25 border border-sky-400/50 text-sky-300 font-bold backdrop-blur-md shadow-sm">
                    {fz.emirate}
                  </span>
                  <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-emerald-500/25 border border-emerald-400/50 text-emerald-300 font-bold backdrop-blur-md shadow-sm">
                    {fz.visas}
                  </span>
                </div>

                {/* Free Zone Name & Focus */}
                <div className="space-y-1.5 pt-2">
                  <h3 className="text-lg font-black text-white font-sans group-hover:text-sky-300 transition-colors drop-shadow-md leading-snug">
                    {fz.name}
                  </h3>
                  <p className="text-xs text-slate-300 font-normal leading-relaxed">
                    Focus: <span className="text-white font-semibold">{fz.focus}</span>
                  </p>
                </div>

              </div>

              {/* Bottom Price & Action Row */}
              <div className="relative z-10 pt-4 mt-4 border-t border-white/[0.15] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Starting Investment:</span>
                  <span className="text-base font-mono font-black text-white drop-shadow-sm">{fz.minCost}</span>
                </div>

                <Button
                  onClick={() => onOpenConsultation(fz.name)}
                  variant="primary"
                  size="sm"
                  className="text-xs font-bold py-2 px-4 shadow-lg shadow-sky-500/30 rounded-xl"
                >
                  <span>Inquire</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Free Zone Selection Advisory Banner with Background Photography */}
        <div className="mt-8 relative overflow-hidden rounded-3xl p-7 sm:p-9 border border-sky-400/50 shadow-2xl group">
          
          {/* Background Photography & Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-950/70 backdrop-blur-[2px]" />

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-sky-500/25 border border-sky-400/40 text-sky-400 shrink-0">
                <HelpCircle className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg sm:text-xl font-black text-white font-sans">
                  {isAr ? 'غير متأكد أي منطقة حرة هي الأنسب لنشاطك التجاري؟' : 'Unsure which Free Zone fits your exact commercial activity?'}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300">
                  {isAr 
                    ? 'يقوم مستشارونا بمقارنة التكاليف وتأشيرات الإقامة وسهولة فتح الحسابات البنكية عبر كافة المناطق الـ 40+.'
                    : 'We compare trade license pricing, visa allocations, and banking acceptance across all 40+ accredited zones.'
                  }
                </p>
              </div>
            </div>

            <Button
              onClick={() => onOpenConsultation('Free Zone Comparison')}
              variant="primary"
              size="md"
              className="font-bold text-xs shadow-xl shadow-sky-500/30 shrink-0 py-3 px-6 rounded-2xl"
            >
              <span>{isAr ? 'طلب توصية المنطقة الحرة' : 'Request Zone Recommendation'}</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
};
