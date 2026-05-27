import { defineConfig } from 'vitest/config';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    resolve: {
        alias: {
            'svg-shards/reactive': join(root, 'src/reactive/index.ts'),
            'svg-shards': join(root, 'src/index.ts'),
        },
        dedupe: ['@preact/signals-core'],
    },
    test: {
        environment: 'jsdom',
        include: ['tests/**/*.test.ts', 'plugins/**/tests/**/*.test.ts'],
    },
});
