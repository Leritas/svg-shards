import { describe, it, expect, afterEach } from 'vitest';
import { createSvgShards } from '../src/index';
import { parseSvg } from './helpers';

const FIXTURE = `
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle id="c" cx="50" cy="50" r="20" fill="#000" stroke="#111" stroke-width="2" opacity="0.8"/>
</svg>`;

describe('Visual state helpers', () => {
  let svg: SVGSVGElement;

  afterEach(() => {
    svg?.remove();
  });

  it('captures and restores visual state', () => {
    svg = parseSvg(FIXTURE);
    const container = createSvgShards.fromElement(svg)!;
    const circle = container.getByType('circle')[0];

    const original = circle.captureVisualState();
    circle.fill = '#fff';
    circle.strokeWidth = 10;
    circle.applyVisualState(original);

    expect(circle.fill).toBe('#000');
    expect(circle.strokeWidth).toBe(2);
  });

  it('applyHighlight returns previous state and clearHighlight restores it', () => {
    svg = parseSvg(FIXTURE);
    const container = createSvgShards.fromElement(svg)!;
    const circle = container.getByType('circle')[0];

    const previous = circle.applyHighlight({
      fill: '#f60',
      stroke: '#f60',
      strokeWidthBoost: 3,
    });

    expect(circle.fill).toBe('#f60');
    expect(circle.strokeWidth).toBe(5);

    circle.clearHighlight(previous);
    expect(circle.fill).toBe('#000');
    expect(circle.strokeWidth).toBe(2);
  });
});
