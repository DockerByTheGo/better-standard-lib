
export type isTrue<T extends boolean, IfTrue, IfFalse> = T extends true ? IfTrue : IfFalse

export type isFalse<T extends boolean, IfTrue, IfFalse> = T extends false ? IfTrue : IfFalse