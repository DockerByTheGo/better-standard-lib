
import { OneOf } from "../../../../../../src/data_structures/functional-patterns/one-of/oneOf";
import { TypeMarker } from "../../../../../../src/data_structures/others/type-marker";
import { expect, test } from "bun:test";

class Success<T> extends TypeMarker<"Success"> {
    constructor(public readonly data: T) {
        super("Success");
    }
}

class Failure<E> extends TypeMarker<"Failure"> {
    constructor(public readonly error: E) {
        super("Failure");
    }
}

class Loading extends TypeMarker<"Loading"> {
    constructor() {
        super("Loading");
    }
}

const APIResult = OneOf([Success, Failure, Loading]);

test("OneOf should create instances using static constructors", () => {
    const success = APIResult.otherCons("Success", "data");
    expect(success.value).toBeInstanceOf(Success);
    expect(success.value.data).toBe("data");

    const failure = APIResult.otherCons("Failure", "error");
    expect(failure.value).toBeInstanceOf(Failure);
    expect(failure.value.error).toBe("error");

    const loading = APIResult.otherCons("Loading");
    expect(loading.value).toBeInstanceOf(Loading);
});

test("OneOf defineHandlers should call the correct handler", () => {
    const success = APIResult.otherCons("Success", "data");
    let handlerCalled = "";
    success.defineHandlers({
        ifSuccess: () => { handlerCalled = "success"; },
        ifFailure: () => { handlerCalled = "failure"; },
        ifLoading: () => { handlerCalled = "loading"; },
    });
    expect(handlerCalled).toBe("success");

    const failure = APIResult.otherCons("Failure", "error");
    failure.defineHandlers({
        ifSuccess: () => { handlerCalled = "success"; },
        ifFailure: () => { handlerCalled = "failure"; },
        ifLoading: () => { handlerCalled = "loading"; },
    });
    expect(handlerCalled).toBe("failure");

    const loading = APIResult.otherCons("Loading");
    loading.defineHandlers({
        ifSuccess: () => { handlerCalled = "success"; },
        ifFailure: () => { handlerCalled = "failure"; },
        ifLoading: () => { handlerCalled = "loading"; },
    });
    expect(handlerCalled).toBe("loading");
});

test("OneOf is should return true for the correct type", () => {
    const success = APIResult.otherCons("Success", "data");
    expect(success.is("Success")).toBe(true);
    expect(success.is("Failure")).toBe(false);
    expect(success.is("Loading")).toBe(false);
});
