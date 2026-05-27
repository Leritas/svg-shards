import { describe, it, expect } from 'vitest';
import { createSvgShards } from 'svg-shards';
import { integrateParticle, stepParticles } from '../src/physics/integrator';
import { ParticleState } from '../src/state/ParticleState';
import { parseSvg } from '../../../tests/helpers';

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

describe('stepParticles', () => {
    it('integrates, bounces, and writes positions to shards', () => {
        const svg = parseSvg(`
<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg"></svg>`);
        const container = createSvgShards.fromElement(svg)!;
        const shard = container.createCircle({ cx: 10, cy: 10, r: 5, fill: '#f00' });
        const state = new ParticleState();

        state.reset(1);
        state.shards = [shard];
        state.cx[0] = 10;
        state.cy[0] = 10;
        state.vx[0] = 200;
        state.vy[0] = 0;
        state.r[0] = 5;

        stepParticles(state, { width: 200, height: 100 }, { gravity: 0, dt: 0.1, restitution: 1 });

        expect(shard.cx).toBe(state.cx[0]);
        expect(shard.cy).toBe(state.cy[0]);
        expect(state.cx[0]).toBeGreaterThan(10);
        svg.remove();
    });
});
