// Run with: npx tsx src/data/pricing.test.ts
import { formatMoney, calculateSetupAed, CURRENCIES } from './pricing';
import { strict as assert } from 'node:assert';

// Every offered currency must render its own symbol. The old code fell through to
// "AED 11,500" when GBP was picked, mislabelling the price.
for (const c of CURRENCIES) {
  const out = formatMoney(11500, c);
  if (c === 'AED') assert.equal(out, 'AED 11,500');
  else assert.ok(!out.includes('AED'), `${c} fell back to AED: ${out}`);
}
assert.equal(formatMoney(11500, 'GBP'), '£2,473');
assert.equal(formatMoney(11500, 'ZZZ'), 'AED 11,500'); // unknown -> safe default

// Activity must affect the total (it previously did not).
const base = { jurisdiction: 'freezone', workspace: 'flexi', visaCount: 2 } as const;
assert.equal(calculateSetupAed({ ...base, activity: 'tech' }), 11500 + 7200);
assert.notEqual(
  calculateSetupAed({ ...base, activity: 'trading' }),
  calculateSetupAed({ ...base, activity: 'tech' }),
);

// Visa count is clamped regardless of caller.
assert.equal(
  calculateSetupAed({ ...base, activity: 'tech', visaCount: 999 }),
  calculateSetupAed({ ...base, activity: 'tech', visaCount: 8 }),
);
assert.equal(
  calculateSetupAed({ ...base, activity: 'tech', visaCount: -5 }),
  calculateSetupAed({ ...base, activity: 'tech', visaCount: 0 }),
);

console.log('pricing: all assertions passed');
