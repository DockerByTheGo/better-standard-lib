
import { TypeMarker } from "@better-standard-internal/data_structures";
import { OneOf } from "@better-standard-internal/data_structures/functional-patterns/one-of";

export class StringValue extends TypeMarker<"string"> {
  constructor() {
    super("string");
  }
}


export class NumberValue extends TypeMarker<"number"> {
  constructor() {
    super("number");
  }
}

export class NullValue extends TypeMarker<"null"> {
  constructor() {
    super("null");
  }
}

export class Arguments extends  OneOf([StringValue, NumberValue, NullValue])<unknown> {

}