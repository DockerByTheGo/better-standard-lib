export type And<T extends any[]> =
    T extends [infer Head, ...infer Tail]
    ? Head & And<Tail>
    : unknown;
type A = { a: string };
type B = { b: number };
type C = { c: boolean };

type Result = And<[A, B, C]>;
// Result = { a: string } & { b: number } & { c: boolean }
