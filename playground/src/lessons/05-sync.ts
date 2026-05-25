import type { Lesson } from '../types';
import { btn, el } from '../types';
import type { SvgContainer } from '../../../src/core/SvgContainer';

function countDomCircles(svg: SvgContainer): number {
    return svg.htmlNode.querySelectorAll('circle').length;
}

export const syncLesson: Lesson = {
    id: 'sync',
    title: 'Sync & Refresh',
    description:
        'This lesson is about the library index, not the picture. Adding a circle updates the DOM immediately, but svg.getByType("circle") may stay behind until refresh() or a lazy getById(). Watch the stats panel and API log — the canvas only changes when you add circles.',
    apiRefs: ['SvgContainer.refresh', 'SvgContainer.enableAutoRefresh', 'NodeRegistry'],
    snippet: `svg.htmlNode.appendChild(newCircle);
// index stale until:
svg.refresh();           // full re-parse
// or
svg.getById('added-1');  // lazy wrap one node

const before = svg.getById('sun');
svg.refresh();
console.log(before === svg.getById('sun')); // true — same wrapper`,
    mount(panel, ctx) {
        const svg = ctx.getContainer();
        let autoObserve = false;
        let addedCount = 0;
        let lastAddedId: string | null = null;
        let lastHighlightedId: string | null = null;

        const hint = el('p', {
            className: 'lesson-hint',
            textContent:
                'Try: 1) Add circle — DOM count rises, index may lag. 2) refresh() — index catches up (canvas unchanged). 3) getById — finds new node without full refresh, highlights it.',
        });

        const syncStatus = el('span', { className: 'status-badge', textContent: 'Index in sync' });

        const domCountEl = el('strong', { textContent: '0' });
        const indexedCountEl = el('strong', { textContent: '0' });

        const stats = el('div', { className: 'sync-stats' }, [
            el('div', { className: 'sync-stat' }, [
                el('span', { className: 'sync-stat-label', textContent: 'Circles in DOM' }),
                domCountEl,
            ]),
            el('div', { className: 'sync-stat' }, [
                el('span', { className: 'sync-stat-label', textContent: 'Circles in index' }),
                indexedCountEl,
            ]),
        ]);

        const highlightLatest = (): void => {
            if (!lastAddedId) {
                return;
            }
            const shard = svg.getById(lastAddedId);
            if (!shard) {
                return;
            }
            ctx.highlightShard(shard);
            lastHighlightedId = lastAddedId;
        };

        const updateStats = (): void => {
            const dom = countDomCircles(svg);
            const indexed = svg.getByType('circle').length;
            domCountEl.textContent = String(dom);
            indexedCountEl.textContent = String(indexed);

            const stale = dom !== indexed;
            if (autoObserve) {
                syncStatus.textContent = stale ? 'Auto-sync pending…' : 'Auto-sync ✓';
            } else {
                syncStatus.textContent = stale ? 'Index stale — refresh or getById' : 'Index in sync ✓';
            }
            syncStatus.className = stale ? 'status-badge warn' : 'status-badge ok';
        };

        const onAfterRefresh = (): void => {
            updateStats();
            if (autoObserve && lastAddedId !== lastHighlightedId) {
                highlightLatest();
            }
        };

        svg.onAfterRefresh(onAfterRefresh);

        const addCircle = (): string => {
            addedCount += 1;
            const id = `added-${addedCount}`;
            const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            c.setAttribute('id', id);
            c.setAttribute('cx', String(60 + addedCount * 25));
            c.setAttribute('cy', '200');
            c.setAttribute('r', '8');
            c.setAttribute('fill', '#4a90d9');
            svg.htmlNode.appendChild(c);
            lastAddedId = id;
            lastHighlightedId = null;
            updateStats();
            ctx.log('appendChild(circle)', `id=${id}`);
            return id;
        };

        const toggleObserve = el('label', { className: 'toggle-row' });
        const observeCheckbox = el('input', { type: 'checkbox' }) as HTMLInputElement;
        toggleObserve.appendChild(observeCheckbox);
        toggleObserve.appendChild(document.createTextNode(' Auto-refresh (MutationObserver)'));

        observeCheckbox.addEventListener('change', () => {
            autoObserve = observeCheckbox.checked;
            if (autoObserve) {
                svg.enableAutoRefresh({ debounceMs: 32 });
                ctx.log('enableAutoRefresh({ debounceMs: 32 })', 'index follows DOM automatically');
                svg.refresh();
            } else {
                svg.disableAutoRefresh();
                ctx.log('disableAutoRefresh()', 'turn off to see stale index');
                updateStats();
            }
        });

        panel.appendChild(hint);
        panel.appendChild(syncStatus);
        panel.appendChild(stats);
        panel.appendChild(toggleObserve);

        const row = el('div', { className: 'btn-row' });
        row.appendChild(
            btn('1 · Add circle', () => {
                addCircle();
                if (!autoObserve) {
                    ctx.log('index', `${indexedCountEl.textContent} indexed vs ${domCountEl.textContent} in DOM`);
                }
            }),
        );
        row.appendChild(
            btn('2 · refresh()', () => {
                const sunBefore = svg.getById('sun');
                const indexedBefore = svg.getByType('circle').length;
                svg.refresh();
                const sunAfter = svg.getById('sun');
                const same = sunBefore === sunAfter;
                ctx.log('refresh()', `index ${indexedBefore} → ${svg.getByType('circle').length} (canvas unchanged)`);
                ctx.log('sun wrapper identity', same ? 'same object ✓' : 'different ✗');
                highlightLatest();
            }),
        );
        row.appendChild(
            btn('3 · getById (lazy)', () => {
                if (!lastAddedId) {
                    ctx.log('Tip', 'Click “1 · Add circle” first');
                    return;
                }
                const indexedBefore = svg.getByType('circle').length;
                const shard = svg.getById(lastAddedId);
                updateStats();
                ctx.highlightShard(shard);
                lastHighlightedId = lastAddedId;
                ctx.log(
                    `getById('${lastAddedId}') without refresh`,
                    shard ? `found ✓ · index ${indexedBefore} → ${svg.getByType('circle').length}` : 'null',
                );
            }),
        );
        panel.appendChild(row);

        updateStats();

        return () => {
            svg.onAfterRefresh(null);
            svg.disableAutoRefresh();
        };
    },
    reset(ctx) {
        ctx.resetScene();
    },
};
