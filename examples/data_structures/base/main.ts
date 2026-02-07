import { BaseValue } from "../../../../index";

// --- BaseValue Example ---
console.log("--- BaseValue Example ---");

// Create a BaseValue
const myValue = new BaseValue(10);

console.log("Original raw value:", myValue.getRaw());

// Use map to transform the value
const mappedValue = myValue.map(v => v * 2);
console.log("Value after map(v => v * 2):", mappedValue.getRaw());

// Use tap to perform a side effect without changing the value
const tappedValue = mappedValue.tap(v => {
  console.log(`Side effect from tap: The current value is ${v}`);
});
console.log("Value after tap:", tappedValue.getRaw());

// Chain multiple operations
const finalValue = new BaseValue(5)
  .map(v => v + 5) // 10
  .tap(v => console.log(`After adding 5: ${v}`))
  .map(v => v.toString()) // "10"
  .tap(v => console.log(`After converting to string: ${v}`))
  .map(v => `The final result is ${v}`); // "The final result is 10"

console.log("\nChained operations result:", finalValue.getRaw());
