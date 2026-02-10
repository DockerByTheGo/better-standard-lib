import { ReturnFromSubfunction } from "../../src/data_structures/returnFromVoid";
import { expect, test } from "bun:test";

test("ReturnFromSubfunction should return the value returned by the callback", () => {
    const result = ReturnFromSubfunction<number>((v) => {
        expect(v).toBeNull();
        return 42;
    });
    expect(result).toBe(42);
});

test("ReturnFromSubfunction should return undefined if the callback does not return a value", () => {
    const result = ReturnFromSubfunction<number>((v) => {
        expect(v).toBeNull();
        // No return statement
    });
    expect(result).toBeUndefined();
});

test("ReturnFromSubfunction should handle object returns from the callback", () => {
    const result = ReturnFromSubfunction<{ a: number }>((v) => {
        expect(v).toBeNull();
        return { a: 10 };
    });
    expect(result).toEqual({ a: 10 });
});

test("ReturnFromSubfunction should handle array returns from the callback", () => {
    const result = ReturnFromSubfunction<number[]>((v) => {
        expect(v).toBeNull();
        return [1, 2, 3];
    });
    expect(result).toEqual([1, 2, 3]);
});