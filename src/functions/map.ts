

export function map<T, ReturnType>(v: T, func: (v: T) => ReturnType): ReturnType {
    return func(v)
}