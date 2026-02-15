import type { IResultError } from "../types";

export class ResultError<TName extends string> implements IResultError<TName> {
  constructor(public name: TName, public message: string) {

  }

  TGetName: TName;

  public readonly ok = false as const;

  throw() {
    throw new Error(`${this.name}: ${this.message}`);
  }
}


export function buildError<TName extends string>(name: TName) {
  return class CustomError extends ResultError<TName> {
    constructor(message: string) {
      super(name, message);
    }
  };
}


export function buildErrorReturningObject<TName extends string>(name: TName): { [K in TName]: new (message: string) => ResultError<TName> } {
  return {
    [name]: class CustomError extends ResultError<TName> {
      constructor(message: string) {
        super(name, message);
      }
    }
  } as { [K in TName]: new (message: string) => ResultError<TName> };
}
