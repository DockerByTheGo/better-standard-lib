export type removeNonStringEntriesFromKeyOf<T extends string | number | symbol> = T extends number | symbol ? never : T;

type h = removeNonStringEntriesFromKeyOf<"h" | 1>;
