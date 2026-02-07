
import { OneOf } from "../../../src/data_structures/functional-patterns/one-of/oneOf";
import { TypeMarker } from "../../../src/data_structures/others/type-marker";

// --- OneOf Example ---
console.log("--- OneOf Example ---");

// First, define some classes that will be part of our union type.
// They must extend TypeMarker with a unique string literal type.

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

// Now, create a union type using the OneOf factory.
const APIResult = OneOf([Success, Failure, Loading]);

// We can now create instances of our union type using the static constructors.
const successResult = APIResult.otherCons("Success", { user: "John Doe" });
const failureResult = APIResult.otherCons("Failure", new Error("Network error"));
const loadingResult = APIResult.otherCons("Loading");


// We can use the `defineHandlers` method to pattern match on the result.
function handleResult(result: typeof successResult | typeof failureResult | typeof loadingResult) {
    console.log("\nHandling a result:");
    result.defineHandlers({
        ifSuccess: (v) => {
            console.log("Status: Success");
            console.log("Data:", v.data);
        },
        ifFailure: (v) => {
            console.log("Status: Failure");
            console.log("Error:", v.error.message);
        },
        ifLoading: () => {
            console.log("Status: Loading...");
        },
    });
}

handleResult(loadingResult);
handleResult(successResult);
handleResult(failureResult);

// We can also use the `is` method for conditional checks.
function checkIsLoading(result: typeof loadingResult) {
    if (result.is("Loading")) {
        console.log("\nThe result is currently loading.");
    }
}

checkIsLoading(loadingResult);
