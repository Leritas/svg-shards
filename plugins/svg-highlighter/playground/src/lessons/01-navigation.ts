import { SvgHighlighter } from '../../../src/SvgHighlighter';
import type { Lesson } from '../types';
import { btn, el } from '../types';

export const navigationLesson: Lesson = {
    id: 'highlighter-nav',
    title: 'Navigation — highlightByIndex',
    description:
        'SvgHighlighter wraps shard navigation: highlight one entry at a time, toggle off by clicking the same index, walk the list with next/prev.',
    apiRefs: ['SvgHighlighter.create', 'highlightByIndex', 'highlightNext', 'highlightPrev', 'getElementList'],
    snippet: `const highlighter = SvgHighlighter.create(container, {
  highlightColor: '#ff6600',
});

highlighter.highlightByIndex(0);  // toggle on
highlighter.highlightByIndex(0);  // toggle off
highlighter.highlightNext();`,
    mount(panel, ctx) {
        const highlighter = SvgHighlighter.create(ctx.getContainer(), {
            highlightColor: '#ff6600',
            strokeWidthBoost: 2,
        })!;

        const list = el('ul', { className: 'shard-list' });

        const refreshList = (): void => {
            list.replaceChildren();
            const active = highlighter.getCurrentIndex();
            for (const [index, entry] of highlighter.getElementList().entries()) {
                const item = el('li', {
                    className: 'shard-list-item' + (index === active ? ' active' : ''),
                    textContent: `${entry.type} — ${entry.label}`,
                });
                item.addEventListener('click', () => {
                    highlighter.highlightByIndex(index);
                    ctx.highlightShard(entry.element);
                    ctx.log('highlightByIndex', String(index));
                    refreshList();
                });
                list.appendChild(item);
            }
        };

        const row = el('div', { className: 'btn-row' });
        row.appendChild(
            btn('← Prev', () => {
                highlighter.highlightPrev();
                const index = highlighter.getCurrentIndex();
                const entry = index >= 0 ? highlighter.getElementList()[index] : null;
                ctx.highlightShard(entry?.element ?? null);
                ctx.log('highlightPrev', entry?.label ?? 'none');
                refreshList();
            }),
        );
        row.appendChild(
            btn('Next →', () => {
                highlighter.highlightNext();
                const index = highlighter.getCurrentIndex();
                const entry = index >= 0 ? highlighter.getElementList()[index] : null;
                ctx.highlightShard(entry?.element ?? null);
                ctx.log('highlightNext', entry?.label ?? 'none');
                refreshList();
            }),
        );
        row.appendChild(
            btn('Clear', () => {
                highlighter.clearHighlight();
                ctx.highlightShard(null);
                ctx.log('clearHighlight');
                refreshList();
            }),
        );

        panel.appendChild(
            el('p', {
                className: 'lesson-hint',
                textContent: 'Click a shard in the list or use Prev/Next. Click the active item again to toggle off.',
            }),
        );
        panel.appendChild(row);
        panel.appendChild(list);
        refreshList();

        return () => {
            highlighter.destroy();
            ctx.highlightShard(null);
        };
    },
    reset(ctx) {
        ctx.resetScene();
    },
};
