import { useEffect, useState } from 'react';
import { SERVICES_CATALOG, ServiceSlug } from '../data/servicesData';

// The site previously navigated by useState alone: every service page lived at "/",
// so nothing was linkable, shareable or crawlable and the back button did nothing.
// This is the smallest thing that fixes that — the History API, no router dependency.

export const SERVICE_SLUGS = Object.keys(SERVICES_CATALOG) as ServiceSlug[];

export const servicePath = (slug: ServiceSlug) => '/services/' + slug;

export function slugFromPath(pathname: string): ServiceSlug | null {
  const match = pathname.replace(/\/+$/, '').match(/^\/services\/([a-z0-9-]+)$/);
  const slug = match?.[1];
  return slug && (SERVICE_SLUGS as string[]).includes(slug) ? (slug as ServiceSlug) : null;
}

/** Current service slug, kept in sync with the URL and the browser's back/forward. */
export function useRoute(): [ServiceSlug | null, (slug: ServiceSlug | null) => void] {
  const [slug, setSlug] = useState<ServiceSlug | null>(() =>
    slugFromPath(window.location.pathname),
  );

  useEffect(() => {
    const onPopState = () => setSlug(slugFromPath(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (next: ServiceSlug | null) => {
    const path = next ? servicePath(next) : '/';
    if (window.location.pathname !== path) window.history.pushState({}, '', path);
    setSlug(next);
  };

  return [slug, navigate];
}

/** Keep title, description and canonical honest per route — they were static before. */
export function useDocumentMeta(slug: ServiceSlug | null, lang: 'en' | 'ar') {
  useEffect(() => {
    const service = slug ? SERVICES_CATALOG[slug] : null;
    const isAr = lang === 'ar';

    document.title = service
      ? (isAr ? service.titleAr : service.titleEn) + ' | AM DXB — AnalyzeMarkets FZE'
      : 'AM DXB | AnalyzeMarkets FZE — UAE Business Setup, Dubai Company Formation & Corporate Advisory';

    const description = service
      ? isAr
        ? service.subtitleAr
        : service.subtitleEn
      : 'Incorporate your enterprise in Dubai & UAE with AnalyzeMarkets FZE. Turnkey 100% foreign ownership, 40+ Free Zones, Mainland licensing, 10-Year Golden Visas, corporate banking and corporate tax compliance.';

    const setMeta = (selector: string, attr: string, value: string) => {
      const el = document.head.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', document.title);
    setMeta('meta[name="twitter:title"]', 'content', document.title);
    setMeta('meta[name="twitter:description"]', 'content', description);

    const canonical = 'https://amdxb.com' + (slug ? servicePath(slug) : '/');
    setMeta('link[rel="canonical"]', 'href', canonical);
    setMeta('meta[property="og:url"]', 'content', canonical);
    setMeta('meta[name="twitter:url"]', 'content', canonical);
  }, [slug, lang]);
}
