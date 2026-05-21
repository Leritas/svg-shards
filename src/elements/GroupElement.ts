import { SvgElement } from '../core/SvgElement';
import type { SvgElementUnion } from '../core/types';

export class GroupElement extends SvgElement {
  private _children: SvgElementUnion[] = [];

  constructor(htmlNode: SVGGElement) {
    super(htmlNode);
  }

  get children(): SvgElementUnion[] {
    return this._children;
  }

  addChild(element: SvgElementUnion): void {
    this._children.push(element);
    this.htmlNode.appendChild(element.htmlNode);
  }

  removeChild(element: SvgElementUnion): void {
    const index = this._children.indexOf(element);
    if (index > -1) {
      this._children.splice(index, 1);
    }
    element.htmlNode.remove();
  }
}
