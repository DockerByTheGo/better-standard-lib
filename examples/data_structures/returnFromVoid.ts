import { ReturnFromSubfunction } from "../../../index";

// --- ReturnFromSubfunction Example ---
console.log("--- ReturnFromSubfunction Example ---");

// The intended use of this function seems to be to extract a value from a nested,
// void-returning function. However, the implementation has some issues.
// Let's demonstrate how it currently works and how one might expect it to work.

console.log("Demonstrating the current behavior:");

// The function is called with a callback that receives the initial value (which is null).
// The callback can modify the variable, but this modification is local to the callback's scope.
const result = ReturnFromSubfunction<number>((v) => {
  console.log(`Initial value received in callback: ${v}`); // v is null here
  let foundValue: number | null = null;

  [1, 3, 4, 5, 6].forEach((h) => {
    if (h === 5) {
      // This is how you would typically "extract" a value
      foundValue = h;
    }
  });

  // The function passed to ReturnFromSubfunction needs to return the value.
  return foundValue;
});

// The 'result' will be the value returned from the callback.
console.log(`Value returned by ReturnFromSubfunction: ${result}`);


console.log("\n--- A more common approach ---");
// A more common and clearer way to achieve a similar result without a helper function:

let foundValue: number | null = null;
[1, 3, 4, 5, 6].forEach((h) => {
    if (h === 5) {
        foundValue = h;
    }
});
console.log(`Value found using a standard approach: ${foundValue}`);

// It seems the implementation of ReturnFromSubfunction might not be complete
// or is intended for a very specific use case that is not immediately obvious.
// The provided example in the source file is also problematic as it does not
// correctly assign or return a value.
