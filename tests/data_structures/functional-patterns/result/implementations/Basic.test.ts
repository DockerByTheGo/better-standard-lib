
import { ResultError } from "@better-standard-internal/data_structures/functional-patterns/result/error";
import { BasicResult } from "@better-standard-internal/data_structures/functional-patterns/result/implementations/Basic";
import { ResultSuccess } from "@better-standard-internal/data_structures/functional-patterns/result/success/implementations/Basic";
import { expect, test } from "bun:test";

// --- Test Setup ---

type NotFoundError = ResultError<"NotFoundError">;
type UnauthorizedError = ResultError<"UnauthorizedError">;
type User = { name: string; age: number };
type UserSuccess = ResultSuccess<User>;

function fetchUser(id: number): BasicResult<UserSuccess, {
    NotFoundError: NotFoundError,
    UnauthorizedError: UnauthorizedError,
}> {
    if (id === 1) {
        return BasicResult.Succes(new ResultSuccess({ name: "John Doe", age: 30 }));
    } else if (id === 2) {
        return BasicResult.Error(new ResultError("UnauthorizedError", "You are not authorized to access this user."));
    } else {
        return BasicResult.Error(new ResultError("NotFoundError", `User with id ${id} not found.`));
    }
}


// implict 


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

test("BasicResult.RawError should create a ResultError", () => {
    const error = BasicResult.RawError("MyError", "message");
    expect(error).toBeInstanceOf(ResultError);
    expect(error.name).toBe("MyError");
    expect(error.message).toBe("message");
});

test("BasicResult.Error should create an error result", () => {
    const error = BasicResult.Error(new ResultError("MyError", "message"));
    expect(error.isError()).toBe(true);
});

test("BasicResult.Succes should create a success result", () => {
    const success = BasicResult.Succes(new ResultSuccess("data"));
    expect(success.isOk()).toBe(true);
    expect(success.unpack()).toBe("data");
});
