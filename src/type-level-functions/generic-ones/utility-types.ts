import type { Optionable } from "@better-standard-internal/data_structures/functional-patterns/option";

export type OptionalPromise<T> = Promise<Optionable<T>>;
export type OPromise<T> = OptionalPromise<T>;

export type URecord = Record<string, unknown>;

export type VoidCallback = () => void;

export type IfNotUndefinedWithDefault<T, D> = T extends undefined ? D : T;

type IfAnyInternal<T, Y, N = never>
  = 0 extends (1 & T) ? Y : N;

export type ifAny<TypeToCheck, Default> = IfAnyInternal<TypeToCheck, Default, TypeToCheck>;
