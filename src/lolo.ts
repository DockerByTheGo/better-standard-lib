import { ResultError } from "./data_structures/functional-patterns/result/error";
import { BasicResult } from "./data_structures/functional-patterns/result/implementations/Basic";
import { ResultSuccess } from "./data_structures/functional-patterns/result/success/implementations/Basic";

function  hi(){
    
    
    return BasicResult.fromUnion(Math.random() ? new ResultError("i9", "jiji") : new ResultSuccess({hi: ""}))
    
}

hi().try({
    ifError: {
        i9: v => v.name,
    },
    ifSuccess: v => v.data
})