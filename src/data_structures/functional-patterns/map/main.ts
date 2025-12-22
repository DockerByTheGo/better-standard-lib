import { IMapable } from "./types";


export class Mapable<T> implements IMapable<T> {
    constructor(private v: T) {}

    map<V>(func: (v: T) => V): IMapable<V> {
        return new Mapable(func(this.v))
    }

    get raw(): T {
        return this.v
    }

    valueOf(): T {
        return this.raw
    }
}
