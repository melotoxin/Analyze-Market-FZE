// Run with: npx tsx src/data/pricing.test.ts
import { formatMoney, CURRENCIES } from './pricing';
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

console.log('pricing: all assertions passed');
