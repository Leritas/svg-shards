# SVG Shards

TypeScript library for working with SVG as independent, typed shards — parse, query, and manipulate each element with a clean OOP API.

## Installation

```bash
npm install svg-shards
```

## Quick Start

```typescript
import { createSvgShards } from 'svg-shards';

const svg = createSvgShards.fromElement(document.querySelector('#my-svg'));
if (!svg) throw new Error('No SVG found');

// Access shards by type
svg.elements.rect.forEach((rect) => {
    rect.fill = '#4a90d9';
    rect.width = 200;
});

svg.elements.circle[0].radius = 50;
svg.elements.circle[0].moveTo(100, 100);

// Flat list with labels
svg.getAll().forEach((entry) => console.log(entry.label, entry.type));
```

## Features

- **Type-safe** — typed classes for rect, circle, path, group, and more
- **Shard-oriented** — each SVG element is an independent, manipulable object
- **Direct DOM access** — `shard.htmlNode` always available
- **Zero dependencies** — lightweight browser library
- **Highlight plugin** — optional `@svg-shards/highlighter` with demo gallery

## Scripts

| Command             | Description                                     |
| ------------------- | ----------------------------------------------- |
| `npm run build`     | Compile core library                            |
| `npm run build:all` | Compile core + highlighter plugin               |
| `npm run dev`       | Watch mode                                      |
| `npm run test`      | Run tests (Vitest + jsdom)                      |
| `npm run lint`      | ESLint                                          |
| `npm run demo`      | Build and open demo at `http://localhost:3000/` |

## Documentation

- [Full documentation](./docs/README.md)
- [Getting started](./docs/getting-started.md)
- [API reference](./docs/api/container.md)
- [SVG Highlighter plugin](./docs/plugins/svg-highlighter.md)
- [Internal docs (contributors)](./docs/.internal/README.md)

## License

[MIT](./LICENSE)
