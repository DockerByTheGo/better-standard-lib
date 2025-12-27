import type { Alphabet } from "./alphabet";

export type RemoveNonAlphabetic<S extends string>
  = S extends `${infer First}${infer Rest}`
    ? First extends Alphabet
      ? `${First}${RemoveNonAlphabetic<Rest>}`
      : RemoveNonAlphabetic<Rest>
    : "";
