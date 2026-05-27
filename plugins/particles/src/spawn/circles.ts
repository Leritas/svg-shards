import type { CircleElement } from 'svg-shards';
import type { GroupElement } from 'svg-shards';
import type { ParticleFieldContainer, ParticleInit } from '../types';
import type { ParticleState } from '../state/ParticleState';

export function spawnCircleParticles(
    container: ParticleFieldContainer,
    state: ParticleState,
    count: number,
    init: (index: number) => ParticleInit,
    parent?: GroupElement,
): CircleElement[] {
    const inits: ParticleInit[] = [];
    for (let i = 0; i < count; i++) {
        inits.push(init(i));
    }

    const shards = container.createMany('circle', count, (i) => {
        const particle = inits[i];
        return {
            parent,
            cx: particle.cx ?? 0,
            cy: particle.cy ?? 0,
            r: particle.r ?? 4,
            fill: particle.fill,
            stroke: particle.stroke,
            strokeWidth: particle.strokeWidth,
            opacity: particle.opacity,
        };
    });

    state.reset(count);
    state.shards = shards;

    for (let i = 0; i < count; i++) {
        const particle = inits[i];
        state.cx[i] = particle.cx ?? shards[i].cx;
        state.cy[i] = particle.cy ?? shards[i].cy;
        state.vx[i] = particle.vx ?? 0;
        state.vy[i] = particle.vy ?? 0;
        state.r[i] = particle.r ?? shards[i].r;
    }

    return shards;
}
