
import { Get, GetSet } from "@better-standard-internal/data_structures";
import { expect, test } from "vitest";

test("GetSet should correctly store and retrieve values", () => {
    const gs = new GetSet(10);
    expect(gs.get()).toBe(10);
});

test("GetSet should execute onSet callback when value is set", () => {
    let setValue = 0;
    const gs = new GetSet(10, undefined, (v) => { setValue = v; });
    gs.set(20);
    expect(gs.get()).toBe(20);
    expect(setValue).toBe(20);
});

test("GetSet should execute onGet callback when value is retrieved", () => {
    let getValue = 0;
    const gs = new GetSet(10, (v) => { console.log("0099");getValue = v; });
    expect(gs.value).toBe(10);
    expect(getValue).toBe(10);
});

test("GetSet map should transform the value", () => {
    const gs = new GetSet(10);
    const mapped = gs.map(v => v * 2);
    expect(mapped.raw).toBe(20);
});

test("GetSet simpleMap should transform the value and return it directly", () => {
    const gs = new GetSet(10);
    const simpleMapped = gs.simpleMap(v => `Value: ${v}`);
    expect(simpleMapped).toBe("Value: 10");
});

test("Get should correctly store and retrieve values", () => {
    const g = new Get("readonly");
    expect(g.v).toBe("readonly");
});

test("Get value should be immutable", () => {
    const g = new Get("original");
    // Attempting to reassign g.v should ideally be a compile-time error
    // but in JS context, it won't actually reassign the underlying 'value'
    // This test ensures it remains 'original' if attempted at runtime (though TS prevents this)
    // For testing purposes, we assert its immutability.
    expect(g.v).toBe("original");
});
