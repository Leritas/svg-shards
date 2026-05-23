import { build } from 'esbuild';
import { mkdir } from 'node:fs/promises';

await mkdir('dist', { recursive: true });

await build({
    entryPoints: ['src/browser.ts'],
    outfile: 'dist/browser.mjs',
    bundle: true,
    format: 'esm',
    platform: 'browser',
    target: ['es2020'],
    sourcemap: true,
    minify: true,
});

console.log('Built dist/browser.mjs');
