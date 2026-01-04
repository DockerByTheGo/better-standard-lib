
import { AnotherSmartString } from "../../src/data_structures/safestring";
import { expect, test } from "bun:test";

test("AnotherSmartString.V1 should extract parts of a string based on a schema", () => {
    const fullNameSchema = {
        firstName: (v: string) => v.split(" ")[0] || "",
        lastName: (v: string) => v.split(" ")[1] || "",
        initials: (v: string) => `${v.split(" ")[0]?.[0] || ""}${v.split(" ")[1]?.[0] || ""}`,
    };

    const fullName = "John Doe";
    const smartFullName = new AnotherSmartString.V1(fullNameSchema, fullName);

    expect(smartFullName.getPart("firstName")).toBe("John");
    expect(smartFullName.getPart("lastName")).toBe("Doe");
    expect(smartFullName.getPart("initials")).toBe("JD");

    expect(smartFullName.getParts()).toEqual({
        firstName: "John",
        lastName: "Doe",
        initials: "JD",
    });
});

test("AnotherSmartString.V2 should wrap a readonly array of strings", () => {
    const keywords = new AnotherSmartString.V2(["typescript", "javascript", "nodejs"] as const);
    expect(keywords.v).toEqual(["typescript", "javascript", "nodejs"]);
});
