export type With<OriginalObject extends Record<string, unknown>, NewKey extends string, TypeOfNewKey> = NewKey extends keyof OriginalObject ? never : {
  [Key in keyof OriginalObject]: OriginalObject[Key];
} & {
  [K in NewKey]: TypeOfNewKey;
};
