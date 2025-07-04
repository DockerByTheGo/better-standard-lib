import type { valuesOf } from "../type-level-functions/valuesOf";
import type { Filter } from "../type-level-functions/filter";
import type { UnknownRecord } from "../types/unknwonString";

import { ifNotNone } from "./option";

type RemoveKey<T extends Record<string, object>, K extends PropertyKey> = {
    [P in keyof T]: Omit<T[P], K>;
};

export namespace OneOf {

    export type One<K extends keyof UnknownRecord> = { type: K; d: UnknownRecord[K] };

  type Handlers<T extends UnknownRecord> = {
      [K in keyof T]?: (v: { type: K } & T[K]) => unknown
  };

  type AddToEachEntry<V extends Record<string, unknown>, Additional extends Record<string, unknown>> = {
      [Key in keyof V]: V[Key] & Additional
  };

  export class Instance<T extends AddToEachEntry<UnknownRecord, { type: string }>, H extends Handlers<T> = {}> {
      private value: valuesOf<T>;
      private handlers: H = {} as H;
      public schema: T;
      constructor(v: valuesOf<T>, handlers?: H) {
          this.value = v;
          ifNotNone(handlers, h => this.handlers = h);
      }

      if<
          K extends keyof T,
          ReturnType,
      >(
          config: {
              v: K;
              handler: (v: { type: K; d: T[K] }) => ReturnType;
          },
      ): Instance<
              T,
              H & {
                  [Key in K]: (v: { type: Key; d: T[Key] }) => ReturnType
              }
          > {
          return new Instance(this.value, {
              ...this.handlers,
              [config.v]: config.handler,
          });
      }

      run(): ReturnType<Filter<H[keyof H], [undefined]>> | void {
      }

      def(handlers: Handlers<T>): ReturnType<Filter<H[keyof H], [undefined]>> {
          let res = null;
          console.log("ll");
          Object.entries(handlers).forEach(([key, value], i) => {
              console.log("kkk", this.value.type, key);
              if (key === this.value.type) {
                  res = handlers[key](this.value);
              }
          });
          console.log(res);
          return res;
      }
  }

}
