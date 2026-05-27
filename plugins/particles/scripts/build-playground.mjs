import { cpSync, existsSync, mkdirSync, rmSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import * as esbuild from 'esbuild';

const pluginRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const root = join(pluginRoot, '../..');
const playgroundDir = join(pluginRoot, 'playground');
const siteDir = join(pluginRoot, 'site');
const coreDist = join(root, 'dist/index.js');
const coreReactiveDist = join(root, 'dist/reactive/index.js');
const entry = join(playgroundDir, 'src/main.ts');
const outFile = join(siteDir, 'assets/playground.mjs');
const coreStylesDir = join(root, 'playground/styles');

function requireFile(path, label) {
    if (!existsSync(path)) {
        console.error(`Missing ${label}. Run: npm run build from repo root`);
        process.exit(1);
    }
}

requireFile(coreDist, 'dist/index.js (svg-shards)');
requireFile(entry, 'playground/src/main.ts');

rmSync(siteDir, { recursive: true, force: true });
mkdirSync(join(siteDir, 'assets'), { recursive: true });
mkdirSync(join(siteDir, 'styles'), { recursive: true });

cpSync(join(playgroundDir, 'index.html'), join(siteDir, 'index.html'));
cpSync(join(coreStylesDir, 'tokens.css'), join(siteDir, 'styles/tokens.css'));
cpSync(join(coreStylesDir, 'layout.css'), join(siteDir, 'styles/layout.css'));
cpSync(join(coreStylesDir, 'components.css'), join(siteDir, 'styles/components.css'));
cpSync(join(playgroundDir, 'styles/plugin.css'), join(siteDir, 'styles/plugin.css'));

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
        'svg-shards/reactive': coreReactiveDist,
        'svg-shards': coreDist,
        '@svg-shards/particles': join(pluginRoot, 'src/index.ts'),
    },
});

console.log('Particles playground built:', siteDir);
