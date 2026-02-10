import type { Callback } from "@better-standard-internal/types/voidcallback";

import type { IMapable } from "../map";
import type { IOptionable } from "./types";

import { panic } from "../../../functions/panic/default";
import { Mapable } from "../map";

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
  private readonly isNoneValue: boolean;

  private constructor(value: T | null, isNone: boolean) {
    this.value = value;
    this.isNoneValue = isNone;
  }

  static some<T>(v: T): Optionable<T> {
    return new Optionable(v, false);
  }

  static none<T>(): Optionable<T> {
    return new Optionable<T>(null, true);
  }

  try<TNoneReturn, TSomeReturn>(v: {
    ifNone: () => TNoneReturn,
    ifNotNone: (v: T) => TSomeReturn
  }) {
    return this.is_none() ? v.ifNone() : v.ifNotNone(this.value)
  }

  is_none(): boolean {
    return this.isNoneValue;
  }

  isSome(): boolean {
    return !this.isNoneValue;
  }

  ifNone(v: () => void): void {
    if (this.is_none()) {
      v();
    }
  }

  unpack(errMsg?: string): Mapable<T> {
    if (this.is_none()) {
      panic(errMsg ?? statics.messageForWhenOptionIsNone);
    }
    return new Mapable(this.value as T);
  }

  unpack_or(default_handler: () => T): T {
    return this.is_none() ? default_handler() : this.value as T;
  }

  unpack_with_default(d: T): T {
    return this.is_none() ? d : this.value as T;
  }

  unpack_or_with_diverging_type_from_the_original<C>(d: () => C): ILeftRight<T, C> {
    if (this.is_none()) {
      return new LeftRight(null as T, d());
    }
    return new LeftRight(this.value as T, null as C);
  }

  expect(msg: string): IMapable<T> {
    if (this.is_none()) {
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
    return this.is_none() ? Optionable.none() : Optionable.some(fn(this.value as T));
  }

  flatMap<U>(fn: (v: T) => Optionable<U>): Optionable<U> {
    return this.is_none() ? Optionable.none() : fn(this.value as T);
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
