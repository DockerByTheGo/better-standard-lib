import type { IMapable } from "../../map";
import type { Optionable } from "../../option";
import { ResultError } from "../error";
import type { IResultSucess } from "../success";

export type IResultable<
  TSuccess extends IResultSucess<unknown>,
  IErrors extends Record<string, ResultError<string>>,
> = {
  isOk: () => this is TSuccess;
  isError: () => this is IErrors[keyof IErrors];
  ifError: <TConfig extends { [K in keyof IErrors]: (v: IErrors[K]) => unknown }>(handlers: TConfig) => Optionable<ReturnType<TConfig[keyof TConfig]>>;
  ifSuccess: <R>(fn: (v: TSuccess) => R) => Optionable<R>;
  try: <
    TErrorConfig extends { [K in keyof IErrors]: (arg: IErrors[K]) => unknown },
    TSuccessHandler extends (arg: TSuccess) => unknown,
  >(
    conf: {
      ifError: TErrorConfig;
      ifSuccess: TSuccessHandler;
    },
  ) => ReturnType<TErrorConfig[keyof TErrorConfig]> | ReturnType<TSuccessHandler>;
  unpack: () => TSuccess["data"];
}



export type IResultableDefault = IResultable<
  IResultSucess<unknown>,
  Record<string, ResultError<string>>
>