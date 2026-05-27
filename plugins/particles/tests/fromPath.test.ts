import { describe, it, expect, afterEach } from 'vitest';
import { createSvgShards } from 'svg-shards';
import { spawnFromPath } from '../src/spawn/fromPath';
import { parseSvg } from '../../../tests/helpers';

const FIXTURE = `
<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
  <g id="particles"></g>
</svg>`;

const TEMPLATE = 'M 0 0 L 0 -8 M 0 0 L 6 3';

describe('spawnFromPath', () => {
    let svg: SVGSVGElement;

    afterEach(() => {
        svg?.remove();
    });

    it('creates path shards from a template d string', () => {
        svg = parseSvg(FIXTURE);
        const container = createSvgShards.fromElement(svg)!;

        const shards = spawnFromPath(container, TEMPLATE, 3, (i) => ({
            fill: '#fff',
            opacity: 0.5 + i * 0.1,
        }));

        expect(shards).toHaveLength(3);
        expect(container.getByType('path')).toHaveLength(3);
        expect(shards.every((shard) => shard.d === TEMPLATE)).toBe(true);
        expect(shards[1].opacity).toBeCloseTo(0.6);
    });

    it('allows per-shard d override via init', () => {
        svg = parseSvg(FIXTURE);
        const container = createSvgShards.fromElement(svg)!;

        const shards = spawnFromPath(container, TEMPLATE, 2, (i) => ({
            d: `M 0 0 L ${i} 0`,
        }));

        expect(shards[0].d).toBe('M 0 0 L 0 0');
        expect(shards[1].d).toBe('M 0 0 L 1 0');
    });
});
