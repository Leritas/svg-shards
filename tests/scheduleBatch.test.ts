import { describe, it, expect, vi, afterEach } from 'vitest';
import { scheduleBatch, flushScheduledBatches } from '../src/reactive/scheduleBatch';

describe('scheduleBatch', () => {
    afterEach(() => {
        flushScheduledBatches();
        vi.restoreAllMocks();
    });

    it('coalesces callbacks into a single animation frame', () => {
        vi.useFakeTimers();
        const rafSpy = vi.spyOn(globalThis, 'requestAnimationFrame');

        const first = vi.fn();
        const second = vi.fn();

        scheduleBatch(first);
        scheduleBatch(second);

        expect(rafSpy).toHaveBeenCalledTimes(1);
        expect(first).not.toHaveBeenCalled();
        expect(second).not.toHaveBeenCalled();

        vi.runAllTimers();
        expect(first).toHaveBeenCalledTimes(1);
        expect(second).toHaveBeenCalledTimes(1);

        vi.useRealTimers();
    });
});
