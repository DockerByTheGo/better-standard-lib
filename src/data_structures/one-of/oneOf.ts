import { KeyOfOnlyStringKeys, URecord } from "@better-standard-internal/type-level-functions";

export class OneOf<T extends URecord> {

    constructor(v: T) {

    }

    defineHandlers(handler: {[name in  KeyOfOnlyStringKeys<T> as `if${name}`]?: (v: T[name]) => void}){

    }

    do<Key extends KeyOfOnlyStringKeys<T>>(v: {type: Key} & T[Key]){

    }

}

const l:  {
    j: {koko: string},
    v: {l: string}
} = {}

new OneOf(
    l,
)
.defineHandlers({
    ifj: v => v.koko,
})
.do({
    
})