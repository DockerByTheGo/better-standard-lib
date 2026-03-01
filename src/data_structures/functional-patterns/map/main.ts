import type { IMapable } from "./types";

export class Mapable<T> implements IMapable<T> {
  constructor(private v: T) {}

  map<V>(func: (v: T) => V): IMapable<V> {
    this.v = func(this.v);
    return this
  }

  get raw(): T {
    return this.v;
  }

  valueOf(): T {
    return this.raw;
  }

  static new = <T>(v: T) => new Mapable(v)
}
