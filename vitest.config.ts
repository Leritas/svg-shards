import { defineConfig } from 'vitest/config';

export default defineConfig({
    resolve: {
        dedupe: ['@preact/signals-core'],
    },
    test: {
        environment: 'jsdom',
        include: ['tests/**/*.test.ts', 'plugins/**/tests/**/*.test.ts'],
    },
});
