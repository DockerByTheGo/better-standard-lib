import { IMapable } from "../../map";
import { Optionable } from "../../option";
import { ResutError } from "../error";
import { IResultSucess } from "../success";
import { ResultSuccess } from "../success/implementations/Basic";

export interface IResultable<
    TSuccess extends IResultSucess<unknown>,
    IErrors extends Record<string, ResutError<string>>
> extends IMapable<IResultable<TSuccess, IErrors>> {
    isOk(): this is TSuccess;
    isError(): this is IErrors[keyof IErrors];
    ifError<TConfig extends { [K in keyof IErrors]: (v: IErrors[K]) => unknown }>(handlers: TConfig): Optionable<ReturnType<TConfig[keyof TConfig]>>;
    ifSuccess<R>(fn: (v: TSuccess) => R): Optionable<R>;
    try<
        TErrorConfig extends { [K in keyof IErrors]: (arg: IErrors[K]) => unknown },
        TSuccessHandler extends (arg: TSuccess) => unknown
    >(
        conf: {
            ifError: TErrorConfig,
            ifSuccess: TSuccessHandler
        }
    ): ReturnType<TErrorConfig[keyof TErrorConfig]> | ReturnType<TSuccessHandler>;
    unpack(): TSuccess["data"]
}



