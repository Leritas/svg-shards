# Element Classes

## Hierarchy

```
SvgElement (abstract)
├── RectElement          — rx, ry, round()
├── CircleElement        — cx, cy, r, radius alias, moveTo, resize
├── EllipseElement       — cx, cy, rx, ry, moveTo, resize
├── LineElement          — x1/y1/x2/y2, moveTo (translates both ends), resize
├── PolygonElement       — points, pointsArray
├── PolylineElement      — points, pointsArray
├── PathElement          — d, pathLength, getPointAtLength
├── TextElement          — textContentValue, fontSize, fontFamily, fontWeight
├── ImageElement         — href (with xlink fallback), preserveAspectRatio
├── GroupElement         — children, addChild, removeChild
└── UseElement           — href (with xlink fallback)
```

## Overrides

Classes override `moveTo` / `resize` when base x/y semantics don't apply:

| Class          | moveTo sets               | resize sets        |
| -------------- | ------------------------- | ------------------ |
| CircleElement  | cx, cy                    | r                  |
| EllipseElement | cx, cy                    | rx (+ optional ry) |
| LineElement    | translates both endpoints | scales length      |

## xlink:href fallback

`ImageElement` and `UseElement` read/write both `href` and `xlink:href` for legacy SVG compatibility.

## Type safety

Constructors accept specific SVG DOM types (`SVGRectElement`, `SVGCircleElement`, etc.) instead of `any`.

Element classes do NOT redeclare `htmlNode` — they inherit the typed getter from `SvgElement`.
