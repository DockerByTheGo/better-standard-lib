
import { Pipe } from "../../../../../../src/data_structures/functional-patterns/pipe/main";
import { expect, test } from "bun:test";

test("Pipe should allow chaining of side effects", () => {
    const obj = { value: 10 };
    const pipe = new Pipe(obj);
    
    let valueInFirstPipe = 0;
    let valueInSecondPipe = 0;

    pipe.pipe(v => {
        valueInFirstPipe = v.value;
    }).pipe(v => {
        valueInSecondPipe = v.value;
    });

    expect(valueInFirstPipe).toBe(10);
    expect(valueInSecondPipe).toBe(10);
});

test("Pipe should reflect mutations of objects", () => {
    const obj = { value: 10 };
    const pipe = new Pipe(obj);
    
    pipe.pipe(v => {
        v.value = 20;
    }).pipe(v => {
        expect(v.value).toBe(20);
    });
});

test("Pipe with primitive values should not be mutable", () => {
    let value = 10;
    const pipe = new Pipe(value);
    
    pipe.pipe(v => {
        v = 20;
    }).pipe(v => {
        expect(v).toBe(10);
    });
});
