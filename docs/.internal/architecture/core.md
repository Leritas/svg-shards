# Core Layer

## SvgElement (base class)

Location: `src/core/SvgElement.ts`

Every shard wraps one DOM node (`htmlNode`). Base provides:

**Geometry (rect-biased):** `x`, `y`, `width`, `height` — override in shape subclasses where inappropriate

**Style:** `fill`, `stroke`, `strokeWidth`, `opacity`, `transform`, `style`

**Transforms:** `translate`, `rotate`, `scale` — prepends to existing `transform` attribute

**Visual state (for highlighter):**

- `captureVisualState()` → `{ fill, stroke, strokeWidth, opacity }`
- `applyVisualState(state)`
- `applyHighlight(options)` → returns previous state
- `clearHighlight(previousState)`

**DOM helpers:** `getBoundingBox`, `remove`, classList methods, generic attribute access

## SvgContainer

Location: `src/core/SvgContainer.ts`

Wraps root `SVGSVGElement` + parsed `SvgElementMap`.

| Method / Property            | Description                               |
| ---------------------------- | ----------------------------------------- |
| `htmlNode`                   | Root SVG element                          |
| `elements`                   | Typed map by element kind                 |
| `width`, `height`, `viewBox` | Container dimensions                      |
| `getByType(type)`            | Typed array access                        |
| `getById(id)`                | Find shard by element id                  |
| `getAll()`                   | Flat list with `{ type, element, label }` |
| `refresh()`                  | Re-parse after DOM mutations              |

## Types

Location: `src/core/types.ts`

Key exports: `SvgElementMap`, `SvgElementUnion`, `SvgElementEntry`, `VisualState`, `HighlightOptions`, `TAG_TO_MAP_KEY`

`SvgElementEntry.label` = element `id` or `"circle #2"` (type + 1-based index within type).
