import type { VCallback } from "@better-standard-internal/types/voidcallback";

export type Tick<T> = {
  tick: (callback: VCallback<T>) => T;
};
