export type PretifyRecord<T extends Record<string, unknown>> = {
  [P in keyof T]: T[P]
};
