import { SimpleResult } from "@better-standard-internal/data_structures/functional-patterns/result/implementations/SimpleResult";
import { expect, test } from "bun:test";

test("SimpleResult unpacks a success result object", () => {
    const result = new SimpleResult({ data: { name: "John Doe", age: 30 } });

    expect(result.isOk()).toBe(true);
    expect(result.isError()).toBe(false);
    expect(result.unpack()).toEqual({ name: "John Doe", age: 30 });
});

test("SimpleResult throws when unpacking an error result object", () => {
    const result = new SimpleResult({ error: "not-found" });

    expect(result.isOk()).toBe(false);
    expect(result.isError()).toBe(true);
    expect(() => result.unpack()).toThrow("not-found");
});

test("SimpleResult can be built from success and error helpers", () => {
    const success = SimpleResult.Success({ path: "avatar.png" });
    const error = new SimpleResult.Error("already-exists");

    expect(success.unpack()).toEqual({ path: "avatar.png" });
    expect(error.isError()).toBe(true);
});
