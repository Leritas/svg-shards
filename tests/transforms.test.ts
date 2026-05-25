import { describe, it, expect, afterEach } from 'vitest';
import { createSvgShards } from '../src/index';
import { parseSvg } from './helpers';

const FIXTURE = `
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <rect id="box" x="40" y="40" width="80" height="40"/>
</svg>`;

describe('SvgElement transforms', () => {
    let svg: SVGSVGElement;

    afterEach(() => {
        svg?.remove();
    });

    it('scale prepends scale from SVG origin', () => {
        svg = parseSvg(FIXTURE);
        const container = createSvgShards.fromElement(svg)!;
        const box = container.getById('box')!;

        box.scale(2);
        expect(box.transform).toBe('scale(2, 2)');
    });

    it('scaleAt prepends translate-scale-translate around pivot', () => {
        svg = parseSvg(FIXTURE);
        const container = createSvgShards.fromElement(svg)!;
        const box = container.getById('box')!;

        box.scaleAt(1.5, 1.5, 80, 60);
        expect(box.transform).toBe('translate(80, 60) scale(1.5, 1.5) translate(-80, -60)');
    });

    it('scaleAt stacks like other transform helpers', () => {
        svg = parseSvg(FIXTURE);
        const container = createSvgShards.fromElement(svg)!;
        const box = container.getById('box')!;

        box.scaleAt(1.2, 1.2, 80, 60);
        box.scaleAt(1.2, 1.2, 80, 60);
        expect(box.transform).toContain('translate(80, 60) scale(1.2, 1.2) translate(-80, -60)');
        expect(box.transform?.split('translate(80, 60)').length).toBe(3);
    });
});
