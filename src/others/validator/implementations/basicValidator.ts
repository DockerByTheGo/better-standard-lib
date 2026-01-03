import type { IResultError } from "@better-standard-internal/data_structures/functional-patterns/result/error";
import type { IResultSucess } from "@better-standard-internal/data_structures/functional-patterns/result/success";
import type { IResultable } from "@better-standard-internal/data_structures/functional-patterns/result/types/IResult";

import { TypeMarker } from "@better-standard-internal/data_structures";
import { OneOf } from "@better-standard-internal/data_structures/functional-patterns/one-of";
import { ifNotNone } from "@better-standard-internal/data_structures/functional-patterns/option";
import { ResultError } from "@better-standard-internal/data_structures/functional-patterns/result/error";
import { BasicResult } from "@better-standard-internal/data_structures/functional-patterns/result/implementations/Basic";

import type { IValidator } from "../types/IValidator";
import { buildError, buildErrorReturningObject, buildResult, buildSuccess } from "@better-standard-internal/data_structures/functional-patterns/result/examples";
import { FirstArg } from "@better-standard-internal/type-level-functions";
import { Arguments, GetShapeFromSchema, Schema } from "../schema";


const succcess = buildSuccess({value: {type: Arguments.otherCons("string")}})
const {propertyMismatch} = buildErrorReturningObject("propertyMismatch")


class validateResult extends  buildResult(succcess, {propertyMismatch}).class {} // to be used to replace the implicitely typed result of the validat function 

export class BasicValidator<TSchema extends Schema> implements IValidator<GetShapeFromSchema<TSchema>> {
  constructor(public readonly schema: TSchema) { }

  validateWhichThrows(v: GetShapeFromSchema<TSchema>): GetShapeFromSchema<TSchema> {
    return this.validate(v).unpack();
  }

  validate(valueToValidate: GetShapeFromSchema<TSchema>): BasicResult<
    IResultSucess<GetShapeFromSchema<TSchema>>,
    { typeMismatch: IResultError<"typeMismatch"> }
  > {
    for (const [propertyName, schemaProp] of Object.entries(this.schema)) {
      const valueProp = valueToValidate[propertyName as keyof GetShapeFromSchema<TSchema>];
      let isNull = true;
      ifNotNone(valueProp, () => isNull = false);
      const expectedType = schemaProp.type.getType();
      if (isNull) {
        if (expectedType !== "null") {
          return new BasicResult.Error(new ResultError("typeMismatch", `property ${propertyName} is null but should be of type ${expectedType}`));
        }
      }
      else {
        if (!valueProp.is(expectedType)) {
          return new BasicResult.Error(new ResultError("typeMismatch", `property ${propertyName} is of type ${valueProp.getType()} but should be of type ${expectedType}`));
        }
      }
    }
    return BasicResult.RawSuccess(valueToValidate);
  }
}


new BasicValidator({}).validate({}))