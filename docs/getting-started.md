# Getting Started

## Installation

```bash
npm install svg-shards
```

## Basic usage

Wrap an existing in-page SVG:

```typescript
import { createSvgShards } from 'svg-shards';

const svgElement = document.querySelector('#diagram');
const svg = createSvgShards.fromElement(svgElement);

if (!svg) {
    console.error('Element is not inside an SVG');
    return;
}

// Access shards by type
console.log(svg.elements.circle.length);
console.log(svg.elements.path[0].d);

// Flat list with labels (for UI sidebars, etc.)
svg.getAll().forEach((entry) => {
    console.log(entry.label, entry.type);
});
```

## Manipulating shards

All changes write directly to the DOM:

```typescript
const rect = svg.elements.rect[0];
rect.fill = '#ff0000';
rect.stroke = '#000';
rect.strokeWidth = 2;
rect.moveTo(50, 50);
rect.resize(120, 80);

const circle = svg.elements.circle[0];
circle.radius = 40; // alias for circle.r
circle.cx = 200;
circle.cy = 150;
```

## Creating new shards

Use the container create API — shards are registered immediately without a full `refresh()`:

```typescript
const dot = svg.createCircle({ cx: 100, cy: 100, r: 20, fill: '#0f0' });

const many = svg.createMany('circle', 50, (i) => ({
    cx: Math.random() * 400,
    cy: Math.random() * 300,
    r: 3,
}));
```

For low-level DOM edits, you can still append nodes manually and call `refresh()` or enable auto-sync:

```typescript
// Manual DOM + refresh (legacy)
const newRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
svg.htmlNode.appendChild(newRect);
svg.refresh();

// Auto (MutationObserver)
const svg = createSvgShards.fromElement(el, { observe: true });
```

Shard wrappers for existing DOM nodes keep the same object identity across `refresh()`.

## Reactive updates

For high-frequency updates (animations, particles), use the reactive subpath:

```typescript
import { signal, bindProperty } from 'svg-shards/reactive';

const cx = signal(50);
bindProperty(circle, 'cx', cx);
cx.value = 120; // updates only cx in the DOM
```

See [Reactive API](./api/reactive.md).

## Direct DOM access

Every shard exposes its underlying node:

```typescript
shard.htmlNode.setAttribute('data-custom', 'value');
```

## Browser requirement

svg-shards requires a browser DOM (`document`, `SVGElement`). It does not run in Node.js without a DOM shim.

## Next steps

- [SvgContainer API](./api/container.md)
- [Element classes](./api/elements.md)
- [SVG Highlighter plugin](./plugins/svg-highlighter.md)
