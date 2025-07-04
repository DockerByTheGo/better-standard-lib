import type { UnknownRecord } from "../types/unknwonString";

export type Afterfix<T extends string, fix extends string> = `${T}${fix}`;

export type AfterfixKeysOfRecord<
    T extends UnknownRecord,
    Fix extends string,
> = {
    [K in keyof T as Afterfix<K & string, Fix>]: T[K]
};

export type FirstArg<T extends (...args: any[]) => any> = T extends (arg1: infer A, ...args: any[]) => any ? A : never;

type j = AfterfixKeysOfRecord<{ koko: string }, "j">;

// expected

// type j = {
//     kokoj: string;
// }

export type NeverWithDefault<T, Default> = T extends never ? Default : T;

type IsExact<A, B> = // this is since any extends everything and everything extends any so the type is very loosy when any is present and this is to prevent this loose behaviour
  (<T>() => T extends A ? 1 : 2) extends
  (<T>() => T extends B ? 1 : 2) ? true : false;

export type WithDefault<TInitial, TMatch, TDefault> =
  IsExact<TInitial, TMatch> extends true ? TDefault : TInitial;

export type SharedProperties<T, U> = {
    [K in keyof T & keyof U]: T[K] extends U[K] ? (U[K] extends T[K] ? T[K] : never) : never;
};
