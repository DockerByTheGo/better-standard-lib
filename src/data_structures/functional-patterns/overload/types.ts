import type { ZodObject, ZodRawShape } from "zod";
import type z from "zod";

export type ZodRawObject = ZodObject<ZodRawShape>;
export type OverloadsBase = Record<string, ZodRawObject>;

export type OverloadsImplBase<T extends OverloadsBase> = {
  [Overload in keyof T]: (v: z.infer<T[Overload]>) => unknown
};

export type OverloadsDefault = OverloadsImplBase<OverloadsBase>;
