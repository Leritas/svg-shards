import type { HighlightOptions } from '../../../src/core/types';
import type { SvgElement } from '../../../src/core/SvgElement';
import type { Lesson } from '../types';
import { btn, el } from '../types';

type PanelMode = 'orange' | 'outline' | null;

export const highlightLesson: Lesson = {
    id: 'highlight',
    title: 'Highlight — visual state',
    description:
        'applyHighlight saves the previous look and changes attributes; clearHighlight restores it. Always restore before applying again — otherwise strokeWidthBoost stacks. Buttons here toggle on/off.',
    apiRefs: ['SvgElement.applyHighlight', 'SvgElement.clearHighlight', 'SvgElement.captureVisualState'],
    snippet: `const prev = shard.applyHighlight({ fill: '#ff6600' });
// … show selection …
shard.clearHighlight(prev);   // back to original

// toggle pattern:
if (prev) { clearHighlight(prev); prev = null; }
else { prev = applyHighlight({ ... }); }`,
    mount(panel, ctx) {
        const svg = ctx.getContainer();
        const panelShard = svg.getById('panel');
        if (!panelShard) {
            return () => {};
        }

        const hint = el('p', {
            className: 'lesson-hint',
            textContent:
                'Each button toggles: 1st click applyHighlight, 2nd click clearHighlight (original colors). Re-applying without clear stacks strokeWidthBoost — that is why we restore first.',
        });
        panel.appendChild(hint);

        let panelPrevious: ReturnType<SvgElement['captureVisualState']> | null = null;
        let panelMode: PanelMode = null;

        const restorePanel = (): void => {
            if (panelPrevious) {
                panelShard.clearHighlight(panelPrevious);
                panelPrevious = null;
                panelMode = null;
            }
        };

        const togglePanel = (mode: PanelMode, options: HighlightOptions, label: string): void => {
            if (panelMode === mode) {
                restorePanel();
                ctx.highlightShard(null);
                ctx.log('clearHighlight(panel)', 'toggle off');
                return;
            }

            restorePanel();
            panelPrevious = panelShard.applyHighlight(options);
            panelMode = mode;
            ctx.highlightShard(panelShard);
            ctx.log(label, 'toggle on');
        };

        const row = el('div', { className: 'btn-row' });
        row.appendChild(
            btn('applyHighlight (orange)', () => {
                togglePanel(
                    'orange',
                    { fill: '#ff6600', stroke: '#ff6600', strokeWidthBoost: 3 },
                    'applyHighlight orange',
                );
            }),
        );
        row.appendChild(
            btn('applyHighlight (outline)', () => {
                togglePanel('outline', { fill: 'none', stroke: '#4a90d9', strokeWidth: 4 }, 'applyHighlight outline');
            }),
        );
        row.appendChild(
            btn('clearHighlight', () => {
                restorePanel();
                ctx.highlightShard(null);
                ctx.log('clearHighlight(panel)', 'restored');
            }),
        );
        row.appendChild(
            btn('captureVisualState', () => {
                ctx.log('captureVisualState(panel)', JSON.stringify(panelShard.captureVisualState()));
            }),
        );
        panel.appendChild(row);

        const targetPrevious = new Map<string, ReturnType<SvgElement['captureVisualState']>>();

        const toggleTarget = (id: string, options: HighlightOptions): void => {
            const shard = svg.getById(id);
            if (!shard) {
                return;
            }

            const existing = targetPrevious.get(id);
            if (existing) {
                shard.clearHighlight(existing);
                targetPrevious.delete(id);
                ctx.highlightShard(null);
                ctx.log(`clearHighlight('${id}')`, 'toggle off');
                return;
            }

            for (const [otherId, prev] of targetPrevious) {
                const other = svg.getById(otherId);
                other?.clearHighlight(prev);
            }
            targetPrevious.clear();

            targetPrevious.set(id, shard.applyHighlight(options));
            ctx.highlightShard(shard);
            ctx.log(`applyHighlight('${id}')`, 'toggle on');
        };

        const targetRow = el('div', { className: 'btn-row' });
        for (const id of ['sun', 'moon', 'badge']) {
            targetRow.appendChild(
                btn(`Highlight ${id}`, () => {
                    toggleTarget(id, { fill: '#805ad5', strokeWidthBoost: 2 });
                }),
            );
        }
        panel.appendChild(targetRow);

        const cleanup = (): void => {
            restorePanel();
            for (const [id, prev] of targetPrevious) {
                svg.getById(id)?.clearHighlight(prev);
            }
            targetPrevious.clear();
            ctx.highlightShard(null);
        };

        return cleanup;
    },
    reset(ctx) {
        ctx.resetScene();
    },
};
