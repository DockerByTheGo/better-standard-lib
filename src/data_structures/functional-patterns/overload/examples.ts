import { z, ZodObject, ZodRawShape } from "zod";
import { ZodRawObject } from "./types";

// Examples
{
    const exmaple = overload(
        [
            z.object({
                hi: z.string(),
            }),
            z.object({
                koko: z.number(),
            }),
        ] as const, // very importnat to place as const
        [
            (v) => { return ""; },
            (v) => { return 3; },
        ],
    );
    const res = exmaple({ hi: "" });
    exmaple()
}
{
    type Overload<T extends ZodRawObject, R> = {
        ko: T;
        v: (V: z.infer<T>) => R;
    };
    type Overloader<T extends readonly ZodObject<ZodRawShape>[]> = {
        [K in keyof T]: Overload<T[K], unknown>
    };

    function h<H extends readonly ZodObject<ZodRawShape>[]>(v: Overloader<H>): Overloader<H> {}
    const g = h([
        { ko: z.object({ h: z.string() }), v: (V) => {} },
    ] as const);

    const gg = g[0].v();
}

{
    type Overload<T extends ZodObject<ZodRawShape>, R> = (v: z.infer<T>) => R;
    type Overloads<T extends readonly ZodObject<ZodRawShape>[]> = {
        [K in keyof T]: Overload<T[K], unknown>
    };

    type h = Overloads<[]>;

    function k<T extends ZodRawObject[]>(v: Overloads<T>): Overloads<T> {}
}

{
    type Overload<T extends ZodRawShape> = string;
    function g<T>(v: T): {
        [K in keyof T]: ReturnType<T[K]["func"]>
    } {

    }

    const h = g([
        { func: () => { return ""; } },
        { func: () => { return 1; } },
    ] as const);
}

{
    function hgr<T extends ZodRawObject>(v: T): z.infer<T> {}

    const gff = hgr(z.object({ hi: z.string() }));

    type Overload<T extends ZodObject<ZodRawShape>, R> = (v: z.infer<T>) => R;

    function newOverload<T extends ZodRawObject, R>(v: {
        d: T;
        func: (v: z.infer<T>) => R;
    }): Overload<T, R> {}

    const jj = newOverload({
        d: z.object({ z: z.string() }),
        func: (v) => { return "hi"; },
    });

    const hg = jj({ z: "" });

    function gg<T extends unknown>(v: T): <R extends number>(v: Parameters<T[R]>[0]) => ReturnType<T[R]> {

    }

    // function gg<T extends unknown[]>(v: T): <R extends T[number]>(v: Parameters<R>[0]) => ReturnType<R> {
    //     return
    // }

    const h = gg([
        newOverload({
            d: z.object({ hi: z.string() }),
            func(v) {
                return "g" as const;
            },
        }),
        newOverload({
            d: z.object({ hil: z.number() }),
            func: (v) => { return 1 as const; },
        }), // do not place as const here since it breaks infernce for the param in func making it always be {[x: string]: any}
    ] as const); // if you remove this just know it might stop this from working

    const h6 = h({ hi: "" } as const);
}