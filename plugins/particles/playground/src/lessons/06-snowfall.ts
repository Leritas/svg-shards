import { scheduleBatch } from 'svg-shards/reactive';
import type { Lesson } from '../types';
import { btn, el } from '../types';
import {
    ensureParticlesGroup,
    PARTICLE_BOUNDS,
    createFpsTracker,
    toParticlesContainer,
    type SnowflakeShard,
} from './shared';
import {
    ensureSnowGradients,
    snowflakePath,
    snowflakeTransform,
    snowGradientFill,
    SNOWFLAKE_COUNT,
} from './snowflakes';

interface SnowState {
    count: number;
    cx: Float32Array;
    cy: Float32Array;
    vx: Float32Array;
    vy: Float32Array;
    rot: Float32Array;
    rotSpeed: Float32Array;
    scale: Float32Array;
    swayPhase: Float32Array;
    swayAmp: Float32Array;
    shards: SnowflakeShard[];
}

function createSnowState(count: number): SnowState {
    return {
        count,
        cx: new Float32Array(count),
        cy: new Float32Array(count),
        vx: new Float32Array(count),
        vy: new Float32Array(count),
        rot: new Float32Array(count),
        rotSpeed: new Float32Array(count),
        scale: new Float32Array(count),
        swayPhase: new Float32Array(count),
        swayAmp: new Float32Array(count),
        shards: [],
    };
}

function initSnowflake(state: SnowState, index: number, width: number, height: number, respawnY = true): void {
    state.cx[index] = Math.random() * width;
    state.cy[index] = respawnY ? Math.random() * height : -8 - Math.random() * 40;
    state.vx[index] = (Math.random() - 0.5) * 18;
    state.vy[index] = 28 + Math.random() * 52;
    state.rot[index] = Math.random() * 360;
    state.rotSpeed[index] = (Math.random() - 0.5) * 45;
    state.scale[index] = 0.35 + Math.random() * 0.55;
    state.swayPhase[index] = Math.random() * Math.PI * 2;
    state.swayAmp[index] = 8 + Math.random() * 22;
}

function stepSnowfall(
    state: SnowState,
    bounds: { width: number; height: number },
    step: number,
    wind: number,
    time: number,
): void {
    const { width, height } = bounds;

    for (let i = 0; i < state.count; i++) {
        const sway = Math.sin(time * 1.2 + state.swayPhase[i]) * state.swayAmp[i] * step;
        state.cx[i] += (state.vx[i] + wind + sway) * step;
        state.cy[i] += state.vy[i] * step;
        state.rot[i] += state.rotSpeed[i] * step;

        if (state.cy[i] > height + 12) {
            initSnowflake(state, i, width, height, false);
            state.cy[i] = -6 - Math.random() * 30;
        } else if (state.cx[i] < -16) {
            state.cx[i] = width + 8;
        } else if (state.cx[i] > width + 16) {
            state.cx[i] = -8;
        }

        state.shards[i].transform = snowflakeTransform(state.cx[i], state.cy[i], state.rot[i], state.scale[i]);
    }
}

