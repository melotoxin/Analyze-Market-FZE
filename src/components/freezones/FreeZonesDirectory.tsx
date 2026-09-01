import React, { useState } from 'react';
import { Search, Globe, ArrowRight, HelpCircle } from 'lucide-react';
import { formatMoney } from '../../data/pricing';
import { Language } from '../../data/translations';

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
      minCostAed: 11500, 
      visas: 'Up to 5 Visas', 
      focus: 'AI, Tech, Software & R&D', 
      featured: true,
      image: '/img/1486406146926-c627a9-w800.webp',
      url: 'https://srtip.ae/'
    },
    { 
      name: 'SHAMS (Sharjah Media City)', 
      emirate: 'Sharjah', 
      minCostAed: 8050, 
      visas: 'Up to 6 Visas', 
      focus: 'Media, Creative, E-Commerce', 
      featured: false,
      image: '/img/1512453979798-5ea266-w800.webp',
      url: 'https://shams.ae/'
    },
    { 
      name: 'IFZA (International Free Zone)', 
      emirate: 'Dubai', 
      minCostAed: 12900, 
      visas: 'Up to 10 Visas', 
      focus: 'General Trading, Consulting', 
      featured: true,
      image: '/img/1518684079-3c830dcef-w800.webp',
      url: 'https://ifza.com/'
    },
    { 
      name: 'DMCC (Dubai Multi Commodities)', 
      emirate: 'Dubai', 
      minCostAed: 24000, 
      visas: 'Unlimited', 
      focus: 'Commodities, Tech & Finance', 
      featured: false,
      image: '/img/1580674684081-7617fb-w800.webp',
      url: 'https://dmcc.ae/'
    },
    { 
      name: 'Meydan Free Zone', 
      emirate: 'Dubai', 
      minCostAed: 12500, 
      visas: 'Up to 4 Visas', 
      focus: 'E-commerce, Digital & Media', 
      featured: false,
      image: '/img/1566073771259-6a8506-w800.webp',
      url: 'https://meydanfz.ae/'
    },
    { 
      name: 'DAFZA (Dubai Airport Freezone)', 
      emirate: 'Dubai', 
      minCostAed: 21000, 
      visas: 'Up to 8 Visas', 
      focus: 'Aviation, Logistics & Trade', 
      featured: false,
      image: '/img/1529070538774-1843cb-w800.webp',
      url: 'https://dafz.ae/'
    },
    { 
      name: 'RAKEZ (Ras Al Khaimah Economic)', 
      emirate: 'RAK', 
      minCostAed: 6500, 
      visas: 'Up to 4 Visas', 
      focus: 'Industrial, Trading & Services', 
      featured: false,
      image: '/img/1581092160562-40aa08-w800.webp',
      url: 'https://rakez.com/'
    },
    { 
      name: 'Ajman Free Zone (AFZ)', 
      emirate: 'Ajman', 
      minCostAed: 9500, 
      visas: 'Up to 5 Visas', 
      focus: 'E-Commerce, Manufacturing', 
      featured: false,
      image: '/img/1577495508048-b63587-w800.webp',
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
    <section id="freezones" className="py-20 sm:py-28 bg-[#FBFBFA] border-b border-slate-200 font-sans text-slate-900">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-mono font-bold text-slate-700">
            <Globe className="w-3.5 h-3.5 text-slate-700" />
            <span>05 / Free Zones Hub</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 tracking-tight font-sans">
            {isAr ? 'دليل أكثر من 40 منطقة حرة بالإمارات' : 'Explore 40+ accredited UAE Free Zones'}
          </h2>
          <p className="text-base text-slate-600 leading-relaxed max-w-2xl font-normal">
            {isAr 
              ? 'قارن بين الرسوم الحكومية وحصص التأشيرات والأنشطة المعتمدة في الشارقة ودبي ورأس الخيمة وعجمان.'
              : 'Compare license tariffs, visa quotas, and approved commercial activities across all 7 Emirates.'
            }
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-none pb-1 md:pb-0">
            {emirates.map(em => (
              <button
                key={em.key}
                onClick={() => setSelectedEmirate(em.key)}
                className={'px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ' + (
                  selectedEmirate === em.key
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
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
              placeholder="Search zone or activity..."
              aria-label="Search free zones by name or business activity"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-10 pr-4 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800"
            />
          </div>
        </div>

        {/* Free Zone Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map(fz => (
            <div
              key={fz.name}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between transition-all group shadow-sm hover:shadow-md hover:border-slate-400"
            >
              <div className="h-40 relative bg-slate-100 overflow-hidden">
                <img
                  src={fz.image}
                  alt={fz.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                decoding="async"
              />
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/95 text-slate-800 font-bold border border-slate-200 backdrop-blur-sm">
                    {fz.emirate}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                    {fz.visas}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900 font-sans">
                    {fz.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-normal">
                    Focus: <span className="text-slate-800 font-semibold">{fz.focus}</span>
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Starting Fee:</span>
                    <span className="text-sm font-mono font-bold text-slate-950">
                      {formatMoney(fz.minCostAed, currency)}
                    </span>
                  </div>

                  <button
                    onClick={() => onOpenConsultation(fz.name)}
                    className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-all cursor-pointer"
                  >
                    Inquire
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Free Zone Advisory Banner */}
        <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-slate-100 text-slate-900 rounded-xl shrink-0">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base sm:text-lg font-bold text-slate-900 font-sans">
                {isAr ? 'غير متأكد أي منطقة حرة هي الأنسب لنشاطك التجاري؟' : 'Unsure which Free Zone fits your business activity?'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                {isAr 
                  ? 'يقوم مستشارونا بمقارنة التكاليف وتأشيرات الإقامة وسهولة فتح الحسابات البنكية عبر كافة المناطق الـ 40+.'
                  : 'Our senior directors compare trade license pricing, visa allocations, and banking acceptance across all 40+ zones.'
                }
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenConsultation('Free Zone Recommendation')}
            className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg shrink-0 flex items-center gap-2 cursor-pointer transition-all shadow-sm"
          >
            <span>{isAr ? 'طلب توصية المنطقة الحرة' : 'Get Zone Recommendation'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
