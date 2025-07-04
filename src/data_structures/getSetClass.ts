import type { ISimpleMapable } from "./mapable";
import type { VCallback } from "../types/voidcallback";

import { ifNotNone } from "./option";

export class GetSet<V> implements ISimpleMapable<V> {
    private v: V;

    private onSet: VCallback<V> = (v: V) => {};
    private onGet: VCallback<V> = (v: V) => {};
    public get(): V {
        return this.v
    }
    constructor(v: V, onGet?: VCallback<V>, onSet?: VCallback<V>) {
        this.v = v;
        ifNotNone(onGet, onGet => (this.onGet = onGet));
        ifNotNone(onSet, onSet => (this.onSet = onSet));
    }

    // public map(func: (v: V) => V): V  {
    //     this.onGet.v(this.v)
    //     return new Mapable(this.v);
    // }

    simpleMap(func: (v: V) => V): V {
        return func(this.v);
    };

    get value(): V {
    // this.onGet(this.v)
        return this.v;
    }

    setV(v: V) {
        this.onSet(v);
        this.v = v;
    }

    set(v: V){
        this.setV(v)
    }
}

export class Get<V> {
    private readonly value: V;
    constructor(v: V) {
        this.value = v;
    }

    public get v() {
        return this.value;
    }
}

export type inferType<T extends GetSet<unknown>> = T["value"];
