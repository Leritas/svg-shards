import type { SignalLike } from 'svg-shards/reactive';

export type HighlightMode = 'fill' | 'outline';

export interface HighlighterVisualState {
    fill: string | null;
    stroke: string | null;
    strokeWidth: string | null;
    opacity: string | null;
}

/** Minimal shard surface used by the highlighter — no svg-shards class imports. */
export interface HighlighterShard {
    id: string;
    htmlNode: SVGElement;
    strokeWidth: number;
    getBoundingBox(): { x: number; y: number; width: number; height: number };
    captureVisualState(): HighlighterVisualState;
    applyVisualState(state: HighlighterVisualState): void;
}

export interface HighlighterEntry {
    type: string;
    element: HighlighterShard;
    label: string;
}

/** Any svg-shards SvgContainer instance satisfies this structurally. */
export interface HighlighterContainer {
    getAll(): HighlighterEntry[];
    htmlNode: SVGSVGElement;
    onAfterRefresh(callback: (() => void) | null): void;
}

export interface SvgHighlighterOptions {
    highlightColor?: string | SignalLike<string>;
    strokeWidthBoost?: number;
    highlightMode?: HighlightMode | SignalLike<HighlightMode>;
    /** CSS selector or HTMLElement for viewport wrapper */
    container?: string | HTMLElement;
    /** Enable MutationObserver auto-refresh when creating a new SvgContainer */
    observe?: boolean;
}

export interface ViewportState {
    scale: number;
    translateX: number;
    translateY: number;
    rotation: number;
}
