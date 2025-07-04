import type { Callback, VCallback } from "../types/voidcallback";
import type { Tick } from "../errors-as-values/rust-like-pattern/tick";
import type { IUnpackable } from "./unpackable/unpackable";

import { CustomUnpackable } from "./unpackable/unpackable";

export type none = null | undefined;

export function Try<
    V,
    IfNoneReturn,
    IfNotNotNoneReturn,
>/* casing is like this since try is reserved word */(
    v: V | none,
    config: {
        ifNone: () => IfNoneReturn;
        ifNotNone: Callback<IfNotNotNoneReturn, V>;
    },
): IfNoneReturn | IfNotNotNoneReturn {
    if (v === undefined || v === null) {
        return config.ifNone();
    }
    return config.ifNotNone(v);
}

export type IOptionable<T> = {
    is_none: () => boolean;
} & IUnpackable<T>;

// export class Optionable<T> implements IOptionable<T>{
//     private value: T | none = null
//     constructor(v: T | none) {
//        this.value = v
//     }

//     unpack(): T {
//         if (this.value === null || this.value === undefined) {
//             throw new Error("Option is None")
//         }
//         return this.value
//     }

//     unpack_with_default(d: T): T{
//         if (this.value === null || this.value === undefined) {
//            return d
//         }
//         return this.value
//     }
//     is_none(): boolean{
//         return this.value === undefined || this.value === null
//     }

//     unpack_or_with_diverging_type_from_the_original<C>(customHandler: () => C) : ILeftRight<Optionable<T>,Optionable<C>>{
//         if (this.value === null) {
//             return new LeftRight(new Optionable<T>(null),new Optionable(customHandler()))
//         }
//         return new LeftRight(new Optionable(this.value),new Optionable<C>(null))
//    }

//     unpack_or(default_handler: () => T): T{
//         if (this.value === null || this.value === undefined) {
//             return default_handler()
//         }
//         return this.value
//    }
// }

// Plan -> write tests for this and then remake it to inherit since currently it will easier to test it whether it behaves cirrectly and if not debugging will be easier

export const statics = {
    messageForWhenOptionIsNone: "Option is None ",
};

export class Optionable<T>
    extends CustomUnpackable<T>
    implements Tick<CustomUnpackable<T>> {
    constructor(v: T | none) {
        super(v as T, (v) => {
            return !this.is_none(); // ! chatbots will say this does not work ignore it, it works as expected
        });
        this.messageWhenYouCntUnpack = statics.messageForWhenOptionIsNone;
    }

    public get optionValue(): T {}

    is_none(): boolean {
        return this.value === null || this.value === undefined;
    }

    ifNone(v: () => void): void {
        if (this.is_none()) {
            v();
        }
    }

    tick(callback: VCallback<CustomUnpackable<T>>) {
        callback(this);
        return this;
    }

    try<IfNonNoneReturnType, IfNoneReturnType>(options: {
        ifNotNone: (v: T) => IfNonNoneReturnType;
        ifNone: () => IfNoneReturnType;
    }): IfNonNoneReturnType | IfNoneReturnType {
        if (this.is_none()) {
            return options.ifNone();
        }
        else {
            return options.ifNotNone(this.value);
        }
    }

    static new<T>(v: T | none): Optionable<T> {

    return new Optionable(v)
    }
}

export function mapOptionable<T>(v: T | none): Optionable<T> {
    return new Optionable(v)
}

export function ifNotNone<T>(v: T | none, callback: (v: T) => Promise<void>) {
    return new Optionable(v as T).ifCanBeUnpacked(callback);
}
