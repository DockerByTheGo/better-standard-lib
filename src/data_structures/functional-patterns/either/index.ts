type EitherValue = {
  v: "left" | "right";
};

export class Either<L, R> {
  constructor(private v: L | R) {}

  if(config: {
    left: (v: L) => void;
    right: (v: R) => void;
  }) {}

  isLeft(): this is { v: L } {
    return (this.v as EitherValue).v === "left";
  }

  isRight(): this is { v: R } {
    return (this.v as EitherValue).v === "right";
  }
}

// the isRight is useful in context in such you do not want to ebter new scope while writing minimal code yourself

/*
For example you want to return from a func early if it is left

function main{
    const result = new Either<string, number>().if({
        left: (v) => {
            console.error("Error:", v);
            return;
        },
        right: (v) => {
            console.log("Success:", v);
            return v;
        }
    });

here this will create its own subscope and will have to use an intermidiary in the form of result in which we will hve to perform future checks

However with isLeft and isRight we can do this in a single scope without creating an intermediate variable

function main() {
    const result = new Either<string, number>();

    // Perform some operations that might set the value to left or right
if (result.isLeft()) {
        console.error("Error:", result.v);
        return;
    }
}
*/
