# SVG Shards Documentation

TypeScript library for working with SVG as independent, typed shards.

**[Interactive Playground](https://leritas.github.io/svg-shards/)** — live tutorial for the core API (recommended starting point).

## Contents

- [Getting Started](./getting-started.md) — install and first steps
- [API: SvgContainer](./api/container.md) — container methods and properties
- [API: Reactive bindings](./api/reactive.md) — signal-driven updates (`svg-shards/reactive`)
- [API: Transforms & sizing](./api/transforms.md) — `resize` vs `scale` vs `scaleAt`
- [API: Element Classes](./api/elements.md) — per-shape APIs
- [Plugin: SVG Highlighter](./plugins/svg-highlighter.md) — highlight and viewport tool
- [Plugin: SVG Particles](./plugins/svg-particles.md) — spawn and simulate circle particle fields
- [Examples](./examples/basic-manipulation.md) — common manipulation patterns

## Quick example

```typescript
import { createSvgShards } from 'svg-shards';

const svg = createSvgShards.fromElement(document.querySelector('#my-svg'));
if (!svg) throw new Error('No SVG found');

svg.elements.rect.forEach((rect) => {
    rect.fill = '#4a90d9';
    rect.width = 200;
});

svg.elements.circle[0].radius = 50;
svg.elements.circle[0].moveTo(100, 100);
```

## Internal docs (contributors)

See [`.internal/`](./.internal/) for architecture, roadmap, and [npm publishing runbook](./.internal/publishing.md).
