import {
    buildShapeNode,
    type CreateCircleOptions,
    type CreateEllipseOptions,
    type CreateLineOptions,
    type CreateOptionsFor,
    type CreatePathOptions,
    type CreatePolygonOptions,
    type CreatePolylineOptions,
    type CreateRectOptions,
    type ShapeKind,
    type ShardTypeFor,
} from '../create';
import type { GroupElement } from '../elements/GroupElement';
import type {
    CircleElement,
    EllipseElement,
    LineElement,
    PathElement,
    PolygonElement,
    PolylineElement,
    RectElement,
} from '../elements';
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
    private _onAfterRefresh: (() => void) | null = null;

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
        this._onAfterRefresh?.();
    }

    /** Called after every refresh — manual or observer-triggered. */
    onAfterRefresh(callback: (() => void) | null): void {
        this._onAfterRefresh = callback;
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

    createRect(options: CreateRectOptions = {}): RectElement {
        return this.createShape('rect', options);
    }

    createCircle(options: CreateCircleOptions = {}): CircleElement {
        return this.createShape('circle', options);
    }

    createEllipse(options: CreateEllipseOptions = {}): EllipseElement {
        return this.createShape('ellipse', options);
    }

    createLine(options: CreateLineOptions = {}): LineElement {
        return this.createShape('line', options);
    }

    createPolygon(options: CreatePolygonOptions = {}): PolygonElement {
        return this.createShape('polygon', options);
    }

    createPolyline(options: CreatePolylineOptions = {}): PolylineElement {
        return this.createShape('polyline', options);
    }

    createPath(options: CreatePathOptions = {}): PathElement {
        return this.createShape('path', options);
    }

    createMany<K extends ShapeKind>(
        kind: K,
        count: number,
        factory: (index: number) => CreateOptionsFor<K>,
    ): ShardTypeFor<K>[] {
        if (count < 0) {
            throw new RangeError('createMany count must be non-negative');
        }

        if (count === 0) {
            return [];
        }

        const first = factory(0);
        const parentGroup = first.parent;
        const parentNode = this.resolveParentNode(parentGroup);
        const fragment = document.createDocumentFragment();
        const nodes: SVGElement[] = [];

        for (let i = 0; i < count; i++) {
            const options = factory(i);
            const node = buildShapeNode(kind, options);
            fragment.appendChild(node);
            nodes.push(node);
        }

        parentNode.appendChild(fragment);

        const shards: ShardTypeFor<K>[] = [];
        for (const node of nodes) {
            const shard = this.registerNode(node) as ShardTypeFor<K>;
            shards.push(shard);
            if (parentGroup) {
                parentGroup.adoptChild(shard);
            }
        }

        return shards;
    }

    registerNode(node: Element): SvgElement | null {
        return this.wrapAndRegister(node);
    }

    private createShape<K extends ShapeKind>(kind: K, options: CreateOptionsFor<K>): ShardTypeFor<K> {
        const node = buildShapeNode(kind, options);
        const parentNode = this.resolveParentNode(options.parent);
        parentNode.appendChild(node);

        const shard = this.registerNode(node) as ShardTypeFor<K>;
        if (options.parent) {
            options.parent.adoptChild(shard);
        }

        return shard;
    }

    private resolveParentNode(parent?: GroupElement): SVGElement | SVGSVGElement {
        return parent?.htmlNode ?? this._htmlNode;
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
