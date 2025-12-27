import type { IMapable } from "@better-standard-internal/data_structures/functional-patterns/map";

import type { IWithShape } from "../../WithShape";

export type IBase<T> = {

} & IWithShape<T> & IMapable<T>;
