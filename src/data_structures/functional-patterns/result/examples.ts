import type { Or } from "@better-standard-internal/types";

import type { IResultable } from "./types/IResult";

import { ResultError } from "./error";
import { BasicResult } from "./implementations/Basic";
import { ResultSuccess } from "./success/implementations/Basic";
import { Schema } from "@better-standard-internal/others";

// remodel to use OneOf

const noInternetError = new ResultError("NoInternetError", "No internet connection available");

// explicit signatures
namespace p {
  const networkError = new ResultError("NetworkError", "Failed to connect to server"); // idk it would be a problem to make it sso that all instances are the same?
  function SendHttpRequest(): IResultable<
    { status: number; body: string },
    {
      networkError: typeof networkError;
    }
  > {
    return new BasicResult({ ok: true, data: { status: 200, body: "Hello, world!" } });
  }

  SendHttpRequest().try({
    ifSuccess: v => v.body,
    ifError: {
      networkError: (v) => { },
    },
  });
}
// -----
export function buildError<TName extends string>(name: TName) {
  return class CustomError extends ResultError<TName> {
    constructor(message: string) {
      super(name, message);
    }
  };
}

export function buildErrorReturningObject<TName extends string>(name: TName) {
  return class CustomError extends ResultError<TName> {
    constructor(message: string) {
      super(name, message);
    }
  };
}

const networkError = buildError("networkError");

function buildSuccess<TSuccess extends Schema>(schema: TSuccess) {
  return class CustomSuccess extends ResultSuccess<TSuccess> {
    constructor(val: TSuccess) {
      super(val);
    }
  };
}

const httpResposeBuilder = buildSuccess({ status: , body: {} });

export function buildResult<
  TSuccess extends ResultSuccess<unknown>,
  TErrors extends Record<string, ResultError<string>>,
>(
  successSchema: TSuccess,
  errs: TErrors,
) {
  const errsConstrcutors: { [ErrorName in keyof TErrors]: (msg: string) => TErrors[ErrorName] } = {};

  const constructors = {
    errors: { ...errsConstrcutors },
  };

  return {
    class: class CustomResult extends BasicResult<TSuccess, TErrors> {
      constructor(val: Or<[TSuccess, TErrors[keyof TErrors]]>) {
        super(val);
      }

      static cons = {
        success: {
          fromSuccess: (v: TSuccess) => new CustomResult(v),
          raw: (v: TSuccess["data"]) => new CustomResult(new ResultSuccess(v)),
        },
        errors: {
          from(v: TErrors[keyof TErrors]["name"], msg: string) {
            return new CustomResult(v);
          },
          definite: {
            ...Object
              .entries(errs)
              .reduce((prev, [errorName, error]) => {
                return prev[errorName] = (msg: string) => error;
              }, {}),
          } as { [ErrorName in keyof TErrors]: (msg: string) => TErrors[ErrorName] },
        },
        new: (v: TSuccess | TErrors[keyof TErrors]) => new CustomResult(v),
      };
    },
    constructors,
  };
}




const httpReqResult = buildResult(new httpResposeBuilder({}), { networkError: new networkError("") });

httpReqResult.class.cons.success.fromSuccess(new ResultSuccess({ body: {}, status: 3 })).try({
  ifSuccess: arg => arg.data,
  ifError: {
    networkError: (err) => { },
  },
});

const f = httpReqResult.class.cons.errors.definite.networkError("host is unreachable");
httpReqResult.class.cons.errors.from("networkError", "");

httpReqResult.constructors.errors.networkError("l");

const SendHttpReq3 = () => (Math.random() > 0.5) ? new networkError("") : new httpResposeBuilder({ status: 200, body: {} });

new httpReqResult.class(SendHttpReq3()).try({
  ifError: {
    networkError: e => e.throw(),
  },
  ifSuccess: res => res.data,
});
