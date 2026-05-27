import type { Point } from '../core/types';
import type {
    CreateCircleOptions,
    CreateEllipseOptions,
    CreateLineOptions,
    CreatePathOptions,
    CreatePolygonOptions,
    CreatePolylineOptions,
    CreateRectOptions,
    CreateShapeBase,
    PointsInput,
    ShapeKind,
} from './types';
import { SHAPE_KIND_TO_TAG } from './types';

export const SVG_NS = 'http://www.w3.org/2000/svg';

export function formatPoints(points: PointsInput): string {
    if (typeof points === 'string') {
        return points;
    }

    if (Array.isArray(points) && points.length > 0 && typeof points[0] === 'number') {
        return (points as number[]).join(' ');
    }

    return (points as Point[]).map((p) => `${p.x},${p.y}`).join(' ');
}

export function applyBaseAttrs(node: SVGElement, options: CreateShapeBase): void {
    if (options.id !== undefined) {
        node.id = options.id;
    }

    if (options.fill !== undefined) {
        node.setAttribute('fill', options.fill);
    }

    if (options.stroke !== undefined) {
        node.setAttribute('stroke', options.stroke);
    }

    if (options.strokeWidth !== undefined) {
        node.setAttribute('stroke-width', options.strokeWidth.toString());
    }

    if (options.opacity !== undefined) {
        node.setAttribute('opacity', options.opacity.toString());
    }

    if (options.className !== undefined) {
        node.setAttribute('class', options.className);
    }
}

function setNumericAttr(node: SVGElement, name: string, value: number | undefined): void {
    if (value !== undefined) {
        node.setAttribute(name, value.toString());
    }
}

export function buildShapeNode(kind: ShapeKind, options: CreateShapeBase): SVGElement {
    const tag = SHAPE_KIND_TO_TAG[kind];
    const node = document.createElementNS(SVG_NS, tag);
    applyBaseAttrs(node, options);

    switch (kind) {
        case 'rect': {
            const opts = options as CreateRectOptions;
            setNumericAttr(node, 'x', opts.x);
            setNumericAttr(node, 'y', opts.y);
            setNumericAttr(node, 'width', opts.width);
            setNumericAttr(node, 'height', opts.height);
            setNumericAttr(node, 'rx', opts.rx);
            setNumericAttr(node, 'ry', opts.ry);
            break;
        }
        case 'circle': {
            const opts = options as CreateCircleOptions;
            setNumericAttr(node, 'cx', opts.cx);
            setNumericAttr(node, 'cy', opts.cy);
            setNumericAttr(node, 'r', opts.r);
            break;
        }
        case 'ellipse': {
            const opts = options as CreateEllipseOptions;
            setNumericAttr(node, 'cx', opts.cx);
            setNumericAttr(node, 'cy', opts.cy);
            setNumericAttr(node, 'rx', opts.rx);
            setNumericAttr(node, 'ry', opts.ry);
            break;
        }
        case 'line': {
            const opts = options as CreateLineOptions;
            setNumericAttr(node, 'x1', opts.x1);
            setNumericAttr(node, 'y1', opts.y1);
            setNumericAttr(node, 'x2', opts.x2);
            setNumericAttr(node, 'y2', opts.y2);
            break;
        }
        case 'polygon': {
            const opts = options as CreatePolygonOptions;
            if (opts.points !== undefined) {
                node.setAttribute('points', formatPoints(opts.points));
            }
            break;
        }
        case 'polyline': {
            const opts = options as CreatePolylineOptions;
            if (opts.points !== undefined) {
                node.setAttribute('points', formatPoints(opts.points));
            }
            break;
        }
        case 'path': {
            const opts = options as CreatePathOptions;
            if (opts.d !== undefined) {
                node.setAttribute('d', opts.d);
            }
            break;
        }
    }

    return node;
}
