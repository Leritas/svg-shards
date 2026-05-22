import type { HighlightOptions, SvgContainer, SvgElementEntry, SvgElementUnion, VisualState } from 'svg-shards';
import { createSvgShards } from 'svg-shards';
import { ViewportController } from './ViewportController';
import type { SvgHighlighterOptions, HighlightMode } from './types';

export type { SvgHighlighterOptions, HighlightMode, ViewportState } from './types';

interface HighlightSnapshot {
    element: SvgElementUnion;
    state: VisualState;
}

export class SvgHighlighter {
    private container: SvgContainer;
    private entries: SvgElementEntry[];
    private options: Required<Pick<SvgHighlighterOptions, 'highlightColor' | 'strokeWidthBoost' | 'highlightMode'>> &
        SvgHighlighterOptions;
    private currentIndex = -1;
    private highlighted: HighlightSnapshot[] = [];
    private viewport: ViewportController | null = null;

    private constructor(container: SvgContainer, options: SvgHighlighterOptions) {
        this.container = container;
        this.entries = container.getAll();
        this.options = {
            highlightColor: options.highlightColor ?? '#ff6600',
            strokeWidthBoost: options.strokeWidthBoost ?? 2,
            highlightMode: options.highlightMode ?? 'fill',
            ...options,
        };

        if (options.container) {
            this.viewport = ViewportController.mount(container.htmlNode, options.container);
        }
    }

    static create(element: HTMLElement | SVGSVGElement, options: SvgHighlighterOptions = {}): SvgHighlighter | null {
        const target = element instanceof SVGSVGElement ? element : element;
        const container = createSvgShards.fromElement(target as HTMLElement);
        if (!container) {
            return null;
        }
        return new SvgHighlighter(container, options);
    }

    getElementList(): SvgElementEntry[] {
        return this.entries;
    }

    highlight(entry: SvgElementEntry): void {
        const index = this.entries.indexOf(entry);
        if (index === this.currentIndex) {
            this.clearHighlight();
            return;
        }

        this.clearHighlight();
        this.currentIndex = index;
        this.applyHighlightTargets(this.getHighlightTargets(entry));
    }

    highlightByIndex(index: number): void {
        if (index === this.currentIndex) {
            this.clearHighlight();
            return;
        }

        const entry = this.entries[index];
        if (entry) {
            this.highlight(entry);
        }
    }

    highlightNext(): void {
        if (this.entries.length === 0) {
            return;
        }
        const next = this.currentIndex < this.entries.length - 1 ? this.currentIndex + 1 : 0;
        this.highlightByIndex(next);
    }

    highlightPrev(): void {
        if (this.entries.length === 0) {
            return;
        }
        const prev = this.currentIndex > 0 ? this.currentIndex - 1 : this.entries.length - 1;
        this.highlightByIndex(prev);
    }

    getCurrentIndex(): number {
        return this.currentIndex;
    }

    getHighlightMode(): HighlightMode {
        return this.options.highlightMode;
    }

    setHighlightMode(mode: HighlightMode): void {
        this.options.highlightMode = mode;
        if (this.currentIndex >= 0) {
            const entry = this.entries[this.currentIndex];
            this.restoreHighlighted();
            this.applyHighlightTargets(this.getHighlightTargets(entry));
        }
    }

    clearHighlight(): void {
        this.restoreHighlighted();
        this.currentIndex = -1;
    }

    getViewport(): ViewportController | null {
        return this.viewport;
    }

    destroy(): void {
        this.clearHighlight();
        this.viewport?.destroy();
        this.viewport = null;
    }

    private getHighlightTargets(entry: SvgElementEntry): SvgElementUnion[] {
        if (entry.type !== 'group') {
            return [entry.element];
        }

        const groupNode = entry.element.htmlNode;
        return this.entries
            .filter((candidate) => candidate.type !== 'group' && groupNode.contains(candidate.element.htmlNode as Node))
            .map((candidate) => candidate.element);
    }

    private applyHighlightTargets(targets: SvgElementUnion[]): void {
        const options = this.buildHighlightOptions();
        this.highlighted = targets.map((element) => ({
            element,
            state: element.applyHighlight(options),
        }));
    }

    private restoreHighlighted(): void {
        for (const { element, state } of this.highlighted) {
            element.clearHighlight(state);
        }
        this.highlighted = [];
    }

    private buildHighlightOptions(): HighlightOptions {
        const color = this.options.highlightColor;

        if (this.options.highlightMode === 'outline') {
            return {
                fill: 'none',
                stroke: color,
                strokeWidthBoost: this.options.strokeWidthBoost,
            };
        }

        return {
            fill: color,
            stroke: color,
            strokeWidthBoost: this.options.strokeWidthBoost,
        };
    }
}
