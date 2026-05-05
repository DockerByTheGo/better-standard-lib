import type { IResultSucess } from "../types";

type Schema = unknown;
type GetShapeFromSchema<TSchema> = TSchema;

export class ResultSuccess<TSchema> implements IResultSucess<TSchema> {
  public readonly ok = true as const;
  constructor(public readonly data: TSchema) { }
  static new = <TSchema>(v: TSchema) => new ResultSuccess(v);
}


export function buildSuccess<TSuccess extends Schema>(schema: TSuccess) {
  return class CustomSuccess extends ResultSuccess<GetShapeFromSchema<TSuccess>> {
    constructor(val: GetShapeFromSchema<TSuccess>) {
      super(val);
    }
  };
}
