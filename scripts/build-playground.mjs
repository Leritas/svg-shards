import { cpSync, existsSync, mkdirSync, rmSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import * as esbuild from 'esbuild';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const playgroundDir = join(root, 'playground');
const siteDir = join(root, 'site');
const coreDist = join(root, 'dist/browser.mjs');
const coreIndex = join(root, 'dist/index.js');
const coreReactive = join(root, 'dist/reactive/index.js');
const pluginSrc = join(root, 'plugins/svg-highlighter/src/index.ts');
const particlesSrc = join(root, 'plugins/particles/src/index.ts');
const entry = join(playgroundDir, 'src/main.ts');
const outFile = join(siteDir, 'assets/playground.mjs');

function requireFile(path, label) {
    if (!existsSync(path)) {
        console.error(`Missing ${label}. Run: npm run build`);
        process.exit(1);
    }
}

requireFile(coreDist, 'dist/browser.mjs');
requireFile(entry, 'playground/src/main.ts');

rmSync(siteDir, { recursive: true, force: true });
mkdirSync(join(siteDir, 'assets'), { recursive: true });

cpSync(join(playgroundDir, 'index.html'), join(siteDir, 'index.html'));
cpSync(join(playgroundDir, 'styles'), join(siteDir, 'styles'), { recursive: true });

await esbuild.build({
    entryPoints: [entry],
    outfile: outFile,
    bundle: true,
    format: 'esm',
    platform: 'browser',
    target: ['es2020'],
    sourcemap: true,
    minify: true,
    logLevel: 'info',
    alias: {
        'svg-shards/reactive': coreReactive,
        'svg-shards': coreIndex,
        '@svg-shards/highlighter': pluginSrc,
        '@svg-shards/particles': particlesSrc,
    },
});

console.log('Playground built:', siteDir);
