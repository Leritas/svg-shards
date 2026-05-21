import { SvgElement } from '../../core/SvgElement';

export class LineElement extends SvgElement {
  constructor(htmlNode: SVGLineElement) {
    super(htmlNode);
  }

  get x1(): number {
    const x1 = this.htmlNode.getAttribute('x1');
    return x1 ? parseFloat(x1) : 0;
  }

  set x1(value: number) {
    this.htmlNode.setAttribute('x1', value.toString());
  }

  get y1(): number {
    const y1 = this.htmlNode.getAttribute('y1');
    return y1 ? parseFloat(y1) : 0;
  }

  set y1(value: number) {
    this.htmlNode.setAttribute('y1', value.toString());
  }

  get x2(): number {
    const x2 = this.htmlNode.getAttribute('x2');
    return x2 ? parseFloat(x2) : 0;
  }

  set x2(value: number) {
    this.htmlNode.setAttribute('x2', value.toString());
  }

  get y2(): number {
    const y2 = this.htmlNode.getAttribute('y2');
    return y2 ? parseFloat(y2) : 0;
  }

  set y2(value: number) {
    this.htmlNode.setAttribute('y2', value.toString());
  }

  moveTo(x: number, y: number): void {
    const dx = x - this.x1;
    const dy = y - this.y1;
    this.x1 = x;
    this.y1 = y;
    this.x2 += dx;
    this.y2 += dy;
  }

  resize(length: number): void {
    const currentLength = Math.sqrt(Math.pow(this.x2 - this.x1, 2) + Math.pow(this.y2 - this.y1, 2));
    const ratio = currentLength > 0 ? length / currentLength : 1;
    const centerX = (this.x1 + this.x2) / 2;
    const centerY = (this.y1 + this.y2) / 2;
    this.x1 = centerX + (this.x1 - centerX) * ratio;
    this.y1 = centerY + (this.y1 - centerY) * ratio;
    this.x2 = centerX + (this.x2 - centerX) * ratio;
    this.y2 = centerY + (this.y2 - centerY) * ratio;
  }
}
