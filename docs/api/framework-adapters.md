# Framework adapter patterns

How to use `svg-shards/reactive` with React, Angular, and vanilla JS. The reactive layer re-exports `@preact/signals-core` and provides `bindProperty`, `bindTransform`, and `scheduleBatch`.

See also [Reactive bindings](./reactive.md) and [Getting started](../getting-started.md).

## Vanilla JavaScript

```typescript
import { signal } from 'svg-shards/reactive';
import { createSvgShards } from 'svg-shards';

const svg = createSvgShards.fromElement(document.querySelector('#scene svg')!)!;
const shard = svg.getById('dot')!;
const cx = signal(shard.cx);

bindProperty(shard, 'cx', cx);

cx.value = 120; // updates SVG attribute on next microtask
```

Use `scheduleBatch` when updating many shards per frame (see particles plugin).

## React

Install peer dependencies:

```bash
npm install svg-shards @preact/signals-core
```

Pattern with `useEffect` cleanup:

```tsx
import { useEffect } from 'react';
import { signal } from '@preact/signals-core';
import { createSvgShards } from 'svg-shards';
import { bindProperty } from 'svg-shards/reactive';

function DotScene({ svgRef }: { svgRef: SVGSVGElement | null }) {
    useEffect(() => {
        if (!svgRef) return;

        const container = createSvgShards.fromElement(svgRef);
        if (!container) return;

        const dot = container.getById('dot');
        if (!dot) return;

        const cx = signal(dot.cx);
        const dispose = bindProperty(dot, 'cx', cx);

        cx.value = 80;

        return () => {
            dispose();
        };
    }, [svgRef]);

    return null;
}
```

**Tips:**

- Create the container once per mounted SVG; call `container.refresh()` if external DOM edits occur without `enableAutoRefresh`.
- Prefer signals for values that drive SVG attrs; avoid React state for every frame of animation (use `scheduleBatch` or GSAP instead).
- On unmount, dispose bindings and call `field.dispose()` for particle plugins.

## Angular

Angular 19+ signals can drive the same bindings:

```typescript
import { Component, effect, signal } from '@angular/core';
import { createSvgShards } from 'svg-shards';
import { bindProperty } from 'svg-shards/reactive';

@Component({
    selector: 'app-svg-scene',
    template: `<svg #svg>...</svg>`,
})
export class SvgSceneComponent {
    private container = createSvgShards.fromElement(this.svgElement)!;
    cx = signal(50);

    constructor() {
        const dot = this.container.getById('dot')!;
        const preactCx = {
            get value() {
                return this.cx();
            },
            set value(v: number) {
                this.cx.set(v);
            },
        };

        bindProperty(dot, 'cx', preactCx as import('@preact/signals-core').Signal<number>);

        effect(() => {
            preactCx.value = this.cx();
        });
    }
}
```

**Simpler approach:** use `@preact/signals-core` `signal()` directly in Angular services or components — it is framework-agnostic and works alongside Angular signals when you bridge values in an `effect`.

```typescript
import { signal } from '@preact/signals-core';
import { bindProperty } from 'svg-shards/reactive';

const cx = signal(50);
const dispose = bindProperty(dot, 'cx', cx);
// cx.value = 100 updates the shard
```

## When to use what

| Use case                              | API                                         |
| ------------------------------------- | ------------------------------------------- |
| Single attr tied to UI state          | `bindProperty` + signal                     |
| Transform matrix from computed values | `bindTransform` + `Transformation`          |
| Hundreds of shards per frame          | Direct property writes + `scheduleBatch`    |
| External DOM edits                    | `enableAutoRefresh()` or manual `refresh()` |

## Related

- [SvgContainer API](./container.md)
- [Particles plugin](../plugins/svg-particles.md) — mass updates without per-shard bindings
