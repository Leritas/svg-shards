# SvgContainer API

Returned by `createSvgShards.fromElement(element, options?)`.

## Options

```typescript
interface CreateSvgShardsOptions {
    observe?: boolean; // enable MutationObserver auto-refresh
    observeDebounceMs?: number; // debounce ms (default: 16)
}
```

```typescript
const svg = createSvgShards.fromElement(el, { observe: true });
```

## Properties

| Property   | Type              | Description                |
| ---------- | ----------------- | -------------------------- |
| `htmlNode` | `SVGSVGElement`   | Root SVG element           |
| `elements` | `SvgElementMap`   | Shards grouped by type     |
| `registry` | `NodeRegistry`    | WeakMap cache node → shard |
| `width`    | `number`          | Rendered or viewBox width  |
| `height`   | `number`          | Rendered or viewBox height |
| `viewBox`  | `DOMRectReadOnly` | SVG viewBox                |

## Methods

### `getByType(type)`

Typed access to shard arrays:

```typescript
const circles = svg.getByType('circle');
const groups = svg.getByType('group');
```

### `getById(id)`

Find a shard by element `id`. Uses `getElementById` and lazy-wraps nodes not yet in the cache:

```typescript
const sun = svg.getById('sun');
```

### `query(selector)` / `queryOne(selector)`

Find shards by CSS selector (lazy-wraps matching nodes):

```typescript
const steps = svg.query('[data-step]');
const first = svg.queryOne('.highlight');
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

Re-parse the SVG after DOM mutations. Existing shard wrappers are **reused** for unchanged nodes (stable object identity):

```typescript
svg.refresh();
```

### `enableAutoRefresh(options?)` / `disableAutoRefresh()`

Opt-in MutationObserver that debounces and calls `refresh()`:

```typescript
svg.enableAutoRefresh({ debounceMs: 32 });
// later
svg.disableAutoRefresh();
```

## SvgElementMap keys

| Key        | DOM tag      | Class             |
| ---------- | ------------ | ----------------- |
| `rect`     | `<rect>`     | `RectElement`     |
| `circle`   | `<circle>`   | `CircleElement`   |
| `ellipse`  | `<ellipse>`  | `EllipseElement`  |
| `line`     | `<line>`     | `LineElement`     |
| `polygon`  | `<polygon>`  | `PolygonElement`  |
| `polyline` | `<polyline>` | `PolylineElement` |
| `path`     | `<path>`     | `PathElement`     |
| `text`     | `<text>`     | `TextElement`     |
| `image`    | `<image>`    | `ImageElement`    |
| `group`    | `<g>`        | `GroupElement`    |
| `use`      | `<use>`      | `UseElement`      |

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

## Reactive bindings

See [Reactive API](./reactive.md) for `svg-shards/reactive` — signal-driven attribute updates.
