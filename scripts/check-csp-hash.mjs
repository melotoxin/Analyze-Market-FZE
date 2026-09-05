// Validates the JSON-LD in index.html and keeps CSP script-src aligned with any
// executable inline scripts. JSON-LD blocks are data, not executable script, so
// CSP does not gate them (verified by serving dist behind the production headers).
//
// Run: node scripts/check-csp-hash.mjs   (also runs as part of `npm run build`)
//
// This runs inside the production build, so it must never fail the build for a
// reason that is not a real problem with the source. It parses vercel.json as
// JSON rather than with a regex, and treats a missing/unreadable vercel.json as a
// warning: Vercel applies those headers from the same file itself, and a
// deployment failing here would take the whole site down over a lint-grade check.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';

const VERCEL_PATH = 'vercel.json';

// --- 1. JSON-LD must be present and valid, or rich results silently vanish ----
const html = readFileSync('index.html', 'utf8');

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

// --- 2. Hash any genuinely executable inline script ---------------------------
const isExecutableInline = (attrs) => {
  if (/\bsrc\s*=/.test(attrs)) return false;
  const type = attrs.match(/\btype\s*=\s*["']([^"']+)["']/i)?.[1]?.toLowerCase();
  if (!type) return true;
  return type === 'text/javascript' || type === 'application/javascript';
};

const executableHashes = [...html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/gi)]
  .filter(([, attrs]) => isExecutableInline(attrs))
  .map(([, , body]) => `'sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}'`);

const ok = (msg) => {
  console.log(`check-csp-hash: ${msg}`);
  process.exit(0);
};

// --- 3. Sync script-src, without ever breaking the deploy ---------------------
if (!existsSync(VERCEL_PATH)) {
  ok(`JSON-LD valid (${ldBlocks.length} block(s)); no ${VERCEL_PATH} present, skipping CSP sync`);
}

let config;
let raw;
try {
  raw = readFileSync(VERCEL_PATH, 'utf8');
  config = JSON.parse(raw);
} catch (err) {
  console.warn(`check-csp-hash: WARNING — could not parse ${VERCEL_PATH} (${err.message})`);
  ok(`JSON-LD valid (${ldBlocks.length} block(s)); CSP sync skipped`);
}

// Find the CSP header wherever it lives in the headers array.
let cspHeader;
for (const rule of config.headers ?? []) {
  for (const header of rule.headers ?? []) {
    if (header.key?.toLowerCase() === 'content-security-policy') cspHeader = header;
  }
}

if (!cspHeader) {
  console.warn(`check-csp-hash: WARNING — no Content-Security-Policy header in ${VERCEL_PATH}`);
  ok(`JSON-LD valid (${ldBlocks.length} block(s)); nothing to sync`);
}

const cspValue = cspHeader.value ?? '';
const scriptSrcMatch = cspValue.match(/script-src\s+([^;]+)/);
if (!scriptSrcMatch) {
  console.warn('check-csp-hash: WARNING — CSP has no script-src directive');
  ok(`JSON-LD valid (${ldBlocks.length} block(s)); nothing to sync`);
}

const currentSources = scriptSrcMatch[1].trim().split(/\s+/);
const missingHashes = executableHashes.filter((h) => !currentSources.includes(h));

if (missingHashes.length === 0) {
  ok(
    `OK — JSON-LD valid (${ldBlocks.length} block(s)); ` +
      `script-src covers ${executableHashes.length} executable inline script(s)`,
  );
}

// Self-healing: add the hashes so editing an inline script cannot silently break it.
const nonHashSources = currentSources.filter((s) => !s.startsWith("'sha256-"));
const baseSources = nonHashSources.includes("'self'")
  ? nonHashSources
  : ["'self'", ...nonHashSources];
const merged = [...new Set([...baseSources, ...executableHashes])];

cspHeader.value = cspValue.replace(/script-src\s+[^;]+/, `script-src ${merged.join(' ')}`);

// Preserve the file's existing indentation and trailing newline.
const indent = raw.match(/\n(\s+)"/)?.[1]?.length ?? 2;
writeFileSync(VERCEL_PATH, JSON.stringify(config, null, indent) + '\n');

console.log(
  `check-csp-hash: updated script-src with ${missingHashes.length} hash(es) ` +
    '— commit the vercel.json change.',
);
