import { analytics } from './telemetry';

export interface LeadPayload {
  name: string;
  phone: string;
  service: string;
  email?: string;
  notes?: string;
  quote?: string;
  source?: string;
  company?: string; // honeypot
}

export interface AdvisoryMessage {
  name: string;
  phone: string;
  service: string;
  email?: string;
  notes?: string;
  quote?: string;
}

export const WHATSAPP_URL = 'https://wa.me/971563396961';
export const ADVISORY_EMAIL = 'contact@amdxb.com';

/** POSTs a lead to /api/lead. Throws with a user-safe message on failure. */
export async function submitLead(payload: LeadPayload): Promise<void> {
  const source = payload.source ?? 'unknown';
  let res: Response;
  try {
    res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    // Counted here rather than in each form, so no capture point can forget to.
    // Only the source and a reason code — never the visitor's details.
    analytics.leadFailed({ source, reason: 'network' });
    throw new Error('Network error. Please check your connection or call us directly.');
  }

  if (!res.ok) {
    const message = await res
      .json()
      .then((d) => (d && typeof d.error === 'string' ? d.error : ''))
      .catch(() => '');
    analytics.leadFailed({ source, reason: 'http_' + res.status });
    throw new Error(message || 'Could not send your request. Please call us directly.');
  }

  analytics.leadSubmitted({ source, service: payload.service });
}

export function formatAdvisoryMessage(msg: AdvisoryMessage): string {
  const lines = [
    'Hello AM DXB Advisory,',
    '',
    `Service: ${msg.service}`,
    ...(msg.quote ? [`Estimate: ${msg.quote}`] : []),
    ...(msg.notes ? [`Details: ${msg.notes}`] : []),
    '',
    `Name: ${msg.name}`,
    `Phone / WhatsApp: ${msg.phone}`,
    ...(msg.email ? [`Email: ${msg.email}`] : []),
    '',
    'Please share the registration roadmap and next steps.',
  ];
  return lines.join('\n');
}

export function buildAdvisoryWhatsAppUrl(msg: AdvisoryMessage): string {
  return WHATSAPP_URL + '?text=' + encodeURIComponent(formatAdvisoryMessage(msg));
}

export function buildAdvisoryEmailUrl(msg: AdvisoryMessage): string {
  const params = new URLSearchParams();
  params.set('subject', `Advisory request — ${msg.service}`);
  params.set('body', formatAdvisoryMessage(msg));
  return `mailto:${ADVISORY_EMAIL}?${params.toString()}`;
}

/** window.open without noopener leaves the new tab able to reach back via opener. */
export function openExternal(url: string): void {
  let parsed: URL;
  try {
    parsed = new URL(url, window.location.origin);
  } catch {
    return;
  }
  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:' && parsed.protocol !== 'mailto:') {
    return;
  }
  if (parsed.protocol === 'mailto:') {
    window.location.href = parsed.href;
    return;
  }
  window.open(parsed.href, '_blank', 'noopener,noreferrer');
}

export function openAdvisoryWhatsApp(msg: AdvisoryMessage): void {
  openExternal(buildAdvisoryWhatsAppUrl(msg));
}

export function openAdvisoryEmail(msg: AdvisoryMessage): void {
  openExternal(buildAdvisoryEmailUrl(msg));
}
