import type { CircleElement, SvgContainer } from 'svg-shards';
import type { ParticleInit } from '../types';
import type { ParticlePoolOptions } from './types';

const HIDDEN_OPACITY = 0;

export class ParticlePool {
    private _container: SvgContainer;
    private _parent?: GroupElement;
    private _maxSize: number;
    private _shards: CircleElement[] = [];

    constructor(container: SvgContainer, options: ParticlePoolOptions = {}) {
        this._container = container;
        this._parent = options.parent;
        this._maxSize = options.maxSize ?? Number.POSITIVE_INFINITY;
    }

    get capacity(): number {
        return this._shards.length;
    }

    get maxSize(): number {
        return this._maxSize;
    }

    acquire(count: number, init: (index: number) => ParticleInit): CircleElement[] {
        if (count < 0) {
            throw new RangeError('acquire count must be non-negative');
        }

        if (count === 0) {
            this.hideInactive(0);
            return [];
        }

        if (count > this._maxSize) {
            throw new RangeError(`Requested ${count} particles exceeds pool maxSize ${this._maxSize}`);
        }

        const inits: ParticleInit[] = [];
        for (let i = 0; i < count; i++) {
            inits.push(init(i));
        }

        while (this._shards.length < count) {
            const index = this._shards.length;
            const particle = inits[index];
            const shard = this._container.createCircle({
                parent: this._parent,
                cx: particle.cx ?? 0,
                cy: particle.cy ?? 0,
                r: particle.r ?? 4,
                fill: particle.fill,
                stroke: particle.stroke,
                strokeWidth: particle.strokeWidth,
                opacity: particle.opacity ?? 1,
            });
            this._shards.push(shard);
        }

        const active: CircleElement[] = [];
        for (let i = 0; i < count; i++) {
            const shard = this._shards[i];
            this.applyInit(shard, inits[i]);
            this.showShard(shard);
            active.push(shard);
        }

        this.hideInactive(count);
        return active;
    }

    release(index: number): void {
        if (index >= 0 && index < this._shards.length) {
            this.hideShard(this._shards[index]);
        }
    }

    reset(): void {
        for (const shard of this._shards) {
            this._container.removeShard(shard);
        }
        this._shards = [];
    }

    private hideInactive(fromIndex: number): void {
        for (let i = fromIndex; i < this._shards.length; i++) {
            this.hideShard(this._shards[i]);
        }
    }

    private hideShard(shard: CircleElement): void {
        shard.opacity = HIDDEN_OPACITY;
    }

    private showShard(shard: CircleElement): void {
        if (shard.opacity === HIDDEN_OPACITY) {
            shard.opacity = 1;
        }
    }

    private applyInit(shard: CircleElement, particle: ParticleInit): void {
        if (particle.cx !== undefined) {
            shard.cx = particle.cx;
        }
        if (particle.cy !== undefined) {
            shard.cy = particle.cy;
        }
        if (particle.r !== undefined) {
            shard.r = particle.r;
        }
        if (particle.fill !== undefined) {
            shard.fill = particle.fill;
        }
        if (particle.stroke !== undefined) {
            shard.stroke = particle.stroke;
        }
        if (particle.strokeWidth !== undefined) {
            shard.strokeWidth = particle.strokeWidth;
        }
        if (particle.opacity !== undefined) {
            shard.opacity = particle.opacity;
        }
    }
}
