# Reactive API (`svg-shards/reactive`)

Optional subpath for fine-grained, signal-driven DOM updates. Requires peer dependency `@preact/signals-core`.

```bash
npm install svg-shards @preact/signals-core
```

## Usage

```typescript
import { createSvgShards } from 'svg-shards';
import { signal, bindProperty, bindTransform, scheduleBatch } from 'svg-shards/reactive';
import { Transformation } from 'svg-shards';

const svg = createSvgShards.fromElement(document.querySelector('#svg'))!;
const dot = svg.getById('dot')!;

const cx = signal(50);
const cy = signal(50);

bindProperty(dot, 'cx', cx);
bindProperty(dot, 'cy', cy);

// Only cx/cy attributes update — no full re-render
cx.value = 100;
```

## API

| Export                                     | Description                                |
| ------------------------------------------ | ------------------------------------------ |
| `signal`, `batch`, `effect`, `computed`    | Re-exported from `@preact/signals-core`    |
| `bindProperty(shard, key, signal)`         | Bind shard property ↔ signal               |
| `bindVisual(shard, { fill, stroke, ... })` | Bind visual properties                     |
| `bindTransform(shard, matrixSignal)`       | Bind `Transformation` → `transform` attr   |
| `scheduleBatch(fn)`                        | Coalesce updates into next animation frame |

## Matrix transforms

```typescript
import { Transformation } from 'svg-shards';

const matrix = signal(Transformation.identity().translate(10, 20));
bindTransform(shard, matrix);

matrix.value = Transformation.identity().rotate(45, 50, 50);
```

## Browser bundle (vanilla)

```html
<script type="module">
    import { createSvgShards, signal, bindProperty } from 'https://esm.sh/svg-shards/browser';
</script>
```

## Framework interop

Any signal-like object with a `.value` property works (`SignalLike<T>`). Angular `signal()` and Preact/React signals are compatible.
