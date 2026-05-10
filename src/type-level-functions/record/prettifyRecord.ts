export type PrettifyRecord<T extends Record<string, unknown>> = {
  [P in keyof T]: T[P]
};

export type { PrettifyRecord as PretifyRecord };
