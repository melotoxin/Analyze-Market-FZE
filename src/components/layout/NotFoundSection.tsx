import React from 'react';
import { ArrowLeft, Home } from 'lucide-react';
import { Language } from '../../data/translations';
import { getServiceNav } from '../../data/servicesData';
import { servicePath } from '../../utils/router';
import { COMPANY_DETAILS } from '../../data/mockData';
import type { ServiceSlug } from '../../data/servicesData';

interface NotFoundSectionProps {
  lang: Language;
  onNavigateHome: () => void;
  onNavigateService: (slug: ServiceSlug) => void;
}

/**
 * Unknown URLs used to render the homepage at HTTP 200 — a soft 404, which search
 * engines treat as a duplicate of the homepage. This gives them a real dead-end
 * page (marked noindex in useDocumentMeta) with a route back into the site.
 */
export const NotFoundSection: React.FC<NotFoundSectionProps> = ({
  lang,
  onNavigateHome,
  onNavigateService,
}) => {
  const isAr = lang === 'ar';
  const services = getServiceNav(lang);

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 py-24 bg-[#FBFBFA]">
      <div className="max-w-2xl w-full text-center space-y-6">
        <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-500">
          {isAr ? 'خطأ 404' : 'Error 404'}
        </p>

        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
          {isAr ? 'الصفحة غير موجودة' : 'This page does not exist'}
        </h1>

        <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          {isAr
            ? 'ربما تم نقل الصفحة أو تغيير رابطها. يمكنك العودة إلى الصفحة الرئيسية أو تصفح خدماتنا أدناه.'
            : 'The page may have moved or the link may be out of date. Head back to the homepage or pick a service below.'}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-1">
          <button
            type="button"
            onClick={onNavigateHome}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <Home className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{isAr ? 'الصفحة الرئيسية' : 'Back to homepage'}</span>
          </button>

          <a
            href={'tel:' + COMPANY_DETAILS.phone.replace(/\s/g, '')}
            dir="ltr"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-slate-300 text-slate-800 font-bold text-xs rounded-lg hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            {COMPANY_DETAILS.phone}
          </a>
        </div>

        <div className="pt-6 border-t border-slate-200 text-start">
          <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-3 text-center">
            {isAr ? 'خدماتنا' : 'Our services'}
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {services.map((s) => (
              <li key={s.slug}>
                <a
                  href={servicePath(s.slug)}
                  onClick={(e) => {
                    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
                    e.preventDefault();
                    onNavigateService(s.slug);
                  }}
                  className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-800 hover:border-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <span>{s.label}</span>
                  <ArrowLeft className="w-3.5 h-3.5 text-slate-400 rotate-180 rtl:rotate-0" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
