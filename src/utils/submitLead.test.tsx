import { describe, it, expect } from 'vitest';
import { buildAdvisoryEmailUrl, buildAdvisoryWhatsAppUrl } from './submitLead';

const msg = {
  name: 'Alexander Vance',
  phone: '+971 56 339 6961',
  service: 'Free Zone Companies',
};

describe('buildAdvisoryEmailUrl', () => {
  // URLSearchParams form-encodes, so every space became a literal "+" in the
  // mail client's draft. The body must be percent-encoded instead.
  it('percent-encodes the body rather than form-encoding it', () => {
    const url = buildAdvisoryEmailUrl(msg);
    const body = decodeURIComponent(new URL(url).searchParams.get('body') ?? '');
    expect(url).not.toContain('+');
    expect(body).toContain('Service: Free Zone Companies');
    expect(body).toContain('Name: Alexander Vance');
  });

  it('keeps the line breaks that separate the fields', () => {
    const body = decodeURIComponent(new URL(buildAdvisoryEmailUrl(msg)).searchParams.get('body') ?? '');
    expect(body.split('\n').length).toBeGreaterThan(5);
  });
});

describe('buildAdvisoryWhatsAppUrl', () => {
  it('encodes the whole message into the text parameter', () => {
    const url = new URL(buildAdvisoryWhatsAppUrl(msg));
    expect(url.origin + url.pathname).toBe('https://wa.me/971563396961');
    expect(url.searchParams.get('text')).toContain('Phone / WhatsApp: +971 56 339 6961');
  });
});
