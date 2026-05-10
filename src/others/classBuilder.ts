import { URecord } from "@better-standard-internal/type-level-functions";
import type { TypeError } from "@better-standard-internal/type-level-functions/error";
import type { IFunc } from "./function";

export const visibilityTypes = ["public", "private"] as const;

export class ClassBuilder<T extends URecord> {
  constructor(public readonly properties: T) {}

  addProperty<TName extends string, TSchema extends "string" | "number" | URecord>(args: {
    name: TName;
    schema: TSchema;
    type?: (typeof visibilityTypes)[number];
  }): TName extends keyof T
    ? TypeError<"Property already exists", `${TName} is already used`>
    : ClassBuilder<T & { [name in TName]: TSchema }> {
    void args;
    throw new Error("ClassBuilder.addProperty is not implemented yet.");
  }

  addMethod<TName extends string, TSchema extends IFunc<TName, { cts: T }, any>>(args: {
    name: TName;
    func: TSchema;
  }): ClassBuilder<T> {
    void args;
    throw new Error("ClassBuilder.addMethod is not implemented yet.");
  }
}
