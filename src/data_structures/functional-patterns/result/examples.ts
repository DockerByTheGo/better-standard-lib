// import type { Or } from "@better-standard-internal/types";

// import type { IResultable } from "./types/IResult";

// import { buildError, ResultError } from "./error";
// import { BasicResult } from "./implementations/Basic";
// import { buildSuccess, ResultSuccess } from "./success/implementations/Basic";
// import { GetShapeFromSchema } from "@better-standard-internal/others/validator/schema/utils";
// import { Schema } from "@better-standard-internal/others/validator/schema/types";
// import { Arguments } from "@better-standard-internal/others/validator/schema";

// // remodel to use OneOf


// // explicit signatures
// namespace p {
//   const networkError = new ResultError("NetworkError", "Failed to connect to server"); // idk it would be a problem to make it sso that all instances are the same?
//   function SendHttpRequest(): IResultable<
//     { ok: true, data: { status: number; body: string } },
//     {
//       networkError: typeof networkError;
//     }
//   > {
//     return new BasicResult({ ok: true, data: { status: 200, body: "Hello, world!" } });
//   }

//   SendHttpRequest().try({
//     ifSuccess: v => v.body,
//     ifError: {
//       networkError: (v) => { },
//     },
//   });
// }
// // -----
// const networkError = buildError("networkError");
// const corsError = buildError("corsError")
// const httpResposeBuilder = buildSuccess({ status: { type: Arguments.otherCons("string") }, body: { type: Arguments.otherCons("string") } });
// new httpResposeBuilder({status: 4, body: 3})

// const httpReqResult = buildResult(httpResposeBuilder, { networkError, corsError });

// class httpReqResultClass extends httpReqResult.class {}

// httpReqResult.class.cons.success.fromSuccess(new ResultSuccess({ body: {}, status: 3 })).try({
//   ifSuccess: arg => arg.data,
//   ifError: {
//     networkError: (err) => { },
//   },
// });

// const f = httpReqResult.class.cons.errors.definite.networkError("host is unreachable");
// httpReqResult.class.cons.errors.from("networkError", "");

// // httpReqResult.constructors.errors.networkError("l");

// function SendHttpReq3 (): httpReqResultClass  {
//   return  (Math.random() > 0.5) ? httpReqResult.class.cons.errors.from("corsError", "d") : httpReqResult.class.cons.success.raw({ status: 200, body: 4 }) }


//   SendHttpReq3()