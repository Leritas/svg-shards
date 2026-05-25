import { describe, it, expect } from 'vitest';
import { Transformation } from '../src/core/Transformation';

describe('Transformation', () => {
    it('identity produces matrix(1 0 0 1 0 0)', () => {
        expect(Transformation.identity().toMatrixString()).toBe('matrix(1 0 0 1 0 0)');
    });

    it('translate composes into e/f components', () => {
        const t = Transformation.identity().translate(10, 20);
        expect(t.toMatrixString()).toBe('matrix(1 0 0 1 10 20)');
    });

    it('scale composes into a/d components', () => {
        const t = Transformation.identity().scale(2, 3);
        expect(t.toMatrixString()).toBe('matrix(2 0 0 3 0 0)');
    });

    it('scaleAt composes translate-scale-translate at pivot', () => {
        const t = Transformation.identity().scaleAt(2, 2, 80, 60);
        expect(t.toMatrixString()).toBe('matrix(2 0 0 2 -80 -60)');
    });

    it('multiply chains transforms', () => {
        const t = Transformation.identity().translate(5, 0).scale(2);
        expect(t.e).toBe(5);
        expect(t.a).toBe(2);
    });

    it('clone produces independent copy', () => {
        const original = Transformation.identity().translate(1, 2);
        const cloned = original.clone();
        cloned.translate(3, 4);

        expect(original.toMatrixString()).toBe('matrix(1 0 0 1 1 2)');
    });
});
