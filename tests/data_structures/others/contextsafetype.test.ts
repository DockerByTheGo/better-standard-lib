
import { TypeSafeClassBase } from "../../../../src/data_structures/others/contextsafetype";
import { expect, test } from "bun:test";

test("TypeSafeClassBase should hold and return a string value", () => {
    const wrapper = new TypeSafeClassBase("test");
    expect(wrapper.getValue()).toBe("test");
});

test("TypeSafeClassBase should hold and return a number value", () => {
    const wrapper = new TypeSafeClassBase(123);
    expect(wrapper.getValue()).toBe(123);
});

test("TypeSafeClassBase should hold and return an object value", () => {
    const obj = { a: 1, b: "2" };
    const wrapper = new TypeSafeClassBase(obj);
    expect(wrapper.getValue()).toBe(obj);
});
