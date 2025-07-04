export type ExtractValueTypesFromRecord<T extends Record<keyof T, T[keyof T]>> = T[keyof T];
type hi = ExtractValueTypesFromRecord<{ hi: string; g: number }>;
