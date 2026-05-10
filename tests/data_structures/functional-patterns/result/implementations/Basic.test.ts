
import { ResultError } from "@better-standard-internal/data_structures/functional-patterns/result/error";
import { BasicResult, mapResult } from "@better-standard-internal/data_structures/functional-patterns/result/implementations/Basic";
import { ResultSuccess } from "@better-standard-internal/data_structures/functional-patterns/result/success/implementations/Basic";
import { expect, test } from "bun:test";

// --- Test Setup ---


// # implict usage, e.g. we leave it to the ts compiler to infer the correct types 
// ## implicit usage with manual binding 
// in this method we just return the raw states of the result and then in the callee manually transform it 

function fetchUserNormal(id: number) {
    if (id === 1) {
        return (new ResultSuccess({ name: "John Doe", age: 30 }));
    } else if (id === 2) {
        return (new ResultError("UnauthorizedError", "You are not authorized to access this user."));
    } else {
        return (new ResultError("NotFoundError", `User with id ${id} not found.`));
    }
}

BasicResult.fromUnion(fetchUserNormal(4))


const fetchUser = mapResult(fetchUserNormal)


// ## implicit usage with automatic binding 
// here we will use a helper function which will allows us to create a function which returns a result object 

export const getFileContent = mapResult((filename: string) => {
    if (filename.length < 1){
        return new ResultError("Invalid file name", "name is not good")
    }else {
        return new ResultSuccess("content")
    }
})

getFileContent("").ifError({
    "Invalid file name": v => v.name
})

// # explicit usage




// --- Tests ---

test("BasicResult should correctly identify and unpack a success result", () => {
    const successResult = fetchUser(1);
    expect(successResult.isOk()).toBe(true);
    expect(successResult.isError()).toBe(false);
    expect(successResult.unpack()).toEqual({ name: "John Doe", age: 30 });
});

test("BasicResult should correctly identify an error result", () => {
    const errorResult = fetchUser(2);
    expect(errorResult.isOk()).toBe(false);
    expect(errorResult.isError()).toBe(true);
});

test("BasicResult unpack on an error result should throw an error", () => {
    const errorResult = fetchUser(2);
    expect(() => errorResult.unpack()).toThrow("You are not authorized to access this user.");
});

test("BasicResult.try should call the correct handler for success", () => {
    const successResult = fetchUser(1);
    let handlerCalled = "";
    successResult.try({
        ifSuccess: () => { handlerCalled = "success"; },
        ifError: {
            NotFoundError: () => { handlerCalled = "notFound"; },
            UnauthorizedError: () => { handlerCalled = "unauthorized"; },
        }
    });
    expect(handlerCalled).toBe("success");
});

test("BasicResult.try should call the correct handler for error", () => {
    const errorResult = fetchUser(2);
    let handlerCalled = "";
    errorResult.try({
        ifSuccess: () => { handlerCalled = "success"; },
        ifError: {
            NotFoundError: () => { handlerCalled = "notFound"; },
            UnauthorizedError: () => { handlerCalled = "unauthorized"; },
        }
    });
    expect(handlerCalled).toBe("unauthorized");
});

test("BasicResult.RawSuccess should create a success result", () => {
    const success = BasicResult.RawSuccess("data");
    expect(success.isOk()).toBe(true);
    expect(success.unpack()).toBe("data");
});


test("BasicResult.Error should create an error result", () => {
    const error = new BasicResult.Error(new ResultError("MyError", "message"));
    expect(error.isError()).toBe(true);
});

test("BasicResult.Succes should create a success result", () => {
    const success = BasicResult.Succes(new ResultSuccess("data"));
    expect(success.isOk()).toBe(true);
    expect(success.unpack()).toBe("data");
});
