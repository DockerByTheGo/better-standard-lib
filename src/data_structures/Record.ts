import { URecord } from "@better-standard-internal/type-level-functions";
import { Optionable } from "./functional-patterns/option";

export class SafeRecord<TSchema extends URecord>{
    constructor(public readonly values: TSchema){

    }

    createMutableCopy(): TSchema{
        // TODO
    }

    unsafeAccess<TReturn = unknown>(key: string): Optionable<TReturn> {
        return this.values[key]
    }

    copy(): SafeRecord<TSchema> {

    }

    static fromObject<T extends URecord>(v: T){
        return new SafeRecord(v);
    }
    
}
