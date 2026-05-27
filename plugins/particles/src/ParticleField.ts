import type { GroupElement, SvgContainer } from 'svg-shards';
import { scheduleBatch } from 'svg-shards/reactive';
import { stepParticles } from './physics/integrator';
import { spawnCircleParticles } from './spawn/circles';
import { ParticleState } from './state/ParticleState';
import type { Bounds, ParticleFieldOptions, ParticleInit } from './types';

const DEFAULT_RESTITUTION = 0.85;
const MAX_DT = 1 / 30;

export class ParticleField {
    private _container: SvgContainer;
    private _state = new ParticleState();
    private _bounds: Bounds;
    private _gravity: number;
    private _restitution: number;
    private _parent?: GroupElement;
    private _running = false;
    private _lastTime: number | null = null;

    constructor(container: SvgContainer, options: ParticleFieldOptions = {}) {
        this._container = container;
        this._bounds = options.bounds ?? this.defaultBounds(container);
        this._gravity = options.gravity ?? 0;
        this._restitution = options.restitution ?? DEFAULT_RESTITUTION;
        this._parent = options.parent;
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
        this.clearParticles();
        spawnCircleParticles(this._container, this._state, count, init, this._parent);
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
        this.clearParticles();
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

    private clearParticles(): void {
        for (const shard of this._state.shards) {
            shard.htmlNode.remove();
        }
        this._state.clear();
    }

    private defaultBounds(container: SvgContainer): Bounds {
        const viewBox = container.viewBox;
        const width = viewBox.width || container.width || 400;
        const height = viewBox.height || container.height || 300;
        return { width, height };
    }
}
