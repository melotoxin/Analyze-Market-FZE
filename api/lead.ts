// Vercel serverless function: receives a consultation request and emails it to the
// advisory inbox. Runs on the server so the Resend key is never shipped to the browser.

export const config = { runtime: 'nodejs' };

const TO = process.env.LEAD_TO_EMAIL || 'info@amdxb.com';
const FROM = process.env.LEAD_FROM_EMAIL || 'AM DXB Website <onboarding@resend.dev>';

type Lead = {
  name: string;
  phone: string;
  service: string;
  email?: string;
  notes?: string;
  quote?: string;
  source?: string;
  company?: string; // honeypot: real users never see or fill this
};

// ponytail: in-memory, per-instance rate limit. Enough to stop a naive flood; move to
// Upstash/KV only if the site starts seeing distributed abuse.
const hits = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // crude bound on memory
  return recent.length > MAX_PER_WINDOW;
}

const clean = (v: unknown, max: number): string =>
  typeof v === 'string' ? v.replace(/[\u0000-\u001F\u007F]/g, '').trim().slice(0, max) : '';

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!,
  );

// Deliberately permissive: UAE clients write numbers many ways. We only reject
// input that cannot be a phone number at all.
const PHONE_OK = /^[+()\d](?=.*\d)[\d\s().-]{6,24}$/;
const EMAIL_OK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const leadRef = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip =
    (req.headers['x-forwarded-for'] || '').toString().split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please try again shortly.' });
  }

  let body: Lead;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
  } catch {
    return res.status(400).json({ error: 'Invalid request body.' });
  }

  // Honeypot: silently accept so bots do not learn they were caught.
  if (clean(body.company, 100)) return res.status(200).json({ ok: true });

  const name = clean(body.name, 120);
  const phone = clean(body.phone, 32);
  const email = clean(body.email, 160);
  const service = clean(body.service, 160) || 'General enquiry';
  const notes = clean(body.notes, 2000);
  const quote = clean(body.quote, 120);
  const source = clean(body.source, 60) || 'website';

  if (name.length < 2) return res.status(400).json({ error: 'Please enter your full name.' });
  if (!PHONE_OK.test(phone))
    return res.status(400).json({ error: 'Please enter a valid phone number.' });
  if (email && !EMAIL_OK.test(email))
    return res.status(400).json({ error: 'Please enter a valid email address.' });

  const rows: [string, string][] = [
    ['Name', name],
    ['Phone / WhatsApp', phone],
    ...(email ? [['Email', email] as [string, string]] : []),
    ['Service', service],
    ['Estimate', quote || '—'],
    ['Source', source],
    ['Received', new Date().toISOString()],
  ];

  const html = `
    <h2 style="font-family:sans-serif">New consultation request — amdxb.com</h2>
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:6px 14px 6px 0;color:#64748b">${k}</td>
             <td style="padding:6px 0;font-weight:600">${escapeHtml(v)}</td></tr>`,
        )
        .join('')}
    </table>
    ${notes ? `<p style="font-family:sans-serif"><b>Notes</b><br>${escapeHtml(notes).replace(/\n/g, '<br>')}</p>` : ''}
  `;

  const ref = leadRef();
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    // Log a correlation id only — never PII in function logs.
    console.error('LEAD_UNSENT_NO_API_KEY', { ref, source });
    return res.status(503).json({ error: 'Email service is not configured.' });
  }

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: email || TO,
        subject: `New lead: ${name} — ${service}`,
        html,
      }),
    });
    if (!r.ok) {
      const detail = await r.text();
      console.error('LEAD_SEND_FAILED', { ref, status: r.status, detail: detail.slice(0, 200) });
      return res.status(502).json({ error: 'Could not send your request.' });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'unknown';
    console.error('LEAD_SEND_ERROR', { ref, message });
    return res.status(502).json({ error: 'Could not send your request.' });
  }

  return res.status(200).json({ ok: true });
}
