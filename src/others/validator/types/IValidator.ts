import { IResultError } from "@better-standard-internal/data_structures/functional-patterns/result/error"
import { IResultSucess } from "@better-standard-internal/data_structures/functional-patterns/result/success"
import { IResultable } from "@better-standard-internal/data_structures/functional-patterns/result/types/IResult"




export interface IValidator<TSchema> {
    
    
    validateWhichThrows(v: TSchema): TSchema 

    validate(v: TSchema): IResultable<IResultSucess<TSchema>,{typeMismatch: IResultError<"typeMismatch">}>
}