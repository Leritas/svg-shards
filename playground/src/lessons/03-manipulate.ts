import type { Lesson } from '../types';
import { el } from '../types';
import type { CircleElement } from '../../../src/elements/shapes/CircleElement';
import type { PathElement } from '../../../src/elements/PathElement';
import type { RectElement } from '../../../src/elements/shapes/RectElement';

export const manipulateLesson: Lesson = {
    id: 'manipulate',
    title: 'Manipulate — shard properties',
    description:
        'Shard setters write directly to SVG attributes. Each shape exposes typed properties — circle has cx/cy/r, rect has width/height, path has d.',
    apiRefs: ['CircleElement.cx', 'RectElement.fill', 'PathElement.d', 'SvgElement.strokeWidth'],
    snippet: `const sun = svg.getById('sun');
sun.fill = '#ff6600';
sun.r = 40;
sun.cx = 300;`,
    mount(panel, ctx) {
        const svg = ctx.getContainer();
        let activeTab: 'circle' | 'rect' | 'path' = 'circle';

        const tabs = el('div', { className: 'tabs' });
        const controls = el('div', { className: 'controls' });

        const makeSlider = (label: string, min: number, max: number, value: number, onInput: (v: number) => void) => {
            const range = el('input', {
                type: 'range',
                min: String(min),
                max: String(max),
                value: String(value),
            }) as HTMLInputElement;
            const valueLabel = el('span', { className: 'control-hint', textContent: String(value) });
            range.addEventListener('input', () => {
                const v = Number(range.value);
                valueLabel.textContent = String(v);
                onInput(v);
            });
            return el('div', { className: 'control-group' }, [el('label', { textContent: label }), range, valueLabel]);
        };

        const renderControls = (): void => {
            controls.replaceChildren();
            if (activeTab === 'circle') {
                const sun = svg.getById('sun') as CircleElement | null;
                if (!sun) return;
                ctx.highlightShard(sun);
                controls.appendChild(
                    makeSlider('sun.cx', 200, 380, sun.cx, (v) => {
                        sun.cx = v;
                        ctx.log('sun.cx =', String(v));
                    }),
                );
                controls.appendChild(
                    makeSlider('sun.cy', 20, 120, sun.cy, (v) => {
                        sun.cy = v;
                        ctx.log('sun.cy =', String(v));
                    }),
                );
                controls.appendChild(
                    makeSlider('sun.r', 10, 50, sun.r, (v) => {
                        sun.r = v;
                        ctx.log('sun.r =', String(v));
                    }),
                );
            } else if (activeTab === 'rect') {
                const panel = svg.getById('panel') as RectElement | null;
                if (!panel) return;
                ctx.highlightShard(panel);
                controls.appendChild(
                    makeSlider('panel.width', 60, 200, panel.width, (v) => {
                        panel.width = v;
                        ctx.log('panel.width =', String(v));
                    }),
                );
                controls.appendChild(
                    makeSlider('panel.height', 40, 160, panel.height, (v) => {
                        panel.height = v;
                        ctx.log('panel.height =', String(v));
                    }),
                );
                controls.appendChild(
                    makeSlider('strokeWidth', 0, 8, panel.strokeWidth, (v) => {
                        panel.strokeWidth = v;
                        ctx.log('panel.strokeWidth =', String(v));
                    }),
                );
            } else {
                const trail = svg.getById('trail') as PathElement | null;
                if (!trail) return;
                ctx.highlightShard(trail);
                const strokeSlider = makeSlider('trail stroke-width', 1, 10, trail.strokeWidth, (v) => {
                    trail.strokeWidth = v;
                    ctx.log('trail.strokeWidth =', String(v));
                });
                controls.appendChild(strokeSlider);
                const hint = el('p', {
                    className: 'control-hint',
                    textContent: 'Path d attribute can be edited programmatically via trail.d',
                });
                controls.appendChild(hint);
            }
        };

        for (const tab of [
            { id: 'circle' as const, label: 'Circle' },
            { id: 'rect' as const, label: 'Rect' },
            { id: 'path' as const, label: 'Path' },
        ]) {
            const button = el('button', { type: 'button', className: 'tab', textContent: tab.label });
            if (tab.id === activeTab) button.classList.add('active');
            button.addEventListener('click', () => {
                activeTab = tab.id;
                tabs.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'));
                button.classList.add('active');
                renderControls();
            });
            tabs.appendChild(button);
        }

        panel.appendChild(tabs);
        panel.appendChild(controls);
        renderControls();

        return () => {};
    },
    reset(ctx) {
        ctx.resetScene();
    },
};
