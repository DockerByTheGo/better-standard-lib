import { describe, it, expect } from "vitest";

import { entries } from "../src/functions/mapObject";
import { map } from "../src/functions/map";

describe("mapObject and map", () => {
	it("entries returns typed entries", () => {
		const obj = { a: 1, b: "x" } as const;
		const e = entries(obj);
		expect(e).toContainEqual(["a", 1]);
		expect(e).toContainEqual(["b", "x"]);
	});

	it("map applies function", () => {
		const res = map(2, (n) => n * 3);
		expect(res).toBe(6);
	});
});
