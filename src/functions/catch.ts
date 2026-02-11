export function catchF<
    T extends () => unknown,
    TErrorhandler extends (arg: Error) => unknown
>(v: T, handler: TErrorhandler): ReturnType<T> | ReturnType<TErrorhandler> {
    try {
        return v()
    } catch (e) {
        return handler(e as Error)
    }
}


function h() {
    throw new Error("idk")
}
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
