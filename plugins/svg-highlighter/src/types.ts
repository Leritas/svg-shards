export type HighlightMode = 'fill' | 'outline';

export interface SvgHighlighterOptions {
    highlightColor?: string;
    strokeWidthBoost?: number;
    highlightMode?: HighlightMode;
    /** CSS selector or HTMLElement for viewport wrapper */
    container?: string | HTMLElement;
}

export interface ViewportState {
    scale: number;
    translateX: number;
    translateY: number;
    rotation: number;
}
