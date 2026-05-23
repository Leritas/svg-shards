# SVG Shards

TypeScript library for working with SVG as independent, typed shards — parse, query, and manipulate each element with a clean OOP API.

**[Live Playground →](https://leritas.github.io/svg-shards/)** — interactive tutorial with live SVG and API controls.

## Try it online

Open the **[interactive playground](https://leritas.github.io/svg-shards/)** to explore every core API with live controls, API log, and shareable lesson links (`#basics`, `#reactive`, etc.).

Local dev: `npm run playground:dev` → http://localhost:3001

## Installation

```bash
npm install svg-shards
```

For reactive bindings (optional):

```bash
npm install svg-shards @preact/signals-core
```

## Quick Start (npm)

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

## React / Angular (npm + bundler)

Use the core API inside your framework lifecycle. For fine-grained updates without re-rendering the whole component, use the reactive subpath:

```typescript
import { createSvgShards } from 'svg-shards';
import { signal, bindProperty } from 'svg-shards/reactive';

// After mount — wrap an existing SVG in the DOM
const svg = createSvgShards.fromElement(svgRef.nativeElement, { observe: true });
const dot = svg!.getById('dot')!;

const cx = signal(50);
bindProperty(dot, 'cx', cx);

// Update from animation loop, user input, or Angular/React signals
cx.value = 120; // only the cx attribute updates in the DOM
```

Angular interop: pass an Angular `signal()` or `computed()` — they expose `.value` and work with `bindProperty` directly.

## Vanilla JS (no bundler)

Load a single ESM bundle from a CDN:

```html
<svg id="demo" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <circle id="dot" cx="50" cy="50" r="20" fill="#4a90d9" />
</svg>

<script type="module">
    import { createSvgShards, signal, bindProperty } from 'https://esm.sh/svg-shards/browser';

    const svg = createSvgShards.fromElement(document.getElementById('demo'));
    const dot = svg.getById('dot');

    const cx = signal(50);
    bindProperty(dot, 'cx', cx);

    document.getElementById('demo').addEventListener('click', () => {
        cx.value = cx.value + 10;
    });
</script>
```

Local file: `import ... from './node_modules/svg-shards/dist/browser.mjs'`

## Reactive API

```typescript
import { signal, batch, bindProperty, bindTransform, scheduleBatch } from 'svg-shards/reactive';
import { Transformation } from 'svg-shards';

const matrix = signal(Transformation.identity().rotate(45, 50, 50));
bindTransform(shard, matrix);
```

## Features

- **Type-safe** — typed classes for rect, circle, path, group, and more
- **Shard-oriented** — each SVG element is an independent, manipulable object
- **Stable identity** — shard wrappers reused across `refresh()` via WeakMap cache
- **Auto-sync** — opt-in `MutationObserver` refresh (`observe: true`)
- **Reactive bindings** — optional `svg-shards/reactive` with `@preact/signals-core`
- **Direct DOM access** — `shard.htmlNode` always available
- **Zero core dependencies** — reactive layer uses optional peer dep
- **Browser bundle** — `svg-shards/browser` for CDN / `<script type="module">`
- **Highlight plugin** — optional `@svg-shards/highlighter` with demo gallery

## Scripts

| Command                    | Description                                                 |
| -------------------------- | ----------------------------------------------------------- |
| `npm run build`            | Compile core library + browser bundle                       |
| `npm run build:all`        | Compile core + highlighter plugin                           |
| `npm run dev`              | Watch mode                                                  |
| `npm run test`             | Run tests (Vitest + jsdom)                                  |
| `npm run lint`             | ESLint                                                      |
| `npm run playground:build` | Build interactive playground → `site/`                      |
| `npm run playground:dev`   | Serve playground at http://localhost:3001                   |
| `npm run demo`             | Build and open highlighter demo at `http://localhost:3000/` |

## Documentation

- [Full documentation](./docs/README.md)
- [Getting started](./docs/getting-started.md)
- [API reference](./docs/api/container.md)
- [SVG Highlighter plugin](./docs/plugins/svg-highlighter.md)
- [Internal docs (contributors)](./docs/.internal/README.md)

## License

[MIT](./LICENSE)
