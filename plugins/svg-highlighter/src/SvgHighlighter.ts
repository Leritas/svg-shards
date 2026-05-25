import type { SvgElementUnion } from 'svg-shards';
import { createSvgShards } from 'svg-shards';
import { bindVisual, computed, readSignalValue, signal, type Signal, type SignalLike } from 'svg-shards/reactive';
import { ViewportController } from './ViewportController';
import type {
    HighlightMode,
    HighlighterContainer,
    HighlighterEntry,
    HighlighterShard,
    HighlighterVisualState,
    SvgHighlighterOptions,
} from './types';

export type {
    SvgHighlighterOptions,
    HighlightMode,
    ViewportState,
    HighlighterContainer,
    HighlighterEntry,
    HighlighterShard,
    HighlighterVisualState,
} from './types';

interface ActiveBinding {
    element: HighlighterShard;
    originalState: HighlighterVisualState;
    unbind: () => void;
}

function isSignalLike<T>(value: unknown): value is SignalLike<T> {
    return typeof value === 'object' && value !== null && 'value' in value;
}

function isHighlighterContainer(source: unknown): source is HighlighterContainer {
    return (
        typeof source === 'object' &&
        source !== null &&
        'getAll' in source &&
        'htmlNode' in source &&
        'onAfterRefresh' in source
    );
}

function asBindableShard(shard: HighlighterShard): SvgElementUnion {
    return shard as unknown as SvgElementUnion;
}

function parseStrokeWidth(state: HighlighterVisualState, element: HighlighterShard): number {
    if (state.strokeWidth !== null && state.strokeWidth !== '') {
        const parsed = Number.parseFloat(state.strokeWidth);
        if (!Number.isNaN(parsed)) {
            return parsed;
        }
    }
    return element.strokeWidth;
}

export class SvgHighlighter {
    private container: HighlighterContainer;
    private entries: HighlighterEntry[];
    private readonly strokeWidthBoost: number;
    private readonly highlightColorSig: SignalLike<string>;
    private readonly highlightModeSig: SignalLike<HighlightMode>;
    private currentIndex = -1;
    private activeBindings: ActiveBinding[] = [];
    private viewport: ViewportController | null = null;

    private constructor(container: HighlighterContainer, options: SvgHighlighterOptions) {
        this.container = container;
        this.entries = container.getAll();
        this.strokeWidthBoost = options.strokeWidthBoost ?? 2;
        this.highlightColorSig = isSignalLike<string>(options.highlightColor)
            ? options.highlightColor
            : signal(options.highlightColor ?? '#ff6600');
        this.highlightModeSig = isSignalLike<HighlightMode>(options.highlightMode)
            ? options.highlightMode
            : signal(options.highlightMode ?? 'fill');
        if (options.container) {
            this.viewport = ViewportController.mount(container.htmlNode, options.container);
        }

        container.onAfterRefresh(() => {
            this.syncEntries();
            this.reapplyCurrentHighlight();
        });
    }

    static create(source: Element | HighlighterContainer, options: SvgHighlighterOptions = {}): SvgHighlighter | null {
        if (isHighlighterContainer(source)) {
            return new SvgHighlighter(source, options);
        }

        const container = createSvgShards.fromElement(source, {
            observe: options.observe,
        });
        if (!container) {
            return null;
        }
        return new SvgHighlighter(container, options);
    }

    getElementList(): HighlighterEntry[] {
        return this.entries;
    }

    highlight(entry: HighlighterEntry): void {
        const index = this.entries.indexOf(entry);
        if (index === this.currentIndex) {
            this.clearHighlight();
            return;
        }

        this.clearHighlight();
        this.currentIndex = index;
        if (index >= 0) {
            this.applyHighlightTargets(this.getHighlightTargets(entry));
        }
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
        return readSignalValue(this.highlightModeSig);
    }

    setHighlightMode(mode: HighlightMode): void {
        if (isSignalLike<HighlightMode>(this.highlightModeSig)) {
            (this.highlightModeSig as Signal<HighlightMode>).value = mode;
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
        this.container.onAfterRefresh(null);
        this.viewport?.destroy();
        this.viewport = null;
    }

    private syncEntries(): void {
        const prevEntry = this.currentIndex >= 0 ? this.entries[this.currentIndex] : null;
        const prevId = prevEntry?.element.id ?? null;
        this.entries = this.container.getAll();

        if (prevId) {
            this.currentIndex = this.entries.findIndex((entry) => entry.element.id === prevId);
        } else if (this.currentIndex >= this.entries.length) {
            this.currentIndex = -1;
        }
    }

    private reapplyCurrentHighlight(): void {
        if (this.currentIndex < 0) {
            return;
        }

        const entry = this.entries[this.currentIndex];
        if (!entry) {
            this.clearHighlight();
            return;
        }

        this.restoreHighlighted();
        this.applyHighlightTargets(this.getHighlightTargets(entry));
    }

    private getHighlightTargets(entry: HighlighterEntry): HighlighterShard[] {
        if (entry.type !== 'group') {
            return [entry.element];
        }

        const groupNode = entry.element.htmlNode;
        return this.entries
            .filter((candidate) => candidate.type !== 'group' && groupNode.contains(candidate.element.htmlNode))
            .map((candidate) => candidate.element);
    }

    private applyHighlightTargets(targets: HighlighterShard[]): void {
        this.activeBindings = targets.map((element) => {
            const originalState = element.captureVisualState();
            const baseStrokeWidth = parseStrokeWidth(originalState, element);
            const bindable = asBindableShard(element);

            const fill = computed(() => {
                const mode = readSignalValue(this.highlightModeSig);
                const color = readSignalValue(this.highlightColorSig);
                return mode === 'outline' ? 'none' : color;
            });

            const stroke = computed(() => readSignalValue(this.highlightColorSig));

            const strokeWidth = computed(() => baseStrokeWidth + this.strokeWidthBoost);

            const unbind = bindVisual(bindable, { fill, stroke, strokeWidth });

            return { element, originalState, unbind };
        });
    }

    private restoreHighlighted(): void {
        for (const binding of this.activeBindings) {
            binding.unbind();
            binding.element.applyVisualState(binding.originalState);
        }
        this.activeBindings = [];
    }
}
