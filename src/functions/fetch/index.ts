import { TryCatch } from "../error-handlng";
import { BasicResult, Optionable } from "@better-standard-internal/data_structures";
import z, { ZodType } from "zod";
import { map } from "../map";

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
                    : BasicResult.RawError("failed-validation", validationResult.error.message)
            )

        },
        err => BasicResult.RawError("generic error", err.message)
    )
}



betterFetch("google.com", { 201: z.object({ hi: z.string() }) }).then(v => v.try({
    ifError: {"": v => {
        v.throw()
    }},
    ifSuccess: v => {
        // do whatever 
    }
}))


try{
    fetch("google.com")}