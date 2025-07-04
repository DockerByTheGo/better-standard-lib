import { ContextSafeType } from "@better-standard-internal/data_structures/baseContextSafeTypet";
import { GetSet } from "@better-standard-internal/data_structures/getSetClass";

function hasExtension(s: string): boolean {
    return (
        s.includes("ws://")
        || s.includes("http://")
        || s.includes("https://")
    );
}

function HasTrailingSlash(s: string): boolean {
    return s[s.length - 1] === "/";
}

export class Url<
    T extends GetSet<string> = GetSet<string>,
> extends ContextSafeType<T> {
    customValidator(h: T): boolean {
        const v = h.get();
        return hasExtension(v) && !HasTrailingSlash(v);
    }

    addPath(path: string) {
        return new Url(new GetSet(this.value.get() + path));
    }
}
