import { OneOf } from "@better-standard-internal/data_structures/functional-patterns/one-of";
import { TypeMarker } from "@better-standard-internal/data_structures/others/type-marker";
import { describe, expect, it, vi } from "vitest";

// --- test fixtures ---

class Success extends TypeMarker<"Success"> {
  constructor(public readonly message: string) {
    super("Success");
  }
}

class Failure extends TypeMarker<"Failure"> {
  constructor(public readonly code: number) {
    super("Failure");
  }
}

const Result = OneOf([Success, Failure]);

// --- tests ---

describe("OneOf", () => {
  describe("construction", () => {
    it("wraps a value and exposes it via .value", () => {
      const instance = new Result(new Success("ok"));
      expect(instance.value).toBeInstanceOf(Success);
      expect((instance.value as Success).message).toBe("ok");
    });

    it("cons holds the correct constructors", () => {
      expect(Result.cons.Success).toBe(Success);
      expect(Result.cons.Failure).toBe(Failure);
    });

    it("otherCons creates an instance of the correct type", () => {
      const instance = Result.otherCons("Success", "hello");
      expect(instance.value).toBeInstanceOf(Success);
      expect((instance.value as Success).message).toBe("hello");
    });
  });

  describe("is()", () => {
    it("returns true when type matches", () => {
      const instance = new Result(new Success("yes"));
      expect(instance.is("Success")).toBe(true);
    });

    it("returns false when type does not match", () => {
      const instance = new Result(new Failure(404));
      expect(instance.is("Success")).toBe(false);
    });
  });

  describe("defineHandlers()", () => {
    it("calls the matching handler", () => {
      const onSuccess = vi.fn();
      const onFailure = vi.fn();

      new Result(new Success("done")).defineHandlers({
        ifSuccess: (v) => onSuccess(v.message),
        ifFailure: (v) => onFailure(v.code),
      });

      expect(onSuccess).toHaveBeenCalledWith("done");
      expect(onFailure).not.toHaveBeenCalled();
    });

    it("calls the failure handler when value is Failure", () => {
      const onSuccess = vi.fn();
      const onFailure = vi.fn();

      new Result(new Failure(500)).defineHandlers({
        ifSuccess: (v) => onSuccess(v.message),
        ifFailure: (v) => onFailure(v.code),
      });

      expect(onFailure).toHaveBeenCalledWith(500);
      expect(onSuccess).not.toHaveBeenCalled();
    });

    it("handlers are optional — missing handler does not throw", () => {
      const instance = new Result(new Success("hi"));
      expect(() => {
        instance.defineHandlers({
          ifSuccess: (v) => v.message,
        });
      }).not.toThrow();
    });
  });
});
