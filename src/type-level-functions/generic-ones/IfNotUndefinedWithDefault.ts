export type IfNotUndefined<T, Default> = T extends undefined | null
  ? Default
  : T;

export type DefaultWhenNever<T, Default> = [T] extends [never] ? Default : T;
