import z from "zod";
import { Try } from "../option";
import { OverloadsBase, OverloadsImplBase, ZodRawObject } from "./types";
import { isTrue } from "@better-standard-internal/type-level-functions/isBoolean";
import { ISimpleMapable } from "../mapable";

export class FunctionOverload<Y extends OverloadsBase, T extends OverloadsImplBase<Y>> {
    // public overloads
    private overloadsConfig: Y;
    private overloads: T;
    constructor(overloadsConfig: Y, overloads: T) {
        this.overloadsConfig = overloadsConfig;
        this.overloads = overloads;
    }

    static new<
        NewOverloads extends Record<
            string,
            ZodRawObject 
        >,
        OverloadsImpl extends OverloadsImplBase<NewOverloads>,
    >(
        overloads: NewOverloads,
        overloadsImpl: OverloadsImpl,
    ): FunctionOverload<NewOverloads, OverloadsImpl> {
        return new FunctionOverload(overloads, overloadsImpl);
    }

    execute(v: T[keyof T]): ReturnType<T[keyof T]> {
        return Object
            .entries(this.overloadsConfig)
            .map(([name, handler], i) => {
                if (handler.safeParse(v).success) { // TODO make it strcit so that it must match exactly
                    return Try(this.overloads[name](v), {
                        ifNone: () => null,
                        ifNotNone: v => v,
                    });
                }
                else {
                    return null;
                }
            })
            .filter(v => v !== null)
            .at(0);
    }

    public get raw(): (v: T[keyof T]) => ReturnType<T[keyof T]> { // just returns the function it is cool when you need to pass just the function instead of the whole object
        return (v: T[keyof T]) => {
            return Object
                .entries(this.overloadsConfig)
                .map(([name, handler], i) => {
                    if (handler.safeParse(v).success) { // TODO make it strcit so that it must match exactly
                        return Try(this.overloads[name](v), {
                            ifNone: () => null,
                            ifNotNone: v => v,
                        });
                    }
                    else {
                        return null;
                    }
                })
                .filter(v => v !== null)
                .at(0);
        };
    }
}




type Overloader<T extends readonly ZodRawObject[]> = {
    [K in keyof T]: (v: z.infer<T[K]>) => unknown
};



export function overload<
    T extends readonly ZodRawObject[],
    R extends Overloader<T>,
>(
    v: T,
    d: R,
): <E extends number>(v: Parameters<R[E]>[0]) => ReturnType<R[E]>     {
    return 
}

export function overloadWithCustomResolver<
    T extends readonly ZodRawObject[],
    R extends Overloader<T>,
>(
    v: T,
    d: R
)
 

class OverloadBuilderWithCustomResolver<T extends ((v: unknown) => unknown)[], isOverloadChooserDefined extends boolean = false> {
    constructor(
        public overloads: T,
        public isOverloadChooserDefined: isOverloadChooserDefined,
        public resolver: ((overloads: T, value: Parameters<T[number]>[0]) => ReturnType<T[number]> )| null
    ){
    }

    addOverload<Overload extends (v: any) => any>(overload: Overload): 
    isTrue<
        isOverloadChooserDefined,
        OverloadBuilderWithCustomResolver<T,false>,
        OverloadBuilderWithCustomResolver<[...T,Overload], false>>
     {
        return new OverloadBuilderWithCustomResolver([...this.overloads, overload], false)
    }



    addResolver(resolver: (overloads: T, value: Parameters<T[number]>[0]) => ReturnType<T[number]>): isTrue<
        isOverloadChooserDefined,
        "resolver already defined",
        OverloadBuilderWithCustomResolver<T, true>
    > {
        if(this.isOverloadChooserDefined) {
           throw new Error("resolver aready defined") 
        }
        return new OverloadBuilderWithCustomResolver(this.overloads, true, resolver)
    }

    build(): ISimpleMapable<isTrue<
        isOverloadChooserDefined,
       <E extends number>(v: Parameters<T[E]>[0]) => ReturnType<T[E]> ,
        "resolver not defined"
    >> {
       
        if(!this.isOverloadChooserDefined) {
            throw new Error("resolver not defined")
        }
        
        return (v: Parameters<T[number]>[0]) => {
            return this.resolver?.(this.overloads, v)
        }
    }

    static new(): OverloadBuilderWithCustomResolver<[], false> {
        return new OverloadBuilderWithCustomResolver([], false, null)
    }
}

OverloadBuilderWithCustomResolver
    .new()
    .addOverload((v: string) => { return "" })
    .addOverload((v: number) => { return 1 })
    .addResolver((overloads, v) => {
        if(typeof v === "string") {
            return overloads[0](v)
        }
        else {
            return overloads[1](v)
        }
    })
    .build()
    .simpleMap(v => {
        const h = v("")
        return 
    })