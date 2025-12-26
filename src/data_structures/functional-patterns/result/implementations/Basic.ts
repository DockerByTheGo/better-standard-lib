import { Or } from "@better-standard-internal/types";
import { IResultError, ResultError } from "../error";
import { ResultSuccess } from "../success/implementations/Basic";
import { IResultable } from "../types/IResult";
import { Optionable, OptionableString } from "../../option";
import { Mapable } from "../../map/main";
import { IResultSucess } from "../success";

export class BasicResult<
    TSuccess extends ResultSuccess<unknown>,
    TErrors extends Record<string, ResultError<string>>
>

    implements IResultable<TSuccess, TErrors> {

    constructor(
        private value: Or<[
            TSuccess,
            TErrors[keyof TErrors]
        ]>
    ) {
    }

    unpack(): TSuccess["data"] {
        if (this.isError()) {
            throw new Error(this.value.message)
        }

        return this.value.data
    }

    try<
        TErrorConfig extends { [K in keyof TErrors]: (v: TErrors[K]) => unknown; },
        TSuccessHandler extends (arg: TSuccess) => unknown
    >(conf: {
        ifError: TErrorConfig;
        ifSuccess: TSuccessHandler;
    }): ReturnType<TErrorConfig[keyof TErrorConfig]> | ReturnType<TSuccessHandler> {
        if (this.isOk()) {
            return conf.ifSuccess(this.value.data);
        }
        return conf.ifError(this.value);
    }

    ifError<TConfig extends { [K in keyof TErrors]: (v: TErrors[K]) => unknown; }>(handlers: TConfig): Optionable<ReturnType<TConfig[keyof TConfig]>> {
        if (this.isError()) {
            return new Optionable(handlers[this.value]);
        }


        return Optionable.none()
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
    static RawSuccess = <TSchema>(v: TSchema) => new BasicResult(ResultSuccess.new(v))

    // same ass success but for error 
    static RawError = <TName extends string>(name: TName, msg: string) => new ResultError(name, msg)

    static Error = <T extends ResultError<string>>(v: T) => new BasicResult<{}, {[x in T["TGetName"]]: T}>(v)

    static Succes = <T extends IResultSucess<unknown>>(v: T) => new BasicResult<T, {}>(v)

}





export class BasicResultBuilder<TSucess, TErrors> {
    addError<T extends IResultError<string>>() {}
}