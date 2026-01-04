

// Note: The `SmartString` class in the source file has some implementation issues
// and is not exported, so it cannot be demonstrated here.

import { AnotherSmartString } from "@better-standard-internal/data_structures";

// --- AnotherSmartString.V1 Example ---
console.log("--- AnotherSmartString.V1 Example ---");

// Define a schema for parsing a full name string.
const fullNameSchema = {
  firstName: (v: string) => v.split(" ")[0] || "",
  lastName: (v: string) => v.split(" ")[1] || "",
  initials: (v: string) => `${v.split(" ")[0]?.[0] || ""}${v.split(" ")[1]?.[0] || ""}`,
};

const fullName = "John Doe";
const smartFullName = new AnotherSmartString.V1(fullNameSchema, fullName);

// Get a specific part
const firstName = smartFullName.getPart("firstName");
console.log(`First Name: ${firstName}`);

const lastName = smartFullName.getPart("lastName");
console.log(`Last Name: ${lastName}`);

// Get all parts as an object
const allParts = smartFullName.getParts();
console.log("All parts:", allParts);
console.log(`Initials: ${allParts.initials}`);


// --- AnotherSmartString.V2 Example ---
console.log("\n--- AnotherSmartString.V2 Example ---");

// This class is a simple wrapper around a readonly array of strings.
const keywords = new AnotherSmartString.V2(["typescript", "javascript", "nodejs"] as const);

console.log("Keywords:", keywords.v);
// keywords.v.push("bun"); // This would cause a compilation error because 'v' is readonly.

