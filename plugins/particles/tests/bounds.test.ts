import { describe, it, expect } from 'vitest';
import { resolveWallBounce } from '../src/physics/bounds';

const bounds = { width: 100, height: 80 };

describe('resolveWallBounce', () => {
    it('reflects off left wall', () => {
        const result = resolveWallBounce({ cx: 3, cy: 40, vx: -50, vy: 0, r: 5 }, bounds, 0.9);

        expect(result.cx).toBe(5);
        expect(result.vx).toBe(45);
        expect(result.vy).toBe(0);
    });

    it('reflects off right wall', () => {
        const result = resolveWallBounce({ cx: 98, cy: 40, vx: 50, vy: 0, r: 5 }, bounds, 0.8);

        expect(result.cx).toBe(95);
        expect(result.vx).toBe(-40);
    });

    it('reflects off top wall', () => {
        const result = resolveWallBounce({ cx: 50, cy: 2, vx: 0, vy: -30, r: 5 }, bounds, 1);

        expect(result.cy).toBe(5);
        expect(result.vy).toBe(30);
    });

    it('reflects off bottom wall', () => {
        const result = resolveWallBounce({ cx: 50, cy: 78, vx: 0, vy: 40, r: 5 }, bounds, 0.5);

        expect(result.cy).toBe(75);
        expect(result.vy).toBe(-20);
    });

    it('leaves particle unchanged inside bounds', () => {
        const state = { cx: 50, cy: 40, vx: 10, vy: -5, r: 5 };
        expect(resolveWallBounce(state, bounds, 0.9)).toEqual(state);
    });
});
