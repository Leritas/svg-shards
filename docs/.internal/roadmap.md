# Roadmap — Future Ideas

Pick items to implement incrementally. Not committed — priority TBD.

## Animation

- [ ] **GSAP adapter** — `animate(shard, props)`, ScrollTrigger helpers, per-shard timelines
- [ ] **Shard → particle morphing** — generate/animate particles from path-shards

## Entry points

- [ ] `createSvgShards.generate(config)` — programmatic SVG creation
- [ ] `createSvgShards.fromFile(url)` — load SVG from URL/path

## Transforms & geometry

- [ ] Matrix-based `Transformation` class (chainable, composable)
- [ ] Local ↔ global coordinate conversion
- [ ] Hit testing, collision detection
- [ ] Path ops: simplify, smooth, union, intersection

## DOM & querying

- [ ] Hierarchical tree: populate `GroupElement.children` on parse
- [ ] `MutationObserver` auto-refresh
- [ ] Query by CSS selector, `data-*` attributes
- [ ] Lazy parsing / caching

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

- [ ] CI/CD (GitHub Actions: lint, test, build)
- [ ] npm publish workflow
- [ ] Dual CJS/ESM package if needed
