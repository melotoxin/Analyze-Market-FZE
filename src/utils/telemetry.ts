import { track } from '@vercel/analytics';

/**
 * Thin wrapper over Vercel Analytics custom events.
 *
 * Deliberately no third-party error SDK and no cookies: Vercel Analytics is
 * cookieless, so this adds no consent-banner obligation. Errors are reported via
 * reportError() below, which posts to our own /api/lead-adjacent logging path in
 * production and is a no-op in dev.
 *
 * PRIVACY: never pass a name, phone number, email or any free text a visitor
 * typed. Event properties are for counts and categories only.
 */

type Props = Record<string, string | number | boolean | null>;

const isProd = import.meta.env.PROD;

function safeTrack(event: string, props?: Props) {
  try {
    if (isProd) track(event, props);
    else console.debug('[telemetry]', event, props ?? '');
  } catch {
    // Telemetry must never break the page.
  }
}

/** The funnel that actually matters: estimator opened -> quote -> lead sent. */
export const analytics = {
  estimatorConfigured: (p: { jurisdiction: string; workspace: string; visas: number }) =>
    safeTrack('estimator_configured', p),

  quotePdfDownloaded: (p: { jurisdiction: string; currency: string }) =>
    safeTrack('quote_pdf_downloaded', p),

  /** source distinguishes the four capture points. */
  leadSubmitted: (p: { source: string; service: string }) => safeTrack('lead_submitted', p),

  leadFailed: (p: { source: string; reason: string }) => safeTrack('lead_failed', p),

  whatsappOpened: (p: { source: string }) => safeTrack('whatsapp_opened', p),

  serviceViewed: (p: { slug: string }) => safeTrack('service_viewed', p),

  notFound: (p: { path: string }) => safeTrack('page_not_found', p),
};

/**
 * Report an unhandled UI error. The ErrorBoundary used to swallow the stack
 * entirely, so a crash in production left no trace anywhere.
 */
export function reportError(error: Error, componentStack?: string) {
  try {
    console.error('Unhandled UI error', error, componentStack);
    safeTrack('ui_error', {
      message: String(error?.message ?? error).slice(0, 200),
      // The top frame is enough to locate it without shipping a whole stack.
      at: (componentStack ?? '').trim().split('\n')[0]?.slice(0, 120) ?? '',
    });
  } catch {
    // never rethrow from an error handler
  }
}
