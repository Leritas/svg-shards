import { describe, it, expect, afterEach } from 'vitest';
import { createSvgShards } from '../src/index';
import { parseSvg } from './helpers';

const FIXTURE = `
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <rect id="box" x="10" y="10" width="40" height="30"/>
  <circle id="dot" cx="80" cy="40" r="15"/>
  <circle cx="120" cy="40" r="10"/>
  <g id="group1"><rect x="0" y="0" width="5" height="5"/></g>
</svg>`;

describe('SvgContainer', () => {
    let svg: SVGSVGElement;

    afterEach(() => {
        svg?.remove();
    });

    it('returns null when no svg ancestor exists', () => {
        const div = document.createElement('div');
        expect(createSvgShards.fromElement(div)).toBeNull();
    });

    it('getAll returns labeled entries in type order', () => {
        svg = parseSvg(FIXTURE);
        const container = createSvgShards.fromElement(svg)!;
        const all = container.getAll();

        expect(all).toHaveLength(5);
        expect(all[0].label).toBe('box');
        expect(all[1].label).toBe('rect #2');
        expect(all[2].label).toBe('dot');
        expect(all[3].label).toBe('circle #2');
        expect(all[4].label).toBe('group1');
    });

    it('getById finds wrapped elements', () => {
        svg = parseSvg(FIXTURE);
        const container = createSvgShards.fromElement(svg)!;
        const dot = container.getById('dot');

        expect(dot).not.toBeNull();
        expect(dot!.id).toBe('dot');
    });

    it('getByType returns typed arrays', () => {
        svg = parseSvg(FIXTURE);
        const container = createSvgShards.fromElement(svg)!;

        expect(container.getByType('circle')).toHaveLength(2);
        expect(container.getByType('group')).toHaveLength(1);
    });

    it('refresh re-parses after DOM changes', () => {
        svg = parseSvg(FIXTURE);
        const container = createSvgShards.fromElement(svg)!;
        expect(container.getByType('rect')).toHaveLength(2);

        const newRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        svg.appendChild(newRect);
        container.refresh();

        expect(container.getByType('rect')).toHaveLength(3);
    });
});
