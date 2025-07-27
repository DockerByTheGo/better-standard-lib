

export type ContainsAtTheEnd<T extends string, Y extends string> = T extends `${infer Rest}${Y}` ? true : false;

export type ContainsAtTheStart<T extends string, Y extends string> = T extends `${Y}${infer Rest}` ? true : false