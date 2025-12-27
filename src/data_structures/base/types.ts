import type { Pipe } from "@better-standard-internal/data_structures/pipe/export";
import type { Tick } from "@better-standard-internal/data_structures/tick/export";

import type { Map } from "../functional-patterns/map/export";

export type IBaseValue<V> = {

} & Pipe.Types.IPipeable<V> & Tick.Types.Tick<V> & Map.Types.Mapable<V>;
