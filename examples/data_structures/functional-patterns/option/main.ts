import { ifNotNone, mapOptionable, Optionable, Try } from "../../../../index";

const someValue = Optionable.some("Hello, World!");
const noValue = Optionable.none<string>();

console.log("--- Optionable ---");
console.log("Unpacking 'someValue':", someValue.unpack().raw);
console.log("Length of someValue string:", someValue.map(v => v.length).unpack().raw);

console.log("\nUsing the 'try' method:");
console.log(someValue.try({
  ifNone: () => "Failure: The value was None",
  ifNotNone: value => `Success: ${value}`,
}).raw);
console.log(noValue.try({
  ifNone: () => "Failure: The value was None",
  ifNotNone: value => `Success: ${value}`,
}).raw);

console.log("\n--- Helper Functions ---");
console.log("Try with a value:", Try("hello", {
  ifNone: () => "Got nothing",
  ifNotNone: () => "Got a value",
}));
console.log("Try with null:", Try(null, {
  ifNone: () => "Got nothing",
  ifNotNone: () => "Got a value",
}));

console.log("mapOptionable from 'hello' is some:", mapOptionable("hello").isSome());
console.log("mapOptionable from null is none:", mapOptionable(null).isNone());

console.log("Using ifNotNone:");
ifNotNone("A string", value => {
  console.log(`The string is: '${value}'`);
});
