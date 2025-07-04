import { objectEntries } from "./result";

type extractParts<T extends string, Parts extends readonly [] = []> = T extends `${infer T} ${infer Rest}`
    ? extractParts<Rest, [...Parts, T]>
    : T extends ""
        ? Parts
        : [...Parts, T];

type g = extractParts<"h k /">;

class SmartString<T extends string> {
    private value: T;
    constructor(v: T) {
        this.value = v;
    }

    getPart<desired extends extractParts<T>[number]>(v: desired): desired {
        return this.value.split(" ").find(value => value === v);
    }

    getParts(): extractParts<T> {
        this.value.split(" ");
    }
}

const g = new SmartString("g h   ");
const a = g.getPart("g");
const h = g.getParts();

type Entry<T extends string> = Record<T, (v: string) => string>;
export namespace AnotherSmartString{
    export class V1<Entries extends Entry<string>> {
        private schema: Entries;
        public value: string;
        constructor(schema: Entries, value: string) {
            this.schema = schema;
            this.value = value;
        }

        getParts(): {
            [K in keyof Entries]: string
        } {
            const ret: {
                [K in keyof Entries]: string
            } = {};
            objectEntries(this.schema).forEach(([key, val]) => {
                ret[key] = val(this.value);
            });
            return ret;
        }

        getPart<R extends keyof Entries>(v: R): ReturnType<Entries[R]> {
            return this.schema[v](this.value);
        }
    }

    const ggg = new V1({
        dname: v => "",
    }, "");

    ggg.getParts();
    const hg = ggg.getPart("dname");

    export class V2<T extends readonly string[]> {
        public v: T;
        constructor(v: T) {
            this.v = v;
        }
    }

    const hh = new V2(["k"] as const);

}
