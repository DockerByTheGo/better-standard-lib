import { describe, expect, it } from "vitest";

import { Optionable } from "../../../../../src/data_structures/functional-patterns/option/main";

describe("optionable types", () => {
  it("should have correct types", () => {
    // Basic types
    const someNumber: Optionable<number> = Optionable.some(5);
    const someString: Optionable<string> = Optionable.some("hello");
    const none: Optionable<number> = Optionable.none<number>();

    // @ts-expect-error: A None of another type should not be assignable
    const wrongNone: Optionable<number> = Optionable.none<string>();

    // map
    const mappedToNumber = someString.map(s => s.length);
    const mappedNumber: Optionable<number> = mappedToNumber;
    // @ts-expect-error: Should not be assignable to another type
    const wrongMapped: Optionable<string> = mappedToNumber;

    // flatMap
    const flatMapped = someNumber.flatMap(n => Optionable.some(n.toString()));
    const flatMappedString: Optionable<string> = flatMapped;
    // @ts-expect-error: Should not be assignable to another type
    const wrongFlatMapped: Optionable<number> = flatMapped;

    // unpack_with_default
    const unwrapped = none.unpack_with_default(10);
    const unwrappedNumber: number = unwrapped;
    // @ts-expect-error: Should not be assignable to another type
    const wrongUnwrapped: string = unwrapped;

    // unpack_or
    const unpackedOr = none.unpack_or(() => 10);
    const unpackedOrNumber: number = unpackedOr;
    // @ts-expect-error: Should not be assignable to another type
    const wrongUnpackedOr: string = unpackedOr;

    expect(true).toBe(true); // This test is for type checking, so it just needs to compile
  });
});
