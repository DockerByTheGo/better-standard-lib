import type { Or } from "@better-standard-internal/types";

import type { IResultable } from "./types/IResult";

import { ResultError } from "./error";
import { BasicResult } from "./implementations/Basic";
import { ResultSuccess } from "./success/implementations/Basic";
import { GetShapeFromSchema } from "@better-standard-internal/others/validator/schema/utils";
import { Schema } from "@better-standard-internal/others/validator/schema/types";
import { Arguments } from "@better-standard-internal/others/validator/schema";

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

export function buildErrorReturningObject<TName extends string>(name: TName): { [K in TName]: new (message: string) => ResultError<TName> } {
  return {
    [name]: class CustomError extends ResultError<TName> {
      constructor(message: string) {
        super(name, message);
      }
    }
  } as { [K in TName]: new (message: string) => ResultError<TName> };
}

const networkError = buildError("networkError");

export function buildSuccess<TSuccess extends Schema>(schema: TSuccess) {
  return class CustomSuccess extends ResultSuccess<GetShapeFromSchema<TSuccess>> {
    constructor(val: GetShapeFromSchema<TSuccess>) {
      super(val);
    }
  };
}

const httpResposeBuilder = buildSuccess({ status: { type: Arguments.otherCons("string") }, body: { type: Arguments.otherCons("string") } });

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




const httpReqResult = buildResult(httpResposeBuilder, { networkError });

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
