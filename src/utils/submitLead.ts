export interface LeadPayload {
  name: string;
  phone: string;
  service: string;
  notes?: string;
  quote?: string;
  source?: string;
  company?: string; // honeypot
}

/** POSTs a lead to /api/lead. Throws with a user-safe message on failure. */
export async function submitLead(payload: LeadPayload): Promise<void> {
  let res: Response;
  try {
    res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error('Network error. Please check your connection or call us directly.');
  }

  if (!res.ok) {
    const message = await res
      .json()
      .then((d) => (d && typeof d.error === 'string' ? d.error : ''))
      .catch(() => '');
    throw new Error(message || 'Could not send your request. Please call us directly.');
  }
}

export const WHATSAPP_URL = 'https://wa.me/971563396961';

/** window.open without noopener leaves the new tab able to reach back via opener. */
export function openExternal(url: string): void {
  window.open(url, '_blank', 'noopener,noreferrer');
}
