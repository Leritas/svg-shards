import { NodeRegistry } from '../core/NodeRegistry';
import { SvgElementMap, SvgElementType, TAG_TO_MAP_KEY } from '../core/types';
import {
    RectElement,
    CircleElement,
    EllipseElement,
    LineElement,
    PolygonElement,
    PolylineElement,
    PathElement,
    TextElement,
    ImageElement,
    GroupElement,
    UseElement,
} from '../elements';

export type ParsedSvgElement =
    | RectElement
    | CircleElement
    | EllipseElement
    | LineElement
    | PolygonElement
    | PolylineElement
    | PathElement
    | TextElement
    | ImageElement
    | GroupElement
    | UseElement;

function createEmptyMap(): SvgElementMap {
    return {
        rect: [],
        circle: [],
        ellipse: [],
        line: [],
        polygon: [],
        polyline: [],
        path: [],
        text: [],
        image: [],
        group: [],
        use: [],
    };
}

export class ElementFactory {
    static createElementFromNode(node: Element): ParsedSvgElement | null {
        const tagName = node.tagName.toLowerCase();

        switch (tagName) {
            case SvgElementType.RECT:
                return new RectElement(node as SVGRectElement);
            case SvgElementType.CIRCLE:
                return new CircleElement(node as SVGCircleElement);
            case SvgElementType.ELLIPSE:
                return new EllipseElement(node as SVGEllipseElement);
            case SvgElementType.LINE:
                return new LineElement(node as SVGLineElement);
            case SvgElementType.POLYGON:
                return new PolygonElement(node as SVGPolygonElement);
            case SvgElementType.POLYLINE:
                return new PolylineElement(node as SVGPolylineElement);
            case SvgElementType.PATH:
                return new PathElement(node as SVGPathElement);
            case SvgElementType.TEXT:
                return new TextElement(node as SVGTextElement);
            case SvgElementType.IMAGE:
                return new ImageElement(node as SVGImageElement);
            case SvgElementType.GROUP:
                return new GroupElement(node as SVGGElement);
            case SvgElementType.USE:
                return new UseElement(node as SVGUseElement);
            default:
                return null;
        }
    }

    static parseSvgElement(svgNode: SVGSVGElement, registry: NodeRegistry): SvgElementMap {
        const elements = createEmptyMap();
        const descendants = svgNode.querySelectorAll('*');

        descendants.forEach((node) => {
            const element = registry.getOrCreate(node);
            if (!element) {
                return;
            }

            const mapKey = TAG_TO_MAP_KEY[node.tagName.toLowerCase()];
            if (mapKey) {
                elements[mapKey].push(element as never);
            }
        });

        this.populateGroupChildren(elements, registry);

        return elements;
    }

    private static populateGroupChildren(elements: SvgElementMap, registry: NodeRegistry): void {
        for (const group of elements.group) {
            const children: ParsedSvgElement[] = [];

            for (const childNode of Array.from(group.htmlNode.children)) {
                const child = registry.get(childNode);
                if (child) {
                    children.push(child);
                }
            }

            group.syncChildrenFromParse(children);
        }
    }
}
