import type { Lesson } from '../types';
import { btn, el } from '../types';
import {
    clearGroupChildren,
    ensureParticlesGroup,
    PARTICLE_BOUNDS,
    randomHsl,
    toParticlesContainer,
    type CircleShard,
} from './shared';

export const createShardsLesson: Lesson = {
    id: 'particles-create',
    title: 'Create shards — createCircle / createMany',
    description:
        'Before ParticleField: the core svg-shards API creates DOM nodes and registers shards immediately — no refresh(). createCircle adds one shard; createMany batch-creates via DocumentFragment.',
    apiRefs: ['createCircle', 'createMany', 'registerNode', 'GroupElement.adoptChild'],
    snippet: `const group = svg.getById('particles');

const dot = svg.createCircle({
  parent: group,
  cx: 120, cy: 80, r: 14,
  fill: '#f60', stroke: '#fff', strokeWidth: 2,
});

const batch = svg.createMany('circle', 24, (i) => ({
  parent: group,
  cx: 40 + (i % 8) * 42,
  cy: 160 + Math.floor(i / 8) * 36,
  r: 6,
  fill: \`hsl(\${(i * 15) % 360}, 75%, 55%)\`,
}));`,
    mount(panel, ctx) {
        const container = toParticlesContainer(ctx.getContainer());
        const group = ensureParticlesGroup(container);
        let created: CircleShard[] = [];

        const readout = el('p', {
            className: 'lesson-hint',
            textContent: 'Shards live in #particles group. Count updates without refresh().',
        });
        const countEl = el('strong', { textContent: '0' });
        const stats = el('div', { className: 'particles-readout' }, [
            document.createTextNode('circles in map: '),
            countEl,
            document.createTextNode(' · last r: '),
            el('strong', { id: 'last-r', textContent: '—' }),
        ]);

        const updateStats = (): void => {
            countEl.textContent = String(container.getByType('circle').length);
            const last = created[created.length - 1];
            const rEl = stats.querySelector('#last-r');
            if (rEl) {
                rEl.textContent = last ? String(Math.round(last.r)) : '—';
            }
        };

        const row = el('div', { className: 'btn-row' });
        row.appendChild(
            btn('createCircle', () => {
                const shard = container.createCircle({
                    parent: group,
                    cx: 40 + Math.random() * (PARTICLE_BOUNDS.width - 80),
                    cy: 40 + Math.random() * (PARTICLE_BOUNDS.height - 80),
                    r: 6 + Math.random() * 10,
                    fill: randomHsl(created.length, 23),
                    stroke: '#fff',
                    strokeWidth: 1,
                }) as CircleShard;
                created.push(shard);
                ctx.highlightShard(shard);
                ctx.log('createCircle', `r=${shard.r.toFixed(1)}`);
                updateStats();
            }),
        );
        row.appendChild(
            btn('createMany ×20', () => {
                const start = created.length;
                const batch = container.createMany('circle', 20, (i) => ({
                    parent: group,
                    cx: 30 + (i % 10) * 36,
                    cy: 40 + Math.floor(i / 10) * 40,
                    r: 5,
                    fill: randomHsl(start + i, 18),
                })) as CircleShard[];
                created = created.concat(batch);
                ctx.log('createMany', '20 circles');
                updateStats();
            }),
        );
        row.appendChild(
            btn('Clear group', () => {
                clearGroupChildren(group);
                created = [];
                ctx.highlightShard(null);
                ctx.log('clearGroupChildren');
                updateStats();
            }),
        );

        const radiusRow = el('div', { className: 'control-row' });
        radiusRow.appendChild(document.createTextNode('Resize last '));
        const radiusInput = el('input', { type: 'range', min: '2', max: '30', value: '10' }) as HTMLInputElement;
        radiusInput.addEventListener('input', () => {
            const last = created[created.length - 1];
            if (!last) {
                return;
            }
            last.r = Number(radiusInput.value);
            updateStats();
        });
        radiusRow.appendChild(radiusInput);

        panel.appendChild(readout);
        panel.appendChild(stats);
        panel.appendChild(row);
        panel.appendChild(radiusRow);
        updateStats();

        return () => {
            clearGroupChildren(group);
            created = [];
        };
    },
    reset(ctx) {
        ctx.log('reset', 'particles-create');
    },
};
