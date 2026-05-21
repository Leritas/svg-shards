# SvgContainer API

Returned by `createSvgShards.fromElement()`.

## Properties

| Property | Type | Description |
| -------- | ---- | ----------- |
| `htmlNode` | `SVGSVGElement` | Root SVG element |
| `elements` | `SvgElementMap` | Shards grouped by type |
| `width` | `number` | Rendered or viewBox width |
| `height` | `number` | Rendered or viewBox height |
| `viewBox` | `DOMRectReadOnly` | SVG viewBox |

## Methods

### `getByType(type)`

Typed access to shard arrays:

```typescript
const circles = svg.getByType('circle');
const groups = svg.getByType('group');
```

### `getById(id)`

Find a shard by element `id`:

```typescript
const sun = svg.getById('sun');
```

### `getAll()`

Flat list of all shards with metadata:

```typescript
interface SvgElementEntry {
  type: 'rect' | 'circle' | ... ;
  element: SvgElementUnion;
  label: string;  // id or "circle #2"
}
```

### `refresh()`

Re-parse the SVG after DOM mutations:

```typescript
svg.refresh();
```

## SvgElementMap keys

| Key | DOM tag | Class |
| --- | ------- | ----- |
| `rect` | `<rect>` | `RectElement` |
| `circle` | `<circle>` | `CircleElement` |
| `ellipse` | `<ellipse>` | `EllipseElement` |
| `line` | `<line>` | `LineElement` |
| `polygon` | `<polygon>` | `PolygonElement` |
| `polyline` | `<polyline>` | `PolylineElement` |
| `path` | `<path>` | `PathElement` |
| `text` | `<text>` | `TextElement` |
| `image` | `<image>` | `ImageElement` |
| `group` | `<g>` | `GroupElement` |
| `use` | `<use>` | `UseElement` |

## Visual state helpers

Available on every shard (via `SvgElement` base):

```typescript
const prev = shard.applyHighlight({
  fill: '#ff6600',
  stroke: '#ff6600',
  strokeWidthBoost: 2,
});

shard.clearHighlight(prev);
```

See [Element classes](./elements.md) for per-type properties.
