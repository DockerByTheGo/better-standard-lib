import { panic } from "./default";

export const panicTypeOnlyVariable = (msg?: string) => panic(msg ?? "The thing you are accessing is only supposed to provide a type and shoulddnt be used to get an actual value")

export const panicTypeOnlyFunction = (msg?: string) => panic(msg ?? "The method you are calling is only supposed to provide a type and shoulddnt be used to get an actual value")