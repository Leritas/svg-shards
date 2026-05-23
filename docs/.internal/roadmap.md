# Roadmap — Future Ideas

Pick items to implement incrementally. Not committed — priority TBD.

## Particles (future — после core foundation)

Цель: тысячи SVG-shard «частиц» с математически меняющимися attrs @ 60fps.
Строится поверх sync contract + reactive bindings + matrix transforms. **Не в scope текущей реализации.**

- [ ] **`ShardField` / `ParticlePool`** — object pool для mass-updates shards без GC pressure
- [ ] **`spawnFromPath(path, count)`** — генерация N shard-кусочков из path-shard
- [ ] **Signal-driven mass update** — batch() + rAF scheduler для 1000+ shards/frame
- [ ] **Path morphing via `d` attr** — bindProperty на PathElement.d для morph-анимаций
- [ ] **Shard → particle morphing** — explode/implode: SVG shape → flying particles → target shape
- [ ] **Transform via matrix signals** — bindTransform без string-concat для rotation/scale per particle

Зависимости (реализуются в Фазах 1–3, не в particles):

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
- [ ] **Parse mode: skip `<defs>` / `<symbol>`** — visible elements only (optional)
- [ ] **VisualState: CSS/computed styles** — complete highlight restore

## Core — reactive layer

- [x] **`@preact/signals-core` integration** — subpath `svg-shards/reactive`
- [x] **`bindProperty(shard, key, signal)`** — fine-grained attr updates
- [x] **`bindTransform(shard, matrixSignal)`** — matrix-driven transforms
- [x] **`scheduleBatch(fn)`** — rAF-coalesced batch updates
- [ ] **Framework adapter docs** — React, Angular signal interop snippets

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
- [ ] Local ↔ global coordinate conversion
- [ ] Hit testing, collision detection
- [ ] Path ops: simplify, smooth, union, intersection

## Entry points

- [ ] `createSvgShards.generate(config)` — programmatic SVG creation
- [ ] `createSvgShards.fromFile(url)` — load SVG from URL/path

## Animation

- [ ] **GSAP adapter** — `animate(shard, props)`, ScrollTrigger helpers, per-shard timelines

## Styling & effects

- [ ] SVG filters & effects API
- [ ] Masking & clipping helpers
- [ ] Gradient generation

## Integrations

- [ ] Framework adapters (React/Vue/Angular hooks)
- [ ] Export PNG / PDF / SVG string

## Plugin: svg-highlighter

- [ ] Per-shard rotation in viewport
- [ ] Multi-select highlight
- [ ] Keyboard navigation (arrow keys)
- [ ] Custom highlight themes

## Infrastructure

- [x] CI/CD (GitHub Actions: lint, test, build)
- [x] npm publish workflow — see [publishing.md](./publishing.md)
