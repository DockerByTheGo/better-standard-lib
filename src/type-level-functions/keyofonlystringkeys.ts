export type nonstringkeys<T extends string | number | symbol> = T extends number | symbol ? never : string;
export type keyofonlystringkeys<T extends object | Array<unknown>> = nonstringkeys<keyof T>;
