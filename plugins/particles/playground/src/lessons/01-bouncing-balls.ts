import { ParticleField } from '../../../src/ParticleField';
import type { Lesson } from '../types';
import { btn, el } from '../types';
import { ensureParticlesGroup, PARTICLE_BOUNDS, createFpsTracker } from './shared';

const BOUNDS = PARTICLE_BOUNDS;

export const bouncingBallsLesson: Lesson = {
    id: 'bouncing-balls',
    title: 'Bouncing balls — ParticleField',
    description:
        'ParticleField spawns circle shards via svg.createMany, simulates velocity + gravity with Euler integration, and bounces off the viewBox walls at 60fps via scheduleBatch.',
    apiRefs: ['ParticleField', 'spawn', 'start', 'stop', 'svg.createMany', 'scheduleBatch'],
    snippet: `const field = new ParticleField(svg, {
  bounds: { width: 400, height: 300 },
  gravity: 980,
  restitution: 0.9,
});

field.spawn(150, (i) => ({
  cx: Math.random() * 400,
  cy: Math.random() * 100,
  r: 4 + Math.random() * 6,
  vx: (Math.random() - 0.5) * 200,
  vy: (Math.random() - 0.5) * 100,
  fill: \`hsl(\${(i * 7) % 360}, 80%, 55%)\`,
}));

field.start();`,
    mount(panel, ctx) {
        const container = ctx.getContainer();
        const group = ensureParticlesGroup(container);

        let field: ParticleField | null = new ParticleField(container, {
            bounds: BOUNDS,
            gravity: 980,
            restitution: 0.9,
            parent: group,
        });

        let running = true;
        let gravity = 980;
        let restitution = 0.9;
        const fps = createFpsTracker(true);

        const readout = el('div', { className: 'particles-readout' }, [
            document.createTextNode('particles: '),
            el('strong', { textContent: '0' }),
            document.createTextNode(' · gravity '),
            el('strong', { textContent: '980' }),
            document.createTextNode(' · restitution '),
            el('strong', { textContent: '0.90' }),
        ]);
        const countEl = readout.querySelector('strong:nth-of-type(1)')!;
        const gravityEl = readout.querySelector('strong:nth-of-type(2)')!;
        const restitutionEl = readout.querySelector('strong:nth-of-type(3)')!;

        const updateReadout = (): void => {
            countEl.textContent = String(field?.count ?? 0);
            gravityEl.textContent = String(gravity);
            restitutionEl.textContent = restitution.toFixed(2);
        };

        const spawn = (count: number): void => {
            field?.dispose();
            field = new ParticleField(container, {
                bounds: BOUNDS,
                gravity,
                restitution,
                parent: group,
            });
            field.spawn(count, (i) => ({
                cx: Math.random() * BOUNDS.width,
                cy: Math.random() * (BOUNDS.height * 0.4),
                r: 4 + Math.random() * 6,
                vx: (Math.random() - 0.5) * 200,
                vy: (Math.random() - 0.5) * 100,
                fill: `hsl(${(i * 7) % 360}, 80%, 55%)`,
            }));
            if (running) {
                field.start();
            }
            ctx.log('field.spawn', String(count));
            updateReadout();
        };

        spawn(100);
        field?.start();

        const row = el('div', { className: 'btn-row' });
        row.appendChild(btn('Spawn 50', () => spawn(50)));
        row.appendChild(btn('Spawn 200', () => spawn(200)));
        row.appendChild(
            btn('Clear', () => {
                field?.dispose();
                field = new ParticleField(container, {
                    bounds: BOUNDS,
                    gravity,
                    restitution,
                    parent: group,
                });
                updateReadout();
                ctx.log('field.dispose', 'cleared');
            }),
        );
        row.appendChild(
            btn('Pause', () => {
                running = false;
                field?.stop();
                fps.setActive(false);
                ctx.log('field.stop');
            }),
        );
        row.appendChild(
            btn('Resume', () => {
                running = true;
                field?.start();
                fps.setActive(true);
                ctx.log('field.start');
            }),
        );

        const gravityRow = el('div', { className: 'control-row' });
        gravityRow.appendChild(document.createTextNode('Gravity '));
        const gravityInput = el('input', { type: 'range', min: '0', max: '2000', value: '980' }) as HTMLInputElement;
        gravityInput.addEventListener('input', () => {
            gravity = Number(gravityInput.value);
            if (field) {
                field.gravity = gravity;
            }
            updateReadout();
        });
        gravityRow.appendChild(gravityInput);

        const restitutionRow = el('div', { className: 'control-row' });
        restitutionRow.appendChild(document.createTextNode('Restitution '));
        const restitutionInput = el('input', {
            type: 'range',
            min: '0',
            max: '100',
            value: '90',
        }) as HTMLInputElement;
        restitutionInput.addEventListener('input', () => {
            restitution = Number(restitutionInput.value) / 100;
            if (field) {
                field.restitution = restitution;
            }
            updateReadout();
        });
        restitutionRow.appendChild(restitutionInput);

        panel.appendChild(readout);
        panel.appendChild(fps.element);
        panel.appendChild(row);
        panel.appendChild(gravityRow);
        panel.appendChild(restitutionRow);
        updateReadout();

        return () => {
            running = false;
            fps.dispose();
            field?.dispose();
            field = null;
        };
    },
    reset(ctx) {
        ctx.log('reset', 'bouncing-balls');
    },
};
