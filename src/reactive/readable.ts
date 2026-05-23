import type { Signal } from '@preact/signals-core';

export interface Readable<T> {
    readonly value: T;
}

export type SignalLike<T> = Signal<T> | Readable<T>;

export function readSignalValue<T>(source: SignalLike<T>): T {
    return source.value;
}
