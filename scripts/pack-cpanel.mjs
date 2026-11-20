#!/usr/bin/env node
/**
 * Builds the site and assembles everything that belongs in cPanel's public_html.
 *
 *   npm run pack:cpanel
 *
 * Output: deploy/dist-cpanel/ (upload its CONTENTS, not the folder itself) and
 * amdxb-cpanel.zip, which cPanel's File Manager can extract in place.
 *
 * The zip deliberately excludes api/config.php — the Resend key is uploaded by
 * hand, once, and never travels through a build artifact or git.
 */
import { execSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, rmSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const OUT = 'deploy/dist-cpanel';
const ZIP = 'amdxb-cpanel.zip';

const run = (label, cmd) => {
  process.stdout.write(`\n▸ ${label}\n`);
  execSync(cmd, { stdio: 'inherit' });
};

run('Build', 'npm run build');

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

// 1. the built site
cpSync('dist', OUT, { recursive: true });
// 2. the PHP endpoint and the Apache config that replace vercel.json
cpSync('deploy/cpanel', OUT, { recursive: true });

if (existsSync(join(OUT, 'api/config.php'))) {
  rmSync(join(OUT, 'api/config.php'));
  console.log('  (left your local api/config.php out of the package)');
}

rmSync(ZIP, { force: true });
run(
  'Zip',
  `powershell -NoProfile -Command "Compress-Archive -Path '${OUT}/*' -DestinationPath '${ZIP}' -Force"`,
);

const walk = (dir) =>
  readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });

const files = walk(OUT);
const bytes = files.reduce((sum, f) => sum + statSync(f).size, 0);

console.log(`\n✓ ${files.length} files, ${(bytes / 1024 / 1024).toFixed(1)} MB`);
console.log(`  folder: ${OUT}`);
console.log(`  zip:    ${ZIP}`);
console.log('\nNext: upload the zip into public_html, Extract, then add api/config.php');
console.log('with your Resend key (see deploy/cpanel/api/config.sample.php).\n');
