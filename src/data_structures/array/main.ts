import { VCallback } from "@better-standard-internal/types/voidcallback";
import { Tick } from "../tick/export";
import { Last } from "@better-standard-internal/type-level-functions/tuple/getLast";

/*
 * TypeSafeArray
 * ---------------
 * A lightweight, zero‑copy, fluent, type‑tracked array wrapper.
 *
 * Goals:
 *   • Track a tuple type parameter `T` that represents the elements added so far.
 *   • Mutate a single underlying `Schema[]` array at runtime (no per‑add allocations).
 *   • Return a widened generic type on each `.add()` call so chained code “remembers” the order/types added.
 *   • Provide safe `first`/`last` accessors that type to `undefined` when the tuple is empty.
 *   • Provide `empty()` and `from()` static factories (plus `of()` alias) so callers rarely touch the constructor.
 *
 * Usage discipline:
 *   Because TypeScript generics are immutable once instantiated, `.add()` returns `this` cast to a *new* type.
 *   You must reassign: `arr = arr.add(x);`  If you keep using the old variable, its compile‑time tuple is stale.
 *
 * Runtime cost: equivalent to calling `Array.prototype.push` on a single underlying array.
 */

// ---------------------------------------------------------------------------
// Utility Types
// ---------------------------------------------------------------------------

/** First element type of tuple/array T; `undefined` if empty. */
type Head<T extends readonly unknown[]> = T extends readonly [infer H, ...unknown[]] ? H : undefined;

/** Last element type of tuple/array T; `undefined` if empty. */
type LastOf<T extends readonly unknown[]> = T extends readonly [...unknown[], infer L] ? L : undefined;

/** Push an element V onto tuple T. */
type Push<T extends readonly unknown[], V> = [...T, V];

// Helper to describe a generic constructor (abstract to allow abstract classes).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyCtor<T = any> = abstract new (...args: any[]) => T;

// ---------------------------------------------------------------------------
// TypeSafeArray Class
// ---------------------------------------------------------------------------

export class TypeSafeArray<
  T extends readonly Schema[],
  Schema = unknown
> {
  /** Underlying storage. Mutable; internal only. */
  private data: Schema[];

  // Hide constructor so callers use the static factories that capture tuple type.
  private constructor(data: Schema[]) {
    this.data = data;
  }

  // -----------------------------------------------------------------------
  // Statics
  // -----------------------------------------------------------------------

  /** Create an empty TypeSafeArray for the given Schema type parameter. */
  static empty<Schema>(): TypeSafeArray<[], Schema> {
    return new TypeSafeArray<[], Schema>([]);
  }

  /** Create from a tuple of items; captures literal types when called with `as const`. */
  static from<Schema, U extends readonly Schema[]>(...items: U): TypeSafeArray<U, Schema> {
    // spread to decouple caller's array (optional; could also keep ref for slightly better perf)
    return new TypeSafeArray<U, Schema>([...items]);
  }

  /** Alias of `from` for parity w/ Array.of. */
  static of<Schema, U extends readonly Schema[]>(...items: U): TypeSafeArray<U, Schema> {
    return this.from<Schema, U>(...items);
  }

  // -----------------------------------------------------------------------
  // Accessors
  // -----------------------------------------------------------------------

  /** Number of elements. */
  get length(): number {
    return this.data.length;
  }

  /** First element; `undefined` if empty. */
  get first(): Head<T> {
    return (this.data[0] as unknown) as Head<T>;
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

  // -----------------------------------------------------------------------
  // Mutation + Type Advancement
  // -----------------------------------------------------------------------

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

g.first