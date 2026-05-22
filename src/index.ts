import { SvgContainer } from './core';
import { ElementFactory } from './factories';

export class SvgShardsFactory {
    static fromElement(element: HTMLElement): SvgContainer | null {
        const svgNode = element.closest('svg') as SVGSVGElement;
        if (!svgNode) {
            return null;
        }

        const elements = ElementFactory.parseSvgElement(svgNode);
        return new SvgContainer(svgNode, elements);
    }
}

export const createSvgShards = SvgShardsFactory;

export { SvgContainer, SvgElement } from './core';
export type {
    BoundingBox,
    HighlightOptions,
    Point,
    Size,
    SvgElementEntry,
    SvgElementMap,
    SvgElementTypeKey,
    SvgElementUnion,
    VisualState,
} from './core/types';

export {
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
} from './elements';
