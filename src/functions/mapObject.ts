export function entries<T extends Record<string, unknown>>(v: T): [keyof T, T[keyof T]][] {
    return Object.entries(v) as [keyof T, T[keyof T]][];
}
