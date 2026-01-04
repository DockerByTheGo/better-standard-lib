
import { BasicResult } from "../../../../../../src/data_structures/functional-patterns/result/implementations/Basic";
import { ResultSuccess } from "../../../../../../src/data_structures/functional-patterns/result/success/implementations/Basic";
import { ResultError } from "../../../../../../src/data_structures/functional-patterns/result/error/implementations/Basic";

// --- BasicResult Example ---
console.log("--- BasicResult Example ---");

// Define some error types
type NotFoundError = ResultError<"NotFoundError">;
type UnauthorizedError = ResultError<"UnauthorizedError">;

// Define a success type
type User = { name: string; age: number };
type UserSuccess = ResultSuccess<User>;


// A function that might return a success or an error
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


// --- Handling results ---
console.log("--- Handling Results ---");

function displayUser(id: number) {
    const userResult = fetchUser(id);

    // Using isOk() and isError()
    if (userResult.isOk()) {
        console.log(`Success for id ${id}:`, userResult.unpack());
    } else if(userResult.isError()) {
        const error = userResult.value; // value is the error object
        console.log(`Error for id ${id}: ${error.name} - ${error.message}`);
    }

    // Using try() for more advanced pattern matching
    userResult.try({
        ifSuccess: (user) => {
            console.log(`try() success for id ${id}:`, user);
        },
        ifError: {
            NotFoundError: (e) => {
                console.log(`try() error for id ${id}: ${e.message}`);
            },
            UnauthorizedError: (e) => {
                console.log(`try() error for id ${id}: ${e.message}`);
            }
        }
    });
}

displayUser(1);
console.log("");
displayUser(2);
console.log("");
displayUser(3);


// --- Using RawSuccess and RawError static methods ---
console.log("\n--- Using RawSuccess and RawError ---");

const rawSuccess = BasicResult.RawSuccess({ message: "It worked!" });
console.log("Raw success:", rawSuccess.unpack());

// Note: RawError creates a ResultError, not a BasicResult.
const rawError = BasicResult.RawError("MyError", "Something went wrong.");
const errorResult = BasicResult.Error(rawError);

errorResult.ifError({
    MyError: (e) => console.log(`Raw error handled: ${e.message}`),
})
