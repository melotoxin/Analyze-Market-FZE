// Run with: npx tsx api/lead.test.ts
// Covers the validation, honeypot and rate-limit branches without sending mail.
import { strict as assert } from 'node:assert';
import handler from './lead';

function mockRes() {
  const res: any = {
    statusCode: 0,
    body: null as any,
    headers: {} as Record<string, string>,
    setHeader(k: string, v: string) {
      res.headers[k] = v;
    },
    status(code: number) {
      res.statusCode = code;
      return res;
    },
    json(payload: any) {
      res.body = payload;
      return res;
    },
  };
  return res;
}

const call = async (body: any, method = 'POST', ip = '1.2.3.4') => {
  const res = mockRes();
  await handler({ method, body, headers: { 'x-forwarded-for': ip } }, res);
  return res;
};

const valid = { name: 'Alexander Vance', phone: '+971 56 339 6961', service: 'Golden Visa' };

const originalFetch = globalThis.fetch;
globalThis.fetch = async () =>
  new Response(JSON.stringify({ id: 'test-email' }), { status: 200 });

// Method guard
assert.equal((await call(valid, 'GET')).statusCode, 405);

// Validation
assert.equal((await call({ ...valid, name: 'A' }, 'POST', 'ip-a')).statusCode, 400);
assert.equal((await call({ ...valid, phone: 'call me' }, 'POST', 'ip-b')).statusCode, 400);
assert.equal((await call({ ...valid, phone: '' }, 'POST', 'ip-c')).statusCode, 400);

// Accepts the phone shapes UAE clients actually type.
for (const phone of ['+971563396961', '056 339 6961', '(056) 339-6961', '+971-56-339-6961']) {
  const r = await call({ ...valid, phone }, 'POST', 'ip-phone-' + phone);
  assert.notEqual(r.statusCode, 400, 'rejected valid phone: ' + phone);
}

// Honeypot is accepted silently and never mailed (503 would mean it reached send).
const trap = await call({ ...valid, company: 'bot corp' }, 'POST', 'ip-trap');
assert.equal(trap.statusCode, 200);
assert.deepEqual(trap.body, { ok: true });

// Without a key, a real lead is refused loudly rather than silently dropped.
delete process.env.RESEND_API_KEY;
assert.equal((await call(valid, 'POST', 'ip-nokey')).statusCode, 503);

// Rate limit: 5 per minute per IP, 6th is throttled.
const ip = 'flood-ip';
for (let i = 0; i < 5; i++) await call(valid, 'POST', ip);
assert.equal((await call(valid, 'POST', ip)).statusCode, 429);
// A different IP is unaffected.
assert.notEqual((await call(valid, 'POST', 'other-ip')).statusCode, 429);

globalThis.fetch = originalFetch;

console.log('lead api: all assertions passed');
