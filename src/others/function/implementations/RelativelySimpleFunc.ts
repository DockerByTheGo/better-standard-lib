import { URecord } from "@better-standard-internal/type-level-functions";
import { IFunc } from "../types";
import { TypeMarker } from "@better-standard-internal/data_structures";
import { BasicResult } from "@better-standard-internal/data_structures/functional-patterns/result/implementations/Basic";
import { ResultSuccess } from "@better-standard-internal/data_structures/functional-patterns/result/success/implementations/Basic";
import { IResultError } from "@better-standard-internal/data_structures/functional-patterns/result/error";



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
        super("RelativelySimpleFunc")
    }

    TGetArgs: TArgs;
    TGetFunction: (args: TArgs) => TReturn;
    TGetName: TName;

    execute(arg: TArgs): BasicResult<ResultSuccess<TReturn>, {schemaMismatch: IResultError<"schemaMismatch">}> {
        // you need to make validation  
        return this.fn(arg);
    }

    executeWhichThrows(arg: unknown): ReturnType<TFunction> { }

}
