

export type TypeSafeOmit<T extends Record<string, unknown>, K extends keyof T> = {
    [Key in keyof T as Key extends K ? never : Key]: T[Key];
};