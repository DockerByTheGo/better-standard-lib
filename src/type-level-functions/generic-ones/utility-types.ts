
import { Optionable } from "@better-standard-internal/data_structures/option/main";

export type OptionalPromise<T> = Promise<Optionable<T>>;
export type OPromise<T> = OptionalPromise<T>;

export type URecord = Record<string, unknown>;

export type VoidCallback = () => void;

export type IfNotUndefinedWithDefault<T, D> = T extends undefined ? D : T;




