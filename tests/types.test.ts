import { describe, it, expectTypeOf } from "vitest";

import type { TypeSafeOmit } from "../src/type-level-functions/record/TypeSafeOmit";
import type { With } from "../src/type-level-functions/record/With";
import type { First } from "../src/type-level-functions/tuple/getFirst";

describe("type-level functions", () => {
  it("TypeSafeOmit removes keys", () => {
    type Orig = { a: number; b: string };
    expectTypeOf<TypeSafeOmit<Orig, "a">>().toEqualTypeOf<{ b: string }>();
  });

  it("With adds new key and rejects existing keys", () => {
    type Orig = { a: number };
    expectTypeOf<With<Orig, "b", string>>().toEqualTypeOf<{ a: number; b: string }>();
    expectTypeOf<With<Orig, "a", string>>().toBeNever();
  });

  it("First gets first tuple element or null", () => {
    expectTypeOf<First<[string, number]>>().toEqualTypeOf<string>();
    expectTypeOf<First<[]>>().toEqualTypeOf<null>();
  });
});
