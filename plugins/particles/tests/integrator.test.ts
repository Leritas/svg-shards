import { describe, it, expect } from 'vitest';
import { integrateParticle } from '../src/physics/integrator';

describe('integrateParticle', () => {
    it('applies gravity and velocity over dt', () => {
        const result = integrateParticle(10, 20, 5, -2, 980, 0.016);

        expect(result.vx).toBe(5);
        expect(result.vy).toBeCloseTo(-2 + 980 * 0.016);
        expect(result.cx).toBeCloseTo(10 + 5 * 0.016);
        expect(result.cy).toBeCloseTo(20 + result.vy * 0.016);
    });

    it('moves with zero gravity', () => {
        const result = integrateParticle(0, 0, 100, 50, 0, 0.1);

        expect(result.cx).toBe(10);
        expect(result.cy).toBe(5);
        expect(result.vx).toBe(100);
        expect(result.vy).toBe(50);
    });
});
