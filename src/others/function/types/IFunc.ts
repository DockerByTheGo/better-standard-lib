
import { URecord } from "@better-standard-internal/type-level-functions";


export interface IFunc<
    TName extends string,
    TArgs extends URecord,
    TReturnType,
    TFunction = (args: TArgs) => TReturnType
> {
    name: TName;
    argsSchema: TArgs
    returnTypeSchema: TReturnType
    execute(args: TArgs): TReturnType
    TGetName: TName
    TGetArgs: TArgs
    TGetFunction: TFunction
    TGetReturnType: TReturnType
}