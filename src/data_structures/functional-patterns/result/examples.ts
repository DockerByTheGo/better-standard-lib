import { Or } from "@better-standard-internal/types";
import { Optionable } from "../option";
import { IMapable } from "../map";
import { s, T } from "vitest/dist/reporters-5f784f42";
import { Mapable } from "../map/main";
import { map } from "@better-standard-internal/functions/map";
import { ResutError } from "./error";
import { ResultSuccess } from "./success/implementations/Basic";
import { IResultable } from "./types/IResult";
import { BasicResult } from "./implementations/Basic";


// remodel to use OneOf 


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


        return {
            class : class CustomResult extends BasicResult<TSuccess, TErrors> {
            constructor(val: Or<[TSuccess, TErrors[keyof TErrors]]>) {
                super(val);
   
            }


        static errors : {[K in keyof TErrors]: (msg: string) => CustomResult} = map({}, v => Object.entries(([propertyName, propertyValue]) => {
            v[propertyName] = (msg: string) => new CustomResult(new ResutError<>(propertyName, msg))
        }))

            static cons = {
                success: (v: TSuccess) => new CustomResult(v),
                errors: 
            }
        }
    }
    }

    const httpReqResult = buildResult(new httpResposeBuilder({}), { networkError: new networkError("") })


    new httpReqResult().try({
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