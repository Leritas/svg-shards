import { ParticleField } from '../../../src/ParticleField';
import type { Lesson } from '../types';
import { btn, el } from '../types';
import { ensureParticlesGroup, PARTICLE_BOUNDS, randomHsl, createFpsTracker } from './shared';

type SpawnPattern = 'random' | 'grid' | 'ring' | 'fountain';

export const spawnInitLesson: Lesson = {
    id: 'particles-spawn',
    title: 'Spawn — init callback & parent group',
    description:
        'field.spawn(count, init) calls your init(i) for each particle. Return cx, cy, r, vx, vy, fill — ParticleField stores SoA arrays and creates circle shards via createMany. gravity=0 here so you see the spawn layout.',
    apiRefs: ['ParticleField.spawn', 'ParticleInit', 'parent: GroupElement', 'createMany'],
    snippet: `field.spawn(60, (i) => ({
  cx: 200 + Math.cos(i * 0.4) * 80,
  cy: 150 + Math.sin(i * 0.4) * 50,
  r: 4,
  vx: Math.cos(i) * 40,
  vy: Math.sin(i) * 40,
  fill: \`hsl(\${(i * 6) % 360}, 80%, 55%)\`,
}));`,
    mount(panel, ctx) {
        const container = ctx.getContainer();
        const group = ensureParticlesGroup(container);

        let field = new ParticleField(container, {
            bounds: PARTICLE_BOUNDS,
            gravity: 0,
            restitution: 0.85,
            parent: group,
        });

        let pattern: SpawnPattern = 'ring';
        const fps = createFpsTracker(true);

        const readout = el('div', { className: 'particles-readout' }, [
            document.createTextNode('pattern: '),
            el('strong', { id: 'pattern-label', textContent: 'ring' }),
            document.createTextNode(' · count: '),
            el('strong', { id: 'spawn-count', textContent: '0' }),
        ]);

        const buildInit = (kind: SpawnPattern, count: number) => {
            switch (kind) {
                case 'grid':
                    return (i: number) => ({
                        cx: 40 + (i % 10) * 34,
                        cy: 40 + Math.floor(i / 10) * 34,
                        r: 5,
                        vx: 0,
                        vy: 0,
                        fill: randomHsl(i, 12),
                    });
                case 'fountain':
                    return (i: number) => ({
                        cx: PARTICLE_BOUNDS.width / 2 + (Math.random() - 0.5) * 20,
                        cy: PARTICLE_BOUNDS.height - 20,
                        r: 3 + Math.random() * 4,
                        vx: (Math.random() - 0.5) * 120,
                        vy: -(80 + Math.random() * 160),
                        fill: randomHsl(i, 9),
                    });
                case 'random':
                    return (i: number) => ({
                        cx: Math.random() * PARTICLE_BOUNDS.width,
                        cy: Math.random() * PARTICLE_BOUNDS.height,
                        r: 3 + Math.random() * 7,
                        vx: (Math.random() - 0.5) * 60,
                        vy: (Math.random() - 0.5) * 60,
                        fill: randomHsl(i),
                    });
                case 'ring':
                default:
                    return (i: number) => {
                        const angle = (i / count) * Math.PI * 2;
                        return {
                            cx: 200 + Math.cos(angle) * 90,
                            cy: 150 + Math.sin(angle) * 55,
                            r: 4 + (i % 3),
                            vx: Math.cos(angle) * 50,
                            vy: Math.sin(angle) * 50,
                            fill: randomHsl(i, 6),
                        };
                    };
            }
        };

        const respawn = (count: number): void => {
            field.dispose();
            field = new ParticleField(container, {
                bounds: PARTICLE_BOUNDS,
                gravity: 0,
                restitution: 0.85,
                parent: group,
            });
            field.spawn(count, buildInit(pattern, count));
            field.start();

            const label = readout.querySelector('#pattern-label');
            const countLabel = readout.querySelector('#spawn-count');
            if (label) {
                label.textContent = pattern;
            }
            if (countLabel) {
                countLabel.textContent = String(field.count);
            }
            ctx.log('spawn', `${pattern} × ${count}`);
        };

        const row = el('div', { className: 'btn-row' });
        for (const kind of ['ring', 'grid', 'random', 'fountain'] as SpawnPattern[]) {
            row.appendChild(
                btn(kind, () => {
                    pattern = kind;
                    respawn(60);
                }),
            );
        }
        row.appendChild(btn('×120', () => respawn(120)));

        panel.appendChild(
            el('p', {
                className: 'lesson-hint',
                textContent:
                    'init(i) runs per particle — use i for angles, grids, or hues. Particles are appended to #particles via parent option.',
            }),
        );
        panel.appendChild(readout);
        panel.appendChild(fps.element);
        panel.appendChild(row);

        respawn(60);

        return () => {
            fps.dispose();
            field.dispose();
        };
    },
    reset(ctx) {
        ctx.log('reset', 'particles-spawn');
    },
};