export const snowfallLesson: Lesson = {
    id: 'particles-snowfall',
    title: 'Snowfall — path snowflakes & gradients',
    description:
        'Path snowflakes with radial gradients. Simulation uses real elapsed time (performance.now), so fall speed stays the same at 30 or 120 FPS. Speed slider scales motion without tying it to frame rate.',
    apiRefs: ['createMany(path)', 'performance.now', 'dt', 'scheduleBatch', 'snowflakePath'],
    snippet: `const now = performance.now();
const dt = Math.min((now - lastTime) / 1000, 1 / 30);
const step = dt * speed;
time += step;
stepSnowfall(state, bounds, step, wind, time);

// speed 1.0 = real-time; 2.0 = twice as fast`,
    mount(panel, ctx) {
        const container = toParticlesContainer(ctx.getContainer());
        const group = ensureParticlesGroup(container);
        ensureSnowGradients(container);

        let wind = 12;
        let speed = 1;
        let running = true;
        let time = 0;
        let lastTime: number | null = null;
        const MAX_DT = 1 / 30;
        const fps = createFpsTracker(true);

        let state = createSnowState(SNOWFLAKE_COUNT);

        const shards = container.createMany('path', SNOWFLAKE_COUNT, (i) => ({
            parent: group,
            d: snowflakePath(4.5 + (i % 5) * 0.9, i % 8),
            fill: snowGradientFill(i),
            stroke: i % 3 === 0 ? '#f8fbff' : '#dce8f5',
            strokeWidth: 0.25 + (i % 4) * 0.08,
            opacity: 0.72 + (i % 6) * 0.045,
        })) as SnowflakeShard[];

        state.shards = shards;
        for (let i = 0; i < SNOWFLAKE_COUNT; i++) {
            initSnowflake(state, i, PARTICLE_BOUNDS.width, PARTICLE_BOUNDS.height);
            shards[i].transform = snowflakeTransform(state.cx[i], state.cy[i], state.rot[i], state.scale[i]);
        }

        const scheduleFrame = (): void => {
            scheduleBatch(() => {
                if (!running) {
                    return;
                }

                const now = performance.now();
                const rawDt = lastTime === null ? 1 / 60 : (now - lastTime) / 1000;
                lastTime = now;
                const dt = Math.min(rawDt, MAX_DT);
                const step = dt * speed;

                time += step;
                stepSnowfall(state, PARTICLE_BOUNDS, step, wind, time);
                scheduleFrame();
            });
        };

        scheduleFrame();

        const countEl = el('strong', { id: 'snow-count', textContent: String(SNOWFLAKE_COUNT) });
        const readout = el('div', { className: 'particles-readout' }, [
            document.createTextNode('snowflakes: '),
            countEl,
            document.createTextNode(' · wind: '),
            el('strong', { id: 'snow-wind', textContent: '12' }),
            document.createTextNode(' · speed: '),
            el('strong', { id: 'snow-speed', textContent: '1.00×' }),
        ]);

        const updateCount = (): void => {
            countEl.textContent = String(state.count);
        };

        const windRow = el('div', { className: 'control-row' });
        windRow.appendChild(document.createTextNode('Wind '));
        const windInput = el('input', { type: 'range', min: '-40', max: '40', value: '12' }) as HTMLInputElement;
        windInput.addEventListener('input', () => {
            wind = Number(windInput.value);
            const label = readout.querySelector('#snow-wind');
            if (label) {
                label.textContent = String(wind);
            }
        });
        windRow.appendChild(windInput);

        const speedRow = el('div', { className: 'control-row' });
        speedRow.appendChild(document.createTextNode('Speed '));
        const speedInput = el('input', {
            type: 'range',
            min: '25',
            max: '300',
            value: '100',
        }) as HTMLInputElement;
        speedInput.addEventListener('input', () => {
            speed = Number(speedInput.value) / 100;
            const label = readout.querySelector('#snow-speed');
            if (label) {
                label.textContent = `${speed.toFixed(2)}×`;
            }
        });
        speedRow.appendChild(speedInput);

        const row = el('div', { className: 'btn-row' });
        row.appendChild(
            btn('Pause', () => {
                running = false;
                fps.setActive(false);
                ctx.log('snow', 'pause');
            }),
        );
        row.appendChild(
            btn('Resume', () => {
                running = true;
                lastTime = null;
                fps.setActive(true);
                scheduleFrame();
                ctx.log('snow', 'resume');
            }),
        );
        row.appendChild(
            btn('Blizzard (+50)', () => {
                const extra = 50;
                const start = state.count;
                const newShards = container.createMany('path', extra, (i) => {
                    const idx = start + i;
                    return {
                        parent: group,
                        d: snowflakePath(4 + (idx % 4), idx % 7),
                        fill: snowGradientFill(idx),
                        stroke: '#eef6ff',
                        strokeWidth: 0.3,
                        opacity: 0.8,
                    };
                }) as SnowflakeShard[];

                const next = createSnowState(start + extra);
                for (let i = 0; i < start; i++) {
                    next.cx[i] = state.cx[i];
                    next.cy[i] = state.cy[i];
                    next.vx[i] = state.vx[i];
                    next.vy[i] = state.vy[i];
                    next.rot[i] = state.rot[i];
                    next.rotSpeed[i] = state.rotSpeed[i];
                    next.scale[i] = state.scale[i];
                    next.swayPhase[i] = state.swayPhase[i];
                    next.swayAmp[i] = state.swayAmp[i];
                    next.shards[i] = state.shards[i];
                }
                for (let i = 0; i < extra; i++) {
                    const idx = start + i;
                    initSnowflake(next, idx, PARTICLE_BOUNDS.width, PARTICLE_BOUNDS.height);
                    next.shards[idx] = newShards[i];
                    newShards[i].transform = snowflakeTransform(
                        next.cx[idx],
                        next.cy[idx],
                        next.rot[idx],
                        next.scale[idx],
                    );
                }
                state = next;
                updateCount();
                ctx.log('snow', `+${extra} flakes → ${state.count}`);
            }),
        );

        panel.appendChild(
            el('p', {
                className: 'lesson-hint',
                textContent:
                    'dt comes from performance.now — same fall speed at 30 or 120 FPS. Speed multiplies motion (1× = default, 2× = twice as fast).',
            }),
        );
        panel.appendChild(readout);
        panel.appendChild(fps.element);
        panel.appendChild(windRow);
        panel.appendChild(speedRow);
        panel.appendChild(row);

        return () => {
            running = false;
            fps.dispose();
            for (const shard of state.shards) {
                shard.htmlNode.remove();
            }
            container.htmlNode.querySelector('#snow-defs')?.remove();
        };
    },
    reset(ctx) {
        ctx.log('reset', 'particles-snowfall');
    },
};
