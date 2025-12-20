
export type ifTrue<T extends boolean, IfTrue, IfFalse> = T extends true ? IfTrue : IfFalse

export type ifFalse<T extends boolean, IfTrue, IfFalse> = T extends false ? IfTrue : IfFalse

export type isTrue<T extends boolean> = T extends true ? true : never

export type isFalse<T extends boolean> = T extends false ? true : never