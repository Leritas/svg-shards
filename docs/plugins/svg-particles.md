# SVG Particles Plugin

Optional plugin for spawning and simulating hundreds of SVG circle shards at 60fps. Built on the core **create API** (`createCircle`, `createMany`) and **`scheduleBatch`** from `svg-shards/reactive`.

**Recommended first step:** open the interactive playground (see [Playground](#playground)) — it walks through spawn patterns, physics, lifecycle, and a snowfall demo with path snowflakes.

Package name: `@svg-shards/particles`

## What it does

`ParticleField` manages a pool of circle particles:

1. **`spawn(count, init)`** — creates N circle DOM nodes via `svg.createMany('circle', …)` and stores simulation state in Structure-of-Arrays (`Float32Array` for positions, velocities, radii).
2. **`start()`** — runs a frame loop through `scheduleBatch` (one rAF batch per frame).
3. Each frame — Euler integration + wall bounce, then writes `shard.cx` / `shard.cy` directly (no per-particle `bindProperty`).

Frame rate affects smoothness, **not** simulation speed: `dt` comes from `performance.now()`, so motion stays consistent at 30 or 120 FPS.

## Prerequisites

Particles depend on programmatic shard creation in **svg-shards ≥ 0.3**:

```typescript
const dot = svg.createCircle({ cx: 50, cy: 50, r: 8, fill: '#fff' });

const many = svg.createMany('circle', 100, (i) => ({
    cx: Math.random() * 400,
    cy: Math.random() * 100,
    r: 4,
    fill: `hsl(${(i * 7) % 360}, 80%, 55%)`,
}));
```

See [SvgContainer API — programmatic shape creation](../api/container.md#create-programmatic-shape-creation).

Peer dependencies: `svg-shards`, `@preact/signals-core` (used internally by `scheduleBatch`).

## Installation

```bash
npm install @svg-shards/particles svg-shards @preact/signals-core
```

From the monorepo:

```bash
npm install file:./plugins/particles
```

## Quick start — bouncing balls

```typescript
import { createSvgShards } from 'svg-shards';
import { ParticleField } from '@svg-shards/particles';

const svg = createSvgShards.fromElement(document.querySelector('#scene svg')!)!;

// Optional: append into a dedicated layer
const layer = svg.getById('particles'); // <g id="particles">

const field = new ParticleField(svg, {
    bounds: { width: 400, height: 300 },
    gravity: 980, // px/s² in viewBox coordinates
    restitution: 0.9, // wall bounce energy retention (0–1)
    parent: layer ?? undefined,
});

field.spawn(150, (i) => ({
    cx: Math.random() * 400,
    cy: Math.random() * 80,
    r: 4 + Math.random() * 6,
    vx: (Math.random() - 0.5) * 200,
    vy: (Math.random() - 0.5) * 100,
    fill: `hsl(${(i * 7) % 360}, 80%, 55%)`,
}));

field.start();
```

## Lifecycle

| Phase        | API                                                              | What happens                                           |
| ------------ | ---------------------------------------------------------------- | ------------------------------------------------------ |
| Create field | `new ParticleField(container, options)`                          | Reads bounds from options or `container.viewBox`       |
| Spawn        | `field.spawn(count, init)`                                       | Removes previous particles, creates circles, fills SoA |
| Run          | `field.start()`                                                  | Starts `scheduleBatch` loop (no-op if `count === 0`)   |
| Pause        | `field.stop()`                                                   | Freezes simulation; shards stay in DOM                 |
| Tune live    | `field.gravity = …`, `field.restitution = …`, `field.bounds = …` | Applied on next frame while running or paused          |
| Cleanup      | `field.dispose()`                                                | `stop()` + remove all particle nodes + clear state     |

```typescript
field.spawn(40, init);
field.start();

field.stop();
field.gravity = 0; // float instead of fall after resume
field.start();

field.dispose(); // remove DOM nodes when done
```

Calling `spawn()` again replaces the current set (previous shards are removed from the DOM).

### Read-only state

| Property      | Description                                       |
| ------------- | ------------------------------------------------- |
| `field.count` | Number of live particles after the last `spawn()` |

## `ParticleField` options

| Option        | Default                  | Description                                                                |
| ------------- | ------------------------ | -------------------------------------------------------------------------- |
| `bounds`      | `container.viewBox` size | Simulation box `{ width, height }` in SVG user units                       |
| `gravity`     | `0`                      | Vertical acceleration in px/s² (positive = downward)                       |
| `restitution` | `0.85`                   | Wall bounce coefficient `e` ∈ [0, 1]                                       |
| `parent`      | SVG root                 | `GroupElement` to append particles into (via `createMany` `parent` option) |

### `ParticleInit` — spawn callback

`spawn(count, (i) => ({ … }))` calls your factory once per particle index:

| Field         | Default | Description             |
| ------------- | ------- | ----------------------- |
| `cx`, `cy`    | `0`     | Initial center (px)     |
| `r`           | `4`     | Radius                  |
| `vx`, `vy`    | `0`     | Initial velocity (px/s) |
| `fill`        | —       | Circle fill color       |
| `stroke`      | —       | Stroke color            |
| `strokeWidth` | —       | Stroke width            |
| `opacity`     | —       | Opacity 0–1             |

Example — ring burst:

```typescript
field.spawn(60, (i) => {
    const angle = (i / 60) * Math.PI * 2;
    return {
        cx: 200 + Math.cos(angle) * 90,
        cy: 150 + Math.sin(angle) * 55,
        r: 4,
        vx: Math.cos(angle) * 50,
        vy: Math.sin(angle) * 50,
        fill: `hsl(${(i * 6) % 360}, 80%, 55%)`,
    };
});
```

Example — fountain from the bottom edge:

```typescript
field.spawn(80, () => ({
    cx: bounds.width / 2 + (Math.random() - 0.5) * 16,
    cy: bounds.height - 12,
    r: 3 + Math.random() * 5,
    vx: (Math.random() - 0.5) * 100,
    vy: -(120 + Math.random() * 180),
    fill: '#4a90d9',
}));
```

## Physics model

Each frame for particle `i`:

1. **Integrate** (Euler):  
   `vy += gravity * dt`  
   `cx += vx * dt`, `cy += vy * dt`
2. **Wall bounce** on `[0, width] × [0, height]` for circle radius `r`:  
   if `cx - r < 0` → `cx = r`, `vx = -vx * e`  
   (same for right / top / bottom on `cy`, `vy`)
3. **Write DOM**: `shard.cx = cx`, `shard.cy = cy`

`dt` = elapsed seconds since last frame (capped at `1/30` s to avoid huge jumps after tab backgrounding).

`restitution` (`e`) controls energy loss on bounce: `1` = perfectly elastic, lower values damp motion.

### Tuning gravity

`gravity` is in **pixels per second²** in the same coordinate system as your SVG `viewBox`. A 400×300 viewBox with `gravity: 980` feels roughly “Earth-like” relative to that scale; use `200` for gentle drift or `1800` for heavy drops.

## Low-level exports

For custom simulators or tests, the plugin also exports pure math and spawn helpers:

| Export                                                         | Description                                             |
| -------------------------------------------------------------- | ------------------------------------------------------- |
| `ParticleField`                                                | High-level field with spawn / start / stop / dispose    |
| `ParticleState`                                                | SoA container (`cx`, `cy`, `vx`, `vy`, `r`, `shards[]`) |
| `spawnCircleParticles(container, state, count, init, parent?)` | Spawn without `ParticleField` wrapper                   |
| `integrateParticle(cx, cy, vx, vy, gravity, dt)`               | Single Euler step → `{ cx, cy, vx, vy }`                |
| `stepParticles(state, bounds, { gravity, dt, restitution })`   | Full SoA step + DOM write                               |
| `resolveWallBounce(state, bounds, e)`                          | Pure bounce for one particle                            |
| `resolveWallBounceInPlace(index, …)`                           | In-place bounce on SoA arrays                           |

Custom loop (same pattern as `ParticleField` internally):

```typescript
import { scheduleBatch } from 'svg-shards/reactive';
import { ParticleState, spawnCircleParticles, stepParticles } from '@svg-shards/particles';

const state = new ParticleState();
spawnCircleParticles(svg, state, 200, (i) => ({
    cx: Math.random() * 400,
    cy: Math.random() * 300,
    r: 5,
    vx: (Math.random() - 0.5) * 100,
    vy: (Math.random() - 0.5) * 100,
    fill: '#fff',
}));

let lastTime: number | null = null;

function tick(): void {
    scheduleBatch(() => {
        const now = performance.now();
        const dt = lastTime === null ? 1 / 60 : Math.min((now - lastTime) / 1000, 1 / 30);
        lastTime = now;

        stepParticles(
            state,
            { width: 400, height: 300 },
            {
                gravity: 600,
                dt,
                restitution: 0.88,
            },
        );

        tick();
    });
}

tick();
```

## Path snowflakes and custom shapes

The plugin MVP simulates **circles** via `ParticleField`. The playground **Snowfall** lesson shows how to build **path snowflakes** with `svg.createMany('path', …)`, radial gradients, and a custom `scheduleBatch` loop updating `transform` — that pattern lives in the lesson source, not in `ParticleField` yet.

Use circles for physics-heavy particle systems; use the snowfall lesson as a template for bespoke path-based effects.

## Playground

The playground is the main visual sandbox. Each lesson focuses on one concept:

| Lesson                | Topic                                                 |
| --------------------- | ----------------------------------------------------- |
| Bouncing balls        | Full `ParticleField` demo, spawn counts, pause/resume |
| Create shards         | Core `createCircle` / `createMany` without simulation |
| Spawn — init callback | Ring, grid, random, fountain spawn patterns           |
| Physics               | Gravity, restitution, presets                         |
| Lifecycle             | Step-by-step start / stop / dispose                   |
| Snowfall              | Path snowflakes + gradients (custom loop, see above)  |

**Plugin playground** (standalone):

```bash
cd plugins/particles
npm run playground:dev   # http://localhost:3003
```

**Core playground** (sidebar → Plugins → `@svg-shards/particles`):

```bash
npm run playground:dev   # http://localhost:3001
```

**Quick demo:**

```bash
npm run demo:particles     # builds and serves plugin playground
```

**Minimal static demo** (no build step for the page itself):

```bash
npm run build:all
# open plugins/particles/basic-demo/index.html
```

## Relationship to core

```text
svg-shards (core)
  createCircle / createMany  ──► DOM + registry
  scheduleBatch (reactive)   ──► rAF-coalesced updates

@svg-shards/particles
  ParticleField              ──► spawn + SoA physics + loop
```

Particles do **not** use `bindProperty` per shard — that would create thousands of effects. One batch loop writes coordinates directly, which scales to 500+ circles.

## Roadmap (not in current release)

See [Particles section in roadmap](../.internal/roadmap.md): `spawnFromPath`, object pooling, `bindTransform` per particle, explode/implode morphing.

## Cleanup

Always dispose when removing a scene or navigating away:

```typescript
field.dispose();
```

This stops the loop, removes particle `<circle>` nodes, and clears internal arrays. Shards may remain in `svg.elements.circle` until a full `refresh()` — for demos, prefer a dedicated `<g id="particles">` parent and `dispose()` before respawning.
