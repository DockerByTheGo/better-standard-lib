import { URecord } from "@better-standard-internal/type-level-functions";


interface Func<TArgs extends URecord, TFunction extends (arg: TArgs) => unknown> {
    name: string;
    schema: TArgs;
    fn: TFunction;
}


// TOFO : implement the result pattern 

ValidationResult

export class Function<
    TName extends string,
    TArgs extends URecord,
    TFunction extends (arg: TArgs) => unknown
> {

    constructor(
        public readonly name: TName,
        public readonly schema: TArgs,
        public readonly fn: TFunction
    ) {

    }

    execute(arg: TArgs): ReturnType<TFunction> {
        // you need to make validation  
        return this.fn(arg);
    }

    executeWhichThrows(arg: unknown): ReturnType<TFunction> {}

    public validate(): {
        
    }

    public validateWhichThrows() {

    }

}

const func = new Function("koko", { a: "" }, arg => "" as const);

func.execute({ a: "" })





