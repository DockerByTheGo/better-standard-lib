
import { SafeRecord } from "../../src/data_structures/Record";
import { expect, test } from "bun:test";

test("SafeRecord should be created from an object", () => {
    const user = {
        name: "John Doe",
        age: 30,
    };
    const userRecord = SafeRecord.fromObject(user);
    expect(userRecord.values).toEqual(user);
});

test("SafeRecord unsafeAccess should return the correct value", () => {
    const user = {
        name: "John Doe",
        age: 30,
    };
    const userRecord = SafeRecord.fromObject(user);
    const name = userRecord.unsafeAccess<string>("name");
    expect(name).toBe("John Doe");
});

test("SafeRecord unsafeAccess should return undefined for non-existent keys", () => {
    const user = {
        name: "John Doe",
        age: 30,
    };
    const userRecord = SafeRecord.fromObject(user);
    const email = userRecord.unsafeAccess<string>("email");
    expect(email).toBeUndefined();
});

// Note: The `createMutableCopy` and `copy` methods are not implemented in the source file.
// Once they are implemented, tests should be added for them.

/*
test("SafeRecord createMutableCopy should create a mutable copy", () => {
    const user = {
        name: "John Doe",
        age: 30,
    };
    const userRecord = SafeRecord.fromObject(user);
    const mutableUser = userRecord.createMutableCopy();
    mutableUser.age = 31;
    expect(mutableUser.age).toBe(31);
    expect(userRecord.values.age).toBe(30);
});

test("SafeRecord copy should create a new SafeRecord", () => {
    const user = {
        name: "John Doe",
        age: 30,
    };
    const userRecord = SafeRecord.fromObject(user);
    const userRecordCopy = userRecord.copy();
    expect(userRecordCopy.values).toEqual(user);
    expect(userRecordCopy).not.toBe(userRecord);
});
*/
