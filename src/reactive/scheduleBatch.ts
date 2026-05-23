import { batch } from '@preact/signals-core';

const pending: Array<() => void> = [];
let rafId: number | null = null;

export function scheduleBatch(fn: () => void): void {
    pending.push(fn);

    if (rafId !== null) {
        return;
    }

    rafId = requestAnimationFrame(() => {
        rafId = null;
        const callbacks = pending.splice(0, pending.length);

        batch(() => {
            for (const callback of callbacks) {
                callback();
            }
        });
    });
}

export function flushScheduledBatches(): void {
    if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
    }

    const callbacks = pending.splice(0, pending.length);
    batch(() => {
        for (const callback of callbacks) {
            callback();
        }
    });
}
