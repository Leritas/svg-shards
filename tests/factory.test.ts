import { describe, it, expect, afterEach } from 'vitest';
import { ElementFactory } from '../src/factories/ElementFactory';
import { parseSvg } from './helpers';

const FIXTURE = `
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <rect id="box" x="10" y="10" width="40" height="30" fill="#f00"/>
  <circle id="dot" cx="80" cy="40" r="15" fill="#0f0"/>
  <ellipse cx="120" cy="40" rx="20" ry="10"/>
  <line x1="0" y1="0" x2="50" y2="50"/>
  <polygon points="10,60 30,90 0,90"/>
  <polyline points="40,60 60,90 80,60"/>
  <path d="M10 100 L50 100"/>
  <text x="10" y="120">Hello</text>
  <g id="group1"><circle cx="150" cy="150" r="5"/></g>
  <use href="#dot" x="10" y="150"/>
</svg>`;

describe('ElementFactory', () => {
    let svg: SVGSVGElement;

    afterEach(() => {
        svg?.remove();
    });

    it('parses all supported element types', () => {
        svg = parseSvg(FIXTURE);
        const map = ElementFactory.parseSvgElement(svg);

        expect(map.rect).toHaveLength(1);
        expect(map.circle).toHaveLength(2);
        expect(map.ellipse).toHaveLength(1);
        expect(map.line).toHaveLength(1);
        expect(map.polygon).toHaveLength(1);
        expect(map.polyline).toHaveLength(1);
        expect(map.path).toHaveLength(1);
        expect(map.text).toHaveLength(1);
        expect(map.group).toHaveLength(1);
        expect(map.use).toHaveLength(1);
    });

    it('indexes groups under group key (not g)', () => {
        svg = parseSvg(FIXTURE);
        const map = ElementFactory.parseSvgElement(svg);

        expect(map.group[0].id).toBe('group1');
    });

    it('wraps nodes in typed classes', () => {
        svg = parseSvg(FIXTURE);
        const map = ElementFactory.parseSvgElement(svg);

        expect(map.rect[0].width).toBe(40);
        expect(map.circle[0].r).toBe(15);
        expect(map.circle[0].radius).toBe(15);
    });
});
