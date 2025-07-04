export type With<OriginalObject extends Record<string, unknown>, NewKey extends string, TypeOfNewKey> = NewKey extends keyof OriginalObject ? never : {
    [Key in keyof OriginalObject]: OriginalObject[Key]
} & {
    [K in NewKey]: TypeOfNewKey
};

export type BetterOmit<T extends Record<string, unknown>, K extends keyof T> = {
    [Key in keyof T as Key extends K ? never : Key]: T[Key];
};
