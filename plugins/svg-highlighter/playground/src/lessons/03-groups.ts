import { SvgHighlighter } from '../../../src/SvgHighlighter';
import type { Lesson } from '../types';
import { btn, el } from '../types';

export const groupsLesson: Lesson = {
    id: 'highlighter-groups',
    title: 'Groups — descendant highlight',
    description:
        'Selecting a group entry highlights all non-group descendants inside it. Individual shards outside the group stay unchanged.',
    apiRefs: ['getHighlightTargets (internal)', 'GroupElement', 'highlightByIndex'],
    snippet: `// scene-group contains moon, trail, badge
const idx = entries.findIndex(e => e.type === 'group');
highlighter.highlightByIndex(idx);
// all visual descendants get the highlight binding`,
    mount(panel, ctx) {
        const highlighter = SvgHighlighter.create(ctx.getContainer(), {
            highlightColor: '#805ad5',
            strokeWidthBoost: 2,
            highlightMode: 'outline',
        })!;

        const status = el('p', { className: 'lesson-hint', textContent: 'No group selected.' });

        const highlightGroup = (): void => {
            const groupEntry = highlighter.getElementList().find((entry) => entry.type === 'group');
            if (!groupEntry) {
                return;
            }
            const index = highlighter.getElementList().indexOf(groupEntry);
            highlighter.highlightByIndex(index);
            ctx.highlightShard(groupEntry.element);
            status.textContent = `Highlighted ${groupEntry.label}: all visual descendants`;
            ctx.log('highlight group', groupEntry.label);
        };

        const row = el('div', { className: 'btn-row' });
        row.appendChild(btn('Highlight scene-group', highlightGroup));
        row.appendChild(
            btn('Clear', () => {
                highlighter.clearHighlight();
                ctx.highlightShard(null);
                status.textContent = 'No group selected.';
                ctx.log('clearHighlight');
            }),
        );

        panel.appendChild(
            el('p', {
                className: 'lesson-hint',
                textContent: 'The group entry expands to all visual children — try outline mode to see each part.',
            }),
        );
        panel.appendChild(row);
        panel.appendChild(status);

        return () => {
            highlighter.destroy();
            ctx.highlightShard(null);
        };
    },
    reset(ctx) {
        ctx.resetScene();
    },
};
