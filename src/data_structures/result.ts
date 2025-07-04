import { Optionable } from "./option";
import { CustomUnpackable } from "./unpackable/unpackable";

export type ICustomError = {
    message: string;
};

type Errors = Record<string, Optionable<ICustomError>>;

export class CustomError implements ICustomError {
    message: string;
    constructor(message: string) {
        this.message = message;
    }
}

type IResult<T, E extends Errors> = {
    expect: (msg: string) => void;
};

function isEmptyObject(obj: object): boolean {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export class Result<T, E extends Errors>
    extends CustomUnpackable<T>
    implements IResult<T, E> {
    private error: Optionable<E>;
    protected safeMode = true;
    constructor(value: Optionable<T>, error: Optionable<E>) {
        super(value.unpack_with_default(null as T), e => error.is_none());
        this.error = error;
        if (value.is_none() && error.is_none()) {
            throw new Error("Either value or error must be provided");
        }
        if (!value.is_none() && !error.is_none()) {
            throw new Error("Only value or error can be provided, not both");
        }

        error.ifCanBeUnpacked((definedError) => {
            Object.entries(definedError).forEach(([key, value]) => {
                value.ifCanBeUnpacked((v) => {
                    value.ifCanBeUnpacked(
                        v => this.messageWhenYouCntUnpack = v.message,
                    );
                });
            });
        });
    }

    public getError(): Optionable<E> {
        return this.error;
    }

    public static Ok<T, E extends Errors>(v: T): Result<T, E> {
        return new Result<T, E>(new Optionable(v), new Optionable < E >(null));
    }

    public static NotOk<T, E extends Errors>(e: E): Result<T, E> {
        return new Result<T, E>(new Optionable<T>(null), new Optionable(e));
    }

    static async transformFunctionThatThrowsIntoResult<ExpectedResponseType>(
        functionThatCouldThrow: () => Promise<ExpectedResponseType>,
    ): Promise<Result<ExpectedResponseType, { errorThrownFromTheFunction: Optionable<ICustomError> }>> {
        try {
            return new Result(
                new Optionable<ExpectedResponseType>(await functionThatCouldThrow()),
                (new Optionable<{ errorThrownFromTheFunction: Optionable<ICustomError> }>(null)),
            );
        }
        catch (err: any) {
            return new Result(
                new Optionable<ExpectedResponseType>(null),
                new Optionable(
                    { errorThrownFromTheFunction: new Optionable(new CustomError(err.message)) },
                ),
            );
        }
    }

    handlerErrors(handlers: Record<keyof E, (e: ICustomError) => void>): void {
        if (isEmptyObject(handlers) && this.safeMode) {
            console.log("note passing empty error handler to handleErrors means you have not defined any possible errors that the Result could  result to are you sure using a result here is neccessary?, if you think you know what are you doing extend the class into your custom result and overwrite the safe method protected variablle to true, (i make you to make a whole new class to give you time to really think if you understand what you are doing)");
            return;
        }
        this.error.ifCanBeUnpacked((v) => {
            Object.keys(v).forEach((key) => {
                const handler = handlers[key as keyof E]; // Ensure correct typing
                if (handler) {
                    v[key].ifCanBeUnpacked(error => handler(error));
                }
            });
        });
    }
}

export class ConcreteResult<T> extends Result<T, Errors> {}

export function objectEntries<T extends object>(obj: T): [keyof T, T[keyof T]][] {
    return Object.entries(obj) as [keyof T, T[keyof T]][];
}

// ---------------------

type Ok<T> = {
    ok: true;
    data: T;
};

type ResultError<E> = {
    ok: false;
    type: string;
    message: string;
    value: E;
};

// Helper type to get union of object values
type ValuesOf<T> = T[keyof T];

// Helper type for object entries
type ObjectEntries<T> = Array<[keyof T, T[keyof T]]>;

// Simple Optionable class for chaining
class Optionable<T> {
    constructor(private value: T | null) {}

    getValue(): T | null {
        return this.value;
    }

    map<R>(fn: (value: T) => R): Optionable<R> {
        if (this.value === null) {
            return new Optionable<R>(null);
        }
        return new Optionable(fn(this.value));
    }
}

function map<T, R>(value: T | undefined, fn: (value: T) => R): R | null {
    if (value === undefined)
        return null;
    return fn(value);
}

export class SimpleResult<Success, Errors extends Record<string, ResultError<any>>> {
    private value: Ok<Success> | ValuesOf<Errors>;

    constructor(v: Ok<Success> | ValuesOf<Errors>) {
        this.value = v;
    }

    isOk(): this is SimpleResult<Success, Errors> & { value: Ok<Success> } {
        return this.value.ok === true;
    }

    ifOk<R>(fn: (v: Success) => R): Optionable<R> {
        if (this.isOk()) {
            return new Optionable(fn((this.value as Ok<Success>).data));
        }
        return new Optionable(null);
    }

    private onError<R>(func: (v: ValuesOf<Errors>) => R): R {
        return func(this.value as ValuesOf<Errors>);
    }

    ifError<ErrorHandlers extends {
        [K in keyof Errors]: (v: Errors[K]) => any
    }>(
        handlers: ErrorHandlers,
    ): Optionable<ReturnType<ValuesOf<ErrorHandlers>>> {
        if (this.isOk()) {
            return new Optionable(null);
        }

        return new Optionable(this.onError((error) => {
            const entry = objectEntries(handlers)
                .find(([key, handler]) => key === error.type);

            return map(entry, ([key, handler]) => handler(error as any));
        }));
    }

    // Additional utility methods
    getData(): Success | null {
        if (this.isOk()) {
            return (this as Ok<Success>).data;
        }
        return null;
    }

    getError(): ValuesOf<Errors> | null {
        if (!this.isOk()) {
            return this.value as ValuesOf<Errors>;
        }
        return null;
    }
}

// Usage example:
type UserNotFoundError = ResultError<{ userId: string }>;
type ValidationError = ResultError<{ field: string }>;

type UserErrors = {
    userNotFound: UserNotFoundError;
    validation: ValidationError;
};

// Example usage:
const successResult = new SimpleResult<string, UserErrors>({ ok: true, data: "John Doe" });
const errorResult = new SimpleResult<string, UserErrors>({
    ok: false,
    type: "userNotFound",
    message: "User not found",
    value: { userId: "123" },
});

// Using the result:
successResult.ifOk(data => console.log(`Success: ${data}`));

errorResult.ifError({
    userNotFound: err => console.log(`User ${err.value.userId} not found`),
    validation: err => console.log(`Validation error on field: ${err.value.field}`),
});
