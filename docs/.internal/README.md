# SVG Shards — Internal Documentation

Developer-facing documentation for contributors and AI agents.

## Index

| Document | Purpose |
| -------- | ------- |
| [design.md](./design.md) | Original vision, v1 scope, design decisions |
| [roadmap.md](./roadmap.md) | Future ideas backlog |
| [architecture/overview.md](./architecture/overview.md) | Layer diagram, data flow, naming |
| [architecture/core.md](./architecture/core.md) | SvgElement, SvgContainer, types |
| [architecture/factory.md](./architecture/factory.md) | Parsing, tag mapping, refresh |
| [architecture/elements.md](./architecture/elements.md) | Element class hierarchy |

## Quick reference

```typescript
import { createSvgShards } from 'svg-shards';

const svg = createSvgShards.fromElement(svgRef);
svg.getAll();           // flat shard list with labels
svg.getById('my-id');   // find by id
svg.elements.rect[0];   // typed access by kind
```

## Conventions

- **Shard** = one SVG DOM element wrapped in a typed class
- **Mutable API** — all changes write directly to DOM
- **Flat map** — `elements` groups shards by tag type; nested `<g>` children appear in type arrays, not in `GroupElement.children` (v2)
- Browser-only, zero runtime dependencies
