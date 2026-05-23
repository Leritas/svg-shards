import { ElementFactory, ParsedSvgElement } from '../factories/ElementFactory';
import { SvgElementUnion } from './types';

export class NodeRegistry {
    private _cache = new WeakMap<Element, SvgElementUnion>();

    get(node: Element): SvgElementUnion | undefined {
        return this._cache.get(node);
    }

    wrapNode(node: Element): ParsedSvgElement | null {
        const cached = this._cache.get(node);
        if (cached) {
            return cached;
        }

        const created = ElementFactory.createElementFromNode(node);
        if (created) {
            this._cache.set(node, created);
        }

        return created;
    }

    getOrCreate(node: Element): ParsedSvgElement | null {
        return this.wrapNode(node);
    }
}
