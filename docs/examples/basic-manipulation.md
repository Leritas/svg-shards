# Basic Manipulation Examples

## Change colors

```typescript
import { createSvgShards } from 'svg-shards';

const svg = createSvgShards.fromElement(document.querySelector('#art'))!;

svg.elements.rect.forEach((rect, i) => {
    rect.fill = `hsl(${i * 60}, 70%, 60%)`;
});
```

## Move and resize

```typescript
const box = svg.getById('panel');
if (box) {
    box.moveTo(100, 50);
    box.resize(200, 120);
}

const dot = svg.elements.circle[0];
dot.moveTo(300, 200);
dot.radius = 25;
```

## Work with paths

```typescript
const wave = svg.elements.path[0];
console.log('Length:', wave.pathLength);
const mid = wave.getPointAtLength(wave.pathLength / 2);
console.log('Midpoint:', mid.x, mid.y);
```

## Iterate all shards

```typescript
svg.getAll().forEach(({ type, label, element }) => {
    console.log(`${label} (${type})`);
    element.opacity = 0.9;
});
```

## Temporary highlight

```typescript
const shard = svg.getById('sun')!;
const previous = shard.applyHighlight({
    fill: '#ffd700',
    strokeWidthBoost: 3,
});

setTimeout(() => shard.clearHighlight(previous), 2000);
```

## Refresh after adding elements

```typescript
const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
rect.setAttribute('x', '10');
rect.setAttribute('y', '10');
rect.setAttribute('width', '50');
rect.setAttribute('height', '50');
svg.htmlNode.appendChild(rect);
svg.refresh();

console.log(svg.elements.rect.length);
```
