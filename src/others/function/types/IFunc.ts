import {z} from "zod/v4";
export type IFunc<
  TName extends string,
  TArgs extends z.ZodObject,
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
