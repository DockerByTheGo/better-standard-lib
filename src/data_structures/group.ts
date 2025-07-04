// ever wanted to share context between function to reuce the need of passing args all the time and so you made a class to share the properties but a whole class is an overkill wel thats what a group is for

import type { ZodObject, ZodRawShape } from "zod";

import z from "zod";

export class GroupBuilder<T extends readonly unknown[], InitialState extends ZodObject<ZodRawShape>> {
    private readonly funcs: T;
    private state: InitialState;

    constructor(funcs: T, state: InitialState) {
        this.funcs = funcs;
        this.state = state;
    }

    addFunc<R>(v: (state: z.infer<InitialState>) => R) {
        return new GroupBuilder([...this.funcs, v], this.state);
    }

    build(): (v: z.infer<InitialState>) => void {
        return v => this.funcs.forEach(func => func(v));
    }
}

const group = new GroupBuilder([], z.object({
    dockerImage: z.string(),
    port: z.number(),
}))
    .addFunc((state) => {
        state.dockerImage = "dockerImage";
    })
    .addFunc((state) => {
        state.port = 1;
    })
    .build();

// group({dockerImage: "", port: 1})

    type IsNever<T> = [T] extends [never] ? true : false;
    type IfNeverWithDefault<T, Default> = IsNever<T> extends true ? Default : T;
    type IfNeverWithDefaultEmpty<T> = IfNeverWithDefault<T, {}>;

export class GroupBuilderZodlessAccumelating<T extends readonly unknown[], InitialState extends Record<string, unknown>> {
    private readonly funcs: T;
    private state: InitialState;

    constructor(funcs: T, state: InitialState) {
        this.funcs = funcs;
        this.state = state;
    }

    addFunc<R>(v: (state: InitialState & ReturnType<IfNeverWithDefaultEmpty<T[T["length"]]>>) => R) {
        return new GroupBuilderZodlessAccumelating([...this.funcs, v], this.state);
    }

    build(): (v: InitialState) => void {
        return v => this.funcs.forEach(func => func(v));
    }
}

// const group = new GroupBuilderZodlessAccumelating([], {
//   dockerImage: '',
//   port: 1,
// })
//   .addFunc((state) => {
//     state.dockerImage = 'dockerImage'
//     return { hi: '' }
//   })
//   .addFunc((state) => {
//     state.port = 1
//   })
//   .build()
