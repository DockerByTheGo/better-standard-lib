import { describe, expect, expectTypeOf, it } from "vitest";

import { entries } from "../src/functions/objectEntries";

describe("objectEntries entries helper", () => {
  it("returns each key/value pair", () => {
    const subject = { alpha: "A", beta: 2 } as const;
    const result = entries(subject);

    expect(result).toContainEqual(["alpha", "A"]);
    expect(result).toContainEqual(["beta", 2]);
  });

  it("preserves the inferred key/value types", () => {
    const subject = { flag: true, qty: 5 } as const;
    const result = entries(subject);

    expectTypeOf<typeof result>().toEqualTypeOf<[
      keyof typeof subject,
      typeof subject[keyof typeof subject]
    ][]>();
  });
});
