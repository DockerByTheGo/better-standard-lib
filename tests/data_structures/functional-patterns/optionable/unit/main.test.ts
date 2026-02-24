import { describe, expect, it, vi } from "vitest";

import { Optionable } from "../../../../../src/data_structures/functional-patterns/option/main";

describe("optionable", () => {
  describe("some and none", () => {
    it("should create a Some value", () => {
      const some = Optionable.some(5);
      expect(some.isSome()).toBe(true);
      expect(some.isNone()).toBe(false);
    });

    it("should create a None value", () => {
      const none = Optionable.none();
      expect(none.isSome()).toBe(false);
      expect(none.isNone()).toBe(true);
    });

    it("should create a Some value with null", () => {
      const someNull = Optionable.some(null);
      expect(someNull.isSome()).toBe(true);
      expect(someNull.isNone()).toBe(false);
    });
  });

  describe("unpack", () => {
    it("should unpack a Some value", () => {
      const some = Optionable.some(5);
      expect(some.unpack().raw).toBe(5);
    });

    it("should throw when unpacking a None value", () => {
      const none = Optionable.none();
      expect(() => none.unpack()).toThrow();
    });

    it("should unpack a Some(null) value", () => {
      const someNull = Optionable.some(null);
      expect(someNull.unpack().raw).toBe(null);
    });
  });

  describe("unpack_or", () => {
    it("should return the value for a Some", () => {
      const some = Optionable.some(5);
      expect(some.unpack_or(() => 10)).toBe(5);
    });

    it("should return the default value for a None", () => {
      const none = Optionable.none();
      expect(none.unpack_or(() => 10)).toBe(10);
    });
  });

  describe("unpack_with_default", () => {
    it("should return the value for a Some", () => {
      const some = Optionable.some(5);
      expect(some.unpack_with_default(10)).toBe(5);
    });

    it("should return the default value for a None", () => {
      const none = Optionable.none<number>();
      expect(none.unpack_with_default(10)).toBe(10);
    });

    it("should return null for Some(null)", () => {
      const someNull = Optionable.some(null);
      expect(someNull.unpack_with_default(10)).toBe(null);
    });
  });

  describe("expect", () => {
    it("should return a Mapable for a Some", () => {
      const some = Optionable.some(5);
      expect(some.expect("error").raw).toBe(5);
    });

    it("should throw with a custom message for a None", () => {
      const none = Optionable.none();
      expect(() => none.expect("custom error")).toThrow("custom error");
    });
  });

  describe("ifCanBeUnpacked", () => {
    it("should call the handler for a Some", () => {
      const some = Optionable.some(5);
      const handler = vi.fn();
      some.ifCanBeUnpacked(handler);
      expect(handler).toHaveBeenCalledWith(5);
    });

    it("should not call the handler for a None", () => {
      const none = Optionable.none();
      const handler = vi.fn();
      none.ifCanBeUnpacked(handler);
      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe("map", () => {
    it("should apply the function to a Some value", () => {
      const some = Optionable.some(5);
      const mapped = some.map(x => x * 2);
      expect(mapped.isSome()).toBe(true);
      expect(mapped.unpack().raw).toBe(10);
    });

    it("should return None when mapping a None value", () => {
      const none = Optionable.none<number>();
      const mapped = none.map(x => x * 2);
      expect(mapped.isNone()).toBe(true);
    });
  });

  describe("flatMap", () => {
    it("should apply the function to a Some value and return a Some", () => {
      const some = Optionable.some(5);
      const mapped = some.flatMap(x => Optionable.some(x * 2));
      expect(mapped.isSome()).toBe(true);
      expect(mapped.unpack().raw).toBe(10);
    });

    it("should apply the function to a Some value and return a None", () => {
      const some = Optionable.some(5);
      const mapped = some.flatMap(_ => Optionable.none<number>());
      expect(mapped.isNone()).toBe(true);
    });

    it("should return None when flatMapping a None value", () => {
      const none = Optionable.none<number>();
      const mapped = none.flatMap(x => Optionable.some(x * 2));
      expect(mapped.isNone()).toBe(true);
    });
  });

});
