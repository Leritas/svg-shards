import { existsSync, mkdirSync, rmSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import * as esbuild from 'esbuild';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const demoDir = join(root, 'plugins/svg-highlighter/demo');
const vendorDir = join(demoDir, 'vendor');
const coreDist = join(root, 'dist/index.js');
const pluginDist = join(root, 'plugins/svg-highlighter/dist/index.js');
const bundleOut = join(vendorDir, 'highlighter.bundle.js');

function requireFile(path, label) {
  if (!existsSync(path)) {
    console.error(`Missing ${label}. Run: npm run build:all`);
    process.exit(1);
  }
}

requireFile(coreDist, 'dist/index.js (svg-shards)');
requireFile(pluginDist, 'plugins/svg-highlighter/dist/index.js');

rmSync(vendorDir, { recursive: true, force: true });
mkdirSync(vendorDir, { recursive: true });

await esbuild.build({
  entryPoints: [pluginDist],
  bundle: true,
  outfile: bundleOut,
  format: 'esm',
  platform: 'browser',
  alias: {
    'svg-shards': coreDist,
  },
  logLevel: 'info',
});

console.log('Demo bundle prepared:', bundleOut);
