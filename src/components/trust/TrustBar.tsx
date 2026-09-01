import React from 'react';

/**
 * Authorities and banks the firm deals with.
 *
 * Deliberately NOT links: outbound links to SEDD, DET, Emirates NBD, Mashreq, Wio
 * and the FTA implied an endorsement or partnership that does not exist, and sent
 * traffic away from the page. These are plain informational cards.
 */
export const TrustBar: React.FC = () => {
  const partners = [
    { name: 'SRTI Park', sub: 'Sharjah Innovation Hub', role: 'Official Head Office & Free Zone Hub' },
    { name: 'Sharjah SEDD', sub: 'Economic Development', role: 'Mainland Commercial Authority' },
    { name: 'Dubai Economy (DET)', sub: 'Gov of Dubai', role: 'Commercial Licensing Registrar' },
    { name: 'Emirates NBD', sub: 'Tier-1 Banking', role: 'Corporate Account Introductions' },
    { name: 'Wio Bank', sub: 'UAE Digital Banking', role: 'Digital Corporate Accounts' },
    { name: 'Mashreq Bank', sub: 'Neo Corporate Banking', role: 'Trade Finance & Multi-Currency IBAN' },
    { name: 'Federal Tax Authority (FTA)', sub: 'UAE Ministry of Finance', role: 'Corporate Tax & TRN Registration' },
  ];

  return (
    <section
      id="authorities"
      className="py-16 sm:py-20 bg-white border-y border-slate-200 text-slate-900 font-sans"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 pb-4 border-b border-slate-100">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono">
            Authorities &amp; Banking Channels We Work With
          </h2>
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
          {partners.map((p) => (
            <li
              key={p.name}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between text-start"
            >
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">{p.name}</h3>
                <p className="text-[11px] text-slate-500 font-mono">{p.sub}</p>
              </div>

              <div className="pt-2 mt-2 border-t border-slate-200/60">
                <span className="text-[10px] text-slate-600 font-medium block">{p.role}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
