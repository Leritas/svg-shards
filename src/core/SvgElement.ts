import { BoundingBox, HighlightOptions, SvgPrimitiveElement, VisualState } from './types';

export abstract class SvgElement {
    protected _htmlNode: SvgPrimitiveElement;

    constructor(htmlNode: SvgPrimitiveElement) {
        this._htmlNode = htmlNode;
    }

    get htmlNode(): SvgPrimitiveElement {
        return this._htmlNode;
    }

    get id(): string {
        return this._htmlNode.id || '';
    }

    set id(value: string) {
        this._htmlNode.id = value;
    }

    get x(): number {
        const x = this._htmlNode.getAttribute('x');
        return x ? parseFloat(x) : 0;
    }

    set x(value: number) {
        this._htmlNode.setAttribute('x', value.toString());
    }

    get y(): number {
        const y = this._htmlNode.getAttribute('y');
        return y ? parseFloat(y) : 0;
    }

    set y(value: number) {
        this._htmlNode.setAttribute('y', value.toString());
    }

    get width(): number {
        const width = this._htmlNode.getAttribute('width');
        return width ? parseFloat(width) : 0;
    }

    set width(value: number) {
        this._htmlNode.setAttribute('width', value.toString());
    }

    get height(): number {
        const height = this._htmlNode.getAttribute('height');
        return height ? parseFloat(height) : 0;
    }

    set height(value: number) {
        this._htmlNode.setAttribute('height', value.toString());
    }

    get fill(): string | null {
        return this._htmlNode.getAttribute('fill');
    }

    set fill(value: string | null) {
        if (value === null) {
            this._htmlNode.removeAttribute('fill');
        } else {
            this._htmlNode.setAttribute('fill', value);
        }
    }

    get stroke(): string | null {
        return this._htmlNode.getAttribute('stroke');
    }

    set stroke(value: string | null) {
        if (value === null) {
            this._htmlNode.removeAttribute('stroke');
        } else {
            this._htmlNode.setAttribute('stroke', value);
        }
    }

    get strokeWidth(): number {
        const strokeWidth = this._htmlNode.getAttribute('stroke-width');
        return strokeWidth ? parseFloat(strokeWidth) : 1;
    }

    set strokeWidth(value: number) {
        this._htmlNode.setAttribute('stroke-width', value.toString());
    }

    get opacity(): number {
        const opacity = this._htmlNode.getAttribute('opacity');
        return opacity ? parseFloat(opacity) : 1;
    }

    set opacity(value: number) {
        this._htmlNode.setAttribute('opacity', value.toString());
    }

    get transform(): string | null {
        return this._htmlNode.getAttribute('transform');
    }

    set transform(value: string | null) {
        if (value === null) {
            this._htmlNode.removeAttribute('transform');
        } else {
            this._htmlNode.setAttribute('transform', value);
        }
    }

    get style(): CSSStyleDeclaration {
        return this._htmlNode.style;
    }

    moveTo(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    resize(width: number, height: number): void {
        this.width = width;
        this.height = height;
    }

    translate(dx: number, dy: number): void {
        const currentTransform = this.transform || '';
        this.transform = `translate(${dx}, ${dy}) ${currentTransform}`.trim();
    }

    rotate(angle: number, cx = 0, cy = 0): void {
        const currentTransform = this.transform || '';
        if (cx === 0 && cy === 0) {
            this.transform = `rotate(${angle}) ${currentTransform}`.trim();
        } else {
            this.transform = `rotate(${angle}, ${cx}, ${cy}) ${currentTransform}`.trim();
        }
    }

    scale(sx: number, sy?: number): void {
        const syValue = sy ?? sx;
        const currentTransform = this.transform || '';
        this.transform = `scale(${sx}, ${syValue}) ${currentTransform}`.trim();
    }

    captureVisualState(): VisualState {
        return {
            fill: this._htmlNode.getAttribute('fill'),
            stroke: this._htmlNode.getAttribute('stroke'),
            strokeWidth: this._htmlNode.getAttribute('stroke-width'),
            opacity: this._htmlNode.getAttribute('opacity'),
        };
    }

    applyVisualState(state: VisualState): void {
        if (state.fill === null) {
            this._htmlNode.removeAttribute('fill');
        } else {
            this._htmlNode.setAttribute('fill', state.fill);
        }

        if (state.stroke === null) {
            this._htmlNode.removeAttribute('stroke');
        } else {
            this._htmlNode.setAttribute('stroke', state.stroke);
        }

        if (state.strokeWidth === null) {
            this._htmlNode.removeAttribute('stroke-width');
        } else {
            this._htmlNode.setAttribute('stroke-width', state.strokeWidth);
        }

        if (state.opacity === null) {
            this._htmlNode.removeAttribute('opacity');
        } else {
            this._htmlNode.setAttribute('opacity', state.opacity);
        }
    }

    applyHighlight(options: HighlightOptions): VisualState {
        const previous = this.captureVisualState();

        if (options.fill !== undefined) {
            this.fill = options.fill;
        }

        if (options.stroke !== undefined) {
            this.stroke = options.stroke;
        }

        if (options.strokeWidth !== undefined) {
            this.strokeWidth = options.strokeWidth;
        } else if (options.strokeWidthBoost !== undefined) {
            this.strokeWidth = this.strokeWidth + options.strokeWidthBoost;
        }

        if (options.opacity !== undefined) {
            this.opacity = options.opacity;
        }

        return previous;
    }

    clearHighlight(previousState: VisualState): void {
        this.applyVisualState(previousState);
    }

    getBoundingBox(): BoundingBox {
        const graphicsElement = this._htmlNode as SVGGraphicsElement;
        if (typeof graphicsElement.getBBox !== 'function') {
            return { x: 0, y: 0, width: 0, height: 0 };
        }
        const bbox = graphicsElement.getBBox();
        return {
            x: bbox.x,
            y: bbox.y,
            width: bbox.width,
            height: bbox.height,
        };
    }

    remove(): void {
        this._htmlNode.remove();
    }

    addClass(className: string): void {
        this._htmlNode.classList.add(className);
    }

    removeClass(className: string): void {
        this._htmlNode.classList.remove(className);
    }

    hasClass(className: string): boolean {
        return this._htmlNode.classList.contains(className);
    }

    toggleClass(className: string): void {
        this._htmlNode.classList.toggle(className);
    }

    setAttribute(name: string, value: string): void {
        this._htmlNode.setAttribute(name, value);
    }

    getAttribute(name: string): string | null {
        return this._htmlNode.getAttribute(name);
    }

    removeAttribute(name: string): void {
        this._htmlNode.removeAttribute(name);
    }
}
