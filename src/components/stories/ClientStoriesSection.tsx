import React, { useState } from 'react';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { Language } from '../../data/translations';

interface ClientStoriesSectionProps {
  onOpenConsultation: (topic?: string) => void;
  lang: Language;
}

export const ClientStoriesSection: React.FC<ClientStoriesSectionProps> = ({
  onOpenConsultation,
  lang
}) => {
  const isAr = lang === 'ar';
  const [activeStory, setActiveStory] = useState(0);

  const stories = [
    {
      client: 'Synthetix AI Global (London & UAE)',
      sector: 'Applied Artificial Intelligence & Data Tech',
      location: 'SRTI Park Sharjah + Dubai DED Dual License',
      title: isAr ? 'توسع شركة ذكاء اصطناعي بريطانية برخصة مزدوجة' : 'British AI Scale-up UAE Expansion & Dual Licensing',
      challenge: 'Required rapid UAE market entry with 100% intellectual property protection, R&D tax exemptions, and simultaneous direct trade access to UAE federal entities.',
      solution: 'Structured a Dual-License model: SRTI Park Innovation FZE for proprietary IP & R&D (0% QFZP tax), paired with a Dubai Mainland Branch for direct public contracts.',
      metrics: [
        { label: 'Turnaround Time', value: '4 Business Days' },
        { label: 'Tax Optimization', value: '0% Qualifying Income' },
        { label: 'Bank Activation', value: 'Tier-1 Wio + ENBD' },
        { label: 'Executive Visas', value: '6 x 10-Yr Golden Visas' }
      ],
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
    },
    {
      client: 'Helvetia Commodity Trading SPV',
      sector: 'Physical Commodities & Treasury Management',
      location: 'DMCC Dubai & JAFZA Offshore Holding',
      title: isAr ? 'هيكلة شركة تجارة سلع واستثمار أصول عالمية' : 'Swiss Commodity Trading Holding & Multi-Currency Treasury',
      challenge: 'Needed high-volume international trade finance facilities, statutory confidentiality, and multi-currency banking (USD, EUR, AED, CHF).',
      solution: 'Incorporated a DMCC Free Zone trading hub combined with a JAFZA Offshore holding entity for physical logistics and European asset holding.',
      metrics: [
        { label: 'Capital Handled', value: 'AED 140M+' },
        { label: 'Banking Channels', value: 'Mashreq Neo + Emirates NBD' },
        { label: 'Audit Verification', value: 'Big-4 Standard' },
        { label: 'Asset Protection', value: '100% Statutory Privacy' }
      ],
      image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80'
    },
    {
      client: 'OmniRoute Logistics Enterprise',
      sector: 'Cross-Border Supply Chain & E-Commerce',
      location: 'Dubai Airport Freezone (DAFZA) + Mainland LLC',
      title: isAr ? 'منصة لوجستية وتجارة إلكترونية عابرة للحدود' : 'Cross-Border E-Commerce & Customs Clearance Hub',
      challenge: 'Required bonded warehouse space near Dubai DXB Airport, automated import/export customs clearance, and instant WPS payroll for 45 staff members.',
      solution: 'Executed full DAFZA setup with integrated customs code, trade mark registrations, and corporate tax compliance with zero penalties.',
      metrics: [
        { label: 'Staff Processed', value: '45 WPS Visas' },
        { label: 'Customs SLA', value: '24h Clearance' },
        { label: 'VAT Registration', value: 'FTA TRN in 48h' },
        { label: 'Investor Status', value: '10-Year Golden Visa' }
      ],
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <section id="client-stories" className="py-20 sm:py-28 bg-white border-b border-slate-200 font-sans text-slate-900">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-xs font-mono font-bold text-slate-700">
            <TrendingUp className="w-3.5 h-3.5 text-slate-700" />
            <span>02 / Case Studies</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 tracking-tight font-sans">
            {isAr ? 'تحولات حقيقية لشركات عالمية في الإمارات' : 'Proven outcomes for global enterprises & founders'}
          </h2>
          <p className="text-base text-slate-600 leading-relaxed max-w-2xl font-normal">
            {isAr 
              ? 'دراسات حالة توثق كيف ساعدنا الشركات العالمية والمستثمرين على التوسع في السوق الإماراتي مع إعفاءات ضريبية وحسابات بنكية مؤكدة.'
              : 'Real case studies documenting accelerated corporate structuring, tax optimization, and residency in the UAE.'
            }
          </p>
        </div>

        {/* Tab Navigation for Case Studies */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-slate-200 scrollbar-none">
          {stories.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStory(idx)}
              className={'px-5 py-2.5 text-xs font-mono font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer ' + (
                activeStory === idx
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              )}
            >
              <span>{s.client}</span>
            </button>
          ))}
        </div>

        {/* Active Featured Case Study Card */}
        <div className="bg-[#FBFBFA] border border-slate-200 rounded-2xl grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-md">
          
          {/* Left 5 Cols: Photo & Metadata */}
          <div className="lg:col-span-5 relative h-72 lg:h-auto min-h-[300px] bg-slate-100 overflow-hidden">
            <img
              src={stories[activeStory].image}
              alt={stories[activeStory].client}
              className="w-full h-full object-cover object-center"
                loading="lazy"
                decoding="async"
              />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/95 backdrop-blur-md rounded-xl border border-slate-200 space-y-1">
              <span className="text-[10px] font-mono text-slate-500 font-bold block uppercase tracking-wider">
                Jurisdiction & Structure:
              </span>
              <span className="text-xs font-bold text-slate-900 block">
                {stories[activeStory].location}
              </span>
            </div>
          </div>

          {/* Right 7 Cols: Narrative & Metrics Grid */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-mono text-slate-500 uppercase tracking-wide block">
                  {stories[activeStory].sector}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-sans">
                  {stories[activeStory].title}
                </h3>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                <p>
                  <strong className="text-slate-900 font-bold block mb-1">Challenge & Scope:</strong>
                  {stories[activeStory].challenge}
                </p>
                <p>
                  <strong className="text-slate-900 font-bold block mb-1">Delivered Solution by AnalyzeMarkets:</strong>
                  {stories[activeStory].solution}
                </p>
              </div>
            </div>

            {/* 4-Item Metrics Matrix */}
            <div className="pt-4 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
              {stories[activeStory].metrics.map((m, idx) => (
                <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <span className="text-[10px] text-slate-500 uppercase block truncate">{m.label}</span>
                  <span className="text-sm sm:text-base font-black text-slate-900 block mt-1">{m.value}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500">
                Verified SRTI Case File
              </span>

              <button
                onClick={() => onOpenConsultation(stories[activeStory].client)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm inline-flex items-center gap-2 cursor-pointer transition-all"
              >
                <span>Structure Similar Enterprise</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
