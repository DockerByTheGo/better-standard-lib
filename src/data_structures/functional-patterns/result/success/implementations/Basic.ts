import type { IResultSucess } from "../types";

export class ResultSuccess<TSchema> implements IResultSucess<TSchema> {
  public readonly ok = true as const;
  constructor(public readonly data: TSchema) { }
  static new = <TSchema>(v: TSchema) => new ResultSuccess(v);
}
