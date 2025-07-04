
import { VCallback } from "@better-standard-internal/types/voidcallback";
import * as Pipeable from "@better-standard-internal/data_structures/Pipe/export"
export class BaseValue<V> implements Pipeable.types.IPipeable<V> {
    constructor(private v: V) {}
    map<F>(func: (v: V) => F): BaseValue<F> {
        return new BaseValue(func(this.v));
    }
    tap(func: (v: V) => void): BaseValue<V> {
        func(this.v);
        return this;
    }
    getRaw(): V {
        return this.v;
    }
}





new BaseValue(1).map(v => (v + 1).toLocaleString()).tap(v => {console.log(v); return v}).getRaw()