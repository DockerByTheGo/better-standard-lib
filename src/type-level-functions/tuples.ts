/**
 * Type utilities for working with tuples
 */

export type GetFirst<T extends unknown[]> = T extends [infer First, ...unknown[]] ? First : never;

export type GetLast<T extends unknown[]> = T extends [...unknown[], infer Last] ? Last : never;

export type GetElementType<T extends unknown[]> = T extends (infer U)[] ? U : never;
