export type First<T extends (any[] | readonly any[])> = T extends [infer F, ...any[]] ? F : null;
