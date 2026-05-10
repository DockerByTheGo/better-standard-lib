import { Mapable } from "../../../src/data_structures/functional-patterns/map/main";

// --- Mapable Example ---
console.log("--- Mapable Example ---");

// Create a Mapable instance
const myMapable = new Mapable(10);
console.log("Original raw value:", myMapable.raw);

// Use the map method to transform the value
const mapped = myMapable.map(v => v * 2);
console.log("Value after map(v => v * 2):", mapped.raw);

// The `valueOf` method also returns the raw value
console.log("Value from valueOf():", mapped.valueOf());

// Chaining map calls
const chainedMap = new Mapable("hello")
    .map(v => `${v  } world`)
    .map(v => v.toUpperCase());

console.log("\nChained map result:", chainedMap.raw);

// Using the static `new` method for creation
const fromStaticNew = Mapable.new(true)
    .map(v => !v);

console.log("From static new:", fromStaticNew.raw);
