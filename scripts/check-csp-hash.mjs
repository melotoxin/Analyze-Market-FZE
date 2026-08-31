// Verifies that the CSP in vercel.json still whitelists the exact inline JSON-LD
// block in index.html. Structured data is how the business shows up as a rich
// result, and a silent CSP block would remove it without any visible symptom.
//
// Run: node scripts/check-csp-hash.mjs   (also runs as part of `npm run build`)

import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const html = readFileSync('index.html', 'utf8');
const vercelPath = 'vercel.json';
const vercel = readFileSync(vercelPath, 'utf8');

const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
if (blocks.length === 0) {
  console.error('check-csp-hash: no JSON-LD block found in index.html');
  process.exit(1);
}

const hashes = blocks.map(
  (m) => "'sha256-" + createHash('sha256').update(m[1], 'utf8').digest('base64') + "'",
);

// Each JSON-LD block must also be valid JSON, or the rich result is dropped anyway.
for (const [i, m] of blocks.entries()) {
  try {
    JSON.parse(m[1]);
  } catch (err) {
    console.error(`check-csp-hash: JSON-LD block ${i + 1} is not valid JSON — ${err.message}`);
    process.exit(1);
  }
}

const missing = hashes.filter((h) => !vercel.includes(h));
if (missing.length === 0) {
  console.log('check-csp-hash: OK — CSP allows all ' + hashes.length + ' JSON-LD block(s)');
  process.exit(0);
}

// Self-healing: rewrite script-src with the current hashes rather than just failing,
// so editing the structured data never silently breaks it.
const updated = vercel.replace(
  /"value": "default-src 'self'; script-src [^"]*?; style-src/,
  `"value": "default-src 'self'; script-src 'self' ${hashes.join(' ')}; style-src`,
);

if (updated === vercel) {
  console.error('check-csp-hash: could not locate script-src in vercel.json to update.');
  console.error('Add these hashes manually: ' + hashes.join(' '));
  process.exit(1);
}

writeFileSync(vercelPath, updated);
console.log('check-csp-hash: updated vercel.json script-src with ' + hashes.length + ' hash(es)');
