
import { Optionable, Try, mapOptionable, ifNotNone } from "../../../../../../src/data_structures/functional-patterns/option/main";
import { expect, test } from "bun:test";

test("Optionable.some should create an option with a value", () => {
    const some = Optionable.some("value");
    expect(some.isSome()).toBe(true);
    expect(some.is_none()).toBe(false);
    expect(some.unpack().raw).toBe("value");
});

test("Optionable.none should create an option with no value", () => {
    const none = Optionable.none<string>();
    expect(none.isSome()).toBe(false);
    expect(none.is_none()).toBe(true);
});

test("Optionable.unpack on a None should throw an error", () => {
    const none = Optionable.none<string>();
    expect(() => none.unpack()).toThrow();
});

test("Optionable.unpack_or should return the default value for a None", () => {
    const none = Optionable.none<string>();
    expect(none.unpack_or(() => "default")).toBe("default");
});

test("Optionable.unpack_with_default should return the default value for a None", () => {
    const none = Optionable.none<string>();
    expect(none.unpack_with_default("default")).toBe("default");
});

test("Optionable.map should transform the value of a Some", () => {
    const some = Optionable.some(5);
    const mapped = some.map(v => v * 2);
    expect(mapped.unpack().raw).toBe(10);
});

test("Optionable.map should do nothing for a None", () => {
    const none = Optionable.none<number>();
    const mapped = none.map(v => v * 2);
    expect(mapped.is_none()).toBe(true);
});

test("Optionable.flatMap should transform the value of a Some", () => {
    const some = Optionable.some(5);
    const flatMapped = some.flatMap(v => Optionable.some(v * 2));
    expect(flatMapped.unpack().raw).toBe(10);
});

test("Optionable.flatMap should do nothing for a None", () => {
    const none = Optionable.none<number>();
    const flatMapped = none.flatMap(v => Optionable.some(v * 2));
    expect(flatMapped.is_none()).toBe(true);
});

test("Try should execute the correct callback", () => {
    const result1 = Try("value", {
        ifNotNone: v => `Got ${v}`,
        ifNone: () => "Got nothing"
    });
    expect(result1).toBe("Got value");

    const result2 = Try(null, {
        ifNotNone: v => `Got ${v}`,
        ifNone: () => "Got nothing"
    });
    expect(result2).toBe("Got nothing");
});

test("mapOptionable should create a Some for a value", () => {
    const option = mapOptionable("value");
    expect(option.isSome()).toBe(true);
});

test("mapOptionable should create a None for null or undefined", () => {
    const option1 = mapOptionable(null);
    expect(option1.is_none()).toBe(true);
    const option2 = mapOptionable(undefined);
    expect(option2.is_none()).toBe(true);
});

test("ifNotNone should execute the callback for a value", () => {
    let executed = false;
    ifNotNone("value", () => {
        executed = true;
    });
    expect(executed).toBe(true);
});

test("ifNotNone should not execute the callback for null or undefined", () => {
    let executed = false;
    ifNotNone(null, () => {
        executed = true;
    });
    expect(executed).toBe(false);
});
