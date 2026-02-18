import {type Extends } from "../extends"



export type If<T extends [unknown,unknown], True, False> = Extends<T[0],T[1]> extends true ? True : False
type j = If<["lolo","lolo"] , 3,4 >