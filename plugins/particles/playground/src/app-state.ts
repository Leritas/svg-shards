import { createSvgShards } from 'svg-shards';
import type { SvgContainer } from 'svg-shards';
import type { PlaygroundHighlightTarget } from './types';
import { logApi } from './log';
import type { LessonContext } from './types';

const HIGHLIGHT_CLASS = 'playground-shard-highlight';
const SCENE_TEMPLATE_ID = 'scene-svg-template';

let canvasHost: HTMLElement | null = null;
let container: SvgContainer | null = null;
let highlightEl: SVGElement | null = null;

export function initAppState(host: HTMLElement): void {
    canvasHost = host;
    resetScene();
}

export function getContainer(): SvgContainer {
    if (!container) {
        throw new Error('SvgContainer not initialized');
    }
    return container;
}

export function resetScene(): SvgContainer {
    if (!canvasHost) {
        throw new Error('Canvas host not initialized');
    }

    if (container) {
        container.disableAutoRefresh();
    }

    const template = document.getElementById(SCENE_TEMPLATE_ID) as HTMLTemplateElement | null;
    if (!template) {
        throw new Error('Scene template not found');
    }

    canvasHost.replaceChildren(template.content.cloneNode(true));
    const svgNode = canvasHost.querySelector('svg');
    if (!svgNode) {
        throw new Error('Scene SVG not found');
    }

    container = createSvgShards.fromElement(svgNode)!;
    clearHighlight();
    logApi('createSvgShards.fromElement(svg)', 'SvgContainer ready');
    return container;
}

export function clearHighlight(): void {
    highlightEl?.remove();
    highlightEl = null;
}

export function highlightShard(shard: PlaygroundHighlightTarget | null): void {
    clearHighlight();
    if (!shard || !canvasHost) {
        return;
    }

    const svg = canvasHost.querySelector('svg');
    if (!svg) {
        return;
    }

    try {
        const bbox = shard.getBoundingBox();
        const pad = 4;
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', String(bbox.x - pad));
        rect.setAttribute('y', String(bbox.y - pad));
        rect.setAttribute('width', String(bbox.width + pad * 2));
        rect.setAttribute('height', String(bbox.height + pad * 2));
        rect.setAttribute('fill', 'none');
        rect.setAttribute('stroke', '#4a90d9');
        rect.setAttribute('stroke-width', '2');
        rect.setAttribute('stroke-dasharray', '6 3');
        rect.setAttribute('pointer-events', 'none');
        rect.classList.add(HIGHLIGHT_CLASS);
        svg.appendChild(rect);
        highlightEl = rect;
    } catch {
        // getBBox may fail in edge cases
    }
}

export function createLessonContext(setSnippet: (code: string) => void): LessonContext {
    return {
        getContainer,
        log: logApi,
        getCanvasHost: () => canvasHost!,
        resetScene,
        highlightShard,
        setSnippet,
    };
}
