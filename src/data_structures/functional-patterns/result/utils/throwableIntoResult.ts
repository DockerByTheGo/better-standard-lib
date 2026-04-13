import { Class } from "@better-standard-internal/types";
import { IResultable, IResultableDefault } from "../types";
import { SimpleResult } from "../implementations";

/**
 * Converts a throwing function into a result object.
 *
 * Use this when you have an API that still communicates failure by throwing,
 * but the caller wants to work with the result pattern instead. The function is
 * executed once: if it returns normally, its return value is passed into the
 * provided result class; if it throws, the thrown value is passed into the same
 * result class so the caller receives a result-shaped value in both cases.
 *
 * The result class is injected instead of hard-coded on purpose. `SimpleResult`
 * can be used for small `{ data } | { error }` style flows, while a richer
 * result implementation can be supplied by callers that need stronger error
 * typing, extra methods, or custom constructors. That keeps this helper as the
 * bridge between throw-based code and result-based code without making it own
 * the exact result implementation.
 *
 * @example
 * ```ts
 * const result = throwableIntoResult(
 *   () => JSON.parse(rawPayload),
 *   SimpleResult,
 * );
 *
 * if (result.isOk()) {
 *   result.unpack();
 * }
 * ```
 */
export function throwableIntoResult<
    TFuncReturn,
    TClass extends IResultableDefault
>(
    func: () => TFuncReturn,
    resultableClass: Class<[TFuncReturn | { err: string }], TClass>
): TClass {
    try {
        const res = func()
        return new resultableClass(res)
    } catch (err) {
        return new resultableClass(err)
    }
}





throwableIntoResult(
    () => {
        fetch("google.com")
    },
    SimpleResult
)
