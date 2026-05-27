import type { Bounds } from '../types';

export interface BounceState {
    cx: number;
    cy: number;
    vx: number;
    vy: number;
    r: number;
}

export function resolveWallBounce(state: BounceState, bounds: Bounds, restitution: number): BounceState {
    let { cx, cy, vx, vy } = state;
    const { r } = state;
    const { width, height } = bounds;

    if (cx - r < 0) {
        cx = r;
        vx = -vx * restitution;
    } else if (cx + r > width) {
        cx = width - r;
        vx = -vx * restitution;
    }

    if (cy - r < 0) {
        cy = r;
        vy = -vy * restitution;
    } else if (cy + r > height) {
        cy = height - r;
        vy = -vy * restitution;
    }

    return { cx, cy, vx, vy, r };
}

export function resolveWallBounceInPlace(
    index: number,
    cx: Float32Array,
    cy: Float32Array,
    vx: Float32Array,
    vy: Float32Array,
    r: Float32Array,
    bounds: Bounds,
    restitution: number,
): void {
    const resolved = resolveWallBounce(
        {
            cx: cx[index],
            cy: cy[index],
            vx: vx[index],
            vy: vy[index],
            r: r[index],
        },
        bounds,
        restitution,
    );

    cx[index] = resolved.cx;
    cy[index] = resolved.cy;
    vx[index] = resolved.vx;
    vy[index] = resolved.vy;
}
