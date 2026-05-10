import { catchF, composeCatch, TryCatch } from "../../index";

console.log("--- error handling helpers ---");

const parsedPort = TryCatch(
  () => JSON.parse("3000"),
  value => `Parsed successfully: ${value}`,
  error => `Parsing failed: ${error.message}`,
);

console.log(parsedPort);

const fallbackValue = catchF(
  () => JSON.parse("{ broken json }"),
  error => `Recovered from error: ${error.message}`,
);

console.log(fallbackValue);

const safeDivide = composeCatch(
  ({ a, b }: { a: number; b: number }) => {
    if (b === 0) {
      throw new Error("division by zero");
    }
    return a / b;
  },
  error => `Could not divide: ${error.message}`,
);

console.log("safeDivide(8, 2):", safeDivide({ a: 8, b: 2 }));
console.log("safeDivide(8, 0):", safeDivide({ a: 8, b: 0 }));
