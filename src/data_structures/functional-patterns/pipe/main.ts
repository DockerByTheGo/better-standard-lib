import type { IPipeable } from "./types";
import type { VCallback } from "@better-standard-internal/types/voidcallback";

export class Pipe<V> implements IPipeable<V> {
    constructor(private value: V) {}

    pipe(handler: VCallback<V>) {
        handler(this.value);
        return this;
    }
}

new Pipe(1).pipe(v => v + 1).pipe(v => v + 1).pipe(v => v + 1)