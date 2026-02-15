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