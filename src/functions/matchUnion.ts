
type UnionToIntersection<U> =
  (U extends any ? (x: U) => void : never) extends (x: infer I) => void
    ? I
    : never;



class Bae<Name extends string> {
  constructor(public readonly kind: Name) { }
}

class Circle extends Bae<"circle"> {
  constructor() {
    super("circle")
  }

  public radius: number = 0
}

class Rectangle extends Bae<"rect"> {
  constructor() {
    super("rect")
  }

  public wall = 9
}

type TupleToRecord<T extends Bae<any>[]> = {
    [P in T[number] as P['kind']]: P
};  

function match<T extends Bae<any>>(
  v: T,
  handler: { 
    [K in keyof TupleToRecord<UnionToTuple<T>>]: (arg: TupleToRecord<UnionToTuple<T>>[K]) => unknown
}
) {
  console.log("not implemented")
}

const a: Circle | Rectangle = null

match(
    a,
    {
        circle:v => v.radius,
        rect: v => v.wall
    }
)
