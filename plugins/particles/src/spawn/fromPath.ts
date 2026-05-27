import type { GroupElement, PathElement } from 'svg-shards';
import type { ParticleInit } from '../types';

export interface SpawnFromPathInit extends ParticleInit {
    d?: string;
}

export interface SpawnPathParent {
    htmlNode: SVGElement;
}

export interface SpawnFromPathOptions {
    parent?: GroupElement | SpawnPathParent;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    opacity?: number;
}

export interface SpawnFromPathContainer<TShard = PathElement> {
    createMany(
        kind: 'path',
        count: number,
        factory: (index: number) => SpawnFromPathInit & { parent?: GroupElement | SpawnPathParent },
    ): TShard[];
}

function resolvePathD(template: PathElement | string): string {
    return typeof template === 'string' ? template : template.d;
}

export function spawnFromPath<TShard = PathElement>(
    container: SpawnFromPathContainer<TShard>,
    template: PathElement | string,
    count: number,
    init?: (index: number) => Partial<SpawnFromPathInit>,
    options: SpawnFromPathOptions = {},
): TShard[] {
    const d = resolvePathD(template);

    return container.createMany('path', count, (i) => {
        const particle = init?.(i) ?? {};
        return {
            parent: options.parent,
            d: particle.d ?? d,
            fill: particle.fill ?? options.fill,
            stroke: particle.stroke ?? options.stroke,
            strokeWidth: particle.strokeWidth ?? options.strokeWidth,
            opacity: particle.opacity ?? options.opacity,
        };
    });
}
