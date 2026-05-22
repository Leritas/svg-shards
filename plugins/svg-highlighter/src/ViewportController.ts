import type { ViewportState } from './types';

export class ViewportController {
    private host: HTMLElement;
    private inner: HTMLElement;
    private state: ViewportState = { scale: 1, translateX: 0, translateY: 0, rotation: 0 };
    private isDragging = false;
    private dragStart = { x: 0, y: 0 };
    private boundOnWheel: (e: WheelEvent) => void;
    private boundOnPointerDown: (e: PointerEvent) => void;
    private boundOnPointerMove: (e: PointerEvent) => void;
    private boundOnPointerUp: (e: PointerEvent) => void;

    private constructor(host: HTMLElement, inner: HTMLElement) {
        this.host = host;
        this.inner = inner;

        this.boundOnWheel = this.onWheel.bind(this);
        this.boundOnPointerDown = this.onPointerDown.bind(this);
        this.boundOnPointerMove = this.onPointerMove.bind(this);
        this.boundOnPointerUp = this.onPointerUp.bind(this);

        this.host.addEventListener('wheel', this.boundOnWheel, { passive: false });
        this.host.addEventListener('pointerdown', this.boundOnPointerDown);
        window.addEventListener('pointermove', this.boundOnPointerMove);
        window.addEventListener('pointerup', this.boundOnPointerUp);
    }

    static mount(svg: SVGSVGElement, container: string | HTMLElement): ViewportController {
        const host = typeof container === 'string' ? (document.querySelector(container) as HTMLElement) : container;

        if (!host) {
            throw new Error('Viewport container not found');
        }

        host.classList.add('svg-viewport-host');
        host.innerHTML = '';

        const inner = document.createElement('div');
        inner.className = 'svg-viewport-inner';
        host.appendChild(inner);

        inner.appendChild(svg);

        return new ViewportController(host, inner);
    }

    zoomIn(step = 0.2): void {
        this.setScale(this.state.scale + step);
    }

    zoomOut(step = 0.2): void {
        this.setScale(Math.max(0.2, this.state.scale - step));
    }

    rotate(step = 90): void {
        this.state.rotation = (this.state.rotation + step) % 360;
        this.applyTransform();
    }

    reset(): void {
        this.state = { scale: 1, translateX: 0, translateY: 0, rotation: 0 };
        this.applyTransform();
    }

    getState(): ViewportState {
        return { ...this.state };
    }

    destroy(): void {
        this.host.removeEventListener('wheel', this.boundOnWheel);
        this.host.removeEventListener('pointerdown', this.boundOnPointerDown);
        window.removeEventListener('pointermove', this.boundOnPointerMove);
        window.removeEventListener('pointerup', this.boundOnPointerUp);
    }

    private setScale(scale: number): void {
        this.state.scale = scale;
        this.applyTransform();
    }

    private applyTransform(): void {
        const { scale, translateX, translateY, rotation } = this.state;
        this.inner.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale}) rotate(${rotation}deg)`;
    }

    private onWheel(event: WheelEvent): void {
        event.preventDefault();
        const delta = event.deltaY > 0 ? -0.1 : 0.1;
        this.setScale(Math.max(0.2, this.state.scale + delta));
    }

    private onPointerDown(event: PointerEvent): void {
        if (event.button !== 0) {
            return;
        }
        this.isDragging = true;
        this.dragStart = { x: event.clientX - this.state.translateX, y: event.clientY - this.state.translateY };
        this.host.setPointerCapture(event.pointerId);
    }

    private onPointerMove(event: PointerEvent): void {
        if (!this.isDragging) {
            return;
        }
        this.state.translateX = event.clientX - this.dragStart.x;
        this.state.translateY = event.clientY - this.dragStart.y;
        this.applyTransform();
    }

    private onPointerUp(event: PointerEvent): void {
        this.isDragging = false;
        this.host.releasePointerCapture(event.pointerId);
    }
}
