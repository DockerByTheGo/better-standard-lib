import { Or } from "@better-standard-internal/types";
import { Optionable } from "../option";
import { IMapable } from "../map";
import { s, T } from "vitest/dist/reporters-5f784f42";
import { Mapable } from "../map/main";
import { map } from "@better-standard-internal/functions/map";

class ResutError<TName extends string> {
    constructor(public name: TName, public message: string) {

    }

    public readonly ok = false as const

    throw() {
        throw new Error(`${this.name}: ${this.message}`);
    }
}


// remodel to use OneOf 

class ResultSuccess<TSchema> {
    public readonly ok = true as const
    constructor(public readonly data: TSchema) { }
}

export interface IResultable<
    TSuccess,
    IErrors extends Record<string, ResutError<string>>
> extends IMapable<IResultable<TSuccess, IErrors>> {
    isOk(): this is ResultSuccess<TSuccess>;
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
    unwrapSuccess(): IMapable<TSuccess>;
}




class BasicResult<
    TSuccess extends ResultSuccess<unknown>,
    TErrors extends Record<string, ResutError<string>>
>

    implements IResultable<TSuccess, TErrors> {

    constructor(
        private value: Or<[
            TSuccess,
            TErrors[keyof TErrors]
        ]>
    ) {
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

    isOk(): this is { ok: true; data: TSuccess } {
        return "ok" in this.value && this.value.ok === true;
    }

    isError(): this is TErrors[keyof TErrors] {
        return "message" in this.value;
    }


    unwrapSuccess(msg: Optionable<string> = Optionable.none()): IMapable<TSuccess> {
        if (this.isOk()) {
            return new Mapable(this.value.data);
        }
        throw new Error(msg.try({
            ifNone: () => "Cannot unwrap success from an error result",
            ifNotNone: v => v
        }));
    }

}


const noInternetError = new ResutError("NoInternetError", "No internet connection available");



// explicit signatures
namespace p {
    const networkError = new ResutError("NetworkError", "Failed to connect to server"); // idk it would be a problem to make it sso that all instances are the same?
    function SendHttpRequest(): IResultable<
        { status: number, body: string }, {
            networkError: typeof networkError
        }> {


        return new BasicResult({ ok: true, data: { status: 200, body: "Hello, world!" } });
    }



    SendHttpRequest().try({
        ifSuccess: v => v.body,
        ifError: {
            networkError: v => { }
        }
    })
}
// -----
// implicit sigs 
namespace f {
    function SendHttpReq() {
        if (Math.random() > 0.5) return new BasicResult(new ResutError("NetworkError", "Failed to connect to server"));
        return new BasicResult({ ok: true, data: { status: 200, body: "Hello, world!" } } as const);
    }

    export const result = SendHttpReq()
    //  damn this didnt work out well 
}
// ----


// another try at achieving this 
function SendHttpReq2() {
    if (Math.random() > 0.5) return { networkError: (new ResutError("NetworkError", "Failed to connect to server")) };
    return ({ ok: true, data: { status: 200, body: "Hello, world!" } });
}

new BasicResult(SendHttpReq2()).try({
    ifError: {

    },
    ifSuccess: v => v.body
})



// ok getting close
namespace g {
    function buildError<TName extends string>(name: TName) {
        return class CustomError extends ResutError<TName> {
            constructor(message: string) {
                super(name, message)
            }
        }
    }


    const networkError = buildError("networkError")

    function buildSuccess<TSuccess>(schema: TSuccess) {
        return class CustomSuccess extends ResultSuccess<TSuccess> {
            constructor(val: TSuccess) {
                super(val)
            }
        }
    }

    const httpResposeBuilder = buildSuccess({ status: 1, body: {} })


    function buildResult<
        TSuccess extends ResultSuccess<unknown>,
        TErrors extends Record<string, ResutError<string>>
    >(
        successSchema: TSuccess,
        errs: TErrors
    ) {
        return class CustomResult extends BasicResult<TSuccess, TErrors> {
            constructor(val: Or<[TSuccess, TErrors[keyof TErrors]]>) {
                super(val);
            }
        }
    }

    const httpReqResult = buildResult(new httpResposeBuilder({}), { networkError: new networkError("") })


    new httpReqResult({}).try({
        ifSuccess: arg => arg.data,
        ifError: {
            "networkError": err => { }
        }
    })

    const SendHttpReq3 = () => (Math.random() > 0.5) ? new networkError("") : new httpResposeBuilder({ status: 200, body: {} }) 

    new httpReqResult(SendHttpReq3()).try({
        ifError: {
            "networkError": e => e.throw()
        },
        ifSuccess: res => res.data
    })

}