# Roadmap — Future Ideas

Pick items to implement incrementally.

## Priority legend

| Label  | Meaning                       |
| ------ | ----------------------------- |
| **P0** | Bugs / infra gaps — do now    |
| **P1** | Next sprint                   |
| **P2** | Feature expansion (selective) |
| **P3** | Research / nice-to-have       |

---

## Released

- [x] **svg-shards@0.3.0** — create API, reactive layer, browser bundle
- [x] **svg-shards@0.3.1** — `SvgContainer.removeShard`
- [x] **@svg-shards/particles@0.1.0** — ParticleField MVP (circle fields, SoA physics)
- [x] **@svg-shards/particles@0.2.0** — ParticlePool, spawnFromPath, spawn/dispose fixes
- [x] **npm publish workflow** — 3 packages, tag-driven; Trusted Publishing configured

---

## P0 — Known bugs & infra (done)

- [x] **Fix spawn double-init** — single `init(i)` call in `spawn/circles.ts`
- [x] **Fix dispose registry cleanup** — `SvgContainer.removeShard` + `ParticleField` cleanup
- [x] **Update publishing.md** — document `@svg-shards/particles`, tag `particles-v*`
- [x] **Highlighter peerDep** — bump `svg-shards` to `^0.3.0`
- [x] **Plugin prepublishOnly parity** — particles and highlighter run tests before publish

---

## Particles (`@svg-shards/particles`)

MVP plugin for spawning and simulating circle particle fields. See [particles plugin docs](../plugins/svg-particles.md).

Snowfall (playground lesson 06) uses `spawnFromPath` + a custom loop for rotation/wind.

- [x] **`ParticleField`** — spawn circle shards + Euler physics + wall bounce @ 60fps
- [x] **Signal-driven mass update** — `scheduleBatch` + rAF loop for 1000+ shards/frame
- [x] **Core create API** — `createCircle` / `createMany` for programmatic primitives
- [x] **`ParticlePool`** — object pool reuse without DOM alloc/free **(P1)**
- [x] **`spawnFromPath(path, count)`** — spawn N path shards from a template path **(P2)**
- [ ] **Path morphing via `d` attr** — bindProperty on PathElement.d for morph animations **(P2/P3)**
- [ ] **Shard → particle morphing** — explode/implode: SVG shape → flying particles → target shape **(P3)**
- [ ] **Transform via matrix signals** — bindTransform per particle without string concat **(P3)**

Dependencies (core, not particles):

- [x] WeakMap node→shard (stable identity)
- [x] `@preact/signals-core` bindings (`svg-shards/reactive`)
- [x] Matrix `Transformation` class
- [x] MutationObserver (external DOM sync)

---

## Core — sync & stability

- [x] **WeakMap node→shard reuse on refresh** — stable object identity
- [x] **getById fix** — `getElementById` + lazy wrap if not in cache
- [x] **`MutationObserver` auto-refresh** — opt-in, debounced
- [x] **Core test coverage** — sync edge cases, stale refs, reactive bindings
- [x] **`SvgContainer.removeShard`** — programmatic removal from elements map **(P0)**
- [ ] **Parse mode: skip `<defs>` / `<symbol>`** — visible elements only (optional) **(P2)**
- [ ] **VisualState: CSS/computed styles** — complete highlight restore **(P2)**

## Core — reactive layer

- [x] **`@preact/signals-core` integration** — subpath `svg-shards/reactive`
- [x] **`bindProperty(shard, key, signal)`** — fine-grained attr updates
- [x] **`bindTransform(shard, matrixSignal)`** — matrix-driven transforms
- [x] **`scheduleBatch(fn)`** — rAF-coalesced batch updates
- [x] **Framework adapter docs** — React, Angular signal interop snippets **(P1)**

## Core — distribution

- [x] **Browser ESM bundle** — `dist/browser.mjs` for CDN / `<script type="module">`
- [x] **Package exports** — `.`, `./reactive`, `./browser`
- [x] **README dual examples** — npm (React/Angular) + vanilla CDN

## DOM & querying

- [x] Hierarchical tree: populate `GroupElement.children` on parse
- [x] Query by CSS selector, `data-*` attributes
- [x] Lazy parsing / caching / incremental refresh (WeakMap node cache)

## Transforms & geometry

- [x] Matrix-based `Transformation` class (chainable, composable)
- [ ] Local ↔ global coordinate conversion **(P3)**
- [ ] Hit testing, collision detection **(P3)**
- [ ] Path ops: simplify, smooth, union, intersection **(P3)**

## Entry points

- [x] `SvgContainer.create*` / `createMany` — programmatic shape creation
- [ ] `createSvgShards.generate(config)` — full SVG document from config **(P3)**
- [ ] `createSvgShards.fromFile(url)` — load SVG from URL/path **(P2)**

## Animation

- [ ] **GSAP adapter** — `animate(shard, props)`, ScrollTrigger helpers, per-shard timelines **(P3)**

## Styling & effects

- [ ] SVG filters & effects API **(P3)**
- [ ] Masking & clipping helpers **(P3)**
- [ ] Gradient generation **(P3)**

## Integrations

- [ ] Framework adapters (React/Vue/Angular hooks) **(P3)**
- [ ] Export PNG / PDF / SVG string **(P3)**

## Plugin: svg-highlighter

- [ ] Per-shard rotation in viewport **(P3)**
- [ ] Multi-select highlight **(P3)**
- [ ] Keyboard navigation (arrow keys) **(P3)**
- [ ] Custom highlight themes **(P3)**

## Infrastructure

- [x] CI/CD (GitHub Actions: lint, test, build)
- [x] npm publish workflow (3 packages) — see [publishing.md](./publishing.md)
- [x] publishing.md covers all 3 packages
- [x] Plugin prepublishOnly parity (test/lint)
- [x] Highlighter peerDep aligned with core
