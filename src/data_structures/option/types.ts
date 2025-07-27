import { IUnpackable } from "../unpackable/unpackable";

export type IOptionable<T> = {
    is_none: () => boolean;
} & IUnpackable<T>;