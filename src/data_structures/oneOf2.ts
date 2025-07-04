import type { Filter } from "../type-level-functions/filter";

import { ifNotNone } from "./option";

export namespace OneOf {

    export type One = { data: unknown; type: string };

  type Handlers<T extends readonly One[]> = {
      [K in T[number] as K["type"]]?: (v: { type: K["type"]; d: K["data"] }) => unknown
  };

 type g = Handlers<[{ type: "jiji"; data: 1 }]>;

 export class Instance<T extends readonly One[], H extends Handlers<T> = {}> {
     private value: T[number];
     private handlers: H = {} as H;
     constructor(v: T[number], handlers?: H) {
         this.value = v;
         ifNotNone(handlers, h => this.handlers = h);
     }

     if<
         K extends number,
         ReturnType,
     >(
         config: {
             v: K;
             handler: (v: { type: T[K]["type"]; d: T[K]["data"] }) => ReturnType;
         },
     ): Instance<
             T,
             H & {
                 [Key in K]: (v: { type: T[Key]["type"]; d: T[Key]["data"] }) => ReturnType
             }
         > {
         return new Instance(this.value, {
             ...this.handlers,
             [config.v]: config.handler,
         });
     }

     run(): ReturnType<Filter<H[keyof H], [undefined]>> | void {
     }

     def(v: Handlers<T>): ReturnType<Filter<H[keyof H], [undefined]>> {
         console.log(this.handlers);
         return this.handlers;
     }

     j: Handlers<T>;
 }

}

const g = new OneOf.Instance<
    [{ type: "jiji"; data: { koko: 1 } }, { type: "jojo"; data: { jiji: 1 } }]
>(
    { type: "jiji", data: { koko: 1 } },
)
// .if({
//     v: 0,
//     handler: async v => {console.log("jiji"); return ""}
// })
// .if({
//     v: 1,
//     handler: async v => {console.log("jojo")}
// })
    .j;
// .def([
//     {
//         type: "jiji",
//         handler: v => {console.log("jiji")}
//     },
//     {
//         type: "jojo",
//         handler: v => {console.log("jojo")}
//     }
// ] as const)
