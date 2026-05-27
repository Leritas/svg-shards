import { ParticleField } from '../../../src/ParticleField';
import type { Lesson } from '../types';
import { btn, el } from '../types';
import { ensureParticlesGroup, PARTICLE_BOUNDS, randomHsl, createFpsTracker } from './shared';

export const lifecycleLesson: Lesson = {
    id: 'particles-lifecycle',
    title: 'Lifecycle — start / stop / dispose',
    description:
        'start() begins the scheduleBatch loop; stop() freezes simulation (shards stay in DOM); dispose() stops, removes all particle nodes, and clears SoA state. Tune gravity while stopped — values apply on resume.',
    apiRefs: ['ParticleField.start', 'stop', 'dispose', 'scheduleBatch'],
    snippet: `field.spawn(40, init);
field.start();   // rAF loop via scheduleBatch

field.stop();    // freeze — cx/cy unchanged
field.gravity = 0;
field.start();   // resume with new g

field.dispose(); // remove DOM + clear state`,
    mount(panel, ctx) {
        const container = ctx.getContainer();
        const group = ensureParticlesGroup(container);

        let field: ParticleField | null = null;
        let running = false;
        let gravity = 600;
        const fps = createFpsTracker(false);

        const stateEl = el('strong', { textContent: 'idle' });
        const countEl = el('strong', { textContent: '0' });
        const readout = el('div', { className: 'particles-readout' }, [
            document.createTextNode('state: '),
            stateEl,
            document.createTextNode(' · particles: '),
            countEl,
            document.createTextNode(' · g: '),
            el('strong', { id: 'life-g', textContent: '600' }),
        ]);

        const updateReadout = (): void => {
            stateEl.textContent = running ? 'running' : field ? 'paused' : 'idle';
            countEl.textContent = String(field?.count ?? 0);
            const gLabel = readout.querySelector('#life-g');
            if (gLabel) {
                gLabel.textContent = String(gravity);
            }
        };

        const makeField = (): ParticleField => {
            return new ParticleField(container, {
                bounds: PARTICLE_BOUNDS,
                gravity,
                restitution: 0.88,
                parent: group,
            });
        };

        const spawn = (): void => {
            field?.dispose();
            field = makeField();
            field.spawn(40, (i) => ({
                cx: 60 + (i % 8) * 40,
                cy: 40 + Math.floor(i / 8) * 35,
                r: 5,
                vx: (Math.random() - 0.5) * 80,
                vy: (Math.random() - 0.5) * 40,
                fill: randomHsl(i, 14),
            }));
            running = false;
            ctx.log('spawn', '40 particles');
            updateReadout();
        };

        const row = el('div', { className: 'btn-row' });
        row.appendChild(btn('1. spawn', spawn));
        row.appendChild(
            btn('2. start', () => {
                if (!field || field.count === 0) {
                    ctx.log('start', 'spawn first');
                    return;
                }
                field.start();
                running = true;
                fps.setActive(true);
                ctx.log('start');
                updateReadout();
            }),
        );
        row.appendChild(
            btn('3. stop', () => {
                field?.stop();
                running = false;
                fps.setActive(false);
                ctx.log('stop');
                updateReadout();
            }),
        );
        row.appendChild(
            btn('4. dispose', () => {
                field?.dispose();
                field = null;
                running = false;
                ctx.log('dispose');
                updateReadout();
            }),
        );

        const gravityRow = el('div', { className: 'control-row' });
        gravityRow.appendChild(document.createTextNode('Gravity (live while paused) '));
        const gInput = el('input', { type: 'range', min: '0', max: '1600', value: '600' }) as HTMLInputElement;
        gInput.addEventListener('input', () => {
            gravity = Number(gInput.value);
            if (field) {
                field.gravity = gravity;
            }
            updateReadout();
        });
        gravityRow.appendChild(gInput);

        panel.appendChild(
            el('p', {
                className: 'lesson-hint',
                textContent:
                    'Walk through numbered steps. Stop, change gravity to 0, then start — particles float instead of falling.',
            }),
        );
        panel.appendChild(readout);
        panel.appendChild(fps.element);
        panel.appendChild(row);
        panel.appendChild(gravityRow);
        updateReadout();

        return () => {
            fps.dispose();
            field?.dispose();
            field = null;
        };
    },
    reset(ctx) {
        ctx.log('reset', 'particles-lifecycle');
    },
};
