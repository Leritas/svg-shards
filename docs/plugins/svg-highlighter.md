# SVG Highlighter Plugin

Optional plugin for highlighting SVG shards one at a time, with a zoom/pan/rotate viewport.

## Installation

```bash
# From the monorepo (local development)
npm install file:./plugins/svg-highlighter
```

Package name: `@svg-shards/highlighter`

## Usage

```typescript
import { SvgHighlighter } from '@svg-shards/highlighter';

const highlighter = SvgHighlighter.create(svgElement, {
  highlightColor: '#ff6600',
  strokeWidthBoost: 2,
  container: '#viewport',  // optional viewport wrapper
});

// List all shards (for sidebar UI)
highlighter.getElementList().forEach(entry => {
  console.log(entry.label, entry.type);
});

// Highlight (click same index again to clear)
highlighter.highlightByIndex(0);
highlighter.highlightByIndex(0); // toggles off
highlighter.highlightNext();
highlighter.highlightPrev();
highlighter.clearHighlight();

// Switch mode at runtime (re-applies active highlight)
highlighter.setHighlightMode('outline');
highlighter.getHighlightMode(); // 'fill' | 'outline'

// Groups (`<g>`) highlight all visual descendants together
```

## Options

| Option | Default | Description |
| ------ | ------- | ----------- |
| `highlightColor` | `#ff6600` | Fill and stroke color when highlighted |
| `strokeWidthBoost` | `2` | Added to current stroke-width |
| `highlightMode` | `'fill'` | `'fill'` — solid color, `'outline'` — contour stroke only |
| `container` | — | CSS selector or element for viewport |

## Viewport controls

When `container` is provided, a `ViewportController` is attached:

| Action | API |
| ------ | --- |
| Zoom in/out | `viewport.zoomIn()`, `viewport.zoomOut()` |
| Rotate +90° | `viewport.rotate()` |
| Reset | `viewport.reset()` |
| Mouse wheel | Zoom |
| Drag | Pan |

Access via `highlighter.getViewport()`.

## Demo

```bash
npm run demo
```

Opens at `http://localhost:3000/` (serves the demo folder directly).

## Cleanup

```typescript
highlighter.destroy();
```
