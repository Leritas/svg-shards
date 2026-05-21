import { SvgElement } from '../../core/SvgElement';

export class RectElement extends SvgElement {
  constructor(htmlNode: SVGRectElement) {
    super(htmlNode);
  }

  get rx(): number {
    const rx = this.htmlNode.getAttribute('rx');
    return rx ? parseFloat(rx) : 0;
  }

  set rx(value: number) {
    this.htmlNode.setAttribute('rx', value.toString());
  }

  get ry(): number {
    const ry = this.htmlNode.getAttribute('ry');
    return ry ? parseFloat(ry) : 0;
  }

  set ry(value: number) {
    this.htmlNode.setAttribute('ry', value.toString());
  }

  round(rx: number, ry?: number): void {
    this.rx = rx;
    if (ry !== undefined) {
      this.ry = ry;
    }
  }
}
