export type Last<T extends readonly unknown[]>
  = T extends readonly [...infer _, infer L]
    ? L
    : T extends readonly [infer R]
      ? R
      : null;
