export function panic(msg: string) {
    throw new Error(msg);
}

// this is used for since keyof returns string | number | synmbol but if we pass keoyf to a generic which extends a string it will show the type error string | number | symbol is not assigneable to type string
