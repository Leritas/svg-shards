# Element Classes

All element classes extend `SvgElement` and share base properties:

**Style:** `fill`, `stroke`, `strokeWidth`, `opacity`, `transform`

**Transforms:** `translate(dx, dy)`, `rotate(angle, cx?, cy?)`, `scale(sx, sy?)`, `scaleAt(sx, sy, cx, cy)`

See [Transforms & sizing](./transforms.md) for `resize` vs `scale` vs `scaleAt`.

**DOM:** `htmlNode`, `id`, `getBoundingBox()`, `remove()`, classList helpers

## RectElement

```typescript
(rect.x, rect.y, rect.width, rect.height);
(rect.rx, rect.ry);
rect.round(8); // set corner radius
rect.moveTo(x, y);
rect.resize(w, h);
```

## CircleElement

```typescript
(circle.cx, circle.cy, circle.r);
circle.radius; // alias for r
circle.moveTo(x, y); // sets cx, cy
circle.resize(r); // sets r
```

## EllipseElement

```typescript
ellipse.cx, ellipse.cy, ellipse.rx, ellipse.ry
ellipse.moveTo(x, y)
ellipse.resize(rx, ry?)
```

## LineElement

```typescript
(line.x1, line.y1, line.x2, line.y2);
line.moveTo(x, y); // translates both endpoints
line.resize(length);
```

## PolygonElement / PolylineElement

```typescript
shape.points; // "10,20 30,40 ..."
shape.pointsArray; // [10, 20, 30, 40, ...]
```

## PathElement

```typescript
path.d;
path.pathLength;
path.getPointAtLength(distance);
```

## TextElement

```typescript
text.textContentValue;
(text.fontSize, text.fontFamily, text.fontWeight);
(text.x, text.y);
```

## ImageElement

```typescript
image.href; // supports href and xlink:href
image.preserveAspectRatio;
(image.x, image.y, image.width, image.height);
```

## GroupElement

```typescript
group.children; // manually managed in v1
group.addChild(shard);
group.removeChild(shard);
```

## UseElement

```typescript
use.href; // supports href and xlink:href
(use.x, use.y);
```
