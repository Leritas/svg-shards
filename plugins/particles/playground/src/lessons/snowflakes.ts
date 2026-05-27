import type { ParticlesContainer } from './shared';

const SVG_NS = 'http://www.w3.org/2000/svg';
const GRADIENT_COUNT = 8;

/** Six-arm snowflake with side branches — centered at (0, 0). */
export function snowflakePath(size: number, variant: number): string {
    const s = size;
    const segments: string[] = [];

    for (let arm = 0; arm < 6; arm++) {
        const angle = (arm * Math.PI) / 3;
        const dx = Math.sin(angle) * s;
        const dy = -Math.cos(angle) * s;

        segments.push(`M 0 0 L ${fmt(dx)} ${fmt(dy)}`);

        const branchT = 0.35 + (variant % 3) * 0.08;
        const bx = Math.sin(angle) * s * branchT;
        const by = -Math.cos(angle) * s * branchT;
        const branchLen = s * (0.14 + (variant % 2) * 0.06);
        const px = Math.sin(angle + Math.PI / 2) * branchLen;
        const py = -Math.cos(angle + Math.PI / 2) * branchLen;

        segments.push(`M ${fmt(bx)} ${fmt(by)} L ${fmt(bx + px)} ${fmt(by + py)}`);
        segments.push(`M ${fmt(bx)} ${fmt(by)} L ${fmt(bx - px)} ${fmt(by - py)}`);

        if (variant % 4 === 0) {
            const tip = 0.72;
            const tx = Math.sin(angle) * s * tip;
            const ty = -Math.cos(angle) * s * tip;
            const fork = s * 0.08;
            const fpx = Math.sin(angle + Math.PI / 2) * fork;
            const fpy = -Math.cos(angle + Math.PI / 2) * fork;
            segments.push(`M ${fmt(tx)} ${fmt(ty)} L ${fmt(tx + fpx)} ${fmt(ty + fpy)}`);
            segments.push(`M ${fmt(tx)} ${fmt(ty)} L ${fmt(tx - fpx)} ${fmt(ty - fpy)}`);
        }
    }

    return segments.join(' ');
}

function fmt(value: number): string {
    return value.toFixed(2);
}

export function ensureSnowGradients(container: ParticlesContainer): void {
    if (container.htmlNode.querySelector('#snow-defs')) {
        return;
    }

    const defs = document.createElementNS(SVG_NS, 'defs');
    defs.id = 'snow-defs';

    const palettes = [
        ['#ffffff', '#eef6ff', '#ffffff00'],
        ['#fafcff', '#dce8f5', '#ffffff00'],
        ['#ffffff', '#e8f0fa', '#ffffff00'],
        ['#f5f9ff', '#c8d8eb', '#ffffff00'],
        ['#ffffff', '#f0f4f8', '#ffffff00'],
        ['#f8fbff', '#d4e4f2', '#ffffff00'],
        ['#ffffff', '#e2ecf7', '#ffffff00'],
        ['#f6faff', '#b8cce0', '#ffffff00'],
    ];

    for (let i = 0; i < GRADIENT_COUNT; i++) {
        const [inner, outer, edge] = palettes[i % palettes.length];
        const grad = document.createElementNS(SVG_NS, 'radialGradient');
        grad.id = `snow-grad-${i}`;
        grad.setAttribute('cx', '0');
        grad.setAttribute('cy', '0');
        grad.setAttribute('r', '1');
        grad.setAttribute('gradientUnits', 'objectBoundingBox');

        appendStop(grad, '0%', inner, '1');
        appendStop(grad, '55%', outer, String(0.85 - (i % 3) * 0.08));
        appendStop(grad, '100%', edge, '0');

        defs.appendChild(grad);
    }

    container.htmlNode.insertBefore(defs, container.htmlNode.firstChild);
}

function appendStop(grad: SVGGradientElement, offset: string, color: string, opacity: string): void {
    const stop = document.createElementNS(SVG_NS, 'stop');
    stop.setAttribute('offset', offset);
    stop.setAttribute('stop-color', color);
    stop.setAttribute('stop-opacity', opacity);
    grad.appendChild(stop);
}

export function snowGradientFill(index: number): string {
    return `url(#snow-grad-${index % GRADIENT_COUNT})`;
}

export function snowflakeTransform(cx: number, cy: number, rotationDeg: number, scale: number): string {
    return `translate(${fmt(cx)}, ${fmt(cy)}) rotate(${rotationDeg.toFixed(2)}) scale(${scale.toFixed(3)})`;
}

export const SNOWFLAKE_COUNT = 150;
