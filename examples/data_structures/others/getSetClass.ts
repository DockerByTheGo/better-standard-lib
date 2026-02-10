
import { GetSet, Get } from "../../../../src/data_structures/others/getSetClass";

// --- GetSet Example ---
console.log("--- GetSet Example ---");

// Create a GetSet instance with logging callbacks
const myGetSet = new GetSet(10, 
    (v) => console.log(`Value is being accessed. Current value: ${v}`),
    (v) => console.log(`Value is being set to: ${v}`)
);

console.log("Initial value:", myGetSet.get());

myGetSet.set(20);
console.log("Value after set:", myGetSet.get());

// Using the value property
console.log("Accessing through .value property:", myGetSet.value);

// Using map
const mapped = myGetSet.map(v => v * 2);
console.log("Mapped value:", mapped.raw);

// Using simpleMap
const simpleMapped = myGetSet.simpleMap(v => `The value is ${v}`);
console.log("Simple mapped value:", simpleMapped);


// --- Get Example ---
console.log("\n--- Get Example ---");

const myGet = new Get("This value is read-only");
console.log("Value from Get:", myGet.v);

// myGet.v = "new value"; // This would cause a compilation error
