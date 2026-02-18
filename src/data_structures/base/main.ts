import { Mapable as MapableClass } from "../functional-patterns/map/main";

export class BaseValue<V> extends MapableClass<V> {
  constructor(v: V) {
    super(v);
  }

  tap(func: (v: V) => void): this {
    func(this.valueOf());
    return this;
  }

  getRaw(): V {
    return this.valueOf();
  }
}


