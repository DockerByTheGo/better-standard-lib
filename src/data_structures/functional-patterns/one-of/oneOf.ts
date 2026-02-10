import type { KeyOfOnlyStringKeys } from "@better-standard-internal/type-level-functions";

import { TypeMarker } from "@better-standard-internal/data_structures/others/type-marker";
import { Constructor } from "@better-standard-internal/others/addStaticConstrucots/main";


class OneOfBase<
  T extends Constructor<TypeMarker<string>>[],
  TInstance = InstanceType<T[number]>,
  TMapping = {
    [K in TInstance["type"]]: Extract<TInstance, { type: K }>
  }

> extends TypeMarker<"OneOf"> {

  constructor(public readonly value: TInstance) {
    super("OneOf");
  }



  defineHandlers(handler: { [name in KeyOfOnlyStringKeys<TMapping> as `if${name}`]?: (v: TMapping[name]) => void }) {
    return handler[`if${this.value.type}`](this.value);
  }

  is<Type extends TInstance["type"]>(v: Type) {
    return this.value.type === v;
  }


    TGetTypes: T[number]
}


export function OneOf<T extends Constructor<TypeMarker<string>>[]>(
  schema: T,
) {
  type Instance = InstanceType<T[number]>;
  type Mapping = {
    [K in Instance["type"]]: Extract<Instance, { type: K }>
  };

  return class V<TInstance extends Instance> extends OneOfBase<T> {
    constructor(value: TInstance) {
      super(value)
    }


    static cons: { [K in KeyOfOnlyStringKeys<Mapping>]: Extract<T[number], Constructor<TypeMarker<K>>> } = schema.reduce((acc, ctor) => {
      const dummy = new (ctor as any)();
      acc[dummy.type] = ctor;
      return acc;
    }, {} as any);;

    static otherCons<K extends KeyOfOnlyStringKeys<Mapping>>(type: K, ...args: ConstructorParameters<Extract<T[number], Constructor<TypeMarker<K>>>>) {
      return new V(new (this.cons[type])(...args) as Mapping[K]);
    }


  };

}

class Fish<T extends number> extends TypeMarker<"Fish"> {
  constructor(public o: T) { super("Fish"); }
  public swim = () => console.log("swim");
}

class Bird<T extends string> extends TypeMarker<"Bird"> {
  constructor(public k: T) { super("Bird"); }
  public fly = () => console.log("fly");
}

class animal extends OneOf([Fish, Bird])<unknown> {
}



const bird = new animal.cons.Bird("d");
const g = animal.otherCons("Fish", 1)  // note that this loses type narrowing


const Animal = OneOf([Fish, Bird]);

new Animal(new Fish(1)).defineHandlers({
  ifFish: (v) => {
    v.swim();
  },
  ifBird: (v) => {
    v.fly();
  },
});

new animal(bird).defineHandlers({
  ifFish: (v) => {
    v.swim();
  },
  ifBird: (v) => {
    v.fly();
  },
});



function doThing(a: animal) {
  a.defineHandlers({
    ifBird: v => v.fly(),
    ifFish: v => v.swim()
  })
}

doThing(Animal.otherCons("Bird", "")) // note that this loses type narrowing 

function doThing2(a: animal["TGetTypes"]) {

}



function buildOneOfFunction<K extends OneOfBase<Constructor<TypeMarker<string>>[]>,T extends Constructor<K>>(v: T) {
  return {
    FromParent<V extends K>(v: V) {

    },
    fromChild<V extends K["TGetTypes"]>(v: V){}
  }
}



const h = buildOneOfFunction(animal)
h.FromParent(Animal.otherCons("Bird", ""))
h.fromChild()




export class Either<T extends (Constructor & {type: string})[]> {
  constructor()
}