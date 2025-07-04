import type { Last } from "../type-level-functions/tuple/getLast";

import { Optionable } from "./option";
import { panic } from "../functions/panic";
import { GetSet } from "./getSetClass";

type WithKey<T> = { key: string } & T;

type Widen<T> = T extends string
    ? string
    : T extends number
        ? number
        : T extends boolean
            ? boolean
            : T extends Array<infer U>
                ? Array<Widen<U>>
                : T extends object
                    ? { [K in keyof T]: Widen<T[K]> }
                    : T;

export class OrderedRecordBase<
    V extends readonly Schema[],
    Schema extends { key: string },
> extends Array<Schema> {
    public get getElementsType(): V {
    // use only as means to gget the type of the elemnts inside e.g. get the V generic
        return this.elements.value;
    }

    public readonly elements: GetSet<V> = new GetSet<V>([] as unknown as V);

    constructor(elements: V) {
        super(...elements);
        this.elements.setV(elements);
    }

    public getByPosition<Index extends number>(
        index: Index,
    ): Optionable<V[Index]> {
        return panic("not implemented yet");
    }

    public get toNormalObject(): {
        [K in V[number]["key"]]: Omit<Extract<V[number], { key: K }>, "key">;
    } {
        return this.elements.value.reduce((acc, item) => {
            acc[item.key] = item; // We can safely assume `item` matches the type since it's of type `V[number]`
            return acc;
        }, {} as { [K in V[number]["key"]]: Omit<Extract<V[number], { key: K }>, "key"> });
    }

    get(key: V[number]["key"]): Optionable<Schema> {
        return new Optionable(this.elements.value.find(el => el.key === key));
    }

    placeBefore<NewValueKey extends string>(
        key: V[number]["key"],
        newValue: Omit<V[number], "key"> & { key: NewValueKey },
    ) {
        return this.add(
            newValue,
            this.elements.value.findIndex(el => el.key === key),
        );
    }

    placeAfter<NewValueKey extends string>(
        key: V[number]["key"],
        newValue: Omit<V[number], "key"> & { key: NewValueKey },
    ) {
        return this.add(
            newValue,
            this.elements.value.findIndex(el => el.key === key) + 1,
        );
    }

    getIndexOfKey(key: V[number]["key"]): number | undefined {
        return this.elements.value.findIndex(el => el.key === key);
    }

    set(value: V[number]): void {
        const index = this.elements.value.findIndex(el => el.key === value.key);
        if (index !== -1) {
            this.elements.value.map((array) => {
                array[index] = value;
                return array;
            });
        }
    }

    add<
        NewKey extends string,
        T extends Widen<AdditionalData> & { key: NewKey },
        AdditionalData extends Omit<Schema, "key">,
    >(
        v: T,
        position?: number,
    ): OrderedRecord<readonly [...V, T], Schema> {
        if (!this.get(v.key).is_none()) {
            throw new Error("key already exists");
        }

        let newElements: readonly [...V, T];

        if (position === undefined) {
            // Append to the end
            newElements = [...this.elements.value, v] as readonly [...V, T];
        }
        else {
            // Insert at a specific position
            newElements = [
                ...this.elements.value.slice(0, position),
                v,
                ...this.elements.value.slice(position),
            ] as const;
        }

        return new OrderedRecordBase(newElements);
    }
}

export class OrderedRecord
<
    V extends readonly Schema[],
    Schema extends { key: string },
>
    extends OrderedRecordBase
    <
        V,
        Schema
    > {
    public get lastElement(): Last<[V]> {
        return this.elements.value[this.elements.value.length - 1];
    }
}
