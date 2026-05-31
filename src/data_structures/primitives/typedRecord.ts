import type { KeyOfOnlyStringKeys, URecord } from "@better-standard-internal/type-level-functions";
import { Optionable } from "../functional-patterns/option";

export class TypedRecord<TShape extends URecord> {
  constructor(private readonly members: TShape) {}

  get<K extends KeyOfOnlyStringKeys<TShape>>(v: K): TShape[K] {
    return this.members[v];
  }

  getUnsafe<TReturn = unknown>(v: string): Optionable<TReturn> {
    if (!Object.prototype.hasOwnProperty.call(this.members, v)) {
      return Optionable.none();
    }

    return Optionable.some(this.members[v] as TReturn);
  }

  has<K extends KeyOfOnlyStringKeys<TShape>>(v: K): boolean {
    return Object.prototype.hasOwnProperty.call(this.members, v);
  }

  raw(): TShape {
    return this.members;
  }

  toJSON(): TShape {
    return this.members;
  }
}

