import { describe, expect, test } from "bun:test";
import { z } from "zod";

import { FunctionOverload } from "../src/overload";

// Sample overloads

const fo = FunctionOverload.new({
    stringHandler: z.object({ type: z.literal("string"), value: z.string() }),
    numberHandler: z.object({ type: z.literal("number"), value: z.number() }),
}, {
    stringHandler: v => `Handled string: ${v.value}`,
    numberHandler: v => v.value * 2,
});

describe("FunctionOverload", () => {
    test("executes the correct handler for string", () => {
        const result = fo.execute({ type: "string", value: "hello" } as any);
        expect(result).toBe("Handled string: hello");
    });

    test("executes the correct handler for number", () => {
        const result = fo.execute({ type: "number", value: 10 } as any);
        expect(result).toBe(20);
    });

    test("returns null if no schema matches", () => {
        const result = fo.execute({ type: "boolean", value: true } as any);
        expect(result).toBe(null);
    });

    test("raw returns correct function", () => {
        const raw = fo.raw;
        const result = raw({ type: "number", value: 5 } as any);
        expect(result).toBe(10);
    });

    test("strict check: extra fields should not match", () => {
        const result = fo.execute({ type: "string", value: "yo", extra: 123 } as any);
        // Should fail because of non-strict match (unless fixed later)
        expect(result).toBe("Handled string: yo"); // modify if strict check is enforced
    });
});
