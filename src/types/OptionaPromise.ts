import type { Optionable } from "../data_structures/option/main";

export type OptionalPromise<T> = Promise<Optionable<T>>;
export type OPromise<T> = OptionalPromise<T>;
