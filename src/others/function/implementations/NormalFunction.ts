import { TypeMarker } from "@better-standard-internal/data_structures"
import { IFunc } from "../types";
import { URecord } from "@better-standard-internal/type-level-functions";
import { Optionable, OptionableString, Try } from "@better-standard-internal/data_structures/functional-patterns/option";

export class NormalFunc<
    TName extends string,
    TArgs extends URecord,
    TReturn
> extends TypeMarker<"NormalFunc"> implements IFunc<

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
        super("NormalFunc")
    }

    argsSchema: TArgs = {};
    TGetName: TName;
    TGetArgs: TArgs;
    TGetFunction: (args: TArgs) => TReturn;
    TGetReturnType: TReturn;
    TGetType: "NormalFunc";

    getType = () => "NormalFunc" as const;

    execute(args: TArgs): TReturn {
        return this.fn(args)
    }


    static fromFunc<
        T extends (arg: URecord) => unknown,
        TName extends OptionableString,
    >(
        v: T,
        name: TName = Optionable.none()
    ) {
        return new NormalFunc<
            TName["value"] extends null ? "" : TName["value"], Parameters<T>[0],
            ReturnType<T>
        >(
            name.unwrapWithDefault(""),
            {} as (Parameters<T>)[0],
            {} as ReturnType<T>,
            v
        )
    }
}

const g = NormalFunc.fromFunc((args: { name: string }) => "" as const)

export const NFunc = NormalFunc.fromFunc


const h = NFunc((args: {name: string}) => "")