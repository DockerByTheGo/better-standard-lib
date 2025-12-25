import { describe, it, expect, vi } from "vitest";
import { Optionable } from "../../../../../src/data_structures/functional-patterns/option/main";

describe("Optionable", () => {
    describe("some and none", () => {
        it("should create a Some value", () => {
            const some = Optionable.some(5);
            expect(some.isSome()).toBe(true);
            expect(some.is_none()).toBe(false);
        });

        it("should create a None value", () => {
            const none = Optionable.none();
            expect(none.isSome()).toBe(false);
            expect(none.is_none()).toBe(true);
        });

        it("should create a Some value with null", () => {
            const someNull = Optionable.some(null);
            expect(someNull.isSome()).toBe(true);
            expect(someNull.is_none()).toBe(false);
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
            expect(mapped.is_none()).toBe(true);
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
            expect(mapped.is_none()).toBe(true);
        });

        it("should return None when flatMapping a None value", () => {
            const none = Optionable.none<number>();
            const mapped = none.flatMap(x => Optionable.some(x * 2));
            expect(mapped.is_none()).toBe(true);
        });
    });
    
    describe("unpack_or_with_diverging_type_from_the_original", () => {
        it("should return a Left with the value for a Some", async () => {
            const some = Optionable.some(5);
            const result = some.unpack_or_with_diverging_type_from_the_original(() => "error");
            const raw = await result.getRaw();
            expect(raw[0]).toBe(5);
            expect(raw[1]).toBe(null);
        });

        it("should return a Right with the default value for a None", async () => {
            const none = Optionable.none<number>();
            const result = none.unpack_or_with_diverging_type_from_the_original(() => "error");
            const raw = await result.getRaw();
            expect(raw[0]).toBe(null);
            expect(raw[1]).toBe("error");
        });
    });
});
