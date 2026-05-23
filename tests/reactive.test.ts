import { describe, it, expect, afterEach, vi } from 'vitest';
import { signal } from '@preact/signals-core';
import { createSvgShards } from '../src/index';
import { bindProperty, bindTransform, bindVisual } from '../src/reactive';
import { Transformation } from '../src/core/Transformation';
import { parseSvg } from './helpers';

const FIXTURE = `
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <circle id="dot" cx="50" cy="50" r="15" fill="#000"/>
</svg>`;

describe('reactive bindings', () => {
    let svg: SVGSVGElement;

    afterEach(() => {
        svg?.remove();
    });

    it('bindProperty updates only the target attribute', () => {
        svg = parseSvg(FIXTURE);
        const container = createSvgShards.fromElement(svg)!;
        const dot = container.getById('dot')!;
        const node = dot.htmlNode;

        const setAttributeSpy = vi.spyOn(node, 'setAttribute');
        const cx = signal(50);

        const unbind = bindProperty(dot, 'cx', cx);
        setAttributeSpy.mockClear();

        cx.value = 80;

        expect(setAttributeSpy).toHaveBeenCalledWith('cx', '80');
        expect(dot.cx).toBe(80);

        unbind();
    });

    it('bindTransform applies matrix string to shard', () => {
        svg = parseSvg(FIXTURE);
        const container = createSvgShards.fromElement(svg)!;
        const dot = container.getById('dot')!;

        const matrix = signal(Transformation.identity().translate(10, 20));
        const unbind = bindTransform(dot, matrix);

        expect(dot.transform).toBe('matrix(1 0 0 1 10 20)');

        matrix.value = Transformation.identity().rotate(90, 50, 50);
        expect(dot.transform).toContain('matrix(');

        unbind();
    });

    it('bindVisual updates style properties from signals', () => {
        svg = parseSvg(FIXTURE);
        const container = createSvgShards.fromElement(svg)!;
        const dot = container.getById('dot')!;

        const fill = signal('#f00');
        const unbind = bindVisual(dot, { fill });

        expect(dot.fill).toBe('#f00');

        fill.value = '#0f0';
        expect(dot.fill).toBe('#0f0');

        unbind();
    });
});
