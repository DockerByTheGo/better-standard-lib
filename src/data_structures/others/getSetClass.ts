import type { VCallback } from "../../types/voidcallback";
import type { IMapable } from "../functional-patterns/map";

import { Mapable } from "../functional-patterns/map/main";
import { ifNotNone } from "../functional-patterns/option";

export class GetSet<V> implements IMapable<V> {
  private v: V;
  public raw: V = this.v;
  private onSet: VCallback<V> = (v: V) => {};
  private onGet: VCallback<V> = (v: V) => {};
  public get(): V {
    return this.v;
  }

  constructor(v: V, onGet?: VCallback<V>, onSet?: VCallback<V>) {
    this.v = v;
    ifNotNone(onGet, onGet => (this.onGet = onGet));
    ifNotNone(onSet, onSet => (this.onSet = onSet));
  }

  simpleMap<TReturn>(func: (v: V) => TReturn):  TReturn{
    return func(this.v);
  };

  map<F>(func: (v: V) => F): IMapable<F> {
    return new Mapable(func(this.v));
  }

  get value(): V {
    this.onGet(this.v)
    return this.v;
  }

  setV(v: V) {
    this.onSet(v);
    this.v = v;
  }

  set(v: V) {
    this.setV(v);
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
