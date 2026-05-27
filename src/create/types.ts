import type { CircleElement } from '../elements/shapes/CircleElement';
import type { EllipseElement } from '../elements/shapes/EllipseElement';
import type { LineElement } from '../elements/shapes/LineElement';
import type { PolygonElement, PolylineElement } from '../elements/shapes/PolyShapesElement';
import type { RectElement } from '../elements/shapes/RectElement';
import type { PathElement } from '../elements/PathElement';
import type { GroupElement } from '../elements/GroupElement';
import type { Point } from '../core/types';

export type ShapeKind = 'rect' | 'circle' | 'ellipse' | 'line' | 'polygon' | 'polyline' | 'path';

export interface CreateShapeBase {
    id?: string;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    opacity?: number;
    className?: string;
    parent?: GroupElement;
}

export interface CreateRectOptions extends CreateShapeBase {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    rx?: number;
    ry?: number;
}

export interface CreateCircleOptions extends CreateShapeBase {
    cx?: number;
    cy?: number;
    r?: number;
}

export interface CreateEllipseOptions extends CreateShapeBase {
    cx?: number;
    cy?: number;
    rx?: number;
    ry?: number;
}

export interface CreateLineOptions extends CreateShapeBase {
    x1?: number;
    y1?: number;
    x2?: number;
    y2?: number;
}

export type PointsInput = string | Point[] | number[];

export interface CreatePolygonOptions extends CreateShapeBase {
    points?: PointsInput;
}

export interface CreatePolylineOptions extends CreateShapeBase {
    points?: PointsInput;
}

export interface CreatePathOptions extends CreateShapeBase {
    d?: string;
}

export type CreateOptionsFor<K extends ShapeKind> = K extends 'rect'
    ? CreateRectOptions
    : K extends 'circle'
      ? CreateCircleOptions
      : K extends 'ellipse'
        ? CreateEllipseOptions
        : K extends 'line'
          ? CreateLineOptions
          : K extends 'polygon'
            ? CreatePolygonOptions
            : K extends 'polyline'
              ? CreatePolylineOptions
              : K extends 'path'
                ? CreatePathOptions
                : never;

export type ShardTypeFor<K extends ShapeKind> = K extends 'rect'
    ? RectElement
    : K extends 'circle'
      ? CircleElement
      : K extends 'ellipse'
        ? EllipseElement
        : K extends 'line'
          ? LineElement
          : K extends 'polygon'
            ? PolygonElement
            : K extends 'polyline'
              ? PolylineElement
              : K extends 'path'
                ? PathElement
                : never;

export const SHAPE_KIND_TO_TAG: Record<ShapeKind, string> = {
    rect: 'rect',
    circle: 'circle',
    ellipse: 'ellipse',
    line: 'line',
    polygon: 'polygon',
    polyline: 'polyline',
    path: 'path',
};
