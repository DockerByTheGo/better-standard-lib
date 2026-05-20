
import { Mapable } from "@better-standard-internal/data_structures";
import { describe, expect, test } from "vitest";

describe("Mapable - construction", () => {
    test("constructor holds a primitive value", () => {
        expect(new Mapable(42).raw).toBe(42);
    });

    test("constructor holds a string value", () => {
        expect(new Mapable("hello").raw).toBe("hello");
    });

    test("constructor holds an object value", () => {
        const obj = { a: 1 };
        expect(new Mapable(obj).raw).toBe(obj);
    });

    test("constructor holds null", () => {
        expect(new Mapable(null).raw).toBeNull();
    });

    test("constructor holds undefined", () => {
        expect(new Mapable(undefined).raw).toBeUndefined();
    });

    test("Mapable.new factory creates an instance", () => {
        const m = Mapable.new("test");
        expect(m.raw).toBe("test");
        expect(m).toBeInstanceOf(Mapable);
    });
});

describe("Mapable - map", () => {
    test("transforms a number", () => {
        expect(new Mapable(10).map(v => v * 2).raw).toBe(20);
    });

    test("transforms a string to number", () => {
        expect(new Mapable("42").map(Number).raw).toBe(42);
    });

    test("transforms to an object", () => {
        expect(new Mapable(1).map(v => ({ id: v })).raw).toEqual({ id: 1 });
    });

    test("map with identity function returns same value", () => {
        expect(new Mapable(7).map(v => v).raw).toBe(7);
    });

    test("map receives the correct value", () => {
        let received: number | undefined;
        new Mapable(99).map(v => { received = v; return v; });
        expect(received).toBe(99);
    });

    test("map returns the same instance and updates the stored value", () => {
        const payload = { count: 0 };
        const mapable = new Mapable(payload);
        const mapped = mapable.map(value => ({ ...value, count: value.count + 1 }));

        expect(mapped).toBe(mapable);
        expect(mapable.raw).toEqual({ count: 1 });
    });

    test("chaining multiple maps", () => {
        const result = new Mapable(5)
            .map(v => v + 5)
            .map(v => v * 2)
            .map(v => v.toString())
            .raw;
        expect(result).toBe("20");
    });

    test("chaining number -> string -> array", () => {
        const result = new Mapable(3)
            .map(v => v.toString())
            .map(v => v.split(""))
            .raw;
        expect(result).toEqual(["3"]);
    });
});

describe("Mapable - valueOf", () => {
    test("valueOf returns the raw value for a number", () => {
        expect(new Mapable(42).valueOf()).toBe(42);
    });

    test("valueOf returns the raw value after map", () => {
        expect(new Mapable(5).map(v => v + 1).valueOf()).toBe(6);
    });

    test("valueOf and raw are consistent", () => {
        const m = new Mapable("consistent");
        expect(m.valueOf()).toBe(m.raw);
    });
});
