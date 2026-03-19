import { z } from "zod/v4";
import type { BasicResult } from "@better-standard-internal/data_structures/functional-patterns/result/implementations/Basic";
import type { ResultSuccess } from "@better-standard-internal/data_structures/functional-patterns/result/success/implementations/Basic";
import type { ResultError } from "@better-standard-internal/data_structures/functional-patterns/result/error";

export type IFunc<
  TName extends string,
  TArgs extends z.ZodObject,
  TReturnType,
  TFunction = (args: z.infer<TArgs>) => TReturnType,
> = {
  name: TName;
  argsSchema: TArgs;
  returnTypeSchema: TReturnType;
  execute: (args: unknown) => BasicResult<ResultSuccess<TReturnType>, any>;
  TGetName: TName;
  TGetArgs: TArgs;
  TGetFunction: TFunction;
  TGetReturnType: TReturnType;
};
