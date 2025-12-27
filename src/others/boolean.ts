// Tests
import { describe, expect, it } from "vitest";

import { Optionable } from "../data_structures/functional-patterns/option";

export class Boolean<TValue extends boolean> {
  constructor(public readonly value: TValue) { }

  Try<
    TTrueReturn,
    TFalseReturn,
  >(v: {
    true?: () => TTrueReturn;
    false?: () => TFalseReturn; // false: Optionable<() => FalseReturn> = Optionable.onne()
  },
  ) {
    return this.value ? v.true() : v.false();
  }

  // TryWithNullForNoProvidedHandler - placeholder, implement as needed

  IfTrue<TReturn>(handler: () => TReturn): Optionable<TReturn> {
    if (this.value) {
      return Optionable.new(handler());
    }
    else {
      return Optionable.none();
    }
  }

  IfFalse<TReturn>(handler: () => TReturn): Optionable<TReturn> {
    if (!this.value) {
      return Optionable.new(handler());
    }
    else {
      return Optionable.none();
    }
  }

  static new = (exp: boolean) => new Boolean(exp);
}

describe("Boolean", () => {
  // just ubmping up code coverage
  it("constructor sets value", () => {
    const boolTrue = new Boolean(true as const);
    const boolFalse = new Boolean(false as const);
    expect(boolTrue.value).toBe(true);
    expect(boolFalse.value).toBe(false);
  });

  it("static new creates instance", () => {
    const bool = Boolean.new(true);
    expect(bool.value).toBe(true);
    expect(bool).toBeInstanceOf(Boolean);
  });

  it("Try returns true branch for true", () => {
    const bool = new Boolean(true as const);
    const result = bool.Try({
      true: () => "yes",
      false: () => "no",
    });
    expect(result).toBe("yes");
  });

  it("Try returns false branch for false", () => {
    const bool = new Boolean(false as const);
    const result = bool.Try({
      true: () => "yes",
      false: () => "no",
    });
    expect(result).toBe("no");
  });

  it("IfTrue returns Optionable with value for true", () => {
    const bool = new Boolean(true as const);
    const result = bool.IfTrue(() => 42);
    expect(result.is_none()).toBe(false);
    expect(result.unpackRaw()).toBe(42);
  });

  it("IfTrue returns none for false", () => {
    const bool = new Boolean(false as const);
    const result = bool.IfTrue(() => 42);
    expect(result.is_none()).toBe(true);
  });

  it("IfFalse returns none for true", () => {
    const bool = new Boolean(true as const);
    const result = bool.IfFalse(() => 42);
    expect(result.is_none()).toBe(true);
  });

  it("IfFalse returns Optionable with value for false", () => {
    const bool = new Boolean(false as const);
    const result = bool.IfFalse(() => 42);
    expect(result.is_none()).toBe(false);
    expect(result.unpackRaw()).toBe(42);
  });
});
