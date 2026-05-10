import type { Constructor } from "@better-standard-internal/types";

export class TypeMarker<T extends string> {
  constructor(public readonly type: T) {

  }

  getType(): T {
    return this.type;
  }

  TGetType: T;
}

export type ITypeMarked<T extends string> = {
  typeInfo: TypeMarker<T>;
};


export function createTypeMarked<TName extends string>(name :TName): {[name in TName]: Constructor<TypeMarker<TName>>} {
  return {
    [name]: class extends TypeMarker<TName> {
      constructor(){
        super(name)
      }
    }
  }
}


const {koko} = createTypeMarked("koko") // so that we do not have to type twice 