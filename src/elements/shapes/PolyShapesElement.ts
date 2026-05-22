import { SvgElement } from '../../core/SvgElement';

export class PolygonElement extends SvgElement {
    constructor(htmlNode: SVGPolygonElement) {
        super(htmlNode);
    }

    get points(): string {
        return this.htmlNode.getAttribute('points') || '';
    }

    set points(value: string) {
        this.htmlNode.setAttribute('points', value);
    }

    get pointsArray(): number[] {
        const points = this.points
            .trim()
            .split(/[\s,]+/)
            .map(Number);
        return points.filter((n) => !isNaN(n));
    }

    set pointsArray(value: number[]) {
        this.points = value.join(' ');
    }
}

export class PolylineElement extends SvgElement {
    constructor(htmlNode: SVGPolylineElement) {
        super(htmlNode);
    }

    get points(): string {
        return this.htmlNode.getAttribute('points') || '';
    }

    set points(value: string) {
        this.htmlNode.setAttribute('points', value);
    }

    get pointsArray(): number[] {
        const points = this.points
            .trim()
            .split(/[\s,]+/)
            .map(Number);
        return points.filter((n) => !isNaN(n));
    }

    set pointsArray(value: number[]) {
        this.points = value.join(' ');
    }
}
