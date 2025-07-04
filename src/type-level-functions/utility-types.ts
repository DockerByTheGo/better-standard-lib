/**
 * Utility types that can be used throughout the codebase
 */

export type OptionalPromise<T> = Promise<import('../data_structures/option').Optionable<T>>;
export type OPromise<T> = OptionalPromise<T>;

export type URecord = Record<string, unknown>;

export type VoidCallback = () => void;

export type UnknownString = string & { _brand?: never };

// Type utilities for working with promises
export type PromiseBoolean = Promise<boolean>;

export type IfNotUndefinedWithDefault<T, D> = T extends undefined ? D : T;

export type With<T, K extends keyof any, V> = T & {
  [P in K]: V;
};

export type KeyOfOnlyStringKeys<T> = Extract<keyof T, string>;

export type ValuesOf<T> = T[keyof T];

export type Pair<T> = [T, T];

export type RemoveNonStringKeys<T> = {
  [K in keyof T as K extends string ? K : never]: T[K];
};
