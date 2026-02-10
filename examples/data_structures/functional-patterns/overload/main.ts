import { FunctionOverload, OverloadBuilderWithCustomResolver } from "../../../../../../src/data_structures/functional-patterns/overload/main";
import { z } from "zod";

// --- FunctionOverload Example ---
console.log("--- FunctionOverload Example ---");

const personSchema = z.object({ name: z.string(), age: z.number() });
const animalSchema = z.object({ species: z.string(), legs: z.number() });

const myOverload = FunctionOverload.new(
    {
        person: personSchema,
        animal: animalSchema,
    },
    {
        person: (v) => `It's a person named ${v.name}, age ${v.age}.`,
        animal: (v) => `It's a ${v.species} with ${v.legs} legs.`,
    }
);

const person = { name: "John", age: 30 };
const animal = { species: "dog", legs: 4 };

console.log(myOverload.execute(person));
console.log(myOverload.execute(animal));

// The `raw` property gives you the executable function directly
const rawExecutor = myOverload.raw;
console.log(rawExecutor(person));


// --- OverloadBuilderWithCustomResolver Example ---
console.log("\n--- OverloadBuilderWithCustomResolver Example ---");

const builder = OverloadBuilderWithCustomResolver.new()
    .addOverload((v: string) => `String: ${v}`)
    .addOverload((v: number) => `Number: ${v}`)
    .addResolver((overloads, v) => {
        if (typeof v === "string") {
            // The overloads are in an array, in the order they were added.
            return overloads[0](v);
        } else if (typeof v === "number") {
            return overloads[1](v);
        }
        return "Unknown type";
    });

// The build method throws an error if a resolver is not defined.
// The return type of build() is not directly executable, it's wrapped in an ISimpleMapable
// which is not fully implemented in the source. We will call the function directly.
const builtOverload = builder.build();

// Due to the incomplete nature of ISimpleMapable, we cast to a function type
const executableBuiltOverload = builtOverload as (v: string | number) => string;

console.log(executableBuiltOverload("hello"));
console.log(executableBuiltOverload(123));


// The `overload` and `overloadWithCustomResolver` functions are not implemented in the source file,
// so they cannot be demonstrated.
