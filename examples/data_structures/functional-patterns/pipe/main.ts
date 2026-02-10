
import { Pipe } from "../../../../../../src/data_structures/functional-patterns/pipe/main";

// --- Pipe Example ---
console.log("--- Pipe Example ---");

// The `Pipe` class allows chaining of functions that perform side effects.
// The original value inside the pipe is not modified.

const myPipe = new Pipe({ value: 10, name: "myPipe" });

console.log("Chaining side effects:");
myPipe
    .pipe(v => {
        console.log(`Current value: ${v.value}`);
        // This calculation does not affect the value in the pipe
        const newValue = v.value + 1; 
        console.log(`Calculated new value (but not stored): ${newValue}`);
    })
    .pipe(v => {
        console.log(`Value is still: ${v.value}`);
        v.value = 20; // We can mutate the object, and it will be reflected in the next pipe
        console.log(`Mutated value to: ${v.value}`);
    })
    .pipe(v => {
        console.log(`Final value in pipe: ${v.value}`);
    });

// If the value is a primitive, it cannot be mutated.
console.log("\n--- Pipe with a primitive value ---");

const primitivePipe = new Pipe(5);
primitivePipe.pipe(v => {
    console.log(`Primitive value: ${v}`);
    const newValue = v + 5;
    console.log(`Calculated new value: ${newValue}`);
    // Reassigning `v` here has no effect outside this function
    v = newValue; 
}).pipe(v => {
    console.log(`Primitive value is unchanged: ${v}`);
});
