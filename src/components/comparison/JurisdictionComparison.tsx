import React, { useState } from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  Check,
  X,
  ArrowRight,
  Shield,
  ShieldCheck,
  Globe,
  Building,
  Sparkles,
  Zap,
  Building2,
  Lock,
  Landmark,
  Scale
} from 'lucide-react';
import { Language } from '../../data/translations';

interface JurisdictionComparisonProps {
  onOpenConsultation: (jurisdiction?: string) => void;
  lang: Language;
}

export const JurisdictionComparison: React.FC<JurisdictionComparisonProps> = ({
  onOpenConsultation,
  lang
}) => {
  const isAr = lang === 'ar';
  const [selectedCol, setSelectedCol] = useState<'freezone' | 'mainland' | 'offshore'>('freezone');

  const comparisonData = [
    {
      category: isAr ? 'الملكية والسيطرة' : 'Ownership & Governance',
      items: [
        {
          name: isAr ? 'ملكية أجنبية 100% للمستثمر' : '100% Expat Equity Ownership',
          freezone: { val: '100% Guaranteed', highlight: true },
          mainland: { val: '100% (1,000+ Codes)', highlight: true },
          offshore: { val: '100% Foreign Equity', highlight: true }
        },
        {
          name: isAr ? 'اشتراط كفيل أو شريك مواطن' : 'Mandatory Local UAE Sponsor',
          freezone: { val: '0% None Required', highlight: true },
          mainland: { val: '0% None Required', highlight: true },
          offshore: { val: '0% None Required', highlight: true }
        }
      ]
    },
    {
      category: isAr ? 'نطاق التجارة والعقود' : 'Trading Scope & Markets',
      items: [
        {
          name: isAr ? 'التجارة الحرة داخل السوق المحلي للإمارات' : 'Direct UAE Local Market Trade',
          freezone: { val: 'Via Distributor / B2B', highlight: false },
          mainland: { val: 'Unrestricted Everywhere', highlight: true },
          offshore: { val: 'International Only', highlight: false }
        },
        {
          name: isAr ? 'المناقصات والعقود الحكومية' : 'Government Tenders & Bids',
          freezone: { val: 'Not Directly Eligible', highlight: false },
          mainland: { val: 'Fully Eligible for Gov', highlight: true },
          offshore: { val: 'Not Eligible', highlight: false }
        }
      ]
    },
    {
      category: isAr ? 'النظام الضريبي والمصرفي' : 'Tax & Banking Framework',
      items: [
        {
          name: isAr ? 'ضريبة الشركات (Corporate Tax)' : 'Corporate Tax Rate',
          freezone: { val: '0% Qualifying Income (QFZP)', highlight: true },
          mainland: { val: '9% Net Profit > AED 375k', highlight: false },
          offshore: { val: '0% Zero Local Tax', highlight: true }
        },
        {
          name: isAr ? 'فتح الحساب البنكي التجاري' : 'Corporate Bank Account Setup',
          freezone: { val: 'Wio, ENBD, Mashreq (Tier-1)', highlight: true },
          mainland: { val: 'All UAE Commercial Banks', highlight: true },
          offshore: { val: 'Multi-Currency International', highlight: true }
        }
      ]
    },
    {
      category: isAr ? 'المقر والتأشيرات' : 'Office & Visa Allocations',
      items: [
        {
          name: isAr ? 'مساحة المكتب التجاري' : 'Physical Office Lease',
          freezone: { val: 'Smart Flexi-Desk Included', highlight: true },
          mainland: { val: 'Ejari Commercial Lease', highlight: false },
          offshore: { val: 'Zero Office Needed', highlight: true }
        },
        {
          name: isAr ? 'تأشيرات الإقامة والهوية الإماراتية' : 'Investor & Team Visas',
          freezone: { val: '1 to 10+ Visas per License', highlight: true },
          mainland: { val: 'Unlimited (Linked to m²)', highlight: true },
          offshore: { val: '0 Visas (Holding Entity)', highlight: false }
        }
      ]
    }
  ];

  return (
    <section id="comparison" className="py-24 sm:py-32 bg-slate-50 dark:bg-[#030712] border-t border-slate-200 dark:border-white/[0.08] relative overflow-hidden transition-colors duration-300 font-sans">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100 dark:bg-slate-900 border border-sky-400/30 text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest shadow-sm">
            <Scale className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
            <span>{isAr ? 'مقارنة الولايات القضائية' : 'Jurisdiction Comparison Matrix'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight font-sans">
            {isAr ? 'أي هيكل قانوني هو الأنسب لشركتك؟' : (
              <>
                <span className="font-light text-slate-600 dark:text-slate-300">Choose the optimal </span>
                <span className="font-bold text-slate-900 dark:text-white bg-gradient-to-r from-sky-500 via-cyan-400 to-sky-300 bg-clip-text text-transparent">UAE business structure</span>
              </>
            )}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            {isAr 
              ? 'مقارنة دقيقة وشاملة تساعد المستثمرين والشركات على الموازنة بين المناطق الحرة، والبر الرئيسي، والكيانات القابضة.'
              : 'Direct side-by-side regulatory breakdown between Free Zone Entities, Mainland LLCs, and Offshore Holding Structures.'
            }
          </p>
        </div>

        {/* 3 Top Summary Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          
          <div
            onClick={() => setSelectedCol('freezone')}
            className={'p-6 rounded-3xl border transition-all cursor-pointer relative overflow-hidden group ' + (
              selectedCol === 'freezone'
                ? 'bg-white dark:bg-gradient-to-b dark:from-[#0d1a36] dark:to-[#071024] border-sky-400 shadow-xl shadow-sky-500/20 ring-2 ring-sky-400/60'
                : 'bg-white/80 dark:bg-[#070d1e]/80 border-slate-200 dark:border-white/[0.08] hover:border-slate-400 dark:hover:border-slate-600'
            )}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-sky-500/15 text-sky-500 dark:text-sky-400">
                <Globe className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-sky-100 dark:bg-sky-500/20 text-sky-600 dark:text-sky-300 font-bold border border-sky-200 dark:border-sky-500/30">
                Most Popular
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans">Free Zone Entity (FZE / FZC)</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">Ideal for Tech, E-Commerce, Consulting, and Global Trading Companies.</p>
            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/[0.08] flex items-center justify-between text-xs font-mono">
              <span className="text-slate-500 dark:text-slate-400">Tax Treatment:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">0% Corporate Tax (QFZP)</span>
            </div>
          </div>

          <div
            onClick={() => setSelectedCol('mainland')}
            className={'p-6 rounded-3xl border transition-all cursor-pointer relative overflow-hidden group ' + (
              selectedCol === 'mainland'
                ? 'bg-white dark:bg-gradient-to-b dark:from-[#0d1a36] dark:to-[#071024] border-cyan-400 shadow-xl shadow-cyan-500/20 ring-2 ring-cyan-400/60'
                : 'bg-white/80 dark:bg-[#070d1e]/80 border-slate-200 dark:border-white/[0.08] hover:border-slate-400 dark:hover:border-slate-600'
            )}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/15 text-cyan-500 dark:text-cyan-400">
                <Building className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 font-bold border border-cyan-200 dark:border-cyan-500/30">
                Direct UAE Trade
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans">Mainland LLC (DED / DET)</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">Direct commercial trade across all 7 Emirates and eligibility for Government contracts.</p>
            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/[0.08] flex items-center justify-between text-xs font-mono">
              <span className="text-slate-500 dark:text-slate-400">Trade Freedom:</span>
              <span className="text-slate-900 dark:text-white font-bold">100% Unrestricted</span>
            </div>
          </div>

          <div
            onClick={() => setSelectedCol('offshore')}
            className={'p-6 rounded-3xl border transition-all cursor-pointer relative overflow-hidden group ' + (
              selectedCol === 'offshore'
                ? 'bg-white dark:bg-gradient-to-b dark:from-[#0d1a36] dark:to-[#071024] border-blue-400 shadow-xl shadow-blue-500/20 ring-2 ring-blue-400/60'
                : 'bg-white/80 dark:bg-[#070d1e]/80 border-slate-200 dark:border-white/[0.08] hover:border-slate-400 dark:hover:border-slate-600'
            )}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-blue-500/15 text-blue-500 dark:text-blue-400">
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-500/30">
                Asset Holding
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans">Offshore & Holding Entity</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">Asset protection, global real estate holding, and international corporate structuring.</p>
            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/[0.08] flex items-center justify-between text-xs font-mono">
              <span className="text-slate-500 dark:text-slate-400">Office Needed:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">Zero Physical Office</span>
            </div>
          </div>

        </div>

        {/* Detailed Comparison Table */}
        <div className="bg-white dark:bg-[#070d1e] border border-slate-200 dark:border-white/[0.08] rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100/80 dark:bg-[#050a18] border-b border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 text-xs font-mono uppercase">
                  <th className="p-4 sm:p-5 w-1/3">Parameters</th>
                  <th className={'p-4 sm:p-5 w-2/9 border-l border-slate-200 dark:border-white/[0.08] ' + (selectedCol === 'freezone' ? 'bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-300 font-bold' : '')}>
                    Free Zone (40+ Zones)
                  </th>
                  <th className={'p-4 sm:p-5 w-2/9 border-l border-slate-200 dark:border-white/[0.08] ' + (selectedCol === 'mainland' ? 'bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-300 font-bold' : '')}>
                    Mainland LLC (DED / DET)
                  </th>
                  <th className={'p-4 sm:p-5 w-2/9 border-l border-slate-200 dark:border-white/[0.08] ' + (selectedCol === 'offshore' ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300 font-bold' : '')}>
                    Offshore SPV & Holding
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-white/[0.06]">
                {comparisonData.map((sec, secIdx) => (
                  <React.Fragment key={secIdx}>
                    <tr className="bg-slate-50/80 dark:bg-[#0c1630]/60">
                      <td colSpan={4} className="px-5 py-2.5 font-mono text-[11px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                        {sec.category}
                      </td>
                    </tr>
                    {sec.items.map((item, itemIdx) => (
                      <tr key={itemIdx} className="hover:bg-slate-50 dark:hover:bg-[#0b1328] transition-colors">
                        <td className="p-4 sm:p-5 font-semibold text-slate-800 dark:text-slate-200 text-xs sm:text-sm">
                          {item.name}
                        </td>
                        <td className={'p-4 sm:p-5 border-l border-slate-200 dark:border-white/[0.06] ' + (selectedCol === 'freezone' ? 'bg-sky-50/40 dark:bg-sky-950/20' : '')}>
                          <span className={'text-xs sm:text-sm font-bold ' + (item.freezone.highlight ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400')}>
                            {item.freezone.val}
                          </span>
                        </td>
                        <td className={'p-4 sm:p-5 border-l border-slate-200 dark:border-white/[0.06] ' + (selectedCol === 'mainland' ? 'bg-cyan-50/40 dark:bg-cyan-950/20' : '')}>
                          <span className={'text-xs sm:text-sm font-bold ' + (item.mainland.highlight ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400')}>
                            {item.mainland.val}
                          </span>
                        </td>
                        <td className={'p-4 sm:p-5 border-l border-slate-200 dark:border-white/[0.06] ' + (selectedCol === 'offshore' ? 'bg-blue-50/40 dark:bg-blue-950/20' : '')}>
                          <span className={'text-xs sm:text-sm font-bold ' + (item.offshore.highlight ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400')}>
                            {item.offshore.val}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom Action Footer */}
          <div className="p-6 bg-slate-50 dark:bg-[#050a18] border-t border-slate-200 dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-700 dark:text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
              <span>{isAr ? 'هل تحتاج إلى استشارة لمطابقة نشاطك بدقة؟' : 'Need help determining the exact legal structure for your business activities?'}</span>
            </div>

            <Button
              onClick={() => onOpenConsultation('Jurisdiction Matrix Advisory')}
              variant="primary"
              size="sm"
              className="font-bold text-xs shadow-lg shadow-sky-500/25 shrink-0 py-2.5 px-4"
            >
              <span>{isAr ? 'طلب استشارة الهيكلة' : 'Get Structure Recommendation'}</span>
              <ArrowRight className={'w-3.5 h-3.5 ml-1.5 ' + (isAr ? 'rotate-180' : '')} />
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
};
