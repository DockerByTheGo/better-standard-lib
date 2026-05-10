import { describe, expect, it, vi } from "vitest";

import {
  ifNotNone,
  mapOptionable,
  Optionable,
  statics,
  Try,
} from "../src/data_structures/functional-patterns/option/main";

describe("option utilities", () => {
  describe("Try", () => {
    it("uses the ifNone branch when the value is absent", () => {
      const result = Try(undefined, {
        ifNone: () => "missing",
        ifNotNone: value => `value-${value}`,
      });

      expect(result).toBe("missing");
    });

    it("uses the ifNotNone branch when a value is present", () => {
      const result = Try(5, {
        ifNone: () => "missing",
        ifNotNone: value => value * 2,
      });

      expect(result).toBe(10);
    });
  });

  describe("Optionable", () => {
    it("try returns Mapable wrapping the fallback result for none", () => {
      const fallback = Optionable.none<number>().try({
        ifNone: () => "fallback",
        ifNotNone: value => value,
      });

      expect(fallback.valueOf()).toBe("fallback");
    });

    it("try returns Mapable wrapping the transformed value for some", () => {
      const transformed = Optionable.some(10).try({
        ifNone: () => "fallback",
        ifNotNone: value => value + 5,
      });

      expect(transformed.valueOf()).toBe(15);
    });

    it("ifNone calls the callback when option is empty and does nothing otherwise", () => {
      const onNone = vi.fn();
      Optionable.none().ifNone(onNone);
      expect(onNone).toHaveBeenCalledOnce();

      const onSome = vi.fn();
      Optionable.some(1).ifNone(onSome);
      expect(onSome).not.toHaveBeenCalled();
    });

    it("unpack throws the default message when no value is stored", () => {
      expect(() => Optionable.none().unpack()).toThrow(statics.messageForWhenOptionIsNone);
    });

    it("unpack_or invokes the handler when needed and returns the inner value otherwise", () => {
      const handled = Optionable.none<number>().unpack_or(() => 42);
      expect(handled).toBe(42);

      const kept = Optionable.some(7).unpack_or(() => 42);
      expect(kept).toBe(7);
    });

    it("unpack_with_default uses the supplied default for none and keeps the value when present", () => {
      const defaulted = Optionable.none<number>().unpack_with_default(13);
      expect(defaulted).toBe(13);

      const kept = Optionable.some(2).unpack_with_default(13);
      expect(kept).toBe(2);
    });

    it("expect throws with the provided message when option is none", () => {
      expect(() => Optionable.none().expect("boom")).toThrow("boom");
    });

    it("ifCanBeUnpacked calls the handler only when there is a value", () => {
      const handler = vi.fn();
      Optionable.some("yep").ifCanBeUnpacked(handler);
      expect(handler).toHaveBeenCalledWith("yep");

      const never = vi.fn();
      Optionable.none<string>().ifCanBeUnpacked(never);
      expect(never).not.toHaveBeenCalled();
    });
  });

  describe("utility helpers", () => {
    it("mapOptionable returns none for nullish values and some otherwise", () => {
      const noneOption = mapOptionable(null);
      expect(noneOption.isNone()).toBe(true);

      const someOption = mapOptionable(4);
      expect(someOption.isSome()).toBe(true);
    });

    it("ifNotNone runs the callback and returns the created Optionable", () => {
      const callback = vi.fn();
      const option = ifNotNone("hello", callback);

      expect(callback).toHaveBeenCalledWith("hello");
      expect(option.isSome()).toBe(true);
      expect(option.unpack().valueOf()).toBe("hello");
    });
  });
});
