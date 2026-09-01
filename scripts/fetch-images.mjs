#!/usr/bin/env node
/**
 * One-off: pull every remote Unsplash image referenced in src/ and index.html into
 * public/img/, convert to WebP, and print the source -> local mapping.
 *
 * Run again only when new remote images are introduced:  node scripts/fetch-images.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const OUT = 'public/img';
mkdirSync(OUT, { recursive: true });

const files = [];
const walk = (dir) => {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name === 'dist') continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(tsx?|html)$/.test(e.name)) files.push(p);
  }
};
walk('src');
files.push('index.html');

const urls = new Set();
for (const f of files) {
  for (const m of readFileSync(f, 'utf8').matchAll(/https:\/\/images\.unsplash\.com\/[^'")\s]+/g)) {
    urls.add(m[0].replace(/&amp;/g, '&'));
  }
}

console.log(`Found ${urls.size} unique remote images.`);
const mapping = {};

for (const url of [...urls].sort()) {
  // photo-1512453979798-5ea266f8880c?...w=800  ->  photo-1512453979798-w800.webp
  const id = url.match(/photo-([\w-]+)/)?.[1] ?? 'img';
  const width = Number(url.match(/[?&]w=(\d+)/)?.[1] ?? 1200);
  const name = `${id.slice(0, 20)}-w${width}.webp`;
  const dest = join(OUT, name);
  const publicPath = `/img/${name}`;
  mapping[url] = publicPath;

  if (existsSync(dest)) {
    console.log(`  skip (exists) ${name}`);
    continue;
  }

  const res = await fetch(url);
  if (!res.ok) {
    console.error(`  FAILED ${res.status} ${url}`);
    process.exitCode = 1;
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  const img = sharp(buf).resize({ width, withoutEnlargement: true });
  const out = await img.webp({ quality: 78 }).toBuffer();
  writeFileSync(dest, out);
  const meta = await sharp(out).metadata();
  console.log(
    `  ${name}  ${meta.width}x${meta.height}  ${Math.round(out.length / 1024)}KB` +
      `  (from ${Math.round(buf.length / 1024)}KB)`,
  );
}

writeFileSync('scripts/image-map.json', JSON.stringify(mapping, null, 2));
console.log(`\nWrote scripts/image-map.json with ${Object.keys(mapping).length} entries.`);
