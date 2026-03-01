import type { Callback } from "@better-standard-internal/types/voidcallback";

import type { IMapable } from "../map";
import type { IOptionable } from "./types";

import { panic } from "../../../functions/panic/default";
import { Mapable } from "../map";
import { map } from "@better-standard-internal/functions";

export type none = null | undefined;

export function Try<
  V,
  IfNoneReturn,
  IfNotNotNoneReturn,
>/* casing is like this since try is reserved word */(
  v: V | none,
  config: {
    ifNone: () => IfNoneReturn;
    ifNotNone: Callback<IfNotNotNoneReturn, V>;
  },
): IfNoneReturn | IfNotNotNoneReturn {
  if (v === undefined || v === null) {
    return config.ifNone();
  }
  return config.ifNotNone(v);
}

export const statics = {
  messageForWhenOptionIsNone: "Option is None ",
};

export class Optionable<T> implements IOptionable<T> {
  private readonly value: T | null;
  private constructor(value: T | null) {
    this.value = value;
  }

  static some<T>(v: T | none): Optionable<T> {
    return new Optionable(v, false);
  }

  static none<T>(): Optionable<T> {
    return new Optionable<T>(null, true);
  }

  try<TNoneReturn, TSomeReturn>(v: {
    ifNone: () => TNoneReturn,
    ifNotNone: (v: T) => TSomeReturn
  }): Mapable<TNoneReturn | TSomeReturn> {
    return map(this.isNone() ? v.ifNone() : v.ifNotNone(this.value), v => new Mapable(v))
  }

  isNone(): boolean {
    return this.value === undefined || this.value === null;
  }

  isSome(): boolean {
    return !this.isNone();
  }

  ifNone(v: () => void): void {
    if (this.isNone()) {
      v();
    }
  }

  unpack(errMsg?: string): Mapable<T> {
    if (this.isNone()) {
      panic(errMsg ?? statics.messageForWhenOptionIsNone);
    }
    return new Mapable(this.value as T);
  }

  unpack_or(default_handler: () => T): T {
    return this.isNone() ? default_handler() : this.value as T;
  }

  unpack_with_default(d: T): T {
    return this.isNone() ? d : this.value as T;
  }

  expect(msg: string): IMapable<T> {
    if (this.isNone()) {
      panic(msg);
    }
    return new Mapable(this.value as T);
  }

  ifCanBeUnpacked(handler: (v: T) => void): void {
    if (this.isSome()) {
      handler(this.value as T);
    }
  }

  map<U>(fn: (v: T) => U): Optionable<U> {
    return this.isNone() ? Optionable.none() : Optionable.some(fn(this.value as T));
  }

  flatMap<U>(fn: (v: T) => Optionable<U>): Optionable<U> {
    return this.isNone() ? Optionable.none() : fn(this.value as T);
  }
}

export function mapOptionable<T>(v: T | none): Optionable<T> {
  return v === null || v === undefined ? Optionable.none() : Optionable.some(v);
}

export function ifNotNone<T>(v: T | none, callback: (v: T) => void) {
  const option = mapOptionable(v);
  option.ifCanBeUnpacked(callback);
  return option;
}
