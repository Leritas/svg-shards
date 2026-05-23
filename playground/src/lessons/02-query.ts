import type { Lesson } from '../types';
import { btn, el, shardLabel, shardTypeName } from '../types';

export const queryLesson: Lesson = {
    id: 'query',
    title: 'Query — find shards',
    description:
        'Look up shards by id, type, or CSS selector. getById uses getElementById and lazy-wraps nodes. query() returns all matches; queryOne() returns the first.',
    apiRefs: ['SvgContainer.getById', 'SvgContainer.getByType', 'SvgContainer.query', 'SvgContainer.queryOne'],
    snippet: `const sun = svg.getById('sun');
const accents = svg.query('[data-role="accent"]');
const first = svg.queryOne('#panel');`,
    mount(panel, ctx) {
        const svg = ctx.getContainer();
        const idInput = el('input', { type: 'text', value: 'sun' }) as HTMLInputElement;
        const selectorInput = el('input', {
            type: 'text',
            value: '[data-role="accent"]',
        }) as HTMLInputElement;

        panel.appendChild(
            el('div', { className: 'control-group' }, [el('label', { textContent: 'Element id' }), idInput]),
        );
        panel.appendChild(
            el('div', { className: 'control-group' }, [el('label', { textContent: 'CSS selector' }), selectorInput]),
        );

        const row = el('div', { className: 'btn-row' });
        row.appendChild(
            btn('getById', () => {
                const shard = svg.getById(idInput.value.trim());
                ctx.highlightShard(shard);
                ctx.log(`getById('${idInput.value}')`, shard ? shardLabel(shard, shardTypeName(shard)) : 'null');
            }),
        );
        row.appendChild(
            btn("getByType('circle')", () => {
                const circles = svg.getByType('circle');
                ctx.log("getByType('circle')", `${circles.length} shard(s)`);
                if (circles[0]) {
                    ctx.highlightShard(circles[0]);
                }
            }),
        );
        row.appendChild(
            btn('query', () => {
                const sel = selectorInput.value.trim();
                const results = svg.query(sel);
                ctx.log(`query('${sel}')`, `${results.length} match(es)`);
                results.forEach((s, i) => ctx.log(`  [${i}]`, shardLabel(s, shardTypeName(s))));
                ctx.highlightShard(results[0] ?? null);
            }),
        );
        row.appendChild(
            btn('queryOne', () => {
                const sel = selectorInput.value.trim();
                const shard = svg.queryOne(sel);
                ctx.highlightShard(shard);
                ctx.log(`queryOne('${sel}')`, shard ? shardLabel(shard, shardTypeName(shard)) : 'null');
            }),
        );
        panel.appendChild(row);

        return () => {};
    },
    reset(ctx) {
        ctx.resetScene();
    },
};
