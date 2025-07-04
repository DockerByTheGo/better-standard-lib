import { VCallback } from "@better-standard-internal/types/voidcallback";

export type IPipeable<V> = {
    pipe: (handler: VCallback<V>) => void;
};
