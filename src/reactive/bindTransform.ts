import { effect } from '@preact/signals-core';
import { SvgElement } from '../core/SvgElement';
import { Transformation } from '../core/Transformation';
import { readSignalValue, SignalLike } from './readable';

export function bindTransform(shard: SvgElement, source: SignalLike<Transformation>): () => void {
    return effect(() => {
        const matrix = readSignalValue(source);
        shard.transform = matrix.toMatrixString();
    });
}
