import { signal } from 'svg-shards/reactive';
import { SvgHighlighter } from '../../../src/SvgHighlighter';
import type { Lesson } from '../types';
import { btn, el } from '../types';

export const modesLesson: Lesson = {
    id: 'highlighter-modes',
    title: 'Modes — fill & outline',
    description:
        'Highlight style is driven by reactive signals internally. Switch fill/outline at runtime or bind highlightColor to a signal — the active highlight updates without re-capture.',
    apiRefs: ['setHighlightMode', 'SignalLike highlightColor', 'bindVisual'],
    snippet: `const color = signal('#ff6600');
const highlighter = SvgHighlighter.create(container, {
  highlightColor: color,
  highlightMode: 'fill',
});

highlighter.highlightByIndex(2);
highlighter.setHighlightMode('outline');
color.value = '#4a90d9';  // live update`,
    mount(panel, ctx) {
        const color = signal('#ff6600');
        const highlighter = SvgHighlighter.create(ctx.getContainer(), {
            highlightColor: color,
            strokeWidthBoost: 2,
        })!;

        const colorInput = el('input', { type: 'color', value: '#ff6600' }) as HTMLInputElement;
        colorInput.addEventListener('input', () => {
            color.value = colorInput.value;
            ctx.log('highlightColor signal', color.value);
        });

        const modeRow = el('div', { className: 'btn-row' });
        modeRow.appendChild(
            btn('Fill mode', () => {
                highlighter.setHighlightMode('fill');
                ctx.log('setHighlightMode', 'fill');
            }),
        );
        modeRow.appendChild(
            btn('Outline mode', () => {
                highlighter.setHighlightMode('outline');
                ctx.log('setHighlightMode', 'outline');
            }),
        );

        const targetRow = el('div', { className: 'btn-row' });
        for (const id of ['panel', 'sun', 'badge']) {
            targetRow.appendChild(
                btn(`Highlight ${id}`, () => {
                    const index = highlighter.getElementList().findIndex((entry) => entry.element.id === id);
                    if (index >= 0) {
                        highlighter.highlightByIndex(index);
                        ctx.highlightShard(highlighter.getElementList()[index]!.element);
                        ctx.log('highlightByIndex', id);
                    }
                }),
            );
        }

        panel.appendChild(
            el('p', {
                className: 'lesson-hint',
                textContent: 'Pick a shard, then switch mode or drag the color picker — changes apply reactively.',
            }),
        );
        panel.appendChild(el('label', { className: 'color-field', textContent: 'Color ' }, [colorInput]));
        panel.appendChild(modeRow);
        panel.appendChild(targetRow);

        return () => {
            highlighter.destroy();
            ctx.highlightShard(null);
        };
    },
    reset(ctx) {
        ctx.resetScene();
    },
};
