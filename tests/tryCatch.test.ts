import { describe, expect, it } from "vitest";

import { TryCatch } from "../src/functions/error-handlng/tryCatch";

describe("TryCatch", () => {
    it("invokes the success handler when the wrapped function succeeds", () => {
        const value = TryCatch(
            () => 10,
            (result) => `result: ${result}`,
            () => "never"
        );

        expect(value).toBe("result: 10");
    });

    it("calls the error handler when the wrapped function throws", () => {
        const errorResult = TryCatch(
            () => {
                throw new Error("boom");
            },
            () => "pass",
            (error) => {
                expect(error).toBeInstanceOf(Error);
                return "handled";
            }
        );

        expect(errorResult).toBe("handled");
    });

    it("passes the function output through to the success handler", () => {
        const logged: Array<number> = [];
        const result = TryCatch(
            () => {
                logged.push(1);
                return "ok";
            },
            (value) => {
                logged.push(2);
                return value.length;
            },
            () => -1
        );

        expect(result).toBe(2);
        expect(logged).toEqual([1, 2]);
    });
});
