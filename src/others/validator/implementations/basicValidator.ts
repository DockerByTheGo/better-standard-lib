import { IResultError, ResutError } from "@better-standard-internal/data_structures/functional-patterns/result/error";
import { IResultable } from "@better-standard-internal/data_structures/functional-patterns/result/types/IResult";
import { IValidator } from "../types/IValidator";
import { ifNotNone, Try } from "@better-standard-internal/data_structures/functional-patterns/option";
import { OneOf } from "@better-standard-internal/data_structures/functional-patterns/one-of";
import { TypeMarker } from "@better-standard-internal/data_structures";
import { BasicResult } from "@better-standard-internal/data_structures/functional-patterns/result/implementations/Basic";
import { IResultSucess } from "@better-standard-internal/data_structures/functional-patterns/result/success";


class StringValue extends TypeMarker<"string"> {
    constructor() {
        super("string")
    }
}

class V extends OneOf([new StringValue(), new TypeMarker("number" as const), new TypeMarker("null" as const)] as const) {

}
new V(new TypeMarker("null"))

export type Schema = {
    [x: string]: { type: V }
}


export type GetShapeFromSchema<T extends Schema> = {
    [K in keyof T]: T[K]["type"]
}

export class BasicValidator<TSchema extends Schema> implements IValidator<GetShapeFromSchema<TSchema>> {
    constructor(public readonly schema: TSchema) {}

    validateWhichThrows(v: GetShapeFromSchema<TSchema>): GetShapeFromSchema<TSchema> {
        return this.validate(v).unpack()
    }

    validate(valueToValidate: GetShapeFromSchema<TSchema>): IResultable<
        IResultSucess<GetShapeFromSchema<TSchema>>,
        { typeMismatch: IResultError<"typeMismatch">; }
    > {
        for (const [propertyName, schemaProp] of Object.entries(this.schema)) {
            const valueProp = valueToValidate[propertyName as keyof GetShapeFromSchema<TSchema>]
            let isNull = true
            ifNotNone(valueProp, () => isNull = false)
            const expectedType = schemaProp.type.getType()
            if (isNull) {
                if (expectedType !== "null") {
                    return BasicResult.Error(new ResutError("typeMismatch", `property ${propertyName} is null but should be of type ${expectedType}`))
                }
            } else {
                if (!valueProp.is(expectedType)) {
                    return BasicResult.Error(new ResutError("typeMismatch", `property ${propertyName} is of type ${valueProp.getType()} but should be of type ${expectedType}`))
                }
            }
        }
        return BasicResult.RawSuccess(valueToValidate)
    }
}