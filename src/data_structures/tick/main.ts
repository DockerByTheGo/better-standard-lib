import type { VCallback } from "@better-standard-internal/types/voidcallback";

export class Tick<T> {
    constructor(private value: T) {}

    tick(callback: VCallback<T>) {
        callback(this.value);
        return this.value;
    }
}