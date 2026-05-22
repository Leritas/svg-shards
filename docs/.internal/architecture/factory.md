# Element Factory

Location: `src/factories/ElementFactory.ts`

## Responsibilities

- Map DOM tag names → typed element classes
- Build `SvgElementMap` from an existing `<svg>` node
- Support re-parsing via `SvgContainer.refresh()`

## Tag mapping

DOM tag names don't always match map keys:

| DOM tag  | Map key  |
| -------- | -------- |
| `rect`   | `rect`   |
| `circle` | `circle` |
| `g`      | `group`  |
| …        | …        |

Defined in `TAG_TO_MAP_KEY` (`src/core/types.ts`).

## Parsing strategy

```typescript
svgNode.querySelectorAll('*'); // all descendants, flat
```

**Implications:**

- Nested elements appear in type arrays (e.g. `<circle>` inside `<g>` is in `elements.circle`)
- `GroupElement.children` is NOT auto-populated on parse (v2)
- Order within each type array follows DOM document order

## Supported types (v1)

`rect`, `circle`, `ellipse`, `line`, `polygon`, `polyline`, `path`, `text`, `image`, `g`, `use`

Unsupported tags (`defs`, `clipPath`, `mask`, etc.) are silently skipped.

## Extension point

To add a new element type:

1. Create class extending `SvgElement` in `src/elements/`
2. Add case in `ElementFactory.createElementFromNode`
3. Add key to `SvgElementMap` and `TAG_TO_MAP_KEY`
4. Export from `src/elements/index.ts` and `src/index.ts`
