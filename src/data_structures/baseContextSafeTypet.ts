import { Get, GetSet } from "../data_structures/getSetClass";

export abstract class ContextSafeType<V> {
    private v: V;
    constructor(v: V) {
        if (this.customValidator(v)) {
            this.v = v;
        }
        else {
            throw new Error(`Invalid value for ${this.constructor.name}: ${v}`);
        }
    }

    public get value(): V { return this.v; }
    abstract customValidator(v: V): boolean;
}

export abstract class ContextSafeTypeGetable<V> extends ContextSafeType<Get<V>> {
    constructor(v: V) {
        super(new Get(v));
    }
}

export abstract class ContextSafeTypeGetSet<V> extends ContextSafeType<GetSet<V>> {
    constructor(v: V) {
        super(new GetSet(v));
    }
}
