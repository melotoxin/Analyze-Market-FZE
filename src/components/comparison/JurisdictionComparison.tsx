import React, { useState } from 'react';
import {
  Check,
  X,
  ArrowRight,
  Shield,
  ShieldCheck,
  Globe,
  Building,
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
    <section id="comparison" className="py-20 sm:py-28 bg-[#FBFBFA] border-b border-slate-200 font-sans text-slate-900">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-mono font-bold text-slate-700">
            <Scale className="w-3.5 h-3.5 text-slate-700" />
            <span>07 / Jurisdiction Matrix</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 tracking-tight font-sans">
            {isAr ? 'أي هيكل قانوني هو الأنسب لشركتك؟' : 'Choose the optimal UAE business structure'}
          </h2>
          <p className="text-base text-slate-600 leading-relaxed max-w-2xl font-normal">
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
            className={'p-6 rounded-2xl border transition-all cursor-pointer relative group bg-white ' + (
              selectedCol === 'freezone'
                ? 'border-slate-900 ring-1 ring-slate-900 shadow-md'
                : 'border-slate-200 hover:border-slate-400'
            )}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-slate-100 text-slate-900">
                <Globe className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold border border-slate-200">
                Most Popular
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 font-sans">Free Zone Entity (FZE / FZC)</h3>
            <p className="text-xs text-slate-600 mt-1">Ideal for Tech, E-Commerce, Consulting, and Global Trading Companies.</p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-500">Tax Treatment:</span>
              <span className="text-emerald-700 font-bold">0% Corporate Tax (QFZP)</span>
            </div>
          </div>

          <div
            onClick={() => setSelectedCol('mainland')}
            className={'p-6 rounded-2xl border transition-all cursor-pointer relative group bg-white ' + (
              selectedCol === 'mainland'
                ? 'border-slate-900 ring-1 ring-slate-900 shadow-md'
                : 'border-slate-200 hover:border-slate-400'
            )}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-slate-100 text-slate-900">
                <Building className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold border border-slate-200">
                Direct UAE Trade
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 font-sans">Mainland LLC (DED / DET)</h3>
            <p className="text-xs text-slate-600 mt-1">Direct commercial trade across all 7 Emirates and eligibility for Government contracts.</p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-500">Trade Freedom:</span>
              <span className="text-slate-900 font-bold">100% Unrestricted</span>
            </div>
          </div>

          <div
            onClick={() => setSelectedCol('offshore')}
            className={'p-6 rounded-2xl border transition-all cursor-pointer relative group bg-white ' + (
              selectedCol === 'offshore'
                ? 'border-slate-900 ring-1 ring-slate-900 shadow-md'
                : 'border-slate-200 hover:border-slate-400'
            )}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-slate-100 text-slate-900">
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold border border-slate-200">
                Asset Holding
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 font-sans">Offshore & Holding Entity</h3>
            <p className="text-xs text-slate-600 mt-1">Asset protection, global real estate holding, and international corporate structuring.</p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-500">Office Needed:</span>
              <span className="text-emerald-700 font-bold">Zero Physical Office</span>
            </div>
          </div>

        </div>

        {/* Detailed Comparison Table */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-start font-sans text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 text-xs font-mono uppercase">
                  <th className="p-4 sm:p-5 w-1/3">Parameters</th>
                  <th className={'p-4 sm:p-5 w-2/9 border-l border-slate-200 ' + (selectedCol === 'freezone' ? 'bg-slate-100 font-bold text-slate-900' : '')}>
                    Free Zone (40+ Zones)
                  </th>
                  <th className={'p-4 sm:p-5 w-2/9 border-l border-slate-200 ' + (selectedCol === 'mainland' ? 'bg-slate-100 font-bold text-slate-900' : '')}>
                    Mainland LLC (DED / DET)
                  </th>
                  <th className={'p-4 sm:p-5 w-2/9 border-l border-slate-200 ' + (selectedCol === 'offshore' ? 'bg-slate-100 font-bold text-slate-900' : '')}>
                    Offshore SPV & Holding
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {comparisonData.map((sec, secIdx) => (
                  <React.Fragment key={secIdx}>
                    <tr className="bg-slate-50/60">
                      <td colSpan={4} className="px-5 py-2.5 font-mono text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                        {sec.category}
                      </td>
                    </tr>
                    {sec.items.map((item, itemIdx) => (
                      <tr key={itemIdx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-4 sm:p-5 font-semibold text-slate-800 text-xs sm:text-sm">
                          {item.name}
                        </td>
                        <td className={'p-4 sm:p-5 border-l border-slate-200 ' + (selectedCol === 'freezone' ? 'bg-slate-50/50' : '')}>
                          <span className={'text-xs sm:text-sm font-semibold ' + (item.freezone.highlight ? 'text-slate-900' : 'text-slate-500')}>
                            {item.freezone.val}
                          </span>
                        </td>
                        <td className={'p-4 sm:p-5 border-l border-slate-200 ' + (selectedCol === 'mainland' ? 'bg-slate-50/50' : '')}>
                          <span className={'text-xs sm:text-sm font-semibold ' + (item.mainland.highlight ? 'text-slate-900' : 'text-slate-500')}>
                            {item.mainland.val}
                          </span>
                        </td>
                        <td className={'p-4 sm:p-5 border-l border-slate-200 ' + (selectedCol === 'offshore' ? 'bg-slate-50/50' : '')}>
                          <span className={'text-xs sm:text-sm font-semibold ' + (item.offshore.highlight ? 'text-slate-900' : 'text-slate-500')}>
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
          <div className="p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{isAr ? 'هل تحتاج إلى استشارة لمطابقة نشاطك بدقة؟' : 'Need help determining the exact legal structure for your business activities?'}</span>
            </div>

            <button
              onClick={() => onOpenConsultation('Jurisdiction Matrix Advisory')}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg shrink-0 transition-all cursor-pointer shadow-sm flex items-center gap-1.5"
            >
              <span>{isAr ? 'طلب استشارة الهيكلة' : 'Get Structure Recommendation'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
