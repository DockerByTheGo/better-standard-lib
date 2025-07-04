export type valuesOf<T extends Record<string, unknown>> = T[keyof T];
