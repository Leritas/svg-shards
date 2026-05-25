import { signal } from '../../../src/reactive';
import { bindProperty } from '../../../src/reactive/bindProperty';
import { scheduleBatch } from '../../../src/reactive/scheduleBatch';
import type { Lesson } from '../types';
import { btn, el } from '../types';
import type { CircleElement } from '../../../src/elements/shapes/CircleElement';

const ORBIT_RX = 60;
const ORBIT_RY = 30;

export const reactiveLesson: Lesson = {
    id: 'reactive',
    title: 'Reactive — signals @ 60fps',
    description:
        'bindProperty connects a signal to a shard attribute — change signal.value and the DOM updates, no refresh() or setAttribute in your code. During orbit only sun.transform + opacity change; cx/cy stay at the orbit center.',
    apiRefs: ['bindProperty', 'signal', 'scheduleBatch', 'svg-shards/reactive'],
    snippet: `bindProperty(sun, 'cx', orbitCx);
bindProperty(sun, 'transform', offset);

// stopped: slider → orbitCx → sun.cx
// running: rAF → offset (translate) + opacity only

scheduleBatch(() => {
  offset.value = \`translate(\${Math.cos(t) * 60}, \${Math.sin(t) * 30})\`;
});`,
    mount(panel, ctx) {
        const svg = ctx.getContainer();
        const sun = svg.getById('sun') as CircleElement | null;
        if (!sun) {
            return () => {};
        }

        ctx.highlightShard(sun);

        const orbitCx = signal(sun.cx);
        const orbitCy = signal(sun.cy);
        const cxSig = signal(sun.cx);
        const cySig = signal(sun.cy);
        const transformSig = signal('');
        const opacitySig = signal(sun.opacity);

        const unbindCx = bindProperty(sun, 'cx', cxSig);
        const unbindCy = bindProperty(sun, 'cy', cySig);
        const unbindTransform = bindProperty(sun, 'transform', transformSig);
        const unbindOp = bindProperty(sun, 'opacity', opacitySig);

        const hint = el('p', {
            className: 'lesson-hint',
            textContent:
                'Stop → sliders move sun via cx/cy signals. Start → only transform + opacity update each frame (cx/cy fixed at orbit center). Paint flashing may still tint the whole SVG in Chrome — that is a browser layer limit, not bindProperty touching the label.',
        });

        const readoutCx = el('strong', { textContent: String(Math.round(sun.cx)) });
        const readoutCy = el('strong', { textContent: String(Math.round(sun.cy)) });
        const readout = el('div', { className: 'signal-readout' }, [
            document.createTextNode('visual cx '),
            readoutCx,
            document.createTextNode(' · visual cy '),
            readoutCy,
            document.createTextNode(' · opacity '),
            el('strong', { textContent: sun.opacity.toFixed(2) }),
        ]);
        const readoutOpacity = readout.querySelector('strong:last-child')!;

        let visualOffsetX = 0;
        let visualOffsetY = 0;

        const updateReadout = (): void => {
            const cx = animating ? orbitCx.value + visualOffsetX : cxSig.value;
            const cy = animating ? orbitCy.value + visualOffsetY : cySig.value;
            readoutCx.textContent = String(Math.round(cx));
            readoutCy.textContent = String(Math.round(cy));
            readoutOpacity.textContent = opacitySig.value.toFixed(2);
        };

        const fpsEl = el('span', { className: 'fps-counter', textContent: 'FPS: —' });
        panel.appendChild(hint);
        panel.appendChild(readout);
        panel.appendChild(fpsEl);

        let animating = false;

        const cxRange = el('input', {
            type: 'range',
            min: '200',
            max: '380',
            value: String(sun.cx),
        }) as HTMLInputElement;
        const cyRange = el('input', {
            type: 'range',
            min: '20',
            max: '180',
            value: String(sun.cy),
        }) as HTMLInputElement;

        const syncOrbitCenterToShard = (): void => {
            cxSig.value = orbitCx.value;
            cySig.value = orbitCy.value;
        };

        const applyOrbitCenter = (): void => {
            orbitCx.value = Number(cxRange.value);
            orbitCy.value = Number(cyRange.value);
            if (animating) {
                syncOrbitCenterToShard();
            } else {
                cxSig.value = orbitCx.value;
                cySig.value = orbitCy.value;
                transformSig.value = '';
                opacitySig.value = 1;
            }
            updateReadout();
            ctx.log('orbit center', `${Math.round(orbitCx.value)}, ${Math.round(orbitCy.value)}`);
        };

        cxRange.addEventListener('input', applyOrbitCenter);
        cyRange.addEventListener('input', applyOrbitCenter);

        panel.appendChild(
            el('div', { className: 'control-group' }, [
                el('label', { textContent: 'Orbit center X (cx signal when stopped)' }),
                cxRange,
            ]),
        );
        panel.appendChild(
            el('div', { className: 'control-group' }, [
                el('label', { textContent: 'Orbit center Y (moves orbit while running)' }),
                cyRange,
            ]),
        );

        let rafId: number | null = null;
        let frameCount = 0;
        let lastFpsTime = performance.now();

        const animate = (now: number): void => {
            if (!animating) {
                return;
            }
            const t = now / 500;
            visualOffsetX = Math.cos(t) * ORBIT_RX;
            visualOffsetY = Math.sin(t) * ORBIT_RY;
            scheduleBatch(() => {
                transformSig.value = `translate(${visualOffsetX}, ${visualOffsetY})`;
                opacitySig.value = 0.55 + Math.sin(t * 2) * 0.45;
                updateReadout();
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
            btn('Start orbit', () => {
                if (animating) {
                    return;
                }
                animating = true;
                ctx.highlightShard(null);
                orbitCx.value = Number(cxRange.value);
                orbitCy.value = Number(cyRange.value);
                syncOrbitCenterToShard();
                sun.htmlNode.style.willChange = 'transform, opacity';
                ctx.log(
                    'scheduleBatch + rAF',
                    `transform orbit @ ${Math.round(orbitCx.value)}, ${Math.round(orbitCy.value)}`,
                );
                rafId = requestAnimationFrame(animate);
            }),
        );
        row.appendChild(
            btn('Stop', () => {
                if (!animating) {
                    return;
                }
                animating = false;
                if (rafId !== null) {
                    cancelAnimationFrame(rafId);
                    rafId = null;
                }
                fpsEl.textContent = 'FPS: —';
                sun.htmlNode.style.willChange = '';

                const bakedCx = orbitCx.value + visualOffsetX;
                const bakedCy = orbitCy.value + visualOffsetY;
                visualOffsetX = 0;
                visualOffsetY = 0;

                transformSig.value = '';
                cxSig.value = bakedCx;
                cySig.value = bakedCy;
                opacitySig.value = 1;
                orbitCx.value = bakedCx;
                orbitCy.value = bakedCy;
                cxRange.value = String(Math.round(bakedCx));
                cyRange.value = String(Math.round(bakedCy));
                updateReadout();
                ctx.log('animation', 'stopped — baked position into cx/cy');
            }),
        );
        panel.appendChild(row);

        updateReadout();

        return () => {
            animating = false;
            if (rafId !== null) {
                cancelAnimationFrame(rafId);
            }
            sun.htmlNode.style.willChange = '';
            unbindCx();
            unbindCy();
            unbindTransform();
            unbindOp();
        };
    },
    reset(ctx) {
        ctx.resetScene();
    },
};
