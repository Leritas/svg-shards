import type { Lesson } from '../types';
import { btn, el } from '../types';

export const syncLesson: Lesson = {
    id: 'sync',
    title: 'Sync & Refresh',
    description:
        'After DOM mutations, call refresh() to re-parse. Shard wrappers for existing nodes are reused (stable identity via WeakMap). Enable auto-refresh with MutationObserver.',
    apiRefs: ['SvgContainer.refresh', 'SvgContainer.enableAutoRefresh', 'NodeRegistry'],
    snippet: `svg.htmlNode.appendChild(newCircle);
svg.refresh();
// same wrapper object:
console.log(before === svg.getById('sun'));`,
    mount(panel, ctx) {
        let svg = ctx.getContainer();
        let autoObserve = false;
        let addedCount = 0;

        const status = el('span', { className: 'status-badge', textContent: 'Manual refresh' });

        const addCircle = (): void => {
            addedCount += 1;
            const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            c.setAttribute('id', `added-${addedCount}`);
            c.setAttribute('cx', String(60 + addedCount * 25));
            c.setAttribute('cy', '200');
            c.setAttribute('r', '8');
            c.setAttribute('fill', '#4a90d9');
            svg.htmlNode.appendChild(c);
            ctx.log('DOM appendChild(circle)', `id=added-${addedCount}`);
        };

        const toggleObserve = el('label', { className: 'toggle-row' });
        const observeCheckbox = el('input', { type: 'checkbox' }) as HTMLInputElement;
        toggleObserve.appendChild(observeCheckbox);
        toggleObserve.appendChild(document.createTextNode(' Auto-refresh (MutationObserver)'));

        observeCheckbox.addEventListener('change', () => {
            autoObserve = observeCheckbox.checked;
            if (autoObserve) {
                svg.enableAutoRefresh({ debounceMs: 32 });
                status.textContent = 'Observer ON';
                status.className = 'status-badge ok';
                ctx.log('enableAutoRefresh({ debounceMs: 32 })');
            } else {
                svg.disableAutoRefresh();
                status.textContent = 'Manual refresh';
                status.className = 'status-badge';
                ctx.log('disableAutoRefresh()');
            }
        });

        panel.appendChild(status);
        panel.appendChild(toggleObserve);

        const row = el('div', { className: 'btn-row' });
        row.appendChild(
            btn('Add circle to DOM', () => {
                addCircle();
                if (!autoObserve) {
                    ctx.log('Tip', 'Call refresh() or enable observer');
                }
            }),
        );
        row.appendChild(
            btn('refresh()', () => {
                const sunBefore = svg.getById('sun');
                svg.refresh();
                const sunAfter = svg.getById('sun');
                const same = sunBefore === sunAfter;
                ctx.log('refresh()', `circles: ${svg.getByType('circle').length}`);
                ctx.log('identity check sun', same ? 'SAME object ✓' : 'DIFFERENT ✗');
                status.textContent = same ? 'Identity preserved ✓' : 'Identity lost ✗';
                status.className = same ? 'status-badge ok' : 'status-badge warn';
            }),
        );
        row.appendChild(
            btn('Test lazy getById', () => {
                addCircle();
                const id = `added-${addedCount}`;
                const beforeRefresh = svg.getById(id);
                ctx.log(`getById('${id}') without refresh`, beforeRefresh ? 'wrapped ✓' : 'null');
                if (beforeRefresh) {
                    ctx.highlightShard(beforeRefresh);
                }
            }),
        );
        panel.appendChild(row);

        return () => {
            svg.disableAutoRefresh();
        };
    },
    reset(ctx) {
        ctx.resetScene();
    },
};
