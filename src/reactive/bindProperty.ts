import { effect } from '@preact/signals-core';
import { SvgElement } from '../core/SvgElement';
import { readSignalValue, SignalLike } from './readable';

export function bindProperty<T>(shard: SvgElement, key: string, source: SignalLike<T>): () => void {
    return effect(() => {
        const value = readSignalValue(source);
        Reflect.set(shard, key, value);
    });
}

export function bindVisual(
    shard: SvgElement,
    sources: {
        fill?: SignalLike<string | null>;
        stroke?: SignalLike<string | null>;
        strokeWidth?: SignalLike<number>;
        opacity?: SignalLike<number>;
    },
): () => void {
    const disposers: Array<() => void> = [];

    if (sources.fill) {
        disposers.push(
            effect(() => {
                shard.fill = readSignalValue(sources.fill!);
            }),
        );
    }

    if (sources.stroke) {
        disposers.push(
            effect(() => {
                shard.stroke = readSignalValue(sources.stroke!);
            }),
        );
    }

    if (sources.strokeWidth) {
        disposers.push(
            effect(() => {
                shard.strokeWidth = readSignalValue(sources.strokeWidth!);
            }),
        );
    }

    if (sources.opacity) {
        disposers.push(
            effect(() => {
                shard.opacity = readSignalValue(sources.opacity!);
            }),
        );
    }

    return () => {
        for (const dispose of disposers) {
            dispose();
        }
    };
}
