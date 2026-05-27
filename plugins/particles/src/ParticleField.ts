import type { SvgContainer } from 'svg-shards';
import { scheduleBatch } from 'svg-shards/reactive';
import { ParticlePool } from './pool/ParticlePool';
import { stepParticles } from './physics/integrator';
import { ParticleState } from './state/ParticleState';
import type { Bounds, ParticleFieldOptions, ParticleInit } from './types';

const DEFAULT_RESTITUTION = 0.85;
const MAX_DT = 1 / 30;

export class ParticleField {
    private _container: SvgContainer;
    private _pool: ParticlePool;
    private _state = new ParticleState();
    private _bounds: Bounds;
    private _gravity: number;
    private _restitution: number;
    private _running = false;
    private _lastTime: number | null = null;

    constructor(container: SvgContainer, options: ParticleFieldOptions = {}) {
        this._container = container;
        this._bounds = options.bounds ?? this.defaultBounds(container);
        this._gravity = options.gravity ?? 0;
        this._restitution = options.restitution ?? DEFAULT_RESTITUTION;
        this._pool = new ParticlePool(container, { parent: options.parent });
    }

    get count(): number {
        return this._state.count;
    }

    get bounds(): Bounds {
        return this._bounds;
    }

    set bounds(value: Bounds) {
        this._bounds = value;
    }

    get gravity(): number {
        return this._gravity;
    }

    set gravity(value: number) {
        this._gravity = value;
    }

    get restitution(): number {
        return this._restitution;
    }

    set restitution(value: number) {
        this._restitution = value;
    }

    spawn(count: number, init: (index: number) => ParticleInit): void {
        this.stop();

        const inits: ParticleInit[] = [];
        for (let i = 0; i < count; i++) {
            inits.push(init(i));
        }

        const shards = this._pool.acquire(count, (i) => inits[i]);

        this._state.reset(count);
        this._state.shards = shards;

        for (let i = 0; i < count; i++) {
            const particle = inits[i];
            this._state.cx[i] = particle.cx ?? shards[i].cx;
            this._state.cy[i] = particle.cy ?? shards[i].cy;
            this._state.vx[i] = particle.vx ?? 0;
            this._state.vy[i] = particle.vy ?? 0;
            this._state.r[i] = particle.r ?? shards[i].r;
        }
    }

    start(): void {
        if (this._running || this._state.count === 0) {
            return;
        }

        this._running = true;
        this._lastTime = null;
        this.scheduleFrame();
    }

    stop(): void {
        this._running = false;
        this._lastTime = null;
    }

    dispose(): void {
        this.stop();
        this._pool.reset();
        this._state.clear();
    }

    private scheduleFrame(): void {
        scheduleBatch(() => {
            if (!this._running) {
                return;
            }

            const now = performance.now();
            const dt = this._lastTime === null ? 1 / 60 : Math.min((now - this._lastTime) / 1000, MAX_DT);
            this._lastTime = now;

            stepParticles(this._state, this._bounds, {
                gravity: this._gravity,
                dt,
                restitution: this._restitution,
            });

            this.scheduleFrame();
        });
    }

    private defaultBounds(container: SvgContainer): Bounds {
        const viewBox = container.viewBox;
        const width = viewBox.width || container.width || 400;
        const height = viewBox.height || container.height || 300;
        return { width, height };
    }
}
