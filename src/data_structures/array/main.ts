import { VCallback } from "@better-standard-internal/types/voidcallback";
import { Tick } from "../Tick/export";

export class BetterArray<V> implements Tick.Types.Tick<V[]> {
    private data: V[];
    constructor(data: V[]) {
        this.data = data;
    }

    filter(isValueValid: (v: V) => boolean) {
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
