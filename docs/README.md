# SVG Shards Documentation

TypeScript library for working with SVG as independent, typed shards.

## Contents

- [Getting Started](./getting-started.md) — install and first steps
- [API: SvgContainer](./api/container.md) — container methods and properties
- [API: Element Classes](./api/elements.md) — per-shape APIs
- [Plugin: SVG Highlighter](./plugins/svg-highlighter.md) — highlight and viewport tool
- [Examples](./examples/basic-manipulation.md) — common manipulation patterns

## Quick example

```typescript
import { createSvgShards } from 'svg-shards';

const svg = createSvgShards.fromElement(document.querySelector('#my-svg'));
if (!svg) throw new Error('No SVG found');

svg.elements.rect.forEach(rect => {
  rect.fill = '#4a90d9';
  rect.width = 200;
});

svg.elements.circle[0].radius = 50;
svg.elements.circle[0].moveTo(100, 100);
```

## Internal docs (contributors)

See [`.internal/`](../.internal/) for architecture and roadmap.
