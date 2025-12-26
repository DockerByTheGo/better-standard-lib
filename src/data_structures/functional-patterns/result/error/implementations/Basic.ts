import { IResultError } from "../types";

export class ResultError<TName extends string> implements IResultError<TName> {
    constructor(public name: TName, public message: string) {

    }

    TGetName: TName;
    

    public readonly ok = false as const

    throw() {
        throw new Error(`${this.name}: ${this.message}`);
    }
}
