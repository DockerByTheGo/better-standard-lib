import { URecord } from "@better-standard-internal/type-level-functions";
import { TypeError } from "@better-standard-internal/type-level-functions/error";
import { IFunc } from "./function";

export const visibilityTypes = ["public", "private"]  as const

export class ClassBuilder<T extends URecord>{
    constructor(public readonly properties: T){}
    addProperty<TName extends string, TSchema extends "string" | "number" | URecord>(args: {name: TName, schema: TSchema, type?: (typeof visibilityTypes)[number] }): TName extends keyof T 
    ? TypeError<"Property already exists", `${TName} is laready used`>
    : ClassBuilder<T & {[name in TName]: TSchema}>{
        return
    }
    addMethod<TName extends string, TSchema extends IFunc<TName,{cts: T}, any>(args: {name: TName, func: TSchema})
}


new ClassBuilder({}).addProperty({name: "name", schema: "string"}).addMethod({name: "addName", func: })