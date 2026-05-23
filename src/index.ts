import { SvgContainer } from './core';
import { CreateSvgShardsOptions } from './core/options';
import { NodeRegistry } from './core/NodeRegistry';
import { ElementFactory } from './factories';

export class SvgShardsFactory {
    static fromElement(element: HTMLElement, options?: CreateSvgShardsOptions): SvgContainer | null {
        const svgNode = element.closest('svg') as SVGSVGElement;
        if (!svgNode) {
            return null;
        }

        const registry = new NodeRegistry();
        const elements = ElementFactory.parseSvgElement(svgNode, registry);
        return new SvgContainer(svgNode, elements, registry, options);
    }
}

export const createSvgShards = SvgShardsFactory;

export { SvgContainer, SvgElement } from './core';
export { NodeRegistry } from './core/NodeRegistry';
export { Transformation } from './core/Transformation';
export type { CreateSvgShardsOptions, AutoRefreshOptions } from './core/options';
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
