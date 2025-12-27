import type { IResultError } from "@better-standard-internal/data_structures/functional-patterns/result/error";
import type { IResultSucess } from "@better-standard-internal/data_structures/functional-patterns/result/success";
import type { IResultable } from "@better-standard-internal/data_structures/functional-patterns/result/types/IResult";

export type IValidator<TSchema> = {

  validateWhichThrows: (v: TSchema) => TSchema;

  validate: (v: TSchema) => IResultable<IResultSucess<TSchema>, { typeMismatch: IResultError<"typeMismatch"> }>;
};
