import type { CircleElement } from 'svg-shards';

export class ParticleState {
    count = 0;
    cx = new Float32Array(0);
    cy = new Float32Array(0);
    vx = new Float32Array(0);
    vy = new Float32Array(0);
    r = new Float32Array(0);
    shards: CircleElement[] = [];

    reset(count: number): void {
        this.count = count;
        this.cx = new Float32Array(count);
        this.cy = new Float32Array(count);
        this.vx = new Float32Array(count);
        this.vy = new Float32Array(count);
        this.r = new Float32Array(count);
        this.shards = [];
    }

    clear(): void {
        this.count = 0;
        this.cx = new Float32Array(0);
        this.cy = new Float32Array(0);
        this.vx = new Float32Array(0);
        this.vy = new Float32Array(0);
        this.r = new Float32Array(0);
        this.shards = [];
    }
}
