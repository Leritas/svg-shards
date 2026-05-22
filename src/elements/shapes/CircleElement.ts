import { SvgElement } from '../../core/SvgElement';

export class CircleElement extends SvgElement {
    constructor(htmlNode: SVGCircleElement) {
        super(htmlNode);
    }

    get cx(): number {
        const cx = this.htmlNode.getAttribute('cx');
        return cx ? parseFloat(cx) : 0;
    }

    set cx(value: number) {
        this.htmlNode.setAttribute('cx', value.toString());
    }

    get cy(): number {
        const cy = this.htmlNode.getAttribute('cy');
        return cy ? parseFloat(cy) : 0;
    }

    set cy(value: number) {
        this.htmlNode.setAttribute('cy', value.toString());
    }

    get r(): number {
        const r = this.htmlNode.getAttribute('r');
        return r ? parseFloat(r) : 0;
    }

    set r(value: number) {
        this.htmlNode.setAttribute('r', value.toString());
    }

    get radius(): number {
        return this.r;
    }

    set radius(value: number) {
        this.r = value;
    }

    moveTo(x: number, y: number): void {
        this.cx = x;
        this.cy = y;
    }

    resize(radius: number): void {
        this.r = radius;
    }
}
