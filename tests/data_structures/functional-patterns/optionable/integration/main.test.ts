import { describe, expect, it } from "vitest";

import { Optionable } from "../../../../../src/data_structures/functional-patterns/option/main";
import { ResultError } from "../../../../../src/data_structures/functional-patterns/result/error";
import { BasicResult } from "../../../../../src/data_structures/functional-patterns/result/implementations/Basic";

describe("optionable and BasicResult integration", () => {
  const successResult = BasicResult.RawSuccess("success value");

  type MyError = ResultError<"MyError">;
  const errorResult = new BasicResult.Error(new ResultError("MyError", "error message"));

  it("ifSuccess on a Success result should return a Some", () => {
    const option = successResult.ifSuccess(data => data);
    expect(option).toBeInstanceOf(Optionable);
    expect(option.isSome()).toBe(true);
    expect(option.unpack().raw).toEqual({ data: "success value", ok: true });
  });

  it("ifSuccess on an Error result should return a None", () => {
    const option = errorResult.ifSuccess(data => data);
    expect(option).toBeInstanceOf(Optionable);
    expect(option.is_none()).toBe(true);
  });

  it("ifError on an Error result should return a Some", () => {
    const option = errorResult.ifError({
      MyError: err => err.message,
    });

    expect(option).toBeInstanceOf(Optionable);
    expect(option.isSome()).toBe(true);
    expect(option.unpack().raw).toBe("error message");
  });

  it("ifError on a Success result should return a None", () => {
    const option = successResult.ifError({
      MyError: err => err.message,
    });

    expect(option).toBeInstanceOf(Optionable);
    expect(option.is_none()).toBe(true);
  });
});
