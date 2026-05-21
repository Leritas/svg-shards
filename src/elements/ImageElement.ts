import { SvgElement } from '../core/SvgElement';

function readHref(node: Element): string | null {
  return node.getAttribute('href') ?? node.getAttributeNS('http://www.w3.org/1999/xlink', 'href');
}

function writeHref(node: Element, value: string | null): void {
  if (value === null) {
    node.removeAttribute('href');
    node.removeAttributeNS('http://www.w3.org/1999/xlink', 'href');
    return;
  }

  node.setAttribute('href', value);
}

export class ImageElement extends SvgElement {
  constructor(htmlNode: SVGImageElement) {
    super(htmlNode);
  }

  get href(): string | null {
    return readHref(this.htmlNode);
  }

  set href(value: string | null) {
    writeHref(this.htmlNode, value);
  }

  get preserveAspectRatio(): string {
    return this.htmlNode.getAttribute('preserveAspectRatio') || 'xMidYMid meet';
  }

  set preserveAspectRatio(value: string) {
    this.htmlNode.setAttribute('preserveAspectRatio', value);
  }
}
