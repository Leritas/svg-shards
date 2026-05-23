import { signal } from '../../../src/reactive';
import { bindProperty } from '../../../src/reactive/bindProperty';
import { scheduleBatch } from '../../../src/reactive/scheduleBatch';
import type { Lesson } from '../types';
import { btn, el } from '../types';
import type { CircleElement } from '../../../src/elements/shapes/CircleElement';

export const reactiveLesson: Lesson = {
    id: 'reactive',
    title: 'Reactive — signals @ 60fps',
    description:
        'Bind shard properties to @preact/signals-core signals for fine-grained DOM updates. scheduleBatch coalesces updates into the next animation frame.',
    apiRefs: ['bindProperty', 'signal', 'scheduleBatch', 'svg-shards/reactive'],
    snippet: `import { signal, bindProperty, scheduleBatch } from 'svg-shards/reactive';

const cx = signal(320);
bindProperty(sun, 'cx', cx);

scheduleBatch(() => { cx.value = Math.cos(t) * 50 + 200; });`,
    mount(panel, ctx) {
        const svg = ctx.getContainer();
        const sun = svg.getById('sun') as CircleElement | null;
        if (!sun) {
            return () => {};
        }

        ctx.highlightShard(sun);

        const cxSig = signal(sun.cx);
        const cySig = signal(sun.cy);
        const opacitySig = signal(sun.opacity);

        const unbindCx = bindProperty(sun, 'cx', cxSig);
        const unbindCy = bindProperty(sun, 'cy', cySig);
        const unbindOp = bindProperty(sun, 'opacity', opacitySig);

        const fpsEl = el('span', { className: 'fps-counter', textContent: 'FPS: —' });
        panel.appendChild(fpsEl);

        const cxRange = el('input', {
            type: 'range',
            min: '200',
            max: '380',
            value: String(sun.cx),
        }) as HTMLInputElement;
        cxRange.addEventListener('input', () => {
            cxSig.value = Number(cxRange.value);
            ctx.log('cx.value =', cxRange.value);
        });

        const cyRange = el('input', {
            type: 'range',
            min: '20',
            max: '200',
            value: String(sun.cy),
        }) as HTMLInputElement;
        cyRange.addEventListener('input', () => {
            cySig.value = Number(cyRange.value);
            ctx.log('cy.value =', cyRange.value);
        });

        panel.appendChild(
            el('div', { className: 'control-group' }, [el('label', { textContent: 'cx (signal)' }), cxRange]),
        );
        panel.appendChild(
            el('div', { className: 'control-group' }, [el('label', { textContent: 'cy (signal)' }), cyRange]),
        );

        let rafId: number | null = null;
        let frameCount = 0;
        let lastFpsTime = performance.now();
        let animating = false;

        const animate = (now: number): void => {
            if (!animating) return;
            const t = now / 500;
            scheduleBatch(() => {
                cxSig.value = 260 + Math.cos(t) * 60;
                cySig.value = 100 + Math.sin(t) * 40;
                opacitySig.value = 0.6 + Math.sin(t * 2) * 0.4;
            });
            frameCount += 1;
            if (now - lastFpsTime >= 1000) {
                fpsEl.textContent = `FPS: ~${frameCount}`;
                frameCount = 0;
                lastFpsTime = now;
            }
            rafId = requestAnimationFrame(animate);
        };

        const row = el('div', { className: 'btn-row' });
        row.appendChild(
            btn('Start orbit animation', () => {
                if (animating) return;
                animating = true;
                ctx.log('scheduleBatch + rAF loop', 'started');
                rafId = requestAnimationFrame(animate);
            }),
        );
        row.appendChild(
            btn('Stop', () => {
                animating = false;
                if (rafId !== null) cancelAnimationFrame(rafId);
                fpsEl.textContent = 'FPS: —';
                ctx.log('animation', 'stopped');
            }),
        );
        panel.appendChild(row);

        return () => {
            animating = false;
            if (rafId !== null) cancelAnimationFrame(rafId);
            unbindCx();
            unbindCy();
            unbindOp();
        };
    },
    reset(ctx) {
        ctx.resetScene();
    },
};
