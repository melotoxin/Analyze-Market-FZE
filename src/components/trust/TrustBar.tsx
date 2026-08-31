import React from 'react';
import { ExternalLink, ShieldCheck, Building2 } from 'lucide-react';
import { Language } from '../../data/translations';

interface TrustBarProps {
  lang: Language;
}

export const TrustBar: React.FC<TrustBarProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const partners = [
    {
      name: 'SRTI Park',
      sub: 'Sharjah Innovation Hub',
      role: 'Official Head Office & Free Zone Hub',
      url: 'https://srtip.ae/'
    },
    {
      name: 'Sharjah SEDD',
      sub: 'Economic Development',
      role: 'Mainland Commercial Authority',
      url: 'https://sedd.ae/'
    },
    {
      name: 'Dubai Economy (DET)',
      sub: 'Gov of Dubai',
      role: 'Commercial Licensing Registrar',
      url: 'https://www.economy-dubai.ae/'
    },
    {
      name: 'Emirates NBD',
      sub: 'Tier-1 Banking',
      role: 'Corporate Account Dedicated Desk',
      url: 'https://www.emiratesnbd.com/'
    },
    {
      name: 'Wio Bank',
      sub: 'UAE Digital Banking',
      role: 'Instant Digital Corporate Accounts',
      url: 'https://wio.io/business/'
    },
    {
      name: 'Mashreq Bank',
      sub: 'Neo Corporate Banking',
      role: 'Trade Finance & Multi-Currency IBAN',
      url: 'https://www.mashreq.com/'
    },
    {
      name: 'Federal Tax Authority (FTA)',
      sub: 'UAE Ministry of Finance',
      role: 'Corporate Tax & TRN Registration',
      url: 'https://tax.gov.ae/'
    },
  ];

  return (
    <section className="py-10 bg-white border-y border-slate-200 text-slate-900 font-sans transition-colors duration-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Ribbon */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono">
              Accredited Authorities & Tier-1 Banking Partners
            </span>
          </div>
          <span className="text-xs text-slate-500 font-normal">
            Direct government API integration & corporate banking fast-tracks
          </span>
        </div>

        {/* Clean, Non-Glow Partner Ribbon Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
          {partners.map((p, idx) => (
            <a
              key={idx}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 hover:border-slate-400 transition-all group flex flex-col justify-between text-start no-underline"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-slate-800 transition-colors">
                    {p.name}
                  </h3>
                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-slate-700 transition-colors shrink-0" />
                </div>
                <p className="text-[11px] text-slate-500 font-mono">
                  {p.sub}
                </p>
              </div>

              <div className="pt-2 mt-2 border-t border-slate-200/60">
                <span className="text-[10px] text-slate-600 font-medium block line-clamp-1">
                  {p.role}
                </span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
