import { ElementFactory } from '../factories/ElementFactory';
import { SvgElement } from './SvgElement';
import { AutoRefreshOptions, CreateSvgShardsOptions } from './options';
import { NodeRegistry } from './NodeRegistry';
import { SvgElementEntry, SvgElementMap, SvgElementTypeKey, TAG_TO_MAP_KEY } from './types';

const TYPE_ORDER: SvgElementTypeKey[] = [
    'rect',
    'circle',
    'ellipse',
    'line',
    'polygon',
    'polyline',
    'path',
    'text',
    'image',
    'group',
    'use',
];

export class SvgContainer {
    private _htmlNode: SVGSVGElement;
    private _elements: SvgElementMap;
    private _registry: NodeRegistry;
    private _observer: MutationObserver | null = null;
    private _refreshTimer: ReturnType<typeof setTimeout> | null = null;
    private _observeDebounceMs: number;

    constructor(
        htmlNode: SVGSVGElement,
        elements: SvgElementMap,
        registry: NodeRegistry,
        options?: CreateSvgShardsOptions,
    ) {
        this._htmlNode = htmlNode;
        this._elements = elements;
        this._registry = registry;
        this._observeDebounceMs = options?.observeDebounceMs ?? 16;

        if (options?.observe) {
            this.enableAutoRefresh({ debounceMs: this._observeDebounceMs });
        }
    }

    get htmlNode(): SVGSVGElement {
        return this._htmlNode;
    }

    get elements(): SvgElementMap {
        return this._elements;
    }

    get registry(): NodeRegistry {
        return this._registry;
    }

    get width(): number {
        return this._htmlNode.clientWidth || this._htmlNode.viewBox?.baseVal?.width || 0;
    }

    get height(): number {
        return this._htmlNode.clientHeight || this._htmlNode.viewBox?.baseVal?.height || 0;
    }

    get viewBox(): DOMRectReadOnly {
        return (
            this._htmlNode.viewBox?.baseVal ||
            ({ x: 0, y: 0, width: this.width, height: this.height } as DOMRectReadOnly)
        );
    }

    getByType<K extends SvgElementTypeKey>(type: K): SvgElementMap[K] {
        return this._elements[type];
    }

    getById(id: string): SvgElement | null {
        const node = this._htmlNode.getElementById(id);
        if (!node) {
            return null;
        }

        const existing = this.findInMap(node);
        if (existing) {
            return existing;
        }

        return this.wrapAndRegister(node);
    }

    query(selector: string): SvgElement[] {
        const nodes = this._htmlNode.querySelectorAll(selector);
        const results: SvgElement[] = [];

        nodes.forEach((node) => {
            const shard = this.wrapAndRegister(node);
            if (shard) {
                results.push(shard);
            }
        });

        return results;
    }

    queryOne(selector: string): SvgElement | null {
        const node = this._htmlNode.querySelector(selector);
        if (!node) {
            return null;
        }

        return this.wrapAndRegister(node);
    }

    getAll(): SvgElementEntry[] {
        const entries: SvgElementEntry[] = [];
        const counters: Partial<Record<SvgElementTypeKey, number>> = {};

        for (const type of TYPE_ORDER) {
            for (const element of this._elements[type]) {
                const index = (counters[type] ?? 0) + 1;
                counters[type] = index;
                const id = element.id;
                entries.push({
                    type,
                    element,
                    label: id || `${type} #${index}`,
                });
            }
        }

        return entries;
    }

    refresh(): void {
        this._elements = ElementFactory.parseSvgElement(this._htmlNode, this._registry);
    }

    enableAutoRefresh(options?: AutoRefreshOptions): void {
        if (options?.debounceMs !== undefined) {
            this._observeDebounceMs = options.debounceMs;
        }

        if (this._observer) {
            return;
        }

        this._observer = new MutationObserver(() => {
            this.scheduleRefresh();
        });

        this._observer.observe(this._htmlNode, {
            childList: true,
            subtree: true,
            attributes: true,
        });
    }

    disableAutoRefresh(): void {
        if (this._refreshTimer !== null) {
            clearTimeout(this._refreshTimer);
            this._refreshTimer = null;
        }

        this._observer?.disconnect();
        this._observer = null;
    }

    private scheduleRefresh(): void {
        if (this._refreshTimer !== null) {
            clearTimeout(this._refreshTimer);
        }

        this._refreshTimer = setTimeout(() => {
            this._refreshTimer = null;
            this.refresh();
        }, this._observeDebounceMs);
    }

    private findInMap(node: Element): SvgElement | null {
        for (const type of TYPE_ORDER) {
            const match = this._elements[type].find((el) => el.htmlNode === node);
            if (match) {
                return match;
            }
        }

        return null;
    }

    private wrapAndRegister(node: Element): SvgElement | null {
        const existing = this.findInMap(node);
        if (existing) {
            return existing;
        }

        const wrapped = this._registry.wrapNode(node);
        if (!wrapped) {
            return null;
        }

        const mapKey = TAG_TO_MAP_KEY[node.tagName.toLowerCase()];
        if (mapKey) {
            const bucket = this._elements[mapKey];
            if (!bucket.includes(wrapped as never)) {
                bucket.push(wrapped as never);
            }
        }

        return wrapped;
    }
}
