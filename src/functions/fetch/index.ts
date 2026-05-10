import { BasicResult } from "@better-standard-internal/data_structures";
import z, { ZodType } from "zod";
import { map } from "../map";
import { TryCatch } from "../error-handling";

type FetchSchema = {
    [status: number]: ZodType
}

export async function betterFetch<TResponse extends FetchSchema>(url: string, schema: TResponse, options?: RequestInit) {
    return await TryCatch(
        () => fetch(url, options),
        async resPromise => {
            const res = await resPromise
            const jsonResponse = await res.json()
            return map(
                schema[res.status].safeParse(jsonResponse),
                validationResult => validationResult.success
                    ? BasicResult.RawSuccess(validationResult.data)
                    : new BasicResult.RawError("failed-validation", validationResult.error.message)
            )

        },
        err => new BasicResult.RawError("generic error", err.message)
    )
}
