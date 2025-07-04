import type { keyofonlystringkeys } from "./keyofonlystringkeys";

export type Prefix<T extends string, Prefix extends string> = `${Prefix}${T}`;

export type PrefixKeysOfRecord<T extends Record<string, unknown>> = Record<Prefix<keyofonlystringkeys<T>, "on">, T[keyof T]>;
