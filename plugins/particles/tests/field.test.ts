import { describe, it, expect, afterEach } from 'vitest';
import { createSvgShards, type GroupElement } from 'svg-shards';
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

    it('dispose removes DOM nodes and clears registry', () => {
        svg = parseSvg(FIXTURE);
        const container = createSvgShards.fromElement(svg)!;
        const group = container.getById('particles') as GroupElement;
        const field = new ParticleField(container, {
            bounds: { width: 400, height: 300 },
            parent: group,
        });

        field.spawn(5, (i) => ({ cx: i * 5, cy: 10, r: 2 }));
        field.dispose();

        expect(field.count).toBe(0);
        expect(svg.querySelectorAll('circle')).toHaveLength(0);
        expect(container.getByType('circle')).toHaveLength(0);
        expect(group.children).toHaveLength(0);
    });

    it('stop prevents further simulation steps', () => {
        svg = parseSvg(FIXTURE);
        const container = createSvgShards.fromElement(svg)!;
        const field = new ParticleField(container, {
            bounds: { width: 400, height: 300 },
            gravity: 0,
        });

        field.spawn(1, () => ({ cx: 50, cy: 50, r: 5, vx: 100, vy: 0 }));
        const shard = container.getByType('circle')[0];

        field.start();
        flushScheduledBatches();
        const cxAfterStart = shard.cx;

        field.stop();
        flushScheduledBatches();
        flushScheduledBatches();

        expect(shard.cx).toBe(cxAfterStart);
        field.dispose();
    });

    it('uses viewBox dimensions as default bounds', () => {
        svg = parseSvg(FIXTURE);
        const container = createSvgShards.fromElement(svg)!;
        const field = new ParticleField(container);

        expect(field.bounds).toEqual({ width: 400, height: 300 });
    });

    it('reuses pool shards on respawn without growing DOM', () => {
        svg = parseSvg(FIXTURE);
        const container = createSvgShards.fromElement(svg)!;
        const field = new ParticleField(container, {
            bounds: { width: 400, height: 300 },
        });

        field.spawn(20, (i) => ({ cx: i, cy: 10, r: 2 }));
        const nodes = container.getByType('circle').map((shard) => shard.htmlNode);

        field.spawn(20, (i) => ({ cx: i + 50, cy: 20, r: 3 }));
        const nodesAfter = container.getByType('circle').map((shard) => shard.htmlNode);

        expect(nodesAfter).toEqual(nodes);
        field.dispose();
    });
});
