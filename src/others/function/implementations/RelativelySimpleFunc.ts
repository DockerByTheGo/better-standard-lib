import { URecord } from "@better-standard-internal/type-level-functions";
import { IFunc } from "../types";
import { TypeMarker } from "@better-standard-internal/data_structures";



const RelativelySimpleFunctionExecuteResult = 

export class RelativelySimpleFunction<

    TName extends string,
    TArgs extends URecord,
    TReturn
> extends TypeMarker<"RelativelySimpleFunc">
    implements IFunc<
        TName,
        TArgs,
        TReturn
    > {

    constructor(
        public readonly name: TName,
        public readonly schema: TArgs,
        public readonly returnTypeSchema: TReturn,
        public readonly fn: (args: TArgs) => TReturn
    ) {

    }

    TGetArgs: TArgs;
    TGetFunction: (args: TArgs) => TReturn;
    TGetName: TName;

    execute(arg: TArgs):  {
        // you need to make validation  
        return this.fn(arg);
    }

    executeWhichThrows(arg: unknown): ReturnType<TFunction> { }

}
