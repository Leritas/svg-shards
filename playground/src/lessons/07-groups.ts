import type { GroupElement } from '../../../src/elements/GroupElement';
import type { Lesson } from '../types';
import { btn, el, shardLabel, shardTypeName } from '../types';

export const groupsLesson: Lesson = {
    id: 'groups',
    title: 'Groups — hierarchy',
    description:
        'On parse, GroupElement.children is populated with direct child shards. Use this to navigate nested SVG structure without manual DOM walking.',
    apiRefs: ['GroupElement.children', 'elements.group'],
    snippet: `const group = svg.getById('scene-group');
group.children.forEach(child => {
  console.log(child.id, child.htmlNode.tagName);
});`,
    mount(panel, ctx) {
        const svg = ctx.getContainer();
        const tree = el('div', { className: 'tree-view' });

        const renderTree = (): void => {
            tree.replaceChildren();
            const group = svg.getById('scene-group') as GroupElement | null;
            if (!group) {
                tree.textContent = 'scene-group not found';
                return;
            }

            const header = el('div', { className: 'tree-item' });
            header.innerHTML = `<strong>&lt;g id="scene-group"&gt;</strong> — ${group.children.length} children`;
            tree.appendChild(header);

            for (const child of group.children) {
                const item = el('div', { className: 'tree-item' });
                item.textContent = `  └ ${shardTypeName(child)}#${child.id || '?'}`;
                item.style.cursor = 'pointer';
                item.addEventListener('click', () => {
                    ctx.highlightShard(child);
                    ctx.log('group.children[]', shardLabel(child, shardTypeName(child)));
                });
                tree.appendChild(item);
            }

            ctx.highlightShard(group);
        };

        renderTree();
        panel.appendChild(tree);

        const row = el('div', { className: 'btn-row' });
        row.appendChild(
            btn('Log children ids', () => {
                const group = svg.getById('scene-group') as GroupElement | null;
                if (!group) return;
                const ids = group.children.map((c) => c.id || shardTypeName(c)).join(', ');
                ctx.log('scene-group.children', ids);
            }),
        );
        row.appendChild(
            btn('Highlight group bbox', () => {
                const group = svg.getById('scene-group') as GroupElement | null;
                if (group) {
                    ctx.highlightShard(group);
                    const box = group.getBoundingBox();
                    ctx.log('getBoundingBox()', `${box.width.toFixed(0)}×${box.height.toFixed(0)}`);
                }
            }),
        );
        panel.appendChild(row);

        return () => {};
    },
    reset(ctx) {
        ctx.resetScene();
    },
};
