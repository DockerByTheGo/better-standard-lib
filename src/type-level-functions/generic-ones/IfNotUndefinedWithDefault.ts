export type IfNotUndefined<T, Default> = T extends undefined | null
    ? Default
    : T;

type j = IfNotUndefined<{ h: string }, { hi: string }>;
type k = IfNotUndefined<undefined, { hi: string }>;

export type DefaultWhenNever<T, Default> = [T] extends [never] ? Default : T;