import { describe, expect, it } from "vitest";

import { map } from "../src/functions/map";
import { entries } from "@better-standard-internal/functions";

describe("mapObject and map", () => {
  it("entries returns typed entries", () => {
    const obj = { a: 1, b: "x" } as const;
    const e = entries(obj);
    expect(e).toContainEqual(["a", 1]);
    expect(e).toContainEqual(["b", "x"]);
  });

  it("map applies function", () => {
    const res = map(2, n => n * 3);
    expect(res).toBe(6);
  });
});
