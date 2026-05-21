import { SvgElement } from '../core/SvgElement';

export class PathElement extends SvgElement {
  private _geometry: SVGGeometryElement;

  constructor(htmlNode: SVGPathElement) {
    super(htmlNode);
    this._geometry = htmlNode;
  }

  get d(): string {
    return this.htmlNode.getAttribute('d') || '';
  }

  set d(value: string) {
    this.htmlNode.setAttribute('d', value);
  }

  get pathLength(): number {
    return this._geometry.getTotalLength();
  }

  getPointAtLength(distance: number): DOMPoint {
    return this._geometry.getPointAtLength(distance);
  }
}
