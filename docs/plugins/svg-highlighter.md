# SVG Highlighter Plugin

Optional plugin for highlighting SVG shards one at a time, built on the reactive core (`bindVisual` + signals). Includes an optional zoom/pan/rotate viewport.

## Installation

```bash
npm install @svg-shards/highlighter svg-shards @preact/signals-core
```

From the monorepo:

```bash
npm install file:./plugins/svg-highlighter
```

Package name: `@svg-shards/highlighter`

## Usage

```typescript
import { SvgHighlighter } from '@svg-shards/highlighter';
import { createSvgShards } from 'svg-shards';

// From a DOM element
const highlighter = SvgHighlighter.create(svgElement, {
    highlightColor: '#ff6600',
    strokeWidthBoost: 2,
    observe: true,
});

// Or attach to an existing SvgContainer (e.g. from the core playground)
const container = createSvgShards.fromElement(svgElement)!;
const highlighter = SvgHighlighter.create(container, {
    highlightColor: '#ff6600',
});

highlighter.getElementList().forEach((entry) => {
    console.log(entry.label, entry.type);
});

highlighter.highlightByIndex(0);
highlighter.highlightByIndex(0); // toggles off
highlighter.highlightNext();
highlighter.setHighlightMode('outline');
highlighter.clearHighlight();
```

Selecting a `<g>` entry highlights all non-group descendants inside it.

## Reactive options

`highlightColor` and `highlightMode` accept plain values or `SignalLike` from `svg-shards/reactive`. When bound to a signal, style changes apply live without re-capturing visual state:

```typescript
import { signal } from 'svg-shards/reactive';

const color = signal('#ff6600');
const highlighter = SvgHighlighter.create(container, { highlightColor: color });

highlighter.highlightByIndex(2);
color.value = '#4a90d9'; // active highlight updates reactively
```

Import `signal` from `svg-shards/reactive` (or the same `@preact/signals-core` instance) so effects stay connected.

## Options

| Option             | Default   | Description                                                    |
| ------------------ | --------- | -------------------------------------------------------------- |
| `highlightColor`   | `#ff6600` | Fill/stroke color, or `SignalLike<string>`                     |
| `strokeWidthBoost` | `2`       | Added to current stroke-width                                  |
| `highlightMode`    | `'fill'`  | `'fill'` or `'outline'`, or `SignalLike<HighlightMode>`        |
| `container`        | —         | CSS selector or element for viewport wrapper                   |
| `observe`          | `false`   | Enable MutationObserver when creating a new container from DOM |

## Viewport controls

When `container` is provided, a `ViewportController` is attached:

| Action      | API                                       |
| ----------- | ----------------------------------------- |
| Zoom in/out | `viewport.zoomIn()`, `viewport.zoomOut()` |
| Rotate +90° | `viewport.rotate()`                       |
| Reset       | `viewport.reset()`                        |
| Mouse wheel | Zoom                                      |
| Drag        | Pan                                       |

Access via `highlighter.getViewport()`.

## Playground

**Plugin playground** (standalone):

```bash
cd plugins/svg-highlighter
npm run playground:dev   # http://localhost:3002
```

**Core playground** (plugin lessons under sidebar → Plugins → svg-shards/highlighter):

```bash
npm run playground:dev   # http://localhost:3001
```

**Quick demo** (plugin playground):

```bash
npm run demo             # http://localhost:3000
```

## Cleanup

```typescript
highlighter.destroy();
```

Clears bindings, restores highlighted shards, and disconnects container refresh hooks.
