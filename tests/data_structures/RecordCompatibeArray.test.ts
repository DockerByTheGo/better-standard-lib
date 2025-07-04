import { describe, expect, test } from "bun:test";
import { expectType } from "tsd";

import { OrderedRecordBase } from "../../src/data_structures/RecordCompatibeArray";

// ==============================
// ✅ TYPE TESTS (TSD)
// ==============================

const g = new OrderedRecordBase([
    { key: "jiji", handler: () => ({ g: "" }) },
] as const).add({ key: "gyog", handler: () => 4 } as const);

expectType<{
    readonly key: "jiji";
    readonly handler: () => { g: string };
}>(g.elements.value[0]);

expectType<{
    readonly key: "gyog";
    readonly handler: () => 4;
}>(g.elements.value[1]);

const fruits = new OrderedRecordBase([
    { key: "apple", value: 10 },
    { key: "banana", value: 20 },
] as const)
    .add({ key: "lolo", value: 4 } as const)
    .add({ key: "koiki", value: 6 } as const);

expectType<10>(fruits.toNormalObject.apple.value);
expectType<6>(fruits.toNormalObject.koiki.value);

expectType<{
    readonly value: 6;
    readonly key: "koiki";
}>(fruits.elements.value[3]);

expectType<{
    readonly key: "apple";
    readonly value: 10;
}>(fruits.elements.value[0]);

// ==============================
// ✅ RUNTIME TESTS (BUN)
// ==============================

describe("OrderedRecord runtime tests", () => {
    test("adds and accesses elements correctly", () => {
        const g = new OrderedRecordBase([
            { key: "jiji", handler: () => ({ g: "" }) },
        ] as const).add({ key: "gyog", handler: () => 4 } as const);

        expect(g.elements.value[1].key).toBe("gyog");
        expect(g.elements.value[1].handler()).toBe(4);
    });

    test("converts to normal object and accesses value", () => {
        const fruits = new OrderedRecordBase([
            { key: "apple", value: 10 },
            { key: "banana", value: 20 },
        ] as const)
            .add({ key: "lolo", value: 4 } as const)
            .add({ key: "koiki", value: 6 } as const);

        expect(fruits.toNormalObject.apple.value).toBe(10);
        expect(fruits.toNormalObject.koiki.value).toBe(6);
        expect(fruits.elements.value[3].key).toBe("koiki");
        expect(fruits.elements.value[3].value).toBe(6);
    });
});
