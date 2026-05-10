import { Get, GetSet } from "../../../index";

console.log("--- GetSet ---");

const state = new GetSet(
  10,
  value => console.log(`reading value: ${value}`),
  value => console.log(`setting value to: ${value}`),
);

console.log("Initial value:", state.get());
state.set(20);
console.log("Current value:", state.value);

const doubled = state.map(value => value * 2);
console.log("Mapped value:", doubled.raw);

const label = state.simpleMap(value => `Counter = ${value}`);
console.log("simpleMap result:", label);

console.log("\n--- Get ---");

const readonlyValue = new Get("read only");
console.log("Stored value:", readonlyValue.v);
