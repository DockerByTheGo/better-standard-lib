import { VCallback } from "@better-standard-internal/types/voidcallback";

export interface Tick<T> {
    tick: (callback: VCallback<T>) => T;
}