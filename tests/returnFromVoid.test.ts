import { describe, expect, it } from "vitest";

import { ReturnFromSubfunction } from "@better-standard-internal/data_structures/returnFromVoid";

describe("returnFromSubfunction", () => {
    it("should return undefined when function does not modify input", () => {
        const result = ReturnFromSubfunction<number>((v) => {
            // Do nothing
        });
        expect(result).toBeUndefined();
    });

    it("should return modified value when function modifies input", () => {
        const result = ReturnFromSubfunction<number>((v) => {
            v = 42;
        });
        expect(result).toBe(42);
    });

    it("should handle array modifications", () => {
        const result = ReturnFromSubfunction<number[]>((v) => {
            v.push(1, 2, 3);
        });
        expect(result).toEqual([1, 2, 3]);
    });

    it("should handle object modifications", () => {
        const result = ReturnFromSubfunction<{ a: number }>((v) => {
            v.a = 10;
        });
        expect(result).toEqual({ a: 10 });
    });

    it("should handle nested modifications", () => {
        const result = ReturnFromSubfunction<{ nested: { value: number } }>((v) => {
            v.nested.value = 100;
        });
        expect(result).toEqual({ nested: { value: 100 } });
    });

    it("should handle multiple modifications", () => {
        const result = ReturnFromSubfunction<{ a: number; b: string }>((v) => {
            v.a = 5;
            v.b = "hello";
        });
        expect(result).toEqual({ a: 5, b: "hello" });
    });
});
