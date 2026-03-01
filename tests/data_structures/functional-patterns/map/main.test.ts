
import { Mapable } from "@better-standard-internal/data_structures";
import { expect, test } from "bun:test";

test("Mapable should hold a value and return it with raw", () => {
    const value = new Mapable(42);
    expect(value.raw).toBe(42);
});

test("Mapable map should transform the value", () => {
    const value = new Mapable(10);
    const mapped = value.map(v => v * 2);
    expect(mapped.raw).toBe(20);
});

test("Mapable valueOf should return the raw value", () => {
    const value = new Mapable("hello");
    expect(value.valueOf()).toBe("hello");
});

test("Mapable should allow chaining of map calls", () => {
    const finalValue = new Mapable(5)
        .map(v => v + 5)
        .map(v => v.toString())
        .raw;

    expect(finalValue).toBe("10");
});

test("Mapable.new should create a new Mapable instance", () => {
    const value = Mapable.new("test");
    expect(value.raw).toBe("test");
    expect(value).toBeInstanceOf(Mapable);
});
