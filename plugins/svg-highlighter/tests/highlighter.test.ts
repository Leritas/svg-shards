import { describe, it, expect, afterEach } from 'vitest';
import { signal } from '../../../src/reactive';
import { createSvgShards } from '../../../src/index';
import { SvgHighlighter } from '../src/SvgHighlighter';

function parseSvg(svg: string): SVGSVGElement {
    const container = document.createElement('div');
    container.innerHTML = svg.trim();
    const svgNode = container.querySelector('svg');
    if (!svgNode) {
        throw new Error('Fixture SVG not found');
    }
    document.body.appendChild(svgNode);
    return svgNode;
}

function indexOfId(highlighter: SvgHighlighter, id: string): number {
    return highlighter.getElementList().findIndex((entry) => entry.element.id === id);
}
const FIXTURE = `
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <circle id="a" cx="50" cy="50" r="20" fill="#111" stroke="#222" stroke-width="2"/>
  <rect id="b" x="100" y="30" width="40" height="40" fill="#333" stroke="#444" stroke-width="1"/>
  <g id="grp">
    <circle id="c" cx="50" cy="150" r="15" fill="#555" stroke="#666" stroke-width="2"/>
    <rect id="d" x="100" y="130" width="30" height="30" fill="#777" stroke="#888" stroke-width="1"/>
  </g>
</svg>`;

describe('SvgHighlighter', () => {
    let svg: SVGSVGElement;
    let highlighter: SvgHighlighter | null = null;

    afterEach(() => {
        highlighter?.destroy();
        highlighter = null;
        svg?.remove();
    });

    it('highlights and clears a shard', () => {
        svg = parseSvg(FIXTURE);
        highlighter = SvgHighlighter.create(svg, { highlightColor: '#f60', strokeWidthBoost: 2 })!;

        highlighter.highlightByIndex(indexOfId(highlighter, 'a'));
        const circle = svg.querySelector('#a')!;
        expect(circle.getAttribute('fill')).toBe('#f60');
        expect(circle.getAttribute('stroke-width')).toBe('4');

        highlighter.clearHighlight();
        expect(circle.getAttribute('fill')).toBe('#111');
        expect(circle.getAttribute('stroke-width')).toBe('2');
    });

    it('toggles off when highlighting the same index again', () => {
        svg = parseSvg(FIXTURE);
        highlighter = SvgHighlighter.create(svg)!;

        highlighter.highlightByIndex(indexOfId(highlighter, 'b'));
        expect(svg.querySelector('#b')!.getAttribute('fill')).toBe('#ff6600');

        highlighter.highlightByIndex(indexOfId(highlighter, 'b'));
        expect(svg.querySelector('#b')!.getAttribute('fill')).toBe('#333');
        expect(highlighter.getCurrentIndex()).toBe(-1);
    });

    it('setHighlightMode updates active highlight reactively', () => {
        svg = parseSvg(FIXTURE);
        highlighter = SvgHighlighter.create(svg, { highlightColor: '#f60', strokeWidthBoost: 1 })!;

        highlighter.highlightByIndex(indexOfId(highlighter, 'a'));
        const circle = svg.querySelector('#a')!;
        expect(circle.getAttribute('fill')).toBe('#f60');

        highlighter.setHighlightMode('outline');
        expect(circle.getAttribute('fill')).toBe('none');
        expect(circle.getAttribute('stroke')).toBe('#f60');

        highlighter.setHighlightMode('fill');
        expect(circle.getAttribute('fill')).toBe('#f60');
    });

    it('updates highlight when color signal changes', () => {
        svg = parseSvg(FIXTURE);
        const color = signal('#f60');
        highlighter = SvgHighlighter.create(svg, { highlightColor: color, strokeWidthBoost: 0 })!;

        highlighter.highlightByIndex(indexOfId(highlighter, 'a'));
        expect(svg.querySelector('#a')!.getAttribute('fill')).toBe('#f60');

        color.value = '#00ff00';
        expect(svg.querySelector('#a')!.getAttribute('fill')).toBe('#00ff00');
    });

    it('highlights all visual descendants when a group is selected', () => {
        svg = parseSvg(FIXTURE);
        highlighter = SvgHighlighter.create(svg, { highlightColor: '#abc', strokeWidthBoost: 0 })!;

        const groupIndex = highlighter.getElementList().findIndex((entry) => entry.type === 'group');
        highlighter.highlightByIndex(groupIndex);

        expect(svg.querySelector('#c')!.getAttribute('fill')).toBe('#abc');
        expect(svg.querySelector('#d')!.getAttribute('fill')).toBe('#abc');
        expect(svg.querySelector('#a')!.getAttribute('fill')).toBe('#111');
    });

    it('accepts an existing SvgContainer', () => {
        svg = parseSvg(FIXTURE);
        const container = createSvgShards.fromElement(svg)!;
        highlighter = SvgHighlighter.create(container, { highlightColor: '#f60', strokeWidthBoost: 0 })!;

        highlighter.highlightByIndex(indexOfId(highlighter, 'a'));
        expect(svg.querySelector('#a')!.getAttribute('fill')).toBe('#f60');
    });

    it('re-syncs entries and re-applies highlight after refresh', () => {
        svg = parseSvg(FIXTURE);
        const container = createSvgShards.fromElement(svg)!;
        highlighter = SvgHighlighter.create(container, { highlightColor: '#f60', strokeWidthBoost: 0 })!;

        highlighter.highlightByIndex(indexOfId(highlighter, 'a'));
        expect(svg.querySelector('#a')!.getAttribute('fill')).toBe('#f60');

        const newCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        newCircle.setAttribute('id', 'added');
        newCircle.setAttribute('cx', '160');
        newCircle.setAttribute('cy', '50');
        newCircle.setAttribute('r', '10');
        newCircle.setAttribute('fill', '#000');
        svg.appendChild(newCircle);

        container.refresh();
        expect(highlighter.getElementList().some((entry) => entry.element.id === 'added')).toBe(true);
        expect(svg.querySelector('#a')!.getAttribute('fill')).toBe('#f60');
    });
});
