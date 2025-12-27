import type { First, Push } from "@better-standard-internal/type-level-functions";

export class TypeSafeArray<
  T extends readonly Schema[],
  Schema = unknown,
> {
  private data: Schema[];

  private constructor(data: Schema[]) {
    this.data = data;
  }

  static empty<Schema>(): TypeSafeArray<[], Schema> {
    return new TypeSafeArray<[], Schema>([]);
  }

  static from<Schema, U extends readonly Schema[]>(...items: U): TypeSafeArray<U, Schema> {
    return new TypeSafeArray<U, Schema>([...items]);
  }

  /** Alias of `from` for parity w/ Array.of. */
  static of<Schema, U extends readonly Schema[]>(...items: U): TypeSafeArray<U, Schema> {
    return this.from<Schema, U>(...items);
  }

  /** Number of elements. */
  get length(): number {
    return this.data.length;
  }

  /** First element; `undefined` if empty. */
  get first(): First<T> {
    return (this.data[0] as unknown) as First<T>;
  }

  /** Last element; `undefined` if empty. */
  get last(): LastOf<T> {
    return (this.data[this.data.length - 1] as unknown) as LastOf<T>;
  }

  /** Random access by index (runtime); type is Schema | undefined. */
  at(index: number): Schema | undefined {
    return this.data[index];
  }

  /** Expose a *readonly* snapshot view. Callers cannot mutate internal storage. */
  toArray(): readonly Schema[] {
    return this.data;
  }

  /**
   * Push a new item and return `this` retyped as having that item appended.
   *
   * NOTE: Reassign your variable — generics are immutable, so previous references
   * keep their original tuple type.
   */
  add<New extends Schema>(item: New): TypeSafeArray<Push<T, New>, Schema> {
    this.data.push(item); // O(1) push; no new wrapper instance.
    return this as unknown as TypeSafeArray<Push<T, New>, Schema>;
  }
}

// do not forget as const to preserve literal types

const g = TypeSafeArray.of("a" as const, "b" as const, "c" as const).add("d" as const).add("e" as const);

g.first;
