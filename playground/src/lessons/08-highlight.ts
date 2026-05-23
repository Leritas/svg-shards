import type { Lesson } from '../types';
import { btn, el } from '../types';

export const highlightLesson: Lesson = {
    id: 'highlight',
    title: 'Highlight — visual state',
    description:
        'Core API for temporary visual changes: applyHighlight captures previous state and returns it; clearHighlight restores. Used by the highlighter plugin but available on every shard.',
    apiRefs: ['SvgElement.applyHighlight', 'SvgElement.clearHighlight', 'SvgElement.captureVisualState'],
    snippet: `const prev = shard.applyHighlight({
  fill: '#ff6600',
  strokeWidthBoost: 2,
});
// later
shard.clearHighlight(prev);`,
    mount(panel, ctx) {
        const svg = ctx.getContainer();
        const panelShard = svg.getById('panel');
        if (!panelShard) {
            return () => {};
        }

        ctx.highlightShard(panelShard);

        let savedState = panelShard.captureVisualState();

        const row = el('div', { className: 'btn-row' });
        row.appendChild(
            btn('applyHighlight (orange)', () => {
                savedState = panelShard.applyHighlight({
                    fill: '#ff6600',
                    stroke: '#ff6600',
                    strokeWidthBoost: 3,
                });
                ctx.log('applyHighlight({ fill, stroke, strokeWidthBoost })', 'state saved');
            }),
        );
        row.appendChild(
            btn('applyHighlight (outline)', () => {
                savedState = panelShard.applyHighlight({
                    fill: 'none',
                    stroke: '#4a90d9',
                    strokeWidth: 4,
                });
                ctx.log('applyHighlight({ fill: none, stroke })', 'state saved');
            }),
        );
        row.appendChild(
            btn('clearHighlight', () => {
                panelShard.clearHighlight(savedState);
                ctx.log('clearHighlight(prev)', 'restored');
            }),
        );
        row.appendChild(
            btn('captureVisualState', () => {
                const state = panelShard.captureVisualState();
                ctx.log('captureVisualState()', JSON.stringify(state));
            }),
        );
        panel.appendChild(row);

        const targetRow = el('div', { className: 'btn-row' });
        for (const id of ['sun', 'moon', 'badge']) {
            targetRow.appendChild(
                btn(`Highlight ${id}`, () => {
                    const shard = svg.getById(id);
                    if (shard) {
                        ctx.highlightShard(shard);
                        savedState = shard.applyHighlight({ fill: '#805ad5', strokeWidthBoost: 2 });
                        ctx.log(`applyHighlight on '${id}'`);
                    }
                }),
            );
        }
        panel.appendChild(targetRow);

        return () => {
            panelShard.clearHighlight(savedState);
        };
    },
    reset(ctx) {
        ctx.resetScene();
    },
};
