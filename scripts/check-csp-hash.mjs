// Validates JSON-LD in index.html and keeps CSP script-src aligned with any
// executable inline scripts. JSON-LD blocks are data, not executable script.
//
// Run: node scripts/check-csp-hash.mjs   (also runs as part of `npm run build`)

import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const html = readFileSync('index.html', 'utf8');
const vercelPath = 'vercel.json';
const vercel = readFileSync(vercelPath, 'utf8');

const ldBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
if (ldBlocks.length === 0) {
  console.error('check-csp-hash: no JSON-LD block found in index.html');
  process.exit(1);
}

for (const [i, m] of ldBlocks.entries()) {
  try {
    JSON.parse(m[1]);
  } catch (err) {
    console.error(`check-csp-hash: JSON-LD block ${i + 1} is not valid JSON — ${err.message}`);
    process.exit(1);
  }
}

const isExecutableInline = (attrs) => {
  if (/\bsrc\s*=/.test(attrs)) return false;
  const type = attrs.match(/\btype\s*=\s*["']([^"']+)["']/i)?.[1]?.toLowerCase();
  if (!type) return true;
  return type === 'text/javascript' || type === 'application/javascript';
};

const executableHashes = [
  ...html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/gi),
]
  .filter(([, attrs]) => isExecutableInline(attrs))
  .map(([, , body]) => `'sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}'`);

const cspMatch = vercel.match(
  /"key": "Content-Security-Policy"[\s\S]*?"value": "([^"]+)"/,
);
if (!cspMatch) {
  console.error('check-csp-hash: Content-Security-Policy header not found in vercel.json');
  process.exit(1);
}

const cspValue = cspMatch[1];
const scriptSrcMatch = cspValue.match(/script-src\s+([^;]+)/);
if (!scriptSrcMatch) {
  console.error('check-csp-hash: script-src directive not found in CSP');
  process.exit(1);
}

const currentSources = scriptSrcMatch[1].trim().split(/\s+/);
const nonHashSources = currentSources.filter((s) => !s.startsWith("'sha256-"));
const baseSources = nonHashSources.includes("'self'")
  ? nonHashSources
  : ["'self'", ...nonHashSources];
const mergedSources = [...new Set([...baseSources, ...executableHashes])];
const nextScriptSrc = `script-src ${mergedSources.join(' ')}`;
const nextCsp = cspValue.replace(/script-src\s+[^;]+/, nextScriptSrc);

const missingHashes = executableHashes.filter((h) => !currentSources.includes(h));
if (missingHashes.length === 0 && nextCsp === cspValue) {
  console.log(
    `check-csp-hash: OK — JSON-LD valid (${ldBlocks.length} block(s)); script-src has ${executableHashes.length} inline hash(es)`,
  );
  process.exit(0);
}

const updatedVercel = vercel.replace(cspMatch[0], cspMatch[0].replace(cspValue, nextCsp));
if (updatedVercel === vercel) {
  console.error('check-csp-hash: could not update Content-Security-Policy in vercel.json');
  process.exit(1);
}

writeFileSync(vercelPath, updatedVercel);
console.log(
  `check-csp-hash: updated script-src (${executableHashes.length} executable inline hash(es); JSON-LD not hashed)`,
);
