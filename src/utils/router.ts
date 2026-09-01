import { useEffect, useState } from 'react';
import { SERVICES_CATALOG, ServiceSlug } from '../data/servicesData';

// The site previously navigated by useState alone: every service page lived at "/",
// so nothing was linkable, shareable or crawlable and the back button did nothing.
// This is the smallest thing that fixes that — the History API, no router dependency.

export const SERVICE_SLUGS = Object.keys(SERVICES_CATALOG) as ServiceSlug[];

export const servicePath = (slug: ServiceSlug) => '/services/' + slug;

/**
 * True for a path we have no page for. Previously every unknown URL silently
 * rendered the homepage with HTTP 200 — a soft-404, which search engines treat
 * as a duplicate and penalise.
 */
export function isUnknownPath(pathname: string): boolean {
  const clean = pathname.replace(/\/+$/, '');
  if (clean === '' || clean === '/') return false;
  return slugFromPath(pathname) === null;
}

export function slugFromPath(pathname: string): ServiceSlug | null {
  const match = pathname.replace(/\/+$/, '').match(/^\/services\/([a-z0-9-]+)$/);
  const slug = match?.[1];
  return slug && (SERVICE_SLUGS as string[]).includes(slug) ? (slug as ServiceSlug) : null;
}

export interface Route {
  slug: ServiceSlug | null;
  notFound: boolean;
}

/** Current route, kept in sync with the URL and the browser's back/forward. */
export function useRoute(): [Route, (slug: ServiceSlug | null) => void] {
  const read = (): Route => ({
    slug: slugFromPath(window.location.pathname),
    notFound: isUnknownPath(window.location.pathname),
  });

  const [route, setRoute] = useState<Route>(read);

  useEffect(() => {
    const onPopState = () => setRoute(read());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (next: ServiceSlug | null) => {
    const path = next ? servicePath(next) : '/';
    if (window.location.pathname !== path) window.history.pushState({}, '', path);
    setRoute({ slug: next, notFound: false });
  };

  return [route, navigate];
}

/** Keep title, description and canonical honest per route — they were static before. */
export function useDocumentMeta(slug: ServiceSlug | null, lang: 'en' | 'ar', notFound = false) {
  useEffect(() => {
    const service = slug ? SERVICES_CATALOG[slug] : null;
    const isAr = lang === 'ar';

    // A not-found page must never be indexed, and must not claim a canonical.
    const robots = document.head.querySelector('meta[name="robots"]');
    if (robots) robots.setAttribute('content', notFound ? 'noindex, follow' : 'index, follow');

    if (notFound) {
      document.title = 'Page not found | AM DXB — AnalyzeMarkets FZE';
      return;
    }

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
  }, [slug, lang, notFound]);
}
