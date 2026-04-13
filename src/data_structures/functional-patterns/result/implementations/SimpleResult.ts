import { panic } from "@better-standard-internal/functions/panic/default";
import type { URecord } from "@better-standard-internal/types/UnknownRecord";
import { IResultable } from "../types";
import { IResultSucess } from "../success";
import { IResultError } from "../error";

export type SimpleResultObject<TSuccess extends URecord, TError extends string = string> =
    | { data: TSuccess }
    | { error: TError };

export class SimpleResult<
    TSuccess extends URecord,
    TError extends string
> implements IResultable<
    IResultSucess<TSuccess>,
    { ["error"]: IResultError<TError> }
> {
    constructor(public readonly v: SimpleResultObject<TSuccess, TError>) { }

    static Success<TSuccess extends URecord>(data: TSuccess): SimpleResult<TSuccess, never> {
        return new SimpleResult({ data });
    }

    static Error<TError extends string>(error: TError): SimpleResult<never, TError> {
        return new SimpleResult({ error });
    }

    static fromObject<TSuccess extends URecord, TError extends string>(
        resultObject: SimpleResultObject<TSuccess, TError>,
    ): SimpleResult<TSuccess, TError> {
        return new SimpleResult(resultObject);
    }

    unpack(): TSuccess {
        if ("data" in this.v) {
            return this.v.data;
        }

        panic(this.v.error);
    }

    isOk(): this is { readonly v: { data: TSuccess } } {
        return "data" in this.v;
    }

    isError(): this is { readonly v: { error: TError } } {
        return "error" in this.v;
    }
}
