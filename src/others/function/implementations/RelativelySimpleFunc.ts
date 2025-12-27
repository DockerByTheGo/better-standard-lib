import type { IResultError } from "@better-standard-internal/data_structures/functional-patterns/result/error";
import type { BasicResult } from "@better-standard-internal/data_structures/functional-patterns/result/implementations/Basic";
import type { ResultSuccess } from "@better-standard-internal/data_structures/functional-patterns/result/success/implementations/Basic";
import type { URecord } from "@better-standard-internal/type-level-functions";

import { TypeMarker } from "@better-standard-internal/data_structures";

import type { IFunc } from "../types";

export class RelativelySimpleFunction<

  TName extends string,
  TArgs extends URecord,
  TReturn,
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
    public readonly fn: (args: TArgs) => TReturn,
  ) {
    super("RelativelySimpleFunc");
  }

  TGetArgs: TArgs;
  TGetFunction: (args: TArgs) => TReturn;
  TGetName: TName;

  execute(arg: TArgs): BasicResult<ResultSuccess<TReturn>, { schemaMismatch: IResultError<"schemaMismatch"> }> {
    // you need to make validation
    return this.fn(arg);
  }

  executeWhichThrows(arg: unknown): ReturnType<TFunction> { }
}
