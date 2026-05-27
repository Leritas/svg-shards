import { describe, it, expect, afterEach } from 'vitest';
import { createSvgShards } from 'svg-shards';
import { ParticlePool } from '../src/pool/ParticlePool';
import { parseSvg } from '../../../tests/helpers';

const FIXTURE = `
<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
  <g id="particles"></g>
</svg>`;

describe('ParticlePool', () => {
    let svg: SVGSVGElement;

    afterEach(() => {
        svg?.remove();
    });

    it('reuses DOM nodes when acquiring the same count again', () => {
        svg = parseSvg(FIXTURE);
        const container = createSvgShards.fromElement(svg)!;
        const pool = new ParticlePool(container);

        const first = pool.acquire(10, (i) => ({ cx: i, cy: 10, r: 3 }));
        const nodes = first.map((shard) => shard.htmlNode);

        pool.acquire(10, (i) => ({ cx: i + 100, cy: 20, r: 4 }));

        expect(container.getByType('circle')).toHaveLength(10);
        expect(first.map((shard) => shard.htmlNode)).toEqual(nodes);
        pool.reset();
    });

    it('hides excess shards when acquiring fewer than capacity', () => {
        svg = parseSvg(FIXTURE);
        const container = createSvgShards.fromElement(svg)!;
        const pool = new ParticlePool(container);

        pool.acquire(10, (i) => ({ cx: i, cy: 10, r: 3 }));
        const active = pool.acquire(4, (i) => ({ cx: i, cy: 10, r: 3 }));

        expect(active).toHaveLength(4);
        expect(container.getByType('circle')).toHaveLength(10);
        expect(active.every((shard) => shard.opacity > 0)).toBe(true);
        pool.reset();
    });

    it('throws when count exceeds maxSize', () => {
        svg = parseSvg(FIXTURE);
        const container = createSvgShards.fromElement(svg)!;
        const pool = new ParticlePool(container, { maxSize: 5 });

        expect(() => pool.acquire(6, () => ({ cx: 0, cy: 0, r: 2 }))).toThrow(RangeError);
    });
});
