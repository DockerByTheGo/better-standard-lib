export type Last<T extends readonly unknown[]>
  = T extends readonly [...infer _, infer L]
    ? L
    : T extends readonly [infer R]
      ? R
      : null;

const g = ["g", "g2"] as const;

type j = Last<typeof g>;
