
import { Either } from "../../../../src/data_structures/functional-patterns/either";

// --- Either Example ---
console.log("--- Either Example ---");

// The `Either` class in this file has a peculiar implementation for `isLeft` and `isRight`.
// It expects the wrapped value to have a property `v` which is either "left" or "right".
// Let's define some types that satisfy this requirement.

type Left<T> = {
    v: "left";
    value: T;
};

type Right<T> = {
    v: "right";
    value: T;
};

function createLeft<T>(value: T): Left<T> {
    return { v: "left", value };
}

function createRight<T>(value: T): Right<T> {
    return { v: "right", value };
}


function processValue(value: Left<string> | Right<number>) {
    const either = new Either(value);

    // The type guards `isLeft` and `isRight` can be used to narrow the type of `either.v`
    if (either.isLeft()) {
        // Inside this block, `either.v` is known to be of type `Left<string>`
        console.log(`It's a Left value: ${either.v.value}`);
        return; // Early return for the error case
    }

    // If it's not Left, it must be Right.
    // Inside this block, `either.v` is known to be of type `Right<number>`
    console.log(`It's a Right value: ${either.v.value}`);
    // Continue with the success case
    const result = either.v.value * 2;
    console.log(`Result of processing: ${result}`);
}

console.log("Processing a Right value:");
const rightValue = createRight(10);
processValue(rightValue);

console.log("\nProcessing a Left value:");
const leftValue = createLeft("An error occurred");
processValue(leftValue);

// Note: The `if` method on the `Either` class is not implemented in the source file.
// If it were, it might be used like this:
/*
either.if({
    left: (v) => console.log(`Handled Left: ${v.value}`),
    right: (v) => console.log(`Handled Right: ${v.value}`),
});
*/
