import { SvgElement } from '../../core/SvgElement';

export class EllipseElement extends SvgElement {
    constructor(htmlNode: SVGEllipseElement) {
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

    moveTo(x: number, y: number): void {
        this.cx = x;
        this.cy = y;
    }

    resize(radiusX: number, radiusY?: number): void {
        this.rx = radiusX;
        if (radiusY !== undefined) {
            this.ry = radiusY;
        }
    }
}
