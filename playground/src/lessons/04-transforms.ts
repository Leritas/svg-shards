import { signal } from '../../../src/reactive';
import { Transformation } from '../../../src/core/Transformation';
import { bindTransform } from '../../../src/reactive/bindTransform';
import type { Lesson } from '../types';
import { btn, el } from '../types';
import type { CircleElement } from '../../../src/elements/shapes/CircleElement';

export const transformsLesson: Lesson = {
    id: 'transforms',
    title: 'Transforms — imperative & matrix',
    description:
        'Imperative translate/rotate/scale prepend transform strings. For composable transforms, use the Transformation class with bindTransform for signal-driven matrix updates.',
    apiRefs: ['SvgElement.translate', 'SvgElement.rotate', 'Transformation', 'bindTransform'],
    snippet: `moon.translate(10, 0);
moon.rotate(15);

const matrix = signal(Transformation.identity().rotate(45, 160, 140));
bindTransform(moon, matrix);`,
    mount(panel, ctx) {
        const svg = ctx.getContainer();
        const moon = svg.getById('moon') as CircleElement | null;
        if (!moon) {
            panel.appendChild(el('p', { textContent: 'Moon shard not found' }));
            return () => {};
        }

        ctx.highlightShard(moon);

        let unbind: (() => void) | null = null;
        const matrixSignal = signal(Transformation.identity());
        let matrixMode = false;

        const applyMatrix = (): void => {
            if (!matrixMode) {
                matrixMode = true;
                moon.transform = null;
                unbind = bindTransform(moon, matrixSignal);
                ctx.log('bindTransform(moon, matrixSignal)', 'matrix mode ON');
            }
            matrixSignal.value = Transformation.identity()
                .rotate(Number(rotateInput.value), moon.cx, moon.cy)
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
                moon.translate(15, 0);
                ctx.log('moon.translate(15, 0)', moon.transform ?? '');
            }),
        );
        row.appendChild(
            btn('rotate(20)', () => {
                unbind?.();
                unbind = null;
                matrixMode = false;
                moon.rotate(20);
                ctx.log('moon.rotate(20)', moon.transform ?? '');
            }),
        );
        row.appendChild(
            btn('scale(1.2)', () => {
                unbind?.();
                unbind = null;
                matrixMode = false;
                moon.scale(1.2);
                ctx.log('moon.scale(1.2)', moon.transform ?? '');
            }),
        );
        row.appendChild(
            btn('Reset transform', () => {
                unbind?.();
                unbind = null;
                matrixMode = false;
                moon.transform = null;
                rotateInput.value = '0';
                txInput.value = '0';
                tyInput.value = '0';
                ctx.log('moon.transform = null');
            }),
        );
        panel.appendChild(row);

        panel.appendChild(el('p', { className: 'control-hint', textContent: 'Matrix mode (bindTransform):' }));
        panel.appendChild(
            el('div', { className: 'control-group' }, [el('label', { textContent: 'rotate°' }), rotateInput]),
        );
        panel.appendChild(
            el('div', { className: 'control-group' }, [el('label', { textContent: 'translate X' }), txInput]),
        );
        panel.appendChild(
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
