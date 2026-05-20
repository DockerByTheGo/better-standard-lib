import {
  buildError,
  buildErrorReturningObject,
  ResultError,
} from "@better-standard-internal/data_structures/functional-patterns/result/error";
import { expect, test } from "vitest";

test("ResultError stores metadata and throws with the formatted message", () => {
  const resultError = new ResultError("TestError", "something went wrong");

  expect(resultError.ok).toBe(false);
  expect(resultError.name).toBe("TestError");
  expect(resultError.message).toBe("something went wrong");
  expect(() => resultError.throw()).toThrow("TestError: something went wrong");
});

test("buildError returns a constructor that reuses the provided name", () => {
  const APIError = buildError("APIError");
  const apiError = new APIError("invalid token");

  expect(apiError).toBeInstanceOf(ResultError);
  expect(apiError.ok).toBe(false);
  expect(apiError.name).toBe("APIError");
  expect(() => apiError.throw()).toThrow("APIError: invalid token");
});

test("buildErrorReturningObject exposes a keyed constructor that throws consistent messages", () => {
  const errors = buildErrorReturningObject("DatabaseError");
  const databaseError = new errors.DatabaseError("connection lost");

  expect(databaseError).toBeInstanceOf(ResultError);
  expect(databaseError.name).toBe("DatabaseError");
  expect(() => databaseError.throw()).toThrow("DatabaseError: connection lost");
});
