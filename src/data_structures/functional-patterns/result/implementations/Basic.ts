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

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

export class BasicResult<
  TSuccess extends ResultSuccess<unknown>,
  TErrors extends Record<string, ResultError<string>>,
>

  implements IResultable<TSuccess, TErrors> {
  constructor(
    private value: Or<[
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

  static fromUnion<T>(b: T): BasicResult<
    T extends ResultSuccess<infer U> ? ResultSuccess<U> : never,
    UnionToIntersection<T extends ResultError<infer N> ? Record<N, ResultError<N>> : {}>
  > {
    if ((b as any).ok) {
      return new BasicResult(b as any);
    } else {
      return new BasicResult(b as any);
    }
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
      return new Optionable(handlers[this.value]);
    }

    return Optionable.none();
  }

  ifSuccess<R>(fn: (v: TSuccess) => R): Optionable<R> {
    if (this.isOk()) {
      return new Optionable(fn(this.value.data));
    }
  }

  map<F>(func: (v: IResultable<TSuccess, TErrors>) => F): IMapable<F> {
    return new Mapable(func(this));
  }

  isOk(): this is TSuccess {
    return "ok" in this.value;
  }

  isError(): this is TErrors[keyof TErrors] {
    return "message" in this.value;
  }

  // you just provide the schema no need to provide a ResultResponse object
  static RawSuccess = <TSchema>(v: TSchema) => new BasicResult(ResultSuccess.new(v));

  // same ass success but for error
  static RawError = <TName extends string>(name: TName, msg: string) => new ResultError(name, msg);

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
