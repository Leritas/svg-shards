# SVG Shards — Architecture & Design Document

## Project Overview

**svg-shards** — TypeScript library for working with SVG as independent, typed shards. OOP wrapper over DOM with full type safety, targeting npm publication.

## Core Philosophy

- **Type-safe**: Full TypeScript support with proper generics
- **OOP-first**: Class-based architecture with inheritance
- **Shard-oriented**: Each SVG primitive is an independent class instance
- **Direct DOM access**: Always provide access to the underlying HTML node via `htmlNode`
- **Minimal abstraction**: Don't hide DOM capabilities, organize them

## v1 Scope (implemented)

### Entry point

```typescript
import { createSvgShards } from 'svg-shards';

const svg = createSvgShards.fromElement(svgRef);
```

### Element access

```typescript
const shapes = svg.elements;
// { rect: RectElement[], circle: CircleElement[], path: PathElement[], group: GroupElement[], ... }

svg.getAll();              // flat list with labels
svg.getById('my-circle');  // find by id
```

### Visual state (highlight support)

```typescript
const prev = shard.applyHighlight({ fill: '#f60', strokeWidthBoost: 2 });
shard.clearHighlight(prev);
```

### Class hierarchy

See [architecture/elements.md](./architecture/elements.md).

## Deferred to roadmap

- `generate(config)`, `fromFile(path)`
- GSAP animation adapter
- Matrix transforms, path operations
- Hierarchical group tree on parse

See [roadmap.md](./roadmap.md) for full backlog.

## Internal docs

- [README.md](./README.md) — index
- [architecture/](./architecture/) — detailed architecture per layer

## Key design decisions (v1)

1. **Element identification**: Flat map by type + index; `getAll()` provides labels (`id` or `"circle #2"`)
2. **Change detection**: Manual `refresh()` after DOM changes; no MutationObserver yet
3. **Mutable API**: Transformations and style changes modify in place
4. **Framework**: Framework-agnostic; adapters in roadmap
5. **Group key**: `elements.group` (mapped from DOM tag `g`)

## Plugin

`plugins/svg-highlighter` — highlight shards sequentially, viewport zoom/pan/rotate. See [public docs](../plugins/svg-highlighter.md).
