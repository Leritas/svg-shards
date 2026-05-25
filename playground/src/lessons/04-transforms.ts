import { signal } from '../../../src/reactive';
import { Transformation } from '../../../src/core/Transformation';
import { bindTransform } from '../../../src/reactive/bindTransform';
import type { Lesson } from '../types';
import { btn, el } from '../types';
import type { RectElement } from '../../../src/elements/shapes/RectElement';

function rectCenter(rect: RectElement): { x: number; y: number } {
    return {
        x: rect.x + rect.width / 2,
        y: rect.y + rect.height / 2,
    };
}

function mountSizingTable(parent: HTMLElement): void {
    const table = el('table', { className: 'sizing-table' });
    const thead = el('thead');
    const headRow = el('tr');
    for (const label of ['Approach', 'API', 'Drift?']) {
        headRow.appendChild(el('th', { textContent: label }));
    }
    thead.appendChild(headRow);
    table.appendChild(thead);

    const tbody = el('tbody');
    const rows: Array<[string, string, string]> = [
        ['Resize attrs', 'panel.width = 144', 'No — top-left fixed'],
        ['scale transform', 'panel.scale(1.2)', 'Yes — from (0,0)'],
        ['scaleAt pivot', 'panel.scaleAt(1.2, 1.2, cx, cy)', 'No — grows in place'],
        ['Matrix + bind', 'Transformation.scaleAt(...) + bindTransform', 'Composable pivot'],
    ];
    for (const [approach, api, drift] of rows) {
        const row = el('tr');
        row.appendChild(el('td', { textContent: approach }));
        row.appendChild(el('td', { textContent: api }));
        row.appendChild(el('td', { textContent: drift }));
        tbody.appendChild(row);
    }
    table.appendChild(tbody);
    parent.appendChild(table);
}

export const transformsLesson: Lesson = {
    id: 'transforms',
    title: 'Transforms — imperative & matrix',
    description:
        'Three ways to change size: resize attributes (top-left anchor), scale() transform (SVG origin), scaleAt() transform (your pivot). Transform helpers prepend and stack on each click.',
    apiRefs: [
        'RectElement.resize',
        'SvgElement.scale',
        'SvgElement.scaleAt',
        'Transformation.scaleAt',
        'bindTransform',
    ],
    snippet: `panel.scale(1.2);                    // drift from (0,0)
panel.scaleAt(1.2, 1.2, cx, cy);      // in place

const matrix = signal(
  Transformation.identity().scaleAt(1.2, 1.2, cx, cy)
);
bindTransform(panel, matrix);`,
    mount(panelEl, ctx) {
        const svg = ctx.getContainer();
        const panel = svg.getById('panel') as RectElement | null;
        if (!panel) {
            panelEl.appendChild(el('p', { textContent: 'Panel shard not found' }));
            return () => {};
        }

        ctx.highlightShard(panel);
        mountSizingTable(panelEl);

        let unbind: (() => void) | null = null;
        const matrixSignal = signal(Transformation.identity());
        let matrixMode = false;

        const pivot = () => rectCenter(panel);

        const applyMatrix = (): void => {
            const { x: cx, y: cy } = pivot();
            if (!matrixMode) {
                matrixMode = true;
                panel.transform = null;
                unbind = bindTransform(panel, matrixSignal);
                ctx.log('bindTransform(panel, matrixSignal)', 'matrix mode ON');
            }
            matrixSignal.value = Transformation.identity()
                .rotate(Number(rotateInput.value), cx, cy)
                .translate(Number(txInput.value), Number(tyInput.value));
        };

        const rotateInput = el('input', { type: 'range', min: '0', max: '360', value: '0' }) as HTMLInputElement;
        const txInput = el('input', { type: 'range', min: '-80', max: '80', value: '0' }) as HTMLInputElement;
        const tyInput = el('input', { type: 'range', min: '-80', max: '80', value: '0' }) as HTMLInputElement;

        rotateInput.addEventListener('input', applyMatrix);
        txInput.addEventListener('input', applyMatrix);
        tyInput.addEventListener('input', applyMatrix);

        const row = el('div', { className: 'btn-row' });
        row.appendChild(
            btn('translate(15, 0)', () => {
                unbind?.();
                unbind = null;
                matrixMode = false;
                panel.translate(15, 0);
                ctx.log('panel.translate(15, 0)', panel.transform ?? '');
            }),
        );
        row.appendChild(
            btn('rotate(20)', () => {
                unbind?.();
                unbind = null;
                matrixMode = false;
                const { x: cx, y: cy } = pivot();
                panel.rotate(20, cx, cy);
                ctx.log(`panel.rotate(20, ${cx}, ${cy})`, panel.transform ?? '');
            }),
        );
        row.appendChild(
            btn('scale(1.2)', () => {
                unbind?.();
                unbind = null;
                matrixMode = false;
                panel.scale(1.2);
                ctx.log('panel.scale(1.2)', panel.transform ?? '');
                ctx.log('note', 'from (0,0) — drift down-right');
            }),
        );
        row.appendChild(
            btn('scaleAt(1.2)', () => {
                unbind?.();
                unbind = null;
                matrixMode = false;
                const { x: cx, y: cy } = pivot();
                panel.scaleAt(1.2, 1.2, cx, cy);
                ctx.log(`panel.scaleAt(1.2, 1.2, ${cx}, ${cy})`, panel.transform ?? '');
            }),
        );
        row.appendChild(
            btn('Reset transform', () => {
                unbind?.();
                unbind = null;
                matrixMode = false;
                panel.transform = null;
                rotateInput.value = '0';
                txInput.value = '0';
                tyInput.value = '0';
                ctx.log('panel.transform = null');
            }),
        );
        panelEl.appendChild(row);

        panelEl.appendChild(el('p', { className: 'control-hint', textContent: 'Matrix mode (bindTransform):' }));
        panelEl.appendChild(
            el('div', { className: 'control-group' }, [el('label', { textContent: 'rotate°' }), rotateInput]),
        );
        panelEl.appendChild(
            el('div', { className: 'control-group' }, [el('label', { textContent: 'translate X' }), txInput]),
        );
        panelEl.appendChild(
            el('div', { className: 'control-group' }, [el('label', { textContent: 'translate Y' }), tyInput]),
        );

        return () => {
            unbind?.();
        };
    },
    reset(ctx) {
        ctx.resetScene();
    },
};
