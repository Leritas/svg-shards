import { ParticleField } from '../../../src/ParticleField';
import type { Lesson } from '../types';
import { btn, el } from '../types';
import { ensureParticlesGroup, PARTICLE_BOUNDS, randomHsl, createFpsTracker } from './shared';

export const physicsMechanicsLesson: Lesson = {
    id: 'particles-physics',
    title: 'Physics — gravity, restitution, bounds',
    description:
        'Each frame: v += g·dt, p += v·dt, then wall bounce. Restitution e flips velocity and scales by e (e=1 elastic, e→0 damped). bounds is the AABB [0,W]×[0,H] for circle radius r.',
    apiRefs: ['integrateParticle', 'resolveWallBounce', 'field.gravity', 'field.restitution', 'field.bounds'],
    snippet: `// Euler step
vy += gravity * dt;
cx += vx * dt;
cy += vy * dt;

// left wall: if cx - r < 0 → cx = r, vx = -vx * e
field.gravity = 980;      // px/s²
field.restitution = 0.92; // e ∈ [0, 1]
field.bounds = { width: 400, height: 300 };`,
    mount(panel, ctx) {
        const container = ctx.getContainer();
        const group = ensureParticlesGroup(container);

        let gravity = 980;
        let restitution = 0.92;

        let field = new ParticleField(container, {
            bounds: PARTICLE_BOUNDS,
            gravity,
            restitution,
            parent: group,
        });

        const fps = createFpsTracker(true);

        const formula = el('pre', {
            className: 'formula-readout',
            textContent: 'v_y ← v_y + g·dt   |   bounce: v ← −v·e',
        });

        const readout = el('div', { className: 'particles-readout' }, [
            document.createTextNode('g = '),
            el('strong', { id: 'g-val', textContent: '980' }),
            document.createTextNode(' px/s² · e = '),
            el('strong', { id: 'e-val', textContent: '0.92' }),
        ]);

        const spawnFountain = (): void => {
            field.dispose();
            field = new ParticleField(container, {
                bounds: PARTICLE_BOUNDS,
                gravity,
                restitution,
                parent: group,
            });
            field.spawn(80, (i) => ({
                cx: PARTICLE_BOUNDS.width / 2 + (Math.random() - 0.5) * 16,
                cy: PARTICLE_BOUNDS.height - 12,
                r: 3 + Math.random() * 5,
                vx: (Math.random() - 0.5) * 100,
                vy: -(120 + Math.random() * 180),
                fill: randomHsl(i, 11),
            }));
            field.start();
            ctx.log('spawn fountain', `g=${gravity} e=${restitution}`);
        };

        const syncField = (): void => {
            field.gravity = gravity;
            field.restitution = restitution;
            const gEl = readout.querySelector('#g-val');
            const eEl = readout.querySelector('#e-val');
            if (gEl) {
                gEl.textContent = String(gravity);
            }
            if (eEl) {
                eEl.textContent = restitution.toFixed(2);
            }
        };

        const gravityRow = el('div', { className: 'control-row' });
        gravityRow.appendChild(document.createTextNode('Gravity g '));
        const gInput = el('input', { type: 'range', min: '0', max: '2400', value: '980' }) as HTMLInputElement;
        gInput.addEventListener('input', () => {
            gravity = Number(gInput.value);
            syncField();
        });
        gravityRow.appendChild(gInput);

        const restRow = el('div', { className: 'control-row' });
        restRow.appendChild(document.createTextNode('Restitution e '));
        const eInput = el('input', { type: 'range', min: '0', max: '100', value: '92' }) as HTMLInputElement;
        eInput.addEventListener('input', () => {
            restitution = Number(eInput.value) / 100;
            syncField();
        });
        restRow.appendChild(eInput);

        const presets = el('div', { className: 'btn-row' });
        presets.appendChild(
            btn('Feather (g=200, e=0.95)', () => {
                gravity = 200;
                restitution = 0.95;
                gInput.value = '200';
                eInput.value = '95';
                syncField();
                spawnFountain();
            }),
        );
        presets.appendChild(
            btn('Heavy (g=1800, e=0.4)', () => {
                gravity = 1800;
                restitution = 0.4;
                gInput.value = '1800';
                eInput.value = '40';
                syncField();
                spawnFountain();
            }),
        );
        presets.appendChild(
            btn('Zero-G drift', () => {
                gravity = 0;
                restitution = 1;
                gInput.value = '0';
                eInput.value = '100';
                syncField();
                spawnFountain();
            }),
        );

        panel.appendChild(formula);
        panel.appendChild(readout);
        panel.appendChild(fps.element);
        panel.appendChild(gravityRow);
        panel.appendChild(restRow);
        panel.appendChild(presets);

        spawnFountain();

        return () => {
            fps.dispose();
            field.dispose();
        };
    },
    reset(ctx) {
        ctx.log('reset', 'particles-physics');
    },
};
