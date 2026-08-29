import React, { useState } from 'react';
import { Award, ArrowRight, CheckCircle2, Building2, Globe, Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';
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
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80'
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
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
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
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <section id="client-stories" className="py-24 sm:py-32 bg-[#121316] border-t border-[#2d3139] relative overflow-hidden transition-colors duration-300 font-sans text-white">
      
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Cyber-Duck Editorial Typography */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1 bg-[#191a1e] border border-slate-700 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest shadow-sm">
            <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
            <span>{isAr ? 'قصص النجاح والأثر الملموس' : '02 / CLIENT STORIES & MEASURABLE OUTCOMES'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-sans">
            {isAr ? 'تحولات حقيقية لشركات عالمية في الإمارات' : (
              <>
                <span className="font-light text-slate-300">Measurable impact for </span>
                <span className="font-bold text-white">global enterprises & founders</span>
              </>
            )}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
            {isAr 
              ? 'دراسات حالة توثق كيف ساعدنا الشركات العالمية والمستثمرين على التوسع في السوق الإماراتي مع إعفاءات ضريبية وحسابات بنكية مؤكدة.'
              : 'Real case studies showcasing how AnalyzeMarkets FZE delivers accelerated corporate structuring, tax optimization, and long-term residency in the UAE.'
            }
          </p>
        </div>

        {/* Tab Navigation for Case Studies */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-white/[0.08] scrollbar-none">
          {stories.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStory(idx)}
              className={'px-5 py-3 text-xs font-mono font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ' + (
                activeStory === idx
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-[#191a1e] text-slate-400 hover:text-white border border-[#2d3139]'
              )}
            >
              <span>{s.client}</span>
            </button>
          ))}
        </div>

        {/* Active Featured Case Study Card */}
        <div className="bg-[#191a1e] border border-[#2d3139] grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-2xl">
          
          {/* Left 5 Cols: Photo & Metadata */}
          <div className="lg:col-span-5 relative h-72 lg:h-auto min-h-[300px] bg-slate-900 overflow-hidden">
            <img
              src={stories[activeStory].image}
              alt={stories[activeStory].client}
              className="w-full h-full object-cover object-center opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#191a1e] via-transparent to-transparent lg:hidden" />
            
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#121316]/95 border border-white/[0.1] backdrop-blur-md space-y-1">
              <span className="text-[10px] font-mono text-amber-400 font-bold block uppercase tracking-wider">
                Jurisdiction & Structure:
              </span>
              <span className="text-xs font-bold text-white block">
                {stories[activeStory].location}
              </span>
            </div>
          </div>

          {/* Right 7 Cols: Narrative & Metrics Grid */}
          <div className="lg:col-span-7 p-8 sm:p-10 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wide block">
                  {stories[activeStory].sector}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans">
                  {stories[activeStory].title}
                </h3>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                <p>
                  <strong className="text-white font-bold block mb-1">Challenge & Strategic Scope:</strong>
                  {stories[activeStory].challenge}
                </p>
                <p>
                  <strong className="text-amber-400 font-bold block mb-1">Delivered Solution by AnalyzeMarkets:</strong>
                  {stories[activeStory].solution}
                </p>
              </div>
            </div>

            {/* 4-Item Metrics Matrix */}
            <div className="pt-6 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
              {stories[activeStory].metrics.map((m, idx) => (
                <div key={idx} className="p-3 bg-[#141518] border border-[#2d3139]">
                  <span className="text-[10px] text-slate-400 uppercase block truncate">{m.label}</span>
                  <span className="text-sm sm:text-base font-black text-amber-400 block mt-1">{m.value}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-4 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">
                Verified SRTI Case File
              </span>

              <button
                onClick={() => onOpenConsultation(stories[activeStory].client)}
                className="btn-cyber-primary text-xs"
              >
                <span>Structure Similar Enterprise</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
