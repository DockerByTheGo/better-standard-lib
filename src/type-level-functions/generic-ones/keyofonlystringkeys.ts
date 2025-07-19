export type nonstringkeys<T extends string | number | symbol> = T extends number | symbol ? never : string;
export type onlystringkeys<T extends Record<string, unknown>> = nonstringkeys<keyof T>;
