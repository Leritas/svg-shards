import { SvgElement } from '../core/SvgElement';

export class TextElement extends SvgElement {
    constructor(htmlNode: SVGTextElement) {
        super(htmlNode);
    }

    get textContentValue(): string {
        return this.htmlNode.textContent || '';
    }

    set textContentValue(value: string) {
        this.htmlNode.textContent = value;
    }

    get fontSize(): string {
        return this.htmlNode.getAttribute('font-size') || '16px';
    }

    set fontSize(value: string) {
        this.htmlNode.setAttribute('font-size', value);
    }

    get fontFamily(): string {
        return this.htmlNode.getAttribute('font-family') || 'sans-serif';
    }

    set fontFamily(value: string) {
        this.htmlNode.setAttribute('font-family', value);
    }

    get fontWeight(): string {
        return this.htmlNode.getAttribute('font-weight') || 'normal';
    }

    set fontWeight(value: string) {
        this.htmlNode.setAttribute('font-weight', value);
    }
}
