import type { BoundingBox } from '../../src/core/types';
import type { SvgContainer } from '../../src/core/SvgContainer';
import type { SvgElement } from '../../src/core/SvgElement';

export interface PluginLessonGroup {
    id: string;
    title: string;
    lessons: Lesson[];
}

/** Structural target for canvas outline — avoids src/dist class mismatch in plugin lessons. */
export interface PlaygroundHighlightTarget {
    getBoundingBox(): BoundingBox;
    htmlNode: SVGElement;
}

export interface LessonContext {
    getContainer: () => SvgContainer;
    log: (message: string, detail?: string) => void;
    getCanvasHost: () => HTMLElement;
    resetScene: () => SvgContainer;
    highlightShard: (shard: PlaygroundHighlightTarget | null) => void;
    setSnippet: (code: string) => void;
}

export interface Lesson {
    id: string;
    title: string;
    description: string;
    apiRefs: string[];
    snippet: string;
    mount: (panel: HTMLElement, ctx: LessonContext) => () => void;
    reset: (ctx: LessonContext) => void;
}

export function el<K extends keyof HTMLElementTagNameMap>(
    tag: K,
    props?: Record<string, string>,
    children?: (Node | string)[],
): HTMLElementTagNameMap[K] {
    const node = document.createElement(tag);
    if (props) {
        for (const [key, value] of Object.entries(props)) {
            if (key === 'className') {
                node.className = value;
            } else if (key === 'textContent') {
                node.textContent = value;
            } else {
                node.setAttribute(key, value);
            }
        }
    }
    if (children) {
        for (const child of children) {
            node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
        }
    }
    return node;
}

export function btn(label: string, onClick: () => void, className = 'btn'): HTMLButtonElement {
    const button = el('button', { type: 'button', className, textContent: label });
    button.addEventListener('click', onClick);
    return button;
}

export function shardLabel(shard: SvgElement, type?: string): string {
    const id = shard.id || '(no id)';
    return type ? `${type}#${id}` : id;
}

export function shardTypeName(shard: SvgElement): string {
    return shard.htmlNode.tagName.toLowerCase();
}
