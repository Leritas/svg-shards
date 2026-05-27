import { el } from '../types';
import type { PlaygroundHighlightTarget } from '../types';

/** Minimal shard — avoids src/dist svg-shards class mismatch in playground lessons. */
export interface ParticlesShard {
    htmlNode: SVGElement;
}

export interface SnowflakeShard extends ParticlesShard {
    transform: string | null;
}

export interface CircleShard extends ParticlesShard, PlaygroundHighlightTarget {
    r: number;
    cx: number;
    cy: number;
}

export interface ParticlesGroup extends ParticlesShard {
    children: ParticlesShard[];
    removeChild(element: ParticlesShard): void;
}

/** Any SvgContainer from createSvgShards satisfies this structurally. */
export interface ParticlesContainer {
    htmlNode: SVGSVGElement;
    getById(id: string): ParticlesShard | null;
    registerNode(node: Element): ParticlesShard | null;
    getByType(type: 'circle'): CircleShard[];
    createCircle(options: {
        parent?: ParticlesGroup;
        cx?: number;
        cy?: number;
        r?: number;
        fill?: string;
        stroke?: string;
        strokeWidth?: number;
    }): CircleShard;
    createMany(
        kind: 'circle' | 'path',
        count: number,
        factory: (index: number) => Record<string, unknown> & { parent?: ParticlesGroup },
    ): ParticlesShard[];
}

/** Bridge LessonContext SvgContainer → playground structural type (src/dist safe). */
export function toParticlesContainer(container: unknown): ParticlesContainer {
    return container as ParticlesContainer;
}

export const PARTICLE_BOUNDS = { width: 400, height: 300 };

export interface FpsTracker {
    element: HTMLSpanElement;
    setActive: (active: boolean) => void;
    dispose: () => void;
}

/** rAF-based FPS readout — call setActive(false) on pause, true on resume. */
export function createFpsTracker(initiallyActive = true): FpsTracker {
    const element = el('span', { className: 'fps-counter', textContent: 'FPS: —' });
    let active = initiallyActive;
    let frameCount = 0;
    let lastFpsTime = performance.now();
    let rafId = 0;

    const loop = (): void => {
        if (!active) {
            return;
        }

        frameCount++;
        const now = performance.now();
        if (now - lastFpsTime >= 500) {
            element.textContent = `FPS: ${Math.round((frameCount * 1000) / (now - lastFpsTime))}`;
            frameCount = 0;
            lastFpsTime = now;
        }

        rafId = requestAnimationFrame(loop);
    };

    const kick = (): void => {
        cancelAnimationFrame(rafId);
        frameCount = 0;
        lastFpsTime = performance.now();
        rafId = requestAnimationFrame(loop);
    };

    if (initiallyActive) {
        kick();
    }

    return {
        element,
        setActive(next: boolean) {
            active = next;
            if (next) {
                kick();
            } else {
                cancelAnimationFrame(rafId);
            }
        },
        dispose() {
            active = false;
            cancelAnimationFrame(rafId);
        },
    };
}

export function getParticlesGroup(container: ParticlesContainer): ParticlesGroup | null {
    return container.getById('particles') as ParticlesGroup | null;
}

export function ensureParticlesGroup(container: ParticlesContainer): ParticlesGroup {
    const existing = getParticlesGroup(container);
    if (existing) {
        return existing;
    }

    const groupNode = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    groupNode.id = 'particles';
    container.htmlNode.appendChild(groupNode);
    return container.registerNode(groupNode) as ParticlesGroup;
}

export function clearGroupChildren(group: ParticlesGroup): void {
    for (const child of [...group.children]) {
        group.removeChild(child);
    }
}

export function randomHsl(index: number, step = 7): string {
    return `hsl(${(index * step) % 360}, 80%, 55%)`;
}
