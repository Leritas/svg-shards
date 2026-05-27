import { describe, it, expect, afterEach } from 'vitest';
import { createSvgShards } from 'svg-shards';
import { spawnCircleParticles } from '../src/spawn/circles';
import { ParticleState } from '../src/state/ParticleState';
import { parseSvg } from '../../../tests/helpers';

const FIXTURE = `
<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
  <g id="particles"></g>
</svg>`;

describe('spawnCircleParticles', () => {
    let svg: SVGSVGElement;

    afterEach(() => {
        svg?.remove();
    });

    it('calls init once per particle so DOM and SoA stay in sync', () => {
        svg = parseSvg(FIXTURE);
        const container = createSvgShards.fromElement(svg)!;
        const state = new ParticleState();
        let initCalls = 0;
        const randomByIndex = [0.11, 0.22, 0.33];

        spawnCircleParticles(container, state, 3, (i) => {
            initCalls++;
            return { cx: i * 100 + randomByIndex[i], cy: 50, r: 5, vx: 1, vy: 2 };
        });

        expect(initCalls).toBe(3);
        for (let i = 0; i < 3; i++) {
            expect(state.cx[i]).toBeCloseTo(i * 100 + randomByIndex[i]);
            expect(state.cy[i]).toBe(50);
            expect(state.vx[i]).toBe(1);
            expect(state.vy[i]).toBe(2);
        }
    });
});
