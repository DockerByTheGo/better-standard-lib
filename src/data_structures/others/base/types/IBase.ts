import { IMapable } from "@better-standard-internal/data_structures/functional-patterns/map";
import { IWithShape } from "../../WithShape";

export interface IBase<T> extends IWithShape<T>, IMapable<T> {
    
}