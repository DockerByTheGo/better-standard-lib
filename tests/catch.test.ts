import { describe, expect, it } from "vitest";

import { catchF, composeCatch } from "../src/functions/error-handlng";

describe("catchF", () => {
    it("should return the result when no error is thrown", () => {
        const result = catchF(
            () => 42,
            (error) => 0
        );
        expect(result).toBe(42);
    });

    it("should catch error and call error handler", () => {
        const result = catchF(
            () => {
                throw new Error("test error");
            },
            (error) => "error handled"
        );
        expect(result).toBe("error handled");
    });

    it("should pass the error to the handler", () => {
        let caughtError: Error | null = null;
        catchF(
            () => {
                throw new Error("specific error");
            },
            (error) => {
                caughtError = error;
                return "handled";
            }
        );
        expect(caughtError).toBeInstanceOf(Error);
        expect(caughtError?.message).toBe("specific error");
    });

    it("should work with different return types", () => {
        const numberResult = catchF(
            () => 100,
            () => -1
        );
        expect(numberResult).toBe(100);

        const stringResult = catchF(
            () => "success",
            () => "failure"
        );
        expect(stringResult).toBe("success");

        const objectResult = catchF(
            () => ({ status: "ok" }),
            () => ({ status: "error" })
        );
        expect(objectResult).toEqual({ status: "ok" });
    });

    it("should handle error handler that throws", () => {
        expect(() => {
            catchF(
                () => {
                    throw new Error("first error");
                },
                (error) => {
                    throw new Error("second error");
                }
            );
        }).toThrow("second error");
    });

    it("should work with async operations wrapped in sync", () => {
        const result = catchF(
            () => {
                const data = [1, 2, 3];
                return data.reduce((a, b) => a + b, 0);
            },
            () => 0
        );
        expect(result).toBe(6);
    });
});

describe("composeCatch", () => {
    it("should return a function that executes successfully", () => {
        const fn = composeCatch(
            (x: number) => x * 2,
            () => -1
        );
        const result = fn(5);
        expect(result).toBe(10);
    });

    it("should catch errors in the composed function", () => {
        const fn = composeCatch(
            (x: number) => {
                if (x < 0) throw new Error("negative number");
                return x * 2;
            },
            () => 0
        );

        expect(fn(5)).toBe(10);
        expect(fn(-1)).toBe(0);
    });

    it("should pass error to handler with error details", () => {
        let errorMessage = "";
        const fn = composeCatch(
            (x: string) => {
                throw new Error(`Failed with ${x}`);
            },
            (error) => {
                errorMessage = error.message;
                return "recovered";
            }
        );

        const result = fn("test");
        expect(result).toBe("recovered");
        expect(errorMessage).toBe("Failed with test");
    });

    it("should work with complex transformations", () => {
        const parseJSON = composeCatch(
            (str: string) => JSON.parse(str),
            () => ({ error: "invalid JSON" })
        );

        expect(parseJSON('{"key": "value"}')).toEqual({ key: "value" });
        expect(parseJSON("invalid json")).toEqual({ error: "invalid JSON" });
    });

    it("should maintain type safety with multiple uses", () => {
        const divideBy = composeCatch(
            (divisor: number) => {
                if (divisor === 0) throw new Error("Division by zero");
                return 100 / divisor;
            },
            () => Infinity
        );

        expect(divideBy(10)).toBe(10);
        expect(divideBy(0)).toBe(Infinity);
        expect(divideBy(4)).toBe(25);
    });

    it("should handle string operations with errors", () => {
        const getFirstChar = composeCatch(
            (str: string) => {
                if (!str) throw new Error("Empty string");
                return str[0];
            },
            () => "?"
        );

        expect(getFirstChar("hello")).toBe("h");
        expect(getFirstChar("")).toBe("?");
    });

    it("should work with object operations", () => {
        const getProperty = composeCatch(
            (obj: { name?: string }) => {
                if (!obj.name) throw new Error("Name not found");
                return obj.name;
            },
            () => "unknown"
        );

        expect(getProperty({ name: "John" })).toBe("John");
        expect(getProperty({})).toBe("unknown");
    });
});
