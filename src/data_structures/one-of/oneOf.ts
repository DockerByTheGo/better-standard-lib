import { KeyOfOnlyStringKeys, URecord } from "@better-standard-internal/type-level-functions";
import { TypeMarker } from "../type-marker";



export function OneOf<T extends TypeMarker<string>[]>(
    schema: T
  ) {
    // Build the mapping type:
    type Mapping = {
    [K in T[number]['type']]: Extract<T[number], { type: K }>
}

    return class NewOneOf  extends TypeMarker<"OneOf"> {
      constructor(private value: T[number]) {
        super("OneOf")
      }

    defineHandlers(handler: {[name in  KeyOfOnlyStringKeys<Mapping> as `if${name}`]?: (v: Mapping[name]) => void}){
        return handler[`if${this.value.type}`](this.value)
    }


    is<Type extends keyof T>(v: Type){
        return this.value.type === v
    }


    };

}

class Fish extends TypeMarker<'Fish'> {
  constructor(public o: number = 1){super("Fish")}    
  public swim(){
    
  }
}

class Bird extends TypeMarker<'Bird'> {
  constructor(public k: string = ""){super("Bird")}    
  public fly(){
    
  }
}


class animal extends OneOf([new Fish(), new Bird()]) {
    
}

const Animal = OneOf([new Fish(), new Bird()])

new Animal(new Fish()).defineHandlers({
  ifFish: v => {
    v.swim()
  },
  ifBird: v => {
    v.fly()
  }
})

new animal(new Fish()).defineHandlers({
  ifFish: v => {
    v.swim()
  },
  ifBird: v => {
    v.fly()
  }
})