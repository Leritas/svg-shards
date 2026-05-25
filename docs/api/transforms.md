# Transforms & sizing

Three ways to change how big a shard looks. They are **not** interchangeable.

| Approach | API | Anchor / pivot | DOM attributes | Visual drift |
| -------- | --- | -------------- | -------------- | ------------ |
| **Resize attributes** | `rect.width = 144`, `rect.resize(w, h)` | Top-left (`x`, `y` fixed) | `width`, `height` change | No — grows right & down only |
| **Scale transform** | `shard.scale(1.2)` or `scale(1.2, 1.5)` | SVG origin `(0, 0)` | Unchanged; `transform` prepended | Yes — grows and shifts down-right |
| **Scale at pivot** | `shard.scaleAt(1.2, 1.2, cx, cy)` | Your point `(cx, cy)` | Unchanged; `transform` prepended | No — grows around pivot |
| **Matrix (reactive)** | `Transformation.identity().scaleAt(...)` + `bindTransform` | Composable pivot | Unchanged | Depends on matrix |

All transform helpers (`translate`, `rotate`, `scale`, `scaleAt`) **prepend** to the existing `transform` string — repeated clicks stack.

## Imperative transforms

```typescript
shard.translate(10, 0);
shard.rotate(45, cx, cy);           // pivot optional, default (0,0)
shard.scale(1.2);                   // from SVG origin — may drift
shard.scaleAt(1.2, 1.2, cx, cy);  // in place around pivot
```

## Matrix + reactive

```typescript
import { signal, bindTransform } from 'svg-shards/reactive';
import { Transformation } from 'svg-shards';

const matrix = signal(Transformation.identity().scaleAt(1.2, 1.2, 100, 80));
bindTransform(shard, matrix);
```

See [Reactive API](./reactive.md) and the [playground](https://leritas.github.io/svg-shards/#transforms).
