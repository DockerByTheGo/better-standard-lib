import { Mapable } from "@better-standard-internal/data_structures/functional-patterns/map/main";
import { IBase } from "../types";

class BasicBaseMapable<T> extends Mapable<T> {
    constructor(val: T) {
        super(val)
    }
}


class BasicBaseWithShape<T> extends BasicBaseMapable<T> {
    constructor(val: T) {
        super(val)
    }
}



class SString<TString extends string> extends BasicBaseMapable<SString<TString>> {
    constructor(v: TString) {
        super(v)
    }
}

new SString("").map(v => v.valueOf())