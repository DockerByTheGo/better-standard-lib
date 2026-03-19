import { z } from "zod/v4";

import { TypeMarker } from "@better-standard-internal/data_structures";
import { BasicResult } from "@better-standard-internal/data_structures/functional-patterns/result/implementations/Basic";
import { ResultSuccess } from "@better-standard-internal/data_structures/functional-patterns/result/success/implementations/Basic";
import { ResultError } from "@better-standard-internal/data_structures/functional-patterns/result/error";

import type { IFunc } from "../types";

export class SchemaMismatchError extends ResultError<"schemaMismatch"> {
  constructor(message: string) {
    super("schemaMismatch", message);
  }
}

export class RelativelySimpleFunction<
  TName extends string,
  TArgs extends z.ZodObject,
  TReturn,
> extends TypeMarker<"RelativelySimpleFunc">
  implements IFunc<TName, TArgs, TReturn> {

  constructor(
    public readonly name: TName,
    public readonly argsSchema: TArgs,
    public readonly returnTypeSchema: TReturn,
    public readonly fn: (args: z.infer<TArgs>) => TReturn,
  ) {
    super("RelativelySimpleFunc");
  }

  declare TGetArgs: TArgs;
  declare TGetFunction: (args: z.infer<TArgs>) => TReturn;
  declare TGetName: TName;
  declare TGetReturnType: TReturn;

  execute(arg: unknown): BasicResult<
    ResultSuccess<TReturn>,
    { schemaMismatch: SchemaMismatchError }
  > {
    const parsed = this.argsSchema.safeParse(arg);

    if (!parsed.success) {
      return new BasicResult(new SchemaMismatchError(z.prettifyError(parsed.error))) as unknown as BasicResult<ResultSuccess<TReturn>, { schemaMismatch: SchemaMismatchError }>;
    }

    return new BasicResult(new ResultSuccess(this.fn(parsed.data))) as unknown as BasicResult<ResultSuccess<TReturn>, { schemaMismatch: SchemaMismatchError }>;
  }

  static new = <
    TName extends string,
    TArgs extends z.ZodObject,
    TReturn,
  >(
    name: TName,
    schema: TArgs,
    returnTypeSchema: TReturn,
    fn: (args: z.infer<TArgs>) => TReturn,
  ) => new RelativelySimpleFunction(name, schema, returnTypeSchema, fn);
}
