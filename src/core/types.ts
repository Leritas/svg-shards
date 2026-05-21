import type { CircleElement } from '../elements/shapes/CircleElement';
import type { EllipseElement } from '../elements/shapes/EllipseElement';
import type { LineElement } from '../elements/shapes/LineElement';
import type { RectElement } from '../elements/shapes/RectElement';
import type { PolygonElement, PolylineElement } from '../elements/shapes/PolyShapesElement';
import type { GroupElement } from '../elements/GroupElement';
import type { ImageElement } from '../elements/ImageElement';
import type { PathElement } from '../elements/PathElement';
import type { TextElement } from '../elements/TextElement';
import type { UseElement } from '../elements/UseElement';

export type SvgPrimitiveElement = SVGSVGElement | SVGElement;

export enum SvgElementType {
  SVG = 'svg',
  RECT = 'rect',
  CIRCLE = 'circle',
  ELLIPSE = 'ellipse',
  LINE = 'line',
  POLYGON = 'polygon',
  POLYLINE = 'polyline',
  PATH = 'path',
  TEXT = 'text',
  IMAGE = 'image',
  GROUP = 'g',
  USE = 'use',
  DEFS = 'defs',
  CLIP_PATH = 'clipPath',
  MASK = 'mask',
  PATTERN = 'pattern',
  SYMBOL = 'symbol',
  MARKER = 'marker',
}

export interface SvgElementMap {
  rect: RectElement[];
  circle: CircleElement[];
  ellipse: EllipseElement[];
  line: LineElement[];
  polygon: PolygonElement[];
  polyline: PolylineElement[];
  path: PathElement[];
  text: TextElement[];
  image: ImageElement[];
  group: GroupElement[];
  use: UseElement[];
}

export type SvgElementTypeKey = keyof SvgElementMap;

export type SvgElementUnion = SvgElementMap[SvgElementTypeKey][number];

export interface SvgElementEntry {
  type: SvgElementTypeKey;
  element: SvgElementUnion;
  label: string;
}

export interface Point {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface VisualState {
  fill: string | null;
  stroke: string | null;
  strokeWidth: string | null;
  opacity: string | null;
}

export interface HighlightOptions {
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  strokeWidthBoost?: number;
  opacity?: number;
}

export const TAG_TO_MAP_KEY: Record<string, SvgElementTypeKey> = {
  rect: 'rect',
  circle: 'circle',
  ellipse: 'ellipse',
  line: 'line',
  polygon: 'polygon',
  polyline: 'polyline',
  path: 'path',
  text: 'text',
  image: 'image',
  g: 'group',
  use: 'use',
};
