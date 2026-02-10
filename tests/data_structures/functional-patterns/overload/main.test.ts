import { FunctionOverload, OverloadBuilderWithCustomResolver } from "../../../../../../src/data_structures/functional-patterns/overload/main";
import { z } from "zod";
import { expect, test } from "bun:test";

// --- FunctionOverload Tests ---

const personSchema = z.object({ type: z.literal("person"), name: z.string(), age: z.number() });
const animalSchema = z.object({ type: z.literal("animal"), species: z.string(), legs: z.number() });

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

test("FunctionOverload executes the correct handler for person", () => {
    const person = { type: "person", name: "John", age: 30 };
    const result = myOverload.execute(person);
    expect(result).toBe("It's a person named John, age 30.");
});

test("FunctionOverload executes the correct handler for animal", () => {
    const animal = { type: "animal", species: "dog", legs: 4 };
    const result = myOverload.execute(animal);
    expect(result).toBe("It's a dog with 4 legs.");
});

test("FunctionOverload returns null if no schema matches", () => {
    const result = myOverload.execute({ type: "other" } as any);
    expect(result).toBe(null);
  });

test("FunctionOverload raw returns a function that executes the correct handler", () => {
    const rawExecutor = myOverload.raw;
    const person = { type: "person", name: "Jane", age: 25 };
    const result = rawExecutor(person);
    expect(result).toBe("It's a person named Jane, age 25.");
});


// --- OverloadBuilderWithCustomResolver Tests ---

test("OverloadBuilderWithCustomResolver should build and execute the correct overload", () => {
    const builder = OverloadBuilderWithCustomResolver.new()
        .addOverload((v: string) => `String: ${v}`)
        .addOverload((v: number) => `Number: ${v}`)
        .addResolver((overloads, v) => {
            if (typeof v === "string") {
                return overloads[0](v);
            } else if (typeof v === "number") {
                return overloads[1](v);
            }
            return "Unknown type";
        });
    
    const builtOverload = builder.build() as (v: string | number) => string;

    expect(builtOverload("test")).toBe("String: test");
    expect(builtOverload(123)).toBe("Number: 123");
});

test("OverloadBuilderWithCustomResolver should throw an error if build is called without a resolver", () => {
    const builder = OverloadBuilderWithCustomResolver.new()
        .addOverload((v: string) => `String: ${v}`);

    expect(() => builder.build()).toThrow("resolver not defined");
});

test("OverloadBuilderWithCustomResolver should throw an error if a resolver is added twice", () => {
    const builder = OverloadBuilderWithCustomResolver.new()
        .addOverload((v: string) => `String: ${v}`)
        .addResolver((overloads, v) => overloads[0](v));

    expect(() => builder.addResolver((overloads, v) => overloads[0](v))).toThrow("resolver aready defined");
});