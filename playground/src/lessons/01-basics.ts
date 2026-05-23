import type { Lesson } from '../types';
import { btn, el } from '../types';

export const basicsLesson: Lesson = {
    id: 'basics',
    title: 'Basics — parse & access',
    description:
        'Wrap an existing SVG DOM tree with createSvgShards.fromElement(). The container exposes typed shard arrays via elements and a flat getAll() list with human-readable labels.',
    apiRefs: ['createSvgShards.fromElement', 'SvgContainer.elements', 'SvgContainer.getAll'],
    snippet: `const svg = createSvgShards.fromElement(svgElement);
console.log(svg.elements.circle.length);
svg.getAll().forEach(e => console.log(e.label, e.type));`,
    mount(panel, ctx) {
        const svg = ctx.getContainer();
        const counts = el('div', { className: 'control-hint' });
        const list = el('ul', { className: 'shard-list' });

        const refreshCounts = (): void => {
            counts.textContent = Object.entries(svg.elements)
                .filter(([, arr]) => arr.length > 0)
                .map(([type, arr]) => `${type}: ${arr.length}`)
                .join(' · ');
        };

        const refreshList = (): void => {
            list.replaceChildren();
            for (const entry of svg.getAll()) {
                const item = el('li', { textContent: `${entry.label} (${entry.type})` });
                item.addEventListener('click', () => {
                    list.querySelectorAll('li').forEach((li) => li.classList.remove('selected'));
                    item.classList.add('selected');
                    ctx.highlightShard(entry.element);
                    ctx.log(`getAll() → select`, `${entry.label} [${entry.type}]`);
                    ctx.setSnippet(
                        `const entry = svg.getAll().find(e => e.label === '${entry.label}');\n// type: ${entry.type}`,
                    );
                });
                list.appendChild(item);
            }
        };

        refreshCounts();
        refreshList();

        panel.appendChild(counts);
        panel.appendChild(list);

        const row = el('div', { className: 'btn-row' });
        row.appendChild(
            btn('Log getAll() labels', () => {
                const labels = svg
                    .getAll()
                    .map((e) => e.label)
                    .join(', ');
                ctx.log('getAll()', labels);
            }),
        );
        row.appendChild(
            btn('Log element counts', () => {
                refreshCounts();
                ctx.log('elements map', counts.textContent ?? '');
            }),
        );
        panel.appendChild(row);

        return () => {};
    },
    reset(ctx) {
        ctx.resetScene();
    },
};
