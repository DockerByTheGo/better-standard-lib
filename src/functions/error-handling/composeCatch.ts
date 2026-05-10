import { catchF } from "./catchF";

export function composeCatch<
    TArg,
    T extends (arg: TArg) => unknown,
    TErrorhandler extends (arg: Error) => unknown
>(
    v: T,
    handler: TErrorhandler
): (arg: TArg) => ReturnType<T> | ReturnType<TErrorhandler> {
    return arg => catchF(() => v(arg), handler)
}