import { SafeRecord } from "@better-standard-internal/data_structures/Record";

// --- SafeRecord Example ---
console.log("--- SafeRecord Example ---");

// Define a type for our record
type User = {
  name: string;
  age: number;
  email?: string;
};

// Create a SafeRecord from an object
const userRecord = SafeRecord.fromObject<User>({
  name: "John Doe",
  age: 30,
});

console.log("Original record values:", userRecord.values);

// Access a value safely
const userName = userRecord.unsafeAccess<string>("name");
console.log("Accessed user name:", userName);

const userAge = userRecord.unsafeAccess<number>("age");
console.log("Accessed user age:", userAge);

// Access a non-existent value
const userEmail = userRecord.unsafeAccess<string>("email");
console.log("Accessed user email (non-existent):", userEmail);

// Note: The `createMutableCopy` and `copy` methods are not implemented in the source file.
// If they were, their usage would look something like this:
/*
const mutableUser = userRecord.createMutableCopy();
mutableUser.age = 31;
console.log("Mutable user:", mutableUser);

const userRecordCopy = userRecord.copy();
console.log("Copied record values:", userRecordCopy.values);
*/
