
import { TypeSafeClassBase } from "../../../../src/data_structures/others/contextsafetype";

// --- TypeSafeClassBase Example ---
console.log("--- TypeSafeClassBase Example ---");

// Create an instance with a string value
const stringWrapper = new TypeSafeClassBase("Hello, TypeScript!");
console.log("String wrapper value:", stringWrapper.getValue());

// Create an instance with a number value
const numberWrapper = new TypeSafeClassBase(42);
console.log("Number wrapper value:", numberWrapper.getValue());

// Create an instance with an object value
const objectWrapper = new TypeSafeClassBase({
  message: "This is an object",
  id: 123,
});
console.log("Object wrapper value:", objectWrapper.getValue());
