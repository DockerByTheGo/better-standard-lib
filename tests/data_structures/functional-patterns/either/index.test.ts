
import { Either } from "../../../../../src/data_structures/functional-patterns/either";
import { expect, test } from "bun:test";

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

test("Either isLeft should return true for Left values", () => {
    const leftValue = createLeft("error");
    const either = new Either(leftValue);
    expect(either.isLeft()).toBe(true);
});

test("Either isLeft should return false for Right values", () => {
    const rightValue = createRight(42);
    const either = new Either(rightValue);
    expect(either.isLeft()).toBe(false);
});

test("Either isRight should return true for Right values", () => {
    const rightValue = createRight(42);
    const either = new Either(rightValue);
    expect(either.isRight()).toBe(true);
});

test("Either isRight should return false for Left values", () => {
    const leftValue = createLeft("error");
    const either = new Either(leftValue);
    expect(either.isRight()).toBe(false);
});

test("Either type guard should work correctly for isLeft", () => {
    const leftValue = createLeft("error");
    const either = new Either(leftValue);
    if (either.isLeft()) {
        expect(either.v.value).toBe("error");
    } else {
        // This block should not be reached
        expect(true).toBe(false);
    }
});

test("Either type guard should work correctly for isRight", () => {
    const rightValue = createRight(42);
    const either = new Either(rightValue);
    if (either.isRight()) {
        expect(either.v.value).toBe(42);
    } else {
        // This block should not be reached
        expect(true).toBe(false);
    }
});
