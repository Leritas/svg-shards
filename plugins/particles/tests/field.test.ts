import { describe, it, expect, afterEach } from 'vitest';
import { createSvgShards } from 'svg-shards';
import { flushScheduledBatches } from 'svg-shards/reactive';
import { ParticleField } from '../src/ParticleField';
import { parseSvg } from '../../../tests/helpers';

const FIXTURE = `
<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="400" height="300" fill="none" stroke="#ccc"/>
  <g id="particles"></g>
</svg>`;

describe('ParticleField', () => {
    let svg: SVGSVGElement;

    afterEach(() => {
        svg?.remove();
    });

    it('spawn creates shards and SoA state', () => {
        svg = parseSvg(FIXTURE);
        const container = createSvgShards.fromElement(svg)!;
        const field = new ParticleField(container, {
            bounds: { width: 400, height: 300 },
        });

        field.spawn(25, (i) => ({
            cx: i * 10,
            cy: 20,
            r: 4,
            vx: 10,
            vy: 0,
            fill: '#f00',
        }));

        expect(field.count).toBe(25);
        expect(container.getByType('circle').length).toBe(25);
    });

    it('simulation updates positions after flushScheduledBatches', () => {
        svg = parseSvg(FIXTURE);
        const container = createSvgShards.fromElement(svg)!;
        const field = new ParticleField(container, {
            bounds: { width: 400, height: 300 },
            gravity: 0,
            restitution: 1,
        });

        field.spawn(1, () => ({
            cx: 50,
            cy: 50,
            r: 5,
            vx: 100,
            vy: 0,
        }));

        const shard = container.getByType('circle')[0];
        const cxBefore = shard.cx;

        field.start();
        flushScheduledBatches();

        expect(shard.cx).not.toBe(cxBefore);
        field.dispose();
    });

    it('dispose removes DOM nodes', () => {
        svg = parseSvg(FIXTURE);
        const container = createSvgShards.fromElement(svg)!;
        const field = new ParticleField(container, {
            bounds: { width: 400, height: 300 },
        });

        field.spawn(5, (i) => ({ cx: i * 5, cy: 10, r: 2 }));
        field.dispose();

        expect(field.count).toBe(0);
        expect(svg.querySelectorAll('circle')).toHaveLength(0);
    });
});
