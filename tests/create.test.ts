import { describe, it, expect, afterEach } from 'vitest';
import { createSvgShards } from '../src/index';
import type { GroupElement } from '../src/elements/GroupElement';
import { formatPoints } from '../src/create';
import { parseSvg } from './helpers';

const FIXTURE = `
<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <circle id="existing" cx="10" cy="10" r="5"/>
  <g id="group1"></g>
</svg>`;

describe('SvgContainer create API', () => {
    let svg: SVGSVGElement;

    afterEach(() => {
        svg?.remove();
    });

    it('createCircle adds DOM node, attrs, and registers in elements map', () => {
        svg = parseSvg(FIXTURE);
        const container = createSvgShards.fromElement(svg)!;
        const before = container.getByType('circle').length;

        const dot = container.createCircle({ cx: 50, cy: 60, r: 12, fill: '#f00', id: 'new-dot' });

        expect(dot.cx).toBe(50);
        expect(dot.cy).toBe(60);
        expect(dot.r).toBe(12);
        expect(dot.fill).toBe('#f00');
        expect(dot.id).toBe('new-dot');
        expect(container.getByType('circle').length).toBe(before + 1);
        expect(container.getById('new-dot')).toBe(dot);
    });

    it('createRect, createEllipse, createLine, createPolygon, createPolyline, createPath', () => {
        svg = parseSvg(FIXTURE);
        const container = createSvgShards.fromElement(svg)!;

        const rect = container.createRect({ x: 1, y: 2, width: 10, height: 8, rx: 2 });
        const ellipse = container.createEllipse({ cx: 20, cy: 20, rx: 5, ry: 3 });
        const line = container.createLine({ x1: 0, y1: 0, x2: 10, y2: 10 });
        const polygon = container.createPolygon({ points: '0,0 10,0 5,10' });
        const polyline = container.createPolyline({
            points: [
                { x: 0, y: 0 },
                { x: 5, y: 5 },
            ],
        });
        const path = container.createPath({ d: 'M0 0 L10 10' });

        expect(rect.width).toBe(10);
        expect(ellipse.rx).toBe(5);
        expect(line.x2).toBe(10);
        expect(polygon.points).toBe('0,0 10,0 5,10');
        expect(polyline.points).toBe('0,0 5,5');
        expect(path.d).toBe('M0 0 L10 10');
        expect(container.getByType('rect')).toContain(rect);
        expect(container.getByType('ellipse')).toContain(ellipse);
        expect(container.getByType('line')).toContain(line);
        expect(container.getByType('polygon')).toContain(polygon);
        expect(container.getByType('polyline')).toContain(polyline);
        expect(container.getByType('path')).toContain(path);
    });

    it('createMany batch-registers 500 circles without refresh()', () => {
        svg = parseSvg(FIXTURE);
        const container = createSvgShards.fromElement(svg)!;
        const before = container.getByType('circle').length;

        const circles = container.createMany('circle', 500, (i) => ({
            cx: i,
            cy: i * 2,
            r: 3,
        }));

        expect(circles).toHaveLength(500);
        expect(container.getByType('circle').length).toBe(before + 500);
        expect(circles[0].cx).toBe(0);
        expect(circles[499].cx).toBe(499);

        const node = circles[250].htmlNode;
        expect(container.registry.get(node)).toBe(circles[250]);
    });

    it('registerNode returns stable identity for the same DOM node', () => {
        svg = parseSvg(FIXTURE);
        const container = createSvgShards.fromElement(svg)!;
        const dot = container.createCircle({ cx: 1, cy: 1, r: 1 });

        expect(container.registerNode(dot.htmlNode)).toBe(dot);
    });

    it('createCircle with parent group adopts child in group.children', () => {
        svg = parseSvg(FIXTURE);
        const container = createSvgShards.fromElement(svg)!;
        const group = container.getById('group1') as GroupElement;

        const dot = container.createCircle({
            parent: group,
            cx: 30,
            cy: 40,
            r: 6,
        });

        expect(group.children).toContain(dot);
        expect(group.htmlNode.contains(dot.htmlNode)).toBe(true);
    });

    it('createMany with parent group adopts all children', () => {
        svg = parseSvg(FIXTURE);
        const container = createSvgShards.fromElement(svg)!;
        const group = container.getById('group1') as GroupElement;

        const circles = container.createMany(
            'circle',
            10,
            (i) => ({
                parent: group,
                cx: i * 5,
                cy: 10,
                r: 2,
            }),
            // parent from first factory call drives batch parent
        );

        expect(group.children).toHaveLength(10);
        expect(circles.every((c) => group.children.includes(c))).toBe(true);
    });

    it('formatPoints accepts string, number array, and Point array', () => {
        expect(formatPoints('1,2 3,4')).toBe('1,2 3,4');
        expect(formatPoints([1, 2, 3, 4])).toBe('1 2 3 4');
        expect(
            formatPoints([
                { x: 1, y: 2 },
                { x: 3, y: 4 },
            ]),
        ).toBe('1,2 3,4');
    });
});

describe('SvgContainer createMany edge cases', () => {
    let svg: SVGSVGElement;

    afterEach(() => {
        svg?.remove();
    });

    it('createMany with count 0 returns empty array', () => {
        svg = parseSvg(FIXTURE);
        const container = createSvgShards.fromElement(svg)!;
        expect(container.createMany('circle', 0, () => ({ cx: 0, cy: 0, r: 1 }))).toEqual([]);
    });

    it('createMany throws for negative count', () => {
        svg = parseSvg(FIXTURE);
        const container = createSvgShards.fromElement(svg)!;
        expect(() => container.createMany('circle', -1, () => ({ cx: 0, cy: 0, r: 1 }))).toThrow(RangeError);
    });
});
