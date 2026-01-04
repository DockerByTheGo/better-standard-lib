
import { BaseValue } from "../../../../src/data_structures/base/main";
import { expect, test } from "bun:test";

test("BaseValue should hold a value and return it with getRaw", () => {
    const value = new BaseValue(42);
    expect(value.getRaw()).toBe(42);
});

test("BaseValue map should transform the value", () => {
    const value = new BaseValue(10);
    const mapped = value.map(v => v * 2);
    expect(mapped.getRaw()).toBe(20);
});

test("BaseValue tap should perform a side effect without changing the value", () => {
    const value = new BaseValue(10);
    let sideEffectValue = 0;
    const tapped = value.tap(v => {
        sideEffectValue = v;
    });
    expect(sideEffectValue).toBe(10);
    expect(tapped.getRaw()).toBe(10);
});

test("BaseValue should allow chaining of map and tap", () => {
    const finalValue = new BaseValue(5)
        .map(v => v + 5)
        .tap(v => expect(v).toBe(10))
        .map(v => v.toString())
        .tap(v => expect(v).toBe("10"))
        .getRaw();

    expect(finalValue).toBe("10");
});
