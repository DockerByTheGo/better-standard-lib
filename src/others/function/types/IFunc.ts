import { Schema } from "@better-standard-internal/others/validator";
import type { URecord } from "@better-standard-internal/type-level-functions";

export type IFunc<
  TName extends string,
  TArgs extends Schema,
  TReturnType,
  TFunction = (args: TArgs) => TReturnType,
> = {
  name: TName;
  argsSchema: TArgs;
  returnTypeSchema: TReturnType;
  execute: (args: TArgs) => TReturnType;
  TGetName: TName;
  TGetArgs: TArgs;
  TGetFunction: TFunction;
  TGetReturnType: TReturnType;
};
