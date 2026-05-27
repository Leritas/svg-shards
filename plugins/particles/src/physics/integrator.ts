import { resolveWallBounceInPlace } from './bounds';
import type { Bounds } from '../types';
import type { ParticleState } from '../state/ParticleState';

export interface IntegrateStepOptions {
    gravity: number;
    dt: number;
}

export function integrateParticle(
    cx: number,
    cy: number,
    vx: number,
    vy: number,
    gravity: number,
    dt: number,
): { cx: number; cy: number; vx: number; vy: number } {
    const nextVy = vy + gravity * dt;
    return {
        cx: cx + vx * dt,
        cy: cy + nextVy * dt,
        vx,
        vy: nextVy,
    };
}

export function stepParticles(
    state: ParticleState,
    bounds: Bounds,
    options: IntegrateStepOptions & { restitution: number },
): void {
    const { gravity, dt, restitution } = options;

    for (let i = 0; i < state.count; i++) {
        const integrated = integrateParticle(state.cx[i], state.cy[i], state.vx[i], state.vy[i], gravity, dt);

        state.cx[i] = integrated.cx;
        state.cy[i] = integrated.cy;
        state.vx[i] = integrated.vx;
        state.vy[i] = integrated.vy;

        resolveWallBounceInPlace(i, state.cx, state.cy, state.vx, state.vy, state.r, bounds, restitution);

        state.shards[i].cx = state.cx[i];
        state.shards[i].cy = state.cy[i];
    }
}
