export type Or<T extends unknown[]> = T[number];



const g: Or<["string", 123, true]> = 123;