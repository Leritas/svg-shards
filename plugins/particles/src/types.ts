import type { GroupElement, SvgContainer } from 'svg-shards';

export interface Bounds {
    width: number;
    height: number;
}

export interface ParticleFieldOptions {
    bounds?: Bounds;
    gravity?: number;
    restitution?: number;
    parent?: GroupElement;
}

export interface ParticleInit {
    cx?: number;
    cy?: number;
    r?: number;
    vx?: number;
    vy?: number;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    opacity?: number;
}

export interface ParticleFieldContainer {
    createMany<K extends 'circle' | 'path'>(
        kind: K,
        count: number,
        factory: (index: number) => ParticleInit & { parent?: GroupElement; d?: string },
    ): K extends 'circle' ? import('svg-shards').CircleElement[] : import('svg-shards').PathElement[];

    htmlNode: SvgContainer['htmlNode'];
}
