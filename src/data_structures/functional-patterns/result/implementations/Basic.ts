import type { Or } from "@better-standard-internal/types";

import type { IResultError } from "../error";
import type { IResultSucess } from "../success";
import type { IResultable } from "../types/IResult";

import { Mapable } from "../../map/main";
import { Optionable } from "../../option";
import { ResultError } from "../error";
import { ResultSuccess } from "../success/implementations/Basic";
import { TypeError } from "@better-standard-internal/type-level-functions/error";
import { map } from "@better-standard-internal/functions";
import type { UnionToIntersection } from "@better-standard-internal/type-level-functions";


export class BasicResult<
  TSuccess extends ResultSuccess<unknown>,
  TErrors extends Record<string, ResultError<string>>,
>

  implements IResultable<TSuccess, TErrors> {
  constructor(
    public readonly value: Or<[
      TSuccess,
      TErrors[keyof TErrors],
    ]>,
  ) {
  }

  unpack(): TSuccess["data"] {
    if (this.isError()) {
      throw new Error(this.value.message);
    }

    return this.value.data;
  }

  static fromThrow<V extends () => any>(v: V) {
    try{
      return BasicResult.RawSuccess( v())
    }catch(e) {
      return BasicResult.RawError("", e.message)
    }
  }

  static fromUnion<T>(b: T): BasicResult<
    T extends ResultSuccess<infer U> ? ResultSuccess<U> : never,
    UnionToIntersection<T extends ResultError<infer N> ? Record<N, ResultError<N>> : {}>
  > {
    return new BasicResult(b)
  }

  try<
    TErrorConfig extends { [K in keyof TErrors]: (v: TErrors[K]) => unknown; },
    TSuccessHandler extends (arg: TSuccess) => unknown,
  >(conf: {
    ifError: TErrorConfig;
    ifSuccess: TSuccessHandler;
  },
  ): Mapable<ReturnType<TErrorConfig[keyof TErrorConfig]> | ReturnType<TSuccessHandler>> {

    return map(this.isOk() ? conf.ifSuccess(this.value.data) : conf.ifError[this.value.name](this.value), Mapable.new)
  }

  ifError<TConfig extends { [K in keyof TErrors]: (v: TErrors[K]) => unknown; }>(handlers: TConfig): Optionable<ReturnType<TConfig[keyof TConfig]>> {
    if (this.isError()) {
      return  Optionable.some(handlers[this.value]);
    }

    return Optionable.none();
  }

  ifSuccess<R>(fn: (v: TSuccess) => R): Optionable<R> {
    if (this.isOk()) {
      return Optionable.some(fn(this.value.data));
    }
  }

  map<F>(func: (v: IResultable<TSuccess, TErrors>) => F): IMapable<F> {
    return new Mapable(func(this));
  }

  isOk(): this is TSuccess {
    return "ok" in this.value && this.value.ok === true;
  }

  isError(): this is TErrors[keyof TErrors] {
    return "message" in this.value;
  }

  // you just provide the schema no need to provide a ResultResponse object
  static RawSuccess = <TSchema>(v: TSchema) => new BasicResult(ResultSuccess.new(v));

  // creates an error result , e.g. an error wrapped in a result object, this is useful for when you want to create an error result without having to define a new error class
  static RawError = <TName extends string>(name: TName, msg: string) => new BasicResult(new ResultError(name, msg));

  static Error = <T extends ResultError<string>>(v: T) => new BasicResult<{}, { [x in T["TGetName"]]: T }>(v);

  static Succes = <T extends IResultSucess<unknown>>(v: T) => new BasicResult<T, {}>(v);
}

export class BasicResultBuilder<TSucess = null, TErrors = {}> {
  constructor(private success: TSucess = {}, private errors: TErrors = {}) { }
  addError<T extends ResultError<string>>(): T["name"] extends keyof TErrors ? TypeError<"property already defined", "error with this name has already been added"> : BasicResultBuilder<T, TErrors & { [name in T["name"]]: T }> {
    return
  }

  addResult<T extends ResultSuccess<unknown>>(): TSucess extends null ? BasicResultBuilder<T, TErrors> : TypeError<"property already defined", "resut has been added already"> {
    return
  }
}


export function mapResult<
TFunc extends (...arg: any) => IResultError<any> | IResultSucess<any>,
TReturn = ReturnType<TFunc>>(v: TFunc): (v: Parameters<TFunc>[0]) => BasicResult<
    TReturn extends ResultSuccess<infer U> ? ResultSuccess<U> : never,
    UnionToIntersection<TReturn extends ResultError<infer N> ? Record<N, ResultError<N>> : {}>
  > {
  return (args) => BasicResult.fromUnion(v(args))
}


export function buildResult<
  TSuccessData,
  TErrorNames extends string,
>(
  successClass: new (data: TSuccessData) => ResultSuccess<TSuccessData>,
  errorClasses: Record<TErrorNames, new (msg: string) => ResultError<TErrorNames>>,
) {
  const errorConstructors: { [ErrorName in keyof typeof errorClasses]: (msg: string) => InstanceType<typeof errorClasses[ErrorName]> } = {};

  const constructors = {
    errors: { ...errorConstructors },
  };

  return {
    class: class CustomResult extends BasicResult<ResultSuccess<TSuccessData>, Record<TErrorNames, ResultError<TErrorNames>>> {
      constructor(val: Or<[ResultSuccess<TSuccessData>, ResultError<TErrorNames>]>) {
        super(val);
      }

      static cons = {
        success: {
          fromSuccess: (v: ResultSuccess<TSuccessData>) => new CustomResult(v),
          raw: (v: TSuccessData) => new CustomResult(new successClass(v)),
        },
        errors: {
          from(v: TErrorNames, msg: string) {
            return new CustomResult(new errorClasses[v](msg));
          },
          definite: {
            ...Object
              .entries(errorClasses)
              .reduce((prev, [errorName, ErrorClass]) => {
                prev[errorName as TErrorNames] = (msg: string) => new ErrorClass(msg);
                return prev;
              }, {} as { [K in TErrorNames]: (msg: string) => ResultError<TErrorNames> }),
          },
        },
        new: (v: ResultSuccess<TSuccessData> | ResultError<TErrorNames>) => new CustomResult(v),
      };
    },
    constructors,
  };
}


