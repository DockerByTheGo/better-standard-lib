import type { Tick } from "../errors-as-values/rust-like-pattern/tick";
import type { VCallback } from "../types/voidcallback";

export class BetterArray<V> implements Tick<V[]> {
    private data: V[];
    constructor(data: V[]) {
        this.data = data;
    }

    filter(isValueValid: (v: V) => boolean) { // normal filter function accepts any type and this shouldnt happen
        return new BetterArray(this.data.filter(isValueValid));
    }

    tick(callback: VCallback<V[]>): V[] {
        callback(this.data);
        return this.data;
    }

    get normalArray(): V[] {
        return this.data;
    }

    static new<T>(data: T[]) {
        return new BetterArray<T>(data);
    }
}
