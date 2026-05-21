import { ElementFactory } from '../factories/ElementFactory';
import { SvgElement } from './SvgElement';
import { SvgElementEntry, SvgElementMap, SvgElementTypeKey } from './types';

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

  constructor(htmlNode: SVGSVGElement, elements: SvgElementMap) {
    this._htmlNode = htmlNode;
    this._elements = elements;
  }

  get htmlNode(): SVGSVGElement {
    return this._htmlNode;
  }

  get elements(): SvgElementMap {
    return this._elements;
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
    const node = this._htmlNode.querySelector(`[id="${id.replace(/"/g, '\\"')}"]`);
    if (!node) {
      return null;
    }

    for (const type of TYPE_ORDER) {
      const match = this._elements[type].find(el => el.htmlNode === node);
      if (match) {
        return match;
      }
    }

    return null;
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
    this._elements = ElementFactory.parseSvgElement(this._htmlNode);
  }
}
