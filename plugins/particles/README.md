# @svg-shards/particles

Spawn and simulate hundreds of SVG circle shards using `svg-shards` create API and `scheduleBatch`.

**Full documentation:** [docs/plugins/svg-particles.md](../../docs/plugins/svg-particles.md)

**Interactive playground:**

```bash
npm run playground:dev   # from this directory — http://localhost:3003
```

Quick example:

```typescript
import { createSvgShards } from 'svg-shards';
import { ParticleField } from '@svg-shards/particles';

const svg = createSvgShards.fromElement(document.querySelector('svg')!)!;

const field = new ParticleField(svg, {
    bounds: { width: 400, height: 300 },
    gravity: 980,
    restitution: 0.9,
});

field.spawn(150, (i) => ({
    cx: Math.random() * 400,
    cy: Math.random() * 100,
    r: 4 + Math.random() * 6,
    vx: (Math.random() - 0.5) * 200,
    vy: (Math.random() - 0.5) * 100,
    fill: `hsl(${(i * 7) % 360}, 80%, 55%)`,
}));

field.start();
```
